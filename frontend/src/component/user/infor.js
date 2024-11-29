import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PersonIcon from '@mui/icons-material/Person';

class InforSearch extends React.Component {
    render() {
        return (
            <>
                <div className="w-[200px] font-sans">
                    <div className="flex">
                    <div className="inputDiv mr-1">
                        <input className="inputBox w-300 border-main" type="text" required />
                        <span>Tìm Kiếm</span>
                    </div>
                    <button className="bg-main text-while p-2 pl-3 pr-3 rounded-small" type="submit"><SearchIcon color="while"/></button>
                    </div>
                </div>
            </>
        )
    }
}

class Login extends React.Component{
    render(){
        return(
            <>
                <div className="w-[360px] border-[3px] border-solid border-main rounded-[15px]">
                    <div className="p-4">
                        <p className="border-l-[3px] border-l-nameSchool text-nameSchool font-semibold text-xl pl-2">Tài Khoản</p>
                        <p className="my-[10px]">
                            <a className="" href="/login"><FontAwesomeIcon className="text-[#c77b06]" icon="fa-solid fa-circle-play" /><span className="ml-1 text-dark">Học sinh, phụ huynh</span></a>
                        </p>
                        <p className="my-[10px]">
                            <a className="" href="/loginforteacher"><FontAwesomeIcon className="text-[#c77b06]" icon="fa-solid fa-circle-play" /><span className="ml-1 text-dark">Viên chức, giáo viên</span></a>
                        </p>
                        <p className="my-[10px]">
                            <a className="" href="/loginacademic"><FontAwesomeIcon className="text-[#c77b06]" icon="fa-solid fa-circle-play" /><span className="ml-1 text-dark">Quản trị viên</span></a>
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

class Admissions extends React.Component{
    render(){
        return(
            <>
                <div className="w-[360px] border-[3px] border-solid border-main rounded-[15px]">
                    <div className="p-4">
                        <p className="border-l-[3px] border-l-nameSchool text-nameSchool font-semibold text-xl pl-2">Thông tin tuyển sinh</p>
                        <p className="my-[10px]">
                            <a className="" href="/login"><FontAwesomeIcon className="text-[#c77b06]" icon="fa-solid fa-circle-play" /><span className="ml-1 text-dark">Tuyển sinh 2024</span></a>
                        </p>
                        <p className="my-[10px]">
                            <a className="" href=""><FontAwesomeIcon className="text-[#c77b06]" icon="fa-solid fa-circle-play" /><span className="ml-1 text-dark">Tra cứu điểm thi</span></a>
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

class Command extends React.Component{
    render(){
        return(
            <>
                <div className="w-[360px] border-[3px] border-solid border-main rounded-[15px]">
                    <div className="p-4">
                        <p className="border-l-[3px] border-l-nameSchool text-nameSchool font-semibold text-xl pl-2">Thông tin chỉ đạo</p>
                        <p className="my-[10px]">
                            <a className="" href="/login"><FontAwesomeIcon className="text-[#c77b06]" icon="fa-solid fa-circle-play" /><span className="ml-1 text-dark">Công văn</span></a>
                        </p>
                        <p className="my-[10px]">
                            <a className="" href=""><FontAwesomeIcon className="text-[#c77b06]" icon="fa-solid fa-circle-play" /><span className="ml-1 text-dark">Văn bản</span></a>
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

class Government extends React.Component{
    render(){
        return(
            <>
                <div className="w-[360px] border-[3px] border-solid border-main rounded-[15px]">
                    <div className="p-4">
                        <p className="border-l-[3px] border-l-nameSchool text-nameSchool font-semibold text-xl pl-2">Chính phủ điện tử</p>
                        <p className="my-[10px]">
                            <a className="" href="/login"><FontAwesomeIcon className="text-[#c77b06]" icon="fa-solid fa-circle-play" /><span className="ml-1 text-dark">Cổng thông tin chính phủ</span></a>
                        </p>
                        <p className="my-[10px]">
                            <a className="" href=""><FontAwesomeIcon className="text-[#c77b06]" icon="fa-solid fa-circle-play" /><span className="ml-1 text-dark">Tra cứu bảo hiểm</span></a>
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

class Access extends React.Component{
    render(){
        return(
            <>
            </>
        )
    }
}

export {InforSearch,Login,Admissions,Command,Government,Access};