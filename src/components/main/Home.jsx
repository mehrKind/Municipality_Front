import SideBarMain from "./sideBar";
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

const Home = ()=>{
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
                        <p>صفحه اصلی</p>
                    </div>


                    {/* baloon information */}
                    <div className="p-3 w-[90%] mx-auto">

                        <div className="flex items-center justify-center gap-[4rem] mt-5">
                            <div className="flex flex-col items-center relative">
                                <img src={geo} className="w-[200px]" />
                                <div className=" -mt-4 w-[50px] h-[50px] rounded-full z-10 bg-gray-500 border-4 border-gray-400"></div>
                                <div className="absolute bg-black w-[100px] h-[100px] top-3" style={{clipPath: 'polygon(50% 0%, 40% 100%, 60% 100%)'}}></div>
                                <p className="mt-2 text-gray-500 text-[20px] yekanBold">گاز بالن</p>
                            </div>
                            <div className="flex flex-col items-center relative">
                                <img src={geo} className="w-[200px]" />
                                <div className=" -mt-4 w-[50px] h-[50px] rounded-full z-10 bg-gray-500 border-4 border-gray-400"></div>
                                <div className="absolute bg-black w-[100px] h-[100px] top-3" style={{clipPath: 'polygon(50% 0%, 40% 100%, 60% 100%)'}}></div>
                                <p className="mt-2 text-gray-500 text-[20px] yekanBold">سرعت باد</p>
                            </div>
                        </div>


                        <h2 className="yekanBlack text-[1.7rem] text-gray-500/90 text-right">
                            اطلاعات دریافتی از بالن
                        </h2>

                        <div className="bg-white rounded-lg p-4 flex flex-wrap items-center justify-between shadow-md mt-4 flex-row-reverse">
                            <div className="flex flex-col items-center p-4 w-full sm:w-1/5">
                                <p className="yekanBlack text-[1.3rem] text-gray-500">موقعیت فعلی</p>
                                <p className="text-gray-500 mt-4">10.20.30 شمال</p>
                            </div>
                            {/* <div className="separator"></div> Separator */}
                            <div className="flex flex-col items-center p-4 w-full sm:w-1/5 md:border-x-2 border-dotted border-gray-400">
                                <p className="yekanBlack text-[1.3rem] text-gray-500">سرعت باد</p>
                                <p className="text-gray-500 mt-4">20 Km/h</p>
                            </div>
                            {/* <div className="separator"></div> Separator */}
                            <div className="flex flex-col items-center p-4 w-full sm:w-1/5">
                                <p className="yekanBlack text-[1.3rem] text-gray-500">زاویه دوربین</p>
                                <p className="text-gray-500 mt-4">45 درجه</p>
                            </div>
                            {/* <div className="separator"></div> Separator */}
                            <div className="flex flex-col items-center p-4 w-full sm:w-1/5 md:border-x-2 border-dotted border-gray-400">
                                <p className="yekanBlack text-[1.3rem] text-gray-500">گاز بالن</p>
                                <p className="text-gray-500 mt-4">10 L</p>
                            </div>
                            
                            <div className="flex flex-col items-center p-4 w-full sm:w-1/5">
                                <p className="yekanBlack text-[1.3rem] text-gray-500">ساعت</p>
                                <p className="text-gray-500 mt-4">10:30</p>
                            </div>
                        </div>

                        <div className="flex max-md:flex-col-reverse justify-between mx-2 items-center mt-[4rem]">
                            <a href="#" className="text-blue-500 underline text-[17px] yekanMed">مشاهده همه</a>
                            <h2 className="yekanBlack text-[1.7rem] text-gray-500/90 text-right">
                                تخلفات در صف تایید  <span className="text-blue-500 underline text-[15px] yekanMed">(20 عدد)</span>
                            </h2>

                        </div>
                        <div className="overflow-x-auto mt-3">
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


export default Home;
