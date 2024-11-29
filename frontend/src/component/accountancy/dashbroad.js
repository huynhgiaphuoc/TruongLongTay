import React, { useState, useEffect,useRef  } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);
const Dashbroadcontent = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [growth, setGrowth] = useState(0);
    const [orderToday, setOrderToday] = useState(0);
    const [ordergrowth, setOrdergrowth] = useState(0);
    const [product, setProduct] = useState(0);
    const [productgrowth, setProductgrowth] = useState(0);
    const [orderall, setOrderall] = useState(0);
    const [orderCountData, setOrderCountData] = useState([]);
    const lineChartRef = useRef(null);
    const lineChartRef2 = useRef(null);
    useEffect(() => {
        axios.post('http://localhost:8888/accountancy/revenue')
            .then(response => {
                console.log("Data: " + response.data);
                setMonthlyData(response.data);
                createCharts(response.data);
                getrenuevue();
                getordertoday();
                getproductsaled();
                getordercount();
            }).catch(error => console.error('Error fetching data:', error));
        axios.post('http://localhost:8888/accountancy/getordercountchart')
            .then(response => {
                console.log("Data1: ", response.data);
                setOrderCountData(response.data);
                createCharts1(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    const getrenuevue = () => {
        axios.post('http://localhost:8888/accountancy/gerenuevue')
            .then(response => {
                setRevenue(response.data);
                axios.post('http://localhost:8888/accountancy/getreucompare')
                    .then(response => {
                        console.log("hhvhhh", response.data)
                        setGrowth(response.data);
                    })
            }).catch(error => console.error('Error fetching data:', error));
    }
    const getordertoday = () => {
        axios.post('http://localhost:8888/accountancy/getordertoday')
            .then(response => {
                setOrderToday(response.data);
                axios.post('http://localhost:8888/accountancy/getordercompare')
                    .then(response => {
                        console.log("hhvhhh", response.data)
                        setOrdergrowth(response.data);
                    })
            }).catch(error => console.error('Error fetching data:', error));
    }
    const getproductsaled = () => {
        axios.post('http://localhost:8888/accountancy/getproductsaled')
            .then(response => {
                setProduct(response.data);
                axios.post('http://localhost:8888/accountancy/productcompare')
                    .then(response => {
                        console.log("hhvhhh", response.data)
                        setProductgrowth(response.data);
                    })
            }).catch(error => console.error('Error fetching data:', error));
    }
    const getordercount = () => {
        axios.post('http://localhost:8888/accountancy/countallorder')
            .then(response => {
                setOrderall(response.data);
            }).catch(error => console.error('Error fetching data:', error));
    }
    const createCharts1 = (data) => {
        const ctx = lineChartRef2.current.getContext('2d');

        const years = data.map(item => item.Year);
        const months = data.map(item => item.Month);
        const totalOrders = data.map(item => item.TotalOrders);

        new ChartJS(ctx, {
            type: 'line',
            data: {
                labels: months.map((month, idx) => `Tháng ${month} Năm ${years[idx]}`),
                datasets: [{
                    label: 'Số lượng đơn hàng',
                    data: totalOrders,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.raw} đơn hàng`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tháng'
                        },
                        ticks: {
                            color: '#ccc'
                        },
                        grid: {
                            display: false,
                            color: '#ccc'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Số lượng'
                        },
                        ticks: {
                            color: '#ccc'
                        },
                        grid: {
                            color: '#ccc'
                        }
                    }
                }
            }
        });
    };

    const createCharts = (data) => {
        const labels = data.map(item => `${item.Year}`);
        const totalAmounts = data.map(item => item.TotalAmount);
        
        if (lineChartRef.current) {
            const ctx = lineChartRef.current.getContext('2d');
            new ChartJS(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Doanh thu',
                        backgroundColor: "#f3b7ad",
                        borderColor: "#f3b7ad",
                        data: totalAmounts,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        x: {
                            ticks: {
                                color: "#ccc",
                            },
                            grid: {
                                display: false,
                                color: "#ccc",
                            },
                        },
                        y: {
                            ticks: {
                                color: "#ccc",
                            },
                            grid: {
                                color: "#ccc",
                            },
                        },
                    },
                },
            });
        }
    };

    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };
    return (
        <>
            <div className="columns-4 ml-[40px] mt-[30px] relative z-[1] ">
                <div className="w-[270px] h-[110px] bg-[#fff] rounded-10 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-[10px] ">
                    <div className='flex justify-between'>
                        <div>
                            <p className='text-[#ccc] font-bold'>Doanh thu hôm nay</p>
                            <p className='font-bold text-[20px]'><FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" /> {revenue.toFixed(2)}</p>
                        </div>
                        <div>
                            <div className='w-[40px] h-[40px] bg-[#93aec1] rounded-50 relative'>
                                <FontAwesomeIcon icon="fa-solid fa-coins" className='text-[#fff] absolute bottom-[12px] left-[10px] text-[20px]' />
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-[10px]'>
                        <p className={`font-bold ${growth >= 0 ? 'text-[#45c42b]' : 'text-[#ec6a52]'}`}>{growth}%</p>
                        <p className='font-bold ml-[5px] text-[#ccc]'>so với hôm qua</p>
                    </div>
                </div>

                <div className="w-[270px] h-[110px] bg-[#fff] rounded-10 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-[10px]">
                    <div className='flex justify-between'>
                        <div>
                            <p className='text-[#ccc] font-bold'>Đơn hôm nay</p>
                            <p className='font-bold text-[20px]'>{orderToday}</p>
                        </div>
                        <div>
                            <div className='w-[40px] h-[40px] bg-[#ec6a52] rounded-50 relative'>
                                <FontAwesomeIcon icon="fa-solid fa-clipboard" className='text-[#fff] absolute bottom-[11px] left-[12px] text-[20px]' />
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-[10px]'>
                        <p className={`font-bold ${ordergrowth >= 0 ? 'text-[#45c42b]' : 'text-[#ec6a52]'}`}> {ordergrowth}%</p>
                        <p className='font-bold ml-[5px] text-[#ccc]'>so với hôm qua</p>
                    </div>
                </div>

                <div className="w-[270px] h-[110px] bg-[#fff] rounded-10 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-[10px]">
                    <div className='flex justify-between'>
                        <div>
                            <p className='text-[#ccc] font-bold'>Sản phẩm bán ra</p>
                            <p className='font-bold text-[20px]'>{product}</p>
                        </div>
                        <div>
                            <div className='w-[40px] h-[40px] bg-[#9dbdba] rounded-50 relative'>
                                <FontAwesomeIcon icon="fa-solid fa-shop" className='text-[#fff] absolute bottom-[11px] left-[8px] text-[20px]' />
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-[10px]'>
                        <p className={`font-bold ${productgrowth >= 0 ? 'text-[#45c42b]' : 'text-[#ec6a52]'}`}>{productgrowth}%</p>
                        <p className='font-bold ml-[5px] text-[#ccc]'>so với hôm qua</p>
                    </div>
                </div>

                <div className="w-[270px] h-[110px] bg-[#fff] rounded-10 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-[10px]">
                    <div className='flex justify-between'>
                        <div>
                            <p className='text-[#ccc] font-bold'>Tổng đơn</p>
                            <p className='font-bold text-[20px]'>{orderall}</p>
                        </div>
                        <div>
                            <div className='w-[40px] h-[40px] bg-[#f8b042] rounded-50 relative'>
                                <FontAwesomeIcon icon="fa-solid fa-clipboard-list" className='text-[#fff] absolute bottom-[11px] left-[12px] text-[20px]' />
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-[10px]'>
                        <p>+10%</p>
                        <p className='font-bold ml-[5px] text-[#ccc]'>so với hôm qua</p>
                    </div>
                </div>
            </div>

            {/* <div className="w-[100%] flex p-[30px_40px] justify-between ">
                <div className="w-[60%] h-[100%]">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded bg-[#fff] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
                        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h6 className="uppercase text-[#374151]-100 mb-1 text-xs font-semibold">
                                        Xem xét
                                    </h6>
                                    <h2 className="text-[#374151] text-xl font-semibold">Doanh thu năm</h2>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex-auto">
                            <div className="relative h-[250px]">
                            <canvas ref={lineChartRef} id="line-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[38%]">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                                        Thống kê
                                    </h6>
                                    <h2 className="text-blueGray-700 text-xl font-semibold">
                                        Tổng đơn hàng
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex-auto">
                            <div className="relative h-[250px]">
                            <canvas ref={lineChartRef2} id="line-chart2"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

            </div> */}
            {/* <div className='w-[100%] p-[30px_40px] '>
                <div className='columns-3'>
                    <div className='shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] bg-[#fff] w-[380px] h-[300px] text-center p-[15px] rounded-10'>
                        <div className='inline-block w-[50px] h-[50px] rounded-50 bg-[#fa6565] '>
                            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" className='text-[#fff] text-[25px]  p-[12px]' />
                        </div>
                        <h3 className='font-bold text-[20px]'>Quy định</h3>
                        <p className='mt-[20px]'>  Tất cả các giao dịch tài chính phải được ghi nhận đầy đủ và chính xác.
                            Các chứng từ và hóa đơn cần được lưu trữ và kiểm tra theo đúng quy định pháp luật.
                            Việc quản lý quỹ và sổ sách kế toán phải tuân thủ các nguyên tắc kế toán hiện hành.
                        </p>
                    </div>
                    <div className='shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] bg-[#fff] w-[380px] h-[300px] text-center p-[15px] rounded-10'>
                        <div className='inline-block w-[50px] h-[50px] rounded-50 bg-[#52bfff] '>
                            <FontAwesomeIcon icon="fa-solid fa-hand" className='text-[#fff] text-[25px]  p-[12px]' />
                        </div>
                        <h3 className='font-bold text-[20px]'>Nguyên tắc</h3>
                        <p className='mt-[20px] text-justify inline-block'>
                            1. Nguyên tắc trung thực và chính xác
                            <br />
                            2. Nguyên tắc nhất quán
                            <br />
                            3. Nguyên tắc độc lập
                            <br />

                            4. Nguyên tắc lưu trữ
                        </p>
                    </div>
                    <div className='shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] bg-[#fff] w-[380px] h-[300px] text-center p-[15px] rounded-10'>
                        <div className='inline-block w-[50px] h-[50px] rounded-50 bg-[#f6f86f] '>
                            <FontAwesomeIcon icon="fa-solid fa-coins" className='text-[#fff] text-[25px]  p-[12px]' />
                        </div>
                        <h3 className='font-bold text-[20px]'>Quản lí</h3>
                        <p className='mt-[20px] text-justify inline-block'>
                            1.Quản lý thu chi
                            <br />
                            2.Quản lý ngân sách
                            <br />
                            3.Quản lý báo cáo tài chính
                            <br />

                            4.Quản lý tài sản
                        </p>
                    </div>
                </div>
            </div> */}

        </>
    );
}
export { Dashbroadcontent }