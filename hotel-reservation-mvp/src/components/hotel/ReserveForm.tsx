import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { CustomerBookingInfo } from "../../types/CustomerBookingData";
import { useEffect, useState } from "react";
import { getNations } from "../../api/hotel";
import type { Nation } from "../../types/nations";
import type { RoomBooking } from "../../types/reservation";

// ✅ Zod schema
const roomSchema = z.object({
    roomId: z.number(),
    roomImage: z.any(),
    roomPrice: z.number(),
    roomName: z.string(),
    guestFirstName: z.string().min(1, "نام را وارد کنید"),
    guestLastName: z.string().min(1, "نام خانوادگی را وارد کنید"),
    nationality: z.string(),
    nationId: z.number().optional(),
}).refine(
    (data) => {
        if (data.nationality === "1") return !!data.nationId;
        return true;
    },
    { message: "لطفا ملیت را انتخاب کنید", path: ["nationId"] }
);

const formSchema = z.object({
    firstName: z.string().min(1, "نام را وارد کنید"),
    lastName: z.string().min(1, "نام خانوادگی را وارد کنید"),
    mobile: z.string().min(10, 'فرمت شماره موبایل صحیح نیست.')
        .max(11, 'فرمت شماره موبایل صحیح نیست.')
        .regex(/^\d{10,11}$/, 'فرمت شماره موبایل صحیح نیست.'),
    phone: z.string().optional(),
    email: z.email("ایمیل معتبر نیست"),
    rooms: z.array(roomSchema).min(1, "حداقل یک اتاق باید انتخاب شود"),
});

interface ReserveFormProps {
    onSubmit: (data: CustomerBookingInfo) => void;
    price: number;
    rooms: RoomBooking[];
}

export default function ReserveForm({ onSubmit, price, rooms }: ReserveFormProps) {
    const [nations, setNations] = useState<Nation[]>([]);
    const [loadingNations, setLoadingNations] = useState(false);

    const form = useForm<CustomerBookingInfo>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isBusinessTravel: 0,
            rooms: rooms.flatMap((room) =>
                Array.from({ length: room.quantity }, () => ({
                    roomId: room.id,
                    roomName: room.name,
                    roomImage: room.image ?? '',
                    roomPrice: room.price,
                    guestFirstName: "",
                    guestLastName: "",
                    nationality: "0",
                    nationId: undefined,
                }))
            ),
        },
    });


    const { fields } = useFieldArray({
        control: form.control,
        name: "rooms",
    });

    // Load nations once (you can make this per-room if needed)
    useEffect(() => {
        const fetchNations = async () => {
            try {
                setLoadingNations(true);
                const result = await getNations();
                setNations(result);
            } finally {
                setLoadingNations(false);
            }
        };
        fetchNations();
    }, []);

    const onError = (errors: any) => {
        console.log("❌ Validation errors:", errors);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4" noValidate>
            {/* رزرو کننده */}
            <div className=" border rounded p-6">
                <h2 className="text-xl font-bold mb-6 text-right">اطلاعات رزرو کننده</h2>
                <p className="text-start mb-4">
                    لازم به ذکر است که اطلاعات رزرو کننده برای هتل ارسال نمی شود و تنها اسم کسانی که در بخش اتاقها وارد
                    می نمائید, برای هتل ارسال می شود, لذا در هنگام پرکردن اطلاعات دقت لازم را مبذول فرمائید.
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

            {/* مهمان‌ها per room */}
            {fields.map((field, index) => {
                const nationalityValue = form.watch(`rooms.${index}.nationality`);

                return (
                    <div key={field.id} className="border rounded p-6 mt-4">
                        <h2 className="text-xl font-bold mb-6 text-right">مشخصات مهمان اتاق {index + 1}</h2>
                        <h3 className="text-lg font-bold mb-3 text-blue-600 text-right">{rooms.find(r => r.id == field.roomId)?.name}</h3>
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
                                        {...form.register(`rooms.${index}.nationality`)}
                                        className="accent-blue-600 w-4 h-4"
                                    />
                                    <span>ایرانی</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="1"
                                        {...form.register(`rooms.${index}.nationality`)}
                                        className="accent-blue-600 w-4 h-4"
                                    />
                                    <span>خارجی</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block mb-1 text-right">نام مهمان</label>
                                <input
                                    {...form.register(`rooms.${index}.guestFirstName`)}
                                    className={`w-full border rounded px-3 py-2 ${form.formState.errors.rooms?.[index]?.guestFirstName ? "border-red-500" : ""
                                        }`}
                                />
                                {form.formState.errors.rooms?.[index]?.guestFirstName && (
                                    <p className="text-red-500 mt-1 text-sm">
                                        {form.formState.errors.rooms[index]?.guestFirstName?.message as string}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 text-right">نام خانوادگی مهمان</label>
                                <input
                                    {...form.register(`rooms.${index}.guestLastName`)}
                                    className={`w-full border rounded px-3 py-2 ${form.formState.errors.rooms?.[index]?.guestLastName ? "border-red-500" : ""
                                        }`}
                                />
                                {form.formState.errors.rooms?.[index]?.guestLastName && (
                                    <p className="text-red-500 mt-1 text-sm">
                                        {form.formState.errors.rooms[index]?.guestLastName?.message as string}
                                    </p>
                                )}
                            </div>

                            <div>
                                {nationalityValue === "1" && (
                                    <div className="mt-4 flex flex-col">
                                        <label className="block mb-1 text-right">انتخاب ملیت</label>
                                        <select
                                            {...form.register(`rooms.${index}.nationId`, { valueAsNumber: true })}
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
                                        {form.formState.errors.rooms?.[index]?.nationId && (
                                            <p className="text-red-500 mt-1 text-sm">
                                                {form.formState.errors.rooms[index]?.nationId?.message as string}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* سفر کاری */}
            <div className=" border rounded p-6">
                <h4 className="text-lg font-bold text-start mb-1">آیا سفر شما کاری است ؟</h4>
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

            {/* قیمت */}
            <div className=" border rounded p-6 flex justify-between">
                <div className="flex gap-3 items-center font-bold text-xl">
                    <p>مبلغ قابل پرداخت</p>
                    <div className="flex items-center gap-1">
                        <section className="text-blue-600">{price.toLocaleString("fa-IR")}</section> ریال
                    </div>
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
    );
}
