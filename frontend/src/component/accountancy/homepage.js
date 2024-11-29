import React from "react";
import { Navbar, Header } from "../layout/layoutaccountancy";
import { Dashbroadcontent } from "./dashbroad";
import Chart from "chart.js";
const Homepage = () => {
    return (
        <>
            <div className="flex w-[100%] h-[100%] bg-[#eee] ">
                <div className="absolute w-[100%] bg-main h-[300px] opacity-90 ">

                </div>
                <div className="w-[16%] h-[94%] z-[1] bg-[#fff] fixed left-[13px] top-[25px] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-[15px]">
                    <Navbar />
                </div>
                <div className="bg-[#eee] w-[84%] h-[100%] ml-[16%]">
                    <Header />
                   <Dashbroadcontent/>
                </div>
            </div>
        </>
    );
}
export { Homepage }
