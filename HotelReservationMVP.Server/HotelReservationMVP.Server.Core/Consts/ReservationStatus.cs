using System.ComponentModel;

namespace HotelReservationMVP.Server.Core.Consts
{
    public enum ReservationStatus
    {
        [Description("در انتظار تایید هتل")]
        WaitingForHotelApproval,
        [Description("در انتظار پرداخت")]
        WaitingForPayment,
        [Description("رزرو ناموفق")]
        Reject,
        [Description("رزرو قطعی")]
        Reserved,
        [Description("پرداخت شده با خطا، با پشتیبانی تماس حاصل فرمایید.")]
        PaidButReject,
    }
}
