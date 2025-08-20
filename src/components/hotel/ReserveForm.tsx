import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { CustomerBookingInfo } from "../../types/CustomerBookingData";
import { useEffect, useState } from "react";
import { getNations } from "../../api/hotel";
import type { Nation } from "../../types/nations";
import { toPersianDigits } from "../../utils/persianDigits";


// Zod schema for validation
const formSchema = z
    .object({
        firstName: z.string().min(1, "نام را وارد کنید"),
        lastName: z.string().min(1, "نام خانوادگی را وارد کنید"),
        guestFirstName: z.string().min(1, "نام را وارد کنید"),
        guestLastName: z.string().min(1, "نام خانوادگی را وارد کنید"),
        mobile: z
            .string()
            .min(10, "شماره موبایل باید حداقل 10 رقم باشد")
            .max(11, "شماره موبایل باید حداکثر 11 رقم باشد")
            .regex(/^\d{10,11}$/, "فرمت شماره موبایل معتبر نیست"),
        phone: z.string().optional(),
        email: z.email("ایمیل معتبر نیست"),
        nationality: z.number(),
        isBusinessTravel: z.number().optional(),
        nationId: z.number().optional(),
    })
    .refine(
        (data) => {
            if (data.nationality === 1) {
                return !!data.nationId;
            }
            return true;
        },
        {
            message: "لطفا ملیت را انتخاب کنید",
            path: ["nationId"],
        }
    );



interface ReserveFormProps {
    onSubmit: (data: CustomerBookingInfo) => void;
    price: number
}

export default function ReserveForm({ onSubmit, price }: ReserveFormProps) {
    const [nations, setNations] = useState<Nation[]>([]);
    const [loadingNations, setLoadingNations] = useState(false);
    // react-hook-form setup with Zod resolver
    const form = useForm<CustomerBookingInfo>({
        resolver: zodResolver(formSchema),
    });


    // load nations when nationality = 1 (foreign)
    const nationalityValue = form.watch("nationality");

    // ✅ use async/await for fetching nations
    useEffect(() => {
        debugger
        const fetchNations = async () => {
            if (nationalityValue == 1) {
                try {
                    setLoadingNations(true);
                    const result = await getNations();
                    setNations(result);
                } finally {
                    setLoadingNations(false);
                }
            }
        };
        fetchNations();
    }, [nationalityValue]);

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className=" border rounded p-6">
                    <h2 className="text-xl font-bold mb-6 text-right">اطلاعات رزرو کننده</h2>
                    <p className="text-start mb-4">لازم به ذکر است که اطلاعات رزرو کننده برای هتل ارسال نمی شود و تنها اسم کسانی که در بخش اتاقها وارد می نمائید, برای هتل ارسال می شود, لذا در هنگام پرکردن اطلاعات دقت لازم را مبذول فرمائید.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block mb-1 text-right">
                                نام
                            </label>
                            <input
                                id="firstName"
                                {...form.register("firstName")}
                                className={`w-full border rounded px-3 py-2 ${form.formState.errors.firstName ? "border-red-500" : ""
                                    }`}
                            />
                            {form.formState.errors.firstName && (
                                <p className="text-red-500 mt-1 text-sm">{form.formState.errors.firstName.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block mb-1 text-right">
                                نام خانوادگی
                            </label>
                            <input
                                id="lastName"
                                {...form.register("lastName")}
                                className={`w-full border rounded px-3 py-2 ${form.formState.errors.lastName ? "border-red-500" : ""
                                    }`}
                            />
                            {form.formState.errors.lastName && (
                                <p className="text-red-500 mt-1 text-sm">{form.formState.errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="mobile" className="block mb-1 text-right">
                                شماره موبایل
                            </label>
                            <input
                                id="mobile"
                                {...form.register("mobile")}
                                type="tel"
                                className={`w-full border rounded px-3 py-2 ${form.formState.errors.mobile ? "border-red-500" : ""
                                    }`}
                            />
                            {form.formState.errors.mobile && (
                                <p className="text-red-500 mt-1 text-sm">{form.formState.errors.mobile.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block mb-1 text-right">
                                شماره تلفن
                            </label>
                            <input
                                id="phone"
                                {...form.register("phone")}
                                type="tel"
                                className={`w-full border rounded px-3 py-2 ${form.formState.errors.phone ? "border-red-500" : ""
                                    }`}
                            />
                            {form.formState.errors.phone && (
                                <p className="text-red-500 mt-1 text-sm">{form.formState.errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 text-right">
                            ایمیل
                        </label>
                        <input
                            id="email"
                            {...form.register("email")}
                            type="email"
                            className={`w-full border rounded px-3 py-2 ${form.formState.errors.email ? "border-red-500" : ""
                                }`}
                        />
                        {form.formState.errors.email && (
                            <p className="text-red-500 mt-1 text-sm">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                </div>


                <div className="border rounded p-6 mt-4">
                    <h2 className="text-xl font-bold mb-6 text-right">مشخصات مهمان</h2>
                    <p className="text-start mb-4">
                        لطفا نام یکی از میهمانانی که در این اتاق اقامت خواهند داشت را وارد نمائید.
                    </p>

                    {/* Nationality selection */}
                    <div className="p-3 bg-slate-100 rounded-sm">
                        <h4 className="text-lg font-bold text-start mb-1">تابعیت</h4>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="0"
                                    {...form.register("nationality", { valueAsNumber: true })}
                                    className="accent-blue-600 w-4 h-4"
                                />
                                <span>ایرانی</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="1"
                                    {...form.register("nationality", { valueAsNumber: true })}
                                    className="accent-blue-600 w-4 h-4"
                                />
                                <span>خارجی</span>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label htmlFor="guestFirstName" className="block mb-1 text-right"> نام مهمان </label>
                            <input id="guestFirstName"
                                {...form.register("guestFirstName")}
                                className={`w-full border rounded px-3 py-2 ${form.formState.errors.guestFirstName ? "border-red-500" : ""}`} />
                            {form.formState.errors.guestFirstName && (
                                <p className="text-red-500 mt-1 text-sm">{form.formState.errors.guestFirstName.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-1 text-right"> نام خانوادگی مهمان </label>
                            <input id="guestLastName"
                                {...form.register("guestLastName")}
                                className={`w-full border rounded px-3 py-2 ${form.formState.errors.guestLastName ? "border-red-500" : ""}`} />
                            {form.formState.errors.guestLastName && (
                                <p className="text-red-500 mt-1 text-sm">{form.formState.errors.guestLastName.message}</p>
                            )}
                        </div>
                        <div>
                            {/* Dropdown if foreign */}
                            {nationalityValue == 1 && (
                                <div className="mt-4 flex flex-col">
                                    <label htmlFor="nationId" className="block mb-1 text-right">
                                        انتخاب ملیت
                                    </label>
                                    <select
                                        id="nationId"
                                        {...form.register("nationId", { valueAsNumber: true })}
                                        className="border rounded px-2 py-2"
                                        disabled={loadingNations}
                                    >
                                        <option value="">-- انتخاب کنید --</option>
                                        {nations.map((nation) => (
                                            <option key={nation.id} value={nation.id}>
                                                {nation.title}
                                            </option>
                                        ))}
                                    </select>
                                    {form.formState.errors.nationId && (
                                        <p className="text-red-500 mt-1 text-sm">
                                            {form.formState.errors.nationId.message as string}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className=" border rounded p-6">
                    <h4 className="text-lg font-bold text-start mb-1">آیا سفر شما کاری است ؟  </h4>
                    <div className="flex items-center gap-36">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="0"
                                {...form.register("isBusinessTravel", { valueAsNumber: true })}
                                className="accent-blue-600 w-4 h-4"
                            />
                            <span>بله</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="1"
                                {...form.register("isBusinessTravel", { valueAsNumber: true })}
                                className="accent-blue-600 w-4 h-4"
                            />
                            <span>خیر</span>
                        </label>
                    </div>
                </div>

                <div className=" border rounded p-6 flex justify-between">
                    <div className="flex gap-3 items-center font-bold text-xl">
                        <p>مبلغ قابل پرداخت</p>
                        <p className="flex items-center gap-1"> <section className="text-blue-600">{price.toLocaleString("fa-IR")}</section> ریال</p>
                    </div>
                    <button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        تایید و ادامه رزرو
                    </button>
                </div>
            </form>
        </>
    )
}
