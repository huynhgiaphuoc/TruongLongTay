import axios from "axios";
import React, { useEffect, useState } from "react";
import { LayoutAdmin, Nav } from "../layout/layoutadmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const CreateTeacher = () => {
    const [teacher, setTeacher] = useState([]);
    const [teacherAdd, setTeacherAdd] = useState();
    const [teaching, setTeaching] = useState("");
    const [setteaching, setSetTeaching] = useState();
    const [email, setEmail] = useState();
    const [birthday, setBirthday] = useState();
    const [nots, setNots] = useState();
    const [off, setOff] = useState();
    const [gender, setGender] = useState();
    const [name, setName] = useState();
    const [recruiter, setRecruiter] = useState();
    const [health, setHealth] = useState();
    const [phone, setPhone] = useState();
    const [recruitment, setRecruitment] = useState();
    const [contract, setContract] = useState();
    const [pass, setPass] = useState();
    const [position, setPosition] = useState();
    const [religion, setReligion] = useState();
    const [ethnicity, setEthnicity] = useState();
    const [cic, setCic] = useState();
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [commune, setCommune] = useState([]);
    const [address, setAddress] = useState();
    const [avatar, setAvatar] = useState();
    const [path, setPath] = useState();
    const [teachingid, setTeachingid] = useState();
    const [educationid, setEducationid] = useState();
    const [file, setFile] = useState(null);
    const [part, setPart] = useState({});
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCommune, setSelectedCommune] = useState('');
    const [nation, setNation] = useState();
    const [selectedNation, setSelectedNation] = useState('');
    const [teacherid, setTeacherid] = useState('');
    const [edu, setEdu] = useState([]);
    const navigate = useNavigate();

    const [eId, setEId] = useState('');
    const [eCode, setECode] = useState('');
    const [eName, setEName] = useState('');
    const [ePart, setEPart] = useState('');
    const [eBirthday, setEBirthday] = useState('');
    const [eEmail, setEEmail] = useState('');
    const [ePhone, setEPhone] = useState('');
    const [eCccd, setECccd] = useState('');
    const [ePass, setEPass] = useState('');
    const [eGender, setEGender] = useState('');
    const [eReligion, setEReligion] = useState('');
    const [eNation, setENation] = useState('');
    const [eEth, setEEth] = useState('');
    const [eAddress, setEAddress] = useState('');
    const [eProvince, setEProvince] = useState('');
    const [eDistrict, setEDistrict] = useState('');
    const [eCommune, setECommune] = useState('');
    const [eEduCode, setEEduCode] = useState('');
    const [eUnit, setEUnit] = useState('');
    const [eHealthy, setEHealthy] = useState('');
    const [ePosition, setEPosition] = useState('');
    const [eRecuimentDay, setERecuimentDay] = useState('');
    const [eContract, setEContract] = useState('');
    const [eNots, setENots] = useState('');

    const handTeacher = (event) => {
        const { id, value } = event.target;
        setTeacherAdd(prevState => ({ ...prevState, [id]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile({ file: file, fileName: file.name, type: 'image' });
        }
    }

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'tmz6fhxc');
        const resourceType = 'image';
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dlj9sdjb6/${resourceType}/upload`, formData);
            console.log('Upload thành công: ' + response.data);
            return response.data.secure_url;
        } catch (error) {
            console.log('Upload thất bại: ' + error);
        }
    }

    const handTeacherSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(eEmail)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address!',
            });
            return;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(ePhone)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Phone number must be exactly 10 digits!',
            });
            return;
        }

        let resultUrl;
        if (file) {
            resultUrl = await handleUpload(file.file);
        } else {
            resultUrl = "/assets/images/apps/user.png";
        }

        const datateacher = {
            name: eName,
            pass: ePass,
            email: eEmail,
            birthday: eBirthday,
            nots: eNots,
            nation: eNation,
            off: eCode,
            gender: eGender,
            recruiter: eUnit,
            health: eHealthy,
            phone: ePhone,
            recruitment: eRecuimentDay,
            contract: eContract,
            position: ePosition,
            religion: eReligion,
            ethnicity: eEth,
            cic: eCccd,
            province: selectedProvince,
            district: selectedDistrict,
            commune: selectedCommune,
            address: eAddress,
            path: resultUrl,
            eId: eId,
            edu: eEduCode
        };

        await axios.post('http://localhost:8888/admin/createTeacher', datateacher)
            .then(() => {
                Swal.fire({
                    title: 'Success',
                    text: 'Thêm giáo viên thành công',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: true
                })
                fetchData();
                navigate("/teacheradmin");
            })
    }

    const validate = () => {
        if (!eEmail) {
            Swal.fire('Validation Error', 'Email không được để trống', 'error');
            return false;
        }
        if (!eBirthday) {
            Swal.fire('Validation Error', 'Ngày sinh không được để trống', 'error');
            return false;
        }
        if (!eNation) {
            Swal.fire('Validation Error', 'Quốc tịch không được để trống', 'error');
            return false;
        }
        if (!eCode) {
            Swal.fire('Validation Error', 'Mã số giáo viên không được để trống', 'error');
            return false;
        }
        if (!eGender) {
            Swal.fire('Validation Error', 'Giới tính được để trống', 'error');
            return false;
        }
        if (!eName) {
            Swal.fire('Validation Error', 'Tên giáo viên được để trống', 'error');
            return false;
        }
        if (!eUnit) {
            Swal.fire('Validation Error', 'Cơ quan tuyển dụng không được để trống', 'error');
            return false;
        }
        if (!eHealthy) {
            Swal.fire('Validation Error', 'Mã số bảo hiểm y tế không được để trống', 'error');
            return false;
        }
        if (!ePhone) {
            Swal.fire('Validation Error', 'Số điện thoại không được để trống', 'error');
            return false;
        }
        if (!eRecuimentDay) {
            Swal.fire('Validation Error', 'Ngày tuyển dụng không được để trống', 'error');
            return false;
        }
        if (!eContract) {
            Swal.fire('Validation Error', 'Hình thức hợp đồng không được để trống', 'error');
            return false;
        }
        if (!ePass) {
            Swal.fire('Validation Error', 'Mật khẩu không được để trống', 'error');
            return false;
        }
        if (!ePosition) {
            Swal.fire('Validation Error', 'Vị trí việc làm không được để trống', 'error');
            return false;
        }
        if (!eReligion) {
            Swal.fire('Validation Error', 'Tôn giáo không được để trống', 'error');
            return false;
        }
        if (!eEth) {
            Swal.fire('Validation Error', 'Dân tộc không được để trống', 'error');
            return false;
        }
        if (!eCccd) {
            Swal.fire('Validation Error', 'Căn cức công dân không được để trống', 'error');
            return false;
        }
        if (!selectedProvince) {
            Swal.fire('Validation Error', 'Tỉnh không được để trống', 'error');
            return false;
        }
        if (!selectedDistrict) {
            Swal.fire('Validation Error', 'Huyện không được để trống', 'error');
            return false;
        }
        if (!selectedCommune) {
            Swal.fire('Validation Error', 'Xã không được để trống', 'error');
            return false;
        }
        if (!eAddress) {
            Swal.fire('Validation Error', 'Địa chỉ không được để trống', 'error');
            return false;
        }
        if (!eNots) {
            Swal.fire('Validation Error', 'Số tiết dạy trong ngày không được để trống', 'error');
            return false;
        }

        return true;
    };

    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setProvince(data.data);
                }
            });
    }, []);

    useEffect(() => {
        fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setDistrict(data.data);
                    setCommune([]);
                }
            });

    }, [selectedProvince]);

    useEffect(() => {
        fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setCommune(data.data);
                }
            });
    }, [selectedDistrict]);

    useEffect(() => {
        axios.post('http://localhost:8888/admin/getAllEducation')
            .then(res => {
                setEdu(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    }, [])

    const handleBackTeacher = () => {
        navigate('/teacheradmin');
    }

    const handleCountryChange = (e) => {
        setSelectedNation(e.target.value);
    };

    const fetchData = () => {
        axios.post('http://localhost:8888/teacher/adminTeacher')
            .then(response => {
                const data = response.data;
                const list = data.map(item => ({
                    id: item.TeacherID,
                    name: item.Name_Teacher,
                    pass: item.Password,
                    email: item.Email,
                    birthday: item.Birthday,
                    nots: item.Nots,
                    nation: item.Nation,
                    off: item.Officer,
                    gender: item.Gender,
                    recruiter: item.Recruiter,
                    health: item.Health_Insurance,
                    phone: item.Phone,
                    recruitment: item.Recruitment_Day,
                    contract: item.Contract_Form,
                    position: item.Position,
                    religion: item.Religion,
                    ethnicity: item.Ethnicity,
                    cic: item.Cic,
                    province: item.Province,
                    district: item.District,
                    commune: item.Commune,
                    address: item.Address,
                    path: item.Path_Avt,
                    teachingid: item.teacherteachingserviceID,
                    educationid: item.Education_Of_TeacherID,
                    //Edu
                    idedu: item.Education_Of_TeacherID,
                    spl: item.Spl,
                    uniondm: item.Uniondm,
                    degree: item.Degree,
                    main: item.Main_Major,
                    osq: item.Osq,
                    techno: item.Technology_Level,
                    eml: item.Eml,
                    seniority: item.Seniority_Allowance,
                    ptl: item.Ptl,
                    salary: item.Salary_Coefficient,
                    level: item.Level_Salary,
                    saladay: item.Salary_Days,
                    quota: item.Quota,
                    mml: item.Mml,
                    mfl: item.Mfl,
                    jia: item.Jia,
                    sst: item.Sst,
                    other: item.Other_Majors,
                    party: item.Party
                }))
                setTeacher(list);
            })
            .catch(error => console.error(error));
    }



    return (
        <div className="flex h-[100vh] overflow-hidden">
            <LayoutAdmin />
            <div className="w-[calc(100%-256px)] pl-[20px] bg-[#edf2f9] h-[100%]">
                <div className="w-100% h-[60px] pb-[15px]">
                    <Nav />
                </div>
                <div className='flex'>
                    <div className="w-[100%] mr-[50px] h-100 rounded-[5px] bg-while pt-2 pl-3 pr-3">
                        <div className="w-[100%]">
                            <div className='w-[calc(100%-250px)] rounded-[5px] h-[100vh] bg-[#fff] pt-2 pl-3 pr-3 mr-2.5%'>
                                <div className='w-[100%] h-100 bg-[#fff]'>
                                    <p className='text-[18px] font-bold mb-[10px]'>Thêm Giáo Viên Mới</p>
                                    <div className="flex">
                                        <div className='w-[50%] flex'>
                                            <div className='w-[40%] ml-[10px] '>
                                                <p className="py-2">Mã giáo viên:</p>
                                                <p className="py-2">Họ và tên:</p>
                                                <p className="py-2">Chọn ảnh đại diện:</p>
                                                <p className="py-2">Birthday:</p>
                                                <p className="py-2">Địa chỉ Email:</p>
                                                <p className="py-2">Số điện thoại:</p>
                                                <p className="py-2">Cccd:</p>
                                                <p className="py-2">Mật Khẩu:</p>
                                                <p className="py-2">Đơn vị đào tạo:</p>
                                                <p className="py-2">Số bảo hiểm y tế:</p>
                                                <p className="py-2">Chức vụ:</p>
                                            </div>
                                            <div className='w-[25%] ml-[5px]'>
                                                <input type="text" value={eCode} onChange={(e) => setECode(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={eName} onChange={(e) => setEName(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input
                                                    onChange={handleImageChange}
                                                    type="file"
                                                    id="chooseimage"
                                                    name="image"
                                                    className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]"
                                                    accept='image/*'
                                                />
                                                <input type="date" value={eBirthday} onChange={(e) => setEBirthday(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={eEmail} onChange={(e) => setEEmail(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={ePhone} onChange={(e) => setEPhone(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={eCccd} onChange={(e) => setECccd(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="password" value={ePass} onChange={(e) => setEPass(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={eUnit} onChange={(e) => setEUnit(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={eHealthy} onChange={(e) => setEHealthy(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={ePosition} onChange={(e) => setEPosition(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                            </div>
                                        </div>
                                        <div className="w-[50%] flex">
                                            <div className="w-[40%] ml-[20%]">
                                                <p className="py-2">Giới tính:</p>
                                                <p className="py-2">Tôn giáo:</p>
                                                <p className="py-2">Quốc Tịch</p>
                                                <p className="py-2">Dân Tộc:</p>
                                                <p className="py-2">Địa chỉ:</p>
                                                <p className="py-2">Tỉnh:</p>
                                                <p className="py-2">Tp/Huyện:</p>
                                                <p className="py-2">Xã:</p>
                                                <p className="py-2">Ngày được nhận:</p>
                                                <p className="py-2">Hợp đồng:</p>
                                                <p className="py-2">Số tiết dạy trong ngày:</p>
                                            </div>
                                            <div className="w-[25%]">
                                                <select value={eGender} onChange={(e) => setEGender(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]"  >
                                                    <option value="ko_xac_dinh">Không xác định</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                </select>
                                                <input type="text" value={eReligion} onChange={(e) => setEReligion(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={eNation} onChange={(e) => setENation(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={eEth} onChange={(e) => setEEth(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />

                                                <input type="text" value={eAddress} onChange={(e) => setEAddress(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <select
                                                    className=" block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]"
                                                    value={selectedProvince}
                                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                                    name="province"
                                                    title="Chọn Tỉnh Thành"
                                                >
                                                    <option value="0">Tỉnh Thành</option>
                                                    {province.map((provinceItem) => (
                                                        <option key={provinceItem.id} value={provinceItem.id}>
                                                            {provinceItem.full_name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <select
                                                    className=" block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]"
                                                    value={selectedDistrict}
                                                    onChange={(e) => setSelectedDistrict(e.target.value)}  // Cập nhật quận huyện đã chọn
                                                    name="district"
                                                    title="Chọn Quận Huyện"
                                                >
                                                    <option value="0">Quận Huyện</option>
                                                    {district.map((districtItem) => (
                                                        <option key={districtItem.id} value={districtItem.id}>
                                                            {districtItem.full_name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <select
                                                    value={selectedCommune}
                                                    onChange={(e) => setSelectedCommune(e.target.value)}
                                                    className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]"
                                                    name="commune"
                                                    title="Chọn Phường Xã">
                                                    <option value="0">Phường Xã</option>
                                                    {commune.map((communeItem) => (
                                                        <option key={communeItem.id} value={communeItem.id}>
                                                            {communeItem.full_name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <input type="text" value={eRecuimentDay} onChange={(e) => setERecuimentDay(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={eContract} onChange={(e) => setEContract(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                <input type="text" value={eNots} onChange={(e) => setENots(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center text-[16px] italic mt-[10px]'>
                                        <FontAwesomeIcon className='ml-[10px]' icon="fa-solid fa-caret-right" />
                                        <p className='ml-[5px] '>Trình độ giáo dục</p>
                                    </div>
                                    <div className="flex mt-[10px]">
                                        <div className='w-[50%] flex'>
                                            <div className='w-[40%] ml-[10px] '>
                                                <p className="py-2">Mã trình độ:</p>
                                            </div>
                                            <div className='w-[40%] ml-[5px]'>
                                                <select
                                                    value={eId}
                                                    onChange={(e) => setEId(e.target.value)}
                                                    className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]">
                                                    <option>Chọn trình độ</option>
                                                    {edu.map(item => (
                                                        <option key={item.Education_Of_TeacherID} value={item.Education_Of_TeacherID}>{item.Technology_Level} - {item.Main_Major}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex mt-2.5%">
                                        <div
                                            onClick={handTeacherSubmit}
                                            className="w-[30%] rounded-[5px] ml-[15%] mr-[5%] text-center py-2 bg-main text-while cursor-pointer">
                                            Lưu thay đổi
                                        </div>
                                        <div
                                            onClick={handleBackTeacher}
                                            className="w-[30%] rounded-[5px] mr-[15%%] ml-[5%] text-center py-2 bg-[rgb(230,0,18)] text-while cursor-pointer">
                                            Hủy thay đổi
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

const Teacher = () => {
    const [teaching, setTeaching] = useState("");
    const [setteaching, setSetTeaching] = useState();
    const [teacher, setTeacher] = useState([]);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState();
    const [birthday, setBirthday] = useState();
    const [nots, setNots] = useState();
    const [off, setOff] = useState();
    const [gender, setGender] = useState();
    const [name, setName] = useState();
    const [recruiter, setRecruiter] = useState();
    const [health, setHealth] = useState();
    const [phone, setPhone] = useState();
    const [recruitment, setRecruitment] = useState();
    const [contract, setContract] = useState();
    const [pass, setPass] = useState();
    const [position, setPosition] = useState();
    const [religion, setReligion] = useState();
    const [ethnicity, setEthnicity] = useState();
    const [cic, setCic] = useState();
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [commune, setCommune] = useState([]);
    const [address, setAddress] = useState();
    const [avatar, setAvatar] = useState();
    const [path, setPath] = useState();
    const [teachingid, setTeachingid] = useState();
    const [educationid, setEducationid] = useState();
    const [file, setFile] = useState(null);
    const [part, setPart] = useState({});
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [nation, setNation] = useState();
    const [selectedNation, setSelectedNation] = useState('');
    const [teacherid, setTeacherid] = useState('');
    const [edu, setEdu] = useState([]);

    const [eId, setEId] = useState('');
    const [eCode, setECode] = useState('');
    const [eName, setEName] = useState('');
    const [ePart, setEPart] = useState('');
    const [eBirthday, setEBirthday] = useState('');
    const [eEmail, setEEmail] = useState('');
    const [ePhone, setEPhone] = useState('');
    const [eCccd, setECccd] = useState('');
    const [ePass, setEPass] = useState('');
    const [eGender, setEGender] = useState('');
    const [eReligion, setEReligion] = useState('');
    const [eNation, setENation] = useState('');
    const [eEth, setEEth] = useState('');
    const [eAddress, setEAddress] = useState('');
    const [eProvince, setEProvince] = useState('');
    const [eDistrict, setEDistrict] = useState('');
    const [eCommune, setECommune] = useState('');
    const [eEduCode, setEEduCode] = useState('');
    const [eUnit, setEUnit] = useState('');
    const [eHealthy, setEHealthy] = useState('');
    const [ePosition, setEPosition] = useState('');
    const [eRecuimentDay, setERecuimentDay] = useState('');
    const [eContract, setEContract] = useState('');
    const [eNots, setENots] = useState('');

    //edu
    const [spl, setSpl] = useState();
    const [uniondm, setUniondm] = useState();
    const [degree, setDegree] = useState();
    const [main, setMain] = useState();
    const [osq, setOsq] = useState();
    const [techno, setTechno] = useState();
    const [eml, setEml] = useState();
    const [seniority, setSeniority] = useState();
    const [ptl, setPtl] = useState();
    const [salary, setSalary] = useState();
    const [level, setLevel] = useState();
    const [saladay, setSaladay] = useState();
    const [quota, setQuota] = useState();
    const [mml, setMml] = useState();
    const [mfl, setMfl] = useState();
    const [jia, setJia] = useState();
    const [sst, setSst] = useState();
    const [other, setOther] = useState();
    const [party, setParty] = useState();
    const [show, setshow] = useState(false);
    const [adminTeacher, setAdminTeacher] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = teacher.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(teacher.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    useEffect(() => {
        axios.post('http://localhost:8888/admin/getAllTeacher')
            .then(res => {
                console.log(res.data);
                setTeacher(res.data);
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    }, [])

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile({ file: file, fileName: file.name, type: 'image' });
        }
    }

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'tmz6fhxc');
        const resourceType = 'image';
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dlj9sdjb6/${resourceType}/upload`, formData);
            console.log('Upload thành công: ' + response.data);
            return response.data.secure_url;
        } catch (error) {
            console.log('Upload thất bại: ' + error);
        }
    }

    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setProvince(data.data);
                }
            });
    }, []);

    useEffect(() => {
        if (selectedProvince !== 0) {
            fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setDistrict(data.data);
                        setCommune([]);
                    }
                });
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict !== 0) {
            fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setCommune(data.data);
                    }
                });
        }
    }, [selectedDistrict]);

    const handleDeleteTeacher = (id) => {
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
                axios.post('http://localhost:8888/admin/getTeacherById', {
                    teacherId: id
                }).then(res => {
                    axios.post('http://localhost:8888/admin/getAllTeacherSubjectById', {
                        teacherId: id
                    }).then(re => {
                        axios.post('http://localhost:8888/admin/deleteTeacher', {
                            teacherId: id
                        }).then(r => {
                            axios.post('http://localhost:8888/admin/deleteEducation', {
                                eduId: res.data[0].Education_Of_TeacherID
                            }).then(ret => {
                                fetchData();
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Đã xóa!',
                                    text: 'Dữ liệu đã được cập nhật.',
                                    confirmButtonText: 'OK'
                                });
                            }).catch(er => {
                                console.log('Error fetch data: ' + er);
                            })
                        }).catch(e => {
                            console.log('Error fetch data: ' + e);
                        })
                    }).catch(err => {
                        console.log('Error fetch data: ' + err);
                    })

                }).catch(err => {
                    if (err.response && err.response.status === 409) {
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
                            text: 'Không thể xóa Giáo Viên!',
                            confirmButtonText: 'OK'
                        });
                    }
                })
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

    const handleCountryChange = (e) => {
        setSelectedNation(e.target.value);
    };

    const fetchData = () => {
        axios.post('http://localhost:8888/admin/getAllTeacher')
            .then(response => {
                setTeacher(response.data);
            })
            .catch(error => console.error(error));
    }

    const handleChanngePage = () => {
        navigate('/createteacher');
    }

    const validate = () => {
        if (!eEmail) {
            Swal.fire('Validation Error', 'Email không được để trống', 'error');
            return false;
        }
        if (!eBirthday) {
            Swal.fire('Validation Error', 'Ngày sinh không được để trống', 'error');
            return false;
        }
        if (!eNation) {
            Swal.fire('Validation Error', 'Quốc tịch không được để trống', 'error');
            return false;
        }
        if (!eCode) {
            Swal.fire('Validation Error', 'Mã số giáo viên không được để trống', 'error');
            return false;
        }
        if (!eGender) {
            Swal.fire('Validation Error', 'Giới tính được để trống', 'error');
            return false;
        }
        if (!eName) {
            Swal.fire('Validation Error', 'Tên giáo viên được để trống', 'error');
            return false;
        }
        if (!eUnit) {
            Swal.fire('Validation Error', 'Cơ quan tuyển dụng không được để trống', 'error');
            return false;
        }
        if (!eHealthy) {
            Swal.fire('Validation Error', 'Mã số bảo hiểm y tế không được để trống', 'error');
            return false;
        }
        if (!ePhone) {
            Swal.fire('Validation Error', 'Số điện thoại không được để trống', 'error');
            return false;
        }
        if (!eRecuimentDay) {
            Swal.fire('Validation Error', 'Ngày tuyển dụng không được để trống', 'error');
            return false;
        }
        if (!eContract) {
            Swal.fire('Validation Error', 'Hình thức hợp đồng không được để trống', 'error');
            return false;
        }
        if (!ePass) {
            Swal.fire('Validation Error', 'Mật khẩu không được để trống', 'error');
            return false;
        }
        if (!ePosition) {
            Swal.fire('Validation Error', 'Vị trí việc làm không được để trống', 'error');
            return false;
        }
        if (!eReligion) {
            Swal.fire('Validation Error', 'Tôn giáo không được để trống', 'error');
            return false;
        }
        if (!eEth) {
            Swal.fire('Validation Error', 'Dân tộc không được để trống', 'error');
            return false;
        }
        if (!eCccd) {
            Swal.fire('Validation Error', 'Căn cức công dân không được để trống', 'error');
            return false;
        }
        if (!ePosition) {
            Swal.fire('Validation Error', 'Tỉnh không được để trống', 'error');
            return false;
        }
        if (!eDistrict) {
            Swal.fire('Validation Error', 'Huyện không được để trống', 'error');
            return false;
        }
        if (!eCommune) {
            Swal.fire('Validation Error', 'Xã không được để trống', 'error');
            return false;
        }
        if (!eAddress) {
            Swal.fire('Validation Error', 'Địa chỉ không được để trống', 'error');
            return false;
        }
        if (!eNots) {
            Swal.fire('Validation Error', 'Số tiết dạy trong ngày không được để trống', 'error');
            return false;
        }

        return true;
    };
    const handleShowTeacher = (id) => {
        setTeacherid(id);
        axios.post('http://localhost:8888/admin/getTeacherById', { teacherId: id })
            .then(res => {
                setShowForm(true);
                const dt = res.data;
                setEId(dt[0].TeacherID);
                setECode(dt[0].Officer);
                setEName(dt[0].Name_Teacher);
                setEPart(dt[0].Path_Avt);
                setEBirthday(dt[0].Birthday);
                setEEmail(dt[0].Email);
                setEPhone(dt[0].Phone);
                setECccd(dt[0].Cic);
                setEPass(dt[0].Password);
                setEGender(dt[0].Gender);
                setEReligion(dt[0].Religion);
                setENation(dt[0].Nation);
                setEEth(dt[0].Ethnicity);
                setEAddress(dt[0].Address);
                setEProvince(dt[0].Province);
                setEDistrict(dt[0].District);
                setECommune(dt[0].Commune);
                setEEduCode(dt[0].Education_Of_TeacherID);
                setEUnit(dt[0].Recruiter);
                setEHealthy(dt[0].Health_Insurance);
                setEPosition(dt[0].Position);
                setERecuimentDay(dt[0].Recruitment_Day);
                setEContract(dt[0].Contract_Form);
                setENots(dt[0].Nots);
                console.log(res.data);
                axios.post('http://localhost:8888/admin/getAllEducation')
                    .then(res => {
                        setEdu(res.data);
                        console.log(res.data);
                    }).catch(err => {
                        console.log('Error fetch data: ' + err);
                    })
            }).catch(error => {
                if (error.response && error.response.status === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi!',
                        text: 'Không thể sửa!',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi!',
                        text: 'Không thể sửa Giáo Viên!',
                        confirmButtonText: 'OK'
                    });
                }
            });
    }

    useEffect(() => {
        if (eProvince) {
            fetch(`https://esgoo.net/api-tinhthanh/2/${eProvince}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setDistrict(data.data);
                    }
                });
        }
    }, [eProvince]);

    useEffect(() => {
        if (eDistrict) {
            fetch(`https://esgoo.net/api-tinhthanh/3/${eDistrict}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setCommune(data.data);
                    }
                });
        }
    }, [eDistrict]);

    const handTeacherSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        let resultUrl;
        if (file) {
            resultUrl = await handleUpload(file.file);
        } else {
            resultUrl = ePart;
        }

        const datateacher = {
            name: eName,
            pass: ePass,
            email: eEmail,
            birthday: eBirthday,
            nots: eNots,
            nation: eNation,
            off: eCode,
            gender: eGender,
            recruiter: eUnit,
            health: eHealthy,
            phone: ePhone,
            recruitment: eRecuimentDay,
            contract: eContract,
            position: ePosition,
            religion: eReligion,
            ethnicity: eEth,
            cic: eCccd,
            province: eProvince,
            district: eDistrict,
            commune: eCommune,
            address: eAddress,
            path: resultUrl,
            teacherId: eId,
            edu: eEduCode
        };
        console.log("TeacherId: " + teacherid);


        await axios.post('http://localhost:8888/admin/editTeacher', datateacher)
            .then(() => {
                Swal.fire({
                    title: 'Thành công',
                    text: 'Sửa thông tin giáo viên thành công!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: true
                });
                setShowForm(false);
                fetchData();
            }).catch(err => {
                console.log('Error fetch data: ' + err);
            })
    }

    const handleCreate = () => {
        navigate("/createteacher");
    }

    return (
        <div className="flex h-[100%] overflow-hidden">
            <LayoutAdmin />
            <div className="w-[calc(100%-256px)] pl-[20px] bg-[#edf2f9] h-[100%]">
                <div className="w-100% h-[60px] pb-[15px]">
                    <Nav />
                </div>
                <div className='mr-[50px]'>
                    <div className="">
                        <div className="">
                            <div className='w-100% h-[100%] rounded-[5px] py-2 px-4 bg-while'>
                                <h2 className="flex items-center mb-2.5%">
                                    <span className='text-[18px] font-medium mr-[10px]'>Giáo viên</span>
                                    <a href="/createteacher" className='focus:outline-none active:outline-none'>
                                        <FontAwesomeIcon icon="fa-solid fa-circle-plus" className="text-[24px]" />
                                    </a>
                                </h2>
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((item, index) => (
                                        <div key={item.TeacherID} className={`mt-[10px] mb-6 pb-[10px] ${index !== currentProducts.length - 1 ? 'border-b border-[#000]' : ''}`}>
                                            <div className="flex gap-5">
                                                <div className="flex flex-col items-center">
                                                    <div className="relative">
                                                        <img
                                                            src={item.Path_Avt}
                                                            className="w-[190px] h-[180px] object-cover rounded-[50%] border-[#474141] shadow-lg hover:shadow-xl transition-shadow duration-75 ease-in-out"
                                                        />
                                                        <div className="absolute inset-0 rounded-full border-spacing-4 border-main opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                                    </div>
                                                    <p className="mt-2.5 text-[#867f7f]">Ảnh Đại Diện</p>
                                                    <button className='bg-[#f68b18] hover:bg-[#ff6c17] text-while w-100% py-1 rounded-[5px] mt-2.5%' type="button" onClick={() => handleShowTeacher(item.TeacherID)} >Thông tin chi tiết<FontAwesomeIcon icon="fa-solid fa-circle-info" className="ml-2.5%" /></button>
                                                    <button className='bg-[#f14141] hover:bg-[#a62a2a] text-while w-100% py-1 rounded-[5px] mt-2.5%' type="button" onClick={() => handleDeleteTeacher(item.TeacherID)}>Xóa Giáo Viên<FontAwesomeIcon icon="fa-solid fa-minus" className="ml-2.5%" /></button>
                                                </div>

                                                <ul className="grid grid-cols-2 gap-5 text-[#0a0a0a] w-100% text-ellipsis">
                                                    <li><b>Họ và tên:</b> {item.Name_Teacher}</li>
                                                    <li><b>Ngày Sinh:</b> {item.Birthday}</li>
                                                    <li><b>Giới tính:</b> {item.Gender}</li>
                                                    <li><b>Số Điện Thoại:</b> {item.Phone}</li>
                                                    <li><b>Email:</b> {item.Email}</li>
                                                    <li><b>Địa chỉ:</b> {item.Commune + ', ' + item.District + ', ' + item.Province}</li>
                                                    <li><b>CCCD:</b> {item.Cic}</li>
                                                    <li><b>Tôn Giáo:</b> {item.Religion}</li>
                                                    <li><b>Dân Tộc:</b> {item.Ethnicity}</li>
                                                    <li><b>Mật Khẩu:</b> ********</li>
                                                    <li><b>Bậc tốt nghiệp:</b> {item.Mml}</li>
                                                    <li><b>Trình độ chuyên môn:</b> {item.Spl}</li>
                                                    <li><b>Chuyên ngành:</b> {item.Main_Major}</li>
                                                    <li><b>Chức vụ:</b> {item.Position}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">Dữ liệu không có sẵn.</p>
                                )}
                            </div>
                            <div className="flex justify-center my-[10px] mx-[0] py-[10px] px-[0]">
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
                            {showForm && (
                                <div class="fixed inset-0 flex items-center justify-center bg-black z-50 bg-[rgba(0,0,0,.5)]">
                                    <div class="w-[1000px] h-auto rounded-lg border border-gray-400 bg-[#e6e9ef] p-6 overflow-y-auto">
                                        <p className='text-center text-[20px] font-semibold'>Sửa thông tin giáo viên</p>
                                        <div className='flex items-center text-[16px] italic mb-[10px]'>
                                            <FontAwesomeIcon className='ml-[10px]' icon="fa-solid fa-caret-right" />
                                            <p className='ml-[5px] '>Thông tin giáo viên</p>
                                        </div>
                                        <div className="flex">
                                            <div className='w-[50%] flex'>
                                                <div className='w-[40%] ml-[10px] '>
                                                    <p className="py-2">Mã giáo viên:</p>
                                                    <p className="py-2">Họ và tên:</p>
                                                    <p className="py-2">Chọn ảnh đại diện:</p>
                                                    <p className="py-2">Birthday:</p>
                                                    <p className="py-2">Địa chỉ Email:</p>
                                                    <p className="py-2">Số điện thoại:</p>
                                                    <p className="py-2">Cccd:</p>
                                                    <p className="py-2">Mật Khẩu:</p>
                                                    <p className="py-2">Đơn vị đào tạo:</p>
                                                    <p className="py-2">Số bảo hiểm y tế:</p>
                                                    <p className="py-2">Chức vụ:</p>
                                                </div>
                                                <div className='w-[25%] ml-[5px]'>
                                                    <input type="text" value={eCode} onChange={(e) => setECode(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={eName} onChange={(e) => setEName(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input
                                                        onChange={handleImageChange}
                                                        type="file"
                                                        id="chooseimage"
                                                        name="image"
                                                        className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]"
                                                        accept='image/*'
                                                    />
                                                    <input type="date" value={eBirthday} onChange={(e) => setEBirthday(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={eEmail} onChange={(e) => setEEmail(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={ePhone} onChange={(e) => setEPhone(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={eCccd} onChange={(e) => setECccd(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="password" value={ePass} onChange={(e) => setEPass(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={eUnit} onChange={(e) => setEUnit(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={eHealthy} onChange={(e) => setEHealthy(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={ePosition} onChange={(e) => setEPosition(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                </div>
                                            </div>
                                            <div className="w-[50%] flex">
                                                <div className="w-[40%]">
                                                    <p className="py-2">Giới tính:</p>
                                                    <p className="py-2">Tôn giáo:</p>
                                                    <p className="py-2">Quốc Tịch</p>
                                                    <p className="py-2">Dân Tộc:</p>
                                                    <p className="py-2">Địa chỉ:</p>
                                                    <p className="py-2">Tỉnh:</p>
                                                    <p className="py-2">Tp/Huyện:</p>
                                                    <p className="py-2">Xã:</p>
                                                    <p className="py-2">Ngày được nhận:</p>
                                                    <p className="py-2">Hợp đồng:</p>
                                                    <p className="py-2">Số tiết dạy trong ngày:</p>
                                                </div>
                                                <div className="w-[25%]">
                                                    <select value={eGender} onChange={(e) => setEGender(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]"  >
                                                        <option value="ko_xac_dinh">Không xác định</option>
                                                        <option value="Nam">Nam</option>
                                                        <option value="Nữ">Nữ</option>
                                                    </select>
                                                    <input type="text" value={eReligion} onChange={(e) => setEReligion(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={eNation} onChange={(e) => setENation(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={eEth} onChange={(e) => setEEth(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />

                                                    <input type="text" value={eAddress} onChange={(e) => setEAddress(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <select
                                                        className=" block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]"
                                                        value={eProvince}
                                                        onChange={(e) => setEProvince(e.target.value)}
                                                        name="province"
                                                        title="Chọn Tỉnh Thành"
                                                    >
                                                        <option value="0">Tỉnh Thành</option>
                                                        {province.map((provinceItem) => (
                                                            <option key={provinceItem.id} value={provinceItem.id}>
                                                                {provinceItem.full_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        className=" block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]"
                                                        value={eDistrict}
                                                        onChange={(e) => setEDistrict(e.target.value)}  // Cập nhật quận huyện đã chọn
                                                        name="district"
                                                        title="Chọn Quận Huyện"
                                                    >
                                                        <option value="0">Quận Huyện</option>
                                                        {district.map((districtItem) => (
                                                            <option key={districtItem.id} value={districtItem.id}>
                                                                {districtItem.full_name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <select
                                                        value={eCommune}
                                                        onChange={(e) => setECommune(e.target.value)}
                                                        className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]"
                                                        name="commune"
                                                        title="Chọn Phường Xã">
                                                        <option value="0">Phường Xã</option>
                                                        {commune.map((communeItem) => (
                                                            <option key={communeItem.id} value={communeItem.id}>
                                                                {communeItem.full_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <input type="text" value={eRecuimentDay} onChange={(e) => setERecuimentDay(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={eContract} onChange={(e) => setEContract(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                    <input type="text" value={eNots} onChange={(e) => setENots(e.target.value)} className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center text-[16px] italic mt-[10px]'>
                                            <FontAwesomeIcon className='ml-[10px]' icon="fa-solid fa-caret-right" />
                                            <p className='ml-[5px] '>Trình độ giáo dục</p>
                                        </div>
                                        <div className="flex mt-[10px]">
                                            <div className='w-[50%] flex'>
                                                <div className='w-[40%] ml-[10px] '>
                                                    <p className="py-2">Mã trình độ:</p>
                                                </div>
                                                <div className='w-[40%] ml-[5px]'>
                                                    <select
                                                        value={eEduCode}
                                                        onChange={(e) => setEEduCode(e.target.value)}
                                                        className="block w-56 mb-[4px] mt-[2px] rounded-[10px] w-[250px] rounded-md py-1.5 px-2 ring-1 ring-inset ring-[#93b5ff] focus:ring-2 focus:ring-main focus:outline-none focus:text-[#717171]">
                                                        <option>Chọn trình độ</option>
                                                        {edu.map(item => (
                                                            <option key={item.Education_Of_TeacherID} value={item.Education_Of_TeacherID}>{item.Technology_Level} - {item.Main_Major}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex mt-2.5%">
                                            <div
                                                onClick={handTeacherSubmit}
                                                className="w-[30%] rounded-[5px] ml-[15%] mr-[5%] text-center py-2 bg-main text-while cursor-pointer">
                                                Lưu thay đổi
                                            </div>
                                            <div onClick={() => setShowForm(false)} className="w-[30%] rounded-[5px] mr-[15%%] ml-[5%] text-center py-2 bg-[rgb(230,0,18)] text-while cursor-pointer">
                                                Hủy thay đổi
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export { Teacher, CreateTeacher }