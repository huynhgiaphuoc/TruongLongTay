import React, { useEffect, useState } from "react";
import { SideBar, Navigator } from '../layout/layoutteacher';
import SkeletonPage from './sleketon';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Approve = () => {
    const teacherId = sessionStorage.getItem('userId');
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecord, setTotalRecord] = useState([]);
    const [pageSize, setPageSize] = useState(3);
    const [listRecord, setListRecord] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const skeletonTimeout = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);
        return () => clearTimeout(skeletonTimeout);
    }, []);

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/getRecordByTeacher', {
            teacherId,
            page: currentPage,
            size: pageSize,
            status: 'Ch? phê duy?t',
            orderType: filter
        }).then(res => {
            const { data, totalRecords } = res.data;
            if (data != null) {
                setListRecord([]);
                setListRecord(data);
                setTotalRecord(totalRecords);
                console.log("Data:" + res.data);
            }
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }, [teacherId, pageSize, currentPage, filter]);

    const fetchData = () =>{
        axios.post('http://localhost:8888/teachers/getRecordByTeacher', {
            teacherId,
            page: currentPage,
            size: pageSize,
            status: 'Chờ phê duyệt',
            orderType: filter
        }).then(res => {
            const { data, totalRecords } = res.data;
            console.log("Data: "+data);
            console.log("TotalRecords: "+totalRecords);
            if (data != null) {
                setListRecord([]);
                setListRecord(data);
                setTotalRecord(totalRecords);
                console.log("Data:" + res.data);
            }
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < Math.ceil(totalRecord / pageSize)) {
            setCurrentPage(pageNumber);
        }
    };

    const formatVietnameseDate = (inputDate) => {
        const date = new Date(inputDate);

        if (isNaN(date.getTime())) {
            return "Ngày không hợp lệ";
        }

        const months = [
            "tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6",
            "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} năm ${year}`;
    }

    const handleAccept = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Duyệt đơn!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/teachers/recordApplication/update', {
                    recordId: id,
                    status: 'Đã duyệt'
                }).then(res => {
                    console.log('Success');
                    Swal.fire({
                        title: 'Thành công',
                        text: 'Bạn đã duyệt đơn!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    fetchData();
                }).catch(err => {
                    console.log('Fail');
                    Swal.fire({
                        title: 'Thất bại',
                        text: 'Đã xảy ra lỗi!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                })
            } else {
                Swal.fire({
                    title: 'Đã hủy',
                    text: 'Bạn đã hủy việc duyệt đơn!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        })
    }

    const handleRefuse = (id) =>{
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hủy đơn!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/teachers/recordApplication/update', {
                    recordId: id,
                    status: 'Không duyệt'
                }).then(res => {
                    console.log('Success');
                    Swal.fire({
                        title: 'Thành công',
                        text: 'Bạn đã hủy đơn!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    fetchData();
                }).catch(err => {
                    console.log('Fail');
                    Swal.fire({
                        title: 'Thất bại',
                        text: 'Đã xảy ra lỗi!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                })
            } else {
                Swal.fire({
                    title: 'Đã hủy',
                    text: 'Bạn đã hủy việc hủy đơn!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        })
    }

    const handleChangeFilter = (e) =>{
        const change = e.target.value;
        setFilter(change);
    }

    const totalPages = Math.ceil(totalRecord / pageSize);

    return (
        <>
            <div id='dashboard'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        {showSkeleton ? (
                            <SkeletonPage />
                        ) : (
                            <div id="inclass">
                                <div id="header-class" className="mt-[10px] mb-[10px] flex justify-between">
                                    <p className="text-[Arial] text-[18px] font-medium">Duyệt đơn </p>
                                    <select value={filter} onChange={handleChangeFilter} className="px-2 rounded-[5px]">
                                        <option value='DESC'>Mới nhất</option>
                                        <option value='ASC'>Cũ nhất</option>
                                    </select>
                                </div>
                                <div className="w-100% h-[100%] border-[1px] border-solid border-[#777] rounded-10">
                                    <div className="w-100% h-[fit-content] rounded-t-10">
                                        {listRecord.length > 0 ? (
                                            listRecord.map((item, index) => (
                                                <div>
                                                    <div className="flex">
                                                        <div className="w-[15.5%] mr-[.5%]">
                                                            <img src="/assets/images/record/don.jpg"
                                                                className="w-[120px] mx-[12px] my-[16px] shadow-md" />
                                                        </div>
                                                        <div key={item.RecordApplicationID} className="w-[50%] ml-[.5%] mr-[.5%] mt-[8px]">
                                                            <p className="text-[20px] font-semibold">{item.Title}</p>
                                                            <p className="mt-[8px]">Học sinh: <span className="font-semibold">{item.Student_Name}</span> - <span className="font-semibold">{item.Class_Name}</span></p>
                                                            <p className="mt-[8px]">Ngày: {formatVietnameseDate(item.DateMakeApplication)}</p>
                                                            <p className="mt-[8px]">Lí do: {item.Content}</p>
                                                        </div>
                                                        <div className="w-[32.5%] ml-[.5%] mt-2.5%">
                                                            <div className="w-[60%] ml-[20%] mr-[20%]">
                                                                <div onClick={() => handleAccept(item.RecordApplicationID)} className="text-center bg-main py-1 px-3 rounded-[5px] text-while cursor-pointer">
                                                                    <FontAwesomeIcon className="mr-[5px]" icon="fa-solid fa-circle-check" />
                                                                    Duyệt đơn
                                                                </div>
                                                                <div onClick={() => handleRefuse(item.RecordApplicationID)} className="text-center py-1 px-3 mt-[10px] rounded-[5px] bg-[rgb(230,0,18)] text-while cursor-pointer">
                                                                    <FontAwesomeIcon className="mr-[5px]" icon="fa-solid fa-circle-xmark" />
                                                                    Không duyệt
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {index < listRecord.length - 1 && (
                                                        <div className="border-b border-gray-300 my-2"></div>
                                                    )}
                                                </div>

                                            ))
                                        ) : (
                                            <p className="text-center mt-2.5%">Không có đơn cần duyệt</p>
                                        )}
                                    </div>
                                    <div className="text-center mt-2.5% mb-2.5%">
                                        <div className="inline-block pb-2">
                                            <button className="w-[100px] text-[14px] bg-main text-while p-2 rounded-[5px] focus:outline-none"
                                                disabled={currentPage === 0}
                                                onClick={() => handlePageChange(currentPage - 1)}>
                                                <FontAwesomeIcon icon="fa-solid fa-backward" /> Previous
                                            </button>
                                            <span className="mx-4"> Page {currentPage + 1} of {totalPages} </span>
                                            <button className="w-[100px] text-[14px] bg-main text-while p-2 rounded-[5px] focus:outline-none"
                                                onClick={() => handlePageChange(currentPage + 1)}>
                                                Next <FontAwesomeIcon icon="fa-solid fa-forward" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                    <Navigator />
                </div>
            </div>
        </>
    )
}

export { Approve };
