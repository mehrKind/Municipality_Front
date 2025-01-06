import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hafez from "../../assets/images/hafez.png";
import logo from "../../assets/images/logo.jpg";
import api from "../conf/appUtils";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Clear any existing error message
        setError("");

        // Validate form fields
        if (!username.trim() || !password.trim()) {
            Toastify({
                text: "لطفا نام کاربری و رمز عبور را وارد کنید",
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
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.post("accounts/login/", {
                username,
                password,
            });

            if (response.status === 200) {
                // Store the tokens in localStorage
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                Toastify({
                    text: "کاربر عزیز خوش آمدید",
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
                // Redirect to the main page
                navigate("/");
            }
        } catch (error) {
            Toastify({
                text: "نام کاربری یا رمز عبور اشتباه هست",
                // text: `${error}`,
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
            setIsLoading(false);
        }
    };

    return (
        <div className="yekanMed bg-gradient-to-b from-white to-blue-[#e1f3ff]">
            <div className="logo flex items-center justify-end p-2">
                <img src={logo} className="w-[180px]" alt="Logo" />
            </div>

            <div className="w-[80%] mx-auto my-4">
                <h1 className="text-center yekanBlack text-[2rem] max-md:text-[1rem]">
                    هوشمند سازی تشخیص ساخت و ساز های غیر مجاز
                </h1>
                <div className="border-[1px] border-blue-300 md:grid md:grid-cols-12 my-3 rounded-lg">
                    <div className="imageLogin md:col-span-5 p-3 text-center">
                        <h2 className="border-b-[1px] border-blue-300 border-dashed yekanBlack text-[20px] pb-2 my-5">
                            صفحه مدیر
                        </h2>

                        <form
                            onSubmit={handleLogin}
                            className="loginForm text-right mt-[5rem] w-[80%] mx-auto"
                        >
                            {/* {error && (
                                <p className="text-red-500 text-center mb-4">{error}</p>
                            )} */}

                            <p className="mb-2 text-gray-600">نام کاربری</p>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-gray-100 text-center outline-none border-b-2 border-transparent p-2 w-full rounded-lg focus:border-blue-500 transition duration-200 focus:bg-gray-50/95"
                            />

                            <p className="mt-7 mb-3 text-gray-600">رمز عبور</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-100 text-center outline-none border-b-2 border-transparent p-2 w-full rounded-lg focus:border-blue-500 transition duration-200 focus:bg-gray-50/90"
                            />

                            <button
                                type="submit"
                                className="bg-blue-500 w-full p-3 yekanBlack rounded-lg text-white my-[2rem] hover:bg-blue-400 duration-200 transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-3 text-center justify-center py-2" style={{direction: "rtl"}}>
                                        <span class="loader"></span>
                                        {/* <p>درحال ورود</p> */}
                                    </div>                                    
                                ) : (
                                    "ورود"
                                )}
                            </button>
                        </form>
                        <div className="text-left ml-[3.5rem]">
                            <a href="#" className="text-blue-500 underline text-left">
                                فراموشی رمز عبور
                            </a>
                        </div>
                    </div>
                    <div className="imageLogin md:col-span-7 max-md:hidden">
                        <img src={hafez} className="w-full rounded-lg" alt="Hafez" />
                    </div>
                </div>
            </div>
            {/* footer */}

            <div className="bg-blue-500 text-white yekanBold text-[14px] p-1 w-full text-center">
                <h4>هوشمند سازی تشخیص ساخت و ساز های غیر مجاز</h4>
            </div>
        </div>
    );
};

export default Login;
