import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Route } from 'react-router-dom';
import '../assets/css/styletea.css';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../component/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
library.add(fab, fas, faUser);
function Loginacademic() {
    const [studentCode, setStudentCode] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();
    function notify() {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Vui Lòng nhập mã cãn bộ và mật khẩu!',
        });
    }
    function notifyforusername() {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Vui lòng nhập mã cán bộ !',
        });
    }
    function notifyforpassword() {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Vui lòng nhập mật khẩu !',
        });
    }


    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleLogin = () => {
        if (!studentCode && !password) {
            notify();
            return;
        }
        if (!studentCode) {
            notifyforusername();
            return;
        }
        if (!password) {
            notifyforpassword();
            return;
        }
      
        axios.post('http://localhost:8888/account/loginacademic', {
            studentCode,
            password
        }).then(response => {
            console.log(response.data);
            console.log(studentCode, password);
            const { status, userId,teachername,token } = response.data;
             if (status === "ROLEADMIN") {
                sessionStorage.setItem('userId', userId);
                sessionStorage.setItem('teachername',teachername)
                sessionStorage.setItem('role', 'admin');
                sessionStorage.setItem('token', token);

                navigate('/admin');
            } 
            else {
                Swal.fire({
                    title: 'Thất bại',
                    text: 'Không có tài khoản trên!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }).catch(error => {
            Swal.fire({
                title: 'Thất bại',
                text: 'Số điện thoại hoặc mật khẩu sai!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    };

    useEffect(() => {
        const role = sessionStorage.getItem('role');
        const currentPath = window.location.pathname;

        if (role === 'student' && currentPath !== '/students') {
            navigate('/students');
        } else if (role === 'teacher' && currentPath !== '/teachers') {
            navigate('/teachers');
        } else if (role === 'admin' && currentPath !== '/admin') {
            navigate('/admin');
        } else if (role === 'accountancy' && currentPath !== '/homepage') {
            navigate('/homepage');
        }

    }, [navigate]);
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
        <div className="background-academic">
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
                        <h2 className='font-bold text-[20px] pt-[10px] text-[#4390e9]'>Đăng Nhập</h2>
                        <div className='inline-block'>
                            <div className='flex mt-[40px] mb-[15px]'>
                                <input
                                    placeholder='Mã cán bộ'
                                    className='inputtextlogin focus-visible:outline-none bg-[none] h-[40px] rounded-[8px] p-2 w-[312px]'
                                    value={studentCode}
                                    onChange={(e) => setStudentCode(e.target.value)}
                                />
                                <FontAwesomeIcon icon={faUser} className='iconinform mt-[5px] mr-[5px]' />
                            </div>
                            <div className='flex !mt-[10px] !mb-[40px]'>
                                <input
                                    placeholder='Mật khẩu'
                                    className='inputtextlogin focus-visible:outline-none bg-[none] h-[40px] rounded-[8px] p-2 w-[312px]'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FontAwesomeIcon icon={faLock} className='iconinform mb-[2px]' />
                            </div>
                            <div className='flex justify-between mb-2.5%'>
                                <div className='rememberpass flex'>
                                    <input type='checkbox' />
                                    <p>Lưu đăng nhập</p>
                                </div>
                                <div className='forgetpass'>
                                    <a href='/forgot-password-teacher'>Quên mật khẩu</a>
                                </div>
                            </div>
                           
                            <div className='flex justify-center'>
                                <button
                                    onClick={handleLogin}
                                    className='btn btn-primary loginbtn w-[150px] h-[45px] mt-[10px] ml-[-20px]'>
                                    Đăng nhập
                                </button>
                            </div>
                            <div className='text-center mt-[10px]'>
                                <a href='/'>
                                    <ArrowBackIcon />
                                    <span>Trở về trang chủ</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loginacademic;