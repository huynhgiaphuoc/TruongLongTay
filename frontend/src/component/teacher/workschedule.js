import React, { useEffect, useState } from "react";
import { SideBar, Navigator } from '../layout/layoutteacher';
import SkeletonPage from './sleketon';
import '../../assets/css/schedule.css';
import '../../index.css';
import axios from 'axios';

const WorkSchedule = () => {
    const [showSkeleton, setShowSkeleton] = useState(true);

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);
    return (
        <>
            <div id='dashboard'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        {showSkeleton ? (
                            <SkeletonPage />
                        ) : (
                            <div id="inclass">
                                <div id="header-class" className="mt-[10px] flex">
                                    <p className="text-[Arial] text-[18px] font-medium">Lịch giảng dạy </p>
                                </div>
                                <div>
                                    <Schedule />
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

const Schedule = () => {
    const teacherId = sessionStorage.getItem("userId");

    const [scheduleData, setScheduleData] = useState({
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {}
    });

    useEffect(() => {
        axios.post("http://localhost:8888/teachers/schedule/getall", { teacherID: teacherId })
            .then(response => {
                const teachersubject = response.data;
                teachersubject.forEach(item => {
                    const teacherSubjectID = item.Teacher_SubjectID;
                    handleGetSchedule(teacherSubjectID);
                });
            })
            .catch(error => {
                console.error('There was an error fetching the schedule!', error);
            });
    }, []);

    const handleGetSchedule = (teachersubjectID) => {
        axios.post("http://localhost:8888/teachers/schedule/schedule", { userID: teachersubjectID })
            .then(response => {
                console.log(response.data);
                const classlist = response.data;
                const promises = classlist.map(item => {
                    const classID = item.ClassID;
                    return handlegetClassName(classID)
                        .then(className => {
                            console.log("classname", className)
                            return { ...item, Class_Name: className };
                        });
                });

                Promise.all(promises)
                    .then(results => {
                        const processedData = processScheduleData(results);
                        setScheduleData(prevState => ({
                            ...prevState,
                            ...processedData
                        }));
                    })
                    .catch(error => {
                        console.error('There was an error processing the schedule data!', error);
                    });
            })
            .catch(error => {
                console.error('There was an error fetching the schedule!', error);
            });
    };

    const handlegetClassName = (classID) => {
        return axios.post("http://localhost:8888/teachers/schedule/getclass", { ClassID: classID })
            .then(response => {
                console.log(response.data);
                const classList = response.data;
                return classList[0]?.Class_Name || '';
            })
            .catch(error => {
                console.error('There was an error fetching the class name!', error);
                return '';
            });
    };
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
            console.log("dataa", data)
            const day = item.Daysonweek;
            console.log("day", day);
            if (!schedule[day]) schedule[day] = {};
            for (let i = 1; i <= 10; i++) {
                if (item[`Session${i}`]) {
                    if (!schedule[day][i]) {
                        schedule[day][i] = {
                            sessions: [{ session: item[`Session${i}`], className: item.Class_Name }]
                        };
                    } else {

                    }
                }
            }
        });

        return schedule;
    };

    const renderSession = (day, period) => {
        const sessionInfo = scheduleData[day] && scheduleData[day][period];
        console.log(sessionInfo);
        return (
            <>
                {sessionInfo && sessionInfo.sessions ? (
                    sessionInfo.sessions.map((session, index) => (
                        <div key={index}>
                            <p className="!text-[12px]">{session.session}</p>
                            <p className="!text-[9px]">{session.className}</p>
                        </div>
                    ))
                ) : (
                    ''
                )}
            </>
        );
    };


    return (
        <div className="schedule-table !pt-[30px]">
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
                            <td className="day !text-[12px] !min-w-0">
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
    );
}

export { WorkSchedule, Schedule };