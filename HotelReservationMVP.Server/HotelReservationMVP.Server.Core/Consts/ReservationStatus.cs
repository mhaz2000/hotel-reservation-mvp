using System.ComponentModel;

namespace HotelReservationMVP.Server.Core.Consts
{
    public enum ReservationStatus
    {
        [Description("در انتظار تایید هتل")]
        WaitingForHotelApproval,
        [Description("در انتظار پرداخت")]
        WaitingForPayment,
        [Description("لیست انتظار")]
        WaitingList,
        [Description("رزرو ناموفق")]
        Reject,
        [Description("رزرو قطعی")]
        Reserved
    }
}
