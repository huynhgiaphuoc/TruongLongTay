import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Carousels = () => {
    const [slide, setSlide] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:8888/admin/slider')
            .then(response => {
                const dt = response.data;
                const list = dt.map(item => ({
                    id: item.SlideID,
                    path: item.SlidePath,
                    title: item.Title,
                    image: item.slideImage,
                    decs: item.Desc
                }))
                setSlide(list);
            })
            .catch(error => console.error(error));
    },[]);
    return (
        <>

            <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
                {slide.length > 0 ? (
                    slide.map((item, index) => (
                        <img className="w-[800px] h-[300px] rounded-[10px] sm:w-[100%]" src={item.path}  />
                    ))
                ) : (
                    <tr>
                        <td>Dữ liệu không có sẵn.</td>
                    </tr>
                )}
            </Carousel>

        </>
    )
}

class News extends React.Component {
    render() {
        return (
            <>
                <section id="notifications">
                    <div className="h-8 text-left mt-4">
                        <div className="flex justify-between">
                            <div>
                                <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Tin Tức</a>
                            </div>
                            <div>
                                <a href="">Xem tất cả</a>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 p-4 bg-while shadow-[0,.125rem,.25rem,rgba(0,0,0,.075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                        <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                            <div className="flex">
                                <div className="w-25%">
                                    <img className="w-[250px] h-[150px] rounded-[10px] sm:h-[250px]" src="../../assets/images/news/giaoluu.png" />
                                </div>
                                <div className="w-75%">
                                    <div className="pl-3">
                                        <a className="w-100 font-semibold" href="">CHƯƠNG TRÌNH ASEAN CAMP LẦN THỨ 5 TẠI TRƯỜNG ĐẠI HỌC RAJABHAT RAJANAGARINDRA </a>
                                        <p className="text-[15px] pt-3">Thông tin về các hoạt động Hội trại ASEAN CAMP tại Trường Đại học Rajabhat Rajạnagarindra từ ngày 11-15/7/2023</p>
                                        <div className="flex justify-between mt-2.5%">
                                            <div>
                                                <a className="text-[13px] font-semibold text-while bg-nameSchool pt-[8px] pb-[8px] pl-[18px] pr-[18px] rounded-[20px] hover:text-while hover:opacity-50 hover:no-underline transition-all duration-500" href="">Xem thêm</a>
                                            </div>
                                            <div>
                                                <AccessTimeIcon color="primary" />
                                                <span className="pl-3 relative top-[1.5px]">18/04/2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-[98%] h-200 mt-3 pb-[20px] border-b-[1px] border-solid border-main">
                            <div className="flex">
                                <div className="w-25%">
                                    <img className="w-[250px] h-[150px] rounded-[10px] sm:h-[250px]" src="../../assets/images/home/banners/1.png" />
                                </div>
                                <div className="w-75%">
                                    <div className="pl-3">
                                        <a className="w-100 font-semibold" href="">CHƯƠNG TRÌNH ASEAN CAMP LẦN THỨ 5 TẠI TRƯỜNG ĐẠI HỌC RAJABHAT RAJANAGARINDRA </a>
                                        <p className="text-[15px] pt-3">Thông tin về các hoạt động Hội trại ASEAN CAMP tại Trường Đại học Rajabhat Rajạnagarindra từ ngày 11-15/7/2023</p>
                                        <div className="flex justify-between mt-2.5%">
                                            <div>
                                                <a className="text-[13px] font-semibold text-while bg-nameSchool pt-[8px] pb-[8px] pl-[18px] pr-[18px] rounded-[20px] hover:text-while hover:opacity-50 hover:no-underline transition-all duration-500" href="">Xem thêm</a>
                                            </div>
                                            <div>
                                                <AccessTimeIcon color="primary" />
                                                <span className="pl-3 relative top-[1.5px]">18/04/2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

class Document extends React.Component {
    render() {
        return (
            <>
                <section id="document">
                <div className="h-8 text-left mt-5">
                        <div className="flex justify-between">
                            <div>
                                <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Văn Bản Mới</a>
                            </div>
                            <div>
                                <a href="">Xem tất cả</a>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 p-4 bg-while shadow-[0_.125rem_.25rem_rgba(0,0,0,.075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                        <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                            <div className="flex">
                                <div className="w-25%">
                                    <img className="w-[250px] h-[150px] rounded-[10px] sm:h-[250px]" src="../../assets/images/home/banners/1.png" />
                                </div>
                                <div className="w-75%">
                                    <div className="pl-3">
                                        <a className="w-100 font-semibold" href="">CHƯƠNG TRÌNH ASEAN CAMP LẦN THỨ 5 TẠI TRƯỜNG ĐẠI HỌC RAJABHAT RAJANAGARINDRA </a>
                                        <p className="text-[15px] pt-3">Thông tin về các hoạt động Hội trại ASEAN CAMP tại Trường Đại học Rajabhat Rajạnagarindra từ ngày 11-15/7/2023</p>
                                        <div className="flex justify-between mt-2.5%">
                                            <div>
                                                <a className="text-[13px] font-semibold text-while bg-nameSchool pt-[8px] pb-[8px] pl-[18px] pr-[18px] rounded-[20px] hover:text-while hover:opacity-50 hover:no-underline transition-all duration-500" href="">Xem thêm</a>
                                            </div>
                                            <div>
                                                <AccessTimeIcon color="primary" />
                                                <span className="pl-3 relative top-[1.5px]">18/04/2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export { Carousels, News, Document }