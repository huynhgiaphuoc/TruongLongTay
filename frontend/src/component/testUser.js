import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import React, { useState, useEffect } from 'react';

const Userstatus = () => {
    const [userStatus, setUserStatus] = useState([]);

    useEffect(() => {
        const savedStatus = JSON.parse(sessionStorage.getItem('userStatus')) || [];
        setUserStatus(savedStatus);

        const socket = new SockJS('http://localhost:8888/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/user-status', (message) => {
                console.log('User status:', message.body);
                const newStatus = JSON.parse(message.body);
                console.log('New status received:', newStatus);
                console.log('userStatus', newStatus.avatar);

                setUserStatus((prevStatus) => {
                    console.log("prevStatus",prevStatus)


                    const existingIndex = prevStatus.findIndex(status => status.teacherID === newStatus.teacherID);
                                   

                    if (existingIndex !== -1) {
                        // Nếu đã tồn tại, cập nhật thông tin
                        const updatedStatus = [...prevStatus];
                        updatedStatus[existingIndex] = newStatus; // Cập nhật thông tin
                        sessionStorage.setItem('userStatus', JSON.stringify(updatedStatus));
                        console.log('Updated userStatus:', updatedStatus);
                        return updatedStatus;
                    } else {
                        // Nếu chưa tồn tại, thêm mới
                        const updatedStatus = [...prevStatus, newStatus];
                        sessionStorage.setItem('userStatus', JSON.stringify(updatedStatus));
                        console.log('Added new userStatus:', updatedStatus);
                        return updatedStatus;
                    }
                });
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect(() => {
                    console.log('Disconnected');
                });
            }
        };
    }, []);

    return (
        <div>
            <h1>WebSocket Status</h1>
            <ul>
                {userStatus.map((status, index) => (
                    <li key={index}>{status.nameTeacher} is {status.avatar}</li>
                ))}
            </ul>
        </div>
    );
};

export default Userstatus;
