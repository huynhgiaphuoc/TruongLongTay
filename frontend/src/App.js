import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Students from "./component/user/home";
import Teachers from "./component/teacher/homepage";
import Admin from "./component/admin/homepage";
import { AuthProvider } from "./component/AuthContext";
import PrivateRoute from "./component/PrivateRoute";
import { ForgotPassword, Vetify, ChangePass } from "./component/forgotteacher";
import Home from "./component/user/home";
import { Contact } from "./component/user/contact";
import { Intro, Mission, Library } from "./component/user/introduction";
import { Class, LearningResult, StudentInformation } from "./component/teacher/class";
import Dashboard from "./component/teacher/homepage";
import { News } from "./component/teacher/news";
import { PointOfStudent, CreatePoint, EditPoint } from "./component/teacher/point";
import { Tutoring, CreateTutoring, EditTutoring } from "./component/teacher/tutoring";
import { WorkSchedule } from "./component/teacher/workschedule";
import { Room } from "./component/teacher/room";
import { Homepage } from "./component/accountancy/homepage";
import { Dashbroadcontent } from "./component/accountancy/dashbroad";
import { Uniformmanage, Addproduct } from "./component/accountancy/uniformmanage";
import { OrderList } from "./component/accountancy/ordermanage";
import Loginforteacher from "./component/loginforteacher";
import TestSocket from './component/admin/test';
import { Information } from "./component/teacher/account";
import { Approve } from "./component/teacher/approve";
import { Message } from "./component/admin/message";
import Loginacademic from "./component/loginforacademic";
import { Examadmin } from "./component/admin/exam";
import { Test } from "./component/user/resources";
import { SlideDetail, FormSlide } from './component/admin/slide';
import { TestDetail, FormTest } from './component/admin/testexam';
import { ExamFrom } from './component/admin/exam';
import { Cart, Payment } from "./component/student/order";
import { Teacher, CreateTeacher } from './component/admin/teacheradmin';
import { BuyUniforms } from "./component/user/resources";
import Userstatus from "./component/testUser";
import { Education } from "./component/admin/education";
import WorkScheduleManage from "./component/admin/workschedulemanage";
import { Operation } from "./component/admin/operation";
import { MainTeacher } from "./component/admin/mainteacher";
import { CreateResult, ResultExam } from "./component/admin/result";
import { Managestudent, Addstudent, ManageSubject, AddSubject, AddSubjectCombination, EditSubject, Subject, Combination, EditCombination, DashboardAdmin, Editstudent } from "./component/admin/managestudent";
import { FeedbackList, CreateFeedback, UpdateFeedback } from './component/user/feedbacklist';
import { ArticleList, CreateArticle, EditArticle } from './component/user/articlelist';
import { DocumentList } from "./component/user/document";
import { NewsEvent, NewsDepartment, NewsNotification, NewsLiving, NewsEventactivities, NewsAdmissionsexam, NewsProfessionalactivities, NewsGroupactivities, Schoolandsocietyntxh, Schoolanddshsntxh, Doclist } from "./component/user/news";
import { Student } from "./component/student/homepage";
import { Schedule , ScheduleFile , Exam, ExamFile} from "./component/user/education";
import ScheduleOfClass from "./component/student/scheduleofclass";


function App() {
  const PrivateRoute = ({ role, children }) => {
    const storedRole = sessionStorage.getItem('role');

    if (storedRole !== role) {
      return <Route path="/login" element={<Login />} />;
    }

    return children;
  };
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/editstudent" element={<Editstudent />} />
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/editCombination" element={<EditCombination />} />
          <Route path="/combination" element={<Combination />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/editSubject" element={<EditSubject />} />
          <Route path="/addSubjectCombination" element={<AddSubjectCombination />} />
          <Route path="/addSubject" element={<AddSubject />} />
          <Route path="/manageSubject" element={<ManageSubject />} />
          <Route path="/addstudent" element={<Addstudent />} />
          <Route path="/fs" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/introduction" element={<Intro />} />
          <Route path="/students" element={<Managestudent />} />
          <Route path="/student" element={<Student />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginforteacher" element={<Loginforteacher />} />
          <Route path="/loginacademic" element={<Loginacademic />} />
          <Route path="/userstatus" element={<Userstatus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password-teacher" element={<ForgotPassword />} />
          <Route path="/introduction" element={<Intro />} />
          <Route path="/class" element={<Class />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student-information/:id" element={<StudentInformation />} />
          <Route path="/learning-result/:id" element={<LearningResult />} />
          <Route path="/news" element={<News />} />
          <Route path="/point" element={<PointOfStudent />} />
          <Route path="/createpoint" element={<CreatePoint />} />
          <Route path="/teachers/point/edit-point/:id" element={<EditPoint />} />
          <Route path="/tutoring" element={<Tutoring />} />
          <Route path="/createtutoring" element={<CreateTutoring />} />
          <Route path="/teachers/tutoring/edit-tutoring/:id" element={<EditTutoring />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/library" element={<Library />} />
          <Route path="/workschedule" element={<WorkSchedule />} />
          <Route path="/room" element={<Room />} />
          <Route path="/order" element={<OrderList />} />
          <Route path="/accountancy" element={<Dashbroadcontent />} />
          <Route path="/uniformmanage" element={<Uniformmanage />} />
          <Route path="/scheduleofclass" element={<ScheduleOfClass />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/test" element={<TestSocket />} />
          <Route path="/vetify-teacher" element={<Vetify />} />
          <Route path="/change-password" element={<ChangePass />} />
          <Route path="/infomation" element={<Information />} />
          <Route path="/approve" element={<Approve />} />
          <Route path="/message" element={<Message />} />

          <Route path="/schedulead" element={<WorkScheduleManage />} />

          <Route path="/exam" element={<Examadmin />} />
          <Route path="/test" element={<Test />} />
          <Route path="/slide" element={<SlideDetail />} />
          <Route path="/createslide" element={<FormSlide />} />
          <Route path="/testexam" element={<TestDetail />} />
          <Route path="/createtest" element={<FormTest />} />
          <Route path="/teacheradmin" element={<Teacher />} />
          <Route path="/createteacher" element={<CreateTeacher />} />
          <Route path="/createexam" element={<ExamFrom />} />
          <Route path="/createtest" element={<FormTest />} />
          <Route path="/resources_mdp" element={<BuyUniforms />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/education" element={<Education />} />
          <Route path="/operation" element={<Operation />} />
          <Route path="/mainteacher" element={<MainTeacher />} />
          <Route path="/result" element={<ResultExam />} />
          <Route path="/createresult" element={<CreateResult />} />

          <Route path="/education" element={<Schedule />} />
          <Route path="/schedulefile" element={<ScheduleFile />} />
          <Route path="/exams" element={<Exam />} />
          <Route path="/examfile" element={<ExamFile />} />
          <Route path="/workschedule" element={<WorkSchedule />} />
          {/* <Route path="/workschedulefile" element={<WorkScheduleFile />} /> */}
          {/* <Route path="/resources" element={<ComputerTutorial />} /> */}
         
          <Route path="/resources_thi_kt" element={<Test />} />
    
          {/* <Route path="/studentList" element={<StudentList />} /> */}

          <Route exact path="/feedback" element={<FeedbackList />} />
          <Route exact path="/addfb" element={<CreateFeedback />} />
          <Route exact path="/updatefb/:id" element={<UpdateFeedback />} />
          <Route exact path="/viewarticle" element={<ArticleList />} />
          <Route exact path="/add" element={<CreateArticle />} />
          <Route exact path="/editarticle" element={<EditArticle />} />
          <Route exact path="/documment" element={<DocumentList />} />
          <Route path="/dshs" element={<Schoolanddshsntxh />} />
          <Route path="/newsevent" element={<NewsEvent />} />
          <Route path="/newsdepartment" element={<NewsDepartment />} />
          <Route path="/newsnotification" element={<NewsNotification />} />
          <Route path="/newsliving" element={<NewsLiving />} />
          <Route path="/newseventactivities" element={<NewsEventactivities />} />
          <Route path="/newsadmissionsexam" element={<NewsAdmissionsexam />} />
          <Route path="/newsprofessionalactivities" element={<NewsProfessionalactivities />} />
          <Route path="/newsgroupactivities" element={<NewsGroupactivities />} />
          <Route path="/schoolandsocietyntxh" element={<Schoolandsocietyntxh />} />
          <Route path="/doclist" element={<Doclist />} />
          <Route path="/student" element={<Student />} />
          <Route path="/recordapplication" element={<Doclist />} />

          <Route
            path="/student"
            element={
              <PrivateRoute role="student">
                <Students />
              </PrivateRoute>
            }
          />
          <Route
            path="/teachers"
            element={
              <PrivateRoute role="teacher">
                <Teachers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;