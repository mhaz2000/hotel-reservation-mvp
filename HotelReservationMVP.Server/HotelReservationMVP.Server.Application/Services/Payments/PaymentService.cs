using HotelReservationMVP.Server.Application.DTOs;
using HotelReservationMVP.Server.Application.Providers;
using HotelReservationMVP.Server.Application.Providers.Models;
using HotelReservationMVP.Server.Core.Consts;
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

        public async Task<PaymentStatusDto> GetPaymentStatusAsync()
        {
            return await Task.FromResult(new PaymentStatusDto() { IsSuccess =  true });
        }

        public async Task<string?> RequestPaymentAsync(ulong reserveId)
        {
            var reservation = await _reservationRepository.GetAsync(c => c.ReserveId == reserveId, include: c => c.Include(t => t.Rooms));
            var roomsPrice = reservation.Rooms.Sum(r => r.RoomPrice);

            var lastId = await _transactionRepository.GetLastLocalIdAsync();
            var transaction = new Transaction()
            {
                Price = roomsPrice,
                ReserveId = reserveId,
                Status = TransactionStatus.Pending,
                LocalId = lastId
            };

            var tokenRequest = new TokenRequest
            {
                amountInRials = (ulong)roomsPrice,
                localInvoiceId = lastId,
            };

            var result = await _asanPardakhtService.GetTokenAsync(tokenRequest);

            string redirectUrl = null;

            if (result.ResCode == 0)
            {
                transaction.RefId = result.RefId;
                redirectUrl = $"https://asan.shaparak.ir?RefId={result.RefId}";
            }
            else
            {
                transaction.Status = TransactionStatus.Failed;
            }

            await _transactionRepository.AddAsync(transaction);

            return redirectUrl;
        }

        public async Task<string> VerifyAsync(long payGateTranId, string refId)
        {
            var transaction = await _transactionRepository.GetAsync(c => c.RefId == refId);

            var verifyCommand = new VerifyRequest
            {
                payGateTranId = payGateTranId
            };
            var verifyResult = await _asanPardakhtService.VerifyAsync(verifyCommand);

            transaction.Status = TransactionStatus.PaidVerfied;
            await _transactionRepository.UpdateAsync(transaction);

            // (3) Redirect browser to frontend
            var redirectUrl = $"https://site.ir/payment-result?status={(verifyResult.ResCode == 0 ? "success" : "failed")}&invoice={""}";

            return redirectUrl;
        }
    }
}
