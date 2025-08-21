using HotelReservationMVP.Server.Application.DTOs;
using HotelReservationMVP.Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservationMVP.Server.Application.Extensions
{
    internal static class ReservationExtension
    {
        public static ReservesHistoryDto ToDto(this Reservation reservation)
        {
            PersianCalendar pc = new PersianCalendar();
            return new ReservesHistoryDto()
            {
                Email = reservation.Email,
                EndDate = reservation.CheckoutDate,
                FirstName = reservation.FirstName,
                HotelAddress = reservation.HotelAddress,
                HotelGrade = reservation.HotelGrade,
                HotelImage = reservation.HotelImage,
                HotelName = reservation.HotelName,
                LastName = reservation.LastName,
                Mobile = reservation.Mobile,
                Phone = reservation.Phone,
                ReserveDate = $"{pc.GetYear(reservation.CreatedAt)}/{pc.GetMonth(reservation.CreatedAt)}/{pc.GetDayOfMonth(reservation.CreatedAt)}",
                StartDate = reservation.ArrivalDate,
                Status = reservation.Status.ToString(),
                StatusText = reservation.Status.GetDescription(),
                PaymentExpiredIn = reservation.PaymentExpireSeconds,
                ReserveId = reservation.ReserveId,
                Rooms = reservation.Rooms.GroupBy(t => t.RoomId).Select(s => new ReserveHistoryRoomDto()
                {
                    Quantity = s.Count(),
                    Name = s.FirstOrDefault().RoomName,
                    Price = s.FirstOrDefault().RoomPrice,
                    Image = s.FirstOrDefault().RoomImage

                }).ToList()
            };
        }
    }
}
