import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { format } from 'date-fns';
import { Navbar, Header } from '../layout/layoutaccountancy';
import React, { useState, useEffect } from 'react';
const OrderList = () => {
    return (
        <>
            <div className="flex w-[100%] h-[100%] bg-[#eee] ">
                <div className="absolute w-[100%] bg-main h-[300px] opacity-90 ">

                </div>
                <div className="w-[16%] h-[94%] z-[1] bg-[#fff] fixed left-[13px] top-[25px] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-[22px]">
                    <Navbar />
                </div>
                <div className="bg-[#eee] w-[84%] h-[100%] ml-[16%]">
                    <Header />
                    <OrderListcontent />
                </div>
            </div>
        </>
    );
}

const OrderListcontent = () => {
    const [order, setOrder] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [ShowOrderdetails, setShowOrderdetails] = useState(false);
    const [selectedOrderID, setSelectedOrderID] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [orderDetails, setOrderDetails] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8888/order/getall')
            .then(response => {
                console.log(response.data);
                setOrder(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the orders!', error);
            });
    }, []);

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };

    const handleViewDetails = (orderID) => {
        axios.post('http://localhost:8888/order/getorder', { orderid: orderID })
            .then(response => {
                console.log("selectedOrder", response.data);
                setSelectedOrder(response.data);
                return axios.post('http://localhost:8888/order/getorderdetails', { orderid: orderID });
            })
            .then(response => {
                console.log("orderdetails", response.data);
                setOrderDetails(response.data);
                const totalQuantity = response.data.reduce((sum, detail) => sum + detail.Quantity, 0);
                const totalPrice = response.data.reduce((sum, detail) => sum + (detail.Unit_Price * detail.Quantity), 0);
                setTotalQuantity(totalQuantity);
                setTotalPrice(totalPrice);
                setShowOrderdetails(true);
            })
            .catch(error => {
                console.error('There was an error fetching the order details!', error);
            });
    };

    const handleConfirm = (orderID) => {
axios.post('http://localhost:8888/order/update', {
            orderid: orderID,
            status: newStatus
        })
            .then(response => {
                console.log(response.data);
                setOrder(prevOrders => prevOrders.map(ord =>
                    ord.OrderID === orderID ? { ...ord, Status: newStatus } : ord
                ));
                setShowForm(false);
            })
            .catch(error => {
                console.error('There was an error updating the order status!', error);
            });
    };

    const handleOpenForm = (orderID, currentStatus) => {
        setSelectedOrderID(orderID);
        setNewStatus(currentStatus);
        setShowForm(true);
    };

    const handleoffform = () => {
        setShowOrderdetails(false);
    };

    return (
        <>
            <div className="w-[100%] flex bg-[#eeee] ">
                <div className="w-[100%] p-[0_20px]">
                    <div className="w-[100%] flex justify-between z-[1] relative p-[20px]">
                        <h1 className="text-[30px] font-bold">Đơn Hàng</h1>
                        <div className="flex justify-between">
                            <div className="flex mr-[15px]">
                                
                            </div>
                        </div>
                    </div>
                    <div className="rounded-15 bg-[#fff] w-[100%] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] z-[1] relative">
                        <div className="w-[100%] pl-[50px] pr-[50px]">
                            <div className="w-[100%]">
                                <table className="w-[100%]">
                                    <thead>
                                        <tr className="border-b-[3px] border-[#ccc] border-solid">
                                            <th className="text-md pr-6 py-3">Mã Đơn</th>
                                            <th className="text-md pr-6 py-3 text-center">Ngày đặt</th>
                                            <th className="text-md pr-6 py-3 text-center">Tổng Tiền</th>
                                            <th className="text-md pr-6 py-3 text-center">Trạng thái</th>
                                            <th className="text-md pr-6 py-3 text-center">Học sinh mua hàng</th>
                                            <th className="text-md pr-6 py-3 text-center">Lớp</th>
                                            <th className="text-md pr-6 py-3 text-center">Xác Nhận</th>
                                            <th className="text-md pr-6 py-3 text-center">Chi tiêt Đơn Hàng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.map((ord) => (
                                            <tr className="border-b-[1px] border-[#ccc] border-solid p-[20px_0]" key={ord.OrderID}>
<td className="p-[16px_0]">{ord.OrderID}</td>
                                                <td>{ord.Order_Date}</td>
                                                <td>{ord.Total_Amount} vnd</td>
                                                <td>
                                                    {ord.Status === 'Xác nhận' ? (
                                                        <div className="bg-[#9ed2eb] rounded-10 font-bold p-[3px_0] text-center">
                                                            <p className="text-[#20338a]">{ord.Status}</p>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-[#e7c9c9] rounded-10 font-bold p-[3px_0] text-center">
                                                            <p className="text-[#f74e4e]">{ord.Status}</p>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="text-center">{ord.StudentName}</td>
                                                <td>{ord.Class_Name}</td>
                                                <td className='text-center'>
                                                    <button
                                                        className="btn btn-primary font-bold text-[#fff]"
                                                        onClick={() => handleOpenForm(ord.OrderID, ord.Status)}
                                                    >
                                                        Xác Nhận
                                                    </button>
                                                </td>
                                                <td className='text-center'>
                                                    <button
                                                        className="btn btn-warning font-bold text-[#fff]"
                                                        onClick={() => handleViewDetails(ord.OrderID)}
                                                    >
                                                        Xem
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showForm && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
<div className='bg-white w-[485px] h-[300px] p-4 rounded-15 shadow-lg'>
                        <button onClick={() => setShowForm(false)} className='btn btn-warning'>Đóng</button>
                        <h1 className="text-center mb-4">Cập Nhật Trạng Thái Đơn Hàng</h1>
                        <form onSubmit={(e) => { e.preventDefault(); handleConfirm(selectedOrderID); }}>
                            <div className='flex flex-col mt-[15px]'>
                                <label className='mb-2'>Trạng Thái:</label>
                                <select
                                    className='border-[1px] border-[#ccc] w-[100%] h-[40px] rounded-10 p-2'
                                    value={newStatus}
                                    onChange={handleStatusChange}
                                >
                                    <option value="Xác nhận">Xác nhận</option>
                                    <option value="Chưa xác nhận">Chưa xác nhận</option>
                                </select>
                            </div>
                            <div className='flex justify-end mt-[20px]'>
                                <button type="submit" className="btn btn-primary">
                                    Xác Nhận
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {ShowOrderdetails && selectedOrder && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white w-[600px] p-[50px] rounded-15 shadow-lg max-h-[80vh] overflow-y-auto'>
                        <h2 className="text-xl font-bold">Chi Tiết Đơn Hàng</h2>
                        <div className="mt-4">
                            {selectedOrder.map((ord, index) => (
                                <tr key={index}>
                                    <p><strong>Mã Đơn: </strong>{ord.OrderID}</p>
                                    <p><strong>Ngày đặt: </strong>{ord.Order_Date}</p>
                                    <p><strong>Tổng Tiền: </strong>{ord.Total_Amount} vnd</p>
                                    <p><strong>Trạng Thái: </strong>{ord.Status}</p>
                                </tr>
                            ))}

                            <h3 className="mt-4 text-lg font-bold">Chi Tiết Sản Phẩm</h3>
                            <table className="mt-4 w-full">
                                <thead>
                                    <tr className="border-b-[3px] border-[#ccc] border-solid">
                                        <th className="text-md pr-6 py-3">Sản Phẩm</th>
                                        <th className="text-md pr-6 py-3">Số Lượng</th>
                                        <th className="text-md pr-6 py-3">Đơn Giá</th>
<th className="text-md pr-6 py-3">Thành Tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetails.map((detail, index) => (
                                        <tr className="border-b-[1px] border-[#ccc] border-solid p-[20px_0]" key={index}>
                                            <td>{detail.Uniform}</td>
                                            <td>{detail.Quantity}</td>
                                            <td>{detail.Unit_Price} vnd</td>
                                            <td>{detail.Quantity * detail.Unit_Price} vnd</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="mt-4"><strong>Tổng Số Lượng: </strong>{totalQuantity}</p>
                            <p><strong>Tổng Giá Trị: </strong>{totalPrice} vnd</p>
                        </div>
                        <button onClick={handleoffform} className='btn btn-warning mt-4'>Đóng</button>
                    </div>
                </div>
            )}
        </>
    );
};


// class OrderList1 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             orders: [],
//             isModalOpen: false,
//             currentOrderID: null,
//             currentStatus: ''
//         };
//     }

//     componentDidMount() {
//         this.fetchOrders();
//     }

//     fetchOrders = () => {
//         axios.get('http://localhost:8888/order/getall')
//             .then(response => {
//                 if (Array.isArray(response.data)) {
//                     this.setState({ orders: response.data });
//                 } else {
//                     console.error('Expected an array, but received:', response.data);
//                     this.setState({ orders: [] });
//                 }
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the orders!', error);
//                 this.setState({ orders: [] });
//             });
//     }

//     openModal = (orderID, currentStatus) => {
//         this.setState({
//             isModalOpen: true,
//             currentOrderID: orderID,
//             currentStatus: currentStatus
//         });
//     }

//     closeModal = () => {
//         this.setState({ isModalOpen: false });
//     }

//     handleUpdate = () => {
//         const { currentOrderID, currentStatus } = this.state;
//         axios.post('http://localhost:8888/order/update', {
//             orderid: currentOrderID.toString(),
//             productid: currentStatus
//         })
//             .then(response => {
//                 console.log(response.data);
//                 this.closeModal();
//                 this.fetchOrders();
//             })
//             .catch(error => {
//                 console.error('There was an error updating the order!', error);
//             });
//     }

//     handleInputChange = (event) => {
//         this.setState({ currentStatus: event.target.value });
//     }

//     renderOrder = (order) => {
//         const student = order.student || {};
//         const studentClass = student.class || {};

//         return (
//             <tr key={order.orderID}>
//                 <td>{order.orderID}</td>
//                 <td>{order.orderDate}</td>
//                 <td>{order.totalAmount}</td>
//                 <td>{order.status}</td>
//                 <td>{student.studentName || 'N/A'}</td>
//                 <td>{studentClass.className || 'N/A'}</td>
//                 <td>
//                     <button
//                         className="btn btn-primary"
//                         onClick={() => this.openModal(order.orderID, order.status)}
//                     >
//                         Update
//                     </button>
//                 </td>
//             </tr>
//         );
//     }

//     render() {
//         const { isModalOpen, currentStatus } = this.state;

//         return (
//             <div className="container p-2 mx-auto sm:p-4 text-gray-800">
//                 <h2 className="mb-4 text-2xl font-semibold leading-tight">Order List</h2>
//                 <div className="overflow-x-auto">
//                     <table className="w-full p-6 text-xs text-left whitespace-nowrap">
//                         <colgroup>
//                             <col className="w-5" />
//                             <col className="w-5" />
//                         </colgroup>
//                         <thead>
//                             <tr className="bg-gray-300">
//                                 <th className="p-3">Order ID</th>
//                                 <th className="p-3">Order Date</th>
//                                 <th className="p-3">Total Amount</th>
//                                 <th className="p-3">Status</th>
//                                 <th className="p-3">Student Name</th>
//                                 <th className="p-3">Class Name</th>
//                                 <th className="p-3">Update</th>
//                             </tr>
//                         </thead>
//                         <tbody className="border-b bg-gray-50 border-gray-300">
//                             {this.state.orders.map(this.renderOrder)}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Modal */}
//                 {isModalOpen && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                         <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                             <h2 className="text-lg font-semibold mb-4">Update Order Status</h2>
//                             <input
//                                 type="text"
//                                 value={currentStatus}
//                                 onChange={this.handleInputChange}
//                                 className="w-full p-2 border border-gray-300 rounded mb-4"
//                             />
//                             <div className="flex justify-end">
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={this.closeModal}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={this.handleUpdate}
//                                 >
//                                     Update
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         );
//     }
// }


export { OrderList, OrderListcontent };