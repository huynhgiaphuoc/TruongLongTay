import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutAdmin, Nav } from "../layout/layoutadmin";
import axios from "axios";

const Operation = () => {
    const [listOperation, setListOperation] = useState([]);
    const [selectedClass, setSelectedClass] = useState(0);
    const [listClass, setListClass] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    const [classId, setClassId] = useState('');
    const [cListSubject, setCListSubject] = useState([]);
    const [cListTeacher, setCListTeacher] = useState('');
    const [cSelectClass, setCSelectClass] = useState([]);
    const [cSelectSubject, setCSelectSubject] = useState([]);


    useEffect(() => {
        axios.post('http://localhost:8888/admin/getclass')
            .then(res => {
                setListClass(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
        axios.post('http://localhost:8888/admin/getAllOpe',)
            .then(res => {
                setListOperation(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    }, [])

    const handleChooseClass = (classId) => {
        setSelectedClass(classId);
        if (classId == 0) {
            axios.post('http://localhost:8888/admin/getAllOpe',)
                .then(res => {
                    setListOperation(res.data);
                    console.log(res.data);
                }).catch(err => {
                    console.log('Error fetch data: ' + err);
                })
        } else {
            axios.post('http://localhost:8888/admin/getAllOperation', {
                classId: classId
            }).then(res => {
                setListOperation(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
        }

    }

    const handleShowCreate = () => {
        setShowCreate(true);
        axios.post('http://localhost:8888/admin/getclass')
            .then(res => {
                setCSelectClass(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })

        axios.post('http://localhost:8888/admin/getAllTeacherSubject')
            .then(res => {
                setCListSubject(res.data);
                console.log(res.data);
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
                                        <span className='text-[18px] font-medium mr-[10px]'>Giáo viên bộ môn</span>
                                        <button onClick={handleShowCreate} className='focus:outline-none active:outline-none' type="button">
                                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" className="text-[24px]" />
                                        </button>
                                    </h2>
                                    <select value={selectedClass} onChange={(e) => handleChooseClass(e.target.value)} className="active:outline-none focus:outline-none px-2 py-1 rounded-[5px] border-[1px] border-solid border-[#dfdfdf]">
                                        <option value='0'>Chọn lớp</option>
                                        {listClass.map(item => (
                                            <option key={item.ClassID} value={item.ClassID}>{item.Class_Name}</option>
                                        ))}
                                    </select>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Số thứ tự</th>
                                            <th>Lớp</th>
                                            <th>Môn</th>
                                            <th>Tên giáo viên</th>
                                            <th>Sửa</th>
                                            <th>Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listOperation.length > 0 ? (
                                            listOperation.map((item, index) => (
                                                <tr key={item.OperationID}>
                                                    <th>{index + 1}</th>
                                                    {/* <td>{(currentPage - 1) * itemsPerPage + index + 1}</td> */}
                                                    <td>{item.Class_Name}</td>
                                                    <td>{item.Subjects_Name}</td>
                                                    <td>{item.Name_Teacher}</td>
                                                    <td>
                                                        <button type='button'
                                                            className="text-[#000] hover:text-[#3a62ff]  px-2 py-1 rounded focus:outline-none">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button type='button'
                                                            className="text-[#000] hover:text-[#dd3232]  px-2 py-1 rounded">
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
                                    {/* {pageNumbers.map(number => (
                                        <button
                                            key={number}
                                            onClick={() => setCurrentPage(number)}
                                            className={` ${number === currentPage ? 'bg-[#000000] text-[#fff] rounded-50 font-bold w-[40px] h-[40px] p-[5px]' : 'bg-[#eee] text-[#374151] rounded-50 m-[0_5px] w-[40px] h-[40px] p-[10px] '} hover:bg-[#89bde7] hover:text-[#000]`}
                                        >
                                            {number}
                                        </button>
                                    ))} */}
                                </div>
                            </div>
                            {/* {showForm && (
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
                            )} */}
                            {showCreate && (
                                <div className="fixed inset-0 bg-[rgba(0,0,0,.5)] flex justify-center items-center z-50">
                                    <div className="bg-white w-[900px] p-6 rounded-lg shadow-lg w-1/3">
                                        <h2 className="text-lg font-bold mb-4">Quản lý bộ môn</h2>
                                        <form>
                                            <div className="flex">
                                                <div className='w-[40%] flex'>
                                                    <div className='w-[30%] ml-[10px] '>
                                                        <p className="py-2">Chọn lớp:</p>
                                                    </div>
                                                    <div className='w-[25%] ml-[5px]'>
                                                        <select className="active:outline-none focus:outline-none px-2 py-1 rounded-[5px] border-[1px] border-solid border-[#dfdfdf]">
                                                            <option value="0">Chọn lớp</option>
                                                            {cSelectClass.map(item => (
                                                                <option key={item.ClassID} value={item.ClassID}>{item.Class_Name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-[30%] flex">
                                                    <div className="w-[40%]">
                                                        <p className="py-2">Môn học:</p>

                                                    </div>
                                                    <div className="w-[25%]">
                                                        <select className="active:outline-none focus:outline-none px-2 py-1 rounded-[5px] border-[1px] border-solid border-[#dfdfdf]">
                                                            <option value="0">Chọn môn:</option>
                                                            {cListSubject.map(item =>(
                                                                <option key={item.Teacher_SubjectID} value={item.Teacher_SubjectID}>{item.Subjects_Name} - {item.Name_Teacher}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-4 mt-5%">
                                                <button

                                                    className="bg-main w-[100%] rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                                                    type="button"
                                                >
                                                    Thêm
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

export { Operation }