import React, { useEffect, useState, useRef } from "react";
import { SideBar, Navigator } from "../layout/layoutteacher";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SkeletonPage from './sleketon';
import { useLocation, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const Class = () => {
    const optionMenuRef = useRef(null);
    const teacherId = sessionStorage.getItem('userId');
    const [classroom, setClassroom] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalStudent, setTotalStudent] = useState([]);
    const [pageSize, setPageSize] = useState(3);
    const [students, setStudents] = useState('');
    const navigate = useNavigate();
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/class', {
            teacherId,
            page: currentPage,
            size: pageSize,
            orderType: filter
        }).then(response => {
            const { students, totalStudentCount } = response.data;
            if (students != null) {
                setStudents([]);
                const studentList = students.map(item => ({
                    id: item.StudentID,
                    name: item.Student_Name,
                    gender: item.Gender,
                    code: item.Rollno,
                    dob: item.Birthday,
                    cccd: item.Cccd,
                    phone: item.Phone,
                    mom: item.Mom_Name,
                    dad: item.Dad_Name,
                    address: item.Permanent_Address,
                    path: item.Part,
                    avt: item.Student_Avatar,
                }));
                setStudents(studentList);
            }
            setClassroom(students[0].Class_Name);
            setTotalStudent(totalStudentCount);
        }).catch(error => {
            console.error('Error fetching MainTeacher data:', error);
        })

        const optionMenu = optionMenuRef.current;
        if (optionMenu) {
            const selectBtn = optionMenu.querySelector('.select-btn');
            const options = optionMenu.querySelectorAll('.option');
            const sBtnText = optionMenu.querySelector('.sBtn-text');

            selectBtn.addEventListener('click', () => {
                sBtnText.textContent = 'Option Selected';
            });

            return () => {
                selectBtn.removeEventListener('click', () => {
                    sBtnText.textContent = 'Option Selected';
                });
            };
        }
    }, [currentPage, pageSize, teacherId, filter]);

    const handleChangeFilter = (e) =>{
        const change = e.target.value;
        setFilter(change);
    }

    const exportExcel = () => {
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xuất dữ liệu!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Thành công',
                    text: 'Bạn đã xuất dữ liệu!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                axios.post('http://localhost:8888/teachers/class/export', {
                    teacherId
                }, {
                    responseType: 'blob'
                }).then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'students.xlsx');
                    document.body.appendChild(link);
                    link.click();
                }).catch(error => {
                    console.error('Error exporting data: ' + error);
                })
            } else {
                Swal.fire({
                    title: 'Đã hủy',
                    text: 'Bạn đã hủy việc xuất dữ liệu!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < Math.ceil(totalStudent / pageSize)) {
            setCurrentPage(pageNumber);
        }
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(0);
    };

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const handleGetInfo = (studentId) => {
        axios.post('http://localhost:8888/teachers/class/student-information', {
            studentId
        }).then(response => {
            navigate(`/student-information/${studentId}`, { state: { studenInfo: response.data } });
        }).catch(error => {
            console.error('Error fetching student info:', error);
        });
    }

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);

    const handleGetLeartningResult = (studentId) => {
        axios.post('http://localhost:8888/teachers/class/learning-result', {
            studentId
        }).then(response => {
            navigate(`/learning-result/${studentId}`, { state: { student: response.data } });
        }).catch(error => {
            console.error('Error fetching student info:', error);
        });
    }

    const totalPages = Math.ceil(totalStudent / pageSize);
    return (
        <>
            <div id='class'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-100% bg-[#e6e9ef] pt-2 pl-3'>
                        {showSkeleton ? (
                            <SkeletonPage />
                        ) : (
                            <div id="inclass">
                                <div id="header-class" className="mt-[10px] flex">
                                    <p className="text-[Arial] text-[18px] font-medium">Danh sách học sinh lớp {classroom}</p>
                                    <p className="ml-[37%]">Showing
                                        <select className="pl-1 ml-[5px] rounded-[5px]"
                                            id="pageSize"
                                            value={pageSize}
                                            onChange={handlePageSizeChange}>
                                            <option value={3}>3</option>
                                            <option value={5}>5</option>
                                            <option value={7}>7</option>
                                            <option value={10}>10</option>
                                        </select>
                                    </p>
                                    <p>
                                        <select value={filter} onChange={handleChangeFilter} className="px-2 mx-[15px] rounded-[5px]">
                                            <option value=''>Filter</option>
                                            <option value='DESC'>Giảm dần</option>
                                            <option value='ASC'>Tăng dần</option>
                                        </select>
                                    </p>
                                    <button className="p-2 px-3 text-[#f9b17a] bg-[#2d3250] flex items-start rounded-[5px] relative top-[-10px] focus:outline-none"
                                        onClick={exportExcel}>
                                        <FontAwesomeIcon className="pr-1 relative top-1" icon="fa-solid fa-file-excel" />
                                        Xuất file Excel
                                    </button>
                                </div>
                                <div className="w-[97.5%] h-100 rounded-10 border-[1px] border-solid border-[#777]">
                                    {students.length > 0 ? (
                                        students.map((student, index) => (
                                            <div>
                                                <div key={student.id} className="flex mx-[15px] my-[20px]">
                                                    <div className="w-[20%] h-100 text-center">
                                                        <img className="w-[150px] h-[200px] inline-block rounded-[5px]" src={student.path} />
                                                        <p className="inline-block mt-[5px] mb-[0] font-semibold">{student.cccd}</p>
                                                        <p className="inline-block mb-[0] font-semibold">{student.name}</p>
                                                        <p className="inline-block mb-[0]">Giới tính: {student.gender}</p>
                                                    </div>
                                                    <div className="w-[58%] h-100 ml-[1%] mr-[1%]">
                                                        <div className="flex">
                                                            <div>
                                                                <p className="text-[16px] font-normal italic mb-[.3em]">Mã học sinh:</p>
                                                                <p className="text-[16px] font-normal italic mb-[.3em]">Ngày sinh:</p>
                                                                <p className="text-[16px] font-normal italic mb-[.3em]">Số điện thoại:</p>
                                                                <p className="text-[16px] font-normal italic mb-[.3em]">Họ tên Cha:</p>
                                                                <p className="text-[16px] font-normal italic mb-[.3em]">Họ tên Mẹ:</p>
                                                                <p className="text-[16px] font-normal italic mb-[.3em]">Địa chỉ thường trú:</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[16px] italic mb-[.3em] ml-[20px] font-semibold">{student.code}</p>
                                                                <p className="text-[16px] font-normal italic mb-[.3em] ml-[20px]">{formatDate(student.dob)}</p>
                                                                <p className="text-[16px] font-normal italic mb-[.3em] ml-[20px]">{student.phone}</p>
                                                                <p className="text-[16px] italic mb-[.3em] ml-[20px] font-semibold">{student.dad}</p>
                                                                <p className="text-[16px] italic mb-[.3em] ml-[20px] font-semibold">{student.mom}</p>
                                                                <p className="text-[16px] font-normal italic mb-[.3em] ml-[20px]">{student.address}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-[19%] ml-[1%]">
                                                        <div className="text-center">
                                                            <button className="w-100 bg-main text-while px-3 py-1 rounded-[5px] inline-block"
                                                                onClick={() => handleGetInfo(student.id)}>
                                                                <FontAwesomeIcon icon="fa-solid fa-ellipsis" /> Xem thông tin
                                                            </button>
                                                            <button className="w-100 bg-[#41B3A2] text-while px-3 py-1 rounded-[5px] inline-block mt-[10px]"
                                                                onClick={() => handleGetLeartningResult(student.id)}>
                                                                <FontAwesomeIcon icon="fa-solid fa-clipboard-list" /> Kết quả học tập
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {index < students.length - 1 && (
                                                    <div className="border-b border-gray-300 my-2"></div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>Không có học sinh nào trong lớp này.</p>
                                    )}
                                    <div className="text-center">
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

const LearningResult = () => {
    const { id } = useParams();
    const location = useLocation();
    const student = location.state?.student;
    const [learning, setLearning] = useState([]);
    const [info, setInfo] = useState('');
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/class/infomation', {
            studentId: id
        }).then(response => {
            const student = response.data;
            const st = student.map(item => ({
                id: item.StudentID,
                name: item.Student_Name,
                rollno: item.Rollno,
                gender: item.Gender,
                dob: item.Birthday,
                cccd: item.Cccd,
                places: item.Place,
                address: item.Permanent_Address,
                phone: item.Phone,
                province: item.Province,
                email: item.Email,
                title: item.Student_Tittle,
                classname: item.Class_Name,
                year: item.school_year
            }));
            setInfo(st);
        }).catch(error => {
            console.error('Error fetching student info:', error);
        });


        axios.post('http://localhost:8888/teachers/class/result', {
            studentId: id
        }).then(response => {
            const result = response.data;
            console.log("result: " + result);
            const rs = result.map(item => ({
                id: item.StudentID,
                sname: item.Subjects_Name,
                pf1: item.MouthTestpoint1,
                pf2: item.MouthTestpoint2,
                p15f1: item.Test151point,
                p15f2: item.Test152point,
                p15f3: item.Test153point,
                p15f4: item.Test154point,
                p60f1: item.TestLessonpoint,
                p60f2: item.TestLesson2point,
                p60f3: item.TestLesson3point,
                p60f4: item.TestLesson4point,
                exam: item.Exam1,
                exam2: item.Exam2,
                goa: item.Goalaverage,
                sem: item.Semester,
                avg: item.Averageofallsubjects,
                goa2: item.Goalaverage2,
                all: item.Allin
            }))
            setLearning(rs);
            console.log("Learning: " + learning);
        }).catch(error => {
            console.log("Error fetch data: " + error);
        });
    }, [id])

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);

    const exportExcel = () => {
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xuất dữ liệu!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Thành công',
                    text: 'Bạn đã xuất dữ liệu!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                if (info.length > 0) {
                    const studentName = info[0].name.replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    axios.post('http://localhost:8888/teachers/class/exportPointData', {
                        studentId: id
                    }, {
                        responseType: 'blob'
                    }).then(response => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${studentName}_points.xlsx`);
                        document.body.appendChild(link);
                        link.click();
                    }).catch(error => {
                        console.error('Error exporting data: ' + error);
                    });
                }
            } else {
                Swal.fire({
                    title: 'Đã hủy',
                    text: 'Bạn đã hủy việc xuất dữ liệu!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    return (
        <>
            <div id='learning'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        {showSkeleton ? (
                            <SkeletonPage />
                        ) : (
                            info.length > 0 ? (
                                info.map(item => (
                                    <div key={item.id} className="mt-[10px] w-[95%] ml-2.5% mr-2.5%">
                                        <div className="flex justify-between">
                                            <div>
                                                <p><a className="hover:no-underline pr-2" href="/class">Lớp học </a><FontAwesomeIcon className="text-[12px]" icon="fa-solid fa-angle-right" /> <span className="pl-2" href="/dashboard">{item.name}</span></p>
                                            </div>
                                            <div>
                                                <button className="p-2 px-3 text-[#f9b17a] bg-[#2d3250] flex items-start rounded-[5px] relative top-[-10px] focus:outline-none"
                                                    onClick={exportExcel}>
                                                    <FontAwesomeIcon className="pr-1 relative top-1" icon="fa-solid fa-file-excel" />
                                                    Xuất file Excel
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-center mb-[20px]">
                                                <p className="text-[24px] font-semibold tracking-wide text-[Arial] mb-[0px]">Kết quả học tập</p>
                                                <p>Năm học: {item.year}</p>
                                            </div>
                                            <div className="w-[95%] ml-2.5% mr-2.5% mt-">
                                                <div key={item.id} className="flex">
                                                    <div className="w-[10%]">
                                                        <p>Mã học sinh:</p>
                                                        <p>Họ và tên:</p>
                                                    </div>
                                                    <div className="w-[15%]"></div>
                                                    <div className="w-[30%]">
                                                        <p>{item.rollno}</p>
                                                        <p>{item.name}</p>
                                                    </div>
                                                    <div className="w-[15%]">
                                                    </div>
                                                    <div className="w-[15%]">
                                                        <p className="opacity-0">a</p>
                                                        <p>Lớp:</p>
                                                    </div>
                                                    <div className="w-[15%]">
                                                        <p className="opacity-0">a</p>
                                                        <p>{item.classname}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        < div className="w-100 h-[fit-content] border-solid border-[1px] border-[#777] rounded-10 mb-[1%]">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>TT</th>
                                                        <th>Môn học</th>
                                                        <th>Miệng</th>
                                                        <th>15 phút</th>
                                                        <th className="text-center">1 tiết</th>
                                                        <th className="text-center">Thi</th>
                                                        <th>TBHK1</th>
                                                        <th>TBHK2</th>
                                                        <th>Cả năm</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {learning.length > 0 ? (
                                                        learning.map((item, index) => (
                                                            <tr className="text-center">
                                                                <td>{index + 1}</td>
                                                                <td className="text-left">{item.sname}</td>
                                                                <td>
                                                                    <div className="flex justify-between">
                                                                        <span>{item.pf1}</span>
                                                                        <span>{item.pf2}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="flex justify-between">
                                                                        <span>{item.p15f1}</span>
                                                                        <span>{item.p15f2}</span>
                                                                        <span>{item.p15f3}</span>
                                                                        <span>{item.p15f4}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="flex justify-between">
                                                                        <span>{item.p60f1}</span>
                                                                        <span>{item.p60f2}</span>
                                                                        <span>{item.p60f3}</span>
                                                                        <span>{item.p60f4}</span>
                                                                    </div></td>
                                                                <td>
                                                                    <div className="flex justify-between">
                                                                        <span>{item.exam}</span>
                                                                        <span>{item.exam2}</span>
                                                                    </div>
                                                                </td>
                                                                <td>{item.goa}</td>
                                                                <td>{item.goa2 === null ? (
                                                                    <p className="opacity-0">
                                                                        abc
                                                                    </p>
                                                                ) : (
                                                                    <p className="">
                                                                        {item.goa2}
                                                                    </p>
                                                                )}</td>
                                                                <td>{item.goa == null && item.goa2 == null ? (
                                                                    <p>{(item.goa * 1 + item.goa2 * 2) / 3}</p>
                                                                ) : (
                                                                    <p className="">
                                                                        {item.all}
                                                                    </p>
                                                                )}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <p>Không có điểm nào.</p>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                ))
                            ) : (
                                <p>Không có học sinh nào.</p>
                            )
                        )

                        }
                    </div>
                    <Navigator />
                </div>
            </div >
        </>
    )
}

const StudentInformation = () => {
    const { id } = useParams();
    const location = useLocation();
    const studentInfo = location.state?.studentInfo;
    const [info, setInfo] = useState('');
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        if (!studentInfo) {
            axios.post('http://localhost:8888/teachers/class/student-info', {
                studentId: id
            }).then(response => {
                const student = response.data;
                const st = student.map(item => ({
                    id: item.StudentID,
                    name: item.Student_Name,
                    status: item.Student_Status,
                    rank: item.Student_Title,
                    roll: item.Rollno,
                    phone: item.Phone,
                    address: item.Permanent_Address,
                    mom: item.Mom_Name,
                    dad: item.Dad_Name,
                    parent: item.Parent_Phone,
                    parent2: item.Parent_Phone2,
                    gender: item.Gender,
                    eth: item.Ethnicity,
                    email: item.Email,
                    district: item.District,
                    commune: item.Conduct,
                    classname: item.Class_Name,
                    classid: item.ClassID,
                    code: item.Class_Code,
                    cccd: item.Cccd,
                    dob: item.Birthday,
                    jobdad: item.Jobdad,
                    jobmom: item.Jobmom,
                    avg: item.Averageofallsubjects,
                    form: item.Addmission_Form,
                    part: item.Part,
                    avatar: item.Student_avatar
                }));
                setInfo(st);
                console.log(response.data);
            }).catch(error => {
                console.error('Error fetching student info:', error);
            });
        }
    }, [id, studentInfo]);

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);

    const handleExportWord = () => {
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xuất dữ liệu!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Thành công',
                    text: 'Bạn đã xuất dữ liệu!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                axios.post('http://localhost:8888/teachers/class/word', {
                    studentId: id
                }, {
                    responseType: 'blob'
                }).then(response => {
                    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${info[0].name.replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.docx`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }).catch(error => {
                    console.error('Error exporting data: ' + error);
                })
            } else {
                Swal.fire({
                    title: 'Đã hủy',
                    text: 'Bạn đã hủy việc xuất dữ liệu!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    return (
        <div>
            <>
                <div id='dashboard'>
                    <div className='flex'>
                        <SideBar />
                        <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                            {showSkeleton ? (
                                <SkeletonPage />
                            ) : (
                                info.length > 0 ? (
                                    info.map(item => (
                                        <div key={item.id} className="mt-[10px] w-[95%] ml-2.5% mr-2.5%">
                                            <div className="flex justify-between">
                                                <div>
                                                    <p><a className="hover:no-underline pr-2" href="/class">Lớp học </a><FontAwesomeIcon className="text-[12px]" icon="fa-solid fa-angle-right" /> <span className="pl-2" href="/dashboard">{item.name}</span></p>
                                                </div>
                                                <div>
                                                    <button className="p-2 px-3 text-[#f9b17a] bg-[#2d3250] flex items-start rounded-[5px] relative top-[-10px] focus:outline-none"
                                                        onClick={handleExportWord}>
                                                        <FontAwesomeIcon className="pr-1 relative top-1" icon="fa-solid fa-file-word" />
                                                        Xuất file Word
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-center mb-[20px]">
                                                <p className="text-[24px] font-semibold tracking-wide text-[Arial]">Thông tin học sinh</p>
                                            </div>
                                            <p className="text-[18px] font-semibold text-[Arial] tracking-wider"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Thông tin</p>
                                            <div className="flex mt-[10px]">
                                                <div className="w-[19%] mr-[1%]">
                                                    <img className="w-[150px] h-[200px]" src={item.part + item.avatar} />
                                                </div>
                                                <div className="w-[80%]">
                                                    <div className="flex">
                                                        <div className="w-[20%]">
                                                            <p className="mb-[.75em]">Họ và tên:</p>
                                                            <p className="mb-[.75em]">Mã học sinh:</p>
                                                            <p className="mb-[.75em]">Ngày sinh:</p>
                                                            <p className="mb-[.75em]">Căn cước công dân:</p>
                                                            <p className="mb-[.75em]">Địa chỉ email:</p>
                                                        </div>
                                                        <div className="w-[40%]">
                                                            <p className="mb-[.75em] font-semibold">{item.name}</p>
                                                            <p className="mb-[.75em]">{item.roll}</p>
                                                            <p className="mb-[.75em]">{formatDate(item.dob)}</p>
                                                            <p className="mb-[.75em]">{item.cccd}</p>
                                                            <p className="mb-[.75em]">{item.email}</p>
                                                        </div>
                                                        <div className="w-[16%] ml-[1.5%]">
                                                            <p className="mb-[.75em]">Giới tính:</p>
                                                            <p className="mb-[.75em]">Dân tộc:</p>
                                                            <p className="mb-[.75em]">Số điện thoại:</p>
                                                        </div>
                                                        <div className="w-[20%]">
                                                            <p className="mb-[.75em]">{item.gender}</p>
                                                            <p className="mb-[.75em]">{item.eth}</p>
                                                            <p className="mb-[.75em]">{item.phone}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-[20%]">
                                                            <p className="mb-[.75em]">Địa chỉ thường trú:</p>
                                                        </div>
                                                        <div className="w-[80%]">
                                                            <p className="mb-[.75em]">{item.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[18px] font-semibold text-[Arial] tracking-wider"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Liên lạc</p>
                                            <div>
                                                <div className="flex mt-[10px]">
                                                    <div className="w-[22.5%]">
                                                        <p className="mb-[.75em]">Họ tên cha:</p>
                                                    </div>
                                                    <div className="w-[30%]">
                                                        <p className="mb-[.75em]">{item.dad}</p>
                                                    </div>
                                                    <div className="w-[25%]"></div>
                                                    <div className="w-[15%]">
                                                        <p className="mb-[.75em]">Nghề nghiệp:</p>
                                                    </div>
                                                    <div className="w-[20%]">
                                                        <p className="mb-[.75em]">{item.jobdad}</p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <div className="w-[20%]">
                                                        <p className="mb-[.75em]">Số điện thoại:</p>
                                                        <p className="mb-[.75em]">Địa chỉ thường trú:</p>
                                                    </div>
                                                    <div className="w-[80%]">
                                                        <p className="mb-[.75em]">{item.parent}</p>
                                                        <p className="mb-[.75em]">{item.address}</p>
                                                    </div>
                                                </div>
                                                <div className="flex mt-2.5%">
                                                    <div className="w-[22.5%]">
                                                        <p className="mb-[.75em]">Họ tên mẹ:</p>
                                                    </div>
                                                    <div className="w-[30%]">
                                                        <p className="mb-[.75em]">{item.mom}</p>
                                                    </div>
                                                    <div className="w-[25%]"></div>
                                                    <div className="w-[15%]">
                                                        <p className="mb-[.75em]">Nghề nghiệp:</p>
                                                    </div>
                                                    <div className="w-[20%]">
                                                        <p className="mb-[.75em]">{item.jobmom}</p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <div className="w-[20%]">
                                                        <p className="mb-[.75em]">Số điện thoại:</p>
                                                        <p className="mb-[.75em]">Địa chỉ thường trú:</p>
                                                    </div>
                                                    <div className="w-[80%]">
                                                        <p className="mb-[.75em]">{item.parent2}</p>
                                                        <p className="mb-[.75em]">{item.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Không tìm thấy thông tin học sinh này.</p>
                                )
                            )}
                        </div>
                        <Navigator />
                    </div>

                </div>
            </>
        </div>
    );
}

export { Class, LearningResult, StudentInformation }