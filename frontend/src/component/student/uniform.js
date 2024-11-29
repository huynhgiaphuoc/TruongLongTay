import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeaderClient, NavClient, FooterClient } from "../layout/layoutclient";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


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
            axios.post('http://localhost:8888/cart/add', {
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
                      
                    </div>
                </div>
            </div>
            <div id="footer" className="">
                <FooterClient />
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-15">
                    <div className="bg-white p-5 rounded-lg">
                        <h2 className="text-lg font-bold">Sản phẩm đã được thêm vào giỏ hàng!</h2>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="btn btn-primary"
                            >
                                Tiếp tục mua sắm
                            </button>
                            <a href="/cart" className="btn btn-warning">
                                Qua giỏ hàng
                            </a>
                        </div>
                    </div>
                </div>
            )};
        </>
    );
};
export { BuyUniforms }