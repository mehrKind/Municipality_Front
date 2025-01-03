import React, { useState, useEffect } from "react";
import SideBarMain from "../main/sideBar";
import api from "../conf/appUtils";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const AllReports = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const baseUrl = "http://127.0.0.1:8000/"; // Base URL for image paths

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await api.get("main/all_reports/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Check if the response has the correct data structure
                if (response.data && response.data.data) {
                    setData(response.data.data); // Update state with the array of reports
                } else {
                    setData([]); // Set empty array if data is not available
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleShowImages = (item) => {
        setCurrentItem(item);
        setModalVisible(true);
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setEditModalVisible(true);
    };

    const handleDelete = (item) => {
        setCurrentItem(item);
        setDeleteModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setCurrentItem(null);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await api.put(
                `main/update_reports/${currentItem.id}/`,
                {
                    camera: currentItem.camera,
                    location: currentItem.location,
                    title: currentItem.title,
                    content: currentItem.content,
                    wind_speed: currentItem.wind_speed,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setEditModalVisible(false);
                setData((prevData) =>
                    prevData.map((item) => (item.id === currentItem.id ? currentItem : item))
                );
                Toastify({
                    text: "با موفقیت به روز رسانی شد",
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
            }
        } catch (error) {
            Toastify({
                text: "به روز رسانی با خطا مواجه شد",
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
        }
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await api.delete(`main/delete_reports/${currentItem.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204) {
                // alert("Report deleted successfully.");
                setDeleteModalVisible(false);
                setData((prevData) => prevData.filter((item) => item.id !== currentItem.id));
                Toastify({
                    text: "با موفقیت حذف شد",
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
            }
        } catch (error) {
            console.error("Error deleting report:", error);
            alert("Failed to delete report.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loader border-4 border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></span>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                                <a href="#">تنظیمات</a>
                            </li>
                            <li>
                                <a href="#">فایل</a>
                            </li>
                            <li>
                                <a href="#">نمایش</a>
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

                    {/* balloon information */}
                    <div className="p-3 w-[90%] mx-auto">
                        <h1 className="text-gray-400 yekanBlack text-right text-[2rem]">گزارشات ارسال شده</h1>


                        <div className="overflow-x-auto mt-10">
                            {data.length === 0 ? (
                                <div className="text-center text-gray-600 yekanBold text-[1.5rem] mt-10">
                                    شما هیچ گزارشی <a href="/report/send" className="text-blue-700 bg">ارسال</a> نکرده اید
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-[2.5rem] text-gray-600 yekanBlack my-10 text-center">
                                        شما تا اکنون <span>{data.length}</span> گزارش ارسال کرده اید
                                    </h3>
                                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                        <thead className="rounded-lg">
                                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                                <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">وضعیت</th>
                                                <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">عکس قبل/بعد</th>
                                                <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">زاویه دوربین</th>
                                                <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">موقعیت زمین</th>
                                                <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">عنوان</th>
                                                <th className="py-3 px-6 text-center yekanBold text-[1.2rem] text-gray-600">سرعت باد</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-[17px] yekanBold font-light">
                                            {data.map((item, index) => (
                                                <tr key={index} className="border-b border-dotted border-gray-300 hover:bg-gray-100 text-center">
                                                    <td className="py-3 px-6">
                                                        <div className="flex items-center space-x-2 justify-center"> 
                                                            <button onClick={() => handleDelete(item)}>
                                                                <MdDeleteForever className="text-red-500 text-[2rem]" />
                                                            </button>
                                                            <button onClick={() => handleEdit(item)}>
                                                                <MdModeEdit className="text-gray-500 text-[2rem]" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 px-6">
                                                        <button 
                                                            className="px-3 py-2 bg-blue-100 rounded-lg text-blue-900"
                                                            onClick={() => handleShowImages(item)}
                                                        >
                                                            مشاهده تصویر
                                                        </button>
                                                    </td>
                                                    <td className="py-5 px-6">{item.camera}</td>
                                                    <td className="py-5 px-6">{item.location}</td>
                                                    <td className="py-5 px-6">{item.title}</td>
                                                    {/* <td className="py-5 px-6">{item.content}</td> */}
                                                    <td className="py-5 px-6">{item.wind_speed}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                <SideBarMain />
            </div>

            {modalVisible && currentItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg max-w-[60%]  w-full" style={{direction: "rtl"}}>
                        <h2 className="text-lg font-bold mb-4">تصاویر گزارش</h2>
                        <div className="flex gap-4 text-center">
                            <div>
                                <img src={`${baseUrl}${currentItem.before_img}`} alt="بعد" className="w-full h-auto" />
                                <p className="mt-4 yekanBold">قبل از پردازش</p>
                            </div>
                            <div>
                                <img src={`${baseUrl}${currentItem.after_img}`} alt="قبل" className="w-full h-auto" />
                                <p className="mt-4 yekanBold">بعد از پردازش</p>
                            </div>
                        </div>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                            onClick={closeModal}
                        >
                            بستن
                        </button>
                    </div>
                </div>
            )}

            {editModalVisible && currentItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg max-w-lg w-full" style={{direction: "rtl"}}>
                        <h2 className="text-lg font-bold mb-4">ویرایش گزارش</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block mb-2">زاویه دوربین</label>
                                <input
                                    type="text"
                                    value={currentItem.camera}
                                    onChange={(e) =>
                                        setCurrentItem({ ...currentItem, camera: e.target.value })
                                    }
                                    className="border p-2 w-full rounded-lg text-gray-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">موقعیت زمین</label>
                                <input
                                    type="text"
                                    value={currentItem.location}
                                    onChange={(e) =>
                                        setCurrentItem({ ...currentItem, location: e.target.value })
                                    }
                                    className="border p-2 w-full rounded-lg text-gray-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">عنوان</label>
                                <input
                                    type="text"
                                    value={currentItem.title}
                                    onChange={(e) =>
                                        setCurrentItem({ ...currentItem, title: e.target.value })
                                    }
                                    className="border p-2 w-full rounded-lg text-gray-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">محتوا</label>
                                <textarea
                                    value={currentItem.content}
                                    onChange={(e) =>
                                        setCurrentItem({ ...currentItem, content: e.target.value })
                                    }
                                    className="border p-2 w-full rounded-lg text-gray-500"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">سرعت باد</label>
                                <input
                                    type="text"
                                    value={currentItem.wind_speed}
                                    onChange={(e) =>
                                        setCurrentItem({ ...currentItem, wind_speed: e.target.value })
                                    }
                                    className="border p-2 w-full rounded-lg text-gray-500"
                                />
                            </div>
                            <div style={{direction: "ltr"}}>
                                <button
                                    type="button"
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
                                    onClick={handleUpdate}
                                >
                                    ارسال
                                </button>
                                <button
                                    type="button"
                                    className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg ml-2 text-right"
                                    onClick={closeModal}
                                >
                                    بستن
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteModalVisible && currentItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg max-w-lg w-full" style={{direction: "rtl"}}>
                        <h2 className="text-lg font-bold mb-4">حذف گزارش</h2>
                        <p className="mb-4">آیا مطمئن هستید که می‌خواهید این گزارش را حذف کنید؟</p>
                        <div style={{direction: "ltr"}}>
                            <button
                                type="button"
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                                onClick={confirmDelete}
                            >
                                بله، حذف کن
                            </button>
                            <button
                                type="button"
                                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
                                onClick={closeModal}
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllReports;
