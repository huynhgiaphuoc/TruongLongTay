import React, { useState, useEffect } from 'react';
import { SideBar, Navigator } from '../layout/layoutteacher';
import Swal from 'sweetalert2';
import axios from 'axios';
import { LayoutAdmin, Nav } from '../layout/layoutadmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useNavigate, Link } from 'react-router-dom';


//CREATE TestExam
const FormTest = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState();
    const [test, setTest] = useState();
    const [file, setFile] = useState(null);
    const [part, setPart] = useState({});
    const [imagePreview, setImagePreview] = useState(null);


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setFile({ file: file, fileName: file.name, type: 'image' });
        }
    }

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'tmz6fhxc');
        const resourceType = 'image';
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dlj9sdjb6/${resourceType}/upload`, formData);
            console.log('Upload thành công: ' + response.data);
            return response.data.secure_url;
        } catch (error) {
            console.log('Upload thất bại: ' + error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const resultUrl = await handleUpload(file.file);
        const datatest = {
            path: resultUrl,
            title,
        };

        await axios.post('http://localhost:8888/admin/test/createtest', datatest);
        setPart(null);
        setTitle('');
        Swal.fire({
            title: 'Success',
            text: 'Thêm hình ảnh thành công',
            icon: 'success',
            timer: 2000,

            showConfirmButton: false
        }).then(() => {
            window.location.href = '/testExam';
        });
    }


    const validate = () => {
        if (!part) {
            Swal.fire('Validation Error', 'Hình ảnh đề thi không được để trống', 'error');
            return false;
        }
        if (!title) {
            Swal.fire('Validation Error', 'Tên hình ảnh đề thi không được để trống', 'error');
            return false;
        }
        return true;
    };

    useEffect(() => {
        axios.post('http://localhost:8888/admin/test')
            .then(response => {
                const dt = response.data;
                const list = dt.map(item => ({
                    id: item.examTestID,
                    path: item.examTestPath,
                    title: item.Title,
                    image: item.examTestImage
                }))
                setTest(list);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="flex h-[100vh] overflow-hidden">
            <LayoutAdmin />
            <div className="w-[calc(100%-256px)] pl-[20px] bg-[#edf2f9] h-[100%]">
                <div className="w-100% h-[60px] pb-[15px]">
                    <Nav />
                </div>
                <h2 className="text-xl font-bold mb-4 pt-2"><a className='mr-[10px]' href='/testExam'><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></a>Thêm ảnh đề thi mới</h2>
                <div className=''>
                    <div className="flex justify-center py-6">
                        <form className="">
                            <div className="mb-6">
                                <div className="mb-4">
                                    <label className="image-label">
                                        {imagePreview ? (
                                            <img className="image-preview w-[550px] h-[220px] rounded-[5px]" src={imagePreview} alt="Preview" />
                                        ) : (
                                            <img className="image-preview w-[550px] h-[220px] rounded-[5px]" src={part} alt="Preview" />
                                        )}
                                    </label>
                                    <input
                                        onChange={handleImageChange}
                                        type="file"
                                        id="chooseimage"
                                        name="image"
                                        className="block w-[100%] px-3 py-2 text-sm text-[#d8d8d8] border border-[#d0d0d0] rounded-lg cursor-pointer bg-[#ffffff] shadow-sm focus:outline-none focus:ring-2 focus:ring-nameSchool focus:border-[#344fa5] hover:bg-[#ebeaea]"
                                        accept="image/*"
                                    />
                                </div>
                            </div>

                            <div className="mb-6"></div>

                            <div className="mb-6">
                                <label className="block text-[#000] font-medium mb-2" htmlFor="titleImage">
                                    Tiêu đề
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    id="titleImage"
                                    type="text"
                                    placeholder="Nhập tiêu đề"
                                    className="w-[100%] shadow-sm appearance-none border border-[#7f7a7a] rounded-lg py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                                />
                            </div>

                            <div className="flex mt-5%">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="mt-2.5 bg-[#007bff] hover:bg-[#0056b3] text-white w-[100%] py-2 rounded-[5px]"
                                >
                                    Thêm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

const TestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState();
    const [part, setPart] = useState({});
    const [testid, setTestid] = useState('');
    const [file, setFile] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = test.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(test.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    useEffect(() => {
        axios.post('http://localhost:8888/admin/test')
            .then(response => {
                console.log("dfhdf", response.data)
                const dt = response.data;
                const list = dt.map(item => ({
                    id: item.examTestID,
                    path: item.examTestPath,
                    title: item.Title,
                    image: item.examTestImage
                }))
                setTest(list);
            })
            .catch(error => console.error(error));
    }, []);

    const fetchData = () => {
        axios.post('http://localhost:8888/admin/test')
            .then(response => {
                const dt = response.data;
                console.log("hfdfesfdsj", dt)
                const list = dt.map(item => ({
                    id: item.examTestID,
                    path: item.examTestPath,
                    title: item.Title,
                    image: item.examTestImage
                }))
                setTest(list);
            })
            .catch(error => console.error(error));
    }

    const handleChanngePage = () => {
        navigate('/createtest');
    }

    const handleClose = () => {
        setTitle('');
        setImagePreview(false);
        setImage(null);
        setShowForm(false);
    };

    const deleteTestExam = (sId) => {
        console.log("print" + sId)
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
                axios.post('http://localhost:8888/admin/test/delete', {
                    examTestID: sId,
                }).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đã xóa!',
                        text: 'Dữ liệu đã được cập nhật.',
                        confirmButtonText: 'OK'
                    });
                    fetchData();
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
                            text: 'Không thể xóa hình ảnh kỳ thi!',
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
    const handleChanngePageedit = (id) => {
        setTestid(id);
        axios.post('http://localhost:8888/admin/test/edittest', { testId: id })
            .then(res => {
                console.log(res.data);
                setImage(res.data.slideImage);
                setPart(res.data.examTestPath);
                setTitle(res.data.title);
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
                        text: 'Không thể sửa hình ảnh kỳ thi!',
                        confirmButtonText: 'OK'
                    });
                }
            });
        setShowForm(true);
    }

    const validate = () => {
        if (!title) {
            Swal.fire('Validation Error', 'Tên hình ảnh không được để trống', 'error');
            return false;
        }

        return true;
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setFile({ file: file, fileName: file.name, type: 'image' });
        }
    }

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'tmz6fhxc');
        const resourceType = 'image';
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dlj9sdjb6/${resourceType}/upload`, formData);
            console.log('Upload thành công: ' + response.data);
            return response.data.secure_url;
        } catch (error) {
            console.log('Upload thất bại: ' + error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(image);
        if (!validate()) {
            return;
        }
        let datasile;

        if (file && file.file) {
            const resultUrl = await handleUpload(file.file);
            datasile = {
                path: resultUrl,
                title,
                testId: testid
            };
        } else {
            datasile = {
                path: part,
                title,
                testId: testid
            };
        }

        console.log("TestExamId: " + testid);

        await axios.post('http://localhost:8888/admin/test/edit', datasile)
            .then(() => {
                setImage(null);
                setTitle('');
                Swal.fire({
                    title: 'Success',
                    text: 'Sửa hình ảnh thành công',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                setShowForm(false);
                fetchData();
            });
    }

    return (
        <div className="flex h-[100vh] overflow-hidden">
            <LayoutAdmin />
            <div className="w-[calc(100%-256px)] pl-[20px] bg-[#edf2f9] h-[100%]">
                <div className="w-100% h-[60px] pb-[15px]">
                    <Nav />
                </div>
                <div className='flex'>
                    <div className='w-[100%] mr-[50px] rounded-[5px] h-100 bg-[#fff] pt-2 pl-3 pr-3'>
                        <div class="">
                            <div className='mt-[10px] mb-2.5%'>
                                <h2 className="flex items-center">
                                    <span className='text-[18px] font-medium mr-[10px]'>Quản lý đề thi tham khảo</span>
                                    <button className='active:outline-none' type="button" onClick={handleChanngePage}>
                                        <FontAwesomeIcon icon="fa-solid fa-circle-plus" className="ml-2 text-[24px]" />
                                    </button>
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <div className='w-100 h-[fit-content] border-solid border-[1px] border-[#777] rounded-10 mb-[1%]'>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr className="border-[#7fc5f8]">
                                                <th>Số thứ tự</th>
                                                <th>Hình Ảnh </th>
                                                <th>Tên hình ảnh</th>
                                                <th>Sửa</th>
                                                <th>Xóa</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentProducts.length > 0 ? (
                                                currentProducts.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td className="">
                                                            <img className='w-[250px] h-[125px]' src={item.path} />
                                                        </td>
                                                        <td>{item.title}</td>
                                                        <td>
                                                            <button type='button' onClick={() => handleChanngePageedit(item.id)} className="text-[#000] hover:text-[#3a62ff]  px-2 py-1 rounded focus:outline-none active:outline-none">
                                                                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button type='button' onClick={() => deleteTestExam(item.id)} className="text-[#000] hover:text-[#dd3232]  px-2 py-1 rounded focus:outline-none active:outline-none">
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
                                    {showForm && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                            <div className="custom-slide-modal bg-white rounded-lg shadow-lg p-6 w-[600px]">
                                                <h2 className="modal-title text-xl font-semibold mb-4">Sửa Hình Ảnh</h2>
                                                <form className="exam-form">
                                                    <div className="form-group mb-4">
                                                        <label className="image-label">
                                                            {imagePreview ? (
                                                                <img className="image-preview w-[550px] h-[220px] rounded-[5px]" src={imagePreview} alt="Preview" />
                                                            ) : (
                                                                <img className="image-preview w-[550px] h-[220px] rounded-[5px]" src={part} alt="Preview" />
                                                            )}
                                                        </label>
                                                        <label className="form-label">Chọn Hình Ảnh</label>
                                                        <input
                                                            onChange={handleImageChange}
                                                            type="file"
                                                            id="chooseimage"
                                                            name="image"
                                                            className="block w-[100%] px-3 py-2 text-sm text-[#d8d8d8] border border-[#d0d0d0] rounded-lg cursor-pointer bg-[#ffffff] shadow-sm focus:outline-none focus:ring-2 focus:ring-nameSchool focus:border-[#344fa5] hover:bg-[#ebeaea]"
                                                            accept="image/*"
                                                        />
                                                    </div>

                                                    <div className="form-group mb-4">
                                                        <label className="form-label" htmlFor="titleImage">
                                                            Tiêu đề
                                                        </label>
                                                        <textarea
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            id="titleImage"
                                                            name="title"
                                                            placeholder="Nhập tiêu đề hình ảnh"
                                                            className="custom-textarea block w-[100%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#3b3ebf] mb-2"
                                                            rows="3"
                                                        ></textarea>
                                                    </div>

                                                    <div className="submit-button-container flex justify-between space-x-4">
                                                        <button
                                                            className="custom-submit-button w-[100%] rounded-[5px] bg-[#3b3ebf] text-white px-4 py-2 rounded-lg hover:bg-[#303892] focus:outline-none focus:ring-2 focus:ring-[#47459b]"
                                                            type="button"
                                                            onClick={handleSubmit}
                                                        >
                                                            Cập nhật
                                                        </button>
                                                        <button
                                                            className="custom-submit-button-close w-[100%] rounded-[5px] bg-[#ff3e3e] text-white px-4 py-2 rounded-lg hover:bg-[#7e2b2b] focus:outline-none focus:ring-2 focus:ring-[#b13e3e]"
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}









export { TestDetail, FormTest }



