import React, { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import { HeaderClient, NavClient, FooterClient } from "../layout/layoutclient";
import { InforSearch, Login, Admissions, Command, Government, Access } from "./infor";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import Swal from 'sweetalert2';
const linkdrive = "https://drive.usercontent.google.com/download?id=1r_Gjnh6TZuaHv0YWgSwlXW6GALGAlHUt&export=download&authuser=0";


const Test = () => {
    
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="schoolcouncil" className="mb-5 h-auto">
                    <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em]">
                        <div className="flex">
                            <div className="w-75% h-100">
                                <p className="mt-5% text-[30px] font-bold text-center">THAM KHẢO ĐỀ THI - KIỂM TRA</p>
                                <div className="w-[900px] h-[1000px] ml-10% mr-10%">
                                    <Carousels />
                                </div>
                            </div>
                            <div className="w-25% h-100">
                                <div className="ml-4">
                                    <InforSearch />
                                    <div className="mt-3">
                                        <Login />
                                    </div>
                                    <div className="mt-3">
                                        <Admissions />
                                    </div>
                                    <div className="mt-3">
                                        <Command />
                                    </div>
                                    <div className="mt-3">
                                        <Government />
                                    </div>
                                    <div className="mt-3">
                                        <Access />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer" className="">
                    <FooterClient />
                </div>
            </>
        )
    
}

const Carousels = () => {
    const [test, setTest] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:8888/admins/test')
            .then(response => {
                const dt = response.data;
                const list = dt.map(item => ({
                    id: item.examTestID,
                    path: item.examTestPath,
                    title: item.Title,
                    image: item.examTestImage
                }))
                setTest(list);
            })
            .catch(error => console.error(error));
    });

    return (
        <>
            <Carousel showThumbs={false} autoPlay={false} infiniteLoop={true}>
                {test.length > 0 ? (
                    test.map((item, index) => (
                        <img className="w-[900px] h-[960px] rounded-[10px] sm:w-[100%]" src={item.path} />
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



class ComputerTutorial extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="ComputerTutorial" className="mb-5 h-auto">
                    <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em]">
                        <div className="flex">
                            <div className="w-75% h-100">
                                <p className="mt-5% text-[30px] font-bold text-center">HƯỚNG DẪN TIN HỌC</p>
                                <p className="mt-2.5% text-[18px] font-semibold text-center">TRƯỜNG TRUNG HỌC PHỔ THÔNG LONG TÂY</p>
                                <div className="h-8 text-left mt-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Microsoft Word</a>
                                        </div>
                                    </div>
                                </div>
                                <div className=" p-4 bg-while shadow-[0 .125rem .25rem rgba(0, 0, 0, .075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div>
                                            <p><b>1. Giới thiệu về Microsoft Word</b></p>
                                            <a>Microsoft Word là một phần mềm soạn thảo văn bản mạnh mẽ và phổ biến, được sử dụng rộng rãi trong môi trường giáo dục và công việc. Dưới đây là một hướng dẫn cơ bản giúp bạn nắm vững những thao tác chính trong Microsoft Word.</a>
                                        </div>
                                    </div>
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div>
                                            <p className="mt-2.5%"><b>2. Khởi Động và Làm Quen với Giao Diện</b></p>
                                            <ul className="list-disc ml-5%">
                                                <li><b>Mở Microsoft Word:</b> Nhấp đúp vào biểu tượng Microsoft Word trên màn hình desktop hoặc tìm trong menu Start.</li>
                                                <li><b>Giao Diện:</b> Giao diện Word bao gồm thanh công cụ Ribbon ở phía trên, khu vực soạn thảo ở giữa, và thanh trạng thái ở phía dưới.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div>
                                            <p className="mt-2.5%"><b>3. Tạo và Lưu Văn Bản</b></p>
                                            <ul className="list-disc ml-5%">
                                                <li><b>Tạo Văn Bản Mới:</b> Chọn “File” - “New” - “Blank document”.</li>
                                                <li><b>Lưu Văn Bản:</b> Chọn “File” - “Save As”. Chọn nơi bạn muốn lưu, đặt tên file và chọn định dạng (ví dụ: .docx). Nhấn “Save”.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div>
                                            <p className="mt-2.5%"><b>4. Định Dạng Văn Bản</b></p>
                                            <ul className="list-disc ml-5%">
                                                <li><b>Font Chữ:</b> Chọn đoạn văn bản cần định dạng. Sử dụng các công cụ trong nhóm “Font” trên thanh công cụ Ribbon để thay đổi font chữ, kích thước, màu sắc, in đậm, in nghiêng, gạch chân, v.v.</li>
                                                <li><b>Căn Chỉnh Văn Bản</b> Sử dụng các nút căn chỉnh (trái, phải, giữa, đều) trong nhóm “Paragraph” để căn chỉnh văn bản theo ý muốn.</li>
                                                <li><b>Khoảng Cách Dòng:</b> Chọn đoạn văn bản và sử dụng nút “Line and Paragraph Spacing” để thay đổi khoảng cách dòng.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div>
                                            <p className="mt-2.5%"><b>6. Chèn Các Yếu Tố Khác</b></p>
                                            <ul className="list-disc ml-5%">
                                                <li><b>Chèn Hình Ảnh:</b> Chọn “Insert” - “Pictures”. Chọn hình ảnh từ máy tính và nhấn “Insert”.</li>
                                                <li><b>Chèn Bảng: </b> Chọn “Insert” - “Table”. Chọn số hàng và cột mong muốn.</li>
                                                <li><b>Chèn Liên Kết:</b> Chọn đoạn văn bản cần tạo liên kết, nhấn “Insert” - “Link”. Nhập URL và nhấn “OK”.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div>
                                            <p className="mt-2.5%"><b>7. Sử Dụng Các Công Cụ Kiểm Tra</b></p>
                                            <ul className="list-disc ml-5%">
                                                <li><b>Kiểm Tra Chính Tả: </b> Word sẽ tự động kiểm tra chính tả và ngữ pháp khi bạn gõ. Các lỗi sẽ được gạch chân màu đỏ (chính tả) hoặc xanh (ngữ pháp). Nhấn chuột phải vào từ sai để xem các gợi ý sửa lỗi.</li>
                                                <li><b>Tìm Kiếm và Thay Thế:</b>  Chọn “Home” - “Find” hoặc nhấn “Ctrl + F” để tìm kiếm từ hoặc cụm từ. Sử dụng “Replace” để thay thế từ/cụm từ.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div>
                                            <p className="mt-2.5%"><b>8. In Văn Bản</b></p>
                                            <ul className="list-disc ml-5%">
                                                <li><b>In:</b> Chọn “File” - “Print”. Kiểm tra cài đặt máy in, số lượng bản in, và nhấn “Print”.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div>
                                            <p className="mt-2.5%"><b>9. Một Số Thủ Thuật Hữu Ích</b></p>
                                            <ul className="list-disc ml-5%">
                                                <li><b>Sao Chép, Cắt, Dán:</b> Sử dụng các phím tắt “Ctrl + C” (sao chép), “Ctrl + X” (cắt), và “Ctrl + V” (dán) để di chuyển hoặc sao chép văn bản nhanh chóng.</li>
                                                <li><b>Hoàn Tác và Làm Lại:</b> Sử dụng “Ctrl + Z” để hoàn tác và “Ctrl + Y” để làm lại.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div>
                                            <p className="mt-2.5%"><b>10. Một Số Giáo Trình Tham Khảo</b></p>
                                            <ul className="list-disc ml-5%">
                                                <li><a href={linkdrive}>Tải Tại Đây</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-25% h-100">
                                <div className="ml-4">
                                    <InforSearch />
                                    <div className="mt-3">
                                        <Login />
                                    </div>
                                    <div className="mt-3">
                                        <Admissions />
                                    </div>
                                    <div className="mt-3">
                                        <Command />
                                    </div>
                                    <div className="mt-3">
                                        <Government />
                                    </div>
                                    <div className="mt-3">
                                        <Access />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div id="footer" className="">
                    <FooterClient />
                </div>
            </>
        )
    }
}


const BuyUniforms = () => {
    const [products, setProducts] = useState([]);
    const userID = sessionStorage.getItem('userId');
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:8888/product/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);
    
    const renderProduct = (product) => {
        const imageUrl = `${product.imagepath}${product.imageuniform}`;
        const productid = product.id;
        const quantity = 1;
        const handleAddCart = () => {
            if (!userID) {
                alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
                return;
            }
       
            console.log("m in ra t coi coi", userID, product.id);
            axios.post('http://localhost:8888/student/cart/add', {
                userID,
                productid,
                quantity
            })
                .then(response => {
                    setIsModalOpen(true);
                })
                .catch(error => {
                    console.error('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng!', error);
                });
        };

        return (
            <div key={product.id} className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                <div className="flex mt-2.5%">
                    <div className="w-25%">
                        <img className="w-[250px] h-[220px] rounded-[10px]" src={imageUrl} alt={product.uniform} />
                    </div>
                    <div className="w-75%">
                        <div className="flex">
                            <div className="w-75% pl-3">
                                <a className="w-100 font-semibold size-6">{product.uniform}</a>
                                <p className="text-[15px] pt-3"><b>Giá:</b> {product.price}đ</p>
                              
                                <div className="flex justify-between mt-5%">
                                    <div>
                                        <button
                                            className="text-[17px] font-semibold text-white bg-nameSchool pt-[8px] pb-[8px] pl-[18px] pr-[18px] rounded-[20px] hover:text-white hover:opacity-50 hover:no-underline transition-all duration-500"
                                            onClick={handleAddCart}
                                        >
                                            Mua
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleAddCart}>
                                <ShoppingCartIcon className="text-blue-500 hover:text-red-500 transition-colors duration-300" style={{ fontSize: 30 }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div id="header">
                <HeaderClient />
                <NavClient />
            </div>
            <div id="BuyUniforms" className="mb-5 h-auto">
                <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em]">
                    <div className="flex">
                        <div className="w-75% h-100">
                            <p className="mt-5% text-[30px] font-bold text-center">MUA ĐỒNG PHỤC</p>
                            <p className="mt-2.5% text-[18px] font-semibold text-center">TRƯỜNG TRUNG HỌC PHỔ THÔNG LONG TÂY</p>
                            <div className="h-8 text-left mt-4">
                                <div className="flex justify-between">
                                    <div>
                                        <a href="#" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-white text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-white">Áo</a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 p-4 bg-white shadow-[0 .125rem .25rem rgba(0, 0, 0, .075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                                {products.map(product => renderProduct(product))}
                            </div>
                        </div>
                        <div className="w-25% h-100">
                            <div className="ml-4">
                                <InforSearch />
                                <div className="mt-3">
                                    <Login />
                                </div>
                                <div className="mt-3">
                                    <Admissions />
                                </div>
                                <div className="mt-3">
                                    <Command />
                                </div>
                                <div className="mt-3">
                                    <Government />
                                </div>
                                <div className="mt-3">
                                    <Access />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer" className="">
                <FooterClient />
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg rounded-10">
                        <h2 className="text-lg font-bold">Sản phẩm đã được thêm vào giỏ hàng!</h2>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="btn btn-primary"
                            >
                                Tiếp tục mua sắm
                            </button>
                            <a href="/cart" className="btn btn-warning">
                                Đi đến giỏ hàng
                            </a>
                        </div>
                    </div>
                </div>
            )};
        </>
    );
};



export { ComputerTutorial, Test, BuyUniforms }