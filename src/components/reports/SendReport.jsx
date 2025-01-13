import React, { useState, useEffect } from "react";
import profile from "../../assets/images/profile.jpg";
import gray from "../../assets/images/gray.jpg";
import api from "../conf/appUtils";
import "../../assets/css/report.css"
import { useNavigate  } from 'react-router-dom';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import PrintReport from "./PrintReport";

const SendReport = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded or processed image
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
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


    // const handleNextStep = async () => {
    //     if (currentStep === 1) {
    //         if (isFormValid()) {
    //             setIsProcessing(true); // Show the loader while processing
    //             try {
    //                 const form = new FormData();
    //                 form.append("img_input", formData.image);
    //                 const token = localStorage.getItem("accessToken");
    
    //                 // Call the API
    //                 const response = await api.post("main/proccess/", form, {
    //                     headers: {
    //                         "Content-Type": "multipart/form-data",
    //                         "Authorization": `Bearer ${token}`
    //                     },
    //                 });
    
    //                 if (response.data?.image_url) {
    //                     setImageUrl(`http://127.0.0.1:8000${response.data.image_url}`);
    //                     localStorage.setItem("after_img" ,response.data.image_url)
    //                     localStorage.setItem("before_img" ,formData.image)
    //                 } else {
    //                     Toastify({
    //                         text: "هیچ عکسی ارسال نشده",
    //                         duration: 3000,
    //                         // destination: "https://github.com/apvarun/toastify-js",
    //                         newWindow: true,
    //                         close: true,
    //                         gravity: "top", // `top` or `bottom`
    //                         position: "center", // `left`, `center` or `right`
    //                         stopOnFocus: true, // Prevents dismissing of toast on hover
    //                         style: {
    //                           background: "#ff3333",
    //                         },
    //                       }).showToast();
    //                 }
    //             } catch (error) {
    //                 Toastify({
    //                     text: "مشکلی در پردازش تصویر وجود دارد",
    //                     duration: 4000,
    //                     // destination: "https://github.com/apvarun/toastify-js",
    //                     newWindow: true,
    //                     close: true,
    //                     gravity: "top", // `top` or `bottom`
    //                     position: "center", // `left`, `center` or `right`
    //                     stopOnFocus: true, // Prevents dismissing of toast on hover
    //                     style: {
    //                       background: "#ff3333",
    //                     },
    //                   }).showToast();
    //             } finally {
    //                 setIsProcessing(false); // Hide the loader
    //             }
    
    //             if (currentStep < steps.length) {
    //                 setCurrentStep(currentStep + 1);
    //             }
    //         } else{
    //             Toastify({
    //                 text: "لطفا تمامی مقادیر را به درستی وارد کنید",
    //                 duration: 3000,
    //                 // destination: "https://github.com/apvarun/toastify-js",
    //                 newWindow: true,
    //                 close: true,
    //                 gravity: "top", // `top` or `bottom`
    //                 position: "center", // `left`, `center` or `right`
    //                 stopOnFocus: true, // Prevents dismissing of toast on hover
    //                 style: {
    //                   background: "#ff3333",
    //                 },
    //               }).showToast();
                  
    //         }
    //     } else if(currentStep === 2){
    //         if (currentStep < steps.length) {
    //             setCurrentStep(currentStep + 1);
    //         }
    //     }
    
    // };

    const handleNextStep = async () => {
        if (currentStep === 1) {
            if (validateInputs()) {
                setIsProcessing(true);
                try {
                    const form = new FormData();
                    form.append("img_input", formData.image);
                    const token = localStorage.getItem("accessToken");

                    const response = await api.post("main/proccess/", form, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${token}`
                        },
                    });

                    if (response.data?.image_url) {
                        setImageUrl(`http://127.0.0.1:8000${response.data.image_url}`);
                        localStorage.setItem("after_img", response.data.image_url);
                        localStorage.setItem("before_img", formData.image);
                    } else {
                        Toastify({
                            text: "هیچ عکسی ارسال نشده",
                            duration: 3000,
                            gravity: "top",
                            position: "center",
                            style: { background: "#ff3333" },
                        }).showToast();
                    }
                } catch (error) {
                    Toastify({
                        text: "مشکلی در پردازش تصویر وجود دارد",
                        duration: 4000,
                        gravity: "top",
                        position: "center",
                        style: { background: "#ff3333" },
                    }).showToast();
                } finally {
                    setIsProcessing(false);
                }

                if (currentStep < steps.length) {
                    setCurrentStep(currentStep + 1);
                }
            } else {
                Toastify({
                    text: "لطفا تمامی مقادیر را به درستی وارد کنید",
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    style: { background: "#ff3333" },
                }).showToast();
            }
        } else if (currentStep === 2) {
            if (currentStep < steps.length) {
                setCurrentStep(currentStep + 1);
            }
        }
    };


    // upload image
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

    // get today date
    const handleTodayDate = () => {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
        setFormData({ ...formData, date: today });
    };

    // check if the form is valid or not
    const isFormValid = () => {
        if (currentStep === 1) {
            return formData.image && formData.date && formData.title; // All fields must be filled
        }
        return true; // For steps 2 and 3, we assume the form is valid
    };

    const validateInputs = () => {
        let newErrors = {};
        const locationRegex = /^\d+\.\d{1,6}\s*,\s*\d+\.\d{1,6}$/;

        if (currentStep === 1) {
            if (!formData.location || !locationRegex.test(formData.location)) {
                newErrors.location = "فرمت مختصات جغرافیایی صحیح نیست. مثال: 35.6892, 51.3890";
                Toastify({
                    text: "فرمت مختصات جغرافیایی صحیح نیست",
                    duration: 4000,
                    gravity: "top",
                    position: "center",
                    style: { background: "#ff3333" },
                }).showToast();
            }
            if (!formData.wind_speed || isNaN(formData.wind_speed)) {
                newErrors.wind_speed = "سرعت باد باید یک عدد باشد.";
                Toastify({
                    text: "سرعت باد باید یک عدد باشد.",
                    duration: 4000,
                    gravity: "top",
                    position: "center",
                    style: { background: "#ff3333" },
                }).showToast();
            }
            if (!formData.camera || isNaN(formData.camera)) {
                newErrors.camera = "زاویه دوربین باید یک عدد باشد.";
                Toastify({
                    text: "زاویه دوربین باید یک عدد باشد.",
                    duration: 4000,
                    gravity: "top",
                    position: "center",
                    style: { background: "#ff3333" },
                }).showToast();
            }
            if (!formData.date) {
                newErrors.date = "تاریخ را به درستی وارد کنید";
                Toastify({
                    text: "زاویه دوربین باید یک عدد باشد.",
                    duration: 4000,
                    gravity: "top",
                    position: "center",
                    style: { background: "#ff3333" },
                }).showToast();
            }
            if (!formData.image) {
                newErrors.image = "عکسی آپلود نشده";
                Toastify({
                    text: "عکسی آپلود نشده",
                    duration: 4000,
                    gravity: "top",
                    position: "center",
                    style: { background: "#ff3333" },
                }).showToast();
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // print the page
    const handlePrint = () => {
        window.print();
    };

    // cancle app
    const handleCancle = ()=>{
        localStorage.removeItem("before_img")
        localStorage.removeItem("after_img")
        navigate("/");
    }
    
    // save report items to database
    const handleSubmit = async () => {
        setIsProcessing(true);
        try {
            const form = new FormData();
            const beforeImageFile = formData.image;
            const afterImgUrl = localStorage.getItem("after_img");
    
            if (beforeImageFile) {
                form.append("img_input", beforeImageFile);
            }
            if (afterImgUrl) {
                form.append("after_img", afterImgUrl);
            } else{
                form.append("after_img", beforeImageFile);
            }
            // Add other fields
            form.append("title", formData.title);
            form.append("location", formData.location);
            form.append("wind_speed", formData.wind_speed);
            form.append("camera", formData.camera);
            form.append("date", formData.date);
            form.append("content", formData.content || "");
    
            const token = localStorage.getItem("accessToken");
    
            const response = await api.post("main/save_reports/", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (response.status === 201){
                Toastify({
                    text: "با موفقیت ذخیره شد",
                    duration: 3000,
                    // destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "#2ab06f",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
                //   navigate to home page
                navigate("/");
            }
        } catch (error) {
            Toastify({
                text: "ثبت تصویر با خطا مواجه شد. دوباره تلاش کنید",
                duration: 3000,
                // destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "#ff3333",
                },
              }).showToast();
        } finally {
            setIsProcessing(false);
        }
    };
    

    const stepContents = [
        // ! step 1
        (
            <div className="w-[90%] mx-auto md:grid md:grid-cols-12 max-md:flex max-md:flex-col-reverse">
            {isProcessing ? (
                <div className="flex justify-center items-center absolute w-[100vw] h-[100vh] bg-gray-100/70 top-0 right-0 left-0 bottom-0">
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <p className="mt-4 yekanBold text-center text-[18px] mx-3">در حال پردازش تصویر...</p>
                </div>
            ) : (
                <React.Fragment>
                {/* image */}
                <div className="md:col-span-5">
                    <p className="text-right mb-4">تصویر گرفته شده</p>
                    <img src={uploadedImage || gray} alt="image" className="w-full" />
                    <button
                    onClick={handleNextStep}
                    id="submitContinue"
                    className="bg-blue-500 cursor-pointer text-white py-3 rounded-lg mt-5 hover:bg-blue-400 transition duration-200 w-full yekanBlack text-[1.3rem]"
                    // disabled={!isFormValid()} // Disable if the form is not valid
                    >
                    ثبت و ادامه
                    </button>
                </div>

                {/* content and form */}
                <div className="md:col-span-7 text-right">
                    <h1 className="md:text-[3rem] text-[1.5rem] yekanBlack my-4 ">ارسال گزارش</h1>
                    <div className="flex flex-col gap-4" style={{ direction: "rtl" }}>
                    <div className="flex items-center gap-5">
                        <label className="md:text-[1.3rem]">مختصات جغرافیایی زمین</label>
                        <input
                        type="text"
                        className={`input ${errors.location ? "border-red-500 border-[1px]" : ""} p-4 bg-gray-100 w-[30%] mb-5 rounded-lg focus:outline-none`}
                        placeholder="مثال: 35.6892, 51.3890"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        />
                        {/* {errors.location && <p className="text-red-500">{errors.location}</p>} */}
                    </div>
                    <div className="flex items-center gap-5">
                        <label className="md:text-[1.3rem]">سرعت باد</label>
                        <input
                        type="number"
                        className={`input ${errors.wind_speed ? "border-red-500 border-[1px]" : ""} p-4 bg-gray-100 w-[30%] mb-5 rounded-lg focus:outline-none`}
                        placeholder="مثال: 10"
                        name="wind_speed"
                        value={formData.wind_speed}
                        onChange={handleInputChange}
                        required
                        />
                        {/* {errors.wind_speed && <p className="text-red-500">{errors.wind_speed}</p>} */}
                    </div>
                    <div className="flex items-center gap-5">
                        <label className="md:text-[1.3rem]">زاویه دوربین</label>
                        <input
                        type="number"
                        className={`input ${errors.camera ? "border-red-500 border-[1px]" : ""} p-4 bg-gray-100 w-[30%] mb-5 rounded-lg focus:outline-none`}
                        placeholder="مثال: 45"
                        name="camera"
                        value={formData.camera}
                        onChange={handleInputChange}
                        required
                        />
                        {/* {errors.camera && <p className="text-red-500">{errors.camera}</p>} */}
                    </div>
                    </div>

                    <hr className="my-5 w-[90%] mx-auto border-gray-700 border-dotted" />

                    <div className="w-[90%] mx-auto">
                    <p className="mb-3 md:text-[15px]">پیوست تصویر بدون پردازش</p>
                    <input
                        type="file"
                        className="p-4 bg-gray-100 w-full mb-5 rounded-lg border-0 outline-none"
                        onChange={handleImageUpload} // Handle image upload
                        required
                    />
                    <p className="mb-3 text-[15px]">زمان ثبت تصویر</p>
                    <div className="relative">
                        <input
                        type="date"
                        className="p-4 bg-gray-100 w-full mb-5 rounded-lg border-0 outline-none"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange} // Handle date input change
                        required
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
                        required
                    />
                    </div>
                </div>
                </React.Fragment>
            )}
            </div>

        ),
        //! step 2
        (
            <div>
                <h1 className="yekanBlack text-black text-[2.3rem] text-center">پردازش تصویر</h1>
                <div className="md:w-[90%] md:mx-auto p-2 my-4">
                    {isProcessing ? (
                        <div className="flex justify-center items-center" style={{direction: "rtl"}}>
                            <div className="loader"></div>
                            <p className="mt-4 yekanBold text-center text-[18px]">در حال پردازش تصویر...</p>
                        </div>
                    ) : (
                        <div>
                            <div className="md:grid md:grid-cols-2 gap-10 mb-2">
                                <div>
                                    <img src={imageUrl || uploadedImage} alt="Processed" />
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
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">مختصات جغرافیایی</td>
                                        <td className="border border-gray-300 px-4 py-2">{formData.location}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">زاویه دوربین</td>
                                        <td className="border border-gray-300 px-4 py-2">{formData.camera}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">سرعت باد</td>
                                        <td className="border border-gray-300 px-4 py-2">{formData.wind_speed}</td>
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
                            <img src={uploadedImage || gray} alt="Processed" />
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
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">مختصات جغرافیایی</td>
                                <td className="border border-gray-300 px-4 py-2">{formData.location}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">زاویه دوربین</td>
                                <td className="border border-gray-300 px-4 py-2">{formData.camera}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">سرعت باد</td>
                                <td className="border border-gray-300 px-4 py-2">{formData.wind_speed}</td>
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
                            name="content"
                            onChange={handleInputChange}
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
                            onClick={handleSubmit}
                            className="bg-green-500 text-white py-3 px-5 rounded-lg hover:bg-green-400 transition duration-200 yekanBlack text-[1.2rem]"
                        >
                            ثبت
                        </button>
                        <button
                            onClick={handleCancle}
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
                <div className="flex items-center justify-center w-full" style={{direction: "rtl"}}>
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
                                    className={`text-sm mt-2 w-[60px] ${
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-5 w-[40%] rounded-lg" style={{direction:"rtl"}}>
                    <p className="text-green-900 yekanBlack text-[1.2em] bg-green-300 px-3 py-2 rounded-lg">گزارش با موفقیت ثبت شد</p>
                    <div className="mt-5">
                        <p>گزارش شما با موفقیت ثبت شده است. در صورت تمایل میتوانید گزارش </p>
                    </div>
                    

                </div>
            </div>
        </div>
    );
};

export default SendReport;
