import React, { useEffect, useState } from 'react';
import { SideBar, Navigator } from '../layout/layoutteacher';
import { useParams, useNavigate } from 'react-router-dom';
import { LayoutAdmin, Nav } from '../layout/layoutadmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios, { Axios } from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


//CREATE EXAM
const ExamFrom = () => {
  const { id } = useParams();
  const [examClass, setExamClass] = useState([]);
  const [setclass, setSetclass] = useState("");
  const [selectSubject, setSelectSubject] = useState([]);
  const [listSubject, setListSubject] = useState('');
  const [examList, setExamList] = useState('');
  const [examAdd, setExamAdd] = useState({
    name: '',
    date: '',
    start: '',
    end: '',
    classid: '',
    subid: ''
  });

  const handExam = (event) => {
    const { id, value } = event.target;
    setExamAdd(prevState => ({ ...prevState, [id]: value }));
  };
  const handExamSubmit = async (event) => {
    event.preventDefault();

    const dataexam = {
      name: examAdd.Exam,
      date: examAdd.ExamDate,
      start: examAdd.StartTime,
      end: examAdd.EndTime,
      classid: setclass,
      subid: selectSubject,
    };

    // Kiểm tra rỗng với Swal.fire
    if (!dataexam.name || !dataexam.date || !dataexam.start || !dataexam.end || !dataexam.classid || !dataexam.subid) {
      Swal.fire({
        title: 'Error',
        text: 'Vui lòng điền đầy đủ các trường!',
        icon: 'warning',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8888/admin/getTotalTime', dataexam);
      Swal.fire({
        title: 'Success',
        text: 'Thêm kỳ thi thành công',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      window.location.href = '/exam';
      // fetchData();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Lỗi khi thêm kỳ thi', 'error');
    }
  };



  const fetchData = () => {
    axios.post('http://localhost:8888/admin/exam')
      .then(response => {
        const edt = response.data;;
        const list = edt.map(item => ({
          classid: item.ClassID,
          clasname: item.Class_Name,
          examid: item.ExamID,
          subid: item.SubjectsID,
          start: item.StartTime,
          examName: item.Exam_Name,
          end: item.EndTime,
          examName: item.Exam,
          examDay: item.ExamDate,
          total: item.TotalTime,
          subname: item.Subjects_Name
        }))
        setExamList(list);
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    axios.post('http://localhost:8888/admin/getclass')
      .then(response => {
        const dt = response.data;
        const listadd = dt.map(item => ({
          id: item.ClassID,
          classCode: item.Class_Code,
          className: item.Class_Name,
          classSic: item.Class_Name,
          classSub: item.Subject_CombinationID,
          classYear: item.school_year
        }))
        setExamClass(listadd);
      }).catch(error => {
        console.log('Error fetch data: ' + error);
      })
  })

  const handleChooseExamClass = (classId) => {
    setSetclass(classId);
    if (classId != null) {
      axios.post('http://localhost:8888/admin/exam', {
        classId
      }).then(response => {
        const dtexam = response.data;
        const list = dtexam.map(item => ({
          classid: item.ClassID
        }))

      }).catch(error => {
        console.log('Error fetch data: ' + error);
      });
    }

    if (classId != null) {
      axios.post('http://localhost:8888/admin/getsubjects', {
        subjectsId: classId
      }).then(response => {
        const dt = response.data;
        const list = dt.map(item => ({
          id: item.SubjectsID,
          name: item.Subjects_Name
        }));
        setListSubject(list);
      }).catch(error => {
        console.log('Error fetch data: ' + error);
      });
    }
  }

  const handleChooseExamSubject = (event) => {
    event.preventDefault();
    const subjectId = event.target.value;
    setSelectSubject(subjectId);
  }



  return (
    <div className="flex h-[100vh] overflow-hidden">
      <LayoutAdmin />
      <div className="w-[calc(100%-256px)] pl-[20px] bg-[#edf2f9] h-[100%]">
        <div className="w-100% h-[60px] pb-[15px]">
          <Nav />
        </div>  
        <h2 className="text-xl font-bold mb-4 pt-2"><a className='mr-[10px]' href='/exam'><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></a>Thêm Lịch Thi</h2>
        <div className=' className="text-xl font-bold mb-4 pt-2"'>
          <div className="flex justify-center py-6">
            <form>
              
              <div className='mb-2.5%'>
                <label class="block text-[#000] font-medium mb-[8px]">Tên Kỳ Thi</label>
                <input className='w-[100%] shadow-sm appearance-none border border-[#7f7a7a] rounded-[5px] py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]' onChange={handExam} type="text" name="exam" id="Exam" />
              </div>
              <div className='mb-2.5%'>
                <label class="block text-[#000] font-medium mb-[8px]">Ngày Thi</label>
                <input className='w-[100%] shadow-sm appearance-none border border-[#7f7a7a] rounded-[5px] py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]' onChange={handExam} type="date" name="examDate" id="ExamDate" />
              </div>

              <div className='mb-2.5%'>
                <label class="block text-[#000] font-medium mb-[8px]">Thời gian bắt đầu</label>
                <input className='w-[100%] shadow-sm appearance-none border border-[#7f7a7a] rounded-[5px] py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]' onChange={handExam} type="time" name="startTime" id="StartTime" />
              </div>

              <div className='mb-2.5%'>
                <label class="block text-[#000] font-medium mb-[8px]">Thời gian kết thúc</label>
                <input className='w-[100%] shadow-sm appearance-none border border-[#7f7a7a] rounded-[5px] py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]' onChange={handExam} type="time" name="endTime" id="EndTime" />
              </div>

              <div className='mb-2.5%'>
                <label class="block text-[#000] font-medium mb-[8px]">Lớp</label>
                <select className='w-[100%] shadow-sm appearance-none border border-[#7f7a7a] rounded-[5px] py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]' id='classid' value={setclass} onChange={(e) => handleChooseExamClass(e.target.value)}>
                  <option value="0">Chọn Lớp</option>
                  {examClass.length > 0 ? (
                    examClass.map(item => (
                      <option key={item.id} value={item.id}>{item.className}</option>
                    ))

                  ) : (
                    <option>Không có dữ liệu</option>
                  )}

                </select>
              </div>

              <div className='mb-2.5%'>
                <label className="block text-[#000] font-medium mb-[8px]">Môn học</label>
                <select className='w-[100%] shadow-sm appearance-none border border-[#7f7a7a] rounded-[5px] py-2 px-3 text-[#000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#3c509f]' id='subid' value={selectSubject} onChange={handleChooseExamSubject}>
                  <option value="0">Chọn Môn học</option>
                  {listSubject.length > 0 ? (
                    listSubject.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))

                  ) : (
                    <option>Không có dữ liệu</option>
                  )}

                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={handExamSubmit}
                  className='mt-2.5% bg-[#007bff] hover:bg-hover text-while py-1 rounded-[5px] w-[560px]'>
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


const Examadmin = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [arrClass, setArrClasses] = useState([]);
  const [selectClass, setSelectClass] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);
  const [listSubject, setListSubject] = useState('');
  const [examList, setExamList] = useState('');
  const [classId, setClassId] = useState('');
  const [setclass, setSetclass] = useState("");;
  const [selectSubjectEdit, setSelectSubjectEdit] = useState([]);
  const [listSubjectEdit, setListSubjectEdit] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examStart, setExamStart] = useState('');
  const [examEnd, setExamEnd] = useState('');
  const [examClass, setExamClass] = useState('');
  const [examSubject, setExamSubject] = useState('');
  const [examId, setExamId] = useState('');
  const [examTotal, setExamTotal] = useState('');
  const [listClass, setListClass] = useState([]);
  const [listEditSubject, setListEditSubject] = useState([]);
  const [examEditId, setExamEditId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    axios.post('http://localhost:8888/admin/getclass')
      .then(response => {
        const dt = response.data;
        const list = dt.map(item => ({
          id: item.ClassID,
          classCode: item.Class_Code,
          className: item.Class_Name,
          classSic: item.Class_Name,
          classSub: item.Subject_CombinationID,
          classYear: item.school_year
        }))
        setClasses(list);
      })
  });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = arrClass.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(arrClass.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChooseClass = (event) => {
    const classId = event.target.value;
    setSelectClass(event.target.value);
    if (classId != null) {
      axios.post('http://localhost:8888/admin/exam', {
        classId
      }).then(response => {
        const dtexam = response.data;
        const list = dtexam.map(item => ({
          classid: item.ClassID,
          clasname: item.Class_Name,
          examid: item.ExamID,
          subid: item.SubjectsID,
          start: item.StartTime,
          examName: item.Exam_Name,
          end: item.EndTime,
          examName: item.Exam,
          examDay: item.ExamDate,
          total: item.TotalTime,
          subname: item.Subjects_Name
        }))
        setArrClasses(list);
        setClassId(list[0].classid);
        axios.post('http://localhost:8888/admin/examsub', {
          subjectsId: list[0].classid
        }).then(response => {
          const dt = response.data;
          const list = dt.map(item => ({
            id: item.SubjectsID,
            name: item.Subjects_Name,
            classId: item.ClassID,
            className: item.Class_Name,
            examId: item.ExamID,
            examName: item.Exam,
            examDate: item.ExamDate
          }))
          setListSubject(list);
        }).catch(error => {
          console.log('Error fetch data: ' + error);
        })
      }).catch(error => {
        console.log('Error fetch data: ' + error);
      });
    }
  }

  const handleChooseExamSubject = (event) => {
    event.preventDefault();
    const subjectsId = event.target.value;
    setSelectSubject(event.target.value);
    if (subjectsId == 0) {
      fetchData();
    }else{
      axios.post('http://localhost:8888/admin/examclassandsubject', {
        classId: classId,
        subjectsId: subjectsId
      }).then(response => {
        const dt = response.data;
        const list = dt.map(item => ({
          classid: item.ClassID,
          clasname: item.Class_Name,
          examid: item.ExamID,
          subid: item.SubjectsID,
          start: item.StartTime,
          examName: item.Exam_Name,
          end: item.EndTime,
          examName: item.Exam,
          examDay: item.ExamDate,
          total: item.TotalTime,
          subname: item.Subjects_Name
        }));
        setArrClasses(list);
      }).catch(error => {
        console.log('Error fetch data: ' + error);
      });
    }
  }

  const fetchData = () => {
    axios.post('http://localhost:8888/admin/exam', {
      classId: selectClass
    }).then(response => {
      const edt = response.data;;
      const list = edt.map(item => ({
        classid: item.ClassID,
        clasname: item.Class_Name,
        examid: item.ExamID,
        subid: item.SubjectsID,
        start: item.StartTime,
        examName: item.Exam_Name,
        end: item.EndTime,
        examName: item.Exam,
        examDay: item.ExamDate,
        total: item.TotalTime,
        subname: item.Subjects_Name
      }))
      console.log('Dữ liệu sau khi fetch:', list);
      setArrClasses(list);
    })
      .catch(error => console.error(error));
  }

  const deleteExam = (examid) => {
    const eId = examid;
    console.log(eId);
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
        axios.post('http://localhost:8888/admin/deleteexam', {
          examId: eId,
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
              text: 'Không thể xóa kỳ thi!',
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


  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return '';
    const d = new Date(dateTimeString);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const formatTime = (time) => {
    if (!time) return '';
  const d = new Date(time);
  let hours = d.getHours().toString().padStart(2, '0');
  let minutes = d.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
  };

  const openModal = (id) => {
    setExamEditId(id);
    if (!isModalOpen) {
      setIsModalOpen(true);
      axios.post('http://localhost:8888/admin/getExam', {
        examId: id
      }).then(res => {
        const dt = res.data;
        console.log(dt);
        setExamName(dt.exam);
        setExamDate(formatDate(dt.examDate));
        setExamStart(formatTime(dt.startTime));
        setExamEnd(formatTime(dt.endTime));
        setExamSubject(dt.subjectsID.subjectsID);
        setExamClass(dt.classID.classID);
        setExamId(dt.examID);
      }).catch(err => {
        console.log('Error fetch data: ' + err);
      })
    }
  };

  useEffect(() => {
    axios.post('http://localhost:8888/admin/getclassid', {
      classId: examClass
    }).then(res => {
      const dt = res.data;
      setListClass(dt);
      console.log(res.data);
    }).catch(err => {
      console.log('Error fetch data: ' + err);
    });

    axios.post('http://localhost:8888/admin/getsubid', {
      classId: examClass
    }).then(res => {
      const dt = res.data;
      setListEditSubject(dt);
      console.log(res.data);
    }).catch(err => {
      console.log('Error fetch data: ' + err);
    })
  }, [examId])

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleEdit = () => {
    const data = {
      name: examName,
      date: formatDate(examDate),
      start: examStart,
      end: examEnd,
      id: examEditId,
      classId: examClass,
      subjectId: examSubject
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
        axios.post('http://localhost:8888/admin/exam/edit', data)
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: 'Đã cập nhật!',
              text: 'Dữ liệu đã được cập nhật.',
              confirmButtonText: 'OK'
            });
            fetchData();
            setIsModalOpen(false);
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

  const exportToExcel = () => {
    console.log("xuất" + selectClass);
    const worksheet = XLSX.utils.json_to_sheet(arrClass);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Exam');
    XLSX.writeFile(workbook, 'Exam.xlsx');
  };

  const handleChooseExam = () => {
    navigate('/createexam');
  }

  const handleCloseedit = () => {
    isModalOpen(false);
    setExamName('');
    setExamDate('');
    setExamStart('');
    setExamEnd('');
    setExamSubject('');
    setExamClass('');
    setExamId('')
  };

  return (
    <>
      <div className="flex h-[100%] overflow-hidden">
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
                    <span className='text-[18px] font-medium mr-[10px]'>Quản lý Lịch Thi</span>
                    <button className='focus:outline-none active:outline-none' type="button" onClick={handleChooseExam}>
                      <FontAwesomeIcon icon="fa-solid fa-circle-plus" className="text-[24px]" />
                    </button>
                  </h2>
                  <button
                    type='button'
                    className="px-6 py-2 bg-[#191fcd] text-white font-semibold rounded-10 shadow-md hover:bg-[#231b6c] focus:outline-none focus:ring-2 focus:ring-[#2020a0] focus:ring-opacity-75"
                    onClick={exportToExcel}
                  >
                    Xuất File Excel
                  </button>
                </div>
                <div className="flex space-x-4 items-center">
                  <select
                    value={selectClass}
                    onChange={handleChooseClass}
                    className="block w-[30%] px-4 py-2 border border-[#eae9e9] rounded-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5350ff] focus:border-[#2e338f]"
                  >
                    <option value="">Chọn lớp</option>
                    {classes.length > 0 ? (
                      classes.map(item => (
                        <option key={item.id} value={item.id}>{item.className}</option>
                      ))
                    ) : (
                      <option>Không có dữ liệu, vui lòng chọn lớp</option>
                    )}
                  </select>

                  <select
                    id='subid'
                    value={selectSubject}
                    onChange={handleChooseExamSubject}
                    className="block w-[30%] px-4 py-2 border border-[#eae9e9] rounded-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5350ff] focus:border-[#2e338f]"
                  >
                    <option value="0">Chọn Môn học</option>
                    {listSubject.length > 0 ? (
                      listSubject.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))
                    ) : (
                      <option>Không có dữ liệu</option>
                    )}
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <div className='w-100 h-[fit-content] border-solid border-[1px] border-[#777] rounded-10 mt-2.5% mb-[1%]'>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Số thứ tự</th>
                          <th>Tên Kỳ Thi</th>
                          <th>Ngày Thi</th>
                          <th>Thời gian bắt đầu</th>
                          <th>Thời gian kết thúc</th>
                          <th>Tổng thời gian</th>
                          <th>Lớp học </th>
                          <th>Môn học</th>
                          <th>Sửa</th>
                          <th>Xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentProducts.length > 0 ? (
                          currentProducts.map((item, index) => (
                            <tr key={item.examid}>
                              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td>{item.examName}</td>
                              <td>{item.examDay}</td>
                              <td>{item.start}</td>
                              <td>{item.end}</td>
                              <td>{item.total}</td>
                              <td>{item.clasname}</td>
                              <td>{item.subname}</td>
                              <td>
                                <button type='button' onClick={() => openModal(item.examid)}
                                  className="text-[#000] hover:text-[#3a62ff]  px-2 py-1 rounded">

                                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                </button>
                              </td>
                              <td>
                                <button type='button' onClick={() => deleteExam(item.examid)}
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
                    {isModalOpen && (
                      <div id="examModal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-[rgba(0,0,0,.5)]">
                        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative">
                          <span
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer text-2xl"
                          >
                            &times;
                          </span>
                          <h2 className="text-2xl font-bold mb-6 text-center">Sửa Lịch Thi</h2>
                          <form className="space-y-4">
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">Tên Kỳ Thi</label>
                              <input
                                type="text"
                                value={examName}
                                onChange={(e) => setExamName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">Ngày Thi</label>
                              <input
                                type="date"
                                value={examDate}
                                onChange={(e) => setExamDate(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">Thời gian bắt đầu</label>
                              <input
                                type="time"
                                value={examStart}
                                onChange={(e) => setExamStart(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">Thời gian kết thúc</label>
                              <input
                                type="time"
                                value={examEnd}
                                onChange={(e) => setExamEnd(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">Lớp</label>
                              <select
                                value={examClass}
                                onChange={(e) => setExamClass(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="0">Chọn Lớp</option>
                                {listClass.map(item => (
                                  <option key={item.ClassID} value={item.ClassID}>{item.Class_Name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">Môn học</label>
                              <select
                                value={examSubject}
                                onChange={(e) => setExamSubject(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="0">Chọn Môn Học</option>
                                {listEditSubject.map(item => (
                                  <option key={item.SubjectsID} value={item.SubjectsID}>{item.Subjects_Name}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex justify-between space-x-4 mt-5%">
                              <button
                                className="bg-main w-[100%] rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                                type="button"
                                onClick={handleEdit}
                              >
                                Cập nhật
                              </button>
                              <button
                                className="bg-[rgb(230,0,18)] w-[100%] rounded-[5px] text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
                                type="button"
                                onClick={handleCloseedit}
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
      </div>
    </>
  )
}

export { Examadmin, ExamFrom }