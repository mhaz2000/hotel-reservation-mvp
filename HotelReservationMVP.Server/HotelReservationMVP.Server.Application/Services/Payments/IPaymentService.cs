using HotelReservationMVP.Server.Application.Providers;
using HotelReservationMVP.Server.Application.Providers.Models;
using HotelReservationMVP.Server.Core.Entities;
using HotelReservationMVP.Server.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace HotelReservationMVP.Server.Application.Services.Payments
{
    public class PaymentService : IPaymentService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IAsanPardakhtService _asanPardakhtService;

        public PaymentService(IReservationRepository reservationRepository, IAsanPardakhtService asanPardakhtService, ITransactionRepository transactionRepository)
        {
            _reservationRepository = reservationRepository;
            _asanPardakhtService = asanPardakhtService;
            _transactionRepository = transactionRepository;
        }
        public async Task<string?> RequestPaymentAsync(ulong reserveId)
        {
            var reservation = await _reservationRepository.GetAsync(c => c.ReserveId == reserveId, include: c=> c.Include(t=> t.Rooms));
            var roomsPrice = reservation.Rooms.Sum(r => r.RoomPrice);

            var tokenRequest = new TokenRequest
            {
                amountInRials = (ulong)roomsPrice,
                localInvoiceId = (long)reservation.ReserveId,
                paymentId = reservation.Id.ToString()
            };

            var result = await _asanPardakhtService.GetTokenAsync(tokenRequest);

            if(result.ResCode ==0)
            {
                await _transactionRepository.AddAsync(new Transaction()
                {
                    Price = roomsPrice,
                    ReserveId = reserveId,
                    RefId = result.RefId
                });

                return $"https://asan.shaparak.ir?RefId={result.RefId}";

            }


            return null;
        }
    }
    public interface IPaymentService
    {
        Task<string?> RequestPaymentAsync(ulong reserveId);
    }
}
