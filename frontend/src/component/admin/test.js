import React, { useEffect, useState } from "react";
import { SideBar, Navigator } from '../layout/layoutteacher';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const TestSocket = () => {
    const adminId = sessionStorage.getItem('adminId');
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [listAdmin, setListAdmin] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderAvt, setSenderAvt] = useState('');
    const [receiver, setReceiver] = useState('');

    useEffect(() => {
        const socket = new SockJS('http://localhost:8888/adminTeacher');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/chatAdminTeacher/messages', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessage(prevMessages => [...prevMessages, receivedMessage]);
            });
        });
        setStompClient(stompClient);

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect(() => {
                    console.log('Disconnected');
                });
            } else {
                console.log('No active connection to disconnect');
            }
        };
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post('http://localhost:8888/teachers/getChatAdminTeacher');
                console.log(response.data);
                setMessages(response.data);
                const list = response.data;
                const dt = list.map(item => ({
                    id: item.senderId
                }))
                setReceiver(dt[0].id);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
        fetchMessages();
    }, [messages]);

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/getInforSenderChat', {
            teacherId: receiver
        }).then(res => {
            console.log(res.data);
            setSenderName(res.data.nameTeacher);
            setSenderAvt(res.data.pathAvt + res.data.avatar);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }, [receiver])

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/getAllAdmin')
            .then(res => {
                const list = res.data;
                const dt = list.map(ad => ad.teacherteachingserviceID);
                setListAdmin(dt);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    })

    const sendMessage = () => {
        if (stompClient && messageContent) {
            console.log('Sending message:', adminId);
            const chatMessage = {
                senderId: adminId,
                senderName: 'Quản trị viên',
                senderAvatar: '/assets/images/apps/LOGOTRUONG.png',
                receiverIds: [receiver],
                receiverName: senderName,
                receiverAvatar: senderAvt,
                isSeen: 'Đã nhận',
                content: messageContent
            };

            stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
            setMessageContent("");
        } else {
            console.error('STOMP Client is not connected or message is empty.');
        }
    }

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        const day = format(date, 'd');
        const month = format(date, 'MM');
        const monthNames = ['TH1', 'TH2', 'TH3', 'TH4', 'TH5', 'TH6', 'TH7', 'TH8', 'TH9', 'TH10', 'TH11', 'TH12'];
        return `${day} ${monthNames[parseInt(month) - 1]}`;
    }

    const formatTime = (timeString) => {
        const date = parseISO(timeString);
        return format(date, 'HH:mm');
    };

    return (
        <>
            <div id='dashboard'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        <div id="inclass">
                            <div id="header-class" className="mt-[10px] flex">
                                <p className="text-[Arial] text-[18px] font-medium">Duyệt đơn </p>
                                <input
                                    type="text"
                                    value={messageContent}
                                    onChange={e => setMessageContent(e.target.value)}
                                    placeholder="Nhập tin nhắn"
                                />
                                <button onClick={sendMessage}>Gửi</button>
                                <br />
                            </div>
                            <div>
                                {messages.map((meg, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center my-2 ml-2.5% ${meg.senderId == adminId && meg.senderName == senderName ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {meg.senderId == receiver && (
                                            <>
                                                <img src={meg.senderAvatar} alt={meg.senderName} className="w-[40px] h-[40px] rounded-[50%]" />
                                            </>
                                        )}
                                        <div className={`bg-[#f0f0f0] py-2 px-3 ml-2.5% mr-2.5% rounded-[10px] ${meg.senderId == adminId ? 'bg-main text-white' : 'bg-gray-200 text-black'}`}>
                                            <p>{meg.content}</p>
                                        </div>
                                        {meg.senderId !== adminId && meg.senderName != senderName && (
                                            <>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Navigator />
                </div>
            </div>
        </>
    )
}

export default TestSocket;
