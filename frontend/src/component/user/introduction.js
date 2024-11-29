import React from "react";
import { HeaderClient, NavClient, FooterClient } from "../layout/layoutclient";
import { InforSearch, Login, Admissions, Command, Government, Access } from "./infor";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

class Intro extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="introduction">
                    <div id="content" className="mb-5 h-auto">
                        <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em]">
                            <div className="flex">
                                <div className="w-75% h-40 mt-[25px]">
                                    <div className="flex">
                                        <div className="w-50% mt-5%">
                                            <img className="w-[80%] shadow-[0_28px_50px_rgba(0,0,0,.16)] rounded-10" src="../../assets/images/introduction/intro/intro.jpg" />
                                        </div>
                                        <div className="w-50%">
                                            <p className="text-[20px] text-[Arial] uppercase border-l-[5px] border-solid border-main pl-3 font-[600]">Lịch Sử Phát Triển</p>
                                            <p>Trường THPT Trường Long Tây được thành lập vào năm 2009, trong bối cảnh đất nước đang chuyển mình mạnh mẽ. Sự ra đời của trường không chỉ là nhu cầu cấp thiết của xã hội mà còn là mong mỏi của người dân địa phương về một cơ sở giáo dục chất lượng, nơi đào tạo nên những thế hệ tri thức, nhân tài cho đất nước. Những ngày đầu thành lập, trường có ít lớp học rất đơn sơ, với trên dưới 300 học sinh đầu tiên và đội ngũ giáo viên khiêm tốn chưa đến 20 thầy cô. Trong hoàn cảnh còn nhiều khó khăn về cơ sở vật chất, trường đã phải đối mặt với thách thức lớn trong việc đảm bảo chất lượng giảng dạy và học tập. Tuy nhiên, với tinh thần nỗ lực không ngừng, sự quyết tâm của ban giám hiệu cùng sự tận tụy của các thầy cô giáo, trường đã vượt qua những khó khăn ban đầu, từng bước khẳng định vị thế của mình trong hệ thống giáo dục tỉnh nhà. Đến nay đội ngũ giáo viên đã đầy đủ với trình độ chuyên môn cao.</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="mt-[2em] uppercase"><AccountTreeIcon /> Quy Mô Phát Triển</h4>
                                        <p>Những năm sau đó, trường tiếp tục phát triển mạnh mẽ về quy mô và chất lượng. Nhờ sự quan tâm đầu tư của chính quyền và sự đồng lòng của toàn thể nhà trường, cơ sở vật chất đã được cải thiện rõ rệt. Đến năm 2022, trường đã hoàn thành việc xây dựng thêm các khu phòng học mới, phòng thí nghiệm hiện đại, thư viện với hàng ngàn đầu sách, cùng khu thể thao ngoài trời và nhà thi đấu đa năng. Những công trình này không chỉ phục vụ tốt cho việc dạy và học mà còn tạo điều kiện để học sinh phát triển toàn diện về thể chất và tinh thần.</p>
                                        <h4 className="mt-[2em] uppercase"><EmojiEventsIcon className="relative top-[-2px]" /> Giải Thưởng Nổi Bật</h4>
                                        <p>Về mặt chuyên môn, nhà trường luôn chú trọng đến việc nâng cao chất lượng giảng dạy. Đội ngũ giáo viên thường xuyên được đào tạo, bồi dưỡng nâng cao nghiệp vụ, tiếp cận với các phương pháp giảng dạy tiên tiến. Nhờ đó, trường đã gặt hái được nhiều thành tích đáng tự hào trong các kỳ thi học sinh giỏi cấp tỉnh và quốc gia. Nhiều học sinh của trường đã đạt được những thành tích xuất sắc, giành được học bổng tại các trường đại học có tiếng tại Đồng Bằng Sông Cửu Long, và thành công trong nhiều lĩnh vực khác nhau sau khi tốt nghiệp. Ngoài ra năm 2021 sản phẩm trà túi lọc sương sâm đã đạt các chỉ tiêu kiểm nghiệm dành cho sản phẩm đóng hộp thuận tự nhiên, tốt cho sức khoẻ của đôi bạn học sinh lớp 11. Ý tưởng của đôi bạn này cũng được trao giải nhất Cuộc thi sáng tạo thanh, thiếu niên, nhi đồng tỉnh Hậu Giang năm 2021 và giải nhất Cuộc thi Khoa học kỹ thuật cấp tỉnh dành cho học sinh trung học năm học 2021-2022, giải tư Cuộc thi Khoa học kỹ thuật cấp quốc gia dành cho học sinh trung học năm học 2021-2022.</p>
                                        <h4 className="mt-[2em] uppercase"><AccessTimeFilledIcon className="relative top-[-2px]" /> Thực Tại</h4>
                                        <p>Đến nay, Trường THPT Trường Long Tây đã trở thành một trong những ngôi trường hàng đầu trong khu vực, với hơn 450 học sinh và đội ngũ giáo viên giàu kinh nghiệm, nhiệt huyết. Trường tự hào về truyền thống học tập, rèn luyện, và các thế hệ học sinh đã trưởng thành từ ngôi trường này, đang góp phần quan trọng vào sự phát triển của đất nước. Với những nền tảng vững chắc đã xây dựng được, Trường THPT Trường Long Tây tiếp tục khẳng định sứ mệnh và tầm nhìn của mình, hướng tới tương lai với niềm tin và sự quyết tâm không ngừng.</p>
                                    </div>
                                </div>
                                <div className="w-25% h-40">
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
                </div>
                <div id="footer">
                    <FooterClient />
                </div>
            </>
        )
    }
}

class Mission extends React.Component {
    render() {
        return (
            <>
                <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="introduction">
                    <div id="content" className="mb-5 h-auto">
                        <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em]">
                            <div className="flex">
                                <div className="w-75% h-40 mt-[25px]">
                                    <div className="mt-[10px]">
                                        <p className="text-[20px] text-[Arial] uppercase border-l-[5px] border-solid border-main pl-3 font-[600]">Sứ Mệnh</p>
                                        <p className="mb-[2em]">Trường THPT Trường Long Tây cam kết mang đến một môi trường học tập chất lượng, nơi mỗi học sinh đều được hỗ trợ tối đa để phát triển toàn diện về trí tuệ, thể chất và phẩm chất đạo đức. Chú trọng vào việc cung cấp một chương trình giáo dục toàn diện và đổi mới, nhằm trang bị cho học sinh không chỉ kiến thức vững vàng mà còn các kỹ năng sống cần thiết để thành công trong tương lai. Đội ngũ giáo viên tận tâm nỗ lực không ngừng để tạo ra những bài học hấp dẫn, truyền cảm hứng và khuyến khích sự sáng tạo, đồng thời tạo dựng một môi trường học tập an toàn, tích cực và đầy cảm hứng. Hướng đến việc phát triển những thế hệ học sinh có tinh thần trách nhiệm cao, tự tin, và sẵn sàng đóng góp cho cộng đồng và xã hội.</p>
                                        <img className="w-[100%] h-[500px]" src="../../assets/images/introduction/mission/1.jpg" />
                                    </div>
                                    <div className="mt-[10px]">
                                        <p className="text-[20px] text-[Arial] mt-[2em] uppercase border-l-[5px] border-solid border-main pl-3 font-[600]">Tầm Nhìn</p>
                                        <p>Trường THPT Trường Long Tây hướng đến việc trở thành một trong những trường THPT hàng đầu trong khu vực, nổi bật với sự đổi mới trong phương pháp giảng dạy và chất lượng giáo dục. Phấn đấu xây dựng một cộng đồng học tập năng động, sáng tạo và đoàn kết, nơi mọi học sinh đều được khuyến khích phát triển tối đa tiềm năng của bản thân. Tin tưởng rằng thông qua sự hợp tác chặt chẽ giữa nhà trường, gia đình và cộng đồng, chúng tôi có thể tạo ra những điều kiện tốt nhất cho học sinh, chuẩn bị cho các bạn không chỉ để đạt được thành công trong học tập mà còn để trở thành những công dân toàn cầu có trách nhiệm, sáng tạo và linh hoạt. Trường Long Tây sẽ tiếp tục nỗ lực để mở rộng cơ hội học tập, khám phá và phát triển cá nhân, đồng thời gắn kết giá trị văn hóa và đạo đức trong quá trình giáo dục.</p>
                                    </div>
                                </div>
                                <div className="w-25% !important h-40">
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
                </div>
                <div id="footer">
                    <FooterClient />
                </div>
            </>
        )
    }
}

class Library extends React.Component {
    render() {
        return (
            <>
            <div id="header">
                    <HeaderClient />
                    <NavClient />
                </div>
                <div id="introduction">
                    <div id="content" className="mb-5 h-auto">
                        <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em]">
                            <div className="flex">
                                <div className="w-75% h-40 mt-[25px]">
                                    <div className="text-center">
                                        <img className="w-[100%] h-[550px]" src="../../assets/images/introduction/library/1.jpg"/>
                                        <img className="w-[100%] h-[550px] mt-[2em]" src="../../assets/images/introduction/library/2.jpg"/>
                                        <img className="w-[100%] h-[550px] mt-[2em]" src="../../assets/images/introduction/library/3.jpg"/>
                                        <img className="w-[100%] h-[550px] mt-[2em]" src="../../assets/images/introduction/library/4.jpg"/>
                                        <img className="w-[100%] h-[550px] mt-[2em]" src="../../assets/images/introduction/library/5.jpg"/>
                                    </div>
                                </div>
                                <div className="w-25% !important h-40">
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
                </div>
                <div id="footer">
                    <FooterClient />
                </div>
            </>
        )
    }
}

export { Intro, Mission, Library };