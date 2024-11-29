import React, { useEffect, useState } from 'react';
import { SideBar, Navigator } from '../layout/layoutteacher';
import SkeletonPage from './sleketon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const teacherId = sessionStorage.getItem('userId');
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [totalSession, setTotalSession] = useState('');
  const [totalStudent, setTotalStudent] = useState('');
  const [totalRoom, setTotalRoom] = useState('');
  const [nameRankChart, setNameRankChart] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [className, setClassName] = useState('');
  const [top, setTop] = useState([]);
  const navigate = useNavigate();
  const [totalRecord, setTotalRecord] = useState(0);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Số lượng học sinh',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }]
  });

  const skeletonTimeout = setTimeout(() => {
    setShowSkeleton(false);
  }, 1000);

  useEffect(() => {
    axios.post('http://localhost:8888/teachers/totalsession', {
      teacherId
    }).then(response => {
      setTotalSession(response.data);
    }).catch(error => {
      console.log('Error fetch data: ' + error);
    })
  }, [teacherId])

  useEffect(() => {
    axios.post('http://localhost:8888/teachers/totalstudent', {
      teacherId
    }).then(response => {
      setTotalStudent(response.data);
    }).catch(error => {
      console.log('Error fetch data: ' + error);
    })
  }, [teacherId])

  useEffect(() =>{
    axios.post('http://localhost:8888/teachers/totalroom',{
      teacherId
    }).then(response =>{
      setTotalRoom(response.data);
    }).catch(error =>{
      console.log('Error fetch data: ' + error);
    })
  },[teacherId])

  useEffect(() => {
    axios.post('http://localhost:8888/teachers/rankChart', {
      teacherId
    }).then(response => {
      const data = response.data;

      const labels = data.map(item => item.Classification);
      const values = data.map(item => item.Count);

      const colors = values.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
      const borderColors = values.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`);

      setChartData({
        labels: labels,
        datasets: [{
          label: 'Số lượng học sinh',
          data: values,
          backgroundColor: colors,
          borderColor: borderColors,
          borderWidth: 1,
        }]
      });
    }).catch(error => {
      console.log('Error fetch data: ' + error);
    })
  }, [teacherId])

  useEffect(() => {
    axios.post('http://localhost:8888/teachers/namerankChart', {
      teacherId
    }).then(response => {
      const receivedClassId = response.data.classID.classID;
      axios.post('http://localhost:8888/teachers/getClassRankChart', {
        classId: receivedClassId
      }).then(response => {
        const classData = response.data[0];
        const cln = classData.Class_Name;
        setClassName(cln);
      }).catch(error => {
        console.log("Error fetch data: " + error);
      })
    }).catch(error => {
      console.log("Error fetch data: " + error);
    })
  }, [teacherId])

  useEffect(() => {
    axios.post('http://localhost:8888/teachers/studentTop10', {
      teacherId,
      page: currentPage,
      size: pageSize
    }).then(response => {
      const { data, totalRecords } = response.data;
      setTop(data.map(item => ({
        id: item.StudentID,
        name: item.Student_Name,
        dob: item.Birthday,
        aog: item.Averageofallsubjects
      })));
      setTotalRecord(totalRecords);
    }).catch(error => {
      console.log('Error fetch data: ' + error);
    })
  }, [teacherId, currentPage, pageSize]);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < Math.ceil(totalRecord / pageSize)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleRowClick = (studentId) => {
    navigate(`/teachers/class/student-information/${studentId}`);
  };

  const totalPages = Math.ceil(totalRecord / pageSize);

  return (
    <>
      <div id='dashboard'>
        <div className='flex'>
          <SideBar />
          <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-100% bg-[#e6e9ef] pt-2 pl-3 pr-3'>
            {showSkeleton ? (
              <SkeletonPage />
            ) : (
              <div id="inclass">
                <div id="header-class" className="mt-[10px] flex">
                  <p className="text-[Arial] text-[18px] font-medium">Trang chủ </p>
                </div>
                <div id='item-total' className='flex'>
                  <div className='w-[64.5%] mr-[.5%] h-[250px] rounded-10 bg-while'>
                    <div className='w-[95%] ml-2.5% mr-2.5%'>
                      <p className='mt-[.5em] ml-[.3em] mb-[1.5em] font-[Inter] text-[20px] font-semibold'>In 2024 - 2025</p>
                      <div className='flex justify-around'>
                        <div className='w-[150px] h-[150px] bg-[#2d3250] rounded-10'>
                          <div className='w-[90%] mt-10% pl-[10%]'>
                            <p><FontAwesomeIcon className='text-[28px] text-[#f9a17b]' icon="fa-solid fa-business-time" /></p>
                            <p className='text-[24px] font-semibold mb-[.5em] text-while pt-2'>{totalSession}</p>
                            <p className='font-medium text-[#f9a17b] pt-2'>Tổng số tiết dạy</p>
                          </div>
                        </div>
                        <div className='w-[150px] h-[150px] bg-[#2d3250] rounded-10'>
                          <div className='w-[90%] mt-10% pl-[10%]'>
                            <p><FontAwesomeIcon className='text-[28px] text-[#20aef3]' icon="fa-solid fa-user-gear" /></p>
                            <p className='text-[24px] font-semibold mb-[.5em] text-while pt-2'>{totalStudent}</p>
                            <p className='font-medium text-[#20aef3] pt-2'>Tổng HS quản lý</p>
                          </div>
                        </div>
                        <div className='w-[150px] h-[150px] bg-[#2d3250] rounded-10'>
                          <div className='w-[90%] mt-10% pl-[10%]'>
                            <p><FontAwesomeIcon className='text-[28px] text-[#f2c8ed]' icon="fa-solid fa-cube" /></p>
                            <p className='text-[24px] font-semibold mb-[.5em] text-while pt-2'>{totalRoom}</p>
                            <p className='font-medium text-[#f2c8ed] pt-2'>Số phòng mượn</p>
                          </div>
                        </div>
                        <div className='w-[150px] h-[150px] bg-[#2d3250] rounded-10'>
                          <div className='w-[90%] mt-10% pl-[10%]'>
                            <p><FontAwesomeIcon className='text-[28px] text-[#a9dfd8]' icon="fa-solid fa-clipboard-check" /></p>
                            <p className='text-[24px] font-semibold mb-[.5em] text-while pt-2'>{totalStudent}</p>
                            <p className='font-medium text-[#a9dfd8] pt-2'>Số đơn đã duyệt</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-[34.5%] ml-[.5%] h-[250px] rounded-10 bg-while'>
                    <div className='w-[95%] ml-2.5% mr-2.5%'>
                      <p className='mt-[.5em] ml-[.3em] mb-[.5em] font-[Inter] text-[20px] font-semibold'>Lớp chủ nhiệm {className}</p>
                      <Bar data={chartData} options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          tooltip: {
                            callbacks: {
                              label: function (context) {
                                return `${context.label}: ${context.raw} học sinh`;
                              }
                            }
                          }
                        }
                      }} />
                    </div>
                  </div>
                </div>
                <div id='ranked' className='mt-[1%]'>
                  <div className='w-[100%] mr-[.5%] h-[450px] rounded-10 bg-while'>
                    <div className='w-[95%] ml-2.5% mr-2.5%'>
                      <p className='mt-[.5em] ml-[.3em] mb-[1.5em] font-[Inter] text-[20px] font-semibold pt-3'>Top 10 học sinh trong lớp {className}</p>
                      <table className='table table-bordered table-hover cursor-pointer'>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Tên học sinh</th>
                            <th>Ngày sinh</th>
                            <th className='text-center'>Điểm trung bình</th>
                          </tr>
                        </thead>
                        <tbody>
                          {top.length > 0 ? (
                            top.map((item, index) => (
                              <tr key={item.id} onClick={() => handleRowClick(item.id)}>
                                <td>{currentPage * pageSize + index + 1}</td>
                                <td>{item.name}</td>
                                <td>{formatDate(item.dob)}</td>
                                <td className='text-center'>{item.aog}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className='text-center'>Bạn không có chủ nhiệm lớp nào!</td>
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
                </div>
                <div id='other' className='flex mt-[1%]'>
                  <div className='w-[34.5%] mr-[.5%] h-[500px] rounded-10 bg-while'></div>
                  <div className='w-[64.5%] ml-[.5%] h-[500px] rounded-10 bg-while'></div>
                </div>
                <div>

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

export default Dashboard;