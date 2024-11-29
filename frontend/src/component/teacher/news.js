import React, { useEffect, useState } from "react";
import { SideBar, Navigator } from '../layout/layoutteacher';
import SkeletonPage from './sleketon';
import axios from 'axios';

const News = () => {
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [file, setFile] = useState(null);
    const pdfUrl = "https://res.cloudinary.com/dlj9sdjb6/image/upload/v1727267177/lum80dlzcgm1mlvphc27.pdf";
    const wordUrl = 'https://res.cloudinary.com/dlj9sdjb6/raw/upload/v1727267879/rbmypuklnhqj5kle7n7t.docx';

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append('upload_preset', 'tmz6fhxc');
        const resourceType = file.type.startsWith('application/vnd.openxmlformats-officedocument') ? 'raw' : 'image';

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dlj9sdjb6/${resourceType}/upload`, formData);
            console.log('Upload thành công:', response.data);
        } catch (error) {
            console.error('Lỗi khi upload:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const skeletonTimeout = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);
        return () => clearTimeout(skeletonTimeout);
    }, []);

    const skeletonTimeout = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);
    return (
        <>
            <div id='dashboard'>
                <div className='flex'>
                    <SideBar />
                    <div className='w-[calc(100%-450px)] ml-[200px] mr-[250px] h-[100vh] bg-[#e6e9ef] pt-2 pl-3 pr-3'>
                        {showSkeleton ? (
                            <SkeletonPage />
                        ) : (
                            <div id="inclass">
                                <div id="header-class" className="mt-[10px] flex">
                                    <p className="text-[Arial] text-[18px] font-medium">Tin tức </p>
                                    <div>
                                        <input type="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} />
                                        <a className="cursor-pointer" onClick={handleUpload}>Upload PDF</a>
                                        <div style={{ height: '600px' }}>
                                            {pdfUrl && (
                                                <iframe
                                                    src={pdfUrl}
                                                    width="100%"
                                                    height="600"
                                                    title="PDF Viewer"
                                                />
                                            )}
                                            {wordUrl && (
                                                <iframe
                                                    src={`https://docs.google.com/gview?url=${encodeURIComponent(wordUrl)}&embedded=true`}
                                                    width="100%"
                                                    height="600"
                                                    title="Word Viewer"
                                                />

                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Navigator />
                </div>
            </div>
        </>
    )
}

export { News }