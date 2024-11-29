import React, { useEffect, useState } from "react";
import SkeletonPage from './sleketon';
import { SideBar, Navigator } from "../layout/layoutteacher";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

const Information = () => {
    const teacherId = sessionStorage.getItem('userId');
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [teacher, setTeacher] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal(!showModal);
    };

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/account/information', {
            teacherId
        }).then(res => {
            setTeacher(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }, [teacherId])

    return (
        <>
            <div id='account'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        {showSkeleton ? (
                            <SkeletonPage />
                        ) : (
                            <div id="myinformation">
                                <div id="header-class" className="mt-[10px] flex">
                                    <p className="text-[Arial] text-[18px] font-medium">Tài khoản </p>
                                </div>
                                {teacher.map(item => (
                                    <div>
                                        <div className="w-100% mt-[10px]">
                                            <p className="text-[18px] mt-[20px] font-semibold text-[Arial] tracking-wider"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Thông tin cơ bản</p>
                                            <div className="flex mt-[10px]">
                                                <div className="w-[15%] text-center">
                                                    <img className="rounded-10 w-100% h-[250px] mb-[10px]" src={item.Path_Avt + item.Avatar} />
                                                    <p className="inline-block font-semibold text-[18px]"><FontAwesomeIcon icon="fa-solid fa-qrcode" /> {item.Officer}</p>
                                                </div>
                                                <div className="w-[80%] ml-[5%]">
                                                    <div className="flex">
                                                        <div className="w-[15%]">
                                                            <p>Họ và tên: </p>
                                                            <p className="mt-[10px]">Ngày sinh: </p>
                                                            <p className="mt-[10px]">CCCD: </p>
                                                            <p className="mt-[10px]">Giới tính: </p>
                                                            <p className="mt-[10px]">Email: </p>
                                                            <p className="mt-[10px]">Số điện thoại: </p>
                                                            <p className="mt-[10px]">Địa chỉ: </p>
                                                        </div>
                                                        <div className="w-[35%]">
                                                            <p className="font-semibold">{item.Name_Teacher}</p>
                                                            <p className="mt-[10px]">{formatDate(item.Birthday)}</p>
                                                            <p className="mt-[10px]">{item.Cic}</p>
                                                            <p className="mt-[10px]">{item.Gender}</p>
                                                            <p className="mt-[10px]">{item.Email}</p>
                                                            <p className="mt-[10px]">{item.Phone}</p>
                                                            <p className="mt-[10px]">{item.Commune + ',' + item.District + ',' + item.Province}</p>
                                                        </div>
                                                        <div className="w-[15%] ml-[10%]">
                                                            <p>Quốc tịch: </p>
                                                            <p className="mt-[10px]">Dân tộc: </p>
                                                            <p className="mt-[10px]">Tôn giáo: </p>
                                                            <p className="mt-[10px]">Chức vụ: </p>
                                                            <p className="mt-[10px]">Ngày gia nhập: </p>
                                                            <p className="mt-[10px]">Nơi làm việc: </p>
                                                            <p className="mt-[10px]">Hợp đồng: </p>
                                                        </div>
                                                        <div className="w-[25%]">
                                                            <p className="font-semibold">{item.Nation}</p>
                                                            <p className="mt-[10px]">{item.Ethnicity}</p>
                                                            <p className="mt-[10px]">{item.Religion}</p>

                                                            <p className="mt-[10px]">{item.Position}</p>
                                                            <p className="mt-[10px]">{formatDate(item.Recruitment_Day)}</p>
                                                            <p className="mt-[10px]">{item.Recruiter}</p>
                                                            <p className="mt-[10px]">{item.Contract_Form}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-100% mt-[10px]">
                                            <p className="text-[18px] mt-[20px] font-semibold text-[Arial] tracking-wider"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Thông tin về trình độ</p>
                                            <div className="flex mt-[10px]">
                                                <div className="w-[20%]">
                                                    <p>Tốt nghiệp: </p>
                                                    <p className="mt-[10px]">Chuyên ngành chính: </p>
                                                    <p className="mt-[10px]">Chuyên ngành phụ: </p>
                                                    <p className="mt-[10px]">Tiếng anh: </p>
                                                    <p className="mt-[10px]">Hạn ngạch: </p>
                                                </div>
                                                <div className="w-[25%]">
                                                    <p>{item.Spl}</p>
                                                    <p className="mt-[10px]">{item.Main_Major}</p>
                                                    <p className="mt-[10px]">{item.Osq}</p>
                                                    <p className="mt-[10px]">{item.Degree}</p>
                                                    <p className="mt-[10px]">{item.Quota}</p>
                                                </div>
                                                <div className="w-[20%] ml-[15%]">
                                                    <p>Bậc lương: </p>
                                                    <p className="mt-[10px]">Lương cơ sở: </p>
                                                    <p className="mt-[10px]">Ngoại ngữ: </p>
                                                    <p className="mt-[10px]">Trình độ chính trị: </p>
                                                    <p className="mt-[10px]">Trình độ quản lý: </p>
                                                </div>
                                                <div className="w-[25%]">
                                                    <p>{item.Level_Salary}</p>
                                                    <p className="mt-[10px]">{item.Salary_Coefficient}</p>
                                                    <p className="mt-[10px]">{item.Osq}</p>
                                                    <p className="mt-[10px]">{item.Ptl}</p>
                                                    <p className="mt-[10px]">{item.Eml}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="w-[30%] mr-[35%] ml-[35%] mt-2.5%">
                                    <div className="text-center text-[18px] bg-main py-2 text-while cursor-pointer rounded-10"
                                        onClick={handleModal}>
                                        Yêu cầu chỉnh sửa thông tin sai
                                    </div>
                                </div>
                                {showModal && (
                                    <div className="modal-info-overlay">
                                        <div className="modal-info-content">
                                            <span className="modal-info-close" onClick={handleModal}>&times;</span>
                                            <h2 className="text-center font-semibold mb-[20px]">Yêu cầu sửa thông tin</h2>
                                            <div>
                                                <textarea className="w-100% border-[1px] border-solid border-[#777] px-2 py-3" placeholder="Nội dung cần chỉnh sửa..."></textarea>
                                                <div className="w-[30%] mr-[35%] ml-[35%] text-center mt-[20px] bg-main text-while py-2 rounded-[5px] cursor-pointer">
                                                    Gửi yêu cầu
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <Navigator />
                </div>
            </div>
        </>
    )
}

export { Information }