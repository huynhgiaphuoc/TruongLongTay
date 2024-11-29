import React, { useEffect, useState } from "react";
import { SideBar, Navigator } from "../layout/layoutteacher";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import '../../assets/css/schedule.css';
import '../../assets/css/style.css';
import { useLocation, useParams } from "react-router-dom";
import SkeletonPage from './sleketon';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const Room = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [room, setRoom] = useState('');
  const [roomCondition, setRoomCondition] = useState([]);
  const teacherId = sessionStorage.getItem('userId');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editSession, setEditSession] = useState({ day: null, period: null });
  const [note, setNote] = useState('');
  const [roomId, setRoomId] = useState('');
  const [chooseDate, setChooseDate] = useState('');
  const [showEdit, setShowEdit] = useState('');

  const handleAddSession = (day, period) => {
    const currentDate = new Date();

    const currentDayOfWeek = currentDate.getDay();
    const daysToMonday = (currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek);
    const monday = new Date(currentDate);
    monday.setDate(monday.getDate() + daysToMonday);

    const selectedDate = new Date(monday);
    selectedDate.setDate(monday.getDate() + (day - 2));

    const formattedDate = selectedDate.toISOString().split('T')[0];
    console.dir("abc" + formattedDate);

    setChooseDate(formattedDate);
    setSelectedDay(day);
    setSelectedPeriod(period);
    setShowForm(true);
    setIsEditing(false);
  };

  const handleSubmit = () => {
    const currentDate = new Date();
    const selectedDate = new Date(chooseDate);

    if (!selectedRoom || selectedRoom === '0') {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng chọn phòng trước khi đăng ký mượn phòng.',
        confirmButtonText: 'OK'
      });
      setShowForm(false);
    } else {
      const newSession = {
        day: selectedDay,
        teacherId: teacherId,
        chooseDate: chooseDate,
        roomId: roomId,
        note: note,
        session1: selectedPeriod === 1 ? 'Chờ phê duyệt' : '',
        session2: selectedPeriod === 2 ? 'Chờ phê duyệt' : '',
        session3: selectedPeriod === 3 ? 'Chờ phê duyệt' : '',
        session4: selectedPeriod === 4 ? 'Chờ phê duyệt' : '',
        session5: selectedPeriod === 5 ? 'Chờ phê duyệt' : '',
        session6: selectedPeriod === 6 ? 'Chờ phê duyệt' : '',
        session7: selectedPeriod === 7 ? 'Chờ phê duyệt' : '',
        session8: selectedPeriod === 8 ? 'Chờ phê duyệt' : '',
        session9: selectedPeriod === 9 ? 'Chờ phê duyệt' : '',
        session10: selectedPeriod === 10 ? 'Chờ phê duyệt' : ''
      }

      if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: 'Đã qua ngày đó, không thể mượn phòng.',
          confirmButtonText: 'OK'
        });
        setShowForm(false);
        return;
      }
      Swal.fire({
        title: 'Bạn chắc chắn chứ?',
        text: "Bạn sẽ không thể hoàn tác hành động này!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yêu cầu!',
        cancelButtonText: 'Hủy bỏ'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post('http://localhost:8888/teachers/room/create', newSession).
            then(res => {
              if (res.status === 200) {
                Swal.fire({
                  title: 'Đã gửi yêu cầu mượn phòng!',
                  text: 'Dữ liệu đã được cập nhật.',
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
                fetchData();
                setShowForm(false);
              }
            }).catch(error => {
              if (error.response && error.response.status === 409) {
                Swal.fire({
                  title: 'Lỗi!',
                  text: error.response.data,
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              } else {
                Swal.fire({
                  title: 'Lỗi!',
                  text: error.response.data,
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              }
            })
        }
      })

    }
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Bạn chắc chắn chứ?',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa yêu cầu!',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        if (editSession && editSession.roomConditionId) {
          axios.post('http://localhost:8888/teachers/room/delete', {
            roomConditionId: editSession.roomConditionId
          }).then(response => {
            if (response.status === 200) {
              Swal.fire({
                title: 'Đã xóa yêu cầu mượn phòng!',
                text: 'Dữ liệu đã được cập nhật.',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              fetchData();
              setIsEditing(false);
            }
          }).catch(error => {
            if (error.response && error.response.status === 400) {
              Swal.fire({
                title: 'Không thể xóa vì phòng đã được duyệt!',
                text: error.response.data,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            } else {
              Swal.fire({
                title: 'Đã hủy yêu cầu!',
                text: 'Dữ liệu chưa được cập nhật.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
            setIsEditing(false);
          });
        } else {
          Swal.fire({
            title: 'Không thể xóa!',
            text: 'Dữ liệu chưa được cập nhật.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } else {
        setIsEditing(false);
      }
    });
  }

  const fetchData = async () => {
    const response = await axios.post('http://localhost:8888/teachers/room/roombyId', {
      roomId: roomId
    }).then(response => {
      const roomData = response.data;
      if (!roomData || roomData.length === 0) {
        setRoomCondition([]);
      } else {
        setRoomCondition(roomData);
      }
    })
  }
  const roomByDay = () => {
    const days = [2, 3, 4, 5, 6, 7];
    const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const data = {};

    days.forEach(day => {
      data[day] = {};
      periods.forEach(period => {
        data[day][period] = { session: '', RoomConditionID: '' };
      });
    });

    roomCondition.forEach(item => {
      const day = Number(item.Daysonweek);
      periods.forEach(period => {
        const sessionKey = `Session${period}`;
        if (item[sessionKey]) {
          data[day][period].session = item[sessionKey];
          data[day][period].RoomConditionID = item.RoomConditionID || '';
        }
      });
    });
    return data;

  };
  const roomData = roomByDay();
  const handleEditSession = (day, period) => {
    const sessionToEdit = roomData[day][period];
    setEditSession({ day, period, roomConditionId: sessionToEdit.RoomConditionID });
    setIsEditing(true);
    console.log(sessionToEdit);
    if (sessionToEdit && sessionToEdit.RoomConditionID) {
      axios.post('http://localhost:8888/teachers/room/findByRoomConditionId', {
        roomConditionId: sessionToEdit.RoomConditionID
      }).then(response => {
        const dt = response.data;
        setShowEdit(dt.note);
      }).catch(error => {
        console.log('Error fetch data: ' + error);
      })
    } else {
      console.log('Error data');
    }
  };

  const handleEdit = () => {
    Swal.fire({
      title: 'Bạn chắc chắn chứ?',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Lưu thay đổi!',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        if (editSession != null) {
          axios.post('http://localhost:8888/teachers/room/edit', {
            roomConditionId: editSession.roomConditionId,
            note: showEdit
          }).then(response => {
            if (response.status === 200) {
              Swal.fire({
                title: 'Đã gửi yêu cầu mượn phòng!',
                text: 'Dữ liệu đã được cập nhật.',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              fetchData();
              setIsEditing(false);
            }
          }).catch(error => {
            if (error.response && error.response.status === 400) {
              Swal.fire({
                title: 'Không thể cập nhật vì phòng đã được duyệt!',
                text: error.response.data,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            } else {
              Swal.fire({
                title: 'Đã hủy yêu cầu!',
                text: 'Dữ liệu chưa được cập nhật.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
            setIsEditing(false);
          });
        }
      } else {
        Swal.fire({
          title: 'Đã hủy bỏ cập nhật!',
          text: 'Dữ liệu chưa được cập nhật.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        setIsEditing(false);
      }
    })
  }

  const getSessionStatus = (day, period) => {
    const condition = roomCondition.find(
      condition => condition.Daysonweek == day && condition[`Session${period}`]
    );
    return condition ? condition[`Session${period}`] : '';
  };

  const getTeacherName = (day, period) => {
    const condition = roomCondition.find(
      condition => condition.Daysonweek == day && condition[`Session${period}`]
    );
    return condition ? condition.Name_Teacher : '';
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.post('http://localhost:8888/teachers/room/findroom');
        const dt = response.data;
        const list = dt.map(item => ({
          id: item.RoomID,
          name: item.RoomName
        }));
        setRoom(list);
      } catch (error) {
        console.log('Error fetch data: ' + error);
      }
    };
    fetchRoomData();
    setTimeout(() => setShowSkeleton(false), 1000);
  }, []);

  const handleSelectValue = async (event) => {
    const roomId = event.target.value;
    setRoomId(roomId);
    setSelectedRoom(roomId);
    try {
      const response = await axios.post('http://localhost:8888/teachers/room/roombyId', {
        roomId: roomId
      }).then(response => {
        const roomData = response.data;
        console.log("abc" + roomData);
        if (!roomData || roomData.length === 0) {
          setRoomCondition([]);
        } else {
          console.log(roomData);
          setRoomCondition(roomData);
        }
      }).catch(error => {
        console.log('Error fetch data: ' + error);
      })
    } catch (error) {
      console.log('Error fetch data: ' + error);
    }
  };

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
                <div id="header-class" className="mt-[10px] flex justify-between">
                  <p className="text-[Arial] text-[18px] font-medium">Mượn phòng</p>
                  <select className="mb-[2%] py-1 px-1" onChange={handleSelectValue}>
                    <option value={0}>Chọn phòng</option>
                    {room.length > 0 ? (
                      room.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    ) : (
                      <p>Không có dữ liệu</p>
                    )}
                  </select>
                </div>
                <div>
                  {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <form className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-center text-xl font-semibold mb-4">Đăng ký mượn phòng</h3>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">Ghi chú:</label>
                          <textarea onChange={(e) => setNote(e.target.value)} className="w-[100%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Yêu cầu">
                          </textarea>
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button type="button" onClick={handleSubmit} className="text-white bg-[#268f2b] font-bold px-4 py-2 transition-all rounded-md hover:bg-[#125115] rounded-10">
                            Đăng ký
                          </button>
                          <button type="button" onClick={() => setShowForm(false)} className="bg-[rgb(230,0,18)] text-white font-bold px-4 py-2 transition-all rounded-md hover:bg-[#ac000d] rounded-10">
                            Hủy bỏ
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  {isEditing && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <form className="bg-white p-6 rounded-lg shadow-lg w-96 rounded-15">
                        <h3 className="text-center text-xl font-semibold mb-4">Sửa thông tin mượn phòng</h3>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">Ghi chú:</label>
                          <textarea value={showEdit} id="showedit" onChange={(e) => setShowEdit(e.target.value)} className="w-[100%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Yêu cầu"></textarea>
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            className="bg-[#3dbcee] text-white font-bold px-4 py-2 rounded-md hover:bg-blue-600 rounded-10"
                            onClick={() => handleEdit()}
                          >
                            Lưu
                          </button>
                          <button
                            type="button"
                            className="bg-[#ca2525] text-white font-bold px-4 py-2 rounded-md hover:bg-blue-600 rounded-10"
                            onClick={() => handleDelete()}
                          >
                            Xóa
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-[#201f1f] text-white font-bold px-4 py-2 rounded-md hover:bg-gray-400 rounded-10"
                          >
                            Hủy
                          </button>
                        </div>
                      </form>
                    </div>
                  )}


                  <div className="schedule-table">
                    <table className="table bg-white text-black">
                      <thead className="text-black">
                        <tr>
                          <th>Tiết</th>
                          <th>Thứ 2</th>
                          <th>Thứ 3</th>
                          <th>Thứ 4</th>
                          <th>Thứ 5</th>
                          <th>Thứ 6</th>
                          <th className="last">Thứ 7</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(period => (
                          <tr key={period}>
                            <td className="day">
                              <p>{`Tiết ${period}`}</p>
                            </td>
                            {[2, 3, 4, 5, 6, 7].map(day => (
                              <td key={`${day}-${period}`} className="active cursor-pointer">
                                {getSessionStatus(day, period) ? (
                                  <>
                                    <div onClick={() => handleEditSession(day, period)}>
                                      <div className="flex justify-between">
                                        <div></div>
                                        <button
                                          className="edit-session-btn focus:outline-none spin-on-hover"
                                          onClick={() => handleEditSession(day, period)}
                                        >
                                          <FontAwesomeIcon icon="fa-solid fa-gear" />
                                        </button>
                                      </div>
                                      <p className="text-center text-gray-500">{getSessionStatus(day, period)}</p>
                                      <p className="text-center text-gray-600">{getTeacherName(day, period)}</p>
                                    </div>
                                  </>
                                ) : (
                                  <button className="add-session-btn focus:outline-none" onClick={() => handleAddSession(day, period)}>
                                    +
                                  </button>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Navigator />
        </div>
      </div>
    </>
  );
};



export { Room };
