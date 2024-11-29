import React, { useEffect, useState, useRef } from "react";
import { LayoutAdmin, Nav } from '../layout/layoutadmin';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, parseISO } from 'date-fns';
import axios from "axios";

const Message = () => {
    const adminId = sessionStorage.getItem("userId");
    const adminName = sessionStorage.getItem("teachername");
    const [listTeacher, setListTeacher] = useState([]);
    const [receiverId, setReceiverId] = useState('');
    const [receiverInfo, setReceiverInfo] = useState('');
    const [myInfo, setMyInfo] = useState('');
    const [content, setContent] = useState("");
    const [chatRoomId, setChatRoomId] = useState(null);
    const [messageRoom, setMessageRoom] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [chatMessage, setChatMessage] = useState([]);
    const [room, setRoom] = useState('');
    const [inputSend, setInputSend] = useState('');
    const modalRef = useRef(null);
    const smileButtonRef = useRef(null);
    const firstIconRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const [smilePaths, setSmilePaths] = useState([]);
    const [animalPaths, setAnimalPaths] = useState([]);
    const [treePaths, setTreePaths] = useState([]);
    const [inputData, setInputData] = useState([]);
    const [receiverEdu, setReceiverEdu] = [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputIcon, setInputIcon] = useState('');
    const [nameRoomId, setNameRoomId] = useState('');
    const [isModalColor, setIsModalColor] = useState(false);
    const [lastChat, setLastChat] = useState([]);
    const contentRef = useRef(null);
    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);
    const [isSubItem1, setIsSubItem1] = useState(false);
    const [isSubItem2, setIsSubItem2] = useState(false);
    const [isSubItem3, setIsSubItem3] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);
    const messageRefs = useRef({});
    const smileTypes = ['😃', '😃', '😄', '😁', '😆', '🥹', '😅', '😂', '🤣', '🥲', '😊', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '🥺', '😢', '😭', '😠', '😳', '😱', '😨', '😥', '🤔', '🫣', '🫢', '🫡', '🤫', '😶', '😑', '😬', '🙄', '🥱', '😴', '🥴', '🤤', '🤧'];
    const animalTypes = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🫎', '🫏', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🦭', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🪶', '🐓', '🦃', '🦤', '🦚', '🦜', '🪽', '🐦‍⬛', '🪿', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔', '🐾', '🐉', '🐲'];
    const treeTypes = ['🌵', '🎄', '🌲', '🌳', '🌴', '🪵', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🪺', '🪹', '🍄', '🐚', '🪸', '🪼', '🪨', '🌾', '💐', '🌷', '🪻', '🌹', '🥀', '🪷', '🌺', '🌸', '🌼', '🌻'];
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    const [isOpenImages, setIsOpenImages] = useState(false);
    const [isOpenFile, setIsOpenFile] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(false);
    const [listImages, setListImages] = useState([]);
    const [listFile, setListFile] = useState([]);
    const [listSearch, setListSearch] = useState([]);
    const [inputSearchMessage, setInputSearchMessage] = useState([]);
    const [inputSearchTeacher, setInputSearchTeacher] = useState([]);

    const toggleInfo = () => {
        setIsInfoOpen(prevState => !prevState);
    };

    const scrollToMessage = (messageId) => {
        console.log("Scrolling to message ID:", messageId);
        const messageElement = messageRefs.current[messageId];
        console.log("Message element:", messageElement);
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Optional: Thêm hiệu ứng nổi bật
            messageElement.classList.add('highlight');
            setTimeout(() => {
                messageElement.classList.remove('highlight');
            }, 2000);
        } else {
            console.warn("Message element not found for ID:", messageId);
        }
    };

    useEffect(() => {
        if (isOpenSearch) {
            inputRef.current.focus();
        }
    }, [isOpenSearch]);

    const [bgColor, setBgColor] = useState(() => {
        const savedColor = localStorage.getItem('chatBgColor');
        return savedColor ? savedColor : '#4F46E5';
    });

    const colorOptions = [
        '#4F46E5',
        '#FBBF24',
        '#EF4444',
        '#10B981',
        '#3B82F6',
        '#9333EA',
        '#6B7280',
        '#FF5733',
        '#C70039',
        '#900C3F',
        '#581845',
        '#FFC300',
        '#DAF7A6',
        '#FF8C00',
        '#008888',
        '#39FF14',
        '#FF1C00',
        '#FF77FF',
        '#00FFFF',
        '#FFEA00',
        '#FF00FF',
        '#00FF00',
        '#FF9000',
        '#C0C0C0',
        '#00BFFF',
        '#FF1493',
        '#7FFF00',
        '#FF4500',
        '#8A2BE2',
        '#FFD700',
        '#FF69B4',
        '#6F7B99',
        '#D5006D',
        '#00BFAE',
        '#F6EB61',
        '#FF5722'
    ];

    const handleChangeColor = (color) => {
        setBgColor(color);
        setIsModalColor(false);
        console.log("Color: " + color);
        localStorage.setItem('chatBgColor', color);
    };

    const toggleDropdown = () => {
        setIsSubItem1(!isSubItem1);
    };

    const toggleDropdown1 = () => {
        setIsSubItem2(!isSubItem2);
    };

    const toggleDropdown2 = () => {
        setIsSubItem3(!isSubItem3);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            if (isInitialLoad) {
                messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
                setIsInitialLoad(false);
            }
        }
    }, [chatRoomId, chatMessage, isInitialLoad, inputSearchMessage]);

    const handleOpenModalColor = () => {
        setIsModalColor(prev => !prev);
    };

    useEffect(() => {
        const savedColor = localStorage.getItem('chatBgColor');
        if (savedColor) {
            setBgColor(savedColor);
        }
    }, [bgColor]);

    useEffect(() => {
        axios.post('http://localhost:8888/admin/showAllTeacher')
            .then(res => {
                console.log(res.data);
                setListTeacher(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    }, []);

    useEffect(() => {
        const teacherIds = listTeacher.map(teacher => teacher.TeacherID);
        axios.post('http://localhost:8888/chat/lastSentDate', teacherIds)
            .then(res => {
                setLastChat(res.data);
            }).catch(err => {
                console.log('Error fetching messages:', err);
            });
    }, [listTeacher, lastChat]);

    const smileMap = smileTypes.map((smile, index) => ({
        path: `/assets/images/icons/smile/${index + 1}.png`,
        icon: smile
    }));

    const animalMap = animalTypes.map((animal, index) => ({
        path: `/assets/images/icons/animal/${index + 1}.png`,
        icon: animal
    }))

    const treeMap = treeTypes.map((tree, index) => ({
        path: `/assets/images/icons/tree/${index + 1}.png`,
        icon: tree
    }))

    const handleIconClick = (iconPath) => {
        setInputIcon(iconPath);
        const foundSmile = smileMap.find(icon => icon.path === iconPath);
        const foundAnimal = animalMap.find(icon => icon.path === iconPath);
        const foundTree = treeMap.find(icon => icon.path === iconPath);

        if (foundSmile) {
            setInputSend(prevInputSend => [...prevInputSend, foundSmile.icon]);
            setIsModalOpen(true);
        } else if (foundAnimal) {
            setInputSend(prevInputSend => [...prevInputSend, foundAnimal.icon]);
            setIsModalOpen(true);
        } else if (foundTree) {
            setInputSend(prevInputSend => [...prevInputSend, foundTree.icon]);
            setIsModalOpen(true);
        }
    };

    useEffect(() => {
        const basePath = '/assets/images/icons/smile/';
        const icons = [];

        for (let i = 1; i <= 64; i++) {
            icons.push(`${basePath}${i}.png`);
        }

        setSmilePaths(icons);
    }, []);

    useEffect(() => {
        const basePath = '/assets/images/icons/animal/';
        const icons = [];

        for (let i = 1; i <= 127; i++) {
            icons.push(`${basePath}${i}.png`);
        }

        setAnimalPaths(icons);
    }, [])

    useEffect(() => {
        const basePath = '/assets/images/icons/tree/';
        const icons = [];

        for (let i = 1; i <= 34; i++) {
            icons.push(`${basePath}${i}.png`);
        }

        setTreePaths(icons);
    }, [])

    const handleSendChange = (e) => {
        setInputSend(e.target.value);
    }

    useEffect(() => {
        const socket = new SockJS('http://localhost:8888/adminTeacher');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe('/chatAdminTeacher/messages/', (message) => {
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

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'tmz6fhxc');
        let resourceType = 'raw';
        if (file.type.startsWith('image/')) {
            resourceType = 'image';
        } else if (file.type.startsWith('video/')) {
            resourceType = 'video';
        }
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dlj9sdjb6/${resourceType}/upload`, formData);
            console.log('Upload thành công:', response.data);
            return response.data.secure_url;
        } catch (error) {
            console.error('Lỗi khi upload:', error.response ? error.response.data : error.message);
        }
    }

    const sendMessage = async () => {
        if (stompClient && stompClient.connected) {
            const contentToSend = Array.isArray(inputSend) ? inputSend.join(' ') : inputSend;
            if (contentToSend && !inputData.file) {
                const message = {
                    senderId: adminId,
                    chatRoom: room,
                    room: chatRoomId,
                    senderName: myInfo.nameteacher,
                    senderAvatar: myInfo.part,
                    receiverIds: receiverId,
                    receiverName: receiverInfo.nameTeacher,
                    receiverAvatar: receiverInfo.pathAvt,
                    special: '',
                    content: contentToSend,
                    isSeen: 'false',
                    lastSentDate: new Date(),
                    sentDate: new Date(),
                    sentTime: new Date(),
                    type: 'text'
                };
                stompClient.send('/app/sendMessage/', {}, JSON.stringify(message));
                setLastChat(prevMessages => [...prevMessages, contentToSend]);
                console.log("mess",message)
                setInputSend('');
                setIsExpanded(false);
            } else if (inputData.file) {
                const uploadedFileUrl = await handleUpload(inputData.file);
                const fileType = inputData.file.type;
                let messageType = 'file';

                if (fileType.startsWith('image/')) {
                    messageType = 'image';
                }

                const message = {
                    senderId: adminId,
                    chatRoom: room,
                    room: chatRoomId,
                    senderName: myInfo.nameteacher,
                    senderAvatar: myInfo.part,
                    receiverIds: receiverId,
                    receiverName: receiverInfo.nameTeacher,
                    receiverAvatar: receiverInfo.pathAvt,
                    special: uploadedFileUrl,
                    content: contentToSend,
                    isSeen: 'false',
                    lastSentDate: new Date(),
                    sentDate: new Date(),
                    sentTime: new Date(),
                    type: messageType
                };
                stompClient.send("/app/sendMessage/", {}, JSON.stringify(message));
                setInputSend("");
                setInputData(null);
                setIsExpanded(false);
                setLastChat(prevMessages => [...prevMessages, contentToSend]);
            }
        } else {
            console.error('STOMP Client is not connected or message is empty.');
        }
    };

    const sendLike = () => {
        if (stompClient) {
            const chatMessage = {
                senderId: adminId,
                chatRoom: room,
                room: chatRoomId,
                senderName: myInfo.nameteacher,
                senderAvatar: myInfo.part,
                receiverIds: receiverId,
                receiverName: receiverInfo.nameTeacher,
                receiverAvatar: receiverInfo.pathAvt,
                special: '',
                content: '👍',
                isSeen: 'false',
                lastSentDate: new Date(),
                sentDate: new Date(),
                sentTime: new Date(),
                type: 'icon'
            };

            stompClient.send("/app/sendMessage/", {}, JSON.stringify(chatMessage));
            setInputSend("");
            setIsExpanded(false);
            setLastChat(prevMessages => [...prevMessages, '👍']);
        } else {
            console.error('STOMP Client is not connected or message is empty.');
        }
    }

    const toggleModal = () => {
        setIsOpenInfo(!isOpenInfo);
    };

    const handleChooseFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleChooseImageClick = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInputData({ file: file, fileName: file.name });
            setInputSend(file.name);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInputData({ file: file, fileName: file.name, type: 'image' });
            setInputSend(prev => [...prev, file.name]);
        }
    };

    const handleDownload = (special) => {
        const link = document.createElement('a');
        link.href = special;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const toggleExpand = () => {
        if (inputSend) {
            setIsExpanded((prev) => !prev);
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current && !isInitialLoad) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatRoomId, chatMessage]);

    const handleScroll = () => {
        const container = chatContainerRef.current;
        if (container) {
            setIsInitialLoad(container.scrollTop < container.scrollHeight - container.clientHeight - 10);
        }
    };

    const handleTeacherClick = (teacherId) => {
        setReceiverId(teacherId);
        axios.post('http://localhost:8888/chat/getRoomsChat', {
            adminId: adminId,
            teacherId
        }).then(response => {
            setNameRoomId(response.data.id);
            console.log(response.data);
            if (response.data) {
                console.log(response.data);
                setChatRoomId(response.data.id);
                setChatMessage(response.data.messages || []);
                scrollToBottom();
                axios.post('http://localhost:8888/chat/getMessageChat', {
                    roomId: response.data.id
                }).then(re => {
                    const dt = re.data;
                    if (dt && dt.length > 0) {
                        const latestMessage = dt[dt.length - 1];
                        console.log(latestMessage);
                        axios.post('http://localhost:8888/chat/updateIsSeen', {
                            id: latestMessage.id
                        }).then(e => {
                            setChatMessage(re.data.map(msg =>
                                msg.id === latestMessage.id ? { ...msg, isSeen: true } : msg
                            ));
                            console.log('Success');
                        }).catch(e => {
                            console.log('Fail: ' + e);
                        })
                    }
                    console.log(re.data);
                }).catch(er => {
                    console.log('Error fetch data: ' + er);
                })
                axios.post('http://localhost:8888/chat/getChatRoomByChatRoomId', {
                    chatRoomId: response.data.id
                }).then(res => {
                    console.log(res.data);
                    setRoom(res.data);
                }).catch(err => {
                    console.log('Error fetch data: ' + err);
                })
            } else {
                createChatRoom(teacherId);
            }
        });
        axios.post('http://localhost:8888/admin/showInfoReceiver', {
            teacherId
        }).then(res => {
            setReceiverInfo(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    };

    const createChatRoom = (teacherId) => {
        axios.post('http://localhost:8888/chat/createRoomsChat', {
            adminId,
            teacherId
        }).then(response => {
            setChatRoomId(response.data.id);
            setNameRoomId(response.data.id);
        });
    };

    useEffect(() => {
        const loadMessages = (roomId) => {
            axios.post('http://localhost:8888/chat/getMessageChat', {
                roomId
            }).then(response => {
                setChatMessage(response.data);
            });
        };
        loadMessages(nameRoomId);
    }, [chatMessage])

    useEffect(() => {
        axios.post('http://localhost:8888/admin/showInfoAdmin', {
            adminId: adminId
        }).then(res => {
            console.log(res.data);
            setMyInfo(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }, []);

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'MMMM d, yyyy');
    }

    const formatTime = (timeString) => {
        const date = parseISO(timeString);
        return format(date, 'h:mm a');
    };

    const handleImageClick = () => {
        setIsOpenImages(pre => !pre);
        axios.post('http://localhost:8888/chat/getImagesFromRoom', {
            chatRoomId: chatRoomId,
            type: 'image'
        }).then(res => {
            setListImages(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    };

    const handleFileClick = () => {
        setIsOpenFile(pre => !pre);
        axios.post('http://localhost:8888/chat/getDocumentFromRoom', {
            chatRoomId: chatRoomId,
            type: 'file'
        }).then(res => {
            setListFile(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }

    const handleChangeSearch = (e) => {
        const input = e.target.value;
        setInputSearchMessage(input);
        setIsOpenSearch(true);
        console.log(input);
        axios.post('http://localhost:8888/chat/getMessageSearch', {
            chatRoomId: chatRoomId,
            content: input
        }).then(res => {
            setListSearch(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }

    const handleSearchTeacher = (e) => {
        const input = e.target.value;
        setInputSearchTeacher(input);
        axios.post('http://localhost:8888/admin/showAdminByName', {
            name: input
        }).then(res => {
            setListTeacher(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }


    const handleBackClick = () => {
        setIsOpenImages(pre => !pre);
        setIsSubItem1(false);
        setIsSubItem2(false);
        setIsSubItem3(prev => !prev);
    };

    const handleFileBackClick = () => {
        setIsOpenFile(pre => !pre);
        setIsSubItem1(false);
        setIsSubItem2(false);
        setIsSubItem3(prev => !prev);
    }

    const handleSearchBackClick = () => {
        setIsOpenSearch(pre => !pre);
        setInputSearchMessage('');
        setIsSubItem1(false);
        setIsSubItem2(false);
        setIsSubItem3(false);
    }

    const openDownImages = (special) => {
        const link = document.createElement('a');
        link.href = special;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="flex h-[729px] overflow-y-hidden">
            <LayoutAdmin />
            <div className="w-[calc(100%-256px)] pl-[20px] bg-[while] h-[729px] overflow-hidden">
                <div className="pl-3 bg-while w-[100%] h-[729px] overflow-hidden">
                    <div className="flex">
                        <div className="w-[26%] pr-[1%] relative border-r border-solid border-[#eee]">
                            <p className="text-[20px] font-[Arial] pt-3 pb-2 font-semibold tracking-wider">Tin nhắn</p>
                            <div className="flex items-center mb-5%">
                                <input
                                    className="bg-[#edf2f9] w-100% py-2 pl-[38px] rounded-[20px] focus:outline-none"
                                    type="text"
                                    placeholder="Tìm kiếm tin nhắn..."
                                    value={inputSearchTeacher}
                                    onChange={(e) => handleSearchTeacher(e)} />
                                <FontAwesomeIcon className="absolute left-0 px-3" icon="fa-solid fa-magnifying-glass" />
                            </div>
                            <div className="max-h-[calc(100vh-120px)] w-100% overflow-y-auto scroll-hidden">
                                {listTeacher.map(item => (
                                    <div key={item.TeacherID} onClick={() => handleTeacherClick(item.TeacherID)} className="flex items-center justify-between w-[300px] hover:bg-[#eee] p-2 rounded-[8px] cursor-pointer">
                                        <div className="flex items-center">
                                            <img className="w-[56px] h-[56px] mr-[8px] rounded-50" src={item.Path_Avt} />
                                            <div className="overflow-hidden">
                                                <p className="text-[15px] font-semibold font-[Arial]">{item.Name_Teacher}</p>
                                                <div className="flex">
                                                    {lastChat.map(message => (
                                                        (message.receiverIds == item.TeacherID && message.senderId == adminId) ||
                                                            (message.senderId == item.TeacherID && message.receiverIds == adminId) ? (
                                                                <div key={message.id} className="whitespace-nowrap overflow-ellipsis overflow-hidden max-w-[200px] mr-5%">
                                                                {message.type === 'image' ? (
                                                                  <span>
                                                                    {message.senderId == adminId ? 'Bạn: ' : ''}
                                                                    <FontAwesomeIcon icon="fa-solid fa-image" /> Hình ảnh
                                                                  </span>
                                                                ) : message.type === 'file' ? (
                                                                  <span>
                                                                    {message.senderId == adminId ? 'Bạn: ' : ''}
                                                                    <FontAwesomeIcon icon="fa-solid fa-file" /> Tệp
                                                                  </span>
                                                                ) : (
                                                                  <span>
                                                                    {message.senderId == adminId ? 'Bạn: ' : ''}
                                                                    {message.content}
                                                                  </span>
                                                                )}
                                                              </div>
                                                        ) : (
                                                            <p></p>
                                                        )
                                                    ))}
                                                    <span className="mt-[-2.25%] mr-[1%]">.</span>
                                                    <span>6d</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-[20px] mt-[-5%] ml-[10px] flex">
                                            {lastChat.map(message =>
                                                (message.receiverIds == item.TeacherID && message.senderId == adminId) ||
                                                (message.senderId == item.TeacherID && message.receiverIds == adminId) &&
                                                !message.isSeen && (
                                                    <div>
                                                        <FontAwesomeIcon className="text-main text-[12px]" icon="fa-solid fa-circle" />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-[75%]">
                            <div className="relative">
                                {chatRoomId && (
                                    <div className="flex">
                                        <div className={`${isInfoOpen ? 'w-[calc(100%-350px)] h-[100vh]' : 'w-[100%] h-[100vh]'} transition-all duration-300`}>
                                            <div className="flex items-center justify-between h-[72px] shadow-md px-3">
                                                <div className="flex items-center">
                                                    <img className="w-[50px] h-[50px] mr-[8px] rounded-50" src={receiverInfo.pathAvt} />
                                                    <p className="font-[Arial] font-semibold">{receiverInfo.nameTeacher}</p>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon className={`text-[20px] cursor-pointer text-main`} icon="fa-solid fa-circle-info" onClick={toggleInfo} />
                                                </div>
                                            </div>
                                            <div ref={chatContainerRef} onScroll={handleScroll} className="p-3 max-h-screen overflow-y-scroll h-[calc(100vh-120px)] pb-[50px]" >
                                                <div className="text-center mt-2.5%">
                                                    <div className="inline-block">
                                                        <img src={receiverInfo.pathAvt} className="w-[80px] h-[80px] py-1 px-1 rounded-50 transition-all duration-200 cursor-pointer group-hover:bg-transparent inline-block" />
                                                        <p className="pl-1 font-normal"></p>
                                                        <p className="pl-1 mt-[5px] mb-[10px] font-semibold">{receiverInfo.nameTeacher}</p>
                                                    </div>
                                                </div>
                                                <div className="chat-container mt-5%">
                                                    <div>
                                                    {chatMessage.map((meg, index) => (
                                                        <div
                                                            key={meg.id}
                                                            ref={(el) => { messageRefs.current[meg.id] = el; }}
                                                            className={`relative flex items-center my-2 group ${meg.senderId == adminId && meg.senderName == adminName ? 'justify-end' : 'justify-start'}`}
                                                        >
                                                            <span className={`rounded-[5px] ${meg.senderId !== adminId && meg.senderName != adminName ? 'hidden group-hover:hidden' : 'block'} text-xs text-while py-2 px-3 bg-[#3c3c3c] hidden group-hover:block z-[100001]`}>
                                                                {formatDate(meg.sentDate)}, {formatTime(meg.sentTime)}
                                                            </span>
                                                            {meg.senderId !== adminId && meg.senderName != adminName && (
                                                                <img
                                                                    src={meg.senderAvatar}
                                                                    className="w-[40px] h-[40px] rounded-50 cursor-pointer mr-[1%]"
                                                                />
                                                            )}

                                                            {meg.type === 'image' ? (
                                                                <img src={meg.special} alt="Image" className="w-[200px] h-auto rounded-[10px] cursor-pointer mr-[.5%]" />
                                                            ) : meg.type === 'file' ? (
                                                                <div onClick={() => handleDownload(meg.special)} style={{ backgroundColor: meg.senderId == adminId ? bgColor : '#f0f0f0' }}
                                                                    className={`text-white !bg-[${bgColor}] py-2 px-3 mr-[.5%] rounded-[15px] cursor-pointer`}>
                                                                    <FontAwesomeIcon className="pr-1" icon="fa-solid fa-file-lines" /><span className="font-bold">{meg.content}</span>
                                                                </div>
                                                            ) : (
                                                                <div style={{ backgroundColor: meg.senderId == adminId ? bgColor : '#f0f0f0' }}
                                                                    className={`bg-[#f0f0f0] py-2 px-3 ml-[.5%] mr-[.5%] rounded-[15px] ${meg.senderId == adminId ? `!bg-[${bgColor}] text-white` : `bg-[#f0f0f0] text-black`}`}>
                                                                    <p>{meg.content}</p>
                                                                </div>
                                                            )}
                                                            <span className={`rounded-[5px] ${meg.senderId == adminId && meg.senderName == adminName ? 'hidden group-hover:hidden' : 'block'} text-xs text-while py-2 px-3 bg-[#3c3c3c] hidden group-hover:block z-[100001]`}>
                                                                {formatDate(meg.sentDate)}, {formatTime(meg.sentTime)}
                                                            </span>

                                                            {meg.senderId == adminId && (
                                                                <></>
                                                            )}
                                                        </div>
                                                    ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-evenly items-center pt-[5px] mb-[10px] relative bottom-0 left-0 right-0 bg-white z-50">
                                                <FontAwesomeIcon className="text-[20px] text-main cursor-pointer p-2 hover:p-2 hover:bg-[#f0f0f0] hover:rounded-50" icon="fa-solid fa-circle-plus"
                                                    onClick={inputSend ? toggleExpand : 'null'} />
                                                {isExpanded && (
                                                    <div className="absolute flex flex-col bg-[#f0f0f0] shadow-md py-1 px-2 justify-start top-[-78px] rounded-10 left-[12px] z-10 space-y-1">
                                                        <div className="flex items-center cursor-pointer" onClick={handleChooseImageClick} >
                                                            <FontAwesomeIcon className="text-[20px] text-main" icon="fa-solid fa-images" />
                                                            <span className=" py-1 px-2">Hình ảnh</span>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            ref={imageInputRef}
                                                            style={{ display: 'none' }}
                                                            onChange={handleImageChange}
                                                            accept="image/*"
                                                        />
                                                        <div className="flex items-center cursor-pointer" onClick={handleChooseFileClick}>
                                                            <FontAwesomeIcon className="text-[20px] text-main" icon="fa-solid fa-paperclip" />
                                                            <span className="ml-[5px] py-1 px-2">Tệp</span>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            style={{ display: 'none' }}
                                                            onChange={handleFileChange}
                                                            accept=".pdf, .doc, .docx, .xlsx, .ppt, .pptx"
                                                        />
                                                    </div>
                                                )}
                                                {!inputSend && (
                                                    <>
                                                        <div className="relative group">
                                                            <FontAwesomeIcon className="text-[20px] text-main cursor-pointer p-2 hover:p-2 hover:bg-[#f0f0f0] hover:rounded-50" icon="fa-solid fa-images"
                                                                onClick={handleChooseImageClick} />
                                                            <div className={`absolute bottom-9 w-[fit-content] right-[-45px] text-center transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 bg-main`}>
                                                                Hình ảnh
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            ref={imageInputRef}
                                                            style={{ display: 'none' }}
                                                            onChange={handleImageChange}
                                                            accept="image/*"
                                                        />
                                                        <div className="relative group">
                                                            <FontAwesomeIcon className="text-[20px] text-main cursor-pointer p-2 hover:p-2 hover:bg-[#f0f0f0] hover:rounded-50" icon="fa-solid fa-paperclip"
                                                                onClick={handleChooseFileClick} />
                                                            <div className={`absolute bottom-9 w-[fit-content] right-[-20px] text-center transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 bg-main`}>
                                                                Tệp
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            style={{ display: 'none' }}
                                                            onChange={handleFileChange}
                                                            accept=".pdf, .doc, .docx"
                                                        />

                                                    </>
                                                )}
                                                <input className={`bg-[rgb(240,242,245)] ${inputSend ? 'w-[90%]' : 'w-[80%]'} relative transition-all duration-500 ease-in-out px-2 py-1 !pr-10 rounded-10 focus:outline-none text-[16px]`}
                                                    placeholder="Aa"
                                                    value={Array.isArray(inputSend) ? inputSend.join(' ') : inputSend}
                                                    onChange={handleSendChange}
                                                />
                                                <div className={`absolute ${isInfoOpen ? 'right-[38px]' : 'right-[60px]'} ${inputSend ? 'right-[54px]' : 'right-[60px]'} pt-1`}>
                                                    <FontAwesomeIcon ref={smileButtonRef} onClick={() => setIsModalOpen(prevState => !prevState)} className="text-[20px] text-main cursor-pointer relative" icon="fa-solid fa-smile" />
                                                    {isModalOpen && (
                                                        <div className="absolute bottom-10 right-[-20px] flex justify-center items-center bg-black bg-opacity-50 z-50">
                                                            <div
                                                                ref={modalRef}
                                                                className="bg-white p-6 rounded-lg shadow-lg max-h-[400px] w-[350px] overflow-y-scroll hide-scrollbar scroll-hidden"
                                                            >
                                                                <h2 className="text-[12px] mb-5%">Smileys & People</h2>
                                                                <div className="grid grid-cols-8 gap-0">
                                                                    {smilePaths.map((icon, index) => (
                                                                        <img
                                                                            key={index}
                                                                            ref={index === 0 ? firstIconRef : null}
                                                                            src={icon}
                                                                            alt={`Icon ${index + 1}`}
                                                                            className="w-[30px] h-[30px] space-x-2 hover:bg-[#dfdfdf] p-1 rounded-[5px] cursor-pointer"
                                                                            onClick={() => handleIconClick(icon)}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <h2 className="text-[12px] mb-5% mt-5%">Animal</h2>
                                                                <div className="grid grid-cols-8 gap-0">
                                                                    {animalPaths.map((icon, index) => (
                                                                        <img
                                                                            key={index}
                                                                            src={icon}
                                                                            alt={`Icon ${index + 1}`}
                                                                            className="w-[30px] h-[30px] space-x-2 hover:bg-[#dfdfdf] p-1 rounded-[5px] cursor-pointer"
                                                                            onClick={() => handleIconClick(icon)}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <h2 className="text-[12px] mb-5% mt-5%">Tree</h2>
                                                                <div className="grid grid-cols-8 gap-0">
                                                                    {treePaths.map((icon, index) => (
                                                                        <img
                                                                            key={index}
                                                                            src={icon}
                                                                            alt={`Icon ${index + 1}`}
                                                                            className="w-[30px] h-[30px] space-x-2 hover:bg-[#dfdfdf] p-1 rounded-[5px] cursor-pointer"
                                                                            onClick={() => handleIconClick(icon)}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <FontAwesomeIcon className="text-[20px] text-main cursor-pointer p-2 hover:p-2 hover:bg-[#f0f0f0] hover:rounded-50"
                                                    icon={inputSend ? "fa-solid fa-paper-plane" : "fa-solid fa-thumbs-up"}
                                                    onClick={inputSend ? sendMessage : sendLike} />
                                            </div>
                                        </div>

                                        {isInfoOpen && (
                                            <div className="w-[350px] bg-gray-200 pt-4 py-2 text-center">
                                                {isOpenImages ? (
                                                    <div>
                                                        <div onClick={handleBackClick} className="px-3 text-left text-[18px] cursor-pointer">
                                                            <FontAwesomeIcon className="mr-[15px]" icon="fa-solid fa-arrow-left" />
                                                            <span className="font-[Arial] tracking-wider">Ảnh</span>
                                                        </div>
                                                        <div className="flex flex-wrap justify-start px-2 mt-4 max-h-screen overflow-y-scroll hide-scrollbar scroll-hidden">
                                                            {listImages.map((image, index) => (
                                                                <div key={index} className="w-1/3 p-1">
                                                                    <img
                                                                        onClick={() => openDownImages(image.special)}
                                                                        src={image.special}
                                                                        alt={`Ảnh ${index + 1}`}
                                                                        className="w-[100px] h-[80px] rounded cursor-pointer"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : isOpenFile ? (
                                                    <div>
                                                        <div onClick={handleFileBackClick} className="px-3 text-left text-[18px] cursor-pointer">
                                                            <FontAwesomeIcon className="mr-[15px]" icon="fa-solid fa-arrow-left" />
                                                            <span className="font-[Arial] tracking-wider">Tệp</span>
                                                        </div>
                                                        <div className="flex flex-wrap justify-start px-2 mt-4 max-h-screen overflow-y-scroll hide-scrollbar scroll-hidden">
                                                            {listFile.map((file, index) => (
                                                                <div key={index} className="w-100% p-1 mb-[5px]">
                                                                    <p onClick={() => handleDownload(file.special)} className="cursor-pointer text-[18px] py-3 px-3 rounded-[5px] text-blue-500 flex hover:bg-[#dfdfdf]">
                                                                        <FontAwesomeIcon className="mr-[6%] text-[24px]" icon="fa-solid fa-file-lines" />
                                                                        <div className="whitespace-nowrap overflow-ellipsis overflow-hidden max-w-[300px]">{file.content}</div>
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : isOpenSearch ? (
                                                    <div>
                                                        <div onClick={handleSearchBackClick} className="px-3 text-left text-[18px] cursor-pointer">
                                                            <FontAwesomeIcon className="mr-[15px]" icon="fa-solid fa-arrow-left" />
                                                            <span className="font-[Arial] tracking-wider">Tìm kiếm tin nhắn</span>
                                                        </div>
                                                        <input
                                                            ref={inputRef}
                                                            className="bg-[#edf2f9] w-[100%] mt-[15px] py-2 pl-[15px] rounded-[20px] focus:outline-none"
                                                            type="text"
                                                            placeholder="Tìm kiếm tin nhắn..."
                                                            value={inputSearchMessage}
                                                            onChange={(e) => handleChangeSearch(e)}
                                                        />
                                                        <div className="max-h-[calc(100vh-160px)] overflow-y-auto scroll-hidden my-5%">
                                                            {listSearch.length > 0 ? (
                                                                listSearch.map((item, index) => (
                                                                    <div
                                                                        key={item.id}
                                                                        onClick={() => scrollToMessage(item.id)}
                                                                        className="flex items-center py-3 px-2 rounded-[5px] cursor-pointer mx-[10px] hover:bg-[#dfdfdf]">
                                                                        <img className="w-[45px] h-[45px] rounded-50" src={item.senderAvatar} />
                                                                        <div className="ml-[10px]">
                                                                            <div className="text-left font-medium">
                                                                                {item.senderName}
                                                                            </div>
                                                                            <div className="text-left whitespace-nowrap overflow-ellipsis overflow-hidden max-w-[220px]">
                                                                                {item.content}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="flex items-center justify-center py-3 px-2 rounded-[5px] cursor-pointer mx-[10px]">
                                                                    <p className="">Không có dữ liệu</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <img
                                                            className="w-[80px] h-[80px] rounded-50 inline-block mb-[10px]"
                                                            src={receiverInfo.pathAvt}
                                                            alt="Avatar"
                                                        />
                                                        <p className="text-[18px] font-semibold">{receiverInfo.nameTeacher}</p>

                                                        <div className="flex items-center relative px-4">
                                                            <input
                                                                className="bg-[#edf2f9] w-[100%] mt-[15px] py-2 pl-[15px] rounded-[20px] focus:outline-none"
                                                                type="text"
                                                                placeholder="Tìm kiếm tin nhắn..."
                                                                value={inputSearchMessage}
                                                                onChange={(e) => handleChangeSearch(e)}
                                                            />
                                                            <FontAwesomeIcon
                                                                className="absolute right-5 px-3 pt-3"
                                                                icon="fa-solid fa-magnifying-glass"
                                                            />
                                                        </div>

                                                        <div className="px-1 pt-8">
                                                            <div>

                                                                <div>
                                                                    <div
                                                                        className="flex items-center justify-between cursor-pointer py-2 px-2 hover:bg-[#eee] rounded-[5px]"
                                                                        onClick={toggleDropdown}
                                                                    >
                                                                        <p className="font-medium">Thông tin</p>
                                                                        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                                                                    </div>
                                                                    <div
                                                                        ref={contentRef}
                                                                        className={`${isSubItem1 ? "dropdown-enter-active" : "dropdown-exit-active"} dropdown-enter`}
                                                                        style={{ height: isSubItem1 ? `${contentRef.current.scrollHeight}px` : "0px" }}
                                                                    >
                                                                        <div className="px-2">
                                                                            <p
                                                                                onClick={toggleModal}
                                                                                className="text-left py-2 px-2 rounded-[5px] hover:bg-[#eee] cursor-pointer"
                                                                            >
                                                                                <FontAwesomeIcon className="mr-5%" icon="fa-solid fa-user" />Thông tin cá nhân
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <div
                                                                        className="flex items-center justify-between cursor-pointer py-2 px-2 hover:bg-[#eee] rounded-[5px]"
                                                                        onClick={toggleDropdown1}
                                                                    >
                                                                        <p className="font-medium">Tùy chỉnh</p>
                                                                        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                                                                    </div>
                                                                    <div
                                                                        ref={contentRef1}
                                                                        className={`${isSubItem2 ? "dropdown-enter-active" : "dropdown-exit-active"} dropdown-enter`}
                                                                        style={{ height: isSubItem2 ? `${contentRef1.current.scrollHeight}px` : "0px" }}
                                                                    >
                                                                        <div className="px-2">
                                                                            <p
                                                                                onClick={handleOpenModalColor}
                                                                                className="text-left py-2 px-2 rounded-[5px] hover:bg-[#eee] cursor-pointer"
                                                                            >
                                                                                <FontAwesomeIcon className="mr-5%" icon="fa-solid fa-palette" />Màu sắc đoạn chat
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    {isModalColor && (
                                                                        <div
                                                                            onClick={handleOpenModalColor}
                                                                            className="fixed inset-0 z-40 bg-black bg-[rgba(0,0,0,.5)] flex justify-center items-center cursor-pointer"
                                                                        >
                                                                            <div
                                                                                className="bg-white w-[600px] h-[400px] rounded-lg shadow-lg p-4"
                                                                                onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện lan truyền khi nhấp vào nội dung modal
                                                                            >
                                                                                <div className="flex justify-between">
                                                                                    <p className="text-[20px] italic mb-2 text-left">Đổi màu</p>
                                                                                    <div onClick={() => setIsModalColor(false)}> {/* Đóng modal */}
                                                                                        <FontAwesomeIcon className="text-[24px]" icon="fa-solid fa-circle-xmark" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex flex-wrap space-x-2 mb-[2.5%]">
                                                                                    {colorOptions.map((color, index) => (
                                                                                        <div
                                                                                            key={index}
                                                                                            onClick={() => handleChangeColor(color)}
                                                                                            className="w-[calc(100%/12)] h-[55px] rounded-full cursor-pointer !ml-0 mb-[2.5%] !mr-[2.5%]"
                                                                                            style={{ backgroundColor: color }}
                                                                                        />
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div>
                                                                    <div
                                                                        className="flex items-center justify-between cursor-pointer py-2 px-2 hover:bg-[#eee] rounded-[5px]"
                                                                        onClick={toggleDropdown2}
                                                                    >
                                                                        <p className="font-medium">Ảnh & tệp</p>
                                                                        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                                                                    </div>
                                                                    <div
                                                                        ref={contentRef2}
                                                                        className={`${isSubItem3 ? "dropdown-enter-active" : "dropdown-exit-active"} dropdown-enter`}
                                                                        style={{ height: isSubItem3 ? `${contentRef2.current.scrollHeight}px` : "0px" }}
                                                                    >
                                                                        <div className="px-2">
                                                                            <p
                                                                                onClick={handleImageClick}
                                                                                className="text-left py-2 px-2 rounded-[5px] hover:bg-[#eee] cursor-pointer"
                                                                            >
                                                                                <FontAwesomeIcon className="mr-5%" icon="fa-solid fa-image" />Ảnh
                                                                            </p>
                                                                            <p
                                                                                onClick={handleFileClick}
                                                                                className="text-left py-2 px-2 rounded-[5px] hover:bg-[#eee] cursor-pointer"
                                                                            >
                                                                                <FontAwesomeIcon className="mr-[6%]" icon="fa-solid fa-file" />Tệp
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <div
                                                                        className="flex items-center justify-between cursor-pointer py-2 px-2 hover:bg-[#eee] rounded-[5px]"
                                                                    >
                                                                        <p className="font-medium">Chính sách</p>
                                                                        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {isOpenInfo && (
                                                            <div
                                                                onClick={toggleModal}
                                                                className="fixed inset-0 bg-gray-600 bg-[rgba(0,0,0,.5)] flex justify-center items-center z-50 cursor-pointer"
                                                            >
                                                                <div
                                                                    className="bg-white w-[500px] p-5 rounded-lg h-[350px]"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <div className="flex items-center justify-center">
                                                                        <img
                                                                            className="w-[80px] h-[80px] rounded-full mr-[12px]"
                                                                            src={receiverInfo.pathAvt}
                                                                            alt="Avatar"
                                                                        />
                                                                    </div>
                                                                    <div className="mt-5%">
                                                                        <span className="text-[18px] font-medium font-[Arial]">
                                                                            {receiverInfo.nameTeacher}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex justify-between mt-2.5%">
                                                                        <div className="space-y-2 text-right ml-10%">
                                                                            <p>Ngày sinh:</p>
                                                                            <p>Giới tính:</p>
                                                                            <p>Địa chỉ e-mail:</p>
                                                                            <p>Số điện thoại:</p>
                                                                        </div>
                                                                        <div className="space-y-2 text-left">
                                                                            <p>{receiverInfo.birthday}</p>
                                                                            <p>{receiverInfo.gender}</p>
                                                                            <p>{receiverInfo.email}</p>
                                                                            <p>{receiverInfo.phone}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {isOpenImages && (
                                                            <div>
                                                                <div onClick={handleBackClick} className="px-3 text-left text-[18px] cursor-pointer">
                                                                    <FontAwesomeIcon className="mr-[5px]" icon="fa-solid fa-arrow-left" />
                                                                    <span className="font-[Arial] tracking-wider">Ảnh</span>
                                                                </div>
                                                                <div className="flex flex-wrap justify-start px-2 mt-4 max-h-screen overflow-y-scroll hide-scrollbar scroll-hidden">
                                                                    {listImages.map((image, index) => (
                                                                        <div key={index} className="w-1/3 p-1">
                                                                            <img
                                                                                onClick={() => openDownImages(image.special)}
                                                                                src={image.special}
                                                                                alt={`Ảnh ${index + 1}`}
                                                                                className="w-[100px] h-[80px] rounded cursor-pointer"
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {isOpenFile && (
                                                            <div>
                                                                <div onClick={handleBackClick} className="px-3 text-left text-[18px] cursor-pointer">
                                                                    <FontAwesomeIcon className="mr-[5px]" icon="fa-solid fa-arrow-left" />
                                                                    <span className="font-[Arial] tracking-wider">Tệp</span>
                                                                </div>
                                                                <div className="flex flex-wrap justify-start px-2 mt-4 max-h-screen overflow-y-scroll hide-scrollbar scroll-hidden">
                                                                    {listFile.map((file, index) => (
                                                                        <div key={index} className="w-1/3 p-1">
                                                                            <p

                                                                                className="cursor-pointer text-[18px] underline text-blue-500"
                                                                            >
                                                                                <FontAwesomeIcon className="mr-[6%]" icon="fa-solid fa-file" /> {file.name}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export { Message }