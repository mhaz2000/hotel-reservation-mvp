using HotelReservationMVP.Server.Application.Commands;
using HotelReservationMVP.Server.Application.DTOs;
using HotelReservationMVP.Server.Application.Extensions;
using HotelReservationMVP.Server.Application.Services.Voucher;
using HotelReservationMVP.Server.Core.Consts;
using HotelReservationMVP.Server.Core.Entities;
using HotelReservationMVP.Server.Core.ExternalServices;
using HotelReservationMVP.Server.Core.Models;
using HotelReservationMVP.Server.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace HotelReservationMVP.Server.Application.Services.Booking
{
    public class BookingService : IBookingService
    {
        private readonly IExternalApiClient _externalApiClient;
        private readonly IReservationRepository _repository;
        private readonly IVoucherService _voucherService;

        public BookingService(IExternalApiClient externalApiClient, IReservationRepository repository, IVoucherService voucherService)
        {
            _externalApiClient = externalApiClient;
            _repository = repository;
            _voucherService = voucherService;
        }

        public async Task<MemoryStream> DownloadVoucherAsync(ulong reserveId)
        {
            var reservation = await _repository.GetAsync(c => c.ReserveId == reserveId, c => c.Include(t => t.Rooms));

            return _voucherService.GetVoucher(reservation);
        }

        public async Task<FinalizeBookModel> FinalizeBookAsync(ulong reserveId)
        {

            var result = await _externalApiClient.FinalizeBookAsync(reserveId);

            var reservation = await _repository.GetAsync(c => c.ReserveId == reserveId);
            reservation.Status = ReservationStatus.Reserved;

            await _repository.UpdateAsync(reservation);

            return result;

        }

        public async Task<IEnumerable<ReservesHistoryDto>> GetReservesHistoryAsync(string type, string mobile)
        {
            var reservations = _repository.GetMany(c => c.Mobile == mobile, r => r.Include(t => t.Rooms));

            if (type == "Completed")
            {
                var result = await reservations.Where(t => t.Status == ReservationStatus.Reserved).ToListAsync();
                return result.Select(r => r.ToDto());
            }

            if (type == "Rejected")
            {
                var result = await reservations.Where(t => t.Status == ReservationStatus.Reject).ToListAsync();
                return result.Select(r => r.ToDto());
            }

            if (type == "Pending")
            {
                var result = await reservations
                    .Where(t => t.Status == ReservationStatus.WaitingForHotelApproval ||
                                t.Status == ReservationStatus.WaitingForPayment)
                    .ToListAsync();

                // Fire off all API calls in parallel
                var tasks = result.Select(async reservation =>
                {
                    var latestStatus = await _externalApiClient.ReserveStatusAsync(reservation.ReserveId);

                    reservation.Status = MapToReservationStatus(latestStatus.Title);
                    reservation.PaymentExpireSeconds = latestStatus.PaymentExpireSeconds;

                    return reservation;
                });

                var updatedReservations = await Task.WhenAll(tasks);

                // If you need to persist to DB:
                foreach (var reservation in updatedReservations)
                {
                    await _repository.UpdateAsync(reservation);
                }

                return updatedReservations
                    .Where(t => t.Status == ReservationStatus.WaitingForHotelApproval || t.Status == ReservationStatus.WaitingForPayment)
                    .Select(r => r.ToDto());
            }

            return null;
        }

        public async Task<PreReserveModel> PreReserveAsync(PreReserveCommand command)
        {
            var input = new PreReserveEntry()
            {
                ArrivalDate = command.ArrivalDate,
                CheckoutDate = command.CheckoutDate,
                Email = command.Email,
                FirstName = command.FirstName,
                LastName = command.LastName,
                HotelId = command.HotelId,
                IsBusinessTravel = command.IsBusinessTravel ?? false,
                Mobile = command.Mobile,
                Phone = command.Phone,
                Rooms = command.Rooms.Select(r => new PreReserveRoomEntry()
                {
                    FirstName = r.GuestFirstName,
                    Id = r.RoomId,
                    LastName = r.GuestLastName,
                    Nationality = r.Nationality,
                    NationId = r.NationId is not null && r.Nationality ? r.NationId.Value : 0
                }).ToList(),
            };

            var reservation = new Reservation()
            {
                ArrivalDate = command.ArrivalDate,
                CheckoutDate = command.CheckoutDate,
                Email = command.Email,
                FirstName = command.FirstName,
                LastName = command.LastName,
                HotelId = command.HotelId,
                IsBusinessTravel = command.IsBusinessTravel ?? false,
                Mobile = command.Mobile,
                Phone = command.Phone,
                HotelAddress = command.HotelAddress,
                HotelImage = command.HotelImage,
                HotelGrade = command.HotelGrade,
                HotelName = command.HotelName,
                Rooms = command.Rooms.Select(r => new ReservingRoom()
                {
                    RoomName = r.RoomName,
                    RoomPrice = r.RoomPrice,
                    RoomImage = r.RoomImage,
                    FirstName = r.GuestFirstName,
                    RoomId = r.RoomId,
                    LastName = r.GuestLastName,
                    Nationality = r.Nationality,
                    NationId = r.NationId is not null && r.Nationality ? r.NationId.Value : 0
                }).ToList(),
            };

            var result = await _externalApiClient.PreReserveAsync(input);

            reservation.Status = MapToReservationStatus(result.StatusText);

            reservation.ReserveId = result.ReserveId;

            await _repository.AddAsync(reservation);
            return result;
        }

        private ReservationStatus MapToReservationStatus(string status)
        {
            var waitingForHotelApprovalStatuses = new List<string>()
            {
                "در انتظار تایید فیش",
                "بررسی در زمانی دیگر",
                "در انتظار پاسخ هتل",
                "پاسخ مثبت",
                "منتظر بمانيد",
                "در دست بررسي",
                "در دست بررسی",
                "اولین روز کاری",
                "تماس بگيريد",
                "کنترل در زمان دیگر",
                "لیست انتظار",
                "در انتظار بررسی کارشناس"
            };


            if (status == "رزرو قطعی")
                return ReservationStatus.Reserved;

            if (status == "در انتظار واریز وجه")
                return ReservationStatus.WaitingForPayment;

            if (waitingForHotelApprovalStatuses.Contains(status))
                return ReservationStatus.WaitingForHotelApproval;

            return ReservationStatus.Reject;
        }
    }
}
