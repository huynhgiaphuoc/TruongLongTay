import React from "react";
import { HeaderClient, NavClient, FooterClient } from "../layout/layoutclient";
import { InforSearch, Login, Admissions, Command, Government, Access } from "../student/infor";

class Schoolcouncil extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="schoolcouncil" className="mb-5 h-auto">
                    <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em]">
                        <div className="flex">
                            <div className="w-75% h-100">
                                <p className="mt-5% text-[30px] font-bold text-center">HỘI ĐỒNG TRƯỜNG</p>
                                <p className="mt-2.5% text-[18px] font-semibold text-center">GIỚI THIỆU VỀ HỘI ĐỒNG TRƯỜNG</p>
                                <p className="text-[18px] font-semibold text-center">TRƯỜNG TRUNG HỌC PHỔ THÔNG LONG TÂY</p>
                                <p className="text-[18px] font-semibold text-center">NHIỆM KỲ 2024-2029</p>
                                <div className="w-80%">
                                    <img className="w-[1070px] h-[650px]" src="../../assets/images/organization/gv.jpg" alt="Img1"></img>
                                </div>
                                <div class="px-6 py-4 bg-gray-100">
                                    <p class="text-gray-600 text-sm text-center italic">Lễ Khai Giảng Năm Học 2023-2024</p>
                                </div>
                                <p className="text-[18px]"><b>1. Chức năng</b></p>
                                <p>Trường Trung Học Phổ Thông Long Tây có chức năng chính là giảng dạy và giáo dục học sinh cấp trung học phổ thông, từ lớp 10 đến lớp 12. Trường cung cấp chương trình giáo dục phổ thông nhằm trang bị cho học sinh kiến thức, kỹ năng cơ bản, và những giá trị nhân văn cần thiết để phát triển toàn diện và chuẩn bị cho các bậc học cao hơn hoặc bước vào đời.</p>
                                <p className="text-[18px]"><b>2. Trách nhiệm và quyền hạn</b></p>
                                <p className="ml-2.5% "><b>Trách nhiệm:</b></p>
                                <ul class="list-decimal pl-5 mb-4 mt-2.5% ">
                                    <li>Đảm bảo chất lượng giáo dục và đào tạo theo chương trình của Bộ Giáo dục và Đào tạo.</li>
                                    <li>Tổ chức các hoạt động ngoại khóa, thể dục thể thao, văn nghệ để phát triển năng khiếu và kỹ năng sống cho học sinh.</li>
                                    <li>Đảm bảo an toàn, an ninh trường học.</li>
                                    <li>Đánh giá, kiểm tra và báo cáo kết quả học tập của học sinh.</li>
                                </ul>
                                <p className="ml-2.5% mt-2.5%"><b>Quyền Hạn</b></p>
                                <ul class="list-disc pl-5 mb-4 mt-2.5% ">
                                    <li>Tuyển dụng và quản lý đội ngũ giáo viên, nhân viên.</li>
                                    <li>Xây dựng và thực hiện kế hoạch giáo dục hàng năm.</li>
                                    <li>Quản lý và sử dụng tài chính, cơ sở vật chất của trường theo quy định.</li>
                                    <li>Khen thưởng và kỷ luật học sinh theo quy định.</li>
                                </ul>
                                <p className="text-[18px]"><b>3. Cơ cấu tổ chức</b></p>
                                <p className="ml-2.5% mt-2.5%"><b>Ban Giám Hiệu:</b></p>
                                <ul class="list-disc pl-5 mb-4 ">
                                    <li><b>Hiệu trưởng:</b> Người đứng đầu trường, chịu trách nhiệm toàn diện về hoạt động của nhà trường.</li>
                                    <li><b>Các phó hiệu trưởng:</b> Hỗ trợ hiệu trưởng trong các lĩnh vực như chuyên môn, quản lý học sinh, cơ sở vật chất.</li>
                                </ul>
                                <p className="ml-2.5% mt-2.5%"><b>Các Tổ Chuyên Môn</b></p>
                                <ul class="list-disc pd-5 mb-4 ml-5%">
                                    <li>Tổ Toán - Tin - QPAN</li>
                                    <li>Tổ Văn - Sử - Địa - GDCD - Tiếng Anh</li>
                                    <li>Tổ Lý - Hóa - Sinh - Công Nghệ</li>
                                    <li>Tổ Văn Phòng</li>
                                </ul>
                                <p className="ml-2.5% mt-2.5%"><b>Các Phòng Ban:</b></p>
                                <ul class="list-disc pd-5 mb-4 ml-5%">
                                    <li>Phòng Hành chính - Quản trị</li>
                                    <li>Phòng Tài chính - Kế toán</li>
                                    <li>Phòng Công tác học sinh, sinh viên</li>
                                    <li>Phòng Thư viện - Thiết bị</li>
                                </ul>
                                <p className="text-[18px] mt-2.5%"><b>4. Hoạt động của Hội đồng trường</b></p>                          
                                    <p className="ml-2.5% mt-2.5%">Hội đồng trường là cơ quan tư vấn và giám sát các hoạt động của nhà trường. Các hoạt động của hội đồng trường bao gồm:</p>
                                <ul class="list-disc pd-5 mb-4 ml-5%">    
                                    <li>Tham gia xây dựng kế hoạch và chiến lược phát triển trường học.</li>
                                    <li>Đánh giá và giám sát việc thực hiện các kế hoạch, chương trình giáo dục.</li>
                                    <li>Tổ chức các cuộc họp định kỳ để thảo luận về các vấn đề liên quan đến giáo dục, quản lý, và phát triển nhà trường.</li>
                                    <li>Đóng góp ý kiến và đưa ra các đề xuất nhằm cải tiến chất lượng giáo dục.</li>
                                    <li>Phối hợp với các tổ chức, đoàn thể trong và ngoài trường để hỗ trợ hoạt động giáo dục và phát triển học sinh.</li>
                                </ul>
                            </div>
                            <div className="w-25% h-100">
                                <div className="ml-4">
                                    <InforSearch />
                                    <div className="mt-3">
                                        <Login />
                                    </div>
                                    <div className="mt-3">
                                        <Admissions />
                                    </div>
                                    <div className="mt-3">
                                        <Command />
                                    </div>
                                    <div className="mt-3">
                                        <Government />
                                    </div>
                                    <div className="mt-3">
                                        <Access />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer" className="">
                    <FooterClient />
                </div>
            </>
        )
    }
}


class Administrators extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="BuyUniforms" className="mb-5 h-auto">
                    <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em]">
                        <div className="flex">
                            <div className="w-75% h-100">
                                <p className="mt-5% text-[30px] font-bold text-center">BAN GIÁM HIỆU</p>
                                <p className="mt-2.5% text-[18px] font-semibold text-center">TRƯỜNG TRUNG HỌC PHỔ THÔNG LONG TÂY</p>
                                <div className="h-8 text-left mt-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">BAN GIÁM HIỆU</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 p-4 bg-while shadow-[0 .125rem .25rem rgba(0, 0, 0, .075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div className="flex">
                                            <div className="w-25%">
                                                <img className="w-[150px] h-[150px] rounded-[10px] " src="../../assets/images/organization/avartar.jpg" />
                                            </div>
                                            <div className="w-75%">
                                                <div className="pl-3">
                                                    <table className="w-[100%]">
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Họ và tên:</b></td>
                                                            <td class="py-2 px-4 text-[20px]"><b>Nguyên Văn Tỉnh</b></td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Chức vụ:</b></td>
                                                            <td class="py-2 px-4">Hiệu Trưởng</td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Học hàm, học vị:</b></td>
                                                            <td class="py-2 px-4">Cử nhân sư phạm</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    
                                    <div className="w-[98%] h-200 pb-[20px]">
                                        <div className="flex mt-2.5%">
                                            <div className="w-25%">
                                                <img className="w-[150px] h-[150px] rounded-[10px] " src="../../assets/images/organization/avartar.jpg" />
                                            </div>
                                            <div className="w-75%">
                                                <div className="pl-3">
                                                    <table className="w-[100%]">
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Họ và tên:</b></td>
                                                            <td class="py-2 px-4 text-[20px]"><b>Nguyễn Trình Thế Tâm</b></td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Chức vụ:</b></td>
                                                            <td class="py-2 px-4">Hiệu Hiệu Phó</td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Học hàm, học vị:</b></td>
                                                            <td class="py-2 px-4">Cử nhân sư phạm</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                            <div className="w-25% h-100">
                                <div className="ml-4">
                                    <InforSearch />
                                    <div className="mt-3">
                                        <Login />
                                    </div>
                                    <div className="mt-3">
                                        <Admissions />
                                    </div>
                                    <div className="mt-3">
                                        <Command />
                                    </div>
                                    <div className="mt-3">
                                        <Government />
                                    </div>
                                    <div className="mt-3">
                                        <Access />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer" className="">
                    <FooterClient />
                </div>
            </>
        )
    }
}


class HeadOfSection extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="BuyUniforms" className="mb-5 h-auto">
                    <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em]">
                        <div className="flex">
                            <div className="w-75% h-100">
                                <p className="mt-5% text-[30px] font-bold text-center">TRƯỞNG BỘ MÔN</p>
                                <p className="mt-2.5% text-[18px] font-semibold text-center">TRƯỜNG TRUNG HỌC PHỔ THÔNG LONG TÂY</p>
                                <div className="h-8 text-left mt-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Tổ Toán - Tin - QPAN</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 p-4 bg-while shadow-[0 .125rem .25rem rgba(0, 0, 0, .075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div className="flex">
                                            <div className="w-25%">
                                                <img className="w-[150px] h-[150px] rounded-[10px] " src="../../assets/images/organization/avartar.jpg" />
                                            </div>
                                            <div className="w-75%">
                                                <div className="pl-3">
                                                    <table className="w-[100%]">
                                                        <tr className="border-b border-blue ">
                                                            <td class="py-2 px-4 text-[15px]"><b>Họ và tên:</b></td>
                                                            <td class="py-2 px-4 text-[20px]"><b>Huỳnh Huy Phong</b></td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Chức vụ:</b></td>
                                                            <td class="py-2 px-4">TTCM</td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Học hàm, học vị:</b></td>
                                                            <td class="py-2 px-4">Thạc Sĩ</td>
                                                        </tr>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px]">
                                        <div className="flex mt-2.5%">
                                            <div className="w-25%">
                                                <img className="w-[150px] h-[150px] rounded-[10px] " src="../../assets/images/organization/avartar.jpg" />
                                            </div>
                                            <div className="w-75%">
                                                <div className="pl-3">
                                                    <table className="w-[100%]">
                                                        <tr className="border-b border-blue ">
                                                            <td class="py-2 px-4 text-[15px]"><b>Họ và tên:</b></td>
                                                            <td class="py-2 px-4 text-[20px]"><b>Nguyễn Ngọc Ngân</b></td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Chức vụ:</b></td>
                                                            <td class="py-2 px-4">TTND</td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Học hàm, học vị:</b></td>
                                                            <td class="py-2 px-4">Cử nhân sư phạm</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="h-8 text-left mt-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Tổ Văn - Sử - Địa - GDCD</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 p-4 bg-while shadow-[0 .125rem .25rem rgba(0, 0, 0, .075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div className="flex">
                                            <div className="w-25%">
                                                <img className="w-[150px] h-[150px] rounded-[10px] " src="../../assets/images/organization/avartar.jpg" />
                                            </div>
                                            <div className="w-75%">
                                                <div className="pl-3">
                                                    <table className="w-[100%]">
                                                        <tr className="border-b border-blue ">
                                                            <td class="py-2 px-4 text-[15px]"><b>Họ và tên:</b></td>
                                                            <td class="py-2 px-4 text-[20px]"><b>Nguyễn Hữu Đường</b></td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Chức vụ:</b></td>
                                                            <td class="py-2 px-4">TTCM</td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Học hàm, học vị:</b></td>
                                                            <td class="py-2 px-4">Thạc Sĩ</td>
                                                        </tr>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex mt-2.5%">
                                        <div className="w-25%">
                                            <img className="w-[150px] h-[150px] rounded-[10px] " src="../../assets/images/organization/avartar.jpg" />
                                        </div>
                                        <div className="w-75%">
                                            <div className="pl-3">
                                                <table className="w-[97%]">
                                                    <tr className="border-b border-blue ">
                                                        <td class="py-2 px-4 text-[15px]"><b>Họ và tên:</b></td>
                                                        <td class="py-2 px-4 text-[20px]"><b>Trần Thanh Nghiêm</b></td>
                                                    </tr>
                                                    <tr className="border-b border-blue">
                                                        <td class="py-2 px-4 text-[15px]"><b>Chức vụ:</b></td>
                                                        <td class="py-2 px-4">Tổ PHó</td>
                                                    </tr>
                                                    <tr className="border-b border-blue">
                                                        <td class="py-2 px-4 text-[15px]"><b>Học hàm, học vị:</b></td>
                                                        <td class="py-2 px-4">Cử nhân sư phạm</td>
                                                    </tr>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="h-8 text-left mt-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Tổ Lý - Hóa - Sinh - Công Nghệ</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 p-4 bg-while shadow-[0 .125rem .25rem rgba(0, 0, 0, .075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div className="flex">
                                            <div className="w-25%">
                                                <img className="w-[150px] h-[150px] rounded-[10px] " src="../../assets/images/organization/avartar.jpg" />
                                            </div>
                                            <div className="w-75%">
                                                <div className="pl-3">
                                                    <table className="w-[100%]">
                                                        <tr className="border-b border-blue ">
                                                            <td class="py-2 px-4 text-[15px]"><b>Họ và tên:</b></td>
                                                            <td class="py-2 px-4 text-[20px]"><b>Võ Thị Tương Lai</b></td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Chức vụ:</b></td>
                                                            <td class="py-2 px-4">TTCM</td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Học hàm, học vị:</b></td>
                                                            <td class="py-2 px-4">Cử nhân sư phạm</td>
                                                        </tr>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-[100%] h-200 pb-[20px]">
                                        <div className="flex mt-2.5%">
                                            <div className="w-25%">
                                                <img className="w-[150px] h-[150px] rounded-[10px] " src="../../assets/images/organization/avartar.jpg" />
                                            </div>
                                            <div className="w-75%">
                                                <div className="pl-3">
                                                    <table className="w-[97%]">
                                                        <tr className="border-b border-blue ">
                                                            <td class="py-2 px-4 text-[15px]"><b>Họ và tên:</b></td>
                                                            <td class="py-2 px-4 text-[20px]"><b>Trương Thị Hồng Thắm</b></td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Chức vụ:</b></td>
                                                            <td class="py-2 px-4">P.CTCĐ</td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Học hàm, học vị:</b></td>
                                                            <td class="py-2 px-4">Cử nhân sư phạm</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="h-8 text-left mt-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <a href="" className="pt-2 pb-2 pl-7 pr-7 relative top-[-5px] bg-nameSchool text-while text-lg uppercase tracking-[2px] m-0 rounded-t-10 hover:text-while">Tổ Văn Phòng</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 p-4 bg-while shadow-[0 .125rem .25rem rgba(0, 0, 0, .075)] border-[.5px] border-solid border-nameSchool rounded-10 rounded-tl-[0px]">
                                    <div className="w-[98%] h-200 pb-[20px] border-b-[1px] border-solid border-main">
                                        <div className="flex">
                                            <div className="w-25%">
                                                <img className="w-[150px] h-[150px] rounded-[10px] " src="../../assets/images/organization/avartar.jpg" />
                                            </div>
                                            <div className="w-75%">
                                                <div className="pl-3">
                                                    <table className="w-[100%]">
                                                        <tr className="border-b border-blue ">
                                                            <td class="py-2 px-4 text-[15px]"><b>Họ và tên:</b></td>
                                                            <td class="py-2 px-4 text-[20px]"><b>Lê Thị Hồng Huấn</b></td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Chức vụ:</b></td>
                                                            <td class="py-2 px-4">TT Văn Phòng</td>
                                                        </tr>
                                                        <tr className="border-b border-blue">
                                                            <td class="py-2 px-4 text-[15px]"><b>Học hàm, học vị:</b></td>
                                                            <td class="py-2 px-4">Trung Cấp</td>
                                                        </tr>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex mt-2.5%">
                                        <div className="w-25%">
                                            <img className="w-[150px] h-[150px] rounded-[10px] " src="../../assets/images/organization/avartar.jpg" />
                                        </div>
                                        <div className="w-75%">
                                            <div className="pl-3">
                                                <table className="w-[97%]">
                                                    <tr className="border-b border-b-dark ">
                                                        <td class="py-2 px-4 text-[15px]"><b>Họ và tên:</b></td>
                                                        <td class="py-2 px-4 text-[20px]"><b>Ngô Quang Hưng</b></td>
                                                    </tr>
                                                    <tr className="border-b border-blue-500">
                                                        <td class="py-2 px-4 text-[15px]"><b>Chức vụ:</b></td>
                                                        <td class="py-2 px-4">Nhân Viên</td>
                                                    </tr>
                                                    <tr className="border-b border-blue-500">
                                                        <td class="py-2 px-4 text-[15px]"><b>Học hàm, học vị:</b></td>
                                                        <td class="py-2 px-4">Y Sỹ</td>
                                                    </tr>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-25% h-100">
                                <div className="ml-4">
                                    <InforSearch />
                                    <div className="mt-3">
                                        <Login />
                                    </div>
                                    <div className="mt-3">
                                        <Admissions />
                                    </div>
                                    <div className="mt-3">
                                        <Command />
                                    </div>
                                    <div className="mt-3">
                                        <Government />
                                    </div>
                                    <div className="mt-3">
                                        <Access />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer" className="">
                    <FooterClient />
                </div>
            </>
        )
    }
}


class StudyPromotionAssociation extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="StudyPromotionAssociation" className="mb-5 h-auto">
                    <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em]">
                        <div className="flex">
                            <div className="w-75% h-100">
                                <p className="mt-5% text-[30px] font-bold text-center">GIỚI THIỆU VỀ HỘI KHUYẾN HỌC</p>
                                <p className="mt-2.5% text-[18px] font-semibold text-center">TRƯỜNG TRUNG HỌC PHỔ THÔNG LONG TÂY</p>
                                <p class="mt-2.5% text-[18px]"><b>1. Chức Năng, Nhiệm Vụ</b></p>
                                <a>Hội Khuyến học Trường Trung Học Phổ Thông Long Tây là một tổ chức đại diện cho nhà trường, đóng vai trò nòng cốt trong việc vận động, liên kết, phối hợp với các tổ chức và cá nhân tham gia các hoạt động khuyến học, khuyến tài và xây dựng xã hội học tập</a><br/><br/>
                                <a>Nhiệm vụ của Hội Khuyến học Trường bao gồm:</a>
                                <ul class="list-disc pl-5 mb-4 mt-2.5% ">
                                    <li>Liên kết và Phối hợp: Hợp tác với các tổ chức và cá nhân để triển khai các hoạt động khuyến học, khuyến tài, xây dựng xã hội học tập theo tinh thần đổi mới căn bản và toàn diện giáo dục và đào tạo.</li>
                                    <li>Tập hợp và Đoàn kết: Tập hợp, đoàn kết và vận động hội viên, các tổ chức, cá nhân cùng tham gia đẩy mạnh các hoạt động khuyến học, khuyến tài, thực hiện công bằng xã hội và tạo cơ hội học tập cho mọi công dân.</li>
                                    <li>Khuyến khích và Hỗ trợ: Khuyến khích viên chức, giáo viên, người lao động có sáng kiến đóng góp hiệu quả cho sự nghiệp xây dựng và phát triển kinh tế xã hội của đất nước; hỗ trợ học bổng cho học sinh nghèo và phần thưởng cho học sinh giỏi có thành tích cao trong học tập và tu dưỡng.</li>
                                    <li>Phát triển Dịch vụ Học tập: Phát triển các hình thức dịch vụ học tập để hỗ trợ và khuyến khích việc học tập của thế hệ trẻ và người đã trưởng thành theo quy định của pháp luật.</li>
                                    <li>Kiến nghị Chính sách: Đề xuất với các tổ chức và cơ quan có thẩm quyền về chính sách để tạo động lực cho các hoạt động khuyến học của Hội.</li>
                                    <li>Quản lý Kinh phí: Quản lý và sử dụng nguồn kinh phí của Hội theo đúng quy định.</li>
                                </ul>

                                <p className="text-[18px]"><b>2. Cơ Cấu Tổ Chức</b></p>

                                <p><b>Ban Chấp Hành:</b> Ban Chấp hành Hội Khuyến học Trường Trung Học Phổ Thông Long Tây bao gồm các thành viên chủ chốt có nhiệm kỳ nhất định, chịu trách nhiệm lãnh đạo và điều hành các hoạt động của Hội.</p>

                                <p><b>Chi Hội Trực Thuộc:</b> Hội Khuyến học Trường có nhiều chi hội trực thuộc, bao gồm:</p>
                                <ul class="list-disc pl-5 mb-4 ">
                                    <li>Chi hội các tổ, phòng ban như Tổ Toán - Tin, Tổ Văn - Sử - Địa, Tổ Lý - Hóa - Sinh, Tổ Ngoại ngữ, Tổ Thể dục - Quốc phòng, Phòng Hành chính - Quản trị, Phòng Tài chính - Kế toán, Phòng Công tác học sinh, sinh viên, Phòng Thư viện - Thiết bị.</li>
                                </ul>
                                <p className="text-[18px]"><b>3. Một Số Hoạt Động của Hội Khuyến Học</b></p>
                                Hội Khuyến học Trường Trung Học Phổ Thông Long Tây hoạt động dưới sự chỉ đạo của Đảng ủy Trường Trung Học Phổ Thông Long Tây và Hội Khuyến học tỉnh Hậu Giang.<br /><br />
                                Trong thời gian qua, Hội Khuyến học Trường đã nhận được sự quan tâm và ủng hộ của nhiều tổ chức, cá nhân mạnh thường quân về tiền mặt và hiện vật. Ban Chấp hành Hội đã sử dụng những đóng góp này đúng mục đích và ý nghĩa, nhằm thúc đẩy các hoạt động khuyến học, khuyến tài của Trường Trung Học Phổ Thông Long Tây. Các hoạt động nổi bật bao gồm:
                                <ul class="list-disc pl-5 mb-4 mt-2.5% ">
                                    <li><b>Hỗ trợ Học bổng:</b> Cấp học bổng cho học sinh nghèo vượt khó, học sinh có thành tích học tập xuất sắc.</li>
                                    <div className="w-80%">
                                        <img className="w-[1070px] h-[550px] mt-5%" src="../../assets/images/organization/hkh_letet.jpg" alt="Img1"></img>
                                    </div>
                                    <div class="px-6 py-4 bg-gray-100">
                                        <p class="text-gray-600 text-sm text-center italic">Đón xuân vui tết cùng học sinh có hoàn cảnh khó khăn 2024-2025</p>
                                    </div>
                                    <li><b>Tổ chức Cuộc thi và Sự kiện:</b> Tổ chức các cuộc thi, sự kiện nhằm khuyến khích học sinh tham gia học tập và rèn luyện.</li>
                                    <div className="w-80%">
                                        <img className="w-[1070px] h-[550px] mt-5%" src="../../assets/images/organization/hkh_hb.jpg" alt="Img2"></img>
                                    </div>
                                    <div class="px-6 py-4 bg-gray-100">
                                        <p class="text-gray-600 text-sm text-center italic">Hội Thi Hùng Biện Chủ Đề Tự Hào Tuổi Trẻ Hậu Giang</p>
                                    </div>
                                    <li><b>Hợp tác và Phát triển:</b> Phối hợp với các tổ chức và cá nhân trong và ngoài trường để triển khai các chương trình khuyến học và khuyến tài.</li>
                                    <div className="w-80%">
                                        <img className="w-[1070px] h-[550px] mt-5%" src="../../assets/images/organization/hkh_letet.jpg" alt="Img3"></img>
                                    </div>
                                    <div class="px-6 py-4 bg-gray-100">
                                        <p class="text-gray-600 text-sm text-center italic"></p>
                                    </div>
                                </ul>
                                <p>Hội Khuyến học Trường Trung Học Phổ Thông Long Tây cam kết tiếp tục nỗ lực và phát triển các hoạt động khuyến học, góp phần xây dựng môi trường học tập tích cực và sáng tạo cho học sinh.</p>
                            </div>

                            <div className="w-25% h-100">
                                <div className="ml-4">
                                    <InforSearch />
                                    <div className="mt-3">
                                        <Login />
                                    </div>
                                    <div className="mt-3">
                                        <Admissions />
                                    </div>
                                    <div className="mt-3">
                                        <Command />
                                    </div>
                                    <div className="mt-3">
                                        <Government />
                                    </div>
                                    <div className="mt-3">
                                        <Access />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer" className="">
                    <FooterClient />
                </div>
            </>
        )
    }
}





export {Schoolcouncil,StudyPromotionAssociation,Administrators,HeadOfSection}