import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RecordApplication = () => {
    const [recordapplication, setRecordApplication] = useState([]);


    useEffect(() => {
        axios.post('http://localhost:8888/student/getrecor')
            .then(res => {
                console.log(res.data);
                const dt = res.data;
                const list = dt.map(recordapplication => ({
                    id: recordapplication.RecordApplicationID,
                    title: recordapplication.Title,
                    content: recordapplication.Content,
                    date: recordapplication.DateMakeApplication,
                    st: recordapplication.St,
                    studentid: recordapplication.StudentID,
                    teacherid: recordapplication.TeacherID
                }))
                setRecordApplication(list);
            })
            .catch((error) => {
                console.error('There was an error fetching the documents!', error);
            });
    }, []);

    return (
        <div className="container mx-auto mt-10 p-4 bg-white shadow rounded">
            <div>
                <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Đơn từ</a>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            {/* <th className="px-4 py-2 border border-gray-300">STT</th> */}
                            <th className="px-16 py-2 border border-gray-300">Tên văn bản</th>
                            <th className="px-16 py-2 border border-gray-300">Tải xuống</th>

                        </tr>
                    </thead>
                    <tbody>
                        {recordapplication.map((recordapplication) => (
                            <tr key={recordapplication.recordApplicationID}>
                                {/* <td className="border px-4 py-2 text-center">{recordapplication.recordApplicationID}</td> */}
                                <td className="border px-16 py-2">{recordapplication.title}</td>
                                
                                    {recordapplication.content && (
                                        <a href={recordapplication.content} download className='border px-16 py-2'>
                                            <FontAwesomeIcon icon="fa-solid fa-download" />
                                        </a>
                                    )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export { RecordApplication };
