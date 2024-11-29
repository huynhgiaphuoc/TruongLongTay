import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navbar, Header } from '../layout/layoutaccountancy';
import * as XLSX from 'xlsx';
const Uniformmanage = () => {
    return (
        <>
            <div className="flex w-[100%] h-[100%] bg-[#eee] ">
                <div className="absolute w-[100%] h-[300px] opacity-90 bg-[#7ebefa] ">

                </div>
                <div className="w-[16%] h-[94%] z-[1] bg-[#fff] fixed left-[13px] top-[25px] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-[22px]">
                    <Navbar />
                </div>
                <div className="bg-[#eee] w-[84%] h-[100%] ml-[16%]">
                    <Header />
                    <Uniformmanage1 />
                </div>
            </div>
        </>
    );
}

const Uniformmanage1 = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [uniform, setUniform] = useState({});
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [inventory, setInventory] = useState('');
    const [image, setImage] = useState(null);
    const [path, setPath] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

   
    useEffect(() => {
        axios.get('http://localhost:8888/product/products')
            .then(response => {
                setProducts(response.data);
                console.log("product",response.data)
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);
     const handleUpload = async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'tmz6fhxc');
        let resourceType = 'raw';
        if (image.type.startsWith('image/')) {
            resourceType = 'image';
        } else if (image.type.startsWith('video/')) {
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
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        XLSX.writeFile(workbook, 'Products.xlsx');
    };
    const handleSetting = (id) => {
        axios.post("http://localhost:8888/product/productbyid", { id: id })
            .then(response => {
                console.log("data", response.data)
                const product = response.data;
                setUniform(product);
                setName(product.uniform);
                setPrice(product.price);
                setSize(product.size);
                setQuantity(product.quantity);
                setInventory(product.inventory);
                setImage(product.imageuniform);
                setPath(product.imagepath);
                setShowForm(true);
            })
            .catch(error => {
                console.error('There was an error fetching the product by id!', error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    const validate = () => {
        if (!name) {
            Swal.fire('Validation Error', 'Tên sản phẩm không được để trống', 'error');
            return false;
        }
        if (!price) {
            Swal.fire('Validation Error', 'Giá không được để trống', 'error');
            return false;
        }
        else if (isNaN(price)) {
            Swal.fire('Validation Error', 'Giá phải là số', 'error');
            return false;
        }
        if (!size) {
            Swal.fire('Validation Error', 'Size không được để trống', 'error');
            return false;
        }
        if (!quantity) {
            Swal.fire('Validation Error', 'Tổng số lượng không được để trống', 'error');
            return false;
        }
        else if (isNaN(quantity)) {
            Swal.fire('Validation Error', 'Số lượng phải là số', 'error');
            return false;
        }
        if (!inventory) {
            Swal.fire('Validation Error', 'Còn lại không được để trống', 'error');
            return false;
        }
        else if (isNaN(inventory)) {
            Swal.fire('Validation Error', 'Còn lại phải là số', 'error');
            return false;
        }
        else if (inventory > quantity) {
            Swal.fire('Validation Error', 'Còn lại không thể lớn hơn tổng số lượng', 'error');
            return false;
        }
        return true;
    };

    if (!validate()) {
        return;
    }
    const imageUrl = await handleUpload(image);  
    const productData = {
        name,
        size,
        price: price.toString(),
        path: 'assets/images/resources/', 
        image: imageUrl, 
        quantity,
        inventory,
    };
        try {
            const response = await axios.post('http://localhost:8888/product/edit', productData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            Swal.fire('Success', 'Cập nhật sản phẩm thành công!', 'success');
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error('There was an error updating the product!', error);
            Swal.fire('Error', 'Có lỗi xảy ra khi cập nhật sản phẩm!', 'error');
        }
    };
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
            text: "Thao tác này không thể hoàn tác!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, xóa nó!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`http://localhost:8888/product/delete`, { id })
                    .then(response => {
                        setProducts(products.filter(p => p.id !== id));
                        Swal.fire(
                            'Đã xóa!',
                            'Sản phẩm đã được xóa.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('There was an error deleting the product!', error);
                        Swal.fire('Error', 'Có lỗi xảy ra khi xóa sản phẩm!', 'error');
                    });
            }
        });
    };


    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
        } else {
            setImage(null);
            console.log("dell có dễ")
        }
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {showForm && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white w-[485px] h-[600px] p-4 rounded-15 shadow-lg'>
                        <h1 className='text-center font-bold'>Chỉnh sửa sản phẩm</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='flex justify-between mt-[15px]'>
                                <p className='pt-[10px] m-[0px_5px]'>Tên Sản Phẩm: </p>
                                <input
                                    className='border-[1px] border-[#ccc] w-[300px] h-[40px] rounded-10'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='flex justify-between mt-[15px]'>
                                <p className='pt-[10px] m-[0px_5px]'>Giá : </p>
                                <input
                                    className='border-[1px] border-[#ccc] w-[300px] h-[40px] rounded-10'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className='flex justify-between mt-[15px]'>
                                <p className='pt-[10px] m-[0px_5px]'>Kích Cỡ : </p>
                                <input
                                    className='border-[1px] border-[#ccc] w-[300px] h-[40px] rounded-10'
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                />
                            </div>
                            <div className='flex justify-between mt-[15px]'>
                                <p className='pt-[10px] m-[0px_5px]'>Tổng Số Lượng : </p>
                                <input
                                    className='border-[1px] border-[#ccc] w-[300px] h-[40px] rounded-10'
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className='flex justify-between mt-[15px]'>
                                <p className='pt-[10px] m-[0px_5px]'>Tổng Còn Lại : </p>
                                <input
                                    className='border-[1px] border-[#ccc] w-[300px] h-[40px] rounded-10'
                                    value={inventory}
                                    onChange={(e) => setInventory(e.target.value)}
                                />
                            </div>
                            <div className='flex justify-between mt-[15px]'>
                                <p className='pt-[10px] m-[0px_5px]'>Hình ảnh : </p>
                                <div>
                                    <input type='file' onChange={handleImageChange} />
                                    <img src={path + image} alt="Current" className='w-[100px] h-[100px] mt-[10px] rounded-10' />

                                </div>
                            </div>
                            <div className='flex justify-center mt-[20px]'>
                                <button onClick={() => setShowForm(false)} className='btn btn-warning mr-[10px] '>Đóng</button>
                                <button type="submit" className="btn btn-primary">
                                    Cập Nhật Sản Phẩm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-[100%] flex bg-[#eeee]">
                <div className="w-[100%] p-[0_20px]">
                    <div className="w-[100%] flex justify-between p-[20px] relative z-10">
                        <h1 className="text-[30px] font-bold">Đồng phục</h1>
                        <div className="flex justify-between">
                            <div className="flex mr-[15px]">
                                <button className='btn btn-success font-bold' onClick={exportToExcel}>
                                    <FontAwesomeIcon icon="fa-solid fa-download" className='text-[20px] mr-[5px]' />
                                    Xuất File
                                </button>
                            </div>
                            <div className="btn btn-primary ">
                                <a href='/Addproduct' className='btn btn-primary font-bold'>
                                    <FontAwesomeIcon icon="fa-solid fa-circle-plus" className='text-[20px] relative top-[3px] mr-[5px]' />
                                    Thêm Sản Phẩm
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-15 bg-[#fff] w-[100%] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] relative z-10">
                        <div className="w-[100%] pl-[50px] pr-[50px]">
                            <div className="w-[100%]">
                                <table className="w-[100%]">
                                    <thead>
                                        <tr className="border-b-[3px] border-[#ccc] border-solid">
                                            <th className="text-md pr-6 py-3">STT</th>
                                            <th className="text-md pr-6 py-3 text-center">Sản Phẩm</th>
                                            <th className="text-md pr-6 py-3 text-center">Hình ảnh</th>
                                            <th className="text-md pr-6 py-3 text-center">Giá</th>
                                            <th className="text-md pr-6 py-3 text-center">Kích Cỡ</th>
                                            <th className="text-md pr-6 py-3 text-center">Số Lượng Tổng</th>
                                            <th className="text-md pr-6 py-3 text-center">Còn Lại</th>
                                            <th className="text-md pr-6 py-3 text-center">Chỉnh Sửa</th>
                                            <th className="text-md pr-6 py-3 text-center">Xóa Sản Phẩm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProducts.map((product, index) => {
                                            const imageUrl = `${product.imagepath}${product.imageuniform}`;
                                            return (
                                                <tr className="border-b-[1px] border-[#ccc] border-solid p-[20px_0]" key={product.id}>
                                                    <td>{indexOfFirstProduct + index + 1}</td>
                                                    <td>{product.uniform}</td>
                                                    <td><img src={product.imagepath} className="w-[60px] h-[80px] rounded-10 m-[20px_0]" alt={product.imagepath} /></td>
                                                    <td>{product.price} vnd</td>
                                                    <td>{product.size}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.inventory || 0}</td>
                                                    <td className='text-center'>
                                                        <button className="btn btn-warning font-bold text-[#fff] " onClick={() => handleSetting(product.id)}>Chỉnh Sửa</button>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className="btn btn-danger font-bold text-center" onClick={() => handleDelete(product.id)}>Xóa</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="flex justify-center mt-6 m-[20px_0] p-[10px_0]">
                                    {pageNumbers.map(number => (
                                        <button
                                            key={number}
                                            onClick={() => setCurrentPage(number)}
                                            className={` ${number === currentPage ? 'bg-[#000000] text-[#fff] rounded-50 font-bold w-[30px] h-[30px] p-[5px]' : 'bg-[#eee] text-[#374151] rounded-50 m-[0_5px] w-[40px] h-[40px] p-[10px] '} hover:bg-[#89bde7] hover:text-[#000]`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Addproduct = () => {
    return (
        <>
            <div className="flex w-[100%] h-[100%] bg-[#eee] ">
                <div className="absolute w-[100%] bg-[#93cafd] h-[300px] opacity-90 ">

                </div>
                <div className="w-[16%] h-[94%] z-[1] bg-[#fff] fixed left-[13px] top-[25px] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-[22px]">
                    <Navbar />
                </div>
                <div className="bg-[#eee] w-[84%] h-[100%] ml-[16%]">
                    <Header />
                    <Addproduct1 />
                </div>
            </div>
        </>
    );
}


const Addproduct1 = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [inventory, setInventory] = useState('');
    const navigate = useNavigate();
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleUpload = async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'tmz6fhxc');
        let resourceType = 'raw';
        if (image.type.startsWith('image/')) {
            resourceType = 'image';
        } else if (image.type.startsWith('video/')) {
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
    const validate = () => {
        if (!name) {
            Swal.fire('Validation Error', 'Tên sản phẩm không được để trống', 'error');
            return false;
        }
        if (!price) {
            Swal.fire('Validation Error', 'Giá không được để trống', 'error');
            return false;
        }
        else if (isNaN(price)) {
            Swal.fire('Validation Error', 'Giá phải là số', 'error');
            return false;
        }
        if (!size) {
            Swal.fire('Validation Error', 'Size không được để trống', 'error');
            return false;
        }
        if (!quantity) {
            Swal.fire('Validation Error', 'Tổng số lượng không được để trống', 'error');
            return false;
        }
        else if (isNaN(quantity)) {
            Swal.fire('Validation Error', 'Số lượng phải là số', 'error');
            return false;
        }
        if (!inventory) {
            Swal.fire('Validation Error', 'Còn lại không được để trống', 'error');
            return false;
        }
        else if (isNaN(inventory)) {
            Swal.fire('Validation Error', 'Còn lại phải là số', 'error');
            return false;
        }
        else if (inventory>quantity) {
            Swal.fire('Validation Error', 'Còn lại không thể lớn hơn tổng sổ lượng', 'error');
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        if (image) {
            try {
                const imageUrl = await handleUpload(image);  
                const productData = {
                    name,
                    size,
                    price: price.toString(),
                    path: 'assets/images/resources/', 
                    image: imageUrl, 
                    quantity,
                    inventory,
                };
                await axios.post('http://localhost:8888/product/add', productData);
                setName('');
                setPrice('');
                setSize('');
                setQuantity('');
                setInventory(''); 
                setImage(null);
                Swal.fire({
                    title: 'Success',
                    text: 'Thêm sản phẩm thành công!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = '/uniformmanage'; 
                });
    
            } catch (error) {
                Swal.fire('Error', 'Có lỗi xảy ra khi upload hình ảnh!', 'error');
            }
        }
    };
    
    return (
        <>
            <div className=" bg-[#eeee] text-center w-[100%] ">
                <div className="rounded-15 bg-[#fff] w-[50%] p-[10px] relative z-[1] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] inline-block">
                    <p className='font-bold  text-[30px]'>Thêm sản phẩm</p>
                    <form onSubmit={handleSubmit} className='p-[20px]'>

                        <div className='flex w-[75%] justify-between m-[30px_0]'>
                            <p className=' border-l-[5px] border-solid border-[#93cafd] pl-[5px] font-bold text-[15px] h-[22px] relative top-[8px]'>Tên sản phẩm: </p>
                            <input
                                className='border-[1px] border-[#ccc] w-[300px] h-[50px] rounded-10'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='flex w-[75%] justify-between m-[30px_0]'>
                            <p className=' border-l-[5px] border-solid border-[#93cafd] pl-[5px] font-bold text-[15px] h-[22px] relative top-[8px]'>Giá : </p>
                            <input
                                className='border-[1px] border-[#ccc] w-[300px] h-[50px] rounded-10'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className='flex w-[75%] justify-between m-[30px_0]'>
                            <p className='border-l-[5px] border-solid border-[#93cafd] pl-[5px] font-bold text-[15px] h-[22px] relative top-[8px]'>
                                Kích Cỡ:
                            </p>
                            <select
                                className='border-[1px] border-[#ccc] w-[300px] h-[50px] rounded-10'
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>
                        <div className='flex w-[75%] justify-between m-[30px_0]'>
                            <p className=' border-l-[5px] border-solid border-[#93cafd] pl-[5px] font-bold text-[15px] h-[22px] relative top-[8px]'>Tổng Số Lượng : </p>
                            <input
                                className='border-[1px] border-[#ccc] w-[300px] h-[50px] rounded-10'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className='flex w-[75%] justify-between m-[30px_0]'>
                            <p className=' border-l-[5px] border-solid border-[#93cafd] pl-[5px] font-bold text-[15px] h-[22px] relative top-[8px]'>Tổng Còn Lại : </p>
                            <input
                                className='border-[1px] border-[#ccc] w-[300px] h-[50px] rounded-10'
                                value={inventory}
                                onChange={(e) => setInventory(e.target.value)}
                            />
                        </div>
                        <div className='flex w-[75%] justify-between m-[30px_0]'>
                            <p className=' border-l-[5px] border-solid border-[#93cafd] pl-[5px] font-bold text-[15px] h-[22px] relative top-[8px]'>Hình ảnh : </p>
                            <input type='file' onChange={handleImageChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Thêm sản phẩm
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export { Addproduct, Uniformmanage, Uniformmanage1, Addproduct1 };