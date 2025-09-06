using HotelReservationMVP.Server.Application.DTOs;
using HotelReservationMVP.Server.Application.Providers;
using HotelReservationMVP.Server.Application.Providers.Models;
using HotelReservationMVP.Server.Core.Consts;
using HotelReservationMVP.Server.Core.Entities;
using HotelReservationMVP.Server.Core.ExternalServices;
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
        private readonly IExternalApiClient _externalApiClient;


        public PaymentService(IReservationRepository reservationRepository, ITransactionDetailRepository transactionDetailRepository,
            IAsanPardakhtService asanPardakhtService, ITransactionRepository transactionRepository, IExternalApiClient externalApiClient)
        {
            _reservationRepository = reservationRepository;
            _asanPardakhtService = asanPardakhtService;
            _transactionRepository = transactionRepository;
            _transactionDetailRepository = transactionDetailRepository;
            _externalApiClient = externalApiClient;
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

            var verifyResult = await _asanPardakhtService.TransactionResultAsync(invoiceId);
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
                var verificationResult = await _asanPardakhtService.VerifyAsync(new VerifyRequest() { payGateTranId = verifyResult.PayGateTranID.Value, merchantConfigurationId = 0 });
                if (verificationResult.ResCode != 0)
                    transaction.Status = TransactionStatus.Failed;
                else
                {
                    //var settlementResult = await _asanPardakhtService.SettleAsync(new VerifyRequest() { payGateTranId = verifyResult.PayGateTranID.Value, merchantConfigurationId = 0 });

                    transaction.Status = TransactionStatus.PaidVerfied;
                    var result = await _externalApiClient.FinalizeBookAsync(transaction.ReserveId);
                    var reservation = await _reservationRepository.GetAsync(r => r.ReserveId == transaction.ReserveId);
                    if (!result.IsFinalized)
                        reservation.Status = ReservationStatus.PaidButReject;
                    else
                        reservation.Status = ReservationStatus.Reserved;
                }

            }
            else
                transaction.Status = TransactionStatus.Failed;

            await _transactionDetailRepository.AddAsync(transactionDetail);

            transaction.TransactionDetail = transactionDetail;
            await _transactionRepository.UpdateAsync(transaction);
        }
    }
}
