import React, { useState, useEffect } from 'react';
import { SideBar, Navigator } from '../layout/layoutteacher';
import Swal from 'sweetalert2';
import axios from 'axios';
import { LayoutAdmin, Nav } from '../layout/layoutadmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useNavigate, Link } from 'react-router-dom';


//CREATE SLIDER
const FormSlide = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [slide, setSlide] = useState();
  const [showSkeleton, setShowSkeleton] = useState(true);
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
    const datasile = {
      path: resultUrl,
      title,
      description,
    };



    await axios.post('http://localhost:8888/admin/slider/createslide', datasile
    );
    setPart(null);
    setTitle('');
    setDescription('');
    Swal.fire({
      title: 'Success',
      text: 'Thêm hình ảnh thành công',
      icon: 'success',
      timer: 2000,

      showConfirmButton: false
    }).then(() => {
      window.location.href = '/slide';
    });
  }


  const validate = () => {
    if (!part) {
      Swal.fire('Validation Error', 'Hình ảnh không được để trống', 'error');
      return false;
    }
    if (!title) {
      Swal.fire('Validation Error', 'Tên hình ảnh không được để trống', 'error');
      return false;
    }
    if (!description) {
      Swal.fire('Validation Error', 'Mô tả hình ảnh không được để trống', 'error');
      return false;
    }
    return true;
  };

  useEffect(() => {
    axios.post('http://localhost:8888/admin/slider')
      .then(response => {
        const dt = response.data;
        const list = dt.map(item => ({
          id: item.SlideID,
          path: item.SlidePath,
          title: item.Title,
          image: item.slideImage,
          decs: item.Desc
        }))
        setSlide(list);
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
        <h2 className='text-xl font-bold mb-4 pt-2'><a className='mr-[10px]' href='/slide'><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></a>Thêm hình ảnh mới</h2>
        <div className='flex justify-center'>
          <div class="">
            <form class="slide-form">
              <div className="mb-6 ">
                <div className="form-group mb-4">
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
                    className="block w-[550px] px-3 py-2 text-sm text-[#d8d8d8] border border-[#d0d0d0] rounded-10 cursor-pointer bg-[#ffffff] shadow-sm focus:outline-none focus:ring-2 focus:ring-nameSchool focus:border-[#344fa5] hover:bg-[#ebeaea]"
                    accept='image/*'
                  />
                </div>
              </div>

              <div className="mb-6">

              </div>

              <div className="mb-6">
                <label className="block text-[#000] font-medium mb-2" htmlFor="file">
                  Tiêu đề
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="titleImage"
                  type="text"
                  placeholder="Nhập tiêu đề"
                  className="w-[550px]  shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                />
              </div>

              <div className="mb-[10px] mt-[10px]">
                <label className="block text-[#000] font-medium mb-2" htmlFor="file">
                  Mô tả
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  placeholder="Nhập mô tả hình ảnh"
                  className="w-[550px]  shadow-sm appearance-none border border-[#7f7a7a] rounded-10 w-full py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]"
                  rows="4"
                />
              </div>

              <div className="flex mt-5%">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className='mt-2.5% bg-[#007bff] hover:bg-hover text-while w-[550px] py-1 rounded-[5px] focus:outline-none'>
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

const SlideDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slide, setSlide] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [part, setPart] = useState({});
  const [sliid, setSliid] = useState('');
  const [file, setFile] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    axios.post('http://localhost:8888/admin/slider')
      .then(response => {
        console.log("dfhdf", response.data)
        const dt = response.data;
        const list = dt.map(item => ({
          id: item.SlideID,
          path: item.SlidePath,
          title: item.Title,
          image: item.slideImage,
          decs: item.Descript
        }))
        setSlide(list);
      })
      .catch(error => console.error(error));
  }, []);

  const fetchData = () => {
    axios.post('http://localhost:8888/admin/slider')
      .then(response => {
        const dt = response.data;
        console.log("hfdfesfdsj", dt)
        const list = dt.map(item => ({
          id: item.SlideID,
          path: item.SlidePath,
          title: item.Title,
          image: item.slideImage,
          decs: item.Descript
        }))
        setSlide(list);
      })
      .catch(error => console.error(error));
  }

  const handleChanngePage = () => {
    navigate('/createslide');
  }

  const handleClose = () => {

    setTitle('');
    setDescription('');
    setImage(null);
    setShowForm(false);
  };

  const deleteSlide = (sId) => {
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
        axios.post('http://localhost:8888/admin/slider/delete', {
          slideID: sId,
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
              text: 'Không thể xóa hình ảnh!',
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
    setSliid(id);
    axios.post('http://localhost:8888/admin/slider/editslide', { slideId: id })
      .then(res => {
        console.log(res.data);
        setDescription(res.data.descript);
        setImage(res.data.slideImage);
        setPart(res.data.slidePath);
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
            text: 'Không thể sửa Slide!',
            confirmButtonText: 'OK'
          });
        }
      });
    setShowForm(true);
  }

  const validate = () => {
    if (!part) {
      Swal.fire('Validation Error', 'Hình ảnh không được để trống', 'error');
      return false;
    }
    if (!title) {
      Swal.fire('Validation Error', 'Tên hình ảnh không được để trống', 'error');
      return false;
    }
    if (!description) {
      Swal.fire('Validation Error', 'Mô tả hình ảnh không được để trống', 'error');
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
    if (!validate()) {
      return;
    }
    let datasile;

    if (file && file.file) {
      const resultUrl = await handleUpload(file.file);
      datasile = {
        path: resultUrl,
        title,
        description,
        slideId: sliid
      };
    } else {
      datasile = {
        path: part,
        title,
        description,
        slideId: sliid
      }
    }

    console.log("SliderId: " + sliid);


    await axios.post('http://localhost:8888/admin/slider/edit', datasile
    );
    setImage(null);
    setTitle('');
    setDescription('');
    Swal.fire({
      title: 'Success',
      text: 'Sửa hình ảnh thành công',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
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
          <div className='w-[100%] rounded-[5px] mr-[50px] h-100 bg-[#fff] pt-2 pl-3 pr-3'>
            <div class="">
              <div className='mt-[10px] mb-2.5%'>
                <h2 className="flex items-center">
                  <span className='text-[18px] font-medium mr-[10px]'>Quản lý hình ảnh</span>
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
                        <th>Hình ảnh</th>
                        <th>Tên hình ảnh</th>
                        <th>Mô tả</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slide.length > 0 ? (
                        slide.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td className="h-[100px] w-[200px]">
                              <img src={item.path} />
                            </td>
                            <td>{item.title}</td>
                            <td>{item.decs}</td>
                            <td>
                              <button type='button' onClick={() => handleChanngePageedit(item.id)} className="text-[#000] hover:text-[#3a62ff]  px-2 py-1 rounded focus:outline-none">
                                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                              </button>
                            </td>
                            <td>
                              <button type='button' onClick={() => deleteSlide(item.id)} className="text-[#000] hover:text-[#dd3232]  px-2 py-1 rounded focus:outline-none">
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-[rgba(0,0,0,.5)]">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Sửa Hình Ảnh</h2>
                        <form className="space-y-6">
                          {/* Phần hình ảnh xem trước */}
                          <div className="form-group mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
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
                              className="block w-100% px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 hover:bg-gray-50"
                              accept="image/*"
                            />
                          </div>


                          <div className="form-group mb-4">
                            <label htmlFor="titleImage" className="block text-sm font-medium text-gray-700 mb-1">
                              Tiêu đề
                            </label>
                            <textarea
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              id="titleImage"
                              name="title"
                              placeholder="Nhập tiêu đề hình ảnh"
                              className="block w-100% px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                              rows="3"
                            ></textarea>
                          </div>


                          <div className="form-group mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                              Mô tả
                            </label>
                            <textarea
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              id="description"
                              name="description"
                              placeholder="Nhập mô tả hình ảnh"
                              className="block w-100% px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                              rows="3"
                            ></textarea>
                          </div>

                          <div className="flex justify-between space-x-4">
                            <button
                              className="bg-main text-white w-100% px-4 py-2 rounded-[5px] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                              type="button"
                              onClick={handleSubmit}
                            >
                              Cập nhật
                            </button>
                            <button
                              className="bg-[rgb(230,0,18)] w-100% text-white px-4 py-2 rounded-[5px] hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
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

export { SlideDetail, FormSlide }












