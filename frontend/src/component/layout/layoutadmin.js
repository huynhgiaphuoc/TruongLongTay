import { useState, useRef, useEffect } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
const LayoutAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeItem, setActiveItem] = useState('Trang chủ');
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);
    const [isOpen8, setIsOpen8] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);
    const contentRef3 = useRef(null);
    const contentRef4 = useRef(null);
    const contentRef5 = useRef(null);
    const contentRef6 = useRef(null);
    const contentRef7 = useRef(null);
    const contentRef8 = useRef(null);

    useEffect(() => {
        if (location.pathname === "/admin") {
            setActiveItem("Trang chủ");
        } else if (location.pathname.includes("message")) {
            setActiveItem("Tin nhắn");
        } else if (location.pathname.includes("point")) {
            setActiveItem("Điểm số");
        } else if (location.pathname.includes("tutoring")) {
            setActiveItem("Lớp phụ đạo");
        } else if (location.pathname.includes("workschedule")) {
            setActiveItem("Lịch giảng dạy");
        } else if (location.pathname.includes("room")) {
            setActiveItem("Mượn phòng");
        } else if (location.pathname.includes("infomation")) {
            setActiveItem("Tài khoản");
        } else if (location.pathname.includes("news")) {
            setActiveItem("Tin tức");
        } else if (location.pathname.includes("approve")) {
            setActiveItem("Duyệt đơn");
        } else if (location.pathname.includes("slide")) {
            setActiveItem("Hình ảnh");
        } else if (location.pathname.includes("result")) {
            setActiveItem("Trúng tuyển");
        }
    }, [location]);

    useEffect(() => {
        if (contentRef1.current) {
            contentRef1.current.style.maxHeight = isOpen1 ? `${contentRef1.current.scrollHeight}px` : '0px';
        }
    }, [isOpen1]);

    useEffect(() => {
        if (contentRef2.current) {
            contentRef2.current.style.maxHeight = isOpen2 ? `${contentRef2.current.scrollHeight}px` : '0px';
        }
    }, [isOpen2]);

    useEffect(() => {
        if (contentRef3.current) {
            contentRef3.current.style.maxHeight = isOpen3 ? `${contentRef3.current.scrollHeight}px` : '0px';
        }
    }, [isOpen3]);

    useEffect(() => {
        if (contentRef4.current) {
            contentRef4.current.style.maxHeight = isOpen4 ? `${contentRef4.current.scrollHeight}px` : '0px';
        }
    }, [isOpen4]);

    useEffect(() => {
        if (contentRef5.current) {
            contentRef5.current.style.maxHeight = isOpen5 ? `${contentRef5.current.scrollHeight}px` : '0px';
        }
    }, [isOpen5]);

    useEffect(() => {
        if (contentRef6.current) {
            contentRef6.current.style.maxHeight = isOpen6 ? `${contentRef6.current.scrollHeight}px` : '0px';
        }
    }, [isOpen6]);

    useEffect(() => {
        if (contentRef7.current) {
            contentRef7.current.style.maxHeight = isOpen7 ? `${contentRef7.current.scrollHeight}px` : '0px';
        }
    }, [isOpen7]);

    useEffect(() => {
        if (contentRef8.current) {
            contentRef8.current.style.maxHeight = isOpen8 ? `${contentRef8.current.scrollHeight}px` : '0px';
        }
    }, [isOpen8]);
    
    const handleLogout = async () => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        console.log("userId", token);
        Swal.fire({
            title: 'Bạn có muốn đăng xuất khỏi tài khoản?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đăng xuất!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = axios.post('http://localhost:8888/account/logoutadmin', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                sessionStorage.clear();

                navigate('/');
            } else {
                Swal.fire({
                    title: 'Đã hủy',
                    text: 'Bạn đã hủy việc đăng xuất!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        })
    }
    return (
        <div className="w-[256px] h-[135vh] bg-[#edf2f9] text-white border-r border-solid border-[#dfdfdf]">
            <div className="px-4">
                <div className="flex items-center pt-3 space-x-3">
                    <img className="w-[50px] h-[50px]" src="/assets/images/apps/LOGOTRUONG.png" />
                    <p className="text-[#5e5e82]">Trường Long Tây</p>
                </div>
                <ul className="space-y-2 pt-3 max-h-svh overflow-y-auto scroll-hidden">
                    <li className={`flex items-center p-2 hover:bg-gray-700 rounded text-[#5e5e82]`}>
                        <a className={`bg-[rgb(237,242,249)] focus:outline-none pr-2 cursor-pointer m-0 no-underline font-[Arial] hover:no-underline z-10 ${activeItem === 'Trang chủ' ? 'text-main' : 'opacity-100'}`} href="/dashboardAdmin">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-chart-pie' className="mr-[8px]" />
                                <span>Trang chủ</span>
                            </div>
                        </a>
                    </li>

                    <div className="pl-2 pt-2 pb-2 relative mx-auto max-w-full z-auto">
                        <div className="relative flex items-center">
                            <div className="border-t-[1px] border-t-solid border-t-[#888] w-[100%] absolute top-1/2 transform translate-y-[2px]"></div>
                            <a className="bg-[rgb(237,242,249)] focus:outline-none !text-[#5e5e82] pr-2 cursor-pointer inline-block m-0 no-underline font-[Arial] z-10">
                                Bảng điều khiển
                            </a>
                        </div>
                    </div>

                    <li>
                        <button
                            className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-700 focus:outline-none active:outline-none rounded cursor-pointer text-[#5e5e82]"
                            onClick={() => setIsOpen2(!isOpen2)}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-users' className="mr-2" />
                                <span className="mr-[28px]">Quản lý</span>
                            </div>
                            <FontAwesomeIcon icon={isOpen2 ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'} />
                        </button>

                        <div
                            ref={contentRef2}
                            style={{
                                transition: 'max-height 0.3s ease-in-out',
                                overflow: 'hidden',
                            }}
                            className="pl-4"
                        >
                            <ul className="space-y-2">
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/teacheradmin">Giáo viên</a>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/students">Học sinh</a>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/education">Trình độ giáo dục</a>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/combination">  <span>Tổ Hợp Môn</span></a>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/subject">  <span> Môn Học</span></a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <button
                            className="flex items-center justify-between w-full text-left p-2 focus:outline-none active:outline-none hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]"
                            onClick={() => setIsOpen5(!isOpen5)}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-layer-group' className="mr-2" />
                                <span className="mr-[57px]">Lớp</span>
                            </div>
                            <FontAwesomeIcon icon={isOpen5 ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'} />
                        </button>

                        <div
                            ref={contentRef5}
                            style={{
                                maxHeight: isOpen5 ? `${contentRef5.current.scrollHeight}px` : '0px',
                                transition: 'max-height 0.3s ease-in-out',
                                overflow: 'hidden',
                            }}
                            className="pl-4"
                        >
                            <ul className="space-y-2">
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <span>Lớp học</span>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <span>Lớp phụ đạo</span>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <span>Học sinh lớp phụ đạo</span>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <span>Mượn phòng</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button
                            className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-700 focus:outline-none active:outline-none rounded cursor-pointer text-[#5e5e82]"
                            onClick={() => setIsOpen8(!isOpen8)}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-list' className="mr-[8px]" />
                                <span className="mr-[10px]">Phân công</span>
                            </div>
                            <FontAwesomeIcon icon={isOpen8 ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'} />
                        </button>

                        <div
                            ref={contentRef8}
                            style={{
                                transition: 'max-height 0.3s ease-in-out',
                                overflow: 'hidden',
                            }}
                            className="pl-4"
                        >
                            <ul className="space-y-2">
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/mainteacher">Chủ nhiệm</a>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/operation">Giáo viên bộ môn</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button
                            className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-700 focus:outline-none active:outline-none rounded cursor-pointer text-[#5e5e82]"
                            onClick={() => setIsOpen3(!isOpen3)}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-calendar-days' className="mr-[12px]" />
                                <span className="mr-[55px]">Lịch</span>
                            </div>
                            <FontAwesomeIcon icon={isOpen3 ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'} />
                        </button>

                        <div
                            ref={contentRef3}
                            style={{
                                transition: 'max-height 0.3s ease-in-out',
                                overflow: 'hidden',
                            }}
                            className="pl-4"
                        >
                            <ul className="space-y-2">
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <span>Giảng dạy</span>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <span>Thời khóa biểu</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button
                            className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-700 focus:outline-none active:outline-none rounded cursor-pointer text-[#5e5e82]"
                            onClick={() => setIsOpen4(!isOpen4)}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-book-open' className="mr-2" />
                                <span className="mr-[61.5px]">Thi</span>
                            </div>
                            <FontAwesomeIcon icon={isOpen4 ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'} />
                        </button>

                        <div
                            ref={contentRef4}
                            style={{
                                maxHeight: isOpen4 ? `${contentRef4.current.scrollHeight}px` : '0px',
                                transition: 'max-height 0.3s ease-in-out',
                                overflow: 'hidden',
                            }}
                            className="pl-4"
                        >
                            <ul className="space-y-2">
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="">Bài thi</a>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/exam">Lịch thi</a>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/testexam">Đề thi tham khảo</a>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/result">Trúng tuyển</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button
                            className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-700 focus:outline-none active:outline-none rounded cursor-pointer text-[#5e5e82]"
                            onClick={() => setIsOpen6(!isOpen6)}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-file' className="mr-[12px]" />
                                <span className="mr-[35px]">Đơn từ</span>
                            </div>
                            <FontAwesomeIcon icon={isOpen6 ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'} />
                        </button>

                        <div
                            ref={contentRef6}
                            style={{
                                maxHeight: isOpen6 ? `${contentRef6.current.scrollHeight}px` : '0px',
                                transition: 'max-height 0.3s ease-in-out',
                                overflow: 'hidden',
                            }}
                            className="pl-4"
                        >
                            <ul className="space-y-2">

                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <span>Văn bản - công văn</span>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href="/documment">Đơn</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button
                            className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-700 focus:outline-none active:outline-none rounded cursor-pointer text-[#5e5e82]"
                            onClick={() => setIsOpen7(!isOpen7)}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-newspaper' className="mr-2" />
                                <span className="mr-[35px]">Tin tức</span>
                            </div>
                            <FontAwesomeIcon icon={isOpen7 ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'} />
                        </button>

                        <div
                            ref={contentRef7}
                            style={{
                                maxHeight: isOpen7 ? `${contentRef7.current.scrollHeight}px` : '0px',
                                transition: 'max-height 0.3s ease-in-out',
                                overflow: 'hidden',
                            }}
                            className="pl-4"
                        >
                            <ul className="space-y-2">

                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <span>Tin tức của Sở</span>
                                </li>
                                <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                                    <a href ='/viewarticle'>Tin tức của nhà trường</a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                        <a className={`bg-[rgb(237,242,249)]  pr-2 cursor-pointer m-0 no-underline font-[Arial] hover:no-underline z-10 ${activeItem === 'Hình ảnh' ? 'text-main' : 'opacity-100'}`} href="/slide">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-image' className="mr-[8px]" />
                                <span>Hình ảnh</span>
                            </div>
                        </a>
                    </li>
                    <div className="pl-2 pt-2 pb-2 relative mx-auto max-w-full z-auto">
                        <div className="relative flex items-center">
                            <div className="border-t-[1px] border-t-solid border-t-[#888] w-[100%] absolute top-1/2 transform translate-y-[2px]"></div>
                            <a className="bg-[rgb(237,242,249)] !text-[#5e5e82] pr-2 cursor-pointer inline-block m-0 no-underline font-[Arial] z-10">
                                Ứng dụng
                            </a>
                        </div>
                    </div>
                    <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                        <a className={`bg-[rgb(237,242,249)]  pr-2 cursor-pointer m-0 no-underline font-[Arial] hover:no-underline z-10 ${activeItem === 'Tin nhắn' ? 'text-main' : 'opacity-100'}`} href="/message">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-comment' className="mr-[8px]" />
                                <span>Đoạn chat</span>
                            </div>
                        </a>
                    </li>
                    <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer text-[#5e5e82]">
                        <p className={`bg-[rgb(237,242,249)]  pr-2 cursor-pointer m-0 no-underline font-[Arial] hover:no-underline z-10 ${activeItem === 'Tin nhắn' ? 'text-main' : 'opacity-100'}`}>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon='fa-solid fa-sign-out' className="mr-[8px]" />
                                <span onClick={handleLogout}>Đăng xuất</span>
                            </div>
                        </p>
                    </li>
                </ul>
            </div >
        </div >
    );
}

const Nav = () => {
    const adminName = sessionStorage.getItem('teachername');
    const teacherId = sessionStorage.getItem('userId');
    return (
        <div className="flex items-center justify-between w-100% h-[55px] pt-[5px] pb-[5px] pr-[50px] bg-[#edf2f9]">
            <div>
                <div className="flex items-center relative">
                    <input className="py-2 px-10 w-[350px] rounded-[50px] shadow-md focus:outline-none" type="text" placeholder="Tìm kiếm..." />
                    <button className="absolute left-0 py-1 px-2 rounded-[50px] bg-main text-while">
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    </button>
                </div>
            </div>
            <div></div>
            <div className="flex items-center">
                <button className="py-1 px-3 ml-[15px]">
                    <FontAwesomeIcon className="mr-[5px]" icon="fa-solid fa-bell" />
                    <span>Thông báo</span>
                </button>
                <div className="flex items-center ml-[5px] px-3 cursor-pointer">
                    <span>{adminName}</span>
                    <img className="ml-[12px] w-[30px] h-[30px]" src="/assets/images/apps/LOGOTRUONG.png" />
                </div>
            </div>
        </div>
    )
}
export { LayoutAdmin, Nav }