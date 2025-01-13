import "../../assets/css/printPage.css"
import gray from "../../assets/images/gray.jpg"

const PrintReport = (data)=>{
    return (
        <div className="border border-gray-400 h-full p-4">
            <div className="grid grid-cols-4 gap-4" style={{direction: "rtl"}}>
                <div className="bg-black bg-black-css yekanBlack text-white p-2">
                    عنوان گزارش:
                </div>
                <div className="text-black flex items-center gap-2">
                    <p className="yekanBlack text-black">تاریخ:</p>
                    <p>1403/05/4</p>
                </div>
                <div className="text-black flex items-center gap-2">
                    <p className="yekanBlack text-black">ساعت:</p>
                    <p>14:29</p>
                </div>
                <div className="text-black flex items-center gap-2">
                    <p className="yekanBlack text-black">کاربر:</p>
                    <p className="">علیرضا مهربان</p>
                </div>
            </div>
            <div className="border border-black">
                <p className="text-right p-2">متن عنوان</p>
            </div>

            <div className="grid grid-cols-4 mt-6" style={{direction: "rtl"}}>
                <div className="bg-black bg-black-css yekanBlack text-white p-2">
                    تصاویر گزارش:
                </div>
            </div>


            <div className="border border-black grid grid-cols-2 p-2" style={{direction: "rtl"}}>
                {/* right side */}
                <div className="">
                    {/* top right */}
                    <div className="flex items-center justify-around text-[14px]">
                        <p>تاریخ عکس گرفته شده:</p>
                        <p>1403/05/27 - 12:40</p>
                    </div>
                    {/* bottom right */}
                    <div className="p-4">
                        <img src={gray} className="rounded" />
                    </div>
                </div>
                {/* left side */}
                <div className="border-r border-black">
                    {/* top left */}
                    <div className="flex items-center justify-around text-[14px]">
                        <p>تاریخ عکس گرفته شده:</p>
                        <p>1403/05/27 - 12:40</p>
                    </div>
                    {/* bottom left */}
                    <div className="p-4">
                        <img src={gray} className="rounded" />
                    </div>
                </div>
            </div>
            <div className="border border-black p-2 border-t-0" style={{direction: "rtl"}}>
                <div className="flex items-center gap-4">
                    <p>موقعیت جغرافیایی:</p>
                    <p>345.324 , 12.67</p>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-2">
                    <div>
                        <p>زاویه دوربین: <span className="mr-1">45</span></p>
                    </div>
                    <div>
                        <p>سرعت باد: <span className="mr-1">36</span></p>
                    </div>
                    <div>
                        <p>گاز بالن: <span className="mr-1">45</span></p>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-4 mt-6" style={{direction: "rtl"}}>
                <div className="bg-black bg-black-css yekanBlack text-white p-2">
                    شرح تخلف:
                </div>
            </div>
            <div className="border border-black p-3 text-justify" style={{direction: "rtl"}}>
                <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای 
                </p>
            </div>


        </div>
    )
}


export default PrintReport;
