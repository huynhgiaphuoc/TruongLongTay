import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutAdmin, Nav } from "../layout/layoutadmin";
import Swal from "sweetalert2";
import axios from "axios";

const MainTeacher = () => {
    const [listClass, setListClass] = useState('');
    const [chooseYear, setChooseYear] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedYear, setSelectedYear] = useState([]);
    const [teachered, setTeachered] = useState([]);
    const [classed, setClassed] = useState([]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState([]);
    const [eYear, setEYear] = useState([]);
    const [eClass, setEClass] = useState([]);
    const [eTeacher, setETeacher] = useState([]);
    const [allClass, setAllClass] = useState([]);
    const [mainId, setMainId] = useState('');
    const itemsPerPage = 8;
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = listClass.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listClass.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        axios.post('http://localhost:8888/admin/getAllMainTeacher')
            .then(res => {
                setListClass(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    }, [])

    const fetchData = () => {
        axios.post('http://localhost:8888/admin/getAllMainTeacher')
            .then(res => {
                setListClass(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    }

    const handleChooseYear = (year) => {
        setChooseYear(year);
        const yearteaching = year;
        if (year == '0') {
            axios.post('http://localhost:8888/admin/getAllMainTeacher')
                .then(res => {
                    setListClass(res.data);
                    console.log(res.data);
                }).catch(err => {
                    console.log('Error fetch data: ' + err);
                })
        } else {
            axios.post('http://localhost:8888/admin/getMainTeacherByYear', {
                year: yearteaching
            }).then(res => {
                setListClass(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
        }
    }

    const handleSelectYear = (year) => {
        setSelectedYear(year);
        axios.post('http://localhost:8888/admin/getTeacherAndClassWithout', {
            year: year
        }).then(res => {
            const { teacherWithoutClass, classWithoutTeacher } = res.data;
            setTeachered(teacherWithoutClass || []);
            setClassed(classWithoutTeacher || []);
            console.log(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }

    const handleShowEdit = (id) => {
        setShowEdit(true);
        setMainId(id);
        axios.post('http://localhost:8888/admin/getMainTeacher', {
            mainId: id
        }).then(res => {
            const data = res.data;
            setEYear(data[0].yearteaching); 
            setEClass(data[0].ClassID);
            setETeacher(data[0].TeacherID);
            console.log(res.data);

            axios.post('http://localhost:8888/admin/getclass')
            .then(res =>{
                setAllClass(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })

            axios.post('http://localhost:8888/admin/getTeacherAndClassWithout', {
                year: data[0].yearteaching
            }).then(res => {
                const { teacherWithoutClass, classWithoutTeacher } = res.data;
                setTeachered(teacherWithoutClass || []);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }

    const handleEdit = () =>{
        if (!validate()) {
            return;
        }

        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sửa giáo viên chủ nhiệm!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/admin/updateMainTeacher',{
                    mainId: mainId,
                    teacherId: eTeacher
                }).then(res =>{
                    console.log('Success');
                    Swal.fire({
                        title: 'Success',
                        text: 'Sửa giáo viên chủ nhiệm thành công',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: true
                    })
                    fetchData();
                    setChooseYear('0');
                    setMainId([]);
                    setEClass([]);
                    setEYear([]);
                    setShowEdit(false);
                }).catch(err =>{
                    console.log('Fail');
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Không thể cập nhật!',
                    text: 'Dữ liệu chưa được cập nhật!',
                    confirmButtonText: 'OK'
                });
            }
        }).catch(err =>{
            if (err.response && err.response.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Không thể cập nhật!',
                    text: 'Dữ liệu chưa được cập nhật!',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Không thể cập nhật!',
                    text: 'Dữ liệu chưa được cập nhật!',
                    confirmButtonText: 'OK'
                });
            }
        })
    }

    const validate = () => {
        if (!selectedYear) {
            Swal.fire('Validation Error', 'Năm học không được để trống', 'error');
            return false;
        }
        if (!teachered || teachered == '0') {
            Swal.fire('Validation Error', 'Giáo không được để trống', 'error');
            return false;
        }
        if (!classed || classed == '0') {
            Swal.fire('Validation Error', 'Lớp học không được để trống', 'error');
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validate()) {
            return;
        }

        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Thêm giáo viên chủ nhiệm!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/admin/createMainTeacher', {
                    year: selectedYear,
                    teacherId: selectedTeacher,
                    classId: selectedClass
                }).then(res => {
                    console.log('Success');
                    Swal.fire({
                        title: 'Success',
                        text: 'Thêm giáo viên chủ nhiệm thành công',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: true
                    })
                    fetchData();
                    setChooseYear('0');
                    setSelectedClass([]);
                    setSelectedTeacher([]);
                    setSelectedYear([]);
                    setShowCreate(false);
                }).catch(err => {
                    if (err.response && err.response.status === 409) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Không thể cập nhật!',
                            text: 'Dữ liệu chưa được cập nhật!',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Không thể cập nhật!',
                            text: 'Dữ liệu chưa được cập nhật!',
                            confirmButtonText: 'OK'
                        });
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Không thể cập nhật!',
                    text: 'Dữ liệu chưa được cập nhật!',
                    confirmButtonText: 'OK'
                });
            }
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })

    }

    const handDelete = (id) =>{
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa giáo viên chủ nhiệm!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/admin/deleteMainTeacher', {
                    mainId: id
                }).then(res => {
                    console.log('Success');
                    Swal.fire({
                        title: 'Success',
                        text: 'Xóa giáo viên chủ nhiệm thành công',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: true
                    })
                    fetchData();
                    setChooseYear('0');
                }).catch(err => {
                    if (err.response && err.response.status === 409) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Không thể cập nhật!',
                            text: 'Dữ liệu chưa được cập nhật!',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Không thể cập nhật!',
                            text: 'Dữ liệu chưa được cập nhật!',
                            confirmButtonText: 'OK'
                        });
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Không thể cập nhật!',
                    text: 'Dữ liệu chưa được cập nhật!',
                    confirmButtonText: 'OK'
                });
            }
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }

    return (
        <div>
            <div className="flex h-[100vh] overflow-hidden">
                <LayoutAdmin />
                <div className="w-[calc(100%-256px)] pl-[20px] rounded-[5px] bg-[#edf2f9] h-[100%]">
                    <div className="w-100% h-[60px] pb-[15px]">
                        <Nav />
                    </div>
                    <div className='flex'>
                        <div className='w-[100%] mr-[50px] h-100 rounded-[5px] bg-while pt-2 pl-3 pr-3'>
                            <div>
                                <div className='flex justify-between mt-[10px] mb-2.5%'>
                                    <h2 className="flex items-center">
                                        <span className='text-[18px] font-medium mr-[10px]'>Giáo viên chủ nhiệm</span>
                                        <button onClick={() => setShowCreate(true)} className='focus:outline-none active:outline-none' type="button">
                                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" className="text-[24px]" />
                                        </button>
                                    </h2>
                                    <select value={chooseYear} onChange={(e) => handleChooseYear(e.target.value)} className="active:outline-none focus:outline-none px-2 py-1 rounded-[5px] border-[1px] border-solid border-[#dfdfdf]">
                                        <option value='0'>Chọn năm học</option>
                                        <option value='2019-2020'>2019 - 2020</option>
                                        <option value='2020-2021'>2020 - 2021</option>
                                        <option value='2021-2022'>2021 - 2022</option>
                                        <option value='2022-2023'>2022 - 2023</option>
                                        <option value='2023-2024'>2023 - 2024</option>
                                        <option value='2024-2025'>2024 - 2025</option>
                                        <option value='2025-2026'>2025 - 2026</option>
                                        <option value='2026-2027'>2026 - 2027</option>
                                        <option value='2027-2028'>2027 - 2028</option>
                                        <option value='2028-2029'>2028 - 2029</option>
                                    </select>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Số thứ tự</th>
                                            <th>Năm học</th>
                                            <th>Tên giáo viên</th>
                                            <th>Lớp</th>
                                            <th>Sửa</th>
                                            <th>Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProducts.length > 0 ? (
                                            currentProducts.map((item, index) => (
                                                <tr key={item.MainTeacherID}>
                                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td>{item.yearteaching}</td>
                                                    <td>{item.Name_Teacher}</td>
                                                    <td>{item.Class_Name}</td>
                                                    <td>
                                                        <button type='button'
                                                            onClick={() => handleShowEdit(item.MainTeacherID)}
                                                            className="text-[#000] hover:text-[#3a62ff]  px-2 py-1 rounded focus:outline-none">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button type='button'
                                                        onClick={() =>{handDelete(item.MainTeacherID)}}
                                                            className="text-[#000] hover:text-[#3a62ff]  px-2 py-1 rounded focus:outline-none">
                                                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td>Dữ liệu không có sẵn.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="flex justify-center mt-6 m-[20px_0] p-[10px_0]">
                                    {pageNumbers.map(number => (
                                        <button
                                            key={number}
                                            onClick={() => setCurrentPage(number)}
                                            className={` ${number === currentPage ? 'bg-[#000000] text-[#fff] rounded-50 font-bold w-[40px] h-[40px] p-[5px]' : 'bg-[#eee] text-[#374151] rounded-50 m-[0_5px] w-[40px] h-[40px] p-[10px] '} hover:bg-[#89bde7] hover:text-[#000]`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {showEdit && (
                                <div
                                    className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-50 bg-opacity-75 flex justify-center items-center cursor-pointer">
                                    <div className="bg-white w-[1000px] p-6 rounded shadow-lg">
                                        <h2 className="text-xl text-center font-bold mb-4">Sửa giáo viên chủ nhiệm</h2>
                                        <form>
                                            <div className="flex">
                                                <div className='w-[60%] flex'>
                                                    <div className='w-[25%] ml-[10px] '>
                                                        <p className="py-1">Năm học:</p>
                                                    </div>
                                                    <div className='w-[20%] ml-[5px]'>
                                                        <select value={eYear} className="active:outline-none focus:outline-none px-2 py-1 rounded-[5px] border-[1px] border-solid border-[#dfdfdf]">
                                                            <option value='0'>Chọn năm học</option>
                                                            <option value='2019-2020'>2019 - 2020</option>
                                                            <option value='2020-2021'>2020 - 2021</option>
                                                            <option value='2021-2022'>2021 - 2022</option>
                                                            <option value='2022-2023'>2022 - 2023</option>
                                                            <option value='2023-2024'>2023 - 2024</option>
                                                            <option value='2024-2025'>2024 - 2025</option>
                                                            <option value='2025-2026'>2025 - 2026</option>
                                                            <option value='2026-2027'>2026 - 2027</option>
                                                            <option value='2027-2028'>2027 - 2028</option>
                                                            <option value='2028-2029'>2028 - 2029</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-[50%] flex">
                                                    <div className="w-[25%]">
                                                        <p className="py-1">Lớp:</p>
                                                    </div>
                                                    <div className="w-[20%]">
                                                        <select value={eClass} className="active:outline-none focus:outline-none px-2 py-1 rounded-[5px] border-[1px] border-solid border-[#dfdfdf]">
                                                            <option value='0'>Chọn lớp</option>
                                                            {allClass.map(item => (
                                                                <option key={item.ClassID} value={item.ClassID}>{item.Class_Name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-[50%] flex">
                                                    <div className="w-[25%]">
                                                        <p className="py-1">Giáo viên:</p>
                                                    </div>
                                                    <div className="w-[25%]">
                                                        <select value={eTeacher} onChange={(e) => setETeacher(e.target.value)} className="active:outline-none focus:outline-none px-2 py-1 rounded-[5px] border-[1px] border-solid border-[#dfdfdf]">
                                                            <option value='0'>Chọn giáo viên</option>
                                                            {teachered.map(item => (
                                                                <option key={item.TeacherID} value={item.TeacherID}>{item.Name_Teacher}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-4 mt-5%">
                                                <button
                                                    onClick={handleEdit}
                                                    className="bg-main w-[100%] rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                                                    type="button"
                                                >
                                                    Sửa giáo viên chủ nhiệm
                                                </button>
                                                <button
                                                    onClick={() => setShowEdit(false)}
                                                    className="bg-[rgb(230,0,18)] w-[100%] rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
                                                    type="button"
                                                >
                                                    Thoát
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                            {showCreate && (
                                <div
                                    className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-50 bg-opacity-75 flex justify-center items-center cursor-pointer">
                                    <div className="bg-white w-[1000px] p-6 rounded shadow-lg">
                                        <h2 className="text-xl text-center font-bold mb-4">Thêm giáo viên chủ nhiệm</h2>
                                        <form>
                                            <div className="flex">
                                                <div className='w-[60%] flex'>
                                                    <div className='w-[25%] ml-[10px] '>
                                                        <p className="py-1">Năm học:</p>
                                                    </div>
                                                    <div className='w-[20%] ml-[5px]'>
                                                        <select value={selectedYear} onChange={(e) => handleSelectYear(e.target.value)} className="active:outline-none focus:outline-none px-2 py-1 rounded-[5px] border-[1px] border-solid border-[#dfdfdf]">
                                                            <option value='0'>Chọn năm học</option>
                                                            <option value='2019-2020'>2019 - 2020</option>
                                                            <option value='2020-2021'>2020 - 2021</option>
                                                            <option value='2021-2022'>2021 - 2022</option>
                                                            <option value='2022-2023'>2022 - 2023</option>
                                                            <option value='2023-2024'>2023 - 2024</option>
                                                            <option value='2024-2025'>2024 - 2025</option>
                                                            <option value='2025-2026'>2025 - 2026</option>
                                                            <option value='2026-2027'>2026 - 2027</option>
                                                            <option value='2027-2028'>2027 - 2028</option>
                                                            <option value='2028-2029'>2028 - 2029</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-[50%] flex">
                                                    <div className="w-[25%]">
                                                        <p className="py-1">Lớp:</p>
                                                    </div>
                                                    <div className="w-[20%]">
                                                        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="active:outline-none focus:outline-none px-2 py-1 rounded-[5px] border-[1px] border-solid border-[#dfdfdf]">
                                                            <option value='0'>Chọn lớp</option>
                                                            {classed.map(item => (
                                                                <option key={item.ClassID} value={item.ClassID}>{item.Class_Name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-[50%] flex">
                                                    <div className="w-[25%]">
                                                        <p className="py-1">Giáo viên:</p>
                                                    </div>
                                                    <div className="w-[25%]">
                                                        <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)} className="active:outline-none focus:outline-none px-2 py-1 rounded-[5px] border-[1px] border-solid border-[#dfdfdf]">
                                                            <option value='0'>Chọn giáo viên</option>
                                                            {teachered.map(item => (
                                                                <option key={item.TeacherID} value={item.TeacherID}>{item.Name_Teacher}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-4 mt-5%">
                                                <button
                                                    onClick={handleCreate}
                                                    className="bg-main w-[100%] rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                                                    type="button"
                                                >
                                                    Thêm giáo viên chủ nhiệm
                                                </button>
                                                <button
                                                    onClick={() => setShowCreate(false)}
                                                    className="bg-[rgb(230,0,18)] w-[100%] rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
                                                    type="button"
                                                >
                                                    Thoát
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { MainTeacher }