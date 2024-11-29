import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const nav = useNavigate();

    const deleteDocument = (stdid) => {
        console.log("document ID to delete:", stdid);
    
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/admin/deletedoc', {
                    id: stdid,
                }).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Document has been deleted.',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Update the local state by filtering out the deleted document
                        setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== stdid));
                        nav('/documment'); // Optional: Navigate if needed
                    });
    
                }).catch(error => {
                    if (error.response && error.response.status === 409) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'The document cannot be deleted because it has associated records.',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Could not delete the document!',
                            confirmButtonText: 'OK'
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your deletion has been cancelled!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    useEffect(() => {
        axios.post('http://localhost:8888/admin/getdoc')
            .then(res => {
                console.log(res.data);
                const dt = res.data;
                const list = dt.map(document => ({
                    id: document.DocumentId,
                    title: document.Title,
                    number: document.Number,
                    startDate: document.StartDate,
                    organ: document.Organ,
                    release: document.Release,
                    type: document.Type,
                    status: document.Status
                }))
                setDocuments(list);
            })
            .catch((error) => {
                console.error('There was an error fetching the documents!', error);
            });
    }, []);

    return (
        <div className="container mx-auto mt-10 p-4 bg-white shadow rounded">
            <div>
                <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Đơn từ</a>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">STT</th>
                            <th className="px-4 py-2 border border-gray-300">Tên văn bản</th>
                            <th className="px-4 py-2 border border-gray-300">Số hiệu</th>
                            <th className="px-4 py-2 border border-gray-300">Phạm vi</th>
                            <th className="px-4 py-2 border border-gray-300">Ngày ban hành</th>
                            <th className="px-4 py-2 border border-gray-300">Trạng thái</th>
                            <th className="px-4 py-2 border border-gray-300">Hành động</th>

                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((document) => (
                            <tr key={document.id}>
                                <td className="border px-4 py-2 text-center">{document.id}</td>
                                <td className="border px-4 py-2">{document.title}</td>
                                <td className="border px-4 py-2">{document.number}</td>
                                <td className="border px-4 py-2">{document.scope}</td>
                                <td className="border px-4 py-2">{document.startDate}</td>
                                <td className="border px-4 py-2">{document.status}</td>
                                <td className="border px-4 py-2">
                                <button onClick={() => deleteDocument(document.id)} >
                                                          delete
                                                        </button>
                                    {/* <button className="btn btn-primary" onClick={() => handleUpdate(feedback.id)}>Edit</button></td> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export { DocumentList };