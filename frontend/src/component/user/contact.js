import React from "react";
import { HeaderClient, NavClient, FooterClient } from "../layout/layoutclient";

class Contact extends React.Component {
    render() {
        return (
            <>
                <HeaderClient />
                <NavClient />
                <div id="contact">
                    <div className="w-95 ml-2.5% mr-2.5% mb-[1em] h-52 mt-[1em]">
                        <div className="flex">
                        <div className="w-50%">
                        <iframe className="w-[100%] h-[450px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.051182960247!2d105.56703317450777!3d9.929695574241626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a092f4a0cceb9f%3A0x8055aec036c1604c!2zVEhQVCBUcsaw4budbmcgTG9uZyBUw6J5!5e0!3m2!1svi!2s!4v1722426608362!5m2!1svi!2s" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div className="w-50% ml-2.5%">
                            <p className="text-[20px] font-semibold">Thông tin liên hệ</p>
                            <p className="text-[30px] font-semibold">Trường THPT Trường Long Tây</p>
                            <p><b>Địa chỉ:</b> Xã Trường Long Tây, huyện Châu Thành A, tỉnh Hậu Giang</p>
                            <p><b>Điện thoại:</b></p>
                            <p><b>Email:</b> hug-thpttruonglongtay@edu.viettel.vn</p>
                        </div>
                        </div>
                    </div>
                </div>
                <FooterClient />
            </>
        )
    }
}

export { Contact };