import React, { useEffect, useState } from "react";
import { SideBar, Navigator } from "../layout/layoutteacher";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import SkeletonPage from './sleketon';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

const PointOfStudent = () => {
    const id = sessionStorage.getItem('userId');
    const [classRoom, setClassRoom] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalStudent, setTotalStudent] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [subId, setSubId] = useState('');
    const [point, setPoint] = useState([]);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [classId, setClassId] = useState('');
    const [classlist, setclasslist] = useState('');
    const [selectedClassId, setSelectedClassId] = useState('');
    const [str, setStr] = useState('');
    const navigate = useNavigate();
    const [totalRecord, setTotalRecord] = useState('');
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [classCode, setClassCode] = useState('');
    const [totalRecordExport, setTotalRecordExport] = useState([]);


    useEffect(() => {
        axios.post('http://localhost:8888/teachers/point', {
            teacherId: id,
        }).then(response => {
            const { students, totalStudentCount } = response.data;
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
            setclasslist(list);
            if (list.length > 0) {
                setSubId(list[0].subId);
                setTotalStudent(list[0].sic);
                setClassId(list[0].id);
                setClassCode(list[0].name);
            }
        }).catch(error => {
            clearTimeout(skeletonTimeout);
            console.error('Error fetching MainTeacher data:', error);
        });
        return () => clearTimeout(skeletonTimeout);
    }, []);
    useEffect(() => {
        if (selectedClass) {
            axios.post('http://localhost:8888/teachers/point/classes', {
                teacherId: id,
                classId: selectedClass,
                subId: subId,
                page: currentPage,
                size: pageSize
            }).then(response => {
                const { data, totalRecords } = response.data;
                if (data != null) {
                    const students = data.map(item => ({
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
                    }));
                    setPoint(students);
                    setTotalRecord(totalRecords);
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }, [selectedClass, subId, currentPage, id]);

    const handleClassChange = (event) => {
        const classId = event.target.value;
        setSelectedClass(event.target.value);
        if (classId !== selectedClassId) {
            setSelectedClassId(classId);
            getStudentByClassID(classId);

        }
    };

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < Math.ceil(totalStudent / pageSize)) {
            setCurrentPage(pageNumber);
        }
    };

    const getStudentByClassID = (selectedClass) => {
        axios.post('http://localhost:8888/teachers/point/find', {
            classId: selectedClass
        }).then(response => {
            setStr(response.data);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
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
            setSelectedPoints([value]);
        } else {
            setSelectedPoints([]);
            event.target.checked = false;
        }
    };

    const handleEdit = () => {
        if (selectedPoints) {
            navigate(`/teachers/point/edit-point/${selectedPoints}`, { state: { point: selectedPoints } });
        } else {
            alert('Vui lòng chọn một mục để thao tác.');
        }
    };

    const fetchPoints = () => {
        if (selectedClass) {
            axios.post('http://localhost:8888/teachers/point/classes', {
                teacherId: id,
                classId: selectedClass,
                subId: subId,
                page: currentPage,
                size: pageSize
            }).then(response => {
                const { data, totalRecords } = response.data;
                if (data != null) {
                    const students = data.map(item => ({
                        id: item.OperationID,
                        classId: item.ClassId,
                        teacherSubId: item.Teacher_SubjectId,
                        subjectId: item.SubjectId,
                        teacherId: item.TeacherId,
                        pointId: item.PointOfStudentID,
                        studentId: item.StudentId,
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
                        p60f3: item.TestLesson2point,
                        p60f4: item.TestLesson2point,
                        exam: item.Exam1,
                        exam2: item.Exam2,
                        goa: item.Goalaverage,
                        avg: item.Averageofallsubjects,
                        goa2: item.Goalaverage2,
                        all: item.Allin
                    }));
                    setPoint(students);
                    setTotalRecord(totalRecords);
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        };
    }

    const exportToExcel = () => {
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
                axios.post('http://localhost:8888/teachers/point/classesfindall', {
                    teacherId: id,
                    classId: selectedClass,
                    subId: subId
                }).then(response => {
                    const { data, totalRecords } = response.data;
                    if (data != null) {
                        const students = data.map(item => ({
                            id: item.OperationID,
                            classId: item.ClassId,
                            teacherSubId: item.Teacher_SubjectId,
                            subjectId: item.SubjectId,
                            teacherId: item.TeacherId,
                            pointId: item.PointOfStudentID,
                            studentId: item.StudentId,
                            stuCode: item.Rollno,
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
                            p60f3: item.TestLesson2point,
                            p60f4: item.TestLesson2point,
                            exam: item.Exam1,
                            exam2: item.Exam2,
                            goa: item.Goalaverage,
                            avg: item.Averageofallsubjects,
                            goa2: item.Goalaverage2,
                            all: item.Allin
                        }));
                        console.log(students);
                        setTotalRecordExport(totalRecords);
                        if (students != null || classRoom != null || selectedClass != null) {
                            const fileName = `${classCode}.xlsx`;
                            const worksheet = XLSX.utils.json_to_sheet(students.map(p => ({
                                'Mã lớp': p.classCode,
                                'Tên lớp': p.className,
                                'Mã học sinh': p.stuCode,
                                'Tên học sinh': p.sname,
                                'Ngày sinh': p.dob,
                                'CCCD': p.cccd,
                                'Điểm miệng 1': p.pf1,
                                'Điểm miệng 2': p.pf2,
                                'Điểm 15 phút 1': p.p15f1,
                                'Điểm 15 phút 2': p.p15f2,
                                'Điểm 15 phút 3': p.p15f3,
                                'Điểm 15 phút 4': p.p15f4,
                                'Điểm 60 phút 1': p.p60f1,
                                'Điểm 60 phút 2': p.p60f2,
                                'Điểm 60 phút 3': p.p60f3,
                                'Điểm 60 phút 4': p.p60f4,
                                'Điểm thi': p.exam,
                                'Điểm thi': p.exam2,
                                'Điểm TBHK1': p.goa,
                                'Điểm TBHK2': p.goa2,
                                'Cả năm': p.all,
                                'Điểm trung bình cả năm': p.avg
                            })));
                            const workbook = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(workbook, worksheet, 'Điểm lớp');

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
                            console.log("Fail");
                        }
                    }
                }).catch(error => {
                    console.log('Error fetch data: ' + error);
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

    const handleCreate = () => {
        navigate('/createpoint')
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
                    axios.post('http://localhost:8888/teachers/point/delete', {
                        pointId: selectedPoints[0]
                    }).then(response => {
                        Swal.fire(
                            'Đã xóa!',
                            'Dữ liệu đã được cập nhật.',
                            'success'
                        );

                        fetchPoints();
                        setSelectedPoints([]);
                    }).catch(error => {
                        Swal.fire(
                            'Lỗi!',
                            'Đã xảy ra sự cố khi cập nhật dữ liệu.',
                            'error'
                        );
                        console.log('Error delete data: ' + error);
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

    const totalPages = Math.ceil(totalRecord / pageSize);

    return (
        <div id='point'>
            <div className='flex'>
                <SideBar />
                <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                    {showSkeleton ? (
                        <SkeletonPage />
                    ) : (
                        <div id="inclass">
                            <div id="header-class" className="mt-[10px] flex">
                                <p className="text-[Arial] text-[18px] font-medium">Điểm số
                                    <a onClick={() => handleCreate()} className="py-1 px-2 ml-[5px] bg-main text-while rounded-50 cursor-pointer transition"><FontAwesomeIcon className="text-while hover:text-[#ccc]" icon="fa-solid fa-plus" /></a>
                                    <a disabled={selectedPoints.length === 0} onClick={() => handleEdit()} className={`py-1 px-2 ml-[5px] ${selectedPoints.length === 0 ? 'bg-[#ccc] cursor-not-allowed' : 'bg-[#f9b17a] cursor-pointer'} text-while rounded-50 transition`}><FontAwesomeIcon className="text-while hover:text-[#ccc]" icon="fa-solid fa-pen" /></a>
                                    <a disabled={selectedPoints.length === 0} onClick={() => handleDelete()} className={`py-1 px-2 ml-[5px] ${selectedPoints.length === 0 ? 'bg-[#ccc] cursor-not-allowed' : 'bg-[#FC4100] cursor-pointer'} text-while rounded-50 transition`}><FontAwesomeIcon className="text-while hover:text-[#ccc]" icon="fa-solid fa-trash-can" /></a></p>
                                <p className="ml-[55%]">Lớp
                                    <select
                                        id="classSelect"
                                        className="ml-[10px] mr-[10px] py-1 px-2 border rounded-[5px] shadow-sm focus:outline-none focus:ring-indigo-500 cursor-pointer focus:border-indigo-500 sm:text-sm"
                                        value={selectedClass}
                                        onChange={handleClassChange}
                                    >
                                        <option value="0">Chọn lớp</option>
                                        {classRoom.length > 0 ? (
                                            classRoom.map((classItem) => (
                                                <option key={classItem.id} value={classItem.id}>
                                                    {classItem.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">Không có lớp nào</option>
                                        )}
                                    </select>
                                </p>
                                <button className="p-2 px-3 mt-[5px] text-[#f9b17a] bg-[#2d3250] flex items-start rounded-[5px] relative top-[-10px] focus:outline-none"
                                    onClick={exportToExcel}>
                                    <FontAwesomeIcon className="pr-1 relative top-1" icon="fa-solid fa-file-excel" />
                                    Xuất file Excel
                                </button>
                            </div>

                            <div className="w-100 h-[fit-content] border-solid border-[1px] border-[#777] rounded-10 mb-[1%]">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr className="text-center">
                                            <th>#</th>
                                            <th>Học sinh</th>
                                            <th>Miệng</th>
                                            <th>15 phút</th>
                                            <th>1 tiết</th>
                                            <th>Thi</th>
                                            <th>TBHK1</th>
                                            <th>TBHK2</th>
                                            <th>Cả năm</th>
                                            <th>Setting</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {point.length > 0 ? (
                                            point.map((item, index) => (
                                                <tr key={item.pointId} className="text-center">
                                                    <td>{currentPage * pageSize + index + 1}</td>
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
                                                        </div>
                                                    </td>
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
                                                    <td>{item.all}</td>
                                                    <td>
                                                        <input type="checkbox" value={item.pointId} className="w-[20px] h-[20px] cursor-pointer" onChange={handleCheckboxChange} />
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
    );
};

const CreatePoint = () => {
    const id = sessionStorage.getItem('userId');
    const [classRoom, setClassRoom] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [totalStudent, setTotalStudent] = useState(0);
    const [subId, setSubId] = useState('');
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [students, setStudents] = useState([]);
    const [classId, setClassId] = useState('');
    const [classlist, setclasslist] = useState('');
    const [selectedClassId, setSelectedClassId] = useState('');
    const [str, setStr] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        mouthTestpoint1: '',
        mouthTestpoint2: '',
        test15_1point: '',
        test15_2point: '',
        test15_3point: '',
        test15_4point: '',
        testLessonpoint: '',
        testLesson2point: '',
        testLesson3point: '',
        testLesson4point: '',
        exam1: '',
        exam2: '',
    });

    const handleStudentChange = (event) => {
        setSelectedStudent(event.target.value);
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/point', {
            teacherId: id,
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
            setclasslist(list);
            if (list.length > 0) {
                setSubId(list[0].subId);
                setTotalStudent(list[0].sic);
                setClassId(list[0].id);
            }
            return () => clearTimeout(skeletonTimeout);
        }).catch(error => {
            console.error('Error fetching MainTeacher data:', error);
        });
    }, []);

    const isValidNumber = (value) => {
        if (value === '') return true;
        const num = parseFloat(value);
        return !isNaN(num) && isFinite(num) && num >= 0 && num <= 10;
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            classId: selectedClass,
            subId: subId,
            studentId: selectedStudent,
            mouthTestpoint1: formData.mouthTestpoint1 || null,
            mouthTestpoint2: formData.mouthTestpoint2 || null,
            test15_1point: formData.test15_1point || null,
            test15_2point: formData.test15_2point || null,
            test15_3point: formData.test15_3point || null,
            test15_4point: formData.test15_4point || null,
            testLessonpoint: formData.testLessonpoint || null,
            testLesson2point: formData.testLesson2point || null,
            testLesson3point: formData.testLesson3point || null,
            testLesson4point: formData.testLesson4point || null,
            exam1: formData.exam1 || null,
            exam2: formData.exam2 || null,
        };

        let errorMessage = '';

        if (!data.classId) errorMessage += 'Lớp không được để trống.\n';
        if (!data.studentId) errorMessage += 'Học sinh không được để trống.\n';

        if (data.mouthTestpoint1 !== null && !isValidNumber(data.mouthTestpoint1)) errorMessage += 'Điểm miệng HK1 không hợp lệ.\n';
        if (data.mouthTestpoint2 !== null && !isValidNumber(data.mouthTestpoint2)) errorMessage += 'Điểm miệng HK2 không hợp lệ.\n';
        if (data.test15_1point !== null && !isValidNumber(data.test15_1point)) errorMessage += 'Điểm 15 phút lần 1 HK1 không hợp lệ.\n';
        if (data.test15_2point !== null && !isValidNumber(data.test15_2point)) errorMessage += 'Điểm 15 phút lần 2 HK2 không hợp lệ.\n';
        if (data.test15_3point !== null && !isValidNumber(data.test15_3point)) errorMessage += 'Điểm 15 phút lần 1 HK1 không hợp lệ.\n';
        if (data.test15_4point !== null && !isValidNumber(data.test15_4point)) errorMessage += 'Điểm 15 phút lần 2 HK2 không hợp lệ.\n';
        if (data.testLessonpoint !== null && !isValidNumber(data.testLessonpoint)) errorMessage += 'Điểm 1 tiết lần 1 HK1 không hợp lệ.\n';
        if (data.testLesson2point !== null && !isValidNumber(data.testLesson2point)) errorMessage += 'Điểm 1 tiết lần 2 HK2 không hợp lệ.\n';
        if (data.testLesson3point !== null && !isValidNumber(data.testLesson3point)) errorMessage += 'Điểm 1 tiết lần 2 HK1 không hợp lệ.\n';
        if (data.testLesson4point !== null && !isValidNumber(data.testLesson4point)) errorMessage += 'Điểm 1 tiết lần 2 HK2 không hợp lệ.\n';
        if (data.exam1 !== null && !isValidNumber(data.exam1)) errorMessage += 'Điểm thi HK1 không hợp lệ.\n';
        if (data.exam2 !== null && !isValidNumber(data.exam2)) errorMessage += 'Điểm thi HK2 không hợp lệ.\n';

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
                axios.post('http://localhost:8888/teachers/point/create', data)
                    .then(response => {
                        Swal.fire({
                            title: 'Đã thêm mới!',
                            text: 'Dữ liệu đã được cập nhật.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        console.log('Data to submit:', data);
                        navigate('/point');
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
                                text: error.response.data,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
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
    };

    const handleClassChange = (event) => {
        const classId = event.target.value;
        setSelectedClass(event.target.value);
        if (classId !== selectedClassId) {
            setSelectedClassId(classId);
            getStudentByClassID(classId);

        }
    };

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);

    const getStudentByClassID = (selectedClass) => {
        console.log("selectedClass", selectedClass)
        axios.post('http://localhost:8888/teachers/point/find', {
            classId: selectedClass
        }).then(response => {
            setStr(response.data);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    useEffect(() => {
        console.log("Students: " + students);
    })

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
                                                <p><a className="hover:no-underline pr-2" href="/point">Điểm số </a><FontAwesomeIcon className="text-[12px]" icon="fa-solid fa-angle-right" /> <span className="pl-2" href="/createpoint">Thêm điểm</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-center mb-[20px]">
                                                <p className="text-[24px] font-semibold tracking-wide text-[Arial] mb-[0px]">Thêm điểm học sinh</p>
                                            </div>
                                            <div className="w-[100%] h-100">
                                                <form>
                                                    <p className="text-[18px] font-semibold tracking-wide"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Thông tin học sinh</p>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <select className="form-control" id="classSelect" onChange={handleClassChange}>
                                                                <option value="">Chọn lớp</option>
                                                                {classRoom.map(classItem => (
                                                                    <option key={classItem.id} value={classItem.id}>
                                                                        {classItem.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <select id="studentSelect" className="form-control" onChange={handleStudentChange}>
                                                                <option value="">Chọn học sinh</option>
                                                                {str && str.length > 0 ? (
                                                                    str.map(student => (
                                                                        <option key={student.StudentID} value={student.StudentID}>
                                                                            {student.Student_Name}
                                                                        </option>
                                                                    ))
                                                                ) : (
                                                                    <option value="">Không có học sinh nào</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <p className="text-[18px] font-semibold tracking-wide mt-[15px] mb-[0]"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Học kỳ I</p>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <input type="text" id="mouthTestpoint1" className="form-control mt-[15px]" placeholder="Điểm miệng" onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <input type="text" id="test15_1point" className="form-control mt-[15px]" placeholder="Điểm 15 phút lần 1" onChange={handleInputChange} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <input type="text" id="test15_2point" className="form-control mt-[15px]" placeholder="Điểm 15 phút lần 2" onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <input type="text" id="testLessonpoint" className="form-control mt-[15px]" placeholder="Điểm 1 tiết lần 1" onChange={handleInputChange} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <input type="text" id="testLesson2point" className="form-control mt-[15px]" placeholder="Điểm 1 tiết lần 2" onChange={handleInputChange} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <input type="text" id="exam1" className="form-control mt-[15px]" placeholder="Điểm thi" onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <p className="text-[18px] font-semibold tracking-wide mt-[15px] mb-[0]"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Học kỳ II</p>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <input type="text" id="mouthTestpoint2" className="form-control mt-[15px]" placeholder="Điểm miệng" onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <input type="text" id="test15_3point" className="form-control mt-[15px]" placeholder="Điểm 15 phút lần 1" onChange={handleInputChange} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <input type="text" id="test15_4point" className="form-control mt-[15px]" placeholder="Điểm 15 phút lần 2" onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <input type="text" id="testLesson3point" className="form-control mt-[15px]" placeholder="Điểm 1 tiết lần 1" onChange={handleInputChange} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <input type="text" id="testLesson4point" className="form-control mt-[15px]" placeholder="Điểm 1 tiết lần 2" onChange={handleInputChange} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <input type="text" id="exam2" className="form-control mt-[15px]" placeholder="Điểm thi" onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="w-[60%] ml-[20%] mr-[20%]">
                                                        <button type="button" className="w-100 bg-[#4b70f5] text-while rounded-[5px] py-1 mt-[31px] mb-[30px]" onClick={handleSubmit}>
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

const EditPoint = () => {
    const { id } = useParams();
    const location = useLocation();
    const pointId = location.state?.point;
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [selectedSem, setSelectedSem] = useState('');
    const [subject, setSubject] = useState('');
    const navigate = useNavigate();
    const [point, setPoint] = useState({
        m1: '',
        m2: '',
        t15p1: '',
        t15p2: '',
        t15p3: '',
        t15p4: '',
        tl1: '',
        tl2: '',
        tl3: '',
        tl4: '',
        exam1: '',
        exam2: '',
    });
    const [student, setStudent] = useState({
        studentID: '',
        name: ''
    });

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/point/editpoint', {
            pointId: id
        }).then(response => {
            console.log(response.data);
            setPoint({
                subjectsID: response.data.subjectsID.subjectsID,
                studentID: response.data.studentID.studentID,
                m1: response.data.mouthTestpoint1 || 0,
                m2: response.data.mouthTestpoint2 || 0,
                t15p1: response.data.test151point || 0,
                t15p2: response.data.test152point || 0,
                t15p3: response.data.test153point || 0,
                t15p4: response.data.test154point || 0,
                tl1: response.data.testLessonpoint || 0,
                tl2: response.data.testLesson2point || 0,
                tl3: response.data.testLesson3point || 0,
                tl4: response.data.testLesson4point || 0,
                exam1: response.data.exam1 || 0,
                exam2: response.data.exam2 || 0,
            });
        }).catch(error => {
            console.log("Error fetch data: " + error);
        })
    }, [])

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/point/findstudent', {
            studentId: point.studentID
        }).then(response => {
            setStudent({
                studentID: response.data.studentID,
                name: response.data.studentName
            })
        }).catch(error => {
            console.log('Error fetch data: ' + error);
        })
    }, [point.studentID])

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/point/findsubject', {
            subjectsId: point.subjectsID
        }).then(response => {
            console.dir(response.data);
            setSubject({
                subjectID: response.data.subjectsID,
                name: response.data.subjectsName
            })
        }).catch(error => {
            console.log('Error fetch data: ' + error);
        })
    }, [point.subjectsID])

    const handleSemChange = (event) => {
        const sems = event.target.value;
        setSelectedSem(event.target.value);
    }


    const handleUpdate = () => {
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
                axios.post('http://localhost:8888/teachers/point/edit', {
                    pointId: id,
                    studentId: student.studentID,
                    subId: subject.subjectID,
                    ...point
                }).then(response => {
                    Swal.fire(
                        'Đã cập nhật!',
                        'Dữ liệu đã được cập nhật.',
                        'success'
                    );
                    navigate(`/point`);
                }).catch(error => {
                    Swal.fire(
                        'Lỗi!',
                        'Đã xảy ra sự cố khi cập nhật dữ liệu.',
                        'error'
                    );
                    console.log("Error updating data: " + error);
                });
            } else {
                Swal.fire(
                    'Đã hủy',
                    'Bản cập nhật đã bị hủy.',
                    'error'
                );
            }
        });
    };

    return (
        <>
            <div id='edit'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        {showSkeleton ? (
                            <SkeletonPage />
                        ) : (
                            <div id="inclass">
                                <div id="header-class" className="mt-[10px] flex">
                                    <div className="mt-[10px] w-[95%] ml-2.5% mr-2.5%">
                                        <div className="flex justify-between">
                                            <div>
                                                <p><a className="hover:no-underline pr-2" href="/point">Điểm số </a><FontAwesomeIcon className="text-[12px]" icon="fa-solid fa-angle-right" /> <span className="pl-2 pr-2" href="/createpoint">Sửa điểm</span><FontAwesomeIcon className="text-[12px]" icon="fa-solid fa-angle-right" /> <span className="pl-2">{student.name} ({subject.name})</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-center mb-[20px]">
                                                <p className="text-[24px] font-semibold tracking-wide text-[Arial] mb-[0px]">Sửa điểm học sinh</p>
                                            </div>
                                            <div className="container">
                                                <div className="w-[60%] h-100 ml-[20%] mr-[20%]">
                                                    <form>
                                                        <p className="text-[18px] font-semibold tracking-wide"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Thông tin học sinh</p>
                                                        <p className="text-[18px] font-semibold tracking-wide mt-[15px] mb-[0]"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Học kỳ I</p>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="mouthTestpoint1"
                                                                    value={point.m1}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm miệng"
                                                                    onChange={(e) => setPoint({ ...point, m1: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="test15_1point"
                                                                    value={point.t15p1}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm 15 phút lần 1"
                                                                    onChange={(e) => setPoint({ ...point, t15p1: e.target.value })} />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="test15_2point"
                                                                    value={point.t15p2}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm 15 phút lần 2"
                                                                    onChange={(e) => setPoint({ ...point, t15p2: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="testLessonpoint"
                                                                    value={point.tl1}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm 1 tiết lần 1"
                                                                    onChange={(e) => setPoint({ ...point, tl1: e.target.value })} />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="testLesson2point"
                                                                    value={point.tl2}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm 1 tiết lần 2"
                                                                    onChange={(e) => setPoint({ ...point, tl2: e.target.value })} />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="exam1"
                                                                    value={point.exam1}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm thi"
                                                                    onChange={(e) => setPoint({ ...point, exam1: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        <p className="text-[18px] font-semibold tracking-wide mt-[15px] mb-[0]"><FontAwesomeIcon icon="fa-solid fa-caret-right" /> Học kỳ II</p>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="mouthTestpoint2"
                                                                    value={point.m2}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm miệng"
                                                                    onChange={(e) => setPoint({ ...point, m2: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="test15_3point"
                                                                    value={point.t15p3}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm 15 phút lần 1"
                                                                    onChange={(e) => setPoint({ ...point, t15p3: e.target.value })} />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="test15_4point"
                                                                    value={point.t15p4}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm 15 phút lần 2"
                                                                    onChange={(e) => setPoint({ ...point, t15p4: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="testLesson3point"
                                                                    value={point.tl3}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm 1 tiết lần 1"
                                                                    onChange={(e) => setPoint({ ...point, tl3: e.target.value })} />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="testLesson4point"
                                                                    value={point.tl4}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm 1 tiết lần 2"
                                                                    onChange={(e) => setPoint({ ...point, tl4: e.target.value })} />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <input type="text"
                                                                    id="exam2"
                                                                    value={point.exam2}
                                                                    className="form-control mt-[15px]"
                                                                    placeholder="Điểm thi"
                                                                    onChange={(e) => setPoint({ ...point, exam2: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        <div className="w-[60%] ml-[20%] mr-[20%]">
                                                            <button type="button" className="w-100 bg-[#4b70f5] text-while rounded-[5px] py-1 mt-[31px] mb-[30px]" onClick={handleUpdate}>
                                                                Lưu thay đổi
                                                            </button>
                                                        </div>
                                                    </form>
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

export { PointOfStudent, CreatePoint, EditPoint }