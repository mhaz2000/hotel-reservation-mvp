using HotelReservationMVP.Server.Core.Entities;
using NReco.PdfGenerator;
using System.Globalization;
using System.Reflection;

namespace HotelReservationMVP.Server.Application.Services.Voucher
{
    public class VoucherService : IVoucherService
    {
        public MemoryStream GetVoucher(Reservation reservation)
        {
            var pc = new PersianCalendar();
            var signImagePath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) + "\\statics\\sign.png";
            var logoImagePath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) + "\\statics\\IranHotelLogo.png";

            string html = @"
            <html lang=""en"">
            
            <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>Document</title>
            
                <style>
                    body {
                        direction: rtl !important;
                        font-family: 'Vazirmatn', sans-serif;
                        margin: 0;
                        padding: 0;
                        margin-top: 20px;
                        margin-bottom: 20px;
                    }
            
                    p {
                        margin: 0;
                    }
            
                    table,
                    tr,
                    td,
                    th {
                        border: none;
                        border-collapse: collapse;
                    }
            
                    td {
                        text-align: center;
                        vertical-align: top;
                    }
            
                    .header-table {
                        width: 100%;
                    }
            
                    .header-table td {
                        padding: 5px;
                    }
            
                    .info-table {
                        width: 80%;
                        margin: 0 100px;
                    }
            
                    .checkinout-table {
                        width: 100%;
                        margin-top: 20px;
                    }
            
                    .footer-sign {
                        width: 100%;
                        margin-top: 20px;
                        text-align: end;
                    }
                </style>
            </head>";

            html += @$"
            <body>
                <div>
                    <!-- Header -->
                    <table class=""header-table"">
                        <tr>
                            <td style=""width:70%; text-align: right; padding-right: 100px; font-size: 15px;"">
                                <p style=""margin-bottom: 10px;"">تاریخ: {pc.GetYear(DateTime.Now)}/{pc.GetMonth(DateTime.Now)}/{pc.GetDayOfMonth(DateTime.Now)}</p>
                                <p>شماره: 14032233917613</p>
                            </td>
                            <td style=""width:30%; text-align: left; padding-left: 50px;"">
                            <img src=""{logoImagePath}"" width=""120"" height=""60"">
            
                            </td>
                        </tr>
                    </table>
            
                    <h2 style=""margin-right: 100px;"">واچر مهمان</h2>
            
                    <table class=""info-table"">
                        <tr>
                            <td style=""width: 60%; text-align: right;"">
                                <h3>اطلاعات رزرو كننده</h3>
                                <p>تلفن رزرو کننده: {reservation.Phone}</p>
                                <p>موبایل: {reservation.Mobile}</p>
                            </td>
                            <td style=""width: 40%; text-align: right;"">
                                <h3>اطلاعات هتل</h3>
                                <p>نام هتل: {reservation.HotelName}</p>
                                <p>آدرس: {reservation.HotelAddress}</p>
                                <p>تلفن:</p>
                            </td>
                        </tr>
                    </table>
            
                    <div style=""margin: 60px 40px;"">
                        <table class=""checkinout-table"">
                            <tr>
                                <td style=""width: 20%; text-align: right;"">
                                    <p style=""margin-right: 10px;"">کد رهگیری:</p>
                                </td>
                                <td style=""width: 80%;"">
                                    <table style=""width:100%;"">
                                        <tr>
                                            <td style=""width: 40%; text-align: left;"">
                                                <p style=""margin-bottom: 30px;"">تاریخ ورود: {reservation.ArrivalDate}</p>
                                                <p>ساعت ورود: 12</p>
                                            </td>
                                            <td style=""width: 20%; text-align: center;"">
                                                <p style=""font-size: 40px; font-weight: bold;"">←</p>
                                            </td>
                                            <td style=""width: 40%; text-align: right;"">
                                                <p style=""margin-bottom: 30px;"">تاریخ خروج: {reservation.CheckoutDate}</p>
                                                <p>ساعت خروج: 14</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
            
                        <!-- Room Info -->
                        <div>
                            <h3 style=""margin-right: 10px;"">مشخصات اتاق</h3>
                            <table style=""width: 100%; border: 1px solid #ccc;"">
                                <tr style=""background-color: lightgray;"">
                                    <th>اتاق</th>
                                    <th>نام میهمان</th>
                                    <th>نوع اتاق</th>
                                    <th>نفر اضافه</th>
                                    <th>ورود</th>
                                    <th>خروج</th>
                                    <th>خدمات</th>
                                </tr>";

            foreach (var room in reservation.Rooms)
            {

                html += $@"
                                <tr>
                                    <td>{room.RoomName}</td>
                                    <td>{room.FirstName + " " + room.LastName}</td>
                                    <td></td>
                                    <td>0</td>
                                    <td>12</td>
                                    <td>14</td>
                                    <td></td>
                                </tr>";
            }
            html += @$"
                            </table>
                        </div>
                    </div>
            
                    <!-- Balance Section -->
                    <div style=""width: 100%; padding: 15px 0px; background-color: rgb(22, 120, 217);"">
                        <p style=""text-align: end; margin: 0px 75px;"">مانده قابل دریافت: 0 ریال</p>
                    </div>
            
                    <!-- Signature -->
                    <div class=""footer-sign"">
                        <img src=""{signImagePath}"" width=""200"" height=""60"">
            
                    </div>
            
                    <!-- Notes -->
                    <p style=""margin: 30px 20px; font-weight: bold"">
                        قيمت هاي اعلام شده هتل پرسپوليس شيراز برروي شبكه شامل نرخ برد سال +1404 كارمزد شبكه ايران هتل می باشد. توجه
                        داشته باشيد كه هتل به صورت علی الحساب می باشد كه در صورت اعلام هرگونه تغيير قيمت از سوی هتل ميهمان موظف به
                        پرداخت مابه التفاوت می باشد. به علت شرايط خاص رزرو نوروزي و سخت گيرهاي هتل هاي ايران، پس از قطعي شدن رزرو،
                        امكان كنسلي به هيچ عنوان وجود ندارد و در صورت كنسلي هيچ مبلغي عودت نخواهد شد، پس خواهشمند است قبل از اقدام
                        به رزرو، از سفر خود اطمينان حاصل نمائيد. </p>
            
                    <div style=""margin: 30px 20px; font-weight: bold;"">
                        <h2 style=""color: rgb(39, 39, 236);"">نکات مهم مربرط به هتل</h2>
                        <p>در صورت درخواست مسافر</p>
                        <br>
                        <p>براي لغو و به هر علت،اعمال جریمه مطابق قانون پرسپوليس شيراز پس از پرسيده شدن خواهد بود. همراه داشتن مدارک
                            معتبر شناسايی ( داشتن شناسنامه برای زوجين ) برای خود و همراهان هنگام ورود به هتل الزامی است، لازم به ذكر
                            است برخی از هتل ها صيغه نامه را قبول نمی كنند، خواهشمند است در صورت داشتن صيغه نامه و موارد خاص، قبل از
                            ورود به هتل از اين مسئله آگاه شويد تا مشكلی در هنگام ورود برايتان پيش نيايد. طبق قوانين جمهوری اسلامی،
                            تمامی افراد يک اتاق بايد باهم محرميت داشته باشند و مسئوليت كنترل محرميت افراد در هر اتاق بر عهده شخص
                            رزرو كننده ميباشد در هر لحظه با مراجعه به سايت www.IranHotelOnline.com و در قسمت پيگيری و می توانيد
                            اطلاعات فوق را مشاهده نماييد.</p>
                        <br>
                        <p>
                            جهت هر گونه سوال يا مشكل خاصی هر ساعت از شبانه روز ميتوانيد با كارشناسان ما به آدرس
                            www.IranHotelOnline.com ارتباط برقرار كنيد.
                        </p>
                    </div>
                </div>
            </body>
            
            </html>
            ";

            var htmlToPdf = new HtmlToPdfConverter
            {
                // Optional settings
                Size = PageSize.A4,
                Orientation = PageOrientation.Portrait,
                Margins = new PageMargins { Top = 0, Bottom = 0, Left = 10, Right = 10 },
                CustomWkHtmlArgs = "--enable-local-file-access" // Enable local file access

            };

            // Convert HTML to PDF bytes
            byte[] pdfBytes = htmlToPdf.GeneratePdf(html);

            return new MemoryStream(pdfBytes);

        }
    }
}
