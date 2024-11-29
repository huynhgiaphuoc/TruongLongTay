import React from "react";
import { HeaderClient, NavClient, FooterClient } from "../layout/layoutclient";
import { InforSearch, Login, Admissions, Command, Government, Access } from "../user/infor";
import HomeIcon from '@mui/icons-material/Home';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Schedule extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="content" className="max-h-fit w-95% flex">

                    <div id="schedule" className="w-75% relative">
                        <div className="m-[20px_10px] flex">
                            <a href="" className="flex pl-2"><HomeIcon /><p className="pl-2">Trang chủ</p></a>
                            <p className="pl-2">/</p>
                            <a href="" className="pl-2">Thời Khóa Biểu</a>
                        </div>
                        <div className="h-8 text-left mt-4 ml-4">
                            <div className="flex justify-between">
                                <div>
                                    <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Thời Khóa Biểu</a>
                                </div>
                                <div>
                                    <a href="">Xem tất cả</a>
                                </div>
                            </div>
                            <div className="w-100 p-4 bg-while shadow-[0 .125rem .25rem rgba(0, 0, 0, .075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                                <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                    <div className="flex">
                                        <div className="w-25%">
                                            <img className="w-[250px] h-[150px] rounded-[10px]" src='/assets/images/apps/LOGOTRUONG.png' />
                                        </div>
                                        <div className="w-75%">
                                            <div className="pl-3">
                                                <a className="w-100 font-semibold" href="/schedulefile">Thời Khóa Biểu Tuần 8 Năm Học 2023 - 2024 (Từ Ngày 27/7/2023)</a>
<div className="mb-4">
                                                    <span>
                                                    <FontAwesomeIcon className="text-[5px]" icon="fa-solid fa-tag" />
                                                        Thời Khóa Biểu
                                                    </span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <div>
                                                        <a className="text-[13px] font-semibold text-while bg-nameSchool pt-[8px] pb-[8px] pl-[18px] pr-[18px] rounded-[20px] hover:text-while hover:opacity-50 hover:no-underline transition-all duration-500" href="">Xem thêm</a>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon className="bg-main" icon="fa-solid fa-clock" />
                                                        <span className="pl-3 relative top-[1.5px]">18/04/2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                    <div className="flex">
                                        <div className="w-25%">
                                            <img className="w-[250px] h-[150px] rounded-[10px]" src='/assets/images/apps/LOGOTRUONG.png' />
                                        </div>
                                        <div className="w-75%">
                                            <div className="pl-3">
                                                <a className="w-100 font-semibold" href="">Thời Khóa Biểu Tuần 8 Năm Học 2023 - 2024 (Từ Ngày 27/7/2023)</a>
                                                <div className="mb-4">
                                                    <span>
                                                    <FontAwesomeIcon className="text-[5px]" icon="fa-solid fa-tag" />
                                                        Thời Khóa Biểu
                                                    </span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <div>
                                                        <a className="text-[13px] font-semibold text-while bg-nameSchool pt-[8px] pb-[8px] pl-[18px] pr-[18px] rounded-[20px] hover:text-while hover:opacity-50 hover:no-underline transition-all duration-500" href="">Xem thêm</a>
</div>
                                                    <div>
                                                    <FontAwesomeIcon className="bg-main" icon="fa-solid fa-clock" />
                                                        <span className="pl-3 relative top-[1.5px]">18/04/2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                        {/* <div className="m-[20px_10px] flex">
                            <a href="" className="flex"><HomeIcon /><p>Trang chủ</p></a>
                            <p className="pl-2">/</p>
                            <a href="" className="pl-2">Thời Khóa Biểu</a>

                        </div>
                        <div className="m-2.5% z-1 relative">
                            <div className="relative z-1">
                                <h4 className="relative !z-[1] text-[white] border-solid  p-[10px] bg-main w-[250px] h-[50px] rounded rounded-tr-none">
                                    Thời Khóa Biểu
                                    <span className="absolute bottom-0 right-0 w-0 h-0 border-t-[50px] border-l-main border-l-[50px] border-t-white"></span>
                                </h4>
                            </div>
                        </div>
                        <div className="ml-2.5% w-90% rounded-[10px] border-solid border-main h-[500px] border-[3px] z-0 bottom-[57px] relative">
                            <div className="w-[50px] h-[50px]">

                            </div>
                            <div className="w-80% flex ml-2.5%">
                                <img src={Logo} className="w-10% h-[100px]" />
                                <div className="ml-2">
                                    <a href="">
                                        <h5 className="mt-3">Thời Khóa Biểu Tuần 8 Năm Học 2023 - 2024 (Từ Ngày 27/7/2023)</h5>
                                    </a>
                                    <span>
                                        <LocalOfferIcon className="text-[5px]" />
                                        Thời Khóa Biểu
                                        |
                                        <AccessTimeIcon className="text-[5px] ml-[2px]" />
                                        17/7/2023
                                    </span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="w-15% m-[10px]">
                        <div className="ml-4">
                            <InforSearch />
                            <div className="mt-3">
                                <Login />
</div>
                            <div className="mt-3">
                                <Admissions />
                            </div>
                            <div className="mt-3">
                                <Command />
                            </div>
                            <div className="mt-3">
                                <Government />
                            </div>
                            <div className="mt-3">
                                <Access />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <FooterClient />
                </div>
            </>
        )
    }
}
class ScheduleFile extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="content" className="max-h-fit w-95% flex">
                    <div className="w-[75%] h-200 mt-3 pb-[20px] border-b-[1px] border-solid border-main">
                    <div className="m-[20px_10px] flex">
                            <a href="" className="flex pl-2"><HomeIcon /><p className="pl-2">Trang chủ</p></a>
                            <p className="pl-2">/</p>
                            <a href="" className="pl-2">Thời Khóa Biểu</a>
                            <p className="pl-2">/</p>
                            <a href="/assets/file/testing.pdf" className="pl-2">a</a>
                        </div>
                        <embed src='/assets/file/testing.pdf' height="800" width="100%" type="application/pdf" />
                    </div>
                    <div className="w-15% m-[10px]">
                        <div className="ml-4">
                            <InforSearch />
                            <div className="mt-3">
                                <Login />
                            </div>
                            <div className="mt-3">
                                <Admissions />
                            </div>
                            <div className="mt-3">
                                <Command />
                            </div>
                            <div className="mt-3">
                                <Government />
                            </div>
                            <div className="mt-3">
                                <Access />
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <FooterClient />
                </div>

            </>
        )
    }
}
class Exam extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="content" className="max-h-fit w-95% flex">
<div id="Exam" className="w-75% relative">
                        <div className="m-[20px_10px] flex">
                            <a href="" className="flex pl-2"><HomeIcon /><p className="pl-2">Trang chủ</p></a>
                            <p className="pl-2">/</p>
                            <a href="" className="pl-2">Thi - Kiểm Tra</a>
                        </div>
                        <div className="h-8 text-left mt-4 ml-4">
                            <div className="flex justify-between">
                                <div>
                                    <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Thi - Kiểm Tra</a>
                                </div>
                                <div>
                                    <a href="">Xem tất cả</a>
                                </div>
                            </div>
                            <div className="w-100 p-4 bg-while shadow-[0 .125rem .25rem rgba(0, 0, 0, .075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                                <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                    <div className="flex">
                                        <div className="w-25%">
                                            <img className="w-[250px] h-[150px] rounded-[10px]" src='/assets/images/apps/LOGOTRUONG.png' />
                                        </div>
                                        <div className="w-75%">
                                            <div className="pl-3">
                                                <a className="w-100 font-semibold" href="/schedulefile">Thời Khóa Biểu Tuần 8 Năm Học 2023 - 2024 (Từ Ngày 27/7/2023)</a>
                                                <div className="mb-4">
                                                    <span>
                                                    <FontAwesomeIcon className="text-[5px]" icon="fa-solid fa-tag" />
                                                        Thi - Kiểm Tra
                                                    </span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <div>
                                                        <a className="text-[13px] font-semibold text-while bg-nameSchool pt-[8px] pb-[8px] pl-[18px] pr-[18px] rounded-[20px] hover:text-while hover:opacity-50 hover:no-underline transition-all duration-500" href="">Xem thêm</a>
                                                    </div>
                                                    <div>
                                                    <FontAwesomeIcon className="bg-main" icon="fa-solid fa-clock" />
<span className="pl-3 relative top-[1.5px]">18/04/2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                    <div className="flex">
                                        <div className="w-25%">
                                            <img className="w-[250px] h-[150px] rounded-[10px]" src='/assets/images/apps/LOGOTRUONG.png' />
                                        </div>
                                        <div className="w-75%">
                                            <div className="pl-3">
                                                <a className="w-100 font-semibold" href="/schedulefile">Thời Khóa Biểu Tuần 8 Năm Học 2023 - 2024 (Từ Ngày 27/7/2023)</a>
                                                <div className="mb-4">
                                                    <span>
                                                    <FontAwesomeIcon className="text-[5px]" icon="fa-solid fa-tag" />
                                                        Thi - Kiểm Tra
                                                    </span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <div>
                                                        <a className="text-[13px] font-semibold text-while bg-nameSchool pt-[8px] pb-[8px] pl-[18px] pr-[18px] rounded-[20px] hover:text-while hover:opacity-50 hover:no-underline transition-all duration-500" href="">Xem thêm</a>
                                                    </div>
                                                    <div>
                                                    <FontAwesomeIcon className="bg-main" icon="fa-solid fa-clock" />
                                                        <span className="pl-3 relative top-[1.5px]">18/04/2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-15% m-[10px]">
                        <div className="ml-4">
                            <InforSearch />
                            <div className="mt-3">
                                <Login />
                            </div>
                            <div className="mt-3">
                                <Admissions />
</div>
                            <div className="mt-3">
                                <Command />
                            </div>
                            <div className="mt-3">
                                <Government />
                            </div>
                            <div className="mt-3">
                                <Access />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <FooterClient />
                </div>
            </>
        )
    }
}
class ExamFile extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="content" className="max-h-fit w-95% flex">
                    <div className="w-[75%] h-200 mt-3 pb-[20px] border-b-[1px] border-solid border-main">
                    <div className="m-[20px_10px] flex">
                            <a href="" className="flex pl-2"><HomeIcon /><p className="pl-2">Trang chủ</p></a>
                            <p className="pl-2">/</p>
                            <a href="" className="pl-2">Thi - Kiểm Tra</a>
                            <p className="pl-2">/</p>
                            <a href="/assets/file/testing.pdf" className="pl-2">a</a>
                        </div>
                        <embed src='/assets/file/testing.pdf' height="800" width="100%" type="application/pdf" />
                    </div>
                    <div className="w-15% m-[10px]">
                        <div className="ml-4">
                            <InforSearch />
                            <div className="mt-3">
                                <Login />
                            </div>
                            <div className="mt-3">
                                <Admissions />
                            </div>
                            <div className="mt-3">
                                <Command />
                            </div>
                            <div className="mt-3">
                                <Government />
                            </div>
                            <div className="mt-3">
                                <Access />
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <FooterClient />
                </div>

            </>
        )
    }
}
export { Schedule, ScheduleFile, Exam , ExamFile}