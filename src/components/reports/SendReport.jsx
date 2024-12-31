import React, { useState, useEffect } from "react";
import profile from "../../assets/images/profile.jpg";
import gray from "../../assets/images/gray.jpg";
import api from "../conf/appUtils";

const SendReport = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded or processed image
    const [imageUrl, setImageUrl] = useState('');
    const [formData, setFormData] = useState({
        image: null,
        date: "",
        title: "",
    });
    const [isProcessing, setIsProcessing] = useState(false); // State for processing loader

    const steps = [
        { id: 1, label: "مرحله اول" },
        { id: 2, label: "مرحله دوم" },
        { id: 3, label: "پایان" },
    ];

    const handleNextStep = async () => {
        if (currentStep === 1) {
            if (isFormValid()) {
                setIsProcessing(true); // Show the loader while processing
                try {
                    const form = new FormData();
                    form.append("img_input", formData.image);
                    form.append("title", formData.title);
                    form.append("location", formData.location);
                    form.append("wind_speed", formData.wind_speed);
                    form.append("camera", formData.camera);
                    form.append("date", formData.date);
                    form.append("content", formData.content || "");
    
                    // Call the API
                    const response = await api.post("main/proccess/", form, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
    
                    if (response.data?.image_url) {
                        setImageUrl(`http://127.0.0.1:8000${response.data.image_url}`);
                    } else {
                        alert("Processing failed. No image returned.");
                    }
                } catch (error) {
                    console.error("Error during image processing:", error);
                    alert("An error occurred while processing the image.");
                } finally {
                    setIsProcessing(false); // Hide the loader
                }
            }
        }
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };



    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: file }); // Update form data with the file
                setUploadedImage(reader.result); // Preview the uploaded image
            };
            reader.readAsDataURL(file); // Read the image as data URL for preview
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTodayDate = () => {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
        setFormData({ ...formData, date: today });
    };

    const isFormValid = () => {
        if (currentStep === 1) {
            return formData.image && formData.date && formData.title; // All fields must be filled
        }
        return true; // For steps 2 and 3, we assume the form is valid
    };

    const handlePrint = () => {
        window.print();
    };

    const handleCancle = ()=>{
        return
    }

    const stepContents = [
        // ! step 1
        (
            <div className="w-[90%] mx-auto md:grid md:grid-cols-12">
                {/* image */}
                <div className="md:col-span-5">
                    <p className="text-right mb-4">تصویر گرفته شده</p>
                    <img src={uploadedImage || gray} alt="image" className="w-full" />
                    <button
                        onClick={handleNextStep}
                        className="bg-blue-500 cursor-pointer text-white py-3 rounded-lg mt-5 hover:bg-blue-400 transition duration-200 w-full yekanBlack text-[1.3rem]"
                        disabled={!isFormValid()} // Disable if the form is not valid
                    >
                        مرحله بعد
                    </button>
                </div>

                {/* content and form */}
                <div className="md:col-span-7 text-right">
                    <h1 className="text-[3rem] yekanBlack mb-4">ارسال گزارش</h1>
                    <div className="flex flex-col gap-4" style={{ direction: "rtl" }}>
                        <div className="flex items-center gap-5">
                            <label className="text-[1.3rem]">مختصات جغرافیایی زمین</label>
                            <input
                                type="text"
                                className="p-4 bg-gray-100 w-[30%] mb-5 rounded-lg focus:outline-none"
                                placeholder="مثال: 35.6892, 51.3890"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex items-center gap-5">
                            <label className="text-[1.3rem]">سرعت باد</label>
                            <input
                                type="number"
                                className="p-4 bg-gray-100 w-[30%] mb-5 rounded-lg focus:outline-none"
                                placeholder="مثال: 10"
                                name="wind_speed"
                                value={formData.wind_speed}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex items-center gap-5">
                            <label className="text-[1.3rem]">زاویه دوربین</label>
                            <input
                                type="number"
                                className="p-4 bg-gray-100 w-[30%] mb-5 rounded-lg focus:outline-none"
                                placeholder="مثال: 45"
                                name="camera"
                                value={formData.camera}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>


                    <hr className="my-5 w-[90%] mx-auto border-gray-700 border-dotted" />

                    <div className="w-[90%] mx-auto">
                        <p className="mb-3 text-[15px]">پیوست تصویر بدون پردازش</p>
                        <input
                            type="file"
                            className="p-4 bg-gray-100 w-full mb-5 rounded-lg border-0 outline-none"
                            onChange={handleImageUpload} // Handle image upload
                        />
                        <p className="mb-3 text-[15px]">زمان ثبت تصویر</p>
                        <div className="relative">
                            <input
                                type="date"
                                className="p-4 bg-gray-100 w-full mb-5 rounded-lg border-0 outline-none"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange} // Handle date input change
                            />
                            <button
                                onClick={handleTodayDate}
                                className="bg-blue-200 text-blue-900 py-4 px-4 rounded-lg absolute right-0"
                            >
                                تاریخ امروز
                            </button>
                        </div>
                        <p className="mb-3 text-[15px]">عنوان تخلف</p>
                        <input
                            type="text"
                            className="p-4 bg-gray-100 w-full mb-5 rounded-lg border-0 outline-none"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange} // Handle title input change
                            style={{ direction: "rtl" }}
                        />
                    </div>
                </div>
            </div>
        ),
        //! step 2
        (
            <div>
                <h1 className="yekanBlack text-black text-[2.3rem] text-center">پردازش تصویر</h1>
                <div className="md:w-[90%] md:mx-auto p-2 my-4">
                    {isProcessing ? (
                        <div className="flex justify-center items-center">
                            <div className="loader"></div>
                            <p className="mt-4 yekanBold text-center text-[18px]">در حال پردازش تصویر...</p>
                        </div>
                    ) : (
                        <div>
                            <div className="md:grid md:grid-cols-2 gap-10 mb-2">
                                <div>
                                    <img src={imageUrl || gray} alt="Processed" />
                                    <p className="text-gray-700 yekanBold text-center text-[20px] mt-3">تصویر پردازش شده</p>
                                </div>
                                <div>
                                    <img src={uploadedImage || gray} alt="Original" />
                                    <p className="text-gray-700 yekanBold text-center text-[20px] mt-3">تصویر اولیه</p>
                                </div>
                            </div>
                            <table className="w-full mt-6 text-right border-collapse border border-gray-300" style={{ direction: "rtl" }}>
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2">عنوان</th>
                                        <th className="border border-gray-300 px-4 py-2">مقدار</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">عنوان تخلف</td>
                                        <td className="border border-gray-300 px-4 py-2">{formData.title}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">تاریخ</td>
                                        <td className="border border-gray-300 px-4 py-2">{formData.date}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-between mt-5">
                                <button
                                    onClick={handleNextStep}
                                    className="bg-blue-500 text-white py-3 px-5 rounded-lg hover:bg-blue-400 transition duration-200 yekanBlack text-[1.3rem]"
                                >
                                    تایید و ادامه
                                </button>
                                <button
                                    onClick={() => setCurrentStep(currentStep - 1)}
                                    className="bg-gray-500 text-white py-3 px-5 rounded-lg hover:bg-gray-400 transition duration-200 yekanBlack text-[1.3rem]"
                                >
                                    بازگشت
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        ),
        //! step 3
        (
            <div>
                <h1 className="yekanBlack text-black text-[2.3rem] text-center">پایان</h1>
                <div className="md:w-[90%] md:mx-auto p-4">
                    <div className="md:grid md:grid-cols-2 gap-10 mb-4">
                        <div>
                            <img src={imageUrl || gray} alt="Processed" />
                            <p className="text-gray-700 yekanBold text-center text-[20px] mt-3">تصویر پردازش شده</p>
                        </div>
                        <div>
                            <img src={uploadedImage || gray} alt="Original" />
                            <p className="text-gray-700 yekanBold text-center text-[20px] mt-3">تصویر اولیه</p>
                        </div>
                    </div>

                    <table className="w-full mt-6 text-right border-collapse border border-gray-300" style={{ direction: "rtl" }}>
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">عنوان</th>
                                <th className="border border-gray-300 px-4 py-2">مقدار</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">عنوان تخلف</td>
                                <td className="border border-gray-300 px-4 py-2">{formData.title}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">تاریخ</td>
                                <td className="border border-gray-300 px-4 py-2">{formData.date}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-5">
                        <p className="mb-3 text-[19px] text-right yekanBlack">توضیحات اضافی</p>
                        <textarea
                            rows="5"
                            className="p-4 bg-gray-100 w-full rounded-lg border-0 outline-none"
                            placeholder="توضیحات خود را وارد کنید..."
                            style={{ direction: "rtl" }}
                        ></textarea>
                    </div>

                    <div className="flex space-x-2 my-6">
                        <button
                            onClick={handlePrint}
                            className="bg-blue-500 text-white py-3 px-5 rounded-lg hover:bg-blue-400 transition duration-200 yekanBlack text-[1.2rem]"
                        >
                            چاپ
                        </button>
                        <button
                            onClick={handlePrint}
                            className="bg-green-500 text-white py-3 px-5 rounded-lg hover:bg-green-400 transition duration-200 yekanBlack text-[1.2rem]"
                        >
                            ثبت
                        </button>
                        <button
                            onClick={handlePrint}
                            className="bg-red-500 text-white py-3 px-5 rounded-lg hover:bg-red-400 transition duration-200 yekanBlack text-[1.2rem]"
                        >
                            لغو
                        </button>
                    </div>
                </div>
            </div>
        ),
    ];

    return (
        <div className="yekanMid">
            <div className="flex justify-between p-3 items-center bg-gray-200 text-[19px]">
                <a className="ml-4" href="/">بازگشت</a>
                <div className="flex items-center gap-3 mr-4">
                    <p>کاربر شماره 1234</p>
                    <img src={profile} className="w-[65px] h-[65px] rounded-full" />
                </div>
            </div>
            <div className="w-[80%] mx-auto flex flex-col items-center mt-5">
                <div className="flex items-center justify-center w-full">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex items-center"
                            style={{ flex: index < steps.length - 1 ? 1 : "unset" }}
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full text-white text-sm ${
                                        currentStep >= step.id
                                            ? "bg-blue-500"
                                            : "bg-gray-300"
                                    }`}
                                >
                                    {step.id}
                                </div>
                                <span
                                    className={`text-sm mt-2 ${
                                        currentStep >= step.id
                                            ? "text-blue-500"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`h-[1px] w-full mx-2 ${
                                        currentStep > step.id
                                            ? "bg-blue-500"
                                            : "bg-gray-300"
                                    }`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-5">
                {stepContents[currentStep - 1]}
            </div>
        </div>
    );
};

export default SendReport;
