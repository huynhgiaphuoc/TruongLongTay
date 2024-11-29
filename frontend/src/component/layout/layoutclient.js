import React from "react";
import HouseIcon from '@mui/icons-material/House';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MenuIcon from '@mui/icons-material/Menu';
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

class HeaderClient extends React.Component {
    render() {
        return (
            <>
                <div id="navbarClient">
                    <img className="w-100 h-60 relative sm:h-[200px]" src="../../assets/images/apps/bannerNav.png" />
                    <div className="flex">
                        <div className="absolute top-10 left-16 sm:left-3 xxl:top-[10px] xxl:left-20 xl:top-[10px]">
                            <a className="text-main" href="/">
                                <img className="w-[120px] h-[120px] rounded-50 ml-[19%] xl:ml-[16%] sm:ml-[2px]" src="../../assets/images/apps/LOGOTRUONG.png" />
                                <p className="mt-3 font-bold text-xl sm:hidden xl:block xxl:block">TRƯỜNG CÔNG LẬP</p>
                            </a>
                        </div>
                        <div className="absolute w-30 text-3xl font-bold top-6 xxl:left-80 xl:left-60 sm:left-0">
                            <a href="/" className="hover:no-underline">
                                <p className="text-center text-nameSchool text-sm font-bold uppercase tracking-widest sm:text-left sm:mt-5% sm:relative sm:left-[138px] sm:mb-[.5em]">SỞ GD & ĐT TỈNH HẬU GIANG</p>
                                <p className=" text-nameSchool mt-[1em] xl:text-[24px] sm:text-[16px] sm:relative sm:left-[140px] sm:mt-[0] sm:mb-[.5em]">TRƯỜNG TRUNG HỌC PHỔ THÔNG</p>
                                <p className="text-center text-nameSchool sm:text-[24px] sm:relative sm:left-[135px]">TRƯỜNG LONG TÂY</p>
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class NavClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        };
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen,
        }));
    };
    render() {
        const { isMenuOpen } = this.state;
        return (
            <>
                <nav className="bg-main sm:pt-[0]">
                    <div className="w-90 xxl:ml-[3.5%] xxl:mr-2.5% flex justify-between items-center xl:ml-[0] xl:mr-[0] sm:hidden xl:block xl:pt-[15px] xl:pb-[1px] xxl:block xxl:pt-[10px] xxl:pb-[10px]">
                        <ul className="flex space-x-4 items-center">
                            <li className="whitespace-nowrap">
                                <a href="/" className="text-white text-sm hover:text-gray-200 flex items-center pt-1 pb-2 pl-4 pr-4 border-r-2">
                                    <HouseIcon color="while" />
                                </a>
                            </li>
                            <li className="whitespace-nowrap relative group">
                                <a href="#" className="text-white text-sm font-semibold hover:no-underline flex items-center pt-1 pb-2 pl-2 pr-4 border-r-2 uppercase">
                                    Giới Thiệu
                                </a>
                                <ul className="absolute top-6 -left-4 hidden mt-2 w-48 bg-main shadow-lg group-hover:flex flex-col group-hover:block rounded-small z-50">
                                    <li className="">
                                        <a href="/introduction" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-t-small text-sm">Lịch Sử Phát Triển</a>
                                    </li>
                                    <li>
                                        <a href="/mission" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold text-sm">Sứ Mệnh, Tầm Nhìn</a>
                                    </li>
                                    <li>
                                        <a href="/library" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-b-small text-sm">Thư Viện Ảnh</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="whitespace-nowrap relative group">
                                <a href="#" className="text-white text-sm font-semibold hover:no-underline hover:bg-black flex items-center pt-1 pb-2 pl-2 pr-4 border-r-2 uppercase">
                                    Tổ Chức
                                </a>
                                <ul className="absolute top-6 -left-4 hidden mt-2 w-48 bg-main shadow-lg group-hover:flex flex-col group-hover:block rounded-small z-50">
                                    <li className="">
                                        <a href="#" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-t-small text-sm">Hội Đồng Trưởng</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold text-sm">Ban Giám Hiệu</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold text-sm">Trưởng Bộ Môn</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-b-small text-sm">Hội Khuyến Học</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="whitespace-nowrap relative group">
                                <a href="#" className="text-white text-sm font-semibold hover:no-underline hover:text-gray-200 flex items-center pt-1 pb-2 pl-2 pr-4 border-r-2 uppercase">
                                    Giáo Dục
                                </a>
                                <ul className="absolute top-6 -left-4 hidden mt-2 w-48 bg-main shadow-lg group-hover:flex flex-col group-hover:block rounded-small z-50">
                                    <li className="">
                                        <a href="/schedulefile" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-t-small text-sm">Thời Khóa Biểu</a>
                                    </li>
                                    <li>
                                        <a href="/exams" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-b-small text-sm">Thi - Kiểm Tra</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="whitespace-nowrap relative group">
                                <a href="#" className="text-white text-sm font-semibold hover:no-underline hover:text-gray-200 flex items-center pt-1 pb-2 pl-2 pr-4 border-r-2 uppercase">
                                    Văn Bản - Công Văn
                                </a>
                                <ul className="absolute top-6 -left-4 hidden mt-2 w-48 bg-main shadow-lg group-hover:flex flex-col group-hover:block rounded-small z-50">
                                    <li className="">
                                        <a href="#" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-t-small text-sm">Văn Bản Sở GD & DT</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold text-sm">Văn Bản Trường</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-b-small text-sm">Văn Bản HĐND - UBND</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="whitespace-nowrap relative group">
                                <a href="#" className="text-white text-sm font-semibold hover:no-underline hover:text-gray-200 flex items-center pt-1 pb-2 pl-2 pr-4 border-r-2 uppercase">
                                    Tin Tức - Sự Kiện
                                </a>
                                <ul className="absolute top-6 -left-4 hidden mt-2 w-48 bg-main shadow-lg group-hover:flex flex-col group-hover:block rounded-small z-50">
                                    <li className="">
                                        <a href="/newsevent" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-t-small text-sm">Nhà Trường & Xã Hội</a>
                                    </li>
                                    <li>
                                        <a href="/newsdepartment" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold text-sm">Tin Tức Từ Sở</a>
                                    </li>
                                    <li>
                                        <a href="/newsnotification" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold text-sm">Thông Báo Từ Sở</a>
                                    </li>
                                    <li>
                                        <a href="/newsliving" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold text-sm">Nghệ Thuật Sống Từ Sở</a>
                                    </li>
                                    <li>
                                        <a href="/newseventactivities" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold text-sm">Hoạt Động - Sự Kiện</a>
                                    </li>
                                    <li>
                                        <a href="/newsadmissionsexam" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold text-sm">Thi & Tuyển Sinh</a>
                                    </li>
                                    <li>
                                        <a href="/newsprofessionalactivities" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-b-small text-sm">HĐ Chuyên Môn</a>
                                    </li>
                                    <li>
                                        <a href="/newsgroupactivities" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-b-small text-sm">HĐ Đoàn Thể</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="whitespace-nowrap relative group">
                                <a href="#" className="text-white text-sm font-semibold hover:no-underline hover:text-gray-200 flex items-center pt-1 pb-2 pl-2 pr-4 border-r-2 uppercase">
                                    Tài Nguyên
                                </a>
                                <ul className="absolute top-6 -left-4 hidden mt-2 w-48 bg-main shadow-lg group-hover:flex flex-col group-hover:block rounded-small z-50">
                                    <li>
                                        <a href="/resources_mdp" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-b-small text-sm">Mua Đồng Phục</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="whitespace-nowrap">
                                <a href="#" className="text-white text-sm font-semibold hover:no-underline hover:text-gray-200 flex items-center pt-1 pb-2 pl-2 pr-4 border-r-2 uppercase">
                                    Lịch Công Tác
                                </a>
                            </li>
                            <li className="whitespace-nowrap relative group">
                                <a href="#" className="text-white text-sm font-semibold hover:no-underline hover:text-gray-200 flex items-center pt-1 pb-2 pl-2 pr-4 border-r-2 uppercase">
                                    Thủ Tục Hành Chính
                                </a>
                                <ul className="absolute top-6 -left-4 hidden mt-2 w-48 bg-main shadow-lg group-hover:flex flex-col group-hover:block rounded-small z-50">
                                    <li>
                                        <a href="/recordapplication" className="block px-4 py-2 text-while hover:bg-while hover:no-underline pt-3 pb-3 hover:text-hover uppercase font-semibold rounded-b-small text-sm">Đơn Từ Hành Chính</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="whitespace-nowrap">
                                <a href="/contact" className="text-white text-sm font-semibold hover:no-underline hover:text-gray-200 flex items-center pt-1 pb-2 pl-2 pr-4 border-r-2 uppercase xl:border-r-[0] xl:hidden xxl:block">
                                    Liên Hệ
                                </a>
                                <a href="/contact" className="text-white text-sm font-semibold hover:no-underline hover:text-gray-200 flex items-center pt-1 pb-2 pl-2 pr-4 border-r-2 uppercase xl:border-r-[0] xl:block xxl:hidden">
                                    Tài Khoản
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:pt-2 sm:pb-2 sm:flex sm:justify-between sm:pr-2 xl:hidden xxl:hidden">
                        <div></div>
                        <button type="button" className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200" onClick={this.toggleMenu}>
                            <MenuIcon style={{ fontSize: 30 }} className="sm:p-[5px] sm:border-[1px] sm:border-while sm:rounded-[3px] sm:text-while sm:relative sm:top-[-1px]" />
                        </button>
                    </div>
                    <div className={`sm:block xl:hidden xxl:hidden bg-main transition-max-height ${isMenuOpen ? 'max-height-100' : 'max-height-0'}`}>
                        <ul className="flex flex-col">
                            {/* Add your menu items here */}
                            <li>
                                <a href="/" className="text-white text-sm hover:text-gray-200">Trang Chủ</a>
                            </li>
                            <li>
                                <a href="/introduction" className="text-white text-sm hover:text-gray-200">Giới Thiệu</a>
                            </li>
                            <li>
                                <a href="/contact" className="text-white text-sm hover:text-gray-200">Liên Hệ</a>
                            </li>
                            {/* Other menu items */}
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}

class FooterClient extends React.Component {
    render() {
        return (
            <>
                <div id="footer">
                    <div className="w-100 h-30">
                        <div className="bg-main pb-10">
                            <div className="text-center">
                                <p className="pt-12 mb-0 uppercase text-while text-[18px] font-semibold">Trường Trung Học Phổ Thông Trường Long Tây</p>
                                <p className="mb-0 text-while">Địa chỉ: Đường 926,Trường Long Tây, Châu Thành A, Hậu Giang</p>
                                <p className="mb-0 text-while">Email: hug-thpttruonglongtay@edu.viettel.vn</p>
                                <div className="mt-2">
                                    <a className="text-while" href=""><FacebookIcon /></a>
                                    <a className="text-while" href=""><YouTubeIcon /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export { HeaderClient, NavClient, FooterClient };
