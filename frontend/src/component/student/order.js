import React, { useState, useEffect } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { South } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({});
    const handleSizeChange = (productID, size) => {
        setSelectedSizes(prevSizes => ({
            ...prevSizes,
            [productID]: size
        }));
    };

    const handleQuantityChange = (newQuantity, uniformId) => {
        const userID = sessionStorage.getItem('userId');
        if (newQuantity > 0) {
            axios.post('http://localhost:8888/student/cart/update', {
                userID,
                productid: uniformId,
                quantity: newQuantity
            })
                .then(() => {
                    setCartItems(prevCartItems =>
                        prevCartItems.map(item =>
                            item.UniformID === uniformId ? { ...item, quantity: newQuantity } : item
                        )
                    );
                })
                .catch(error => {
                    console.error("Đã xảy ra lỗi khi cập nhật số lượng!", error);
                });
        } else {
            axios.post('http://localhost:8888/student/cart/delete', { userID, productid: uniformId })
                .then(() => fetchCartItems(userID))
                .catch(error => {
                    console.error("Đã xảy ra lỗi khi xóa sản phẩm!", error);
                });
        }
    };

    const handleDelete = (uniformID) => {
        const userID = sessionStorage.getItem('userId');
        axios.post('http://localhost:8888/student/cart/delete', { userID, productid: uniformID })
            .then(() => fetchCartItems(userID))
            .catch(error => {
                console.error("Đã xảy ra lỗi khi xóa sản phẩm!", error);
            });
    };

    const fetchCartItems = (userID) => {
        console.log("userID", userID)
        axios.post('http://localhost:8888/student/cart/getcart', { userID })
            .then(response => {
                const uniform = response.data;
                console.log("dataaaa", uniform);
                setCartItems(uniform);
                uniform.forEach(element => {
                    const id = element.UniformID;
                    axios.post('http://localhost:8888/product/productbyid', { id })
                        .then(response => {
                            console.log("Data", response.data)
                            setProducts(prevProducts => [...prevProducts, response.data]);
                        })
                        .catch(error => {
                            console.error("Đã xảy ra lỗi khi lấy giỏ hàng!", error);
                            setCartItems([]);
                        });
                });
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi lấy giỏ hàng!", error);
                setCartItems([]);
            });
    };

    useEffect(() => {
        const userID = sessionStorage.getItem('userId');
        fetchCartItems(userID);
    }, []);

    const calculateTotal = () => {
        if (Array.isArray(cartItems)) {
            return cartItems.reduce((total, item, index) => {
                const product = products[index];
                if (product) {
                    return total + (product.price * item.quantity);
                }
                return total;
            }, 0);
        }
        return 0;
    };
    return (
        <>
            <div className="p-[100px] flex w-100%">
                <div className='bg-[#EFEFEF] p-5 w-80% rounded-10'>
                    {cartItems.length > 0 && products.length > 0 ? (
                        cartItems.map((item, index) => {
                            const product = products[index];
                            return (
                                <div key={index}>
                                    <div className="flex w-100%">
                                        <img className="w-[100px] h-[100px] border-[1px] border-[#000] border-solid rounded-10" src="/assets/resources/1.jpg" alt={product.uniform} />
                                        <div className="w-[400px] pl-4">
                                            <h5>{product.uniform}</h5>
                                            <div className="pt-[1rem]">
                                                <select
                                                    value={selectedSizes[item.UniformID] || ''}
                                                    onChange={(e) => handleSizeChange(item.UniformID, e.target.value)}
                                                    className="ml-2 p-2 border rounded">
                                                    <option value="" disabled>{product.size}</option>
                                                    <option value="S">S</option>
                                                    <option value="M">M</option>
                                                    <option value="L">L</option>
                                                </select>
                                                <div className='flex'>
                                                    <p>Giá: </p>
                                                    <p className='font-bold'>{product.price} VNĐ</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex m-[15px_30px] bg-[transparent] w-[132px] border-[solid] border-[2px] h-[40px] rounded-15">
                                            <button
                                                onClick={() => handleQuantityChange(item.quantity - 1, item.UniformID)}
                                                className="h-[40px] w-[40px] font-bold"
                                            >
                                                -
                                            </button>
                                            <input
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(parseInt(e.target.value), item.UniformID)}
                                                className="w-[50px] text-center m-[0] bg-[#EFEFEF] "
                                                readOnly
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(item.quantity + 1, item.UniformID)}
                                                className="h-[40px] w-[40px] font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            <h5 className='font-bold'>Total: {product.price * item.quantity} VNĐ</h5>
                                            <div className='flex'>
                                                <p className='text-[#FFCC00] w-[100px] font-bold'>{product.brand}</p>
                                                <button onClick={() => handleDelete(item.UniformID)} className="ml-[20px] text-red-500">
                                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-100% h-[1px] bg-[#ccc] m-[1rem_0]"></div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Giỏ hàng của bạn đang trống.</p>
                    )}

                </div>
                <div className='w-[30%] bg-[#f1f1f1] ml-[30px] p-[50px_20px] h-[100%]'>
                    <div>
                        <h4 className='font-bold border-l-[5px] border-[#FFCC00] pl-[10px] font-[20px]'>Giỏ Hàng Của Bạn</h4>
                    </div>
                    <div className='mt-4'>
                        {cartItems.map((cartItem) => {
                            const product = products.find(product => product.id === cartItem.UniformID);

                            if (product) {
                                return (
                                    <div key={product.id} className="mb-4">
                                        <div className='flex justify-between'>
                                            <div className='flex'>
                                                <p className='mt-2 pl-2'>{product.uniform}</p>
                                                <p className='mt-2 pl-2'> x {cartItem.quantity}:</p>
                                            </div>
                                            <p>{product.price * cartItem.quantity} VNĐ</p>
                                        </div>
                                        <div className='w-full h-px bg-[#ccc] my-2'></div>
                                    </div>
                                );
                            }

                            return null;
                        })}
                        <div className='w-100% h-[1px] bg-[#f1f1f1]'></div>
                        <div className='flex justify-between mt-3'>
                            <p className='font-bold'>Tổng Tiền: </p>
                            <p className='font-bold'>{calculateTotal()} VNĐ</p>
                        </div>
                        <div className='text-center mt-[20px]'>
                            <a href='/payment' className='w-[80%] inline-block font-[700] btn btn-warning h-[50px] p-[11px_0]'>
                                Thanh Toán
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Payment = () => {
    const [student, setStudent] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const userID = sessionStorage.getItem('userId');
        axios.post('http://localhost:8888/student/cart/getcart', { userID })
            .then(response => {
                console.log("data", response.data);
                setCartItems(response.data);
                response.data.forEach((e) => {
                    const uid = e.UniformID;
                    axios.post('http://localhost:8888/product/productbyid', { id: uid })
                        .then(response => {
                            console.log("Data", response.data)
                            setProducts(prevProducts => [...prevProducts, response.data]);
                        })
                        .catch(error => {
                            console.error("Đã xảy ra lỗi khi lấy giỏ hàng!", error);
                            setCartItems([]);
                        });
                })

            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi lấy giỏ hàng!", error);
                setCartItems([]);
            });
        axios.post('http://localhost:8888/student/getstudent', { userID })
            .then(response => {
                setStudent(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setStudent(null);
                console.error("Lỗi ở student", error);
            });
    }, []);

    const handlePaymentByZalo = () => {
        const totalAmount = calculateTotal();
        const userID = sessionStorage.getItem('userId');

        axios.post('http://localhost:8888/payment/vnpay', { userID, totalAmount })
            .then(response => {
                const paymentUrl = response.data;
                console.log("paymentUrl", paymentUrl);
                window.location.href = paymentUrl;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handlePaymentByMomo = () => {
        const totalAmount = calculateTotal().toString();
        const userID = sessionStorage.getItem('userId');
        const data = {
            userID: userID,
            totalAmount: totalAmount
        };

        axios.post('http://localhost:8888/payment/momo', { userID, totalAmount })
            .then(response => {
                const momoApiUrl = response.data.payUrl;
                navigate(`/${momoApiUrl}`);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };



    const calculateTotal = () => {
        if (Array.isArray(cartItems) && Array.isArray(products)) {
            return cartItems.reduce((total, item) => {
                const product = products.find(product => product.id === item.UniformID);
                console.log("product", product)
                if (product) {
                    const totals = total + (product.price * item.quantity);
                    return totals.toString();
                }
                return total.toString();
            }, 0);
        }
        return 0;
    };


    return (
        <>
            <div className="p-[100px] flex w-100%">
                <div className='bg-[#EFEFEF] p-5 w-80%'>
                    <h4 className='border-l-[5px] border-solid border-[#FFCC00] pl-[5px] font-bold text-[20px]'>Học Sinh Mua Đồng Phục</h4>
                    {student.length > 0 ? (
                        student.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className='flex mt-4'>
                                        <div className='flex'>
                                            <p className='font-bold m-2'>Học Sinh: </p>
                                            <input value={item.Student_Name} readOnly className='rounded-10 pl-2' />
                                        </div>
                                        <div className='w-[100px]'></div>
                                        <div className='flex'>
                                            <p className='font-bold m-2'>Lớp: </p>
                                            <input value={item.Class_Name} readOnly className='rounded-10 pl-2' />
                                        </div>
                                    </div>

                                    <div className='mt-4 flex'>
                                        <p className='font-bold m-2'>Số Điện thoại: </p>
                                        <p className='m-2'>{item.Phone}</p>
                                    </div>

                                    <div className='mt-4 flex'>
                                        <p className='font-bold m-2'>Địa Chỉ: </p>
                                        <p className='m-2'>{item.Permanent_Address}</p>
                                    </div>

                                    <div className='mt-4 flex'>
                                        <p className='font-bold m-2'>Email: </p>
                                        <p className='m-2'>{item.Email}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Trống</p>
                    )}





                    <h4 className='mt-5 border-l-[5px] border-solid border-[#FFCC00] pl-[5px] font-bold text-[20px]'>Thanh Toán</h4>
                    <div className='flex mt-4'>
                        <a onClick={handlePaymentByMomo}>
                            <img className="w-[75px] h-[50px] pl-2 cursor-pointer" src="assets/images/Payment/momo.png" alt="Momo" />
                        </a>
                        <a onClick={handlePaymentByZalo}>
                            <img className="w-[80px] h-[55px] pl-4 cursor-pointer" src="assets/images/Payment/vnpay.jpg" alt="VNPAY" />
                        </a>
                    </div>
                </div>

                <div className='w-[30%] bg-[#EFEFEF] ml-[30px] p-[50px_20px] h-[100%]'>
                    <div className='font-bold border-l-[5px] border-[#FFCC00] pl-[10px] text-[20px]'>
                        <h4>Giỏ Hàng Của Bạn</h4>
                    </div>
                    <div className='mt-4'>
                        {cartItems.map((cartItem) => {
                            const product = products.find(product => product.id === cartItem.UniformID);

                            if (product) {
                                return (
                                    <div key={product.id} className="mb-4">
                                        <div className='flex justify-between'>
                                            <div className='flex'>
                                                <p className='mt-2 pl-2'>{product.uniform}</p>
                                                <p className='mt-2 pl-2'> x {cartItem.quantity}:</p>
                                            </div>
                                            <p>{product.price * cartItem.quantity} VNĐ</p>
                                        </div>
                                        <div className='w-full h-px bg-[#ccc] my-2'></div>
                                    </div>
                                );
                            }

                            return null;
                        })}
                        <div className='flex justify-between mt-3'>
                            <p className='font-bold'>Tổng Tiền: </p>
                            <p className='font-bold'>{calculateTotal()} VNĐ</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};


export { Cart, Payment }
