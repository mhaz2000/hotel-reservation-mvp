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
        private readonly ITransactionDetailRepository _transactionDetailRepository;
        private readonly IAsanPardakhtService _asanPardakhtService;

        public PaymentService(IReservationRepository reservationRepository, ITransactionDetailRepository transactionDetailRepository,
            IAsanPardakhtService asanPardakhtService, ITransactionRepository transactionRepository)
        {
            _reservationRepository = reservationRepository;
            _asanPardakhtService = asanPardakhtService;
            _transactionRepository = transactionRepository;
            _transactionDetailRepository = transactionDetailRepository;
        }

        public async Task<PaymentStatusDto> GetPaymentStatusAsync(long invoiceId)
        {
            var transaction = await _transactionRepository.GetAsync(c => c.LocalId == invoiceId, t => t.Include(r => r.TransactionDetail));
            if (transaction.Status == TransactionStatus.Failed)
                return new PaymentStatusDto()
                {
                    IsSuccess = false
                };
            else
                return new PaymentStatusDto()
                {
                    IsSuccess = true,
                    Amount = transaction.TransactionDetail.Amount,
                    Rrn = transaction.TransactionDetail.Rrn,
                };
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

        public async Task VerifyAsync(long invoiceId)
        {
            var transaction = await _transactionRepository.GetAsync(c => c.LocalId == invoiceId);

            var verifyResult = await _asanPardakhtService.VerifyAsync(invoiceId);
            var transactionDetail = new TransactionDetail()
            {
                Amount = verifyResult.Amount,
                CardNumber = verifyResult.CardNumber,
                PayGateTranID = verifyResult.PayGateTranID,
                RefId = verifyResult.RefId,
                ResCode = verifyResult.ResCode,
                Rrn = verifyResult.Rrn,
                ResMessage = verifyResult.ResMessage
            };

            if (verifyResult.ResCode == 0)
            {
                var settlementResult = await _asanPardakhtService.SettleAsync(new VerifyRequest() { payGateTranId = verifyResult.PayGateTranID.Value, merchantConfigurationId = 0 });
                if(settlementResult.ResCode != 0)
                    transaction.Status = TransactionStatus.Failed;

                transaction.Status = TransactionStatus.PaidVerfied;
            }
            else
                transaction.Status = TransactionStatus.Failed;

            await _transactionDetailRepository.AddAsync(transactionDetail);

            transaction.TransactionDetail = transactionDetail;
            await _transactionRepository.UpdateAsync(transaction);
        }
    }
}
