import React, { useState, useEffect } from 'react';
import '../../assets/css/schedule.css';
import '../../assets/css/style.css';
import axios from 'axios';

function ScheduleOfClass() {
    const [scheduleData, setScheduleData] = useState({ 
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {}
    });
    const [teachers, setTeachers] = useState({}); 

  
    useEffect(() => {
        const userID = sessionStorage.getItem("userId");

        axios.post('http://localhost:8888/student/schedule/scheduleforstudent', { userid: userID })
            .then(response => {
                
                console.log(response.data)
                const processedData = processScheduleData(response.data);
                setScheduleData(processedData);
            })
            .catch(error => {
                console.error('There was an error fetching the schedule!', error);
            });
    }, []);

    const processScheduleData = (data) => {
        const schedule = {
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {}
        };

      data.forEach(item => {
            const day = item.Daysonweek;
            for (let i = 1; i <= 10; i++) {
                if (item[`Session${i}`]) {
                    schedule[day][i] = {
                        session: item[`Session${i}`],
                        teacherName: item.Name_Teacher || ''
                    };
                } else {
                    schedule[day][i] = {
                        session: '',
                        teacherName: ''
                    };
                }
            }
        });

        return schedule;
    };

    const renderSession = (day, period) => {
        const sessionInfo = scheduleData[day][period];
     

        return (
            <>
                <p>{sessionInfo?.session || ''}</p>
                <p className="teacher-name">{sessionInfo?.teacherName || ''}</p>
            </>
        );
    };


    return (
        <div className="container">
            <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 text-center">
               <a href="/student">Trờ lại</a>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="schedule-table">
                        <table className="table bg-white text-black">
                            <thead className="text-black">
                                <tr>
                                    <th>TKB</th>
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
                                            <td key={`${day}-${period}`} className="active">
                                                {renderSession(day, period)}
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
    );
}

export default ScheduleOfClass;
