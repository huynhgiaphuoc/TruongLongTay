import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutAdmin } from '../layout/layoutadmin'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend);




const Managestudent = () => {
    const optionMenuRef = useRef(null);

    const [pageSize, setPageSize] = useState(3);
    const [st, setSt] = useState([]);

    const [totalStudent, setTotalStudent] = useState(0);
    const [classId, setClassId] = useState([]);  // Tạo state để lưu classId
    const [student, setStudent] = useState([]);
    const [rollno, setRollno] = useState([]);
    const [studentName, setStudentName] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [cccd, setCccd] = useState([]);
    const [gender, setGender] = useState([]);
    const [status, setStatus] = useState([]);
    const [religion, setReligion] = useState([]);
    const [ethnicity, setEthnicity] = useState([]);
    const [moec, setMoec] = useState([]);
    const [place, setPlace] = useState([]);
    const [password, setPassword] = useState([]);
    const [dadName, setDadName] = useState([]);
    const [momname, setMomname] = useState([]);
    const [dadphone, setDadphone] = useState([]);
    const [momphone, setMomphone] = useState([]);
    const [jobdad, setJobdad] = useState([]);
    const [jobmom, setJobmom] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [birthday, setBirthday] = useState([]);
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = st.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(st.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    useEffect(() => {
        axios.post('http://localhost:8888/admin/getclasscc')
            .then(response => {
                console.log(response.data);
                setClassId(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);


    useEffect(() => {
        axios.post('http://localhost:8888/admin/allstudent')
            .then(response => {
                console.log(response.data);
                setStudent(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, [])


    const handleSetting = (id) => {
        axios.post("http://localhost:8888/admin/getstudent", { idsdn: id })
            .then(response => {
                console.log("data from API:", response.data); // Kiểm tra dữ liệu trả về
                setStudent(response.data)
                setRollno(response.data.Rollno);
                setStudentName(response.data.Student_Name);
                setEmail(response.data.Email);
                setPhone(response.data.Phone);
                setCccd(response.data.Cccd);
                setGender(response.data.Gender);
                setStatus(response.data.Student_Status);
                setReligion(response.data.Religion);
                setEthnicity(response.data.Ethnicity);
                setMoec(response.data.MOEC);
                setPlace(response.data.Place);
                setPassword(response.data.Password);
                setDadName(response.data.DadName);
                setMomname(response.data.Momname);
                setDadphone(response.data.Dadphone);
                setMomphone(response.data.Momphone);
                setJobdad(response.data.Jobdad);
                setJobmom(response.data.Jobmom);
                setProvinces(response.data.Provinces);
                setDistricts(response.data.Districts);
                setWards(response.data.Wards);
                setBirthday(response.data.Birthday);
                navigate('/editstudent', { state: { student: response.data } });
            })
            .catch(error => {
                console.error('There was an error fetching the Student by id!', error);
            });
    }

    useEffect(() => {
        fetchStudents(selectedClass);
    }, [selectedClass]);

    useEffect(() => {

    }, []);

    const fetchStudents = (classId) => {
        axios.post('http://localhost:8888/admin/managestudent', {
            classid: classId,
        }).then(response => {
            const dt = response.data;
            if (dt != null) {
                const studentList = dt.map(item => ({
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
                setSt(studentList);
            }
        }).catch(error => {
            console.error('Error exporting data: ' + error);
        });
    };
    const handlePageSizeChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedClass(selectedValue);
        console.log('Value: ' + selectedValue);
        setCurrentPage(1);
        fetchStudents(selectedValue, 1);
    };

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    }

    const deleteStudent = (stdid) => {
        console.log("print" + stdid)
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
                axios.post('http://localhost:8888/admin/deleteStudent', {
                    studentID: stdid,
                }).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đã xóa!',
                        text: 'Dữ liệu đã được cập nhật.',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Sau khi xóa xong, gọi lại hàm để cập nhật danh sách sinh viên
                        fetchStudents(selectedClass, currentPage);
                    });

                }).catch(error => {
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
                            text: 'Không thể xóa!',
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
        })
    }

    return (
        <>
            <div id='dashboard'>
                <div className='flex'>
                    <LayoutAdmin />
                    <div className='w-[calc(100%-250px)] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        <div id="managestudent">
                            <p className=' text-[24px] font-bold'>Quản Lí Học Sinh  <a href='/addstudent'><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a></p>
                            <div id="header-class" className="mt-[10px] flex">
                                <p className="text-[Arial] text-[18px] font-medium">Danh sách học sinh lớp </p>
                                <p className="ml-[42.5%]">Showing
                                    <select
                                        className="pl-1 ml-[5px] mt-[24px] px-3 py-1 rounded-[5px]"
                                        id="pageSize"
                                        value={selectedClass}
                                        onChange={handlePageSizeChange}
                                    >
                                        <option value='null'>
                                            Chọn lớp
                                        </option>
                                        {classId.map((item) => (
                                            <option key={item.ClassID} value={item.ClassID}>
                                                {item.Class_Name}
                                            </option>
                                        ))}
                                    </select>
                                </p>

                                <button className="p-1 mt-[32px] ml-[5px] h-[34px] px-3 bg-while flex items-start rounded-[5px] relative top-[-10px] focus:outline-none"
                                >
                                    <FontAwesomeIcon className="pr-1 relative top-1" icon="fa-solid fa-download" />
                                    Export
                                </button>
                            </div>

                            <div className="w-[97.5%] h-100 rounded-10 border-[1px] border-solid bg-[#e6e9ef] border-[#777]">
                                {currentProducts.length > 0 ? (
                                    currentProducts.map(student => (
                                        <div key={student.id} className="flex mx-[15px] my-[20px]">
                                            <div className="w-[20%] h-100 text-center">
                                                <img className="w-[150px] h-[200px] inline-block rounded-[5px]" src={student.path + student.avt} />
                                                <p className="inline-block mt-[5px] mb-[0] font-semibold">{student.cccd}</p>
                                                <p className=" mb-[0] font-semibold">{student.name}</p>
                                                <p className="mb-[0]">Giới tính: {student.gender}</p>
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

                                                    <button onClick={() => handleSetting(student.id)} className="w-100 bg-[#FF9800] text-while px-3 py-1 rounded-[5px] inline-block mt-[10px]">
                                                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
                                                    </button>

                                                    <button onClick={() => deleteStudent(student.id)} className="w-100 bg-[#ff0000] text-while px-3 py-1 rounded-[5px] inline-block mt-[10px]">
                                                        <FontAwesomeIcon icon="fa-solid fa-trash" /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    ))

                                ) : (
                                    <p>Không có học sinh nào trong lớp này.</p>
                                )}

                                <div className="flex justify-center mt-6 m-[20px_0] p-[10px_0]">
                                    {pageNumbers.map(number => (
                                        <button
                                            key={number}
                                            onClick={() => setCurrentPage(number)}
                                            className={` ${number == currentPage ? 'bg-[#000000] text-[#fff] rounded-50 font-bold w-[40px] h-[40px] p-[5px]' : 'bg-[#eee] text-[#374151] rounded-50 m-[0_5px] w-[40px] h-[40px] p-[10px] '} hover:bg-[#89bde7] hover:text-[#000]`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



const Addstudent = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [rollno, setRollno] = useState('');
    const [studentName, setStudentName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cccd, setCccd] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const [religion, setReligion] = useState('');
    const [ethnicity, setEthnicity] = useState('');
    const [moec, setMoec] = useState('');
    const [birthday, setBirthday] = useState('');
    const [place, setPlace] = useState('');
    const [password, setPassword] = useState('');
    const [dadName, setDadName] = useState('');
    const [momname, setMomname] = useState('');
    const [dadphone, setDadphone] = useState('');
    const [momphone, setMomphone] = useState('');
    const [jobdad, setJobdad] = useState('');
    const [jobmom, setJobmom] = useState('');
    const [temporaryAddress, setTemporaryAddress] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [classId, setClassId] = useState([]);


    const [classList, setClassList] = useState([]);

    const navigate = useNavigate();


    const handleSubmitcreate = () => {

        if (!rollno || !email || !phone) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all required fields!',
            });
            return;
        }

        // Kiểm tra email phải chứa @ và đúng định dạng
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address!',
            });
            return;
        }

        // Kiểm tra phone phải là số và có đúng 10 ký tự
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Phone number must be exactly 10 digits!',
            });
            return;
        }

        axios.post('http://localhost:8888/admin/addstudent', {
            rollno: rollno,
            studentName: studentName,
            email: email,
            phone: phone,
            cccd: cccd,
            gender: gender,
            status: status,
            religion: religion,
            ethnicity: ethnicity,
            moec: moec,
            place: place,
            password: password,
            dadName: dadName,
            momname: momname,
            dadphone: dadphone,
            momphone: momphone,
            jobdad: jobdad,
            jobmom: jobmom,
            temporaryAddress: temporaryAddress,
            permanentAddress: permanentAddress,
            selectedProvince: selectedProvince,
            selectedDistrict: selectedDistrict,
            selectedWard: selectedWard,
            birthday: birthday,
            classid: selectedClass


        }).then(response => {
            console.log(response.data)
            if (!response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Student added successfully',
                    text: 'The student has been added to the database.',
                });
                navigate('/students');
            }
        })
    }

    useEffect(() => {
        console.dir(classId);
    });


    useEffect(() => {
        // Lấy danh sách tỉnh/thành khi component mount
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(response => {
                if (response.data.error === 0) {
                    setProvinces(response.data.data);
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
            });
    }, []);

    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);
        console.dir(provinceId);
     

        // Lấy danh sách quận/huyện khi chọn tỉnh/thành
        axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`)
            .then(response => {
                if (response.data.error === 0) {
                    setDistricts(response.data.data);
                    setWards([]); // Xóa danh sách phường/xã khi chọn tỉnh mới
                    setSelectedDistrict(''); // Reset quận/huyện đã chọn
                    setSelectedWard(''); // Reset xã/phường đã chọn
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách quận/huyện:', error);
            });
    };
    const [currentPage, setCurrentPage] = useState(0);
    const [totalStudent, setTotalStudent] = useState(0);

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        console.dir(districtId);

        // Lấy danh sách phường/xã khi chọn quận/huyện
        axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
            .then(response => {
                if (response.data.error === 0) {
                    setWards(response.data.data);
                    console.dir(response.data.data);
                    setSelectedWard(''); // Reset xã/phường đã chọn
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách phường/xã:', error);
            });
    };

    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
        console.dir(e.target.value);
    };



    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        axios.post('http://localhost:8888/admin/getclass')
            .then(response => {
                console.log(response.data);
                setClassId(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handlePageSizeChange = (e) => {
        setSelectedClass(e.target.value);
        console.log('Select: ' + e.target.value);
    };
    return (
        <>
            <div id='addstudent'>
                <div className='flex'>
                    <LayoutAdmin />
                    <div className='w-[calc(100%-250px)] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        <div className='w-[99%] h-100 rounded-10 border-[1px] border-solid bg-[#e6e9ef] border-[#777]'>
                            <p className='text-center text-[24px] font-bold'>Thêm Học Sinh Mới</p>
                            <div className='flex text-[20px] italic'>
                                <FontAwesomeIcon className='ml-[10px] mt-[7px]' icon="fa-solid fa-caret-right" />
                                <p className='ml-[5px] '>Thông tin học sinh</p>
                            </div>
                            <div className='flex'>
                                <div className='ml-[3%] w-[20%] flex '>
                                    <img className="w-[200px] h-[250px] inline-block rounded-[5px]" />
                                </div>
                                <div className='w-40% flex'>
                                    <div className=' w-[32%] '>
                                        <p className='mb-[15px] mt-[6px]'>Mã học sinh : </p>
                                        <p className='mb-[15px]'>Họ và tên :</p>
                                        <p className='mb-[15px]'>Địa chỉ Email : </p>
                                        <p>Số điện thoại :</p>
                                        <p>Cccd : </p>
                                        <p>Giới tính :</p>

                                    </div>
                                    <div className='w-[78%]'>
                                        <input type="text" value={rollno} onChange={(e) => setRollno(e.target.value)} name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input type="text" value={cccd} onChange={(e) => setCccd(e.target.value)} name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />

                                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"  >
                                            <option value="ko_xac_dinh">Không xác định</option>
                                            <option value="nam">Nam</option>
                                            <option value="nu">Nữ</option>

                                        </select>
                                    </div>
                                </div>
                                <div className='w-[30%] ml-10% flex'>
                                    <div className=' w-[30%] '>
                                        <p className='mb-[15px] mt-[6px]'>Trạng thái: </p>
                                        <p className='mb-[15px]'>Tôn giáo :</p>
                                        <p className='mb-[15px]'>Dân Tộc : </p>
                                        <p>Birthday:</p>
                                        <p>Nơi Sinh : </p>
                                        <p className='mb-[15px]'>Mật Khẩu :</p>

                                    </div>
                                    <div className='w-[70%]'>
                                        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input type="text" value={religion} onChange={(e) => setReligion(e.target.value)} name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input type="text" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                    </div>
                                </div>
                            </div>
                            <div className='w-[90%] ml-5% mr5% mt-[10px] mb-[10px] border-[#ccc] border-solid border-[1px]'></div>
                            <div className='flex text-[20px] italic'>
                                <FontAwesomeIcon className='ml-[10px] mt-[7px]' icon="fa-solid fa-caret-right" />
                                <p className='ml-[5px] '>Thông tin phụ huynh</p>
                            </div>
                            <div className='w-[100%] flex'>
                                <div className='ml-[10px] w-[33%] flex'>
                                    <div className='w-[30%]'>
                                        <p className='mb-[15px] mt-[6px]'>Họ và Tên Cha : </p>
                                        <p className='mb-[15px] mt-[26px]'>Họ và Tên Mẹ : </p>

                                    </div>
                                    <div className='w-[70%]'>
                                        <input value={dadName} onChange={(e) => setDadName(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={momname} onChange={(e) => setMomname(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[15px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />

                                    </div>
                                </div>
                                <div className='w-[34%] flex'>
                                    <div className='w-[33%]'>
                                        <p className='mb-[15px] mt-[6px]'>Số điện thoại Cha : </p>
                                        <p className='mb-[15px] mt-[26px]'>Số điện thoại Mẹ : </p>


                                    </div>
                                    <div className='w-[67%]'>
                                        <input value={dadphone} onChange={(e) => setDadphone(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={momphone} onChange={(e) => setMomphone(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[15px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />

                                    </div>
                                </div>
                                <div className='w-[33%] flex'>
                                    <div className='w-[33%]'>
                                        <p className='mb-[15px] mt-[6px]'>Nghề Nghiệp : </p>
                                        <p className='mb-[15px] mt-[26px]'>Nghề Nghiệp : </p>


                                    </div>
                                    <div className='w-[67%]'>
                                        <input value={jobdad} onChange={(e) => setJobdad(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={jobmom} onChange={(e) => setJobmom(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[15px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />

                                    </div>
                                </div>
                            </div>
                            <div className='flex mt-2.5% text-[20px] italic'>
                                <FontAwesomeIcon className='ml-[10px] mt-[7px]' icon="fa-solid fa-caret-right" />
                                <p className='ml-[5px] '>Thông tin liên hệ</p>
                            </div>
                            <p className='italic ml-[10px] mb-[0] font-medium'>Địa chỉ thường trú :</p>
                            <div className='w-[100%] flex'>
                                <div className='ml-[10px] w-[33%] flex'>
                                    <div className='w-[30%]'>
                                        <p className='mb-[20px] mt-[26px]' >Tỉnh :</p>
                                        <p className='mb-[20px] mt-[26px]' >Địa chỉ cụ thể :</p>
                                    </div>
                                    <div className='w-[70%]'>
                                        <select
                                            className="css_select block w-56 mb-[4px] mt-[20px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"
                                            id="tinh"
                                            name="tinh"
                                            value={selectedProvince}
                                            onChange={handleProvinceChange}
                                            title="Chọn Tỉnh Thành"
                                        >
                                            <option value="">Tỉnh Thành</option>
                                            {provinces.map(province => (
                                                <option key={province.id} value={province.id}>
                                                    {province.full_name}
                                                </option>
                                            ))}
                                        </select>
                                        <input value={temporaryAddress} onChange={(e) => setTemporaryAddress(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[15px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />

                                    </div>
                                </div>
                                <div className='w-[34%] flex'>
                                    <div className='w-[33%]'>
                                        <p className='mb-[15px] mt-[26px]'>Quận/Huyện :</p>
                                    </div>
                                    <div className='w-[67%]'>
                                        <select
                                            className="css_select block w-56 mb-[4px] mt-[20px] rounded-[10px] w-[72%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"

                                            id="quan"
                                            name="quan"
                                            value={selectedDistrict}
                                            onChange={handleDistrictChange}
                                            title="Chọn Quận Huyện"
                                            disabled={!selectedProvince}
                                        >
                                            <option value="">Quận Huyện</option>
                                            {districts.map(district => (
                                                <option key={district.id} value={district.id}>
                                                    {district.full_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='w-[33%] flex'>
                                    <div className='w-[33%]'>

                                        <p className='mb-[15px] mt-[26px]' >Xã :  </p>

                                    </div>
                                    <div className='w-[67%]'>
                                        <select
                                            className="css_select block w-56 mb-[4px] mt-[20px] rounded-[10px] w-[72%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"

                                            id="phuong"
                                            name="phuong"
                                            value={selectedWard}
                                            onChange={handleWardChange}
                                            title="Chọn Phường Xã"
                                            disabled={!selectedDistrict}
                                        >
                                            <option value="">Phường Xã</option>
                                            {wards.map(ward => (
                                                <option key={ward.id} value={ward.id}>
                                                    {ward.full_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <p className='italic ml-[10px] mb-[0] font-medium'>Địa chỉ tạm trú :</p>
                            <div className='w-[100%] flex'>
                                <div className='ml-[10px] w-[50%] flex'>
                                    <div className='w-[30%]'>
                                        <p className='mb-[20px] mt-[26px]' >Địa chỉ cụ thể :</p>
                                    </div>
                                    <div className='w-[70%]'>
                                        <input value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[20px] rounded-[10px] w-[100%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                    </div>
                                </div>
                            </div>
                            <div className='w-[100%] flex'>
                                <div className='ml-[10px] w-[50%] flex'>
                                    <div className='w-[30%]'>
                                        <p className='mb-[20px] mt-[26px]' >Chọn Lớp :</p>
                                    </div>
                                    <div className='w-[70%]'>
                                        <select
                                            className="pl-1 ml-[5px] mt-[24px] px-3 py-1 rounded-[5px]"
                                            id="pageSize"
                                            value={selectedClass}
                                            onChange={handlePageSizeChange}
                                        >
                                            {classId.map((item) => (
                                                <option key={item.ClassID} value={item.ClassID}>
                                                    {item.Class_Name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='btn-save ml-[44%] mb-[10px] mt-[5px]'>
                                <button class="bg-[#1e00ff] w-[200px] h-[40px] text-[white] border-[2px] border-solid border-[black] rounded-10 hover:bg-[#3c6dffd3] bg-[800] hover:text-[#ffffff] transition-colors duration-300" onClick={handleSubmitcreate}>
                                    Tạo Học Sinh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

const Editstudent = () => {
    const [selectedProvince, setSelectedProvince] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const [selectedWard, setSelectedWard] = useState([]);
    const location = useLocation();
    const { student } = location.state || {};
    const studentData = student ? (Array.isArray(student) && student.length > 0 ? student[0] : student) : {};
    const [rollno, setRollno] = useState('');
    const [studentName, setStudentName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cccd, setCccd] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const [religion, setReligion] = useState('');
    const [ethnicity, setEthnicity] = useState('');
    const [place, setPlace] = useState('');
    const [password, setPassword] = useState('');
    const [dadName, setDadName] = useState('');
    const [momname, setMomname] = useState('');
    const [dadphone, setDadphone] = useState('');
    const [momphone, setMomphone] = useState('');
    const [jobdad, setJobdad] = useState('');
    const [jobmom, setJobmom] = useState('');
    const [temporaryAddress, setTemporaryAddress] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [birthday, setBirthday] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        // Lấy danh sách tỉnh/thành khi component mount
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(response => {
                if (response.data.error === 0) {
                    setProvinces(response.data.data);

                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
            });
    }, []);

    useEffect(() => {
        console.log(student)
    }, [])

    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        console.log(selectedProvince);
        console.log(selectedDistrict);
        console.log(selectedWard);
        console.log("Current: " + provinceId);
        setSelectedProvince(provinceId);
        setSelectedDistrict('')
        setSelectedWard('')
        axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`)
            .then(response => {
                if (response.data.error === 0) {
                    setDistricts(response.data.data);
                    setWards([]); // Xóa danh sách phường/xã khi chọn tỉnh mới
                    setSelectedDistrict(studentData.District); // Reset quận/huyện đã chọn
                    setSelectedWard(''); // Reset xã/phường đã chọn
                }
            })
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;

        setSelectedDistrict(districtId);
        axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
            .then(response => {
                if (response.data.error === 0) {
                    setWards(response.data.data);
                    setSelectedWard(studentData.Commune); // Reset xã/phường đã chọn
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách phường/xã:', error);
            });

    };
    const handleWardChange = (e) => {
        // setSelectedWard(e.target.value);
    };

    useEffect(() => {
        if (studentData) {
            setRollno(studentData.Rollno);
            setStudentName(studentData.Student_Name);
            setEmail(studentData.Email);
            setPhone(studentData.Phone);
            setCccd(studentData.Cccd);
            setGender(studentData.Gender);
            setStatus(studentData.Student_Status);
            setReligion(studentData.Religion);
            setEthnicity(studentData.Ethnicity);
            setPermanentAddress(studentData.Permanent_Address);
            setTemporaryAddress(studentData.Temporary_Address);
            setPlace(studentData.Place);
            setPassword(studentData.Password);
            setDadName(studentData.Dad_Name);
            setMomname(studentData.Mom_Name);
            setDadphone(studentData.Parent_Phone);
            setMomphone(studentData.Parent_Phone2);
            setJobdad(studentData.Jobdad);
            setJobmom(studentData.Jobmom);
            setProvinces(studentData.Provinces);
            setDistricts(studentData.Districts);
            setSelectedProvince(studentData.Province);
            setSelectedDistrict(studentData.District);
            setSelectedWard(studentData.Commune);
            setWards(studentData.Wards);
            setBirthday(studentData.Birthday);
            setId(studentData.StudentID);
            setBirthday(convertTimestampToDate(studentData.Birthday));

            axios.get(`https://esgoo.net/api-tinhthanh/2/${studentData.Province}.htm`)
                .then(response => {
                    if (response.data.error === 0) {
                        setDistricts(response.data.data);
                        setWards([]); // Xóa danh sách phường/xã khi chọn tỉnh mới
                        setSelectedDistrict(studentData.District); // Reset quận/huyện đã chọn
                        setSelectedWard(''); // Reset xã/phường đã chọn
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi lấy danh sách quận/huyện:', error);
                });

            axios.get(`https://esgoo.net/api-tinhthanh/3/${studentData.District}.htm`)
                .then(response => {
                    if (response.data.error === 0) {
                        setWards(response.data.data);
                        setSelectedWard(studentData.Commune); // Reset xã/phường đã chọn
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi lấy danh sách phường/xã:', error);
                });
        }
    }, [studentData]);

    const handleSubmit = async (e) => {
        const data = {
            idsdn: id,
            rollno: rollno,
            studentName: studentName,
            email: email,
            phone: phone,
            cccd: cccd,
            gender: gender,
            status: status,
            religion: religion,
            ethnicity: ethnicity,
            place: place,
            password: password,
            dadName: dadName,
            momname: momname,
            dadphone: dadphone,
            momphone: momphone,
            jobdad: jobdad,
            jobmom: jobmom,
            permanentAddress: permanentAddress,
            temporaryAddress: temporaryAddress,
            selectedProvince: selectedProvince && provinces.length > 0 ? provinces[0].id : '',
            selectedDistrict: selectedDistrict && districts.length > 0 ? districts[0].id : '',
            selectedWard: selectedWard && wards.length > 0 ? wards[0].id : '',
            birthday: birthday
        }
        console.log('Payload:', data);
        e.preventDefault();
        axios.post('http://localhost:8888/admin/editstudent', data)
            .then(response => {
                console.log(response.studentData);
                Swal.fire('Success', 'Cập nhật sản phẩm thành công!', 'success');
                navigate('/students');
            }).catch(error => {
                console.log(id);
                console.error('cc', error);
            });
    }
    const convertTimestampToDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0]; // Chuyển đổi sang định dạng YYYY-MM-DD
    };
    return (
        <>
            <div id='addstudent'>
                <div className='flex'>
                    <LayoutAdmin />
                    <div className='w-[calc(100%-250px)] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        <div className='w-[99%] h-100 rounded-10 border-[1px] border-solid bg-[#e6e9ef] border-[#777]'>
                            <p className='text-center text-[24px] font-bold'>Thêm Học Sinh Mới</p>
                            <div className='flex text-[20px] italic'>
                                <FontAwesomeIcon className='ml-[10px] mt-[7px]' icon="fa-solid fa-caret-right" />
                                <p className='ml-[5px] '>Thông tin học sinh</p>
                            </div>
                            <div className='flex'>
                                <div className='ml-[3%] w-[20%] flex '>
                                    <img className="w-[200px] h-[250px] inline-block rounded-[5px]" />
                                </div>
                                <div className='w-40% flex'>
                                    <div className=' w-[32%] '>
                                        <p className='mb-[15px] mt-[6px]'>Mã học sinh : </p>
                                        <p className='mb-[15px]'>Họ và tên :</p>
                                        <p className='mb-[15px]'>Địa chỉ Email : </p>
                                        <p>Số điện thoại :</p>
                                        <p>Cccd : </p>
                                        <p>Giới tính :</p>


                                    </div>
                                    <div className='w-[78%]'>
                                        <input value={rollno} onChange={(e) => setRollno(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={studentName} onChange={(e) => setStudentName(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={cccd} onChange={(e) => setCccd(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />

                                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"  >
                                            <option value="ko_xac_dinh">Không xác định</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='w-[30%] ml-10% flex'>
                                    <div className=' w-[30%] '>
                                        <p className='mb-[15px] mt-[6px]'>Trạng thái: </p>
                                        <p className='mb-[15px]'>Tôn giáo :</p>
                                        <p className='mb-[15px]'>Dân Tộc : </p>
                                        <p>Birthday:</p>
                                        <p>Nơi Sinh : </p>
                                        <p className='mb-[15px]'>Mật Khẩu :</p>

                                    </div>
                                    <div className='w-[70%]'>
                                        <input value={status} onChange={(e) => setStatus(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={religion} onChange={(e) => setReligion(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" name="inputname" id="birthday" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={place} onChange={(e) => setPlace(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="inputname" id="inputname" className="block w-56  mb-[4px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                    </div>
                                </div>
                            </div>
                            <div className='w-[90%] ml-5% mr5% mt-[10px] mb-[10px] border-[#ccc] border-solid border-[1px]'></div>
                            <div className='flex text-[20px] italic'>
                                <FontAwesomeIcon className='ml-[10px] mt-[7px]' icon="fa-solid fa-caret-right" />
                                <p className='ml-[5px] '>Thông tin phụ huynh</p>
                            </div>
                            <div className='w-[100%] flex'>
                                <div className='ml-[10px] w-[33%] flex'>
                                    <div className='w-[30%]'>
                                        <p className='mb-[15px] mt-[6px]'>Họ và Tên Cha : </p>
                                        <p className='mb-[15px] mt-[26px]'>Họ và Tên Mẹ : </p>

                                    </div>
                                    <div className='w-[70%]'>
                                        <input value={dadName} onChange={(e) => setDadName(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={momname} onChange={(e) => setMomname(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[15px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />

                                    </div>
                                </div>
                                <div className='w-[34%] flex'>
                                    <div className='w-[33%]'>
                                        <p className='mb-[15px] mt-[6px]'>Số điện thoại Cha : </p>
                                        <p className='mb-[15px] mt-[26px]'>Số điện thoại Mẹ : </p>


                                    </div>
                                    <div className='w-[67%]'>
                                        <input value={dadphone} onChange={(e) => setDadphone(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={momphone} onChange={(e) => setMomphone(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[15px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />

                                    </div>
                                </div>
                                <div className='w-[33%] flex'>
                                    <div className='w-[33%]'>
                                        <p className='mb-[15px] mt-[6px]'>Nghề Nghiệp : </p>
                                        <p className='mb-[15px] mt-[26px]'>Nghề Nghiệp : </p>


                                    </div>
                                    <div className='w-[67%]'>
                                        <input value={jobdad} onChange={(e) => setJobdad(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                        <input value={jobmom} onChange={(e) => setJobmom(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[15px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />

                                    </div>
                                </div>
                            </div>
                            <div className='flex mt-2.5% text-[20px] italic'>
                                <FontAwesomeIcon className='ml-[10px] mt-[7px]' icon="fa-solid fa-caret-right" />
                                <p className='ml-[5px] '>Thông tin liên hệ</p>
                            </div>
                            <p className='italic ml-[10px] mb-[0] font-medium'>Địa chỉ thường trú :</p>
                            <div className='w-[100%] flex'>
                                <div className='ml-[10px] w-[33%] flex'>
                                    <div className='w-[30%]'>
                                        <p className='mb-[20px] mt-[26px]' >Tỉnh :</p>
                                        <p className='mb-[20px] mt-[26px]' >Địa chỉ cụ thể :</p>
                                    </div>
                                    <div className='w-[70%]'>
                                        <select
                                            className="css_select block w-56 mb-[4px] mt-[20px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"
                                            id="tinh"
                                            name="tinh"
                                            value={selectedProvince}
                                            onChange={handleProvinceChange}
                                            title="Chọn Tỉnh Thành"
                                        >
                                            <option>Tỉnh Thành</option>
                                            {Array.isArray(provinces) && provinces.map(province => (
                                                <option key={province.id} value={province.id}>
                                                    {province.full_name}
                                                </option>
                                            ))}
                                        </select>
                                        <input value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[15px] rounded-[10px] w-[73%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />

                                    </div>
                                </div>
                                <div className='w-[34%] flex'>
                                    <div className='w-[33%]'>
                                        <p className='mb-[15px] mt-[26px]'>Quận/Huyện :</p>
                                    </div>
                                    <div className='w-[67%]'>
                                        <select
                                            className="css_select block w-56 mb-[4px] mt-[20px] rounded-[10px] w-[72%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"

                                            id="quan"
                                            name="quan"
                                            value={selectedDistrict}
                                            onChange={handleDistrictChange}
                                            title="Chọn Quận Huyện"

                                        >
                                            <option>Quận Huyện</option>
                                            {Array.isArray(districts) && districts.map(district => (
                                                <option key={district.id} value={district.id}>
                                                    {district.full_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='w-[33%] flex'>
                                    <div className='w-[33%]'>

                                        <p className='mb-[15px] mt-[26px]' >Xã :  </p>

                                    </div>
                                    <div className='w-[67%]'>
                                        <select
                                            className="css_select block w-56 mb-[4px] mt-[20px] rounded-[10px] w-[72%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"

                                            id="phuong"
                                            name="phuong"
                                            value={selectedWard}
                                            onChange={handleWardChange}
                                            title="Chọn Phường Xã"
                                        >
                                            <option>Phường Xã</option>
                                            {Array.isArray(wards) && wards.map(ward => (
                                                <option key={ward.id} value={ward.id}>
                                                    {ward.full_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <p className='italic ml-[10px] mb-[0] font-medium'>Địa chỉ tạm trú :</p>
                            <div className='w-[100%] flex'>
                                <div className='ml-[10px] w-[50%] flex'>
                                    <div className='w-[30%]'>
                                        <p className='mb-[20px] mt-[26px]' >Địa chỉ cụ thể :</p>
                                    </div>
                                    <div className='w-[70%]'>
                                        <input value={temporaryAddress} onChange={(e) => setTemporaryAddress(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56 mb-[4px] mt-[20px] rounded-[10px] w-[100%] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                    </div>
                                </div>

                            </div>

                            <div className='btn-save ml-[44%] mb-[10px] mt-[5px]'>
                                <button type='button' onClick={handleSubmit} className="bg-[#1e00ff] w-[200px] h-[40px] text-[white] border-[2px] border-solid border-[black] rounded-10 hover:bg-[#3c6dffd3] bg-[800] hover:text-[#ffffff] transition-colors duration-300">
                                    Sửa Học Sinh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const ManageSubject = () => {
    const [subjectsGroups, setSubjectsGroups] = useState([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu từ Spring Boot
        axios.post('http://localhost:8888/admin/manageSubject')
            .then(response => {
                console.log(response.data);
                setSubjectsGroups(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div id='dashboard'>
            <div className='flex'>
                <LayoutAdmin />
                <div className='w-[calc(100%-250px)] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                    <div id='manageSubject'>
                        <p className=' text-[24px] font-bold'>
                            Quản lí môn học <a href='/addSubject'><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                        </p>
                        <p className=' text-[24px] font-bold'>
                            Quản lí tổ hợp <a href='/addSubjectCombination'><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                        </p>
                        <div className='flex w-[99%]'>
                            <div className='bg-[#ffffff] rounded-[5px] w-[100%] h-[100hv]'>
                                <div className="overflow-x-auto rounded-[20px]">
                                    <table className="min-w-full bg-white border border-gray-300 rounded-[20px]">
                                        <thead>
                                            <tr className='bg-[#ff0b0b]'>
                                                <th className="px-4 py-2 border">Id</th>
                                                <th className="px-4 py-2 border">Subjects</th>
                                                <th className="px-4 py-2 border">Subject_Combination_Code</th>
                                                <th className="px-4 py-2 border">Study_Topics</th>
                                                <th className="px-4 py-2 border">Subjects_Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subjectsGroups.map((group, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 border">{group.SubjectsGroupId}</td>
                                                    <td className="px-4 py-2 border">{group.Subjects}</td>
                                                    <td className="px-4 py-2 border">{group.Subject_Combination_Code}</td>
                                                    <td className="px-4 py-2 border">{group.Study_Topics}</td>
                                                    <td className="px-4 py-2 border">{group.Subjects_Name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const AddSubject = () => {
    const [Subjects_Name, setSubjects_Name] = useState('');
    const navigate = useNavigate();

    const handleSubmitcreate = async () => {
        try {
            const response = await axios.post('http://localhost:8888/admin/addSubject', {
                subjects_Name: Subjects_Name,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Môn học đã được thêm thành công',
                    text: 'Môn học mới đã được thêm vào cơ sở dữ liệu.',
                });

                navigate('/subject');
                setSubjects_Name('');
            }

        } catch (error) {
            console.error("Có lỗi xảy ra khi thêm môn học!", error);
            Swal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra',
                text: 'Đã xảy ra lỗi khi thêm môn học. Vui lòng thử lại!',
            });
        }
    };
    return (
        <>
            <div id='addsubject'>
                <div className='flex'>
                    <LayoutAdmin />
                    <div className='w-[calc(100%-250px)] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        <p className='text-center text-[24px] font-bold'>Thêm Môn</p>
                        <div className='flex ml-[25%] bg-[#ffffff] rounded-[20px] h-[100hv] w-[50%]'>
                            <div className='ml-[10px] w-[40%]'>
                                <p className='ml-[25px] mt-[10px]'>Subjects_Name</p>
                            </div>
                            <div className='w-[60]'>
                                <input value={Subjects_Name} onChange={(e) => setSubjects_Name(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mt-[7px] mb-[4px] rounded-[10px] w-[340px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                            </div>

                        </div>
                        <div className='btn-save ml-[44%] mb-[10px] mt-[10px]'>
                            <button class="bg-[#1e00ff] w-[200px] h-[40px] text-[white] border-[2px] border-solid border-[black] rounded-10 hover:bg-[#3c6dffd3] bg-[800]  hover:text-[#ffffff] transition-colors duration-300" onClick={handleSubmitcreate}>
                                Tạo Môn học
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};


const AddSubjectCombination = () => {
    const [subjects, setSubjects] = useState('');
    const [subjectCombinationCode, setSubjectCombinationCode] = useState('');
    const [studyTopics, setStudyTopics] = useState('');
    const navigate = useNavigate();
    const handleSubmitcreate = async () => {
        // Kiểm tra các trường dữ liệu có rỗng không
        if (!subjects || !subjectCombinationCode || !studyTopics) {
            Swal.fire({
                icon: 'warning',
                title: 'Thông báo',
                text: 'Vui lòng điền đầy đủ thông tin trước khi thêm tổ hợp môn học.',
            });
            return;
        }
        try {
            const response = await axios.post('http://localhost:8888/admin/addSubjectCombination', {
                subjects,
                subjectCombinationCode,
                studyTopics,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Tổ hợp môn học đã được thêm thành công.',
                });
                navigate('/combination')

                // Reset lại các giá trị input sau khi thêm thành công
                setSubjects('');
                setSubjectCombinationCode('');
                setStudyTopics('');
            }
        } catch (error) {
            console.error("Có lỗi xảy ra khi thêm tổ hợp môn học!", error);
            Swal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra',
                text: 'Đã xảy ra lỗi khi thêm tổ hợp môn học. Vui lòng thử lại!',
            });
        }
    };
    return (
        <>
            <div id='addsubject'>
                <div className='flex'>
                    <LayoutAdmin />
                    <div className='w-[calc(100%-250px)] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        <p className='text-center text-[24px] font-bold'>Thêm Môn</p>
                        <div className='flex ml-[25%] bg-[#ffffff] rounded-[20px] h-[100hv] w-[50%]'>
                            <div className='ml-[10px] w-[40%]'>
                                <p className='ml-[25px] mt-[10px]'>Subjects</p>
                                <p className='ml-[25px] mt-[10px]'>Subject_Combination_Code</p>
                                <p className='ml-[25px] mt-[10px]'>Study_Topics</p>
                            </div>
                            <div className='w-[60]'>
                                <input value={subjects} onChange={(e) => setSubjects(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mt-[7px] mb-[4px] rounded-[10px] w-[340px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                <input value={subjectCombinationCode} onChange={(e) => setSubjectCombinationCode(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mt-[7px] mb-[4px] rounded-[10px] w-[340px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                                <input value={studyTopics} onChange={(e) => setStudyTopics(e.target.value)} type="text" name="inputname" id="inputname" className="block w-56  mt-[7px] mb-[4px] rounded-[10px] w-[340px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800" />
                            </div>
                        </div>
                        <div className='btn-save ml-[44%] mb-[10px] mt-[10px]'>
                            <button class="bg-[#1e00ff] w-[200px] h-[40px] text-[white] border-[2px] border-solid border-[black] rounded-10 hover:bg-[#3c6dffd3] bg-[800] hover:text-[#ffffff] transition-colors duration-300" onClick={handleSubmitcreate} >
                                Tạo Môn học
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

const EditSubject = () => {
    const location = useLocation();
    const { subject } = location.state || {};
    console.log("Subject received:", subject);
    const navigate = useNavigate();
    const subjectData = Array.isArray(subject) && subject.length > 0 ? subject[0] : subject;

    console.log("Subject received:", subjectData); // Kiểm tra dữ liệu nhận được

    const [subjectname, setSubjectname] = useState(subjectData?.Subjects_Name || '');
    const [subjectid, setSubjects] = useState(subjectData?.SubjectsID || '');


    useEffect(() => {
        if (subjectData) {
            setSubjectname(subjectData.Subjects_Name);
        }
    }, [subjectData]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("dklfkjdfd");
        axios.post('http://localhost:8888/admin/edit', { idno: subjectid, subjects_Name: subjectname })
            .then(response => {
                console.log(response.data);
                Swal.fire('Success', 'Cập nhật sản phẩm thành công!', 'success');
                navigate('/subject');
            }).catch(error => {
                console.error('There was an error fetching the product by id!', error);
            });
    }

    console.log("Subject Name:", subjectname);
    return (
        <>
            <div id='editSubject'>
                <div className='flex'>
                    <LayoutAdmin />
                    <div className='w-[calc(100%-250px)] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        <p className='text-center text-[24px] font-bold'>Thêm Môn</p>
                        <div className='flex ml-[25%] bg-[#ffffff] rounded-[20px] h-[100hv] w-[50%]'>
                            <div className='ml-[10px] w-[40%]'>
                                <p className='ml-[25px] mt-[10px]'>Subjects_Name</p>
                            </div>
                            <div className='w-[60]'>
                                <input
                                    type="text"
                                    name="inputname"
                                    id="inputname"
                                    className="block w-56 mt-[7px] mb-[4px] rounded-[10px] w-[340px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"
                                    value={subjectname}
                                    onChange={(e) => setSubjectname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='btn-save ml-[44%] mb-[10px] mt-[10px]'>
                            <button onClick={handleSubmit} className="bg-[#1e00ff] w-[200px] h-[40px] text-[white] border-[2px] border-solid border-[black] rounded-10 hover:bg-[#3c6dffd3] bg-[800] hover:text-[#ffffff] transition-colors duration-300">
                                Cập Nhật Sản Phẩm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Subject = () => {
    const [subjectsGroups, setSubjectsGroups] = useState([]);
    const [subject, setSubject] = useState('');
    const [subjectname, setSubjectname] = useState('');
    const navigate = useNavigate();

    const handleSetting = (id) => {
        axios.post("http://localhost:8888/admin/getsubject", { idno: id })
            .then(response => {
                console.log("data", response.data);
                setSubject(response.data);
                setSubjectname(response.data.subjects_Name);
                navigate('/editSubject', { state: { subject: response.data } });
            })
            .catch(error => {
                console.error('There was an error fetching the product by id!', error);
            });
    }


    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.post('http://localhost:8888/admin/subject');
                console.log(response.data);
                setSubjectsGroups(response.data);
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy danh sách môn học", error);
            }
        };


        fetchSubjects();

    }, []);


    const deletesubjects = (stdid) => {

        const fetchSubjects = async () => {
            try {
                const response = await axios.post('http://localhost:8888/admin/subject');
                console.log(response.data);
                setSubjectsGroups(response.data);
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy danh sách môn học", error);
            }
        };

        console.log("print" + stdid);
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
                axios.post('http://localhost:8888/admin/deletesubjects', {
                    subjectsID: stdid,
                }).then(response => {

                    Swal.fire({
                        icon: 'success',
                        title: 'Đã xóa!',
                        text: 'Dữ liệu đã được cập nhật.',
                        confirmButtonText: 'OK'
                    }).then(() => {

                        fetchSubjects();
                    });

                }).catch(error => {
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
                            text: 'Không thể xóa!',
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
    };


    return (
        <>
            <div id='dashboard'>
                <div className='flex'>
                    <LayoutAdmin />
                    <div className='w-[calc(100%-250px)] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        <div id='manageSubject'>
                            <p className=' text-[24px] font-bold'>
                                Quản lí môn học <a href='/addSubject'><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                            </p>

                            <div className='flex w-[99%]'>
                                <div className='bg-[#ffffff] rounded-[5px] w-[100%] h-[100hv]'>
                                    <div className="overflow-x-auto rounded-[5px]">
                                        <table className="min-w-full bg-white border border-gray-300 rounded-[20px]">
                                            <thead>
                                                <tr className='bg-main text-while'>
                                                    <th className="px-4 py-2 border">Id</th>
                                                    <th className="px-4 py-2 border">Subjects</th>

                                                    <th className="px-4 py-2 border">Edit</th>
                                                    <th className="px-4 py-2 border">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subjectsGroups.map((group, index) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-2 border">{group.SubjectsID}</td>
                                                        <td className="px-4 py-2 border">{group.Subjects_Name}</td>

                                                        <td className="px-4 py-2 border">
                                                            <button onClick={() => handleSetting(group.SubjectsID)}>
                                                                <FontAwesomeIcon icon="fa-solid fa-pen" />
                                                            </button>

                                                        </td>
                                                        <td className="px-4 py-2 border">
                                                            <button onClick={() => deletesubjects(group.SubjectsID)} >
                                                                <FontAwesomeIcon icon="fa-solid fa-trash" />
                                                            </button>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Combination = () => {
    const [subject_Combination, setSubject_Combination] = useState([]);
    const [combination, setCombination] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [subjectCombinationCode, setSubjectCombinationCode] = useState([]);
    const [studyTopics, setStudyTopics] = useState([]);
    const navigate = useNavigate();

    const handleSetting = (id) => {
        axios.post("http://localhost:8888/admin/getcombination", { idnol: id })
            .then(response => {
                console.log("data from API:", response.data); // Kiểm tra dữ liệu trả về
                setCombination(response.data);
                setSubjects(response.data.subjects);
                setSubjectCombinationCode(response.data.subject_Combination_Code);
                setStudyTopics(response.data.studyTopics);
                navigate('/editCombination', { state: { combination: response.data } });
            })
            .catch(error => {
                console.error('There was an error fetching the combination by id!', error);
            });
    }

    useEffect(() => {
        axios.post('http://localhost:8888/admin/combination')
            .then(response => {
                console.log(response.data);
                setSubject_Combination(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const deletecombination = (ss) => {

        const fetchSubjects = async () => {
            try {
                const response = await axios.post('http://localhost:8888/admin/combination');
                console.log(response.data);
                setSubject_Combination(response.data);
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy danh sách môn học", error);
            }
        };

        console.log("print" + ss);
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
                axios.post('http://localhost:8888/admin/deletecombination', {
                    subject_CombinationID: ss, // Chú ý đã đổi key thành 'subject_CombinationID'
                }).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đã xóa!',
                        text: 'Dữ liệu đã được cập nhật.',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        fetchSubjects();
                    });
                }).catch(error => {
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
                            text: 'Không thể xóa!',
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
    };


    return (
        <div id='dashboard'>
            <div className='flex'>
                <LayoutAdmin />
                <div className='w-[calc(100%-250px)] h-[100vh] bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                    <div id='manageCombination'>
                        <p className='text-[24px] font-bold'>
                            Quản lí Tổ Hợp <a href='/addSubjectCombination'><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                        </p>
                        <div className='flex w-[99%]'>
                            <div className='bg-[#ffffff] rounded-[5px] w-[100%] h-full mt-[10px]'>
                                <div className="overflow-x-auto rounded-[5px]">
                                    <table className="min-w-full bg-white border border-gray-300 rounded-[20px]">
                                        <thead>
                                            <tr className='bg-main text-while'>
                                                <th className="px-4 py-2 border">Id</th>
                                                <th className="px-4 py-2 border">Subjects</th>
                                                <th className="px-4 py-2 border">Subject Combination Code</th>
                                                <th className="px-4 py-2 border">Study Topics</th>
                                                <th className="px-4 py-2 border">Edit</th>
                                                <th className="px-4 py-2 border">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {subject_Combination.map((group, index) => (

                                                <tr key={index}>
                                                    <td className="px-4 py-2 border">{group.Subject_CombinationID}</td>
                                                    <td className="px-4 py-2 border">{group.Subjects}</td>
                                                    <td className="px-4 py-2 border">{group.Subject_Combination_Code}</td>
                                                    <td className="px-4 py-2 border">{group.Study_Topics}</td>
                                                    <td className="px-4 py-2 border">
                                                        <button onClick={() => handleSetting(group.Subject_CombinationID)}>
                                                            <FontAwesomeIcon icon="fa-solid fa-pen" />
                                                        </button>
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        <button onClick={() => deletecombination(group.Subject_CombinationID)} >
                                                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const EditCombination = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { combination } = location.state || {};
    const combinationData = combination ? (Array.isArray(combination) && combination.length > 0 ? combination[0] : combination) : {};
    const [subjects, setSubjects] = useState(combinationData?.Subjects || '');
    const [subject_Combination_Code, setSubject_Combination_Code] = useState('');
    const [studyTopics, setStudyTopics] = useState('');
    const [subject_CombinationID, setSubject_CombinationID] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (combinationData) {
            setSubjects(combinationData.Subjects);
            setSubject_Combination_Code(combinationData.Subject_Combination_Code);
            setStudyTopics(combinationData.Study_Topics);
            setId(combinationData.Subject_CombinationID);
        }
    }, [combinationData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("thinh");
        axios.post('http://localhost:8888/admin/editcombination', {
            idnol: id,
            subjects: subjects,
            subject_Combination_Code: subject_Combination_Code,
            studyTopics: studyTopics

        })

            .then(response => {
                console.log(response.combinationData);
                Swal.fire('Success', 'Cập nhật sản phẩm thành công!', 'success');
                navigate('/combination');
            }).catch(error => {
                console.error('There was an error fetching the product by id!', error);
            });
    }

    return (
        <div id='editSubject'>
            <div className='flex'>
                <LayoutAdmin />
                <div className='w-[calc(100%-250px)] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                    <p className='text-center text-[24px] font-bold'>Cập Nhật Tổ Hợp</p>
                    <div className='flex ml-[25%] bg-[#ffffff] rounded-[20px] h-[100hv] w-[50%]'>
                        <div className='ml-[10px] w-[40%]'>
                            <p className='ml-[25px] mt-[10px]'>Subjects</p>
                            <p className='ml-[25px] mt-[10px]'>Subject_Combination_Code</p>
                            <p className='ml-[25px] mt-[10px]'>Study_Topics</p>
                        </div>
                        <div className='w-[60]'>
                            <input
                                type="text"
                                name="inputname"
                                id="inputname"
                                className="block w-56 mt-[7px] mb-[4px] rounded-[10px] w-[340px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"
                                value={subjects}
                                onChange={(e) => setSubjects(e.target.value)}
                            />
                            <input
                                type="text"
                                name="inputname"
                                id="inputname"
                                className="block w-56 mt-[7px] mb-[4px] rounded-[10px] w-[340px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"
                                value={subject_Combination_Code}
                                onChange={(e) => setSubject_Combination_Code(e.target.value)}
                            />
                            <input
                                type="text"
                                name="inputname"
                                id="inputname"
                                className="block w-56 mt-[7px] mb-[4px] rounded-[10px] w-[340px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:text-gray-800"
                                value={studyTopics}
                                onChange={(e) => setStudyTopics(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='btn-save ml-[44%] mb-[10px] mt-[10px]'>
                        <button onClick={handleSubmit} className="bg-[#1e00ff] w-[200px] h-[40px] text-[white] border-[2px] border-solid border-[black] rounded-10 hover:bg-[#3c6dffd3] transition-colors duration-300">
                            Cập Nhật Sản Phẩm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


const DashboardAdmin = () => {

    const [totalStudent, setTotalStudent] = useState('');
    const [totalTeacher, setTotalTeacher] = useState('');
    const [sumPrice, setSumPrice] = useState('');
    const [sumRoom, setsumRoom] = useState('');
    const [salary, setSalary] = useState('');

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Bậc Lương',
                data: [],
                backgroundColor: 'rgba(75,192,192,0.6)',
            },
        ],
    });

    useEffect(() => {

        axios.post('http://localhost:8888/admin/count')

            .then(response => {
                console.log(response.data);
                setTotalStudent(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    useEffect(() => {

        axios.post('http://localhost:8888/admin/countTeacher')
            .then(response => {
                console.log(response.data);
                setTotalTeacher(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    useEffect(() => {

        axios.post('http://localhost:8888/admin/sumPrice')

            .then(response => {
                console.log(response.data);
                setSumPrice(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    useEffect(() => {
        axios.post('http://localhost:8888/admin/allsalary')
            .then(response => {
                const data = response.data;
                console.log("API Response:", data);


                if (Array.isArray(data)) {
                    const labels = data.map(item => item.Level_Salary);
                    const values = data.map(item => item.CountOfLevelSalary);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Bậc Lương',
                                data: values,
                                backgroundColor: 'rgba(75,192,192,0.6)',
                            },
                        ],
                    });
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);




    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    useEffect(() => {

        axios.post('http://localhost:8888/admin/sumroom')

            .then(response => {
                console.log(response.data);
                setsumRoom(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data
    };
    const [chartDatatt, setChartDatatt] = useState({
        labels: [],
        datasets: [{
            label: 'Số lượng sinh viên theo bậc',
            data: [],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)', // Có thể thêm màu cho các phần tử khác
            ],
            hoverOffset: 4
        }]
    });

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.post('http://localhost:8888/admin/studenttitle')
            .then(response => {
                const data = response.data;

                // Tạo mảng labels và data từ phản hồi
                const labels = data.map(item => item.Student_Tittle);
                const values = data.map(item => item.Total);

                // Cập nhật dữ liệu cho biểu đồ
                setChartDatatt({
                    labels: labels,
                    datasets: [{
                        label: 'Số lượng sinh viên theo bậc',
                        data: values,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)', // Có thể thêm màu cho các phần tử khác
                        ],
                        hoverOffset: 4
                    }]
                });
            })
            .catch(error => {
                console.error('Có lỗi khi lấy dữ liệu!', error);
            });
    }, []);

    const [salaryLevels, setSalaryLevels] = useState('');

    useEffect(() => {
        axios.post('http://localhost:8888/admin/showsalarylevel')
            .then(response => {
                console.log(response.data);
                setSalaryLevels(response.data);

            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const [studentpoint, setStudentpoint] = useState('');

    useEffect(() => {
        axios.post('http://localhost:8888/admin/showStudentponit')
            .then(response => {
                console.log(response.data);
                // Định dạng lại ngày sinh khi lấy dữ liệu
                const formattedData = response.data.map(student => ({
                    ...student,
                    Birthday: student.Birthday ? new Date(student.Birthday).toLocaleDateString() : ''
                }));
                setStudentpoint(formattedData);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <>
            <div id='dashboardAdmin bg-[#f5f7fd]'>
                <div className='flex'>
                    <LayoutAdmin />
                    <div className='w-[calc(100%-250px)] h-100vh bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        <p className=' text-[18px] font-bold'>Trang Chủ</p>
                        <div className='flex'>
                            <div className='w-[5%]'></div>
                            <div className='w-[20%] rounded-[10px] h-[80px] shadow-xl bg-[#fff]'>
                                <div className='mt-[10px] ml-5%'>
                                    <div className='flex'>
                                        <div className='w-[60px] h-[60px] bg-main  rounded-[10px] '>
                                            <FontAwesomeIcon className='text-[#fff] w-[50%] h-[50%] ml-[14px] mt-[15px]' icon="fa-solid fa-users" />
                                        </div>
                                        <div className='w-[80%]'>
                                            <p className='text-[1rem] text-[#8d9498] ml-[10px] mt-[8px] mb-[0px]' >Học Sinh</p>

                                            <p className=' ml-[10px] font-bold'> {totalStudent} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[5%]'></div>
                            <div className='w-[20%] rounded-[10px] h-[80px] shadow-xl bg-[#fff]'>
                                <div className='mt-[10px] ml-5%'>
                                    <div className='flex'>
                                        <div className='w-[60px] h-[60px] bg-[#48abf7]  rounded-[10px] '>
                                            <FontAwesomeIcon className='text-[#fff] w-[40%] h-[50%] ml-[17px] mt-[15px]' icon="fa-solid fa-user" />     </div>
                                        <div className='w-[80%]'>

                                            <p className='text-[1rem] text-[#8d9498] ml-[10px] mt-[8px] mb-[0px]' >Giáo viên</p>
                                            <p className=' ml-[10px] font-bold'>{totalTeacher}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[5%]'></div>
                            <div className='w-[20%] rounded-[10px] h-[80px] shadow-xl bg-[#fff]'>
                                <div className='mt-[10px] ml-5%'>
                                    <div className='flex'>
                                        <div className='w-[60px] h-[60px] bg-[#31ce36]  rounded-[10px] '>
                                            <FontAwesomeIcon className='text-[#fff] w-[50%] h-[50%] ml-[14px] mt-[15px]' icon="fa-solid fa-hand-holding-dollar" />
                                        </div>
                                        <div className='w-[80%]'>
                                            <p className='text-[1rem] text-[#8d9498] ml-[10px] mt-[8px] mb-[0px]' >Doanh thu</p>
                                            <p className=' ml-[10px] font-bold'>{sumPrice}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[5%]'></div>
                            <div className='w-[20%] rounded-[10px] h-[80px] shadow-xl bg-[#fff]'>
                                <div className='mt-[10px] ml-5%'>
                                    <div className='flex'>
                                        <div className='w-[60px] h-[60px] bg-[#6861ce]  rounded-[10px] '>
                                            <FontAwesomeIcon className='text-[#fff] w-[50%] h-[50%] ml-[14px] mt-[15px]' icon="fa-solid fa-users" />
                                        </div>
                                        <div className='w-[80%]'>
                                            <p className='text-[1rem] text-[#8d9498] ml-[10px] mt-[8px] mb-[0px]' >Số phòng chờ duyệt</p>
                                            <p className=' ml-[10px] font-bold'>{sumRoom}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[5%]'></div>
                        </div>
                        <div id='content'>
                            <div className='flex mt-[2em]'>
                                <div className='w-[70%] rounded-[10px] ml-[61px] shadow-xl bg-[#fff] h-[450px]'>
                                    <p className='ml-[5px] text-[16px] font-bold'>Thống kế bậc lương Giáo Viên</p>
                                    <div className='flex'>
                                        <div className='w-[15%]'></div>
                                        <div className='w-[70%]'>
                                            <div className="w-[100%] h-[400px]">
                                                <Bar data={chartData} />
                                            </div>
                                        </div>
                                        <div className='w-[15%]'>

                                        </div>
                                    </div>
                                </div>
                                <div className='w-[30%]'>
                                    <div className='w-[76%] ml-[20px]  rounded-[10px] bg-[#fff] h-[450px]'>
                                        {/* Đổ dữ liệu lên bảng */}
                                        {salaryLevels.length > 0 ? (
                                            <table className='w-full border-collapse border border-gray-300'>
                                                <thead>
                                                    <tr className='bg-gray-100'>
                                                        <th className='border border-gray-300 p-2'>Tên giáo viên</th>
                                                        <th className='border border-gray-300 p-2'>Bậc lương</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {salaryLevels.map((level, index) => (
                                                        <tr key={index} className='hover:bg-gray-200'>
                                                            <td className='border border-gray-300 p-2'>{level.Name_Teacher}</td>
                                                            <td className='border border-gray-300 p-2'>{level.Level_Salary}</td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>Đang tải dữ liệu...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                
                        <div className="flex mt-[20px]">
                            <div className='w-[25%] rounded-[10px] ml-[100px] shadow-xl bg-[#fff] h-[350px]'>
                                <div>
                                    <Doughnut data={chartDatatt} /> {/* Sử dụng chartDatatt */}
                                    <p></p>
                                </div>
                            </div>
                            <div className='w-[56.3%] rounded-[10px] ml-[20px] shadow-xl bg-[#fff] '>
                                    {/* Đổ dữ liệu lên bảng */}
                                    {studentpoint.length > 0 ? (
                                            <table className='w-full border-collapse border border-gray-300'>
                                                <thead>
                                                    <tr className='bg-gray-100'>
                                                        <th className='border border-gray-300 p-2'>Rollno</th>
                                                        <th className='border border-gray-300 p-2'>Học & Tên </th>
                                                        <th className='border border-gray-300 p-2'>Điểm Trung Bình</th>
                                                        <th className='border border-gray-300 p-2'>Học Luật</th>
                                                        <th className='border border-gray-300 p-2'>Giới Tính</th>
                                                        <th className='border border-gray-300 p-2'>Ngày Sinh</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {studentpoint.map((std, index) => (
                                                        <tr key={index} className='hover:bg-gray-200'>
                                                            <td className='border border-gray-300 p-2'>{std.Rollno}</td>
                                                            <td className='border border-gray-300 p-2'>{std.Student_Name}</td>
                                                            <td className='border border-gray-300 p-2'>{std.Averageofallsubjects}</td>
                                                            <td className='border border-gray-300 p-2'>{std.Student_Tittle}</td>
                                                            <td className='border border-gray-300 p-2'>{std.Gender}</td>
                                                            <td className='border border-gray-300 p-2'>{std.Birthday}</td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>Đang tải dữ liệu...</p>
                                        )}     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export { Managestudent, Addstudent, ManageSubject, AddSubject, AddSubjectCombination, EditSubject, Subject, Combination, EditCombination, DashboardAdmin, Editstudent }
