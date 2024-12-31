import SideBarMain from "../main/sideBar";
import geo from "../../assets/images/GaugeMeter3.png"

const data = [
    {
        status: 'ارسال گزارش    ',
        beforeImage: 'دیدن عکس',
        angle: '45°',
        location: '35.6892° N, 51.3890° E',
        time: '12:00',
    },
    {
        status: 'ارسال گزارش    ',
        beforeImage: 'دیدن عکس',
        angle: '45°',
        location: '35.6892° N, 51.3890° E',
        time: '12:00',
    },
    {
        status: 'ارسال گزارش    ',
        beforeImage: 'دیدن عکس',
        angle: '45°',
        location: '35.6892° N, 51.3890° E',
        time: '12:00',
    },
    {
        status: 'ارسال گزارش    ',
        beforeImage: 'دیدن عکس',
        angle: '45°',
        location: '35.6892° N, 51.3890° E',
        time: '12:00',
    },
];

const AllReports = ()=>{
    return (
        <div className="yekanMed">
            {/* header */}
            <div className="bg-blue-500 text-white p-2 text-[17px]">
                <div className="flex items-center justify-between mx-5">
                    {/* right */}
                    <div className="">
                        <a href="#">خروج</a>
                    </div>
                    {/* left */}
                    <div className="">
                        <ul className="flex items-center gap-5">
                            <li>
                                <a href="#">
                                    تنظیمات
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    فایل
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    نمایش
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* right side bar */}
            <div className="md:grid md:grid-cols-12">
                <div className="md:col-span-10 bg-[#f0f0f0]">
                    {/* top header */}
                    <div className="bg-gray-300 text-gray-500 text-[15px] text-right yekanBold p-2">
                        <a href="/">صفحه اصلی</a>
                    </div>

                    {/* baloon information */}
                    <div className="p-3 w-[90%] mx-auto">
                        <h1 className="text-gray-400 yekanBlack text-right text-[2rem]">گزارشات ارسال شده</h1>

                        <h3 className="text-[2.5rem] text-gray-600 yekanBlack mt-10 text-center">شما تا اکنون <span>3</span> گزارش ارسال کرده اید</h3>


                        <div className="overflow-x-auto mt-10">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                <thead className="rounded-lg">
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">وضعیت</th>
                                        <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">عکس قبل/بعد</th>
                                        <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">زاویه دوربین</th>
                                        <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">موقعیت زمین</th>
                                        <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">ساعت</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-[17px] yekanBold font-light">
                                    {data.map((item, index) => (
                                        <tr key={index} className="border-b border-dotted border-gray-300 hover:bg-gray-100 text-center">
                                            <td className="py-3 px-6">
                                                <a href="#" className="text-white bg-blue-500 rounded-3xl px-[2rem] text-center py-2 yekanBlack">{item.status}</a>
                                            </td>
                                            <td className="py-5 px-6">
                                                <a href="#">{item.beforeImage}</a>
                                            </td>
                                            <td className="py-5 px-6">{item.angle}</td>
                                            <td className="py-5 px-6">{item.location}</td>
                                            <td className="py-5 px-6">{item.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <SideBarMain />
            </div>
            {/* main app */}


        </div>
    )
}


export default AllReports;
