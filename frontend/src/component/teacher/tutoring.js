import React, { useEffect, useState, useRef } from "react";
import { SideBar, Navigator } from "../layout/layoutteacher";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import SkeletonPage from './sleketon';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

const Tutoring = () => {
    const teacherId = sessionStorage.getItem('userId');
    const [tutoring, setTutoring] = useState('');
    const [selectedPoints, setSelectedPoints] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalToturing, setTotalToturing] = useState('');
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [claasName, setClassName] = useState('');
    const [cName, setCName] = useState('');
    const [cCode, setCCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/tutoring', {
            teacherId,
            page: currentPage,
            size: pageSize
        }).then(response => {
            const { data, totalRecords } = response.data;
            setTutoring(data.map(item => ({
                id: item.Tutoring_ClassID,
                teacherId: item.TeacherID,
                subId: item.SubjectsID,
                name: item.Class_Tutoring,
                code: item.Tutoring_Code,
                year: item.school_year,
                sic: item.Sic,
                con: item.Con
            })));
            setTotalToturing(totalRecords);
        }).catch(error => {
            console.log('Error fetch data: ' + error);
        })
    }, [teacherId, currentPage, pageSize]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < Math.ceil(totalToturing / pageSize)) {
            setCurrentPage(pageNumber);
        }
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked || handleRowClick()) {
            if (selectedPoints.length > 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Chỉ có thể chọn một ô',
                    text: 'Bạn chỉ có thể chọn một ô checkbox tại một thời điểm.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    event.target.checked = false;
                });
                return;
            }
            setSelectedPoints([parseInt(value)]);
        } else {
            setSelectedPoints([]);
        }
    };

    const handleCreate = () => {
        navigate('/createtutoring');
    }

    const handleEdit = () => {
        if (selectedPoints) {
            navigate(`/teachers/tutoring/edit-tutoring/${selectedPoints}`, { state: { tutoring: selectedPoints } });
        } else {
            alert('Vui lòng chọn một mục để thao tác.');
        }
    }

    const fetchTutoring = () => {
        axios.post('http://localhost:8888/teachers/tutoring', {
            teacherId,
            page: currentPage,
            size: pageSize
        }).then(response => {
            const { data, totalRecords } = response.data;
            setTutoring(data.map(item => ({
                id: item.Tutoring_ClassID,
                teacherId: item.TeacherID,
                subId: item.SubjectsID,
                name: item.Class_Tutoring,
                code: item.Tutoring_Code,
                year: item.school_year,
                sic: item.Sic,
                con: item.Con
            })));
            setTotalToturing(totalRecords);
        }).catch(error => {
            console.log('Error fetch data: ' + error);
        })
    }

    const handleDelete = () => {
        if (selectedPoints) {
            Swal.fire({
                title: 'Bạn chắc chắn chứ?',
                text: "Bạn sẽ không thể hoàn tác hành động này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa nó!',
                cancelButtonText: 'Hủy bỏ'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('http://localhost:8888/teachers/tutoring/delete', {
                        tutoringId: selectedPoints[0]
                    }).then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Đã xóa!',
                            text: 'Dữ liệu đã được cập nhật.',
                            confirmButtonText: 'OK'
                        });
                        fetchTutoring();
                        setSelectedPoints([]);
                    })
                        .catch(error => {
                            if (error.response && error.response.status === 409) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Lỗi!',
                                    text: 'Lớp đã có học sinh. Không thể xóa!',
                                    confirmButtonText: 'OK'
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Lỗi!',
                                    text: 'Lớp này đã có học sinh. Không thể xóa!',
                                    confirmButtonText: 'OK'
                                });
                            }
                        });
                } else {
                    Swal.fire({
                        title: 'Đã hủy',
                        text: 'Bạn đã hủy việc xóa dữ liệu!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
        } else {
            alert('Vui lòng chọn một mục để thao tác.');
        }
    }

    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);

    const exportData = () => {
        if (selectedPoints) {
            axios.post('http://localhost:8888/teachers/tutoring/findTutoring', {
                tutoringId: selectedPoints[0]
            }).then(response => {
                const dt = response.data;
                const list = dt.map(item => ({
                    name: item.Student_Name,
                    dob: formatDate(item.Birthday),
                    gender: item.Gender,
                    eth: item.Ethnicity,
                    class: item.Class_Name,
                    cname: item.Class_Tutoring,
                    ccode: item.Tutoring_Code
                }));
                setClassName(list[0].class);
                setCName(list[0].cname);
                setCCode(list[0].ccode);
                if (list != null) {
                    const fileName = `${list[0].ccode}.xlsx`;
                    const worksheet = XLSX.utils.json_to_sheet(list.map((p, index) => ({
                        'STT': index + 1,
                        'Họ và tên': p.name,
                        'Ngày sinh': p.dob,
                        'Giới tính': p.gender,
                        'Dân tộc': p.eth,
                        'Ghi chú': ''
                    })));
                    const workbook = XLSX.utils.book_new();
                    const sheetName = `${list[0].cname}-${list[0].ccode}`.replace(/[:\/\?\*\[\]]/g, '');
                    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
                    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

                    function s2ab(s) {
                        const buf = new ArrayBuffer(s.length);
                        const view = new Uint8Array(buf);
                        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }

                    const blob = new Blob([s2ab(wbout)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                } else {
                    console.log('Fail');
                }
                console.log(response.data);
            }).catch(error => {
                console.log('Error fetch data: ' + error);
            })
        } else {
            Swal.fire({
                title: 'Không thể xuất dữ liệu',
                text: 'Không thể xuất vì không chọn lớp!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleRowClick = (id) => {
        if (selectedPoints.length > 0 && !selectedPoints.includes(id)) {
            Swal.fire({
                icon: 'info',
                title: 'Chỉ có thể chọn một ô',
                text: 'Bạn chỉ có thể chọn một ô checkbox tại một thời điểm.',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (selectedPoints.includes(id)) {
            setSelectedPoints(selectedPoints.filter(item => item !== id));
        } else {
            setSelectedPoints([id]);
        }
    };

    const totalPages = Math.ceil(totalToturing / pageSize);
    return (
        <>
            <div id='tutoring'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        {showSkeleton ? (
                            <SkeletonPage />
                        ) : (
                            <div id="inclass">
                                <div id="header-class" className="mt-[10px] flex">
                                    <p className="text-[Arial] text-[18px] font-medium">Lớp phụ đạo
                                        <a onClick={() => handleCreate()} className="py-1 px-2 ml-[5px] bg-main text-while rounded-50 cursor-pointer transition"><FontAwesomeIcon className="text-while hover:text-[#ccc]" icon="fa-solid fa-plus" /></a>
                                        <a disabled={selectedPoints.length === 0} onClick={() => handleEdit()} className={`py-1 px-2 ml-[5px] ${selectedPoints.length === 0 ? 'bg-[#ccc] cursor-not-allowed' : 'bg-[#f9b17a] cursor-pointer'} text-while rounded-50 transition`}><FontAwesomeIcon className="text-while hover:text-[#ccc]" icon="fa-solid fa-pen" /></a>
                                        <a disabled={selectedPoints.length === 0} onClick={() => handleDelete()} className={`py-1 px-2 ml-[5px] ${selectedPoints.length === 0 ? 'bg-[#ccc] cursor-not-allowed' : 'bg-[#FC4100] cursor-pointer'} text-while rounded-50 transition`}><FontAwesomeIcon className="text-while hover:text-[#ccc]" icon="fa-solid fa-trash-can" /></a></p>
                                    <button className="p-2 px-3 mt-[5px] ml-[65%] text-[#f9b17a] bg-[#2d3250] flex items-start rounded-[5px] relative top-[-10px] focus:outline-none"
                                        onClick={exportData}>
                                        <FontAwesomeIcon className="pr-1 relative top-1" icon="fa-solid fa-file-excel" />
                                        Xuất file Excel
                                    </button>
                                </div>

                                <div className="w-100 h-[fit-content] border-solid border-[1px] border-[#777] rounded-10 mb-[1%]">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr className="text-center">
                                                <th>#</th>
                                                <th>Mã lớp</th>
                                                <th>Tên lớp</th>
                                                <th>Năm học</th>
                                                <th>Sĩ số</th>
                                                <th>Setting</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tutoring.length > 0 ? (
                                                tutoring.map((item, index) => (
                                                    <tr key={item.id} className={`cursor-pointer transition-all duration-300
                                                        ${selectedPoints.includes(item.id) ? 'bg-[#fff]' : ''} 
                                                        hover:bg-[#fff]`}
                                                        onClick={() => handleRowClick(item.id)}>
                                                        <td className="text-center">{currentPage * pageSize + index + 1}</td>
                                                        <td className="text-center">{item.code}</td>
                                                        <td>{item.name}</td>
                                                        <td className="text-center">{item.year}</td>
                                                        <td className="text-center">{item.con}/{item.sic}</td>
                                                        <td className="text-center">
                                                            <input type="checkbox" checked={selectedPoints.includes(item.id)} value={item.id} className="w-[20px] h-[20px] cursor-pointer" onChange={handleCheckboxChange} />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <td colSpan="12" className="text-center">Dữ liệu không có sẵn</td>
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="flex justify-center mt-4 pb-4">
                                        <button className="w-[100px] text-[14px] bg-main text-while p-2 rounded-[5px] focus:outline-none"
                                            disabled={currentPage === 0}
                                            onClick={() => handlePageChange(currentPage - 1)}>
                                            <FontAwesomeIcon icon="fa-solid fa-backward" /> Previous
                                        </button>
                                        <span className="mx-4 pt-1">
                                            Page {currentPage + 1} of {totalPages}
                                        </span>
                                        <button className="w-[100px] text-[14px] bg-main text-while p-2 rounded-[5px] focus:outline-none"
                                            disabled={currentPage === totalPages - 1}
                                            onClick={() => handlePageChange(currentPage + 1)}>
                                            Next <FontAwesomeIcon icon="fa-solid fa-forward" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Navigator />
            </div>
        </>
    )
}

const CreateTutoring = () => {
    const teacherId = sessionStorage.getItem('userId');
    const [classRoom, setClassRoom] = useState([]);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedClassId, setSelectedClassId] = useState('');
    const [classId, setClassId] = useState('');
    const [subId, setSubId] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        teacherId: '',
        subId: '',
        code: '',
        name: '',
        sic: '',
    })

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/classtutoring', {
            teacherId
        }).then(response => {
            const dt = response.data;
            const list = dt.map(item => ({
                id: item.ClassID,
                code: item.Class_Code,
                name: item.Class_Name,
                sic: item.Sic,
                sy: item.school_year,
                subId: item.SubjectsID
            }));
            setClassRoom(list);
            if (list.length > 0) {
                setSubId(list[0].subId);
                setClassId(list[0].id);
            }
            return () => clearTimeout(skeletonTimeout);
        }).catch(error => {
            console.error('Error fetching MainTeacher data:', error);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            teacherId: teacherId,
            subId: subId,
            code: formData.code,
            name: formData.name,
            sic: formData.sic
        };

        let errorMessage = '';

        if (!data.code) errorMessage += 'Mã lớp học không được để trống.\n';
        if (!data.name) errorMessage += 'Tên lớp không được để trống.\n';
        if (!data.name) errorMessage += 'Sĩ số không được để trống.\n';

        if (errorMessage) {
            Swal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
            return;
        }

        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Thêm điểm mới!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/teachers/tutoring/create', data)
                    .then(response => {
                        Swal.fire(
                            'Đã thêm mới!',
                            'Dữ liệu đã được cập nhật.',
                            'success'
                        );
                        navigate(`/tutoring`);
                    }).catch(error => {
                        if (error.response && error.response.status === 409) {
                            Swal.fire(
                                'Lỗi!',
                                error.response.data,
                                'error'
                            );
                        } else {
                            Swal.fire(
                                'Lỗi!',
                                'Đã xảy ra sự cố khi cập nhật dữ liệu.',
                                'error'
                            );
                        }

                    })
            } else {
                Swal.fire({
                    title: 'Đã hủy',
                    text: 'Bạn đã hủy việc thêm điểm',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });

    }

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);

    return (
        <>
            <div id='class'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3'>
                        {showSkeleton ? (
                            <SkeletonPage />
                        ) : (
                            <div id="inclass">
                                <div id="header-class" className="mt-[10px] flex">
                                    <div className="mt-[10px] w-[95%] ml-2.5% mr-2.5%">
                                        <div className="flex justify-between">
                                            <div>
                                                <p><a className="hover:no-underline pr-2" href="/tutoring">Lớp phụ đạo </a><FontAwesomeIcon className="text-[12px]" icon="fa-solid fa-angle-right" /> <span className="pl-2" href="/createpoint">Thêm lớp phụ đạo</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-center mb-[20px]">
                                                <p className="text-[24px] font-semibold tracking-wide text-[Arial] mb-[0px]">Thêm lớp phụ đạo</p>
                                            </div>
                                            <div className="w-[100%] h-100">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-md-4"></div>
                                                        <div className="col-md-4">
                                                            <input type="text" id="code" className="form-control mt-[15px]" placeholder="Mã lớp phụ đạo" onChange={handleInputChange} />
                                                        </div>
                                                        <div className="col-md-4"></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4"></div>
                                                        <div className="col-md-4">
                                                            <input type="text" id="name" className="form-control mt-[15px]" placeholder="Tên lớp" onChange={handleInputChange} />
                                                        </div>
                                                        <div className="col-md-4"></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4"></div>
                                                        <div className="col-md-4">
                                                            <input type="text" id="sic" className="form-control mt-[15px]" placeholder="Sỉ số" onChange={handleInputChange} />
                                                        </div>
                                                        <div className="col-md-4"></div>
                                                    </div>
                                                    <div className="w-[32%] ml-[34%] mr-[34%]">
                                                        <button type="button" className="w-100 bg-[#4b70f5] text-while focus:outline-none rounded-[5px] py-1 mt-[31px] mb-[30px]" onClick={handleSubmit}>
                                                            Thêm mới
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
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

const EditTutoring = () => {
    const teacherId = sessionStorage.getItem('userId');
    const { id } = useParams();
    const location = useLocation();
    const tutoringId = location.state?.tutoring;
    const tutoringIdInt = parseInt(tutoringId, 10);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [tuto, setTuto] = useState('');
    const [totalTuto, setTotalTuto] = useState('');
    const [students, setStudents] = useState('');
    const [subId, setSubId] = useState('');
    const navigate = useNavigate();
    const [selectedPoints, setSelectedPoints] = useState('');
    const [listEdit, setListEdit] = useState('');
    const [currentPageAfter, setCurrentPageAfter] = useState(0);
    const [pageSizeAfter, setPageSizeAfter] = useState(5);
    const [totalReAfter, setTotalReAfter] = useState('');
    const [isAnySelected, setIsAnySelected] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState('');
    const [isSeletedStudent, setIsSelectedStudent] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectAllDelete, setSelectAllDelete] = useState(false);
    const [selectAllPages, setSelectAllPages] = useState(false);


    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/tutoring/editview', {
            teacherId,
            page: currentPage,
            size: pageSize
        }).then(response => {
            const { data, totalRecords } = response.data;
            setStudents(data.map(item => ({
                id: item.OperationID,
                classId: item.ClassID,
                teacherSubId: item.Teacher_SubjectID,
                subjectId: item.SubjectsID,
                teacherId: item.TeacherID,
                pointId: item.PointOfStudentID,
                studentId: item.StudentID,
                classCode: item.Class_Code,
                className: item.Class_Name,
                sic: item.Sic,
                sy: item.school_year,
                sname: item.Student_Name,
                dob: item.Birthday,
                cccd: item.Cccd,
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
                avg: item.Averageofallsubjects,
                goa2: item.Goalaverage2,
                all: item.Allin
            })));
            setTotalTuto(totalRecords);
        }).catch(error => {
            console.log('Error fetch data: ' + error);
        })
    }, [teacherId, subId, currentPage])

    const handlePageChange = (pageNumber, event) => {
        event.preventDefault();
        if (pageNumber >= 0 && pageNumber < Math.ceil(totalTuto / pageSize)) {
            setCurrentPage(pageNumber);
        }
    };

    const handlePageChangeAf = (pageNumber, event) => {
        event.preventDefault();
        if (pageNumber >= 0 && pageNumber < Math.ceil(totalReAfter / pageSizeAfter)) {
            setCurrentPageAfter(pageNumber);
        }
    }

    const fetchData = () => {
        axios.post('http://localhost:8888/teachers/tutoring/editview', {
            teacherId,
            page: currentPage,
            size: pageSize
        }).then(response => {
            const { data, totalRecords } = response.data;
            setStudents(data.map(item => ({
                id: item.OperationID,
                classId: item.ClassID,
                teacherSubId: item.Teacher_SubjectID,
                subjectId: item.SubjectsID,
                teacherId: item.TeacherID,
                pointId: item.PointOfStudentID,
                studentId: item.StudentID,
                classCode: item.Class_Code,
                className: item.Class_Name,
                sic: item.Sic,
                sy: item.school_year,
                sname: item.Student_Name,
                dob: item.Birthday,
                cccd: item.Cccd,
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
                avg: item.Averageofallsubjects,
                goa2: item.Goalaverage2,
                all: item.Allin
            })));
            setTotalTuto(totalRecords);
        }).catch(error => {
            console.log('Error fetch data: ' + error);
        })
    }

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/tutoring/getData', {
            tutoringId: tutoringIdInt,
            page: currentPageAfter,
            size: pageSizeAfter
        }).then(response => {
            const { data, totalRecords } = response.data;
            setListEdit(data);
            setTotalReAfter(totalRecords)
        }).catch(error => {
            console.log('Error fetch data: ' + error);
        })
    }, [currentPageAfter, totalReAfter]);

    const fetchDataRecap = () => {
        axios.post('http://localhost:8888/teachers/tutoring/getData', {
            tutoringId: tutoringIdInt,
            page: currentPageAfter,
            size: pageSizeAfter
        }).then(response => {
            const { data, totalRecords } = response.data;
            setListEdit(data);
            setTotalReAfter(totalRecords)
        }).catch(error => {
            console.log('Error fetch data: ' + error);
        })
    }

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked || handleRowClick()) {
            if (selectedPoints.length > 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Chỉ có thể chọn một ô',
                    text: 'Bạn chỉ có thể chọn một ô checkbox tại một thời điểm.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    event.target.checked = false;
                });
                return;
            }
            setSelectedPoints(parseInt(value));
        } else {
            setSelectedPoints([]);
        }
    }

    const handleCheckboxChangeDelete = (event) => {
        const { value, checked } = event.target;
        console.log(value);
        if (checked) {
            if (deleteStudent.length > 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Chỉ có thể chọn một ô',
                    text: 'Bạn chỉ có thể chọn một ô checkbox tại một thời điểm.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    event.target.checked = false;
                });
                return;
            }
            setDeleteStudent(parseInt(value));
        } else {
            setDeleteStudent([]);
        }
    }

    const handleExportData = () => {
        if (selectedPoints != null) {
            axios.post('http://localhost:8888/teachers/tutoring/edit', {
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log('Error fetch data: ' + error);
            })
        }
    }

    const handleEdit = () => {
        if (selectedPoints.length === 0) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Vui lòng chọn để đối tượng để cập nhật!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        } else {
            Swal.fire({
                title: 'Bạn chắc chắn chứ?',
                text: "Bạn sẽ không thể hoàn tác hành động này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Hủy bỏ',
                confirmButtonText: 'Cập nhật!'
            }).then((result) => {
                console.log("huyy",tutoringIdInt);
                console.log("huyy",selectedPoints);

                if (result.isConfirmed) {
                    axios.post('http://localhost:8888/teachers/tutoring/edit', {
                        tutoringIdInt,
                        selectedPoints: selectedPoints.toString()
                    }).then(response => {
                        Swal.fire(
                            'Đã cập nhật!',
                            'Dữ liệu đã được cập nhật.',
                            'success'
                        );
                        fetchData();
                        fetchDataRecap();
                        setSelectedPoints([]);
                        setIsAnySelected(false);
                        setCurrentPage(0);
                    }).catch(error => {
                        if (error.response && error.response.status === 409) {
                            Swal.fire({
                                title: 'Lỗi!',
                                text: error.response.data,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        } else {
                            Swal.fire({
                                title: 'Lỗi!',
                                text: 'Lớp đã không còn chỗ trống để tham dự!',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                            setSelectedPoints([]);
                            setIsAnySelected(false);
                        }
                    });
                } else {
                    Swal.fire(
                        'Đã hủy!',
                        'Bản cập nhật đã bị hủy.',
                        'error'
                    );
                }
            });
        }
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy bỏ',
            confirmButtonText: 'Cập nhật!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/teachers/tutoring/deleteStudent', {
                    tutoringIdInt,
                    deleteStudent: deleteStudent.toString()
                }).then(response => {
                    Swal.fire(
                        'Đã cập nhật!',
                        'Dữ liệu đã được cập nhật.',
                        'success'
                    );
                    fetchData();
                    fetchDataRecap();
                    setDeleteStudent([]);
                    setIsSelectedStudent(false);
                    setCurrentPageAfter(0);
                }).catch(error => {
                    console.log('Fail');
                })
            }
        })
    }

    const handleRowClick = (studentId) => {
        if (selectedPoints.length > 0 && !selectedPoints.includes(studentId)) {
            Swal.fire({
                icon: 'info',
                title: 'Chỉ có thể chọn một ô',
                text: 'Bạn chỉ có thể chọn một ô checkbox tại một thời điểm.',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (selectedPoints.includes(studentId)) {
            setSelectedPoints(selectedPoints.filter(item => item !== studentId));
        } else {
            setSelectedPoints([studentId]);
        }
    };

    const handleRowClickDelete = (studentId) => {
        if (deleteStudent.length > 0 && !deleteStudent.includes(studentId)) {
            Swal.fire({
                icon: 'info',
                title: 'Chỉ có thể chọn một ô',
                text: 'Bạn chỉ có thể chọn một ô checkbox tại một thời điểm.',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (deleteStudent.includes(studentId)) {
            setDeleteStudent(deleteStudent.filter(item => item !== studentId));
        } else {
            setDeleteStudent([studentId]);
        }
    };

    const handleBack = () => {
        navigate(`/tutoring`)
    }

    const totalPages = Math.ceil(totalTuto / pageSize);

    const totalPageAf = Math.ceil(totalReAfter / pageSizeAfter);

    return (
        <>
            <div id='class'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3'>
                        {showSkeleton ? (
                            <SkeletonPage />
                        ) : (
                            <div id="inclass">
                                <div id="header-class" className="mt-[10px] flex">
                                    <div className="mt-[10px] w-[95%] ml-2.5% mr-2.5%">
                                        <div className="flex justify-between">
                                            <div>
                                                <p><a className="hover:no-underline pr-2" href="/tutoring">Lớp phụ đạo </a><FontAwesomeIcon className="text-[12px]" icon="fa-solid fa-angle-right" /> <span className="pl-2" href="/createpoint">Sửa lớp phụ đạo</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-center mb-[30px]">
                                                <p className="text-[24px] font-semibold tracking-wide text-[Arial]">Sửa lớp phụ đạo</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="w-[49%] h-100">
                                                        <p className="text-center font-semibold text-[18px]"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Tất cả học sinh</p>
                                                    <form>
                                                        <div className="w-100 h-[390px] border-solid border-[1px] border-[#777] rounded-10 mb-[1%]">
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr className="text-center">
                                                                        <th>#</th>
                                                                        <th>Học sinh</th>
                                                                        <th>Thi</th>
                                                                        <th>Setting</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {students.length > 0 ? (
                                                                        students.map((item, index) => (
                                                                            <tr key={item.studentId} className={`text-center cursor-pointer transition-all duration-300
                                                                            ${selectedPoints.includes(item.studentId) ? 'bg-[#fff]' : ''} 
                                                                            hover:bg-[#fff]`}
                                                                                onClick={() => handleRowClick(item.studentId)}>
                                                                                <td>{currentPage * pageSize + index + 1}</td>
                                                                                <td className="text-left">{item.sname}</td>
                                                                                <td>
                                                                                    <span>{item.exam}</span>
                                                                                </td>
                                                                                <td>
                                                                                    <input type="checkbox" checked={selectedPoints.includes(item.studentId)} value={item.studentId} className="w-[20px] h-[20px] cursor-pointer" onChange={handleCheckboxChange} />
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="12" className="text-center">Dữ liệu không có sẵn</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                            <div className="flex justify-center mt-4 pb-4">
                                                                <button className="w-[100px] text-[14px] bg-main text-while p-2 rounded-[5px] focus:outline-none"
                                                                    disabled={currentPage === 0}
                                                                    onClick={(event) => handlePageChange(currentPage - 1, event)}>
                                                                    <FontAwesomeIcon icon="fa-solid fa-backward" /> Previous
                                                                </button>
                                                                <span className="mx-4 pt-1">
                                                                    Page {currentPage + 1} of {totalPages}
                                                                </span>
                                                                <button className="w-[100px] text-[14px] bg-main text-while p-2 rounded-[5px] focus:outline-none"
                                                                    disabled={currentPage === totalPages - 1}
                                                                    onClick={(event) => handlePageChange(currentPage + 1, event)}>
                                                                    Next <FontAwesomeIcon icon="fa-solid fa-forward" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="w-[49%] h-100">
                                                        <p className="text-center font-semibold text-[18px]"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Học sinh đã tham gia phụ đạo</p>
                                                    <form>
                                                        <div className="w-100 h-[390px] border-solid border-[1px] border-[#777] rounded-10 mb-[1%]">
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr className="text-center">
                                                                        <th>#</th>
                                                                        <th>Học sinh</th>
                                                                        <th>Setting</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {listEdit.length > 0 ? (
                                                                        listEdit.map((item, index) => (
                                                                            <tr key={item.StudentID} className={`text-center cursor-pointer transition-all duration-300
                                                                                ${deleteStudent.includes(item.StudentID) ? 'bg-[#fff]' : ''} 
                                                                                hover:bg-[#fff]`}
                                                                                    onClick={() => handleRowClickDelete(item.StudentID)}>
                                                                                    <td>{currentPageAfter * pageSizeAfter + index + 1}</td>
                                                                                    <td className="text-left">{item.Student_Name}</td>
                                                                                    <td>
                                                                                        <input type="checkbox" checked={deleteStudent.includes(item.StudentID)} value={item.StudentID} className="w-[20px] h-[20px] cursor-pointer" onChange={handleCheckboxChangeDelete} />
                                                                                    </td>
                                                                                </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="12" className="text-center">Dữ liệu không có sẵn</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                            <div className="flex justify-center mt-4 pb-4">
                                                                <button className="w-[100px] text-[14px] bg-main text-while p-2 rounded-[5px] focus:outline-none"
                                                                    disabled={currentPageAfter === 0}
                                                                    onClick={(event) => handlePageChangeAf(currentPageAfter - 1, event)}>
                                                                    <FontAwesomeIcon icon="fa-solid fa-backward" /> Previous
                                                                </button>
                                                                <span className="mx-4 pt-1">
                                                                    Page {currentPageAfter + 1} of {totalPageAf}
                                                                </span>
                                                                <button className="w-[100px] text-[14px] bg-main text-while p-2 rounded-[5px] focus:outline-none"
                                                                    disabled={currentPageAfter === totalPageAf - 1}
                                                                    onClick={(event) => handlePageChangeAf(currentPageAfter + 1, event)}>
                                                                    Next <FontAwesomeIcon icon="fa-solid fa-forward" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="w-[70%] ml-[15%] mr-[15%]">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <button className="w-100 bg-[#3c3c3c] text-while rounded-[5px] py-1 mt-[31px] mb-[30px]" onClick={handleBack}>
                                                            Trở về trang trước
                                                        </button>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <button type="button" disabled={selectedPoints.length === 0} className={`w-100 rounded-[5px] py-1 mt-[31px] mb-[30px] transition-all focus:outline-none duration-300 ${selectedPoints.length !== 0 ? 'bg-[#4b70f5] text-white' : 'bg-[#ccc] text-while'}`} onClick={handleEdit}>
                                                            Thêm vào lớp
                                                        </button>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <button type="button" disabled={deleteStudent.length === 0} className={`w-100 rounded-[5px] py-1 mt-[31px] mb-[30px] transition-all focus:outline-none duration-300 ${deleteStudent.length !== 0 ? 'bg-[rgb(230,0,18)] text-white' : 'bg-[#ccc] text-while'}`} onClick={handleDelete}>
                                                            Xóa khỏi lớp
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
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

export { Tutoring, CreateTutoring, EditTutoring }