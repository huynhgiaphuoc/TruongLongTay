import React, { useState, useEffect } from 'react';
//import '../../assets/css/schedule.css';
// import '../../assets/css/style.css';
import SettingsIcon from '@mui/icons-material/Settings';
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { LayoutAdmin, Nav } from '../layout/layoutadmin';
import { gapi } from 'gapi-script';
const CLIENT_ID = '46101121546-1ugfve7qf5ptktl545ra0cr0f7s4gpjr.apps.googleusercontent.com';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
function WorkScheduleManage() {
  const [admin, setAdmin] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [classNames, setClassNames] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [session, setSession] = useState('');
  const [classNameInput, setClassNameInput] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [selectedClassName, setSelectedClassName] = useState('');
  const [classname, setClassname] = useState('');
  const [classList, setClassList] = useState([]);
  const [subject, setSubject] = useState('');
  const [subjectList, setSubjectList] = useState([]);
  const [teacherSubjectID, setTeacherSubjectID] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editSessionData, setEditSessionData] = useState(null);
  const [selectedAdminName, setSelectedAdminName] = useState('');
  const [teachergetemail, setTeachergetemail] = useState('');
  const [gapiInitialized, setGapiInitialized] = useState(false);
  const [selectedTeacherEmail, setSelectedTeacherEmail] = useState('');
  const [eventIds, setEventIds] = useState([]);
  const handleGoogleLogin = (teacherEmail) => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '46101121546-1ugfve7qf5ptktl545ra0cr0f7s4gpjr.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
        access_type: 'offline'
      })
        .then(() => {
          console.log("Google API đã sẵn sàng");
          setGapiInitialized(true);
          const authInstance = window.gapi.auth2.getAuthInstance();
          console.log("authInstance",authInstance)

          const currentUser = authInstance.currentUser.get();
console.log("fd",teacherEmail)
          // Nếu đã đăng nhập và email khớp với teacherEmail, không cần đăng nhập lại
          if (authInstance.isSignedIn.get() && currentUser.getBasicProfile().getEmail() === teacherEmail) {
            console.log("Người dùng đã đăng nhập với email:", teacherEmail);
            setTeachergetemail(teacherEmail);
          } else {
            if (authInstance.isSignedIn.get()) {
              authInstance.signOut().then(() => {
                console.log("Đã đăng xuất khỏi tài khoản hiện tại.");
                signInWithTeacherEmail(teacherEmail, authInstance);
              });
            } else {
              setTeachergetemail(teacherEmail);

              signInWithTeacherEmail(teacherEmail, authInstance);
            }
          }
        })
        .catch(error => {
          console.error("Đã xảy ra lỗi khi khởi tạo Google API", error);
        });
    });
  };
  const signInWithTeacherEmail = (teacherEmail, authInstance) => {
    authInstance.signIn().then(() => {
      const profile = authInstance.currentUser.get().getBasicProfile();
      console.log("fdt",profile)

      const email = profile.getEmail();
      console.log("fdemailt",email)

      if (email === teacherEmail) {
        console.log("Người dùng đã đăng nhập thành công với email:", email);
      } else {
        console.error("Email đăng nhập không khớp với giáo viên đã chọn:", teacherEmail);
      }
    }).catch(error => {
      console.error("Lỗi khi đăng nhập", error);
    });
  };
  const handleSelectTeacher = (teacherEmail) => {
    
    handleGoogleLogin(teacherEmail);
  };
  const addEventToGoogleCalendar = (teacherEmail, classNameInput, subject, classid, teacherSubjectID, scheduleid) => {
    if (!gapiInitialized) {
      console.error("Google API chưa sẵn sàng");
      return;
    }

    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      console.error("Người dùng chưa đăng nhập.");
      return;
    }

    authInstance.signOut().then(() => {
      authInstance.signIn({
        scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
      }).then(() => {
        console.log("Người dùng đã đăng nhập lại với quyền đầy đủ");
      });
    });

    const accessToken = authInstance.currentUser.get().getAuthResponse().access_token;
    console.log("Access Token:", accessToken);
    console.log("Email của giáo viên:", teacherEmail);
    if (!teacherEmail || !/\S+@\S+\.\S+/.test(teacherEmail)) {
      console.error("Email của giáo viên không hợp lệ:", teacherEmail);
      return;
    }
    let startTime = '';
    let endTime = '';

    switch (selectedPeriod) {
      case 1: startTime = '07:00:00'; endTime = '07:45:00'; break;
      case 2: startTime = '07:45:00'; endTime = '08:30:00'; break;
      case 3: startTime = '08:50:00'; endTime = '09:35:00'; break;
      case 4: startTime = '09:35:00'; endTime = '10:30:00'; break;
      case 5: startTime = '10:30:00'; endTime = '11:15:00'; break;
      case 6: startTime = '12:40:00'; endTime = '13:40:00'; break;
      case 7: startTime = '13:40:00'; endTime = '14:25:00'; break;
      case 8: startTime = '14:25:00'; endTime = '15:20:00'; break;
      case 9: startTime = '15:20:00'; endTime = '16:05:00'; break;
      case 10: startTime = '16:05:00'; endTime = '16:50:00'; break;
      default: break;
    }

    let currentDate = new Date();
    const calculateEventDate = (day, weeksAhead) => {
      const result = new Date(currentDate);
      const dayOfWeek = result.getDay();
      const offset = (day - dayOfWeek + 7) % 7;
      result.setDate(result.getDate() + offset + (weeksAhead * 7));
      return result.toISOString().split('T')[0];
    };

    for (let week = 0; week < 4; week++) {
      const eventDate = calculateEventDate(selectedDay, week);
      const event = {
        summary: classNameInput,
        location: 'macailozjz',
        description: subject,
        start: {
          dateTime: `${eventDate}T${startTime}+07:00`,
          timeZone: 'Asia/Ho_Chi_Minh',
        },
        end: {
          dateTime: `${eventDate}T${endTime}+07:00`,
          timeZone: 'Asia/Ho_Chi_Minh',
        },
        attendees: [{ email: teacherEmail }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      };
      console.log("email", event);
      // Thêm sự kiện vào Google Calendar
      window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      }).then(response => {
        const newEventId = response.result.id;  // Chỉ lấy id của sự kiện
        console.log("EventId mới:", newEventId);

        // Lưu sự kiện vào cơ sở dữ liệu
        const events = {
          eventId: newEventId,  // Lưu id của sự kiện
          classId: classid,
          teacherId: teacherSubjectID,
          weekNumber: week + 1,
          scheduleId: scheduleid
          // Ghi nhận tuần tương ứng
        };
        console.log("events", events);

        // Gửi dữ liệu sự kiện tới server
        axios.post('http://localhost:8888/admin/events/create', events)
          .then(response => {
            console.log("Sự kiện đã được lưu vào cơ sở dữ liệu thành công!", response);
          })
          .catch((error) => {
            console.error('Lỗi chi tiết:', error);
            console.error('Mã lỗi:', error.code);
            console.error('Thông báo lỗi:', error.message);
          });

        // Cập nhật danh sách eventIds
        setEventIds(prevIds => [...prevIds, newEventId]);
      }).catch(error => {
        console.error(`Đã xảy ra lỗi khi thêm sự kiện tuần ${week + 1}:`, error);
      });
    }

  };
  const updateGoogleCalendarEvent = (teacherEmail, classNameInput, subject, events) => {
    teacherEmail = teachergetemail;
    console.log("Danh sách eventIds:", events);
    if (!gapiInitialized) {
      console.error("Google API chưa sẵn sàng");
      return;
    }
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      console.error("Người dùng chưa đăng nhập.");
      return;
    }
    const accessToken = authInstance.currentUser.get().getAuthResponse().access_token;
    console.log("Access Token:", accessToken);
    console.log("Email của giáo viên:", teacherEmail);
    if (!teacherEmail || !/\S+@\S+\.\S+/.test(teacherEmail)) {
      console.error("Email của giáo viên không hợp lệ:", teacherEmail);
      return;
    }
    let startTime = '';
    let endTime = '';

    switch (selectedPeriod) {
      case 1:
        startTime = '07:00:00';
        endTime = '07:45:00';
        break;
      case 2:
        startTime = '07:45:00';
        endTime = '08:30:00';
        break;
      case 3:
        startTime = '08:50:00';
        endTime = '09:35:00';
        break;
      case 4:
        startTime = '09:35:00';
        endTime = '10:30:00';
        break;
      case 5:
        startTime = '10:30:00';
        endTime = '11:15:00';
        break;
      case 6:
        startTime = '12:40:00';
        endTime = '13:40:00';
        break;
      case 7:
        startTime = '13:40:00';
        endTime = '14:25:00';
        break;
      case 8:
        startTime = '14:25:00';
        endTime = '15:20:00';
        break;
      case 9:
        startTime = '15:20:00';
        endTime = '16:05:00';
        break;
      case 10:
        startTime = '16:05:00';
        endTime = '16:50:00';
        break;
      default:
        break;
    }
    console.log("endTime", endTime);
    console.log("startTime", startTime);
    console.log("selectedPeriod", selectedPeriod);


    let currentDate = new Date();

    const calculateEventDate = (day, weeksAhead) => {
      const result = new Date(currentDate);
      const dayOfWeek = result.getDay();
      const offset = (day - dayOfWeek + 7) % 7;
      result.setDate(result.getDate() + offset + (weeksAhead * 7));
      return result.toISOString().split('T')[0];
    };

    for (let week = 0; week < 4; week++) {
      const eventId = events[week];
      if (!eventId) {
        console.error(`Không tìm thấy eventId cho tuần ${week + 1}`);
        continue;
      }

      const eventDate = calculateEventDate(selectedDay, week);
      const event = {
        summary: classNameInput,
        location: 'Trường Long Tây',
        description: subject,
        start: {
          dateTime: `${eventDate}T${startTime}+07:00`,
          timeZone: 'Asia/Ho_Chi_Minh',
        },
        end: {
          dateTime: `${eventDate}T${endTime}+07:00`,
          timeZone: 'Asia/Ho_Chi_Minh',
        },
        attendees: [{ email: teacherEmail }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      };
      console.log("eventid", eventId);
      // Cập nhật sự kiện trên Google Calendar
      window.gapi.client.calendar.events.update({
        calendarId: 'primary',
        eventId: eventId, // Sử dụng eventId đã lưu
        resource: event,
      }).then(response => {
        console.log(`Sự kiện tuần ${week + 1} đã được cập nhật vào Google Calendar`, response);
      }).catch(error => {
        console.error(`Đã xảy ra lỗi khi cập nhật sự kiện tuần ${week + 1}:`, error);
      });
    }
  };
  const deleteGoogleCalendarEvents = (events) => {
    if (!gapiInitialized) {
      console.error("Google API chưa sẵn sàng");
      return;
    }

    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      console.error("Người dùng chưa đăng nhập.");
      return;
    }

    for (let week = 0; week < 4; week++) {
      const eventId = events[week];
      if (!eventId) {
        console.error(`Không tìm thấy eventId cho tuần ${week + 1}`);
        continue;
      }

      window.gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
      }).then(response => {
        console.log(`Sự kiện tuần ${week + 1} đã được xóa khỏi Google Calendar`, response);
      }).catch(error => {
        console.error(`Đã xảy ra lỗi khi xóa sự kiện tuần ${week + 1}:`, error);
      });
    }
  };

  useEffect(() => {
    handleGetTeacher();
  }, []);
  useEffect(() => {
    if (teacherId) {
      console.log("teacherID",teacherId)
      setSchedule([]);
      const token = sessionStorage.getItem("token");
      axios.post('http://localhost:8888/admin/teachersubject/getall', { teacherID: teacherId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          const teachersubject = response.data;
          teachersubject.forEach(item => {
            const teacherSubjectID = item.Teacher_SubjectID;
          console.log("dinayne", teacherSubjectID);
            
            axios.post('http://localhost:8888/admin/teacher/getteacher', { teacherID: 1 })
              .then(response => {
                const teacher = response.data;
                console.log("teacher o day", teacher);
                teacher.forEach(item => {
                  const email = item.Email;
                  setTeachergetemail(email);
                  console.log("dy", email);
                  handleSelectTeacher(email);
                })
              }).catch(error => {
                console.error("Đã xảy ra lỗi khi lấy email!", error);
              });
            handleGetSchedule(teacherSubjectID);
          });
        })
        .catch(error => {
          console.error("Đã xảy ra lỗi khi lấy cl!", error);
        });
    } else {
      setSchedule([]);
    }
  }, [teacherId]);
  const getteachersubjectid = (teacherId) => {
    if (teacherId) {
      setSchedule([]);
      axios.post('http://localhost:8888/admin/teachersubject/getall', { teacherID: teacherId })
        .then(response => {
          const teachersubject = response.data;
          teachersubject.forEach(item => {
            const teacherSubjectID = item.Teacher_SubjectID;
            handleGetSchedule(teacherSubjectID);
          });
        })
        .catch(error => {
          console.error("Đã xảy ra lỗi khi lấy TeacherSubjectID hoặc email!", error);
        });
    } else {
      setSchedule([]);
    }
  };

  const handleGetSchedule = (teacherSubjectID) => {
    if (teacherSubjectID) {
      setTeacherSubjectID(teacherSubjectID);
      axios.post('http://localhost:8888/admin/schedule/schedule', { userID: teacherSubjectID })
        .then(response => {
          const scheduleData = response.data;
          if (!scheduleData || scheduleData.length === 0) {
            setSchedule([]);
            setClassList([]);
            setSubjectList([]);
            handlegetClass(teacherSubjectID);
            handlegetsubject(teacherSubjectID);
          } else {
            setSchedule(scheduleData);
            console.log(scheduleData)
            scheduleData.forEach(item => {
              if (item.ClassID) {
                axios.post(`http://localhost:8888/admin/operation/getall`, { ClassID: teacherSubjectID })
                  .then(classResponse => {
                    setClassList([]);
                    setSubjectList([]);
                    handlegetClass(teacherSubjectID);
                    handlegetsubject(teacherSubjectID);
                    const newClassNames = {};
                    classResponse.data.forEach(cls => {
                      newClassNames[cls.ClassID] = cls.Class_Name;
                    });
                    setClassNames(prevState => ({
                      ...prevState,
                      ...newClassNames
                    }));
                  })

                  .catch(error => {
                    console.error("Đã xảy ra lỗi khi lấy className!", error);
                  });
              }
            });
          }
        })
        .catch(error => {
          console.error("Đã xảy ra lỗi khi lấy lịch trình!", error);
        });
    } else {
      setSchedule([]);
    }
  };
  const handleGetTeacher = () => {
    axios.post('http://localhost:8888/admin/teacher/getall', {})
      .then(response => {
        console.log("admin hêre", response.data);
        setAdmin(response.data);
      })
      .catch(error => {
        console.error("Đã xảy ra lỗi khi lấy danh sách giáo viên!", error);
      });
  };

  const handleAdminChange = (event) => {
    const teacherID = event.target.value;
    const selectedAdmin = admin.forEach(adm => {
      if (adm.TeacherID === teacherId) {
        setSelectedAdminName(adm.Name_Teacher);
      }
    });
    if (selectedAdmin) {
      setSelectedAdminName(selectedAdmin.Name_Teacher);
    }
    setTeacherId(teacherID);
  };
  const scheduleByDay = () => {
    const days = [2, 3, 4, 5, 6, 7];
    const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const data = {};
    days.forEach(day => {
      data[day] = {};
      periods.forEach(period => {
        data[day][period] = { session: '', className: '', scheduleID: '' };
      });
    });
    schedule.forEach(item => {
      const day = Number(item.Daysonweek);
      periods.forEach(period => {
        const sessionKey = `Session${period}`;
        if (item[sessionKey]) {
          data[day][period].session = item[sessionKey];
          data[day][period].Class_Name = classNames[item.ClassID] || '';
          data[day][period].scheduleID = item.ScheduleID || '';
        }
      });
    });
    return data;
  };
  const scheduleData = scheduleByDay();
  const handleAddSession = (day, period) => {
    setSelectedDay(day);
    setSelectedPeriod(period);
    setShowForm(true);
  };
  const handlegetClass = (teacherSubjectID) => {
    const token = sessionStorage.getItem("token");
    axios.post('http://localhost:8888/admin/operation/getclass', { ClassID: teacherSubjectID }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setClassList(data);
        } else {
          setClassList([]);
        }
      })
      .catch(error => {
        console.error("Lỗi khi lấy danh sách lớp: ", error);
        setClassList([]);
      });
  };
  const handlegetsubject = (teacherSubjectID) => {
    const token = sessionStorage.getItem("token");
    axios.post('http://localhost:8888/admin/operation/getsubject', { ClassID: teacherSubjectID }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setSubjectList(data);
        } else {
          setSubjectList([]);
        }
      })
      .catch(error => {
        console.error("Lỗi khi lấy danh sách môn học: ", error);
        setSubjectList([]);
      });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newSession = {
      day: selectedDay,
      period: selectedPeriod,
      session,
      className: classNameInput
    };
    const data = {
      teacherID: teacherSubjectID,
      classID: classNameInput,
      selectedDay: selectedDay,
      session1: selectedPeriod === 1 ? subject : '',
      session2: selectedPeriod === 2 ? subject : '',
      session3: selectedPeriod === 3 ? subject : '',
      session4: selectedPeriod === 4 ? subject : '',
      session5: selectedPeriod === 5 ? subject : '',
      session6: selectedPeriod === 6 ? subject : '',
      session7: selectedPeriod === 7 ? subject : '',
      session8: selectedPeriod === 8 ? subject : '',
      session9: selectedPeriod === 9 ? subject : '',
      session10: selectedPeriod === 10 ? subject : ''
    };
    console.log("data", data)
    const token = sessionStorage.getItem("token");
    axios.post('http://localhost:8888/admin/schedule/createschedule', data)
      .then(response => {
        console.log('Schedule created successfully:', response.data);
        const scheduleid = response.data;
        getteachersubjectid(teacherId);
        axios.post('http://localhost:8888/admin/class/getclass', { ClassID: classNameInput })
          .then(response => {
            const classno = response.data;
            classno.forEach(item => {
              const classnameno = item.Class_Name;
              const classid = item.ClassID;
              console.log("class name 1", classno)
              addEventToGoogleCalendar(teachergetemail, classnameno, subject, classid, teacherSubjectID, scheduleid);
            })
          }
          )
      })
      .catch(error => {
        console.error('Error creating schedule:', error);
      });
    setShowForm(false);
    setSession('');
    setClassNameInput('');
    setSubject('');
    setSelectedClassName('');
  };
  const handleSettingsClick = (day, period) => {
    setSelectedDay(day);
    setSelectedPeriod(period);
    const sessionToEdit = scheduleData[day][period];
    setEditSessionData({
      day,
      period,
      session: sessionToEdit.session,
      className: sessionToEdit.Class_Name,
      scheduleID: sessionToEdit.scheduleID
    });
    setIsEditing(true);
  };
  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      teacherID: teacherSubjectID,
      classID: classNameInput,
      selectedDay: editSessionData.day,
      scheduleID: editSessionData.scheduleID,
      session1: editSessionData.period === 1 ? subject : '',
      session2: editSessionData.period === 2 ? subject : '',
      session3: editSessionData.period === 3 ? subject : '',
      session4: editSessionData.period === 4 ? subject : '',
      session5: editSessionData.period === 5 ? subject : '',
      session6: editSessionData.period === 6 ? subject : '',
      session7: editSessionData.period === 7 ? subject : '',
      session8: editSessionData.period === 8 ? subject : '',
      session9: editSessionData.period === 9 ? subject : '',
      session10: editSessionData.period === 10 ? subject : ''
    };

    axios.post('http://localhost:8888/admin/schedule/editschedule', data)
      .then(response => {
        console.log('Schedule updated successfully:', response.data);
        const scheduleid = response.data;
        axios.post('http://localhost:8888/admin/class/getclass', { ClassID: classNameInput })
          .then(response => {
            const classno = response.data;
            classno.forEach(item => {
              const classnameno = item.Class_Name;
              console.log("class name edit:", classnameno);
              axios.post('http://localhost:8888/admin/events/getall', { scheduleId: scheduleid })
                .then(response => {
                  console.log("response data", response.data)
                  const events = response.data;
                  updateGoogleCalendarEvent(selectedTeacherEmail, classnameno, subject, events);
                })
                .catch(error => {
                  console.error('Error getting class:', error);
                });

            });
          })
          .catch(error => {
            console.error('Error getting class:', error);
          });
        getteachersubjectid(teacherId);
      })
      .catch(error => {
        console.error('Error updating schedule:', error);
      });

    setIsEditing(false);
    setEditSessionData(null);
    setSession('');
    setClassNameInput('');
    setSubject('');
  };
  const handledeleteschedule = () => {
    if (editSessionData && editSessionData.scheduleID) {
      axios.post('http://localhost:8888/admin/events/getall', { scheduleId: editSessionData.scheduleID })
        .then(response => {
          console.log("response data", response.data)
          const events = response.data;
          deleteGoogleCalendarEvents(events);
        })
        .catch(error => {
          console.error('Error getting class:', error);
        });
      axios.post(`http://localhost:8888/admin/schedule/deleteschedule`, { scheduleID: editSessionData.scheduleID })
        .then((response) => {
          console.log('Schedule deleted successfully:', editSessionData.scheduleID);
          getteachersubjectid(teacherId);

        })
        .catch((error) => {
          console.error('Error deleting schedule:', error);
        });
      setIsEditing(false);
      setEditSessionData(null);
    }
  }
  return (
    <div className="flex h-[100%] overflow-hidden">
      <LayoutAdmin />
      <div className="w-[calc(100%-256px)] pl-[20px] bg-[#edf2f9] h-[100%]">
        <div className="w-100% h-[60px] pb-[15px]">
          <Nav />
        </div>
        <div className='flex overflow-auto'>
          <div>
            <div className='p-[20px_0_20px_10px]'>
              <select onChange={handleAdminChange} className="w-[300px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-15">
                <option value="">Select Admin</option>
                {admin.map(adm => (
                  <option key={adm.TeacherID} value={adm.TeacherID}>
                    {adm.Name_Teacher}
                  </option>
                ))}
              </select>
            </div>
            {showForm && (
              <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex items-center justify-center z-50">
                <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96 rounded-15">
                  <h3 className="text-center text-xl font-semibold mb-4">Thêm Tiết Dạy</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Môn:</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-[100%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-15"
                      required
                    >
                      <option value="">Chọn Môn</option>
                      {subjectList.map(cls => (
                        <option key={cls.SubjectsID} value={cls.SubjectsID}>
                          {cls.Subjects_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Class Name:</label>
                    <select
                      value={classNameInput}
                      onChange={(e) => setClassNameInput(e.target.value)}
                      className="w-[100%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-15"
                      required
                    >
                      <option value="">Chọn lớp</option>
                      {classList.map(cls => (
                        <option key={cls.ClassID} value={cls.ClassID}>
                          {cls.Class_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="submit"
                      className="text-white bg-[#268f2b] font-bold px-4 py-2 rounded-md hover:bg-blue-600 rounded-10"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="bg-[#201f1f] text-white font-bold px-4 py-2 rounded-md hover:bg-gray-400 rounded-10"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            {isEditing && (
              <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex items-center justify-center z-50">
                <form onSubmit={handleEditFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96 rounded-15">
                  <h3 className="text-center text-xl font-semibold mb-4">Điều Chỉnh Tiết Dạy</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Môn Dạy:</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-[100%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-15"
                      required
                    >
                      <option value="">Chọn Môn: </option>
                      {subjectList.map(cls => (
                        <option key={cls.SubjectsID} value={cls.SubjectsID}>
                          {cls.Subjects_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Class Name:</label>
                    <select
                      value={classNameInput}
                      onChange={(e) => setClassNameInput(e.target.value)}
                      className="w-[100%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-15"
                      required
                    >
                      <option value="">Chọn lớp</option>
                      {classList.map(cls => (
                        <option key={cls.ClassID} value={cls.ClassID}>
                          {cls.Class_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="submit"
                      className="bg-[#3dbcee] text-white font-bold px-4 py-2 rounded-md hover:bg-blue-600 rounded-10"
                    >
                      Lưu
                    </button>
                    <button
                      type="submit"
                      className="bg-[#ca2525] text-white font-bold px-4 py-2 rounded-md hover:bg-blue-600 rounded-10"
                      onClick={handledeleteschedule}
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
            <div className="container">
              <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 text-center">
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="schedule-table">
                    <table className="table bg-white text-black">
                      <thead className="text-black">
                        <tr>
                          <th className='tkb'>TKB</th>
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
                              <td key={`${day}-${period}`} className={`active ${day === 7 ? 'border-left' : ''}`}>
                                <p>{scheduleData[day][period].session}</p>
                                <p>{scheduleData[day][period].Class_Name}</p>
                                {scheduleData[day][period].session === '' && (
                                  <button
                                    className="add-session-btn-w"
                                    onClick={() => handleAddSession(day, period)}
                                  >
                                    +
                                  </button>
                                )}
                                {scheduleData[day][period].session && (
                                  <SettingsIcon
                                    className="settings-icon"
                                    onClick={() => handleSettingsClick(day, period)}
                                  />
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
            </div>
          </div>
        </div>
      </div>
    </div >
  );

}

export default WorkScheduleManage;