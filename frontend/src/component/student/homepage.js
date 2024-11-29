import React, { useEffect, useState } from 'react';
import { Acc, Stu, Stun, Stunn, Tabbar } from '../layout/layoutstudents';
const Student = () => {
    return (
        <>
            <div class="h-screen flex justify-center items-center bg-antiquewhite font-sans">
                <div className="mt-4 mb-4 grid h-[97%] w-[97%] bg-custom-gradient overflow-hidden rounded-[1.5rem] border border-[#f0f0f0] grid-cols-[11rem_auto_20rem]">
                    <Stu />
                    <div>
                        <Stun />
                        <Tabbar />
                        <Stunn />

                    </div>
                    <div className="p-8 bg-pink-50 min-h-screen">
                        <Acc />
                    </div>


                </div>
            </div>
        </>
    )
}

export { Student }