import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPage = () => {
    return (
        <div className="w-full h-[100vh] p-4">
            {/* Skeleton for header */}
            <div className="mb-4">
                <Skeleton height={40} width={200} />
            </div>
            {/* Skeleton for content */}
            <div className="flex flex-col space-y-4">
                <Skeleton height={50} />
                <Skeleton height={30} count={5} />
                <Skeleton height={200} />
            </div>
            {/* Skeleton for footer */}
            <div className="mt-4">
                <Skeleton height={40} width={150} />
            </div>
        </div>
    );
};

export default SkeletonPage;