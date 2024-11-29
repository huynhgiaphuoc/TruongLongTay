import React, { useState, useEffect } from "react";
import { LayoutAdmin, Nav } from "../layout/layoutadmin";
import Swal from 'sweetalert2';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useNavigate, Link } from 'react-router-dom';

const CreateResult = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [birthday, setBirthday] = useState();
    const [registration, setRegistration] = useState();
    const [gender, setGender] = useState();
    const [phone, setPhone] = useState();
    const [markMath, setMarkMath] = useState();
    const [markLit, setMarkLit] = useState();
    const [markEng, setMarkEng] = useState();
    const [status, setStatus] = useState();
    const [result, setResult] = useState('');
    const [resultid, setResultid] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const dataresult = {
            name,
            birthday,
            reg: registration,
            gender,
            phone,
            math: markMath,
            lit: markLit,
            eng: markEng,
            status,
            resultId: resultid
        };
        await axios.post('http://localhost:8888/admin/createResult', dataresult
        );
        setName('');
        setBirthday('');
        setRegistration('');
        setGender('');
        setPhone('');
        setMarkMath('');
        setMarkLit('');
        setMarkEng('');
        setStatus('');
        Swal.fire({
            title: 'Success',
            text: 'Thêm thông báo trúng tuyển thành công',
            icon: 'success',
            timer: 2000,

            showConfirmButton: false
        }).then(() => {
            fetchData();
            navigate('/result');
        });
    }

    const validate = () => {
        if (!name) {
            Swal.fire('Validation Error', 'Tên học sinh không được để trống', 'error');
            return false;
        }
        if (!birthday) {
            Swal.fire('Validation Error', 'Ngày sinh không được để trống', 'error');
            return false;
        }
        if (!registration) {
            Swal.fire('Validation Error', 'Mã học sinh không được để trống', 'error');
            return false;
        }
        if (!gender) {
            Swal.fire('Validation Error', 'Giới tính học sinh không được để trống', 'error');
            return false;
        }
        if (!phone) {
            Swal.fire('Validation Error', 'Số điện thoại không được để trống', 'error');
            return false;
        }
        if (!markMath) {
            Swal.fire('Validation Error', 'Điểm toán không được để trống', 'error');
            return false;
        }
        if (!markLit) {
            Swal.fire('Validation Error', 'Điểm ngữ văn không được để trống', 'error');
            return false;
        }
        if (!markEng) {
            Swal.fire('Validation Error', 'Điểm tiếng anh không được để trống', 'error');
            return false;
        }
        if (!status) {
            Swal.fire('Validation Error', 'Trạng thái trúng tuyển không được để trống', 'error');
            return false;
        }
        return true;
    };

    useEffect(() => {
        axios.post('http://localhost:8888/admin/showResult')
            .then(response => {
                const dt = response.data;
                const list = dt.map(item => ({
                    id: item.ResultExamId,
                    name: item.StudentName,
                    birthday: item.Birthday,
                    reg: item.Registration,
                    gender: item.Gender,
                    phone: item.Phone,
                    math: item.MarkMath,
                    lit: item.MarkLit,
                    eng: item.MarkEng,
                    status: item.Status
                }))
                setResult(list);
            })
            .catch(error => console.error(error));
    }, []);

    const fetchData = () => {
        axios.post('http://localhost:8888/admin/showResult')
            .then(response => {
                const dt = response.data;
                const list = dt.map(item => ({
                    id: item.ResultExamId,
                    name: item.StudentName,
                    birthday: item.Birthday,
                    reg: item.Registration,
                    gender: item.Gender,
                    phone: item.Phone,
                    math: item.MarkMath,
                    lit: item.MarkLit,
                    eng: item.MarkEng,
                    status: item.Status
                }))
                setResult(list);
            })
            .catch(error => console.error(error));
    }

    const handleBackTo = () =>{
        navigate('/result');
    }

    return (
        <div id='dashboard'>
            <div className="flex h-[100vh] overflow-hidden">
                <LayoutAdmin />
                <div className="w-[calc(100%-256px)] pl-[20px] rounded-[5px] bg-[#edf2f9] h-[100%]">
                    <div className="w-100% h-[60px] pb-[15px]">
                        <Nav />
                    </div>
                    <h2 className="text-xl font-bold mb-4 pt-2">Thêm kết quả xét tuyển</h2>
                    <div className=' className="text-xl font-bold mb-4 pt-2"'>
                        <div className="flex justify-center py-2">
                            <form>
                                <div className="flex">
                                    <div className="mr-2.5%">
                                        <div className="mb-6">
                                            <label className="block text-[#000] font-medium mb-2" htmlFor="file">
                                                Tên học sinh:
                                            </label>
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                id="titleImage"
                                                type="text"
                                                placeholder="Nhập tên học sinh"
                                                className="w-[550px]  shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-[#000] font-medium mb-2" htmlFor="file">
                                                Mã học sinh:
                                            </label>
                                            <input
                                                value={registration}
                                                onChange={(e) => setRegistration(e.target.value)}
                                                id="titleImage"
                                                type="text"
                                                placeholder="Nhập mã học sinh"
                                                className="w-[550px]  shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-[#000] font-medium mb-2" htmlFor="file">
                                                Ngày sinh:
                                            </label>
                                            <input
                                                value={birthday}
                                                onChange={(e) => setBirthday(e.target.value)}
                                                id="titleImage"
                                                type="date"
                                                placeholder="Nhập ngày sinh"
                                                className="w-[550px]  shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-[#000] font-medium mb-2" htmlFor="gender">
                                                Giới tính:
                                            </label>
                                            <select
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                id="gender"
                                                className="w-[550px] shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                                            >
                                                <option value="">Chọn giới tính</option>
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-6">
                                            <label className="block text-[#000] font-medium mb-2" htmlFor="file">
                                                Số điện thoại học sinh:
                                            </label>
                                            <input
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                id="titleImage"
                                                type="text"
                                                placeholder="Nhập số điện thoại"
                                                className="w-[550px]  shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-[#000] font-medium mb-2" htmlFor="file">
                                                Điểm toán:
                                            </label>
                                            <input
                                                value={markMath}
                                                onChange={(e) => setMarkMath(e.target.value)}
                                                id="titleImage"
                                                type="number"
                                                placeholder="Nhập điểm toán"
                                                className="w-[550px]  shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-[#000] font-medium mb-2" htmlFor="file">
                                                Điểm ngữ văn:
                                            </label>
                                            <input
                                                value={markLit}
                                                onChange={(e) => setMarkLit(e.target.value)}
                                                id="titleImage"
                                                type="number"
                                                placeholder="Nhập điểm ngữ văn"
                                                className="w-[550px]  shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-[#000] font-medium mb-2" htmlFor="file">
                                                Điểm tiếng anh:
                                            </label>
                                            <input
                                                value={markEng}
                                                onChange={(e) => setMarkEng(e.target.value)}
                                                id="titleImage"
                                                type="number"
                                                placeholder="Nhập điểm tiếng anh"
                                                className="w-[550px]  shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-[#000] font-medium mb-2" htmlFor="status">
                                        Trạng thái:
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        id="status"
                                        name="status"
                                        className="w-[550px] shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                                    >
                                        <option value="">Chọn trạng thái</option>
                                        <option value="Đã trúng tuyển">Đã trúng tuyển</option>
                                        <option value="Chưa trúng tuyển">Chưa trúng tuyển</option>
                                    </select>
                                </div>

                                <div className="flex justify-center mt-2.5%">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className='mt-2.5% bg-[#007bff] focus:outline-none text-while w-[100%] py-1 rounded-[5px] mr-2.5%'>
                                        Thêm kết quả xét tuyển
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleBackTo}
                                        className='mt-2.5% bg-[rgb(230,0,18)] focus:outline-none text-while w-[100%] py-1 rounded-[5px] ml-2.5%'>
                                        Thoát
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div >

    )

}


const ResultExam = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [birthday, setBirthday] = useState();
    const [registration, setRegistration] = useState();
    const [gender, setGender] = useState();
    const [phone, setPhone] = useState();
    const [markMath, setMarkMath] = useState();
    const [markLit, setMarkLit] = useState();
    const [markEng, setMarkEng] = useState();
    const [status, setStatus] = useState();
    const [result, setResult] = useState('');
    const [resultid, setResultid] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = result.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(result.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        axios.post('http://localhost:8888/admin/showResult')
            .then(response => {
                const dt = response.data;
                const list = dt.map(item => ({
                    id: item.ResultExamId,
                    name: item.StudentName,
                    birthday: item.Birthday,
                    reg: item.Registration,
                    gender: item.Gender,
                    phone: item.Phone,
                    math: item.MarkMath,
                    lit: item.MarkLit,
                    eng: item.MarkEng,
                    status: item.Status
                }))
                setResult(list);
            })
            .catch(error => console.error(error));
    }, []);


    const fetchData = () => {
        axios.post('http://localhost:8888/admin/showResult')
            .then(response => {
                const dt = response.data;
                const list = dt.map(item => ({
                    id: item.ResultExamId,
                    name: item.StudentName,
                    birthday: item.Birthday,
                    reg: item.Registration,
                    gender: item.Gender,
                    phone: item.Phone,
                    math: item.MarkMath,
                    lit: item.MarkLit,
                    eng: item.MarkEng,
                    status: item.Status
                }))
                setResult(list);
            })
            .catch(error => console.error(error));
    }

    const handleChanngePage = () => {
        navigate('/createresult');
    }

    const handleChanngePageedit = (id) => {
        setResultid(id);
        axios.post('http://localhost:8888/admin/getResultById', { resultId: id })
            .then(res => {
                console.log(res.data);
                setName(res.data.studentName);
                setBirthday(formatDate(res.data.birthday));
                setRegistration(res.data.registration);
                setGender(res.data.gender);
                setPhone(res.data.phone);
                setMarkMath(res.data.markMath);
                setMarkLit(res.data.markLit);
                setMarkEng(res.data.markEng);
                setStatus(res.data.status);
            }).catch(error => {
                if (error.response && error.response.status === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi!',
                        text: 'Không thể sửa!',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi!',
                        text: 'Không thể sửa thông báo!',
                        confirmButtonText: 'OK'
                    });
                }
            });
        setShowForm(true);
    }

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleClose = () => {
        setName('');
        setBirthday('');
        setRegistration('');
        setGender('');
        setPhone('');
        setMarkMath('');
        setMarkLit('');
        setMarkEng('');
        setStatus('');
        setShowForm(false);
    };

    const deleteResult = (reId) => {
        console.log("print" + reId)
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
                axios.post('http://localhost:8888/admin/deleteResult', {
                    ResultExamId: reId,
                }).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đã xóa!',
                        text: 'Dữ liệu đã được cập nhật.',
                        confirmButtonText: 'OK'
                    });
                    fetchData();
                    setCurrentPage(1);
                }).catch(error => {
                    if (error.response && error.response.status === 409) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!',
                            text: 'Không thể xóa!',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!',
                            text: 'Không thể xóa thông báo!',
                            confirmButtonText: 'OK'
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: 'Đã hủy',
                    text: 'Bạn đã hủy việc xóa thông báo trúng tuyển!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        })
    }

    const validate = () => {
        if (!name) {
            Swal.fire('Validation Error', 'Tên học sinh không được để trống', 'error');
            return false;
        }
        if (!birthday) {
            Swal.fire('Validation Error', 'Ngày sinh không được để trống', 'error');
            return false;
        }
        if (!registration) {
            Swal.fire('Validation Error', 'Mã học sinh không được để trống', 'error');
            return false;
        }
        if (!gender) {
            Swal.fire('Validation Error', 'Giới tính học sinh không được để trống', 'error');
            return false;
        }
        if (!phone) {
            Swal.fire('Validation Error', 'Số điện thoại không được để trống', 'error');
            return false;
        }
        if (!markMath) {
            Swal.fire('Validation Error', 'Điểm toán không được để trống', 'error');
            return false;
        }
        if (!markLit) {
            Swal.fire('Validation Error', 'Điểm ngữ văn không được để trống', 'error');
            return false;
        }
        if (!markEng) {
            Swal.fire('Validation Error', 'Điểm tiếng anh không được để trống', 'error');
            return false;
        }
        if (!status) {
            Swal.fire('Validation Error', 'Trạng thái trúng tuyển không được để trống', 'error');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const dataresult = {
            name,
            birthday,
            reg: registration,
            gender,
            phone,
            math: markMath,
            lit: markLit,
            eng: markEng,
            status,
            resultId: resultid
        };
        await axios.post('http://localhost:8888/admin/editResult', dataresult
        );
        setName('');
        setBirthday('');
        setRegistration('');
        setGender('');
        setPhone('');
        setMarkMath('');
        setMarkLit('');
        setMarkEng('');
        setStatus('');
        Swal.fire({
            title: 'Success',
            text: 'Sửa thông báo trúng tuyển thành công',
            icon: 'success',
            timer: 2000,

            showConfirmButton: false
        }).then(() => {
            navigate('/result');
        });
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
                                        <span className='text-[18px] font-medium mr-[10px]'>Quản lý thông báo trúng tuyển</span>
                                        <button onClick={handleChanngePage} className='focus:outline-none active:outline-none' type="button">
                                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" className="text-[24px]" />
                                        </button>
                                    </h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <div className='w-100 h-[fit-content] border-solid border-[1px] border-[#777] rounded-10 mb-[1%]'>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr className="border-[#7fc5f8]">
                                                    <th>Thứ tự thông báo</th>
                                                    <th>Tên học sinh</th>
                                                    <th>Mã học sinh</th>
                                                    <th>Ngày sinh</th>
                                                    <th>Giới tính</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Điểm toán</th>
                                                    <th>Điểm Văn</th>
                                                    <th>Điểm Anh</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentProducts.length > 0 ? (
                                                    currentProducts.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.reg}</td>
                                                            <td>{item.birthday}</td>
                                                            <td>{item.gender}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.math}</td>
                                                            <td>{item.lit}</td>
                                                            <td>{item.eng}</td>
                                                            <td>{item.status}</td>
                                                            <td>
                                                                <button type='button' onClick={() => handleChanngePageedit(item.id)} className="text-[#000] hover:text-[#3a62ff]  px-2 py-1 rounded">
                                                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button type='button' onClick={() => deleteResult(item.id)} className="text-[#000] hover:text-[#dd3232]  px-2 py-1 rounded">
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
                                        {showForm && (
                                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-[rgba(0,0,0,.5)]" onClick={handleClose}>
                                                <div className="bg-white rounded-lg shadow-lg p-8 w-[600px] relative" onClick={(e) => e.stopPropagation()}>
                                                    <h2 className="text-2xl font-bold mb-6 text-center">Sửa thông báo</h2>
                                                    <form>
                                                        <div className="flex">
                                                            <div className="mr-5%">
                                                                <div className="mb-4">
                                                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                                                        Tên học sinh:
                                                                    </label>
                                                                    <input
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                        id="name"
                                                                        type="text"
                                                                        placeholder="Nhập tên học sinh"
                                                                        className="w-[200px] border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="registration">
                                                                        Mã học sinh:
                                                                    </label>
                                                                    <input
                                                                        value={registration}
                                                                        onChange={(e) => setRegistration(e.target.value)}
                                                                        id="registration"
                                                                        type="text"
                                                                        placeholder="Nhập mã học sinh"
                                                                        className="w-[200px] border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="birthday">
                                                                        Ngày sinh:
                                                                    </label>
                                                                    <input
                                                                        value={birthday}
                                                                        onChange={(e) => setBirthday(e.target.value)}
                                                                        id="birthday"
                                                                        type="date"
                                                                        className="w-[200px] border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="gender">
                                                                        Giới tính:
                                                                    </label>
                                                                    <select
                                                                        value={gender}
                                                                        onChange={(e) => setGender(e.target.value)}
                                                                        id="gender"
                                                                        className="w-[200px] border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    >
                                                                        <option value="">Chọn giới tính</option>
                                                                        <option value="Nam">Nam</option>
                                                                        <option value="Nữ">Nữ</option>
                                                                    </select>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="status">
                                                                        Trạng thái:
                                                                    </label>
                                                                    <select
                                                                        value={status}
                                                                        onChange={(e) => setStatus(e.target.value)}
                                                                        id="status"
                                                                        className="w-[200px] border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    >
                                                                        <option value="">Chọn trạng thái</option>
                                                                        <option value="Đã trúng tuyển">Đã trúng tuyển</option>
                                                                        <option value="Chưa trúng tuyển">Chưa trúng tuyển</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="mb-4">
                                                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                                                                        Số điện thoại học sinh:
                                                                    </label>
                                                                    <input
                                                                        value={phone}
                                                                        onChange={(e) => setPhone(e.target.value)}
                                                                        id="phone"
                                                                        type="text"
                                                                        placeholder="Nhập số điện thoại"
                                                                        className="w-[200px] border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="markMath">
                                                                        Điểm toán:
                                                                    </label>
                                                                    <input
                                                                        value={markMath}
                                                                        onChange={(e) => setMarkMath(e.target.value)}
                                                                        id="markMath"
                                                                        type="text"
                                                                        placeholder="Nhập điểm toán"
                                                                        className="w-[200px] border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="markLit">
                                                                        Điểm ngữ văn:
                                                                    </label>
                                                                    <input
                                                                        value={markLit}
                                                                        onChange={(e) => setMarkLit(e.target.value)}
                                                                        id="markLit"
                                                                        type="text"
                                                                        placeholder="Nhập điểm ngữ văn"
                                                                        className="w-[200px] border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="markEng">
                                                                        Điểm tiếng anh:
                                                                    </label>
                                                                    <input
                                                                        value={markEng}
                                                                        onChange={(e) => setMarkEng(e.target.value)}
                                                                        id="markEng"
                                                                        type="number"
                                                                        placeholder="Nhập điểm tiếng anh"
                                                                        className="w-[200px] border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between space-x-4">
                                                            <button
                                                                className="bg-main w-100% rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                type="button"
                                                                onClick={handleSubmit}
                                                            >
                                                                Cập nhật
                                                            </button>
                                                            <button
                                                                className="bg-[rgb(230,0,18)] w-100% rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                                type="button"
                                                                onClick={handleClose}
                                                            >
                                                                Thoát
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}


                                        <div className="flex justify-center mt-6 m-[20px_0] p-[0]">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ResultExam, CreateResult }