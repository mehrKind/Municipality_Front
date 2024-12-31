import profile from "../../assets/images/profile.jpg"
import { Link } from 'react-router-dom';

const links = [
    {
        name: "ارسال گزارش", // "Send Report"
        path: "/report/send"
    },
    {
        name: "گزارش های ارسال شده",
        path: "/report/all_report"
    },
    {
        name: "تصاویر گرفته شده",
        path: "/captured-images"
    },
    {
        name: "تخلفات",
        path: "/violations"
    },
    {
        name: "ویرایش دریافت کننده", // "Edit Recipient"
        path: "/edit-recipient"
    },
    {
        name: "ویرایش کاربر", // "Edit User"
        path: "/edit-user"
    },
    {
        name: "جستجوی بانک اطلاعاتی", // "Database Search"
        path: "/database-search"
    },
    {
        name: "گزارشات مدیریت", // "Management Reports"
        path: "/management-reports"
    },
    {
        name: "پاسخ های دریافت شده", // "Received Responses"
        path: "/received-responses"
    }
];


const SideBarMain = ()=>{
    return (
        <div className="yekanMed md:col-span-2 bg-[#213553] text-white p-2 text-[12px]">
            {/* profile */}
            <div className="flex justify-center items-center p-2 mt-5">
                <img src={profile} alt="user profile" className="w-[150px] h-[150px] rounded-full" />
            </div>
            <div className="flex flex-col justify-center items-center my-4">
                <h2 className="text-[15px]">کاربر شماره: 1235</h2>

                <p className="my-1">تاریخ ورود 1403/03/02</p>
                <p>ساعت ورود 11:30</p>
            </div>
            <hr className="border-b-2 border-dotted border-gray-200 w-[50%] mx-auto my-7" />

            <div className="">
                <ul className="text-right">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link className="p-2 text-[15px] hover:text-white/55 transition-all duration-200 yekanBold" to={link.path}>{link.name}</Link> <span className="mr-3">●</span>
                            <hr className="border-b-2 my-[0.8rem] border-dotted border-gray-200 w-[100%]" />
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}


export default SideBarMain;