import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LayoutAdmin, Nav } from "../layout/layoutadmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Education = () => {
    const [listEdu, setListEdu] = useState([]);
    const [eduId, setEduId] = useState('');
    const [spl, setSpl] = useState('');
    const [uniondm, setUniondm] = useState('');
    const [degree, setDegree] = useState('');
    const [mainMajor, setMainMajor] = useState('');
    const [osq, setOsq] = useState('');
    const [techLevel, setTechLevel] = useState('');
    const [eml, setEml] = useState('');
    const [seniority, setSeniority] = useState('');
    const [ptl, setPtl] = useState('');
    const [salaryCofficient, setSalaryCofficient] = useState('');
    const [salaryLevel, setSalaryLevel] = useState('');
    const [salaryDay, setSalaryDay] = useState('');
    const [quota, setQuota] = useState('');
    const [mml, setMml] = useState('');
    const [mfl, setMfl] = useState('');
    const [jia, setJia] = useState('');
    const [sst, setSst] = useState('');
    const [other, setOther] = useState('');
    const [party, setParty] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentEdu = listEdu.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listEdu.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        axios.post('http://localhost:8888/admin/getAllEducation')
            .then(res => {
                console.log(res.data);
                setListEdu(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    }, [])


    const fetchData = () => {
        axios.post('http://localhost:8888/admin/getAllEducation')
            .then(res => {
                console.log(res.data);
                setListEdu(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    }

    const handleShowEdit = (id) => {
        setShowForm(true);
        setEduId(id);
        axios.post('http://localhost:8888/admin/getEducationById', {
            eduId: id
        }).then(res => {
            setSpl(res.data.spl);
            setUniondm(res.data.union);
            setDegree(res.data.degree);
            setMainMajor(res.data.mainMajor);
            setOsq(res.data.osq);
            setTechLevel(res.data.technologyLevel);
            setEml(res.data.eml);
            setSeniority(res.data.seniorityAllowance);
            setPtl(res.data.ptl);
            setSalaryCofficient(res.data.salaryCoefficient);
            setSalaryLevel(res.data.levelSalary);
            setSalaryDay(res.data.salaryDays);
            setQuota(res.data.quota);
            setMml(res.data.mml);
            setMfl(res.data.mfl);
            setJia(res.data.jia);
            setSst(res.data.sst);
            setOther(res.data.otherMajors);
            setParty(res.data.party);
            console.log(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }

    const handleShowCreate = () => {
        setShowCreate(true);
    }

    const handleCreate = () => {
        const data = {
            spl,
            uniondm,
            degree,
            mainMajor,
            osq,
            techLevel,
            eml,
            seniority,
            ptl,
            salaryCofficient,
            salaryLevel,
            salaryDay,
            quota,
            mml,
            mfl,
            jia,
            sst,
            other,
            party
        }
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Thêm trình độ giáo dục mới!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/admin/createEducation', data)
                    .then(res => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Đã thêm mới!',
                            text: 'Dữ liệu đã được cập nhật.',
                            confirmButtonText: 'OK'
                        });
                        fetchData();
                        setShowCreate(false);
                        console.log('Sucess');
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
        })
    }

    const handleSubmit = () => {
        const data = {
            spl,
            uniondm,
            degree,
            mainMajor,
            osq,
            techLevel,
            eml,
            seniority,
            ptl,
            salaryCofficient,
            salaryLevel,
            salaryDay,
            quota,
            mml,
            mfl,
            jia,
            sst,
            other,
            party,
            eduId
        }
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cập nhật!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/admin/updateEducation', data)
                    .then(res => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Đã cập nhật!',
                            text: 'Dữ liệu đã được cập nhật.',
                            confirmButtonText: 'OK'
                        });
                        fetchData();
                        setShowForm(false);
                        console.log('Sucess');
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
                                        <span className='text-[18px] font-medium mr-[10px]'>Quản lý giáo dục</span>
                                        <button onClick={handleShowCreate} className='focus:outline-none active:outline-none' type="button">
                                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" className="text-[24px]" />
                                        </button>
                                    </h2>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Số thứ tự</th>
                                            <th>Tên giáo viên</th>
                                            <th>Chuyên môn</th>
                                            <th>Tốt nghiệp</th>
                                            <th>Chuyên môn khác</th>
                                            <th>Cấp quản lý giáo dục</th>
                                            <th>Lý luận chính trị</th>
                                            <th>Ngoại ngữ</th>
                                            <th>Sửa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentEdu.length > 0 ? (
                                            currentEdu.map((item, index) => (
                                                <tr key={item.Education_Of_TeacherID}>
                                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td>{item.Name_Teacher}</td>
                                                    <td>{item.Main_Major}</td>
                                                    <td>{item.Spl}</td>
                                                    <td>{item.Osq}</td>
                                                    <td>{item.Eml}</td>
                                                    <td>{item.Ptl}</td>
                                                    <td>{item.Mfl}</td>
                                                    <td>
                                                        <button type='button' onClick={() => handleShowEdit(item.Education_Of_TeacherID)}
                                                            className="text-[#000] hover:text-[#3a62ff]  px-2 py-1 rounded focus:outline-none">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
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
                            {showForm && (
                                <div
                                    className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-50 bg-opacity-75 flex justify-center items-center cursor-pointer">
                                    <div className="bg-white w-[1000px] p-6 rounded shadow-lg">
                                        <h2 className="text-xl text-center font-bold mb-4">Sửa trình độ giáo dục</h2>
                                        <form>
                                            <div className="flex">
                                                <div className='w-[50%] flex'>
                                                    <div className='w-[40%] ml-[10px] '>
                                                        <p className="py-2">Tốt nghiệp:</p>
                                                        <p className="py-2">Công đoàn:</p>
                                                        <p className="py-2">Bằng cấp:</p>
                                                        <p className="py-2">Chuyên ngành:</p>
                                                        <p className="py-2">Chuyên môn phụ:</p>
                                                        <p className="py-2">Trình độ học vấn:</p>
                                                        <p className="py-2">Quản lý giáo dục:</p>
                                                        <p className="py-2">Phụ cấp thâm niên:</p>
                                                        <p className="py-2">Lý luận chính trị:</p>
                                                        <p className="py-2">Hệ số lương:</p>
                                                    </div>
                                                    <div className='w-[25%] ml-[5px]'>
                                                        <input type="text" value={spl} onChange={(e) => setSpl(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={uniondm} onChange={(e) => setUniondm(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={mainMajor} onChange={(e) => setMainMajor(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={osq} onChange={(e) => setOsq(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={techLevel} onChange={(e) => setTechLevel(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={eml} onChange={(e) => setEml(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={seniority} onChange={(e) => setSeniority(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={ptl} onChange={(e) => setPtl(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={salaryCofficient} onChange={(e) => setSalaryCofficient(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    </div>
                                                </div>
                                                <div className="w-[50%] flex">
                                                    <div className="w-[40%]">
                                                        <p className="py-2">Bậc lương:</p>
                                                        <p className="py-2">Ngày nhận lương:</p>
                                                        <p className="py-2">Hạn ngạch</p>
                                                        <p className="py-2">Cấp độ:</p>
                                                        <p className="py-2">Ngoại ngữ:</p>
                                                        <p className="py-2">Trợ cấp:</p>
                                                        <p className="py-2">Đào tạo kỹ năng mềm:</p>
                                                        <p className="py-2">Chuyên ngành khác:</p>
                                                        <p className="py-2">Đoàn:</p>
                                                    </div>
                                                    <div className="w-[25%]">
                                                        <input type="text" value={salaryLevel} onChange={(e) => setSalaryLevel(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={salaryDay} onChange={(e) => setSalaryDay(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={quota} onChange={(e) => setQuota(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={mml} onChange={(e) => setMml(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={mfl} onChange={(e) => setMfl(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={jia} onChange={(e) => setJia(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={sst} onChange={(e) => setSst(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={other} onChange={(e) => setOther(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={party} onChange={(e) => setParty(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-4 mt-5%">
                                                <button
                                                    onClick={handleSubmit}
                                                    className="bg-main w-[100%] rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                                                    type="button"
                                                >
                                                    Cập nhật
                                                </button>
                                                <button
                                                    onClick={() => setShowForm(false)}
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
                                        <h2 className="text-xl text-center font-bold mb-4">Thêm trình độ giáo dục</h2>
                                        <form>
                                            <div className="flex">
                                                <div className='w-[50%] flex'>
                                                    <div className='w-[40%] ml-[10px] '>
                                                        <p className="py-2">Tốt nghiệp:</p>
                                                        <p className="py-2">Công đoàn:</p>
                                                        <p className="py-2">Bằng cấp:</p>
                                                        <p className="py-2">Chuyên ngành:</p>
                                                        <p className="py-2">Chuyên môn phụ:</p>
                                                        <p className="py-2">Trình độ học vấn:</p>
                                                        <p className="py-2">Quản lý giáo dục:</p>
                                                        <p className="py-2">Phụ cấp thâm niên:</p>
                                                        <p className="py-2">Lý luận chính trị:</p>
                                                        <p className="py-2">Hệ số lương:</p>
                                                    </div>
                                                    <div className='w-[25%] ml-[5px]'>
                                                        <input type="text" value={spl} onChange={(e) => setSpl(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={uniondm} onChange={(e) => setUniondm(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={mainMajor} onChange={(e) => setMainMajor(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={osq} onChange={(e) => setOsq(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={techLevel} onChange={(e) => setTechLevel(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={eml} onChange={(e) => setEml(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={seniority} onChange={(e) => setSeniority(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={ptl} onChange={(e) => setPtl(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={salaryCofficient} onChange={(e) => setSalaryCofficient(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    </div>
                                                </div>
                                                <div className="w-[50%] flex">
                                                    <div className="w-[40%]">
                                                        <p className="py-2">Bậc lương:</p>
                                                        <p className="py-2">Ngày nhận lương:</p>
                                                        <p className="py-2">Hạn ngạch</p>
                                                        <p className="py-2">Cấp độ:</p>
                                                        <p className="py-2">Ngoại ngữ:</p>
                                                        <p className="py-2">Trợ cấp:</p>
                                                        <p className="py-2">Đào tạo kỹ năng mềm:</p>
                                                        <p className="py-2">Chuyên ngành khác:</p>
                                                        <p className="py-2">Đoàn:</p>
                                                    </div>
                                                    <div className="w-[25%]">
                                                        <input type="text" value={salaryLevel} onChange={(e) => setSalaryLevel(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={salaryDay} onChange={(e) => setSalaryDay(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={quota} onChange={(e) => setQuota(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={mml} onChange={(e) => setMml(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={mfl} onChange={(e) => setMfl(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={jia} onChange={(e) => setJia(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={sst} onChange={(e) => setSst(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={other} onChange={(e) => setOther(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                        <input type="text" value={party} onChange={(e) => setParty(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-4 mt-5%">
                                                <button
                                                    onClick={handleCreate}
                                                    className="bg-main w-[100%] rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                                                    type="button"
                                                >
                                                    Cập nhật
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

export { Education }