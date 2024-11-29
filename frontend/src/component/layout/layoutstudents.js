import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import axios from 'axios';
class Stu extends React.Component {
  handleLogout = async () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    console.log("userId", token);
    Swal.fire({
        title: 'Bạn có muốn đăng xuất khỏi tài khoản?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đăng xuất!',
        cancelButtonText: 'Hủy bỏ'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await axios.post('http://localhost:8888/account/logoutstudent', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                sessionStorage.clear();
                
                window.location.href = '/';
            } catch (error) {
                console.error("Đăng xuất thất bại", error);
            }
        } else {
            Swal.fire({
                title: 'Đã hủy',
                text: 'Bạn đã hủy việc đăng xuất!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}
  render() {
    return (
      <div className='Stu'>
        <div className='logo mr-50px'>
          <div className="mt-10 h-[100%] w-[100%] flex flex-col gap-8 bg-main">
            <div className="flex items-center gap-2">
              <img className="w-[50px] h-[50px] rounded-50 inline-block ml-[55px] mt-[25px]" src="/assets/images/apps/LOGOTRUONG.png" />
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-house-user" className="text-white text-[20px]" />
              <a href='' className='text-white'>Trang Chủ</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-check-to-slot" className="text-white text-[20px]" />
              <a href='' className='text-white'>Kiểm Tra</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-calendar-week" className="text-white text-[20px]" />
              <a href='' className='text-white'>Thời Khóa Biểu</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-brands fa-product-hunt" className="text-white text-[20px]" />
              <a href='' className='text-white'>Điểm</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-list" className="text-white text-[20px]" />
              <a href='' className='text-white'>DS Lớp Phụ Đạo</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-toolbox" className="text-white text-[20px]" />
              <a href='' className='text-white'>Sửa Thông Tin</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-bag-shopping" className="text-white text-[20px]" />
              <a href='' className='text-white'>Đồng Phục</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-comments-dollar" className="text-white text-[20px]" />
              <a href='/addfb' className='text-white'>Phản Hồi</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-comments-dollar" className="text-white text-[20px]" />
              <a href='/feedback' className='text-white'>Xem Phản Hồi</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-object-ungroup" className="text-white text-[20px]" />
              <a href='' className='text-white' >Chọn Tổ hợp</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-paper-plane " className="text-white text-[20px]" />
              <a href='' className='text-white'>Gửi Đơn</a>
            </div>
            <div className="flex items-center gap-2 ml-[15px] transform hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className="text-white text-[20px]" />
              <p onClick={this.handleLogout} className='text-white'>Đăng Xuất</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Stun extends React.Component {
  render() {
    return (
      <div className="p-4">
        <div className="p-4 bg-gradient-to-r from-pink-200 to-orange-100">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Trang chủ</h1>
            <div className="w-1/2">
              <button className="bg-pink-500 text-white py-2 px-4 rounded-r-full hover:bg-pink-600 focus:outline-none">
                <FontAwesomeIcon className='w-[25px] h-[25px]' icon="fa-solid fa-cart-plus" />
              </button>
              <input
                type="text"
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Search..."
              />
              <button className="bg-pink-500 text-white py-2 px-4 rounded-r-full hover:bg-pink-600 focus:outline-none">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row text-black justify-between items-center gap-6 p-10">
          <div className="bg-purple-500 text-black rounded-lg p-6 shadow-md flex items-center justify-between w-full md:w-auto">
            <div>
              <div className="text-4xl font-bold">Thông Báo </div>
              <div className="text-2xl mt-2">Từ Biáo Viên</div>
            </div>
            <div>
              <div className="text-lg font-bold"><FontAwesomeIcon className='w-[50px] h-[50px]' icon="fa-solid fa-bell" /></div>
            </div>
          </div>
          <div className="bg-pink-500 text-black rounded-lg p-6 shadow-md flex items-center justify-between w-full md:w-auto">
            <div>
              <div className="text-4xl font-bold">Thông Tin</div>
              <div className="text-2xl mt-2">Cá Nhân</div>
            </div>
            <div>
              <div className="text-lg font-bold"><FontAwesomeIcon className='w-[50px] h-[50px]' icon="fa-solid fa-address-card" /></div>
            </div>
          </div>
          <div className="bg-yellow-500 text-black rounded-lg p-6 shadow-md flex items-center justify-between w-full md:w-auto">
            <div>
              <div className="text-4xl font-bold">Lịch Học</div>
              <div className="text-2xl mt-2">phụ đạo</div>
            </div>
            <div>
              <div className="text-lg font-bold"><FontAwesomeIcon className='w-[50px] h-[50px]' icon="fa-solid fa-calendar-days" /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Stunn extends React.Component {
  render() {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Tài Chính</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gradient-to-r from-pink-200 to-orange-100 text-left">
                <th className="py-2 px-4 text-sm font-semibold">Tên học sinh</th>
                <th className="py-2 px-4 text-sm font-semibold">Học Phí</th>
                <th className="py-2 px-4 text-sm font-semibold">BHYT</th>
                <th className="py-2 px-4 text-sm font-semibold">BHTN</th>
                <th className="py-2 px-4 text-sm font-semibold">Phí Khác</th>
              </tr>
            </thead>

          </table>
        </div>
      </div>
    );
  }
}
class Tabbar extends React.Component {
  render() {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-pink-300 to-orange-200">
        <div className="p-4 bg-white shadow-md rounded-lg w-[500px]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Kết quả học tập</h2>
            <div>
              <select className="border border-gray-300 p-2 rounded-md">
                <option>(2024-2025) HK1</option>
                <option>(2023-2024) HK2</option>
                <option>(2023-2024) HK1</option>
              </select>
            </div>
          </div>
          <hr className="my-4" />
          <p className="text-center">Chưa có dữ liệu hiển thị</p>
        </div>
      </div>

    );
  };

}

class Acc extends React.Component {
  render() {
    return (
      <div>
        <div className="mt-3 flex items-center space-x-4">
          <img src="/assets/images/apps/LOGOTRUONG.png" alt="Logo" className="w-[50px] h-[50px] h-16 w-16" />
          <span className="text-xl font-medium text-while">Mã Anh Thắng</span>
        </div>
        <div className="h-screen bg-gradient-to-r from-pink-300 to-purple-200 p-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">Tiết học tiếp theo</h3>
            <p className="text-gray-700">Môn học: Toán</p>
            <p className="text-gray-700">Thời gian: 8:00 AM - 9:30 AM</p>
            <p className="text-gray-700">Phòng: 302</p>
          </div>
        </div>
      </div>
    );
  }
}


export { Stu, Stun, Stunn, Tabbar, Acc }