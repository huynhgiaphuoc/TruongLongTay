import { React, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-brands-svg-icons';
import axios from "axios";
import { useLocation } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import '../../assets/css/style.css';
import { format, parseISO } from 'date-fns';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const SideBar = () => {
    const teacherId = sessionStorage.getItem('userId');
    const [teacherName, setTeacherName] = useState('');
    const [teacherCode, setTeacherCode] = useState('');
    const [activeItem, setActiveItem] = useState('Trang chủ');
    const [path, setPath] = useState('');
    const [avt, setAvt] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleTeacher = () => {
        axios.post('http://localhost:8888/teachers/dashboard', {
            teacherId
        }).then(response => {
            const rdata = response.data;
            setTeacherName(rdata.nameTeacher);
            setTeacherCode(rdata.officer);
            setPath(rdata.pathAvt);
            setAvt(rdata.avatar);
        })
            .catch(error => {
                console.error('Error fetching teacher data:', error);
            });
    };

   const handleLogout = async () => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        console.log("userId", token);
        Swal.fire({
            title: 'Bạn có muốn đăng xuất khỏi tài khoản?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đăng xuất!',
            cancelButtonText: 'Hủy bỏ'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post('http://localhost:8888/account/logout', {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log(response.data);
                    sessionStorage.clear();
                    
                    window.location.href = '/';
                } catch (error) {
                    console.error("Đăng xuất thất bại", error);
                }
            } else {
                Swal.fire({
                    title: 'Đã hủy',
                    text: 'Bạn đã hủy việc đăng xuất!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }

    useEffect(() => {
        handleTeacher();
    }, []);

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveItem("Trang chủ");
        } else if (location.pathname.includes("class")) {
            setActiveItem("Lớp học");
        } else if (location.pathname.includes("point")) {
            setActiveItem("Điểm số");
        } else if (location.pathname.includes("tutoring")) {
            setActiveItem("Lớp phụ đạo");
        } else if (location.pathname.includes("workschedule")) {
            setActiveItem("Lịch giảng dạy");
        } else if (location.pathname.includes("room")) {
            setActiveItem("Mượn phòng");
        } else if (location.pathname.includes("infomation")) {
            setActiveItem("Tài khoản");
        } else if (location.pathname.includes("news")) {
            setActiveItem("Tin tức");
        } else if (location.pathname.includes("approve")) {
            setActiveItem("Duyệt đơn");
        } else {
            setActiveItem('')
        }
    }, [location]);

    return (
        <>
            <div id="sidebar" className="fixed top-0">
                <div className="w-[200px] h-[100vh] bg-[#2d3250]">
                    <div className="pt-2.5%">
                        <div className="flex ml-[10px] mr-[10px] pt-[15px]">
                            <img className="w-[50px] h-[50px] rounded-50 inline-block" src="/assets/images/apps/LOGOTRUONG.png" />
                            <div>
                                <p className="text-[#f9b17a] text-[14px] font-bold font-[Arial] pt-[15px] ml-[5px]">Trường Long Tây</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[15px] ml-[10px]">
                        <div className="text-[14px] italic text-while">
                            Bảng điều khiển
                        </div>
                        <ul className="pl-[20px] pr-[20px] pt-[20px]">
                            <li className="">
                                <a className={`text-[#f9b17a] flex hover:no-underline hover:text-[#f9b17a] hover:opacity-60 transition-all duration-200 ${activeItem === 'Trang chủ' ? 'opacity-60' : 'opacity-100'}`} href="/teachers">
                                    <div className="w-[20px]">
                                        <FontAwesomeIcon icon="fa-brands fa-windows" className="text-[20px]" />
                                    </div>
                                    <p className="ml-[15px]">Trang chủ</p>
                                </a>
                            </li>
                            <li className="flex items-center pt-[20px]">
                                <a className={`text-[#f9b17a] flex hover:no-underline hover:text-[#f9b17a] hover:opacity-60 transition-all duration-200 ${activeItem === 'Lớp học' ? 'opacity-60' : 'opacity-100'}`} href="/class">
                                    <div className="w-[20px]">
                                        <FontAwesomeIcon icon="fa-solid fa-layer-group" className="text-[20px]" />
                                    </div>
                                    <p className="ml-[15px]">Lớp học</p>
                                </a>
                            </li>
                            <li className="flex items-center pt-[20px]">
                                <a className={`text-[#f9b17a] flex hover:no-underline hover:text-[#f9b17a] hover:opacity-60 transition-all duration-200 ${activeItem === 'Lịch giảng dạy' ? 'opacity-60' : 'opacity-100'}`} href="/workschedule">
                                    <div className="w-[20px]">
                                        <FontAwesomeIcon icon="fa-solid fa-calendar-days" className="text-[20px]" />
                                    </div>
                                    <p className="ml-[15px]">Lịch giảng dạy</p>
                                </a>
                            </li>
                            <li className="flex items-center pt-[20px]">
                                <a className={`text-[#f9b17a] flex hover:no-underline hover:text-[#f9b17a] hover:opacity-60 transition-all duration-200 ${activeItem === 'Lớp phụ đạo' ? 'opacity-60' : 'opacity-100'}`} href="/tutoring">
                                    <div className="w-[20px]">
                                        <FontAwesomeIcon icon="fa-brands fa-codepen" className="text-[20px]" />
                                    </div>
                                    <p className="ml-[15px]">Lớp phụ đạo</p>
                                </a>
                            </li>
                            <li className="flex items-center pt-[20px]">
                                <a className={`text-[#f9b17a] flex hover:no-underline hover:text-[#f9b17a] hover:opacity-60 transition-all duration-200 ${activeItem === 'Mượn phòng' ? 'opacity-60' : 'opacity-100'}`} href="/room">
                                    <div className="w-[20px]">
                                        <FontAwesomeIcon icon="fa-solid fa-door-open" className="text-[20px]" />
                                    </div>
                                    <p className="ml-[15px]">Mượn phòng</p>
                                </a>
                            </li>
                            <li className="flex items-center pt-[20px]">
                                <a className={`text-[#f9b17a] flex hover:no-underline hover:text-[#f9b17a] hover:opacity-60 transition-all duration-200 ${activeItem === 'Điểm số' ? 'opacity-60' : 'opacity-100'}`} href="/point">
                                    <div className="w-[20px]">
                                        <FontAwesomeIcon icon="fa-solid fa-print" className="text-[20px]" />
                                    </div>
                                    <p className="ml-[15px]">Điểm</p>
                                </a>
                            </li>
                            <li className="flex items-center pt-[20px] pb-[15px]">
                                <a className={`text-[#f9b17a] flex hover:no-underline hover:text-[#f9b17a] hover:opacity-60 transition-all duration-200 ${activeItem === 'Duyệt đơn' ? 'opacity-60' : 'opacity-100'}`} href="/approve">
                                    <div className="w-[20px]">
                                        <FontAwesomeIcon icon="fa-solid fa-clipboard-user" className="text-[20px]" />
                                    </div>
                                    <p className="ml-[15px]">Duyệt đơn</p>
                                </a>
                            </li>
                        </ul>
                        <div className="text-[14px] italic text-while">
                            Về tài khoản
                        </div>
                        <ul className="pl-[20px] pr-[20px] pt-[20px]">
                            <li className="flex items-center pt-[5px]">
                                <a className={`text-[#f9b17a] flex hover:no-underline hover:text-[#f9b17a] hover:opacity-60 transition-all duration-200 ${activeItem === 'Tài khoản' ? 'opacity-60' : 'opacity-100'}`} href="/infomation">
                                    <div className="w-[20px]">
                                        <FontAwesomeIcon icon="fa-solid fa-user" className="text-[20px]" />
                                    </div>
                                    <p className="ml-[15px]">Tài khoản</p>
                                </a>
                            </li>

                        </ul>
                        <div className="pl-[20px] pr-[20px] pt-[20px]">
                            <a onClick={handleLogout} className="text-[#f9b17a] cursor-pointer flex hover:no-underline hover:text-[#f9b17a] hover:opacity-60 transition-all duration-150">
                                <div className="w-[20px]">
                                    <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className="text-[20px] text-[#f9b17a]" />
                                </div>
                                <p className="ml-[15px] text-[#f9b17a]">Đăng xuất</p>
                            </a>
                        </div>
                        <div className="flex mr-[10px] mt-[100px] pt-[30px] cursor-pointer">
                            <img className="w-[40px] h-[40px] object-cover rounded-10 inline-block" src={path} />
                            <div>
                                <p className="text-[#f9b17a] text-[14px] font-bold font-[Arial] mb-[0px] ml-[5px]">{teacherName}</p>
                                <p className="text-[#f9b17a] text-[14px] font-bold font-[Arial] ml-[5px]">#{teacherCode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Navigator = () => {
    const teacherId = sessionStorage.getItem('userId');
    const teacherName = sessionStorage.getItem("teachername");
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const [nextSession, setNextSession] = useState('');
    const [classId, setClassId] = useState('');
    const [nextClass, setNextClass] = useState('');
    const { transcript, resetTranscript } = useSpeechRecognition();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMinisizeChat, setIsMinisizeChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [channel, setChannel] = useState('');
    const chatContainerRef = useRef(null);
    const chatRef = useRef(null);
    const [newNotificationCount, setNewNotificationCount] = useState(0);
    const [newChat, setNewChat] = useState(0);
    const [client, setClient] = useState(null);
    const [isNotificationAdded, setIsNotificationAdded] = useState(false);
    const [lastMessageContent, setLastMessageContent] = useState(null);
    const [inputSend, setInputSend] = useState('');
    const [chatMessage, setChatMessage] = useState([]);
    const [listAdmin, setListAdmin] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderAvt, setSenderAvt] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [myInfo, setMyInfo] = useState('');
    const [lastChat, setLastChat] = useState('');
    const modalRef = useRef(null);
    const smileButtonRef = useRef(null);
    const firstIconRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const [smilePaths, setSmilePaths] = useState([]);
    const [animalPaths, setAnimalPaths] = useState([]);
    const [treePaths, setTreePaths] = useState([]);
    const [inputData, setInputData] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputIcon, setInputIcon] = useState('');
    const [isModalColor, setIsModalColor] = useState(false);
    const [admin, setAdmin] = useState([]);
    const [adminId, setAdminId] = useState('');
    const [chatRoomId, setChatRoomId] = useState(null);
    const [receiverId, setReceiverId] = useState('');
    const [nameRoomId, setNameRoomId] = useState('');
    const [room, setRoom] = useState('');
    const [receiverInfo, setReceiverInfo] = useState('');
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const smileTypes = ['😃', '😃', '😄', '😁', '😆', '🥹', '😅', '😂', '🤣', '🥲', '😊', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '🥺', '😢', '😭', '😠', '😳', '😱', '😨', '😥', '🤔', '🫣', '🫢', '🫡', '🤫', '😶', '😑', '😬', '🙄', '🥱', '😴', '🥴', '🤤', '🤧'];
    const animalTypes = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🫎', '🫏', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🦭', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🪶', '🐓', '🦃', '🦤', '🦚', '🦜', '🪽', '🐦‍⬛', '🪿', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔', '🐾', '🐉', '🐲'];
    const treeTypes = ['🌵', '🎄', '🌲', '🌳', '🌴', '🪵', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🪺', '🪹', '🍄', '🐚', '🪸', '🪼', '🪨', '🌾', '💐', '🌷', '🪻', '🌹', '🥀', '🪷', '🌺', '🌸', '🌼', '🌻'];
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
        console.log("Color: " + color);
        setShowChat(true);
        setIsModalColor(true);
        localStorage.setItem('chatBgColor', color);
    };

    useEffect(() => {
        axios.post('http://localhost:8888/admin/gettAdmin')
            .then(res => {
                setAdmin(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    }, [])

    useEffect(() => {
        const savedColor = localStorage.getItem('chatBgColor');
        if (savedColor) {
            setBgColor(savedColor);
        }
    }, [bgColor]);

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

    const handleOpenModalColor = () => {
        setIsModalColor(prev => !prev);
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            setIsUserScrolling(scrollTop + clientHeight < scrollHeight - 50);
        }
    };

    useEffect(() => {
        if (!isUserScrolling) {
            scrollToBottom();
        }
    }, [chatMessage]);

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

    const handleClickOutside = (event) => {
        if (
            modalRef.current && !modalRef.current.contains(event.target) &&
            smileButtonRef.current && !smileButtonRef.current.contains(event.target)
        ) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            if (modalRef.current) {
                const h2Element = modalRef.current.querySelector('h2');
                if (h2Element) {
                    modalRef.current.scrollTop = h2Element.offsetTop;
                }
            }
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    const handleVoiceCommand = () => {
        if (transcript.includes("tìm kiếm")) {
            console.log("Thực hiện tìm kiếm");
            resetTranscript();
            SpeechRecognition.stopListening();
        } else if (transcript.includes("đi tới trang chủ") || transcript.includes("tới trang chủ") || transcript.includes("trang chủ") || transcript.includes("đi đến trang chủ") || transcript.includes("đến trang chủ")) {
            console.log("Đi tới trang chủ");
            navigate('/teachers');
            resetTranscript();
            SpeechRecognition.stopListening();
        }
    }

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                fetchWeather(latitude, longitude);
            }, error => {
                console.error('Geolocation is not supported by this browser.');
            })
        }
    }

    const fetchWeather = (latitude, longitude) => {
        const apiKey = '007b791eaf3705d00846f7d38028fcd3';
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        axios.get(weatherUrl)
            .then(response => {
                setWeather(response.data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/nextschedule', {
            teacherId: teacherId
        }).then(response => {
            const dt = response.data;
            setNextSession(dt);
            setClassId(dt.classID.classID);
            axios.post('http://localhost:8888/teachers/nextschedule/getclass', {
                classId: dt.classID.classID
            }).then(response => {
                const list = response.data;
                const ls = list.map(item => ({
                    id: item.ClassID,
                    code: item.Class_Code,
                    name: item.Class_Name,
                    sic: item.Sic,
                    combi: item.Subject_CombinationID,
                    year: item.school_year
                }));
                setNextClass(ls[0].name);
            }).catch(error => {
                console.log('Error fetch data: ' + error);
                setNextClass('Không có!');
            })
        }).catch(error => {
            setNextClass('Không có!');
            console.log('Error fetch data: ' + error);
        })
    }, [teacherId]);

    useEffect(() => {
        getCurrentLocation();
        handleVoiceCommand();
    }, [transcript]);

    const handleCloseChat = () => {
        setShowChat(false);
        setIsMinisizeChat(false);
        setIsModalColor(false);
    }

    const handleMinisizeChat = () => {
        setIsMinisizeChat(true);
        setShowChat(false);
        setIsModalColor(false);
    }

    const handleOpenToMinisizeChat = () => {
        setIsMinisizeChat(false);
        setShowChat(true);
    }

    useEffect(() => {
        setIsNotificationAdded(false);
        setLastMessageContent('');
    }, []);

    const handleCloseChannel = () => {
        setShowForm(false);
        setIsMinimized(false);
    };

    const handleOpenToMinimize = () => {
        setIsMinimized(false);
        setShowForm(true);
    }

    const handleTeacherClick = (teacher) => {
        setReceiverId(teacher);
        console.log(teacher);
        console.log("DataTeacher: " + teacher);
        console.log("Data: " + teacherId);
        setShowChat(true);
        axios.post('http://localhost:8888/chat/getRoomsChat', {
            adminId: teacher,
            teacherId: teacherId
        }).then(response => {
            setNameRoomId(response.data.id);
            console.log("cc",response.data.id);
            if (response.data) {
                console.log(response.data);
                setChatRoomId(response.data.id);
                setChatMessage(response.data.messages || []);
                axios.post('http://localhost:8888/chat/getMessageChat', {
                    roomId: response.data.id
                }).then(re => {
                    const dt = re.data;
                    if (dt && dt.length > 0) {
                        const latestMessage = dt[dt.length - 1];
                        console.log(latestMessage);
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
                createChatRoom(teacher);
            }
        });
        axios.post('http://localhost:8888/admin/showInfoTeacherTeaching', {
            teacherId: teacher
        }).then(res => {
            setReceiverInfo(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    };

    const createChatRoom = (teacher) => {
        axios.post('http://localhost:8888/chat/createRoomsChat', {
            teacherId,
            adminId: teacher
        }).then(response => {
            setChatRoomId(response.data.id);
            setNameRoomId(response.data.id);
        });
    };

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

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'MMMM d, yyyy');
    }

    const formatTime = (timeString) => {
        const date = parseISO(timeString);
        return format(date, 'h:mm a');
    };

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

    useEffect(() => {
        axios.post('http://localhost:8888/teachers/getInforSenderChat', {
            teacherId
        }).then(res => {
            console.log(res.data);
            setSenderName(res.data.nameTeacher);
            setSenderAvt(res.data.pathAvt);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }, [teacherId])

    const handleSendChange = (e) => {
        setInputSend(e.target.value);
    }

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
        console.log("fill",myInfo);
        if (stompClient) {
            const contentToSend = Array.isArray(inputSend) ? inputSend.join(' ') : inputSend;
            if (contentToSend && !inputData.file) {
                const message = {
                    senderId: teacherId,
                    chatRoom: room,
                    room: chatRoomId,
                    senderName: teacherName,
                    senderAvatar: myInfo.pathAvt,
                    receiverIds: receiverId,
                    receiverName: receiverInfo.nameteacher,
                    receiverAvatar: receiverInfo.part,
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
                    senderId: teacherId,
                    chatRoom: room,
                    room: chatRoomId,
                    senderName: teacherName,
                    senderAvatar: myInfo.pathAvt,
                    receiverIds: receiverId,
                    receiverName: receiverInfo.nameteacher,
                    receiverAvatar: receiverInfo.part,
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
                senderId: teacherId,
                chatRoom: room,
                room: chatRoomId,
                senderName: teacherName,
                senderAvatar: myInfo.pathAvt,
                receiverIds: receiverId,
                receiverName: receiverInfo.nameteacher,
                receiverAvatar: receiverInfo.part,
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
            setLastChat(prevMessages => [...prevMessages, '👍']);
            setIsExpanded(false);
        } else {
            console.error('STOMP Client is not connected or message is empty.');
        }
    }

    useEffect(() => {
        axios.post('http://localhost:8888/admin/getTeacher', {
            teacherId
        }).then(res => {
            console.log(res.data);
            setMyInfo(res.data);
        }).catch(err => {
            console.log('Error fetch data: ' + err);
        })
    }, []);

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

    return (
        <>
            <div id="navigator" className="fixed top-0 right-0">
                {showChat && (
                    <div className={`w-[350px] h-[450px] absolute -left-[9.5em] border-[2px] border-solid border-[#F0F0F0] rounded-10 bottom-0 z-[10000] bg-white`}>
                        {chatRoomId && (
                            <div>
                                <div className="h-[48px] !chat-shadow flex items-center justify-between shadow-sm">
                                    <div className="flex relative justify-between px-[2px]">
                                        <div className="group w-[220px] flex items-center h-full px-1 pr-2 rounded-10 transition-all duration-150 cursor-pointer hover:bg-[rgb(0,0,0,.1)]"
                                            onClick={handleOpenModalColor}>
                                            <img src={receiverInfo.part} className="w-[45px] h-[45px] py-1 px-1 rounded-50 transition-all duration-200 cursor-pointer group-hover:bg-transparent" />
                                            <p className="pl-1 font-semibold">{receiverInfo.nameteacher} <FontAwesomeIcon className="pl-[3px] text-[14px] text-main" icon={`${isModalColor ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'}`} /></p>
                                        </div>
                                        {isModalColor && (
                                            <div className="absolute top-[47px] z-50 border-t-[1px] border-solid border-[#dfdfdf]">
                                                <div className="bg-while rounded-b-10 shadow-lg">
                                                    <div className="py-2 px-3 w-100%">
                                                        <p className="text-[14px] italic mb-2">Đổi màu</p>
                                                        <div className="flex flex-wrap mb-[10px]">
                                                            {colorOptions.map((color, index) => (
                                                                <div
                                                                    key={index}
                                                                    onClick={() => handleChangeColor(color)}
                                                                    className="w-[30px] h-[30px] rounded-50 cursor-pointer mb-[8px] mr-[8px]"
                                                                    style={{ backgroundColor: color }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex w-[30%] items-center h-full ml-[6.5em]">
                                            <FontAwesomeIcon onClick={handleMinisizeChat} className="text-[20px] py-[2px] px-1 rounded-50 hover:bg-[rgb(0,0,0,.1)] cursor-pointer transition-all duration-200 text-main mr-[5px]" icon="fa-solid fa-minus" />
                                            <FontAwesomeIcon onClick={handleCloseChat} className="text-[20px] py-[2px] px-1 rounded-50 hover:bg-[rgb(0,0,0,.1)] cursor-pointer transition-all duration-200 text-main" icon="fa-solid fa-xmark" />
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-y-auto h-[calc(100%-100px)]">
                                    <div className="relative">
                                        <div className="flex">
                                            <div className={`${isInfoOpen ? 'w-[calc(100%-350px)] h-[100vh]' : 'w-[100%] h-[100vh]'} transition-all duration-300`}>
                                                <div ref={chatContainerRef} onScroll={handleScroll} className="p-3 max-h-screen overflow-y-scroll h-[350px] pb-[50px]" >
                                                <div className="text-center mt-2.5%">
                                                    <div className="inline-block">
                                                        <img src={admin.Part} className="w-[80px] h-[80px] py-1 px-1 rounded-50 transition-all duration-200 cursor-pointer group-hover:bg-transparent inline-block" />
                                                        <p className="pl-1 font-normal"></p>
                                                        <p className="pl-1 mt-[5px] mb-[10px] font-semibold">{receiverInfo.nameTeacher}</p>
                                                    </div>
                                                </div>
                                                    <div className="chat-container mt-5%">
                                                        <div>
                                                            {chatMessage.map((meg, index) => (
                                                                <div
                                                                    key={meg.id}
                                                                    className={`relative flex items-center my-2 group ${meg.senderId == teacherId && meg.senderName ==  teacherName ? 'justify-end' : 'justify-start'}`}
                                                                >
                                                                    {meg.senderId != teacherId && meg.senderName != teacherName && (
                                                                        <img
                                                                            src={meg.senderAvatar}
                                                                            className="w-[40px] h-[40px] rounded-50 cursor-pointer mr-[2%]"
                                                                        />
                                                                    )}

                                                                    {meg.type == 'image' ? (
                                                                        <img src={meg.special} alt="Image" className="w-[200px] h-auto rounded-[10px] cursor-pointer mr-[.5%]" />
                                                                    ) : meg.type == 'file' ? (
                                                                        <div onClick={() => handleDownload(meg.special)} style={{ backgroundColor: meg.senderId == teacherId ? bgColor : '#f0f0f0' }}
                                                                            className={`text-[#212529] !bg-[${bgColor}] py-2 px-3 mr-[.5%] rounded-[15px] cursor-pointer whitespace-nowrap overflow-ellipsis overflow-hidden max-w-[200px] ${meg.senderId == teacherId ? `!bg-[${bgColor}] text-white` : `bg-[#f0f0f0] text-[#212529]`}`}>
                                                                            <FontAwesomeIcon className="pr-1" icon="fa-solid fa-file-lines" /><span className="font-semibold">{meg.content}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <div style={{ backgroundColor: meg.senderId == teacherId ? bgColor : '#f0f0f0' }}
                                                                            className={`bg-[#f0f0f0] py-2 px-3 ml-[.5%] mr-[.5%] rounded-[15px] ${meg.senderId == teacherId ? `!bg-[${bgColor}] text-white` : `bg-[#f0f0f0] text-[#212529]`}`}>
                                                                            <p>{meg.content}</p>
                                                                        </div>
                                                                    )}

                                                                    {meg.senderId == teacherId && (
                                                                        <></>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex justify-evenly items-center pt-[5px] mb-[10px] absolute bottom-0 left-0 right-0 bg-white">
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
                                        <input className={`bg-[rgb(240,242,245)] ${inputSend ? 'w-[75%]' : 'w-[40%]'} relative transition-all duration-500 ease-in-out px-2 py-1 !pr-10 rounded-10 focus:outline-none text-[16px]`}
                                            placeholder="Aa"
                                            value={Array.isArray(inputSend) ? inputSend.join(' ') : inputSend}
                                            onChange={handleSendChange}
                                        />
                                        <div className={`absolute ${inputSend ? 'right-12' : 'right-[65px]'} `}>
                                            <FontAwesomeIcon ref={smileButtonRef} onClick={() => setIsModalOpen(prevState => !prevState)} className="text-[20px] text-main cursor-pointer relative" icon="fa-solid fa-smile" />
                                            {isModalOpen && (
                                                <div className="absolute bottom-10 right-[-125px] flex justify-center items-center bg-black bg-opacity-50 z-50">
                                                    <div
                                                        ref={modalRef}
                                                        className="bg-white p-6 rounded-lg shadow-lg max-h-[400px] w-[350px] overflow-y-scroll hide-scrollbar"
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
                            </div>
                        )}
                    </div>
                )}
                {isMinimized && (
                    <div className={`absolute ${isMinisizeChat ? 'bottom-12' : 'bottom-1'} right-1 group`}>
                        <img
                            onClick={handleOpenToMinimize}
                            src="/assets/images/apps/LOGOTRUONG.png"
                            className="w-[48px] h-[48px] py-1 px-1 rounded-10 transition-all duration-200 cursor-pointer"
                            alt="avatar"
                        />
                        <FontAwesomeIcon
                            onClick={handleCloseChannel}
                            className="text-[12px] py-[2px] px-1 absolute bottom-8 right-0 text-white rounded-50 cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:bg-[#777]"
                            icon="fa-solid fa-xmark"
                        />
                        <div className={`absolute bottom-3 w-[110px] right-[-16px] text-center transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 bg-main`}>
                            Kênh thông báo
                        </div>
                    </div>
                )}
                {isMinisizeChat && (
                    <div className="absolute bottom-1 right-1 group">
                        <img
                            onClick={handleOpenToMinisizeChat}
                            src="/assets/images/apps/LOGOTRUONG.png"
                            className="w-[48px] h-[48px] py-1 px-1 rounded-10 transition-all duration-200 cursor-pointer"
                            alt="avatar"
                        />
                        <FontAwesomeIcon
                            onClick={handleCloseChat}
                            className="text-[12px] py-[2px] px-1 absolute bottom-8 right-0 text-white rounded-50 cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:bg-[#777]"
                            icon="fa-solid fa-xmark"
                        />
                        <div className={`absolute bottom-3 w-[60px] right-[10px] text-center transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 bg-main`}>
                            Hỗ trợ
                        </div>
                    </div>
                )}
                <div className="w-[250px] h-[100vh] bg-[#2d3250] pl-[10px] pr-[10px] pt-[15px]">
                    <div>
                        <input placeholder="Tìm kiếm thứ gì đó..." type="text" className="pt-1 pb-1 pl-3 pr-2 ml-[15px] rounded-15 border-none focus:outline-none relative" />
                        <button onClick={SpeechRecognition.startListening} className="text-[#f9b17a] bg-[#676f9d] pt-1 pb-1 pl-2 pr-2 rounded-50 absolute right-4 shadow-lg focus:outline-none" type="submit"><FontAwesomeIcon icon="fa-solid fa-microphone" /></button>
                    </div>
                    <div className="mt-[20px] pl-[10px] pr-[10px] mb-[20px]">
                        <div className="text-[14px] italic text-while mt-[20px]">
                            Thông tin
                        </div>
                        <div className="w-100 h-[100px] mt-[10px] border-[2px] border-solid border-[#777] rounded-10">
                            {weather ? (
                                <div className="text-[#f9b17a] text-center">
                                    <div className="flex">
                                        <div>
                                            <img
                                                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                                alt="Weather icon"
                                                className="w-[80px] h-[80px] relative"
                                            />
                                            <p className="text-[18px] absolute top-[160px] left-7 font-bold">{weather.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[30px] mt-[20px] mb-[-5px] ml-[15px] font-bold">{weather.main.temp}°</p>
                                            <p className="text-[12px] ml-[10px] capitalize">{weather.weather[0].description}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Đang tải...</p>
                            )}

                        </div>
                        <div className="h-[100%] mt-[10px]">
                            <div className="w-100% h-[80px] border-[2px] border-solid border-[#777] rounded-10">
                                <div className="py-1 px-2 text-[#f9b17a]">
                                    <span className="italic">Tiết dạy tiếp theo</span>
                                    <p className="text-center mt-2.5% text-3xl font-semibold"><FontAwesomeIcon icon="fa-solid fa-layer-group" /> {nextClass}</p>
                                </div>
                            </div>
                            <div className="w-100% h-[80px] rounded-10 mt-[10px] relative">
                                <div className="py-1 px-2 text-[#f9b17a]">
                                    <p className="italic pb-2">Hỗ trợ</p>
                                    {admin.map(item => (
                                        <div key={item.teacherteachingserviceID} onClick={() => handleTeacherClick(item.teacherteachingserviceID)} className="flex relative items-center rounded-[5px] py-2 px-1 mb-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                                            <img className="w-[40px] h-[40px] rounded-50 mr-[10px]" src={item.Part} />
                                            <p className="font-semibold text-[12px]">{item.Nameteacher}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Messager = () => {
    // Dữ liệu giả lập các thông báo
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Chào mọi người, đây là thông báo đầu tiên!', reacts: [] },
        { id: 2, message: 'Đừng quên tham gia sự kiện vào tuần sau!', reacts: [] },
    ]);

    // Các loại react (biểu tượng cảm xúc)
    const reactTypes = ['👍', '❤️', '😂', '😮', '😢'];

    // Hàm thêm react vào thông báo
    const handleReact = (id, react) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id
                    ? { ...notification, reacts: [...notification.reacts, react] }
                    : notification
            )
        );
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-6 bg-white shadow-md rounded-lg">
            {/* Tiêu đề */}
            <div className="border-b px-4 py-2">
                <h2 className="text-xl font-semibold text-gray-800">Kênh Thông Báo</h2>
            </div>

            {/* Danh sách thông báo */}
            <div className="p-4">
                {notifications.map(notification => (
                    <div key={notification.id} className="mb-4">
                        {/* Nội dung thông báo */}
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <p>{notification.message}</p>
                        </div>

                        {/* Phần react */}
                        <div className="flex items-center mt-2">
                            {reactTypes.map((react, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleReact(notification.id, react)}
                                    className="mr-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none">
                                    {react}
                                </button>
                            ))}
                        </div>

                        {notification.reacts.length > 0 && (
                            <div className="mt-2 text-gray-500">
                                <p>Đã thả:</p>
                                <div className="flex">
                                    {notification.reacts.map((react, index) => (
                                        <span key={index} className="mr-1">{react}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export { SideBar, Navigator, Messager }