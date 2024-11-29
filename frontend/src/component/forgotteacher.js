import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Route } from 'react-router-dom';
import '../assets/css/styletea.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import Cookies from 'js-cookie';
library.add(fab, fas, faUser);

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    function notify() {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Vui lòng nhập địa chỉ e-mail!',
        });
    }

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const sliderSettings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const handleForget = () => {
        if (!email) {
            notify();
            return;
        }

        if (captchaValue === null) {
            alert('Vui lòng hoàn thành CAPTCHA');
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'Đã gửi mã xác nhận đến E-mail của bạn. Vui lòng kiểm tra hộp thư đến!',
        });
        axios.post('http://localhost:8888/forgot/forgot-password-teacher', { email })
            .then(response => {
                const code = response.data;
                Cookies.set('forget-teacher', code, { expires: 5 / (24 * 60) });
                Cookies.set('email-teacher', email, { expires: 5 / (24 * 60) });
                localStorage.setItem('email-teacher', email);
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Địa chỉ E-mail không tồn tại trên hệ thống!',
                });
            });
    };

    return (
        <div className="background">
            <div className='flex pt-[50px] w-[100%]'>
                <div className='ml-[145px] w-[800px]'>
                    <Slider {...sliderSettings}>
                        <div>
                            <img src='assets/images/home/banners/slide1.png' className='w-full' />
                        </div>
                        <div>
                            <img src='assets/images/home/banners/slide2.png' className='w-full' />
                        </div>
                    </Slider>
                </div>

                <div className='text-center'>
                    <div className='w-[400px] bg-[#d8d8d8d7] h-[610px] inline-block rounded-10 pt-[10px]'>
                        <div className='w-[100%] p-[5px]'>
                            <img src='../assets/images/apps/LOGOTRUONG.png' className='w-[80px] h-[80px] inline-block' />
                            <p className='font-bold text-[22px] m-[0_5px] text-[#36389e]'>
                                Trường Trung Học Phổ Thông Trường Long Tây
                            </p>
                        </div>
                        <h2 className='font-bold text-[20px] pt-[10px] text-[#4390e9]'>Quên mật khẩu</h2>
                        <div className='inline-block'>
                            <div className='flex mr-e'>
                                <input
                                    placeholder='Địa chỉ e-mail'
                                    className='inputtextlogin focus-visible:outline-none bg-[none] h-[40px] rounded-[8px] p-2 w-[312px]'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <FontAwesomeIcon icon="fa-solid fa-envelope" className='iconinform mt-[5px] mr-[5px]' />
                            </div>
                            <ReCAPTCHA
                                sitekey='6LcFLR0qAAAAAG7OPIAe2wnMZrAO2dLGfYQPIuGm'
                                onChange={handleCaptchaChange}
                                className='ml-[30px]'
                            />
                            <div className='flex justify-center'>
                                <button
                                    onClick={handleForget}
                                    className='btn btn-primary loginbtn w-[150px] h-[45px] mt-[10px] ml-[-20px]'>
                                    Gửi
                                </button>
                            </div>
                            <div className='text-center mt-[10px]'>
                                <a href='/loginforteacher'>
                                    <ArrowBackIcon />
                                    <span>Trở về đăng nhập</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Vetify = () => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (/^[0-9]*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index]) {
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        }
    };

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData('text').split('').slice(0, 6);
        const newOtp = [...otp];

        for (let i = 0; i < pastedData.length && i < otp.length; i++) {
            if (/^[0-9]*$/.test(pastedData[i])) {
                newOtp[i] = pastedData[i];
                document.getElementById(`otp-input-${i}`).value = pastedData[i];
            }
        }

        setOtp(newOtp);
    };

    const handleSubmit = () => {
        const otpString = otp.join('');
        console.log('OTP Submitted:', otpString);
        const resetCode = Cookies.get('forget-teacher');
        if (resetCode) {
            if (otpString === resetCode) {
                navigate('/change-password');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Mã xác thực không khớp!',
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mã xác thực đã hết hiệu lực!',
            });
        }
    };

    const handleAgain = () => {
        const email = localStorage.getItem('email-teacher');
        axios.post('http://localhost:8888/forgot/forgot-password-teacher', { email })
            .then(response => {
                const code = response.data;
                Cookies.set('forget-teacher', code, { expires: 5 / (24 * 60) });
                Cookies.set('email-teacher', email, { expires: 5 / (24 * 60) });
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Địa chỉ E-mail không tồn tại trên hệ thống!',
                });
            });
    }

    const sliderSettings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <>
            <div>
                <div className="background">
                    <div className='flex pt-[50px] w-[100%]'>
                        <div className='ml-[145px] w-[800px]'>
                            <Slider {...sliderSettings}>
                                <div>
                                    <img src='assets/images/home/banners/slide1.png' className='w-full' />
                                </div>
                                <div>
                                    <img src='assets/images/home/banners/slide2.png' className='w-full' />
                                </div>
                            </Slider>
                        </div>

                        <div className='text-center'>
                            <div className='w-[400px] bg-[#d8d8d8d7] h-[610px] inline-block rounded-10 pt-[10px]'>
                                <div className='w-[100%] p-[5px]'>
                                    <img src='../assets/images/apps/LOGOTRUONG.png' className='w-[80px] h-[80px] inline-block' />
                                    <p className='font-bold text-[22px] m-[0_5px] text-[#36389e]'>
                                        Trường Trung Học Phổ Thông Trường Long Tây
                                    </p>
                                </div>
                                <h2 className='font-bold text-[20px] pt-[10px] text-[#4390e9]'>Nhập mã xác thực</h2>
                                <div className='inline-block'>
                                    <div className='flex mr-e ml-[50px] justify-center' onPaste={handlePaste}>
                                        {otp.map((value, index) => (
                                            <input
                                                key={index}
                                                id={`otp-input-${index}`}
                                                value={value}
                                                onChange={(e) => handleChange(e, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                className='w-[40px] h-[60px] text-[28px] text-center rounded-[5px] mx-[5px]'
                                                maxLength="1"
                                            />
                                        ))}
                                    </div>
                                    <div className='text-center'>
                                        <p>Gửi lại mã xác nhận. <span onClick={handleAgain} className='underline cursor-pointer text-main'>Tại đây</span></p>
                                    </div>
                                    <div className='flex justify-center'>
                                        <button
                                            className='btn btn-primary loginbtn fit-btn w-[150px] h-[45px] mt-[10px] ml-[-20px]'
                                            onClick={handleSubmit}>
                                            Gửi
                                        </button>
                                    </div>
                                    <div className='text-center mt-[10px]'>
                                        <a href='/loginforteacher'>
                                            <ArrowBackIcon />
                                            <span>Trở về đăng nhập</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ChangePass = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const toggleCheckbox = () => {
        setShowPassword(!showPassword);
    };

    const sliderSettings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const handleChange = () => {
        const email = localStorage.getItem('email-teacher');
        console.log(newPassword);
        console.log(confirmPassword);
        if (newPassword == "" || confirmPassword == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập mật khẩu!',
            });
        } else if (newPassword.length < 8 || confirmPassword.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu phải trên 8 ký tự!',
            });
        } else {
            if (newPassword === confirmPassword) {
                axios.post('http://localhost:8888/teachers/forgotpassword', {
                    email,
                    password: newPassword
                }).then(res => {
                    localStorage.removeItem('email-teacher');
                    Cookies.remove('forget-teacher');
                    Cookies.remove('email-teacher');
                    Swal.fire({
                        icon: 'success',
                        title: 'Oops...',
                        text: 'Mật khẩu đã thay đổi! Vui lòng đăng nhập lại',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/loginforteacher');
                        }
                    });
                }).catch(err => {
                    console.log('Error fetch data: ' + err);
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Mật khẩu không giống nhau!',
                });
            }
        }
    }

    return (
        <>
            <div className="background">
                <div className='flex pt-[50px] w-[100%]'>
                    <div className='ml-[145px] w-[800px]'>
                        <Slider {...sliderSettings}>
                            <div>
                                <img src='assets/images/home/banners/slide1.png' className='w-full' />
                            </div>
                            <div>
                                <img src='assets/images/home/banners/slide2.png' className='w-full' />
                            </div>
                        </Slider>
                    </div>

                    <div className='text-center'>
                        <div className='w-[400px] bg-[#d8d8d8d7] h-[610px] inline-block rounded-10 pt-[10px]'>
                            <div className='w-[100%] p-[5px]'>
                                <img src='../assets/images/apps/LOGOTRUONG.png' className='w-[80px] h-[80px] inline-block' />
                                <p className='font-bold text-[22px] m-[0_5px] text-[#36389e]'>
                                    Trường Trung Học Phổ Thông Trường Long Tây
                                </p>
                            </div>
                            <h2 className='font-bold text-[20px] pt-[10px] text-[#4390e9]'>Đổi mật khẩu</h2>
                            <div className='inline-block'>
                                <div className='mt-[40px] mb-[20px] ml-[5px]'>
                                    <input type={showPassword ? 'text' : 'password'}
                                        placeholder='Mật khẩu mới'
                                        className='inputtextlogin focus-visible:outline-none bg-[none] h-[40px] rounded-[8px] p-2 w-[312px] !ml-[0] !mb-5%'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <input type={showPassword ? 'text' : 'password'}
                                        placeholder='Xác nhận mật khẩu'
                                        className='inputtextlogin focus-visible:outline-none bg-[none] h-[40px] rounded-[8px] p-2 w-[312px] !ml-[0]'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className='flex items-center'>
                                    <input onChange={toggleCheckbox} className='text-left cursor-pointer w-[20px] h-[20px] ml-[13%] mr-[5px]' type='checkbox' /> <span>Hiện mật khẩu</span>
                                </div>
                                <div className='flex justify-center'>
                                    <button
                                        className='btn btn-primary loginbtn fit-btn w-[150px] h-[45px] mt-[10px] ml-[-20px]'
                                        onClick={handleChange}
                                    >
                                        Đổi mật khẩu
                                    </button>
                                </div>
                                <div className='text-center mt-[10px]'>
                                    <a href='/loginforteacher'>
                                        <ArrowBackIcon />
                                        <span>Trở về đăng nhập</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { ForgotPassword, Vetify, ChangePass }
