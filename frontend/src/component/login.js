import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Route } from 'react-router-dom';
import '../assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Students from '../component/user/home';
import Teachers from '../component/teacher/homepage';
import Admin from '../component/admin/homepage';
import { useAuth } from '../component/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';
library.add(fab, fas, faUser);

function Login() {
    const [studentCode, setStudentCode] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleLogin = () => {
        if (!studentCode || !password) {
            Swal.fire({
                title: 'Thất bại',
                text: 'vui lòng nhập số điện thoại và mật khẩu!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (captchaValue === null) {
            alert('Vui lòng hoàn thành CAPTCHA');
            return;
        }

        axios.post('http://localhost:8888/account/loginstudent', {
            username: studentCode,
            password
        }).then(response => {
            if (response != null) {
                const { status, userId, token } = response.data;
                if (status == "notrolestudent") {
                    Swal.fire({
                        title: 'Thất bại',
                        text: 'Đã đăng nhập sai vai trò',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    sessionStorage.setItem('userId', userId);
                    sessionStorage.setItem('role', 'student');
                    sessionStorage.setItem('token', token);
                     navigate('/student');
                }
            } else {
                Swal.fire({
                    title: 'Thất bại',
                    text: 'Đăng nhập thất bại!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }).catch(error => {
            Swal.fire({
                title: 'Thất bại',
                text: 'Mật khẩu hoặc số điện thoại không khớp!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    };

    useEffect(() => {
        const role = sessionStorage.getItem('role');
        const currentPath = window.location.pathname;

        if (role === 'student' && currentPath !== '/student') {
            navigate('/student');
        } else if (role === 'teacher' && currentPath !== '/teachers') {
            navigate('/teachers');
        } else if (role === 'admin' && currentPath !== '/admin') {
            navigate('/admin');
        } else if (!role && currentPath !== '/login') {
            navigate('/login');
        }
    }, [navigate]);


    return (
        <div className="background">
            <div className='contain-form'>
                <div className='d-flex'>
                    <div className='contain-text'>
                        <div className='contain-logo'>
                            <img src="../assets/images/apps/LOGOTRUONG.png" className='logoschool' />
                            <h6>Trường Long Tây</h6>
                        </div>
                        <div className='contain-banner'>
                            <img src="../assets/images/apps/banner-login.png" className='bannerlogin' />
                        </div>
                        <div className='text-about-school'>
                            <p>Chào mừng  !</p>
                            <p>đến với Trường Long Tây</p>
                        </div>
                        <p className='questioninform'>
                            Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore  ?
                        </p>
                        <div className='d-flex icon-contain'>
                            <FontAwesomeIcon icon={faFacebook} />
                            <FontAwesomeIcon icon={faTwitter} />
                            <FontAwesomeIcon icon={faYoutube} />
                            <FontAwesomeIcon icon={faInstagram} />
                        </div>
                    </div>
                    <div className='contain-form-login'>
                        <h3>Đăng nhập</h3>
                        <div className='d-inline-block'>
                            <div className='d-flex mr-e'>
                                <input
                                    placeholder='Số điện thoại'
                                    className='inputtextlogin focus-visible:outline-none'
                                    value={studentCode}
                                    onChange={(e) => setStudentCode(e.target.value)}
                                />
                                <FontAwesomeIcon icon={faUser} className='iconinform' />
                            </div>
                            <div className='d-flex mr-e'>
                                <input
                                    placeholder='Mật khẩu'
                                    className='inputtextlogin focus-visible:outline-none'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FontAwesomeIcon icon={faLock} className='iconinform mb-[2px]' />
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='rememberpass d-flex'>
                                    <input
                                        type='checkbox'
                                    />
                                    <p>Lưu đăng nhập</p>
                                </div>
                                <div className='forgetpass'>
                                    <a href='/forgot-password'>Quên mật khẩu</a>
                                </div>
                            </div>
                            <ReCAPTCHA sitekey='6LcFLR0qAAAAAG7OPIAe2wnMZrAO2dLGfYQPIuGm' onChange={handleCaptchaChange} className='m-[0_0_10px_35px]' />
                            <button onClick={handleLogin} className='btn btn-primary loginbtn'>
                                Đăng nhập
                            </button>
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
}
export default Login;