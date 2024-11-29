package com.example.backend.controller;

import com.example.backend.model.Articles;
import com.example.backend.model.Exam;
import com.example.backend.model.ExamTest;
import com.example.backend.model.Message;
import com.example.backend.model.Slide;
import com.example.backend.model.Class;
import com.example.backend.model.Document;
import com.example.backend.model.EducationOfTeacher;
import com.example.backend.model.ResultExam;
import com.example.backend.model.Students;
import com.example.backend.model.Teacher;
import com.example.backend.model.TeacherTeachingService;
import com.example.backend.services.AdminTeacherService;
import com.example.backend.services.ArticlesService;
import com.example.backend.services.ClassService;
import com.example.backend.services.CreateEventService;
import com.example.backend.services.DocumentService;
import com.example.backend.services.EducationOfTeacherService;
import com.example.backend.services.ExamService;
import com.example.backend.services.ExamTestService;
import com.example.backend.services.MainTeacherService;
import com.example.backend.services.OperationService;
import com.example.backend.services.OperationServiceImpl;
import com.example.backend.services.ResultExamService;
import com.example.backend.services.RoomConditionService;
import com.example.backend.services.ScheduleService;
import com.example.backend.services.SlideService;
import com.example.backend.services.StudentService;
import com.example.backend.services.SubjectService;
import com.example.backend.services.TeacherService;
import com.example.backend.services.TeacherSubjectsService;
import com.example.backend.services.TeacherTeachingServiceService;
import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private TeacherSubjectsService teacherSubjectService;

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private TeacherTeachingServiceService teacherTeachingServiceService;

    @Autowired
    private SlideService slideService;

    @Autowired
    private ExamTestService examTestService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private ExamService examSercive;

    @Autowired
    private ClassService classService;

    @Autowired
    private OperationService operationService;

    @Autowired
    private AdminTeacherService adminTeacherService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private EducationOfTeacherService educationOfTeacherService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CreateEventService createEventService;

    @Autowired
    private MainTeacherService mainTeacherService;

    @Autowired
    private ResultExamService resultExamService;

    @Autowired
    private RoomConditionService roomConditionService;
    
    @Autowired
    private ArticlesService articlesService;
    
    @Autowired
    private DocumentService documentService;
 
 @PostMapping("/operationgetsubject")
    public List<Map<String, Object>> operationgetsubject(@RequestBody Map<String, String> Data) {
        String id = Data.get("classid");
        int classid = Integer.parseInt(id);
        return operationService.Operationforteacher(classid);
    }

    @PostMapping("/operationgetteacher")
    public List<Map<String, Object>> operationgetteacher(@RequestBody Map<String, String> Data) {
        String name = Data.get("subjectid");
        return operationService.getTeacherBySubjectName(name);
    }

    @PostMapping("/teachersubject/getall")
    public List<Map<String, Object>> getTeacherByTeacherSubject(@RequestBody Map<String, String> Data) {
        String id = Data.get("teacherID");
        int teacherID = Integer.parseInt(id);
        System.out.println("teacherid" + teacherID);
        return teacherSubjectService.getTeacherByTeacherSubject(teacherID);
    }

    @PostMapping("/teacher/getteacher")
    @CrossOrigin(origins = "http://localhost:3000/schedulead")
    public List<Map<String, Object>> getteacherbyid(@RequestBody Map<String, String> Data) {
      
        Integer teacherid = Integer.parseInt(Data.get("teacherID"));
        System.out.println("teacheriddiloz" + teacherid);
        return teacherService.findByTeacherId(teacherid);
    }

    @PostMapping("/schedule/schedule")
    public List<Map<String, Object>> scheduleByTeacherID(@RequestBody Map<String, String> Data) {
        String id = Data.get("userID");
        System.out.println("userID" + id);
        int teacherid = Integer.parseInt(id);
        return scheduleService.getScheduleByTeacherID(teacherid);

    }

    @PostMapping("/operation/getall")
    public List<Map<String, Object>> getClassIDbyTeacherSubjectID(@RequestBody Map<String, String> Data) {
        String id = Data.get("ClassID");
        System.out.println("dataaaaa" + id);
        int classid = Integer.parseInt(id);
        System.out.println("dalabennet" + operationService.getClassIDbyTeacherSubjectID(classid));
        return operationService.getClassIDbyTeacherSubjectID(classid);
    }

    @PostMapping("/operation/getclass")
    public List<Map<String, Object>> getClassIDbyTeacherSubjectID1(@RequestBody Map<String, String> Data) {
        String id = Data.get("ClassID");
        System.out.println("dataaaaa" + id);
        int classid = Integer.parseInt(id);
        System.out.println("dalabennet" + operationService.getClassIDbyTeacherSubjectID1(classid));
        return operationService.getClassIDbyTeacherSubjectID1(classid);
    }

    @PostMapping("/operation/getsubject")
    public List<Map<String, Object>> getsubjectname(@RequestBody Map<String, String> Data) {
        String id = Data.get("ClassID");
        System.out.println("dataaaaa" + id);
        int classid = Integer.parseInt(id);
        System.out.println("dalabennet" + operationService.getClassIDbyTeacherSubjectID1(classid));
        return subjectService.getsubjectname(classid);
    }

    @PostMapping("/schedule/scheduleall")
    public List<Map<String, Object>> schedulebyAll() {
        return scheduleService.getAllSchedules();
    }

    @PostMapping("/teacher/getall")
    @CrossOrigin(origins = "http://localhost:3000/schedulead")
    public List<Map<String, Object>> getAllAdmin() {
        return teacherService.showAllTeacher();
    }

    @PostMapping("/schedule/createschedule")
    public int createSchedule(@RequestBody Map<String, String> Data) {
        String id = Data.get("teacherID");
        String cid = Data.get("classID");
        Integer teacherID = Integer.parseInt(id);
        Integer classID = Integer.parseInt(cid);
        String session1 = Data.get("session1");
        String session2 = Data.get("session2");
        String session3 = Data.get("session3");
        String session4 = Data.get("session4");
        String session5 = Data.get("session5");
        String session6 = Data.get("session6");
        String session7 = Data.get("session7");
        String session8 = Data.get("session8");
        String session9 = Data.get("session9");
        String session10 = Data.get("session10");
        String selectedDay = Data.get("selectedDay");
        return scheduleService.createSchedule(teacherID, classID, session1, session2, session3, session4, session5, session6, session7, session8, session9, session10, selectedDay);
    }

    @PostMapping("/class/getclass")
    public List<Map<String, Object>> getclassbyid(@RequestBody Map<String, String> Data) {
        String id = Data.get("ClassID");
        int classid = Integer.parseInt(id);
        return classService.getClassIDbyClassID(classid);
    }

    @PostMapping("/schedule/editschedule")
    public int editSchedule(@RequestBody Map<String, String> Data) {
        String id = Data.get("teacherID");
        String cid = Data.get("classID");
        String sid = Data.get("scheduleID");

        Integer teacherID = Integer.parseInt(id);
        Integer classID = Integer.parseInt(cid);
        Integer scheduleID = Integer.parseInt(sid);

        String session1 = Data.get("session1");
        String session2 = Data.get("session2");
        String session3 = Data.get("session3");
        String session4 = Data.get("session4");
        String session5 = Data.get("session5");
        String session6 = Data.get("session6");
        String session7 = Data.get("session7");
        String session8 = Data.get("session8");
        String session9 = Data.get("session9");
        String session10 = Data.get("session10");
        String selectedDay = Data.get("selectedDay");

        System.out.println("scheduleID" + scheduleID);
        System.out.println("selectedDay" + selectedDay);
        System.out.println("teacherID" + teacherID);
        System.out.println("classID" + classID);
        System.out.println("session1" + session1);
        System.out.println("session2" + session2);
        System.out.println("session3" + session3);
        System.out.println("session4" + session4);
        System.out.println("session5" + session5);
        System.out.println("session6" + session6);
        System.out.println("session7" + session7);
        System.out.println("session8" + session8);
        System.out.println("session9" + session9);
        System.out.println("session10" + session10);

        return scheduleService.editSchedule(scheduleID, teacherID, classID, session1, session2, session3, session4, session5, session6, session7, session8, session9, session10);
    }

    @PostMapping("/schedule/deleteschedule")
    public void deleteSchedule(@RequestBody Map<String, String> Data) {
        String sid = Data.get("scheduleID");
        Integer scheduleID = Integer.parseInt(sid);
        scheduleService.deleteschedule(scheduleID);
    }

    @PostMapping("/getschedule")
    public List<Map<String, Object>> getall() {
        return scheduleService.getall();
    }

    @PostMapping("/events/create")
    public void createEvent(@RequestBody Map<String, String> eventRequest) {
        String eventId = eventRequest.get("eventId");
        Integer classId = Integer.parseInt(eventRequest.get("classId"));
        Integer teacherId = Integer.parseInt(eventRequest.get("teacherId"));
        Integer scheduleId = Integer.parseInt(eventRequest.get("scheduleId"));
        Integer weekNumber = Integer.parseInt(eventRequest.get("weekNumber"));
        createEventService.createEvent(eventId, classId, scheduleId, teacherId, weekNumber);
    }

    @PostMapping("/events/getall")
    public List<String> geteventbyeventid(@RequestBody Map<String, String> eventRequest) {
        String scheduleId = eventRequest.get("scheduleId");
        return createEventService.geteventbyeventid(scheduleId);
    }

    @PostMapping("/events/edit")
    public void editEvent(@RequestBody Map<String, String> eventRequest) {
        String eventId = eventRequest.get("eventid");
        Integer classId = Integer.parseInt(eventRequest.get("classId"));
        Integer teacherId = Integer.parseInt(eventRequest.get("teacherId"));
        Integer scheduleId = Integer.parseInt(eventRequest.get("scheduleId"));
        Integer weekNumber = Integer.parseInt(eventRequest.get("weekNumber"));
        createEventService.editEvent(classId, teacherId, scheduleId, weekNumber, eventId);
    }

    @PostMapping("/events/delete")
    public void deleteEvent(@RequestBody Map<String, String> eventRequest) {
        String eventId = eventRequest.get("eventid");
        createEventService.deleteEvent(eventId);
    }

    @PostMapping("/schedule/getschedulebyclassid")
    public List<Map<String, Object>> getschedulebyclassID(@RequestBody Map<String, String> Data) {
        String getid = Data.get("studentid");
        int studentid = Integer.parseInt(getid);
        Students student = studentService.findbyId(studentid);
        com.example.backend.model.Class classno = student.getClassID();
        int classid = classno.getClassID();
        return scheduleService.getSchedulebyClassID(classid);
    }

    @PostMapping("/schedule/getteacherbyclassid")
    public List<Map<String, Object>> getTeacherbyClassID(@RequestBody Map<String, Object> data) {
        List<Integer> teacherSubjectIDs = (List<Integer>) data.get("studentid");
        System.out.println("teacherSubjectIDs: " + teacherSubjectIDs);
        return teacherSubjectService.getteachersubjectID(teacherSubjectIDs);
    }

    @PostMapping("/schedule/showAllTeacher")
    @CrossOrigin(origins = "http://localhost:3000/message")
    public List<Map<String, Object>> showAllTeacher() {
        return teacherService.showAllTeacher();
    }
    
    @PostMapping("/showAllTeacher")
    @CrossOrigin(origins = "http://localhost:3000/message")
    public List<Map<String, Object>> showAllsTeacher() {
        return teacherService.showAllTeacher();
    }

    @PostMapping("/showAdminByName")
    @CrossOrigin(origins = "http://localhost:3000/message")
    public List<Map<String, Object>> showAdminByName(@RequestBody Map<String, String> cre) {
        String name = cre.get("name");
        return teacherService.showAdminByName(name);
    }

    @PostMapping("/showInfoAdmin")
    @CrossOrigin(origins = "http://localhost:3000/message")
    public TeacherTeachingService showInfo(@RequestBody Map<String, String> cre) {
        String adminId = cre.get("adminId");
        Integer id = Integer.parseInt(adminId);
        return teacherTeachingServiceService.findById(id);
    }

    @PostMapping("/showAvtAdmin")
    @CrossOrigin(origins = "http://localhost:3000/message")
    public List<Map<String, Object>> showAdmin(@RequestBody Map<String, String> cre) {
        String adminId = cre.get("adminId");
        Integer id = Integer.parseInt(adminId);
        return teacherService.showAdmin(id);
    }

    @PostMapping("/showInfoReceiver")
    @CrossOrigin(origins = "http://localhost:3000/message")
    public Teacher showReceiver(@RequestBody Map<String, String> cre) {
        String teacherId = cre.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return teacherService.myInfoById(id);
    }

    @PostMapping("/showInfoTeacherTeaching")
    public TeacherTeachingService myInfoById(@RequestBody Map<String, String> cre) {
        String teacherId = cre.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return teacherTeachingServiceService.findById(id);
    }

    @PostMapping("/slider")
    @CrossOrigin(origins = "http://localhost:3000/slide")
    public List<Map<String, Object>> showAllSlide() {
        return slideService.showAll();
    }

    @PostMapping("/slider/createslide")
    @CrossOrigin(origins = "http://localhost:3000/slider")
    public void createSlide(@RequestBody Map<String, String> data) {
        String path = data.get("path");
        String img = data.get("image");
        String description = data.get("description");
        String title = data.get("title");
        System.out.println("description" + description);
        slideService.createSlide(path, img, description, title);
    }

    @PostMapping("/slider/editslide")
    @CrossOrigin(origins = "http://localhost:3000/slider")
    public Slide editslide(@RequestBody Map<String, String> data) {
        String id = data.get("slideId");
        Integer idsli = Integer.parseInt(id);
        return slideService.showSlide(idsli);
    }

    @PostMapping("/slider/edit")
    @CrossOrigin(origins = "http://localhost:3000/slide")
    public void editSlider(@RequestBody Map<String, String> data) {
        String id = data.get("slideId");
        Integer idsli = Integer.parseInt(id);
        String path = data.get("path");
        String img = data.get("image");
        String description = data.get("description");
        String title = data.get("title");
        System.out.println("Id:" + idsli);
        System.out.println("img" + img);
        System.out.println("title" + title);
        System.out.println("description" + description);
        slideService.editSlide(path, img, description, title, idsli);
    }

    @PostMapping("/slider/delete")
    @CrossOrigin(origins = "http://localhost:3000/slide")
    public void deleteslide(@RequestBody Map<String, String> delete) {
        String slideId = delete.get("slideID");
        Integer sli = Integer.parseInt(slideId);
        System.out.println("id:" + slideId);
        slideService.deleteSlide(sli);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("path") String path) {
        System.out.println("image" + file + path);
        try {
            String absolutePath = "D:/frontend/frontend/public/assets/images/slides/";

            File directory = new File(absolutePath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String filePath = absolutePath + file.getOriginalFilename();
            System.out.print("Saving file to:" + filePath);

            File dest = new File(filePath);

            file.transferTo(dest);
            return ResponseEntity.ok(filePath);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    @PostMapping("/test")
    @CrossOrigin(origins = "http://localhost:3000/testExam")
    public List<Map<String, Object>> showAllExamTest() {
        return examTestService.showAll();
    }

    @PostMapping("/test/createtest")
    @CrossOrigin(origins = "http://localhost:3000/createtest")
    public void createTest(@RequestBody Map<String, String> data) {
        String path = data.get("path");
        String img = data.get("image");
        String title = data.get("title");
        examTestService.createTest(path, img, title);
    }

    @PostMapping("/test/edittest")
    @CrossOrigin(origins = "http://localhost:3000/testExam")
    public ExamTest edittest(@RequestBody Map<String, String> data) {
        String id = data.get("testId");
        Integer idtest = Integer.parseInt(id);
        return examTestService.showTest(idtest);
    }

    @PostMapping("/test/edit")
    @CrossOrigin(origins = "http://localhost:3000/testExam")
    public void editTest(@RequestBody Map<String, String> data) {
        String id = data.get("testId");
        Integer idtest = Integer.parseInt(id);
        String path = data.get("path");
        String img = data.get("image");
        String title = data.get("title");
        System.out.println("Id:" + idtest);
        System.out.println("img" + img);
        System.out.println("title" + title);
        examTestService.editTest(path, img, title, idtest);
    }

    @PostMapping("/test/delete")
    @CrossOrigin(origins = "http://localhost:3000/testExam")
    public void deleteSlide(@RequestBody Map<String, String> delete) {
        String testId = delete.get("examTestID");
        Integer te = Integer.parseInt(testId);
        System.out.println("id:" + testId);
        examTestService.deleteTest(te);
    }

    @PostMapping("/exam")
    public List<Map<String, Object>> getExamSubjectsID(@RequestBody Map<String, String> data) {
        String id = data.get("classId");
        Integer classer = Integer.parseInt(id);
        return examSercive.examByClassID(classer);
    }

    @PostMapping("/examsub")
    public List<Map<String, Object>> getExamSubjectsIDName(@RequestBody Map<String, String> data) {
        String idsub = data.get("subjectsId");
        Integer sub = Integer.parseInt(idsub);
        return examSercive.examBySubjectsID(sub);
    }

    @PostMapping("/examclassandsubject")
    public List<Map<String, Object>> findClassIdAndSubjectsId(@RequestBody Map<String, String> data) {
        String classId = data.get("classId");
        String subjectsId = data.get("subjectsId");
        Integer classer = Integer.parseInt(classId);
        Integer subjecter = Integer.parseInt(subjectsId);
        return examSercive.examByClassIdAndSubjectsId(classer, subjecter);
    }

    @PostMapping("/getclass")
    @CrossOrigin(origins = "http://localhost:3000/exam")
    public List<Map<String, Object>> showAllClass() {
        return classService.showAll();
    }

    @PostMapping("/getclassid")
    @CrossOrigin(origins = "http://localhost:3000/exam")
    public List<Map<String, Object>> showClassById(@RequestBody Map<String, String> data) {
        String classId = data.get("classId");
        Integer id = Integer.parseInt(classId);
        return classService.showNameClass(id);
    }

    @PostMapping("/getsubid")
    @CrossOrigin(origins = "http://localhost:3000/exam")
    public List<Map<String, Object>> showSubjectByClassId(@RequestBody Map<String, String> data) {
        String classId = data.get("classId");
        Integer id = Integer.parseInt(classId);
        return examSercive.examByClassId(id);
    }

    @PostMapping("/getsubjects")
    @CrossOrigin(origins = "http://localhost:3000/exam")
    public List<Map<String, Object>> showAllSubjects(@RequestBody Map<String, String> data) {
        String subId = data.get("subjectsId");
        Integer id = Integer.parseInt(subId);
        return subjectService.findSubjectByClassId(id);
    }

    @PostMapping("/getsubjectsid")
    @CrossOrigin(origins = "http://localhost:3000/exam")
    public List<Map<String, Object>> showSubjectsById(@RequestBody Map<String, String> data) {
        String subjectsId = data.get("subjectsId");
        Integer sid = Integer.parseInt(subjectsId);
        //List<Integer> subjectsId = data.get("subjectsId");
        return subjectService.showNameSubjects(sid);
    }

    @PostMapping("/getTotalTime")
    @CrossOrigin(origins = "http://localhost:3000/exam")
    public void getTotalTime(@RequestBody Map<String, String> data) throws ParseException {
        String name = data.get("name");
        String date = data.get("date");
        String start = data.get("start");
        String end = data.get("end");
        String classId = data.get("classid");
        String subid = data.get("subid");

        Integer classer = Integer.parseInt(classId);
        Integer suber = Integer.parseInt(subid);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat timeFormatWithSeconds = new SimpleDateFormat("HH:mm:ss");
        SimpleDateFormat timeFormatWithoutSeconds = new SimpleDateFormat("HH:mm");

        java.util.Date utilDate = dateFormat.parse(date);
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        Time sqlStarts;
        Time sqlEnds;

        try {
            java.util.Date utilTime = timeFormatWithSeconds.parse(start);
            sqlStarts = new Time(utilTime.getTime());
            java.util.Date utilTime2 = timeFormatWithSeconds.parse(end);
            sqlEnds = new Time(utilTime2.getTime());
        } catch (ParseException e) {
            java.util.Date utilTime = timeFormatWithoutSeconds.parse(start);
            sqlStarts = new Time(utilTime.getTime());
            java.util.Date utilTime2 = timeFormatWithoutSeconds.parse(end);
            sqlEnds = new Time(utilTime2.getTime());
        }

        LocalTime startTime = LocalTime.parse(start);
        LocalTime endTime = LocalTime.parse(end);

        long totalMinutes = ChronoUnit.MINUTES.between(startTime, endTime);

        if (totalMinutes < 0) {
            totalMinutes += 24 * 60;
        }

        Time sqlStart = Time.valueOf(startTime);
        Time sqlEnd = Time.valueOf(endTime);

        Time totalTime = Time.valueOf(LocalTime.of((int) (totalMinutes / 60), (int) (totalMinutes % 60)));
        examSercive.createExam(suber, classer, name, sqlDate, sqlStart, sqlEnd, totalTime);
    }

    @PostMapping("/getExam")
    @CrossOrigin(origins = "http://localhost:3000/exam")
    public Exam updateexam(@RequestBody Map<String, String> data) {
        String id = data.get("examId");
        Integer eid = Integer.parseInt(id);
        return examSercive.showExam(eid);
    }

    @PostMapping("/exam/edit")
    @CrossOrigin(origins = "http://localhost:3000/exams")
    public void updateExam(@RequestBody Map<String, String> data) throws ParseException {
        String id = data.get("id");
        String classId = data.get("classId");
        String subID = data.get("subjectId");

        String name = data.get("name");
        String date = data.get("date");
        String start = data.get("start");
        String end = data.get("end");
        System.out.println("Date: " + date);
        System.out.println("start: " + start);
        System.out.println("end: " + end);

        Integer eid = Integer.parseInt(id);
        Integer classer = Integer.parseInt(classId);
        Integer suber = Integer.parseInt(subID);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat timeFormatWithSeconds = new SimpleDateFormat("HH:mm:ss");
        SimpleDateFormat timeFormatWithoutSeconds = new SimpleDateFormat("HH:mm");

        java.util.Date utilDate = dateFormat.parse(date);
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        Time sqlStarts;
        Time sqlEnds;

        try {
            java.util.Date utilTime = timeFormatWithSeconds.parse(start);
            sqlStarts = new Time(utilTime.getTime());
            java.util.Date utilTime2 = timeFormatWithSeconds.parse(end);
            sqlEnds = new Time(utilTime2.getTime());
        } catch (ParseException e) {
            java.util.Date utilTime = timeFormatWithoutSeconds.parse(start);
            sqlStarts = new Time(utilTime.getTime());
            java.util.Date utilTime2 = timeFormatWithoutSeconds.parse(end);
            sqlEnds = new Time(utilTime2.getTime());
        }

        LocalTime startTime = LocalTime.parse(start);
        LocalTime endTime = LocalTime.parse(end);

        long totalMinutes = ChronoUnit.MINUTES.between(startTime, endTime);

        if (totalMinutes < 0) {
            totalMinutes += 24 * 60;
        }

        Time sqlStart = Time.valueOf(startTime);
        Time sqlEnd = Time.valueOf(endTime);

        Time totalTime = Time.valueOf(LocalTime.of((int) (totalMinutes / 60), (int) (totalMinutes % 60)));

        examSercive.editExam(suber, classer, name, sqlDate, sqlStart, sqlEnd, totalTime, eid);
    }

    private static String ensureTimeFormat(String time) {
        if (time.length() == 5) {
            time += ":00";
        }
        return time;
    }

    @PostMapping("/deleteexam")
    @CrossOrigin(origins = "http://localhost:3000/exams")
    public void deleteexam(@RequestBody Map<String, String> Data) {
        String eid = Data.get("examId");
        Integer examId = Integer.parseInt(eid);
        examSercive.deleteexam(examId);
    }

    @PostMapping("/adminTeacher")
    @CrossOrigin(origins = "http://localhost:3000/teacheradmin")
    public List<Map<String, Object>> showAllAdminTeacher() {
        return adminTeacherService.showAll();
    }

    @PostMapping("/teaching")
    public List<Map<String, Object>> getteacherByteachingID(@RequestBody Map<String, String> data) {
        String id = data.get("teachingId");
        Integer teachingid = Integer.parseInt(id);
        return adminTeacherService.teacherByteachingID(teachingid);
    }

    @PostMapping("/getteaching")
    @CrossOrigin(origins = "http://localhost:3000/teacheradmin")
    public List<Map<String, Object>> showAllTeaching() {
        return teacherTeachingServiceService.showAll();
    }

    @PostMapping("/getteachingid")
    @CrossOrigin(origins = "http://localhost:3000/teacheradmin")
    public List<Map<String, Object>> showTeachingById(@RequestBody Map<String, String> data) {
        String teachingId = data.get("teachingId");
        Integer id = Integer.parseInt(teachingId);
        return teacherTeachingServiceService.showNameTeaching(id);
    }

    @PostMapping("/editTeacher")
    @CrossOrigin(origins = "http://localhost:3000/createTeacher")
    public void updateTeacherAdmin(@RequestBody Map<String, String> data) {
        String name = data.get("name");
        String pass = data.get("pass");
        String email = data.get("email");
        String birthday = data.get("birthday");
        String nots = data.get("nots");
        String nation = data.get("nation");
        String off = data.get("off");
        String gender = data.get("gender");
        String recruiter = data.get("recruiter");
        String recruitment = data.get("recruitment");
        String contract = data.get("contract");
        String position = data.get("position");
        String religion = data.get("religion");
        String ethnicity = data.get("ethnicity");
        String cic = data.get("cic");
        String province = data.get("province");
        String district = data.get("district");
        String commune = data.get("commune");
        String address = data.get("address");
        String health = data.get("health");
        String phone = data.get("phone");
        String path = data.get("path");
        String teacherId = data.get("teacherId");
        String edu = data.get("edu");
        try {
            SimpleDateFormat dateFormatbirthday = new SimpleDateFormat("yyyy-MM-dd");
            String encodedPassword = passwordEncoder.encode(pass);
            java.util.Date utilDatebirthday = dateFormatbirthday.parse(birthday);
            java.sql.Date sqlDatebirthday = new java.sql.Date(utilDatebirthday.getTime());
            Integer teaId = Integer.parseInt(teacherId);
            Integer eId = Integer.parseInt(edu);
            Integer not = Integer.parseInt(nots);
            teacherService.edit(teaId, eId, name, encodedPassword, email, sqlDatebirthday, not, nation, off, gender, recruiter, health, phone, recruitment, contract, position, religion, ethnicity, cic, province, district, commune, address, path);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/createTeacher")
    public void createTeacherAdmin(@RequestBody Map<String, String> data) {
        String name = data.get("name");
        String pass = data.get("pass");
        String email = data.get("email");
        String birthday = data.get("birthday");
        String nots = data.get("nots");
        String nation = data.get("nation");
        String off = data.get("off");
        String gender = data.get("gender");
        String recruiter = data.get("recruiter");
        String recruitment = data.get("recruitment");
        String contract = data.get("contract");
        String position = data.get("position");
        String religion = data.get("religion");
        String ethnicity = data.get("ethnicity");
        String cic = data.get("cic");
        String province = data.get("province");
        String district = data.get("district");
        String commune = data.get("commune");
        String address = data.get("address");
        String health = data.get("health");
        String phone = data.get("phone");
        String path = data.get("path");
        String edu = data.get("edu");
        String eId = data.get("eId");
        try {
            SimpleDateFormat dateFormatbirthday = new SimpleDateFormat("yyyy-MM-dd");
            String encodedPassword = passwordEncoder.encode(pass);
            java.util.Date utilDatebirthday = dateFormatbirthday.parse(birthday);
            java.sql.Date sqlDatebirthday = new java.sql.Date(utilDatebirthday.getTime());
            Integer id = Integer.parseInt(eId);
            Integer not = Integer.parseInt(nots);
            teacherService.create(id, name, encodedPassword, email, sqlDatebirthday, not, nation, off, gender, recruiter, health, phone, recruitment, contract, position, religion, ethnicity, cic, province, district, commune, address, path);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/deleteTeacher")
    public void deleteTeacher(@RequestBody Map<String, String> cre) {
        String teacherId = cre.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        teacherService.delete(id);
    }

    @PostMapping("/getAllTeacher")
    public List<Map<String, Object>> getAllTeacher() {
        return teacherService.showAllTeacherAndEdu();
    }

    @PostMapping("/getTeacherById")
    public List<Map<String, Object>> getTeacherById(@RequestBody Map<String, String> cre) {
        String teacherId = cre.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return teacherService.findByTeacherId(id);
    }

    @PostMapping("/getAllEducation")
    public List<Map<String, Object>> getAllEducation() {
        return educationOfTeacherService.showAllAndTeacher();
    }

    @PostMapping("/getEducationById")
    public EducationOfTeacher getEducationById(@RequestBody Map<String, String> cre) {
        String eduId = cre.get("eduId");
        Integer id = Integer.parseInt(eduId);
        return educationOfTeacherService.findByEducationId(id);
    }

    @PostMapping("/updateEducation")
    public void updateEducation(@RequestBody Map<String, String> cre) throws ParseException {
        String spl = cre.get("spl");
        String uniondm = cre.get("uniondm");
        String degree = cre.get("degree");
        String mainMajor = cre.get("mainMajor");
        String osq = cre.get("osq");
        String techLevel = cre.get("techLevel");
        String eml = cre.get("eml");
        String seniority = cre.get("seniority");
        String ptl = cre.get("ptl");
        String salaryCoefficient = cre.get("salaryConfficient");
        String salaryLevel = cre.get("salaryLevel");
        String salaryDay = cre.get("salaryDay");
        String quota = cre.get("quota");
        String mml = cre.get("mml");
        String mfl = cre.get("mfl");
        String jia = cre.get("jia");
        String sst = cre.get("sst");
        String other = cre.get("other");
        String party = cre.get("party");
        String eduId = cre.get("eduId");

        Integer id = Integer.parseInt(eduId);
        educationOfTeacherService.update(id, spl, uniondm, degree, mainMajor, osq, techLevel, eml, seniority, ptl, salaryCoefficient, salaryLevel, salaryDay, quota, mml, mfl, jia, sst, other, party);
    }

    @PostMapping("/createEducation")
    public void createEducation(@RequestBody Map<String, String> cre) throws ParseException {
        String spl = cre.get("spl");
        String uniondm = cre.get("uniondm");
        String degree = cre.get("degree");
        String mainMajor = cre.get("mainMajor");
        String osq = cre.get("osq");
        String techLevel = cre.get("techLevel");
        String eml = cre.get("eml");
        String seniority = cre.get("seniority");
        String ptl = cre.get("ptl");
        String salaryCoefficient = cre.get("salaryConfficient");
        String salaryLevel = cre.get("salaryLevel");
        String salaryDay = cre.get("salaryDay");
        String quota = cre.get("quota");
        String mml = cre.get("mml");
        String mfl = cre.get("mfl");
        String jia = cre.get("jia");
        String sst = cre.get("sst");
        String other = cre.get("other");
        String party = cre.get("party");
        educationOfTeacherService.create(spl, uniondm, degree, mainMajor, osq, techLevel, eml, seniority, ptl, salaryCoefficient, salaryLevel, salaryDay, quota, mml, mfl, jia, sst, other, party);
    }

    @PostMapping("/deleteEducation")
    public void deleteEducation(@RequestBody Map<String, String> cre) {
        String eduId = cre.get("eduId");
        Integer id = Integer.parseInt(eduId);
        educationOfTeacherService.delete(id);
    }

    @PostMapping("/getAllOpe")
    public List<Map<String, Object>> getAllOperation() {
        return operationService.getAllOperation();
    }

    @PostMapping("/getAllOperation")
    public List<Map<String, Object>> getAllOperation(@RequestBody Map<String, String> cre) {
        String classId = cre.get("classId");
        Integer id = Integer.parseInt(classId);
        return operationService.getAllByClassId(id);
    }

    @PostMapping("/gettAllSubject")
    public List<Map<String, Object>> getAllSubject(@RequestBody Map<String, String> cre) {
        String subjectId = cre.get("subjectId");
        Integer id = Integer.parseInt(subjectId);
        return subjectService.showAll();
    }

    @PostMapping("/getAllTeacherSubject")
    public List<Map<String, Object>> getAllTeacherSubject() {
        return teacherSubjectService.gettAllSubjectAndTeacher();
    }

    @PostMapping("/getAllTeacherSubjectById")
    public void showAllTeacherByTeacherId(@RequestBody Map<String, String> cre) {
        String teacherId = cre.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        teacherSubjectService.delete(id);
    }

    @PostMapping("/getAllMainTeacher")
    public List<Map<String, Object>> showAllMainTeacher() {
        return mainTeacherService.showAllMainTeacher();
    }

    @PostMapping("/getMainTeacherByYear")
    public List<Map<String, Object>> showMainTeacherByYear(@RequestBody Map<String, String> cre) {
        String year = cre.get("year");
        return mainTeacherService.showAllMainTeacher(year);
    }

    @PostMapping("/getTeacherAndClassWithout")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getTeacherAndClass(@RequestBody Map<String, String> cre) {
        String year = cre.get("year");
        List<Map<String, Object>> teacherWithoutClass = teacherService.getTeachersWithoutClass(year);
        List<Map<String, Object>> classWithoutTeacher = teacherService.getClassWithoutTeacher(year);

        Map<String, List<Map<String, Object>>> response = new HashMap<>();
        response.put("teacherWithoutClass", teacherWithoutClass);
        response.put("classWithoutTeacher", classWithoutTeacher);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/createMainTeacher")
    public void createMainTeacher(@RequestBody Map<String, String> cre) {
        String year = cre.get("year");
        String teacherId = cre.get("teacherId");
        String classId = cre.get("classId");
        Integer tId = Integer.parseInt(teacherId);
        Integer cId = Integer.parseInt(classId);
        mainTeacherService.create(year, cId, tId);
    }

    @PostMapping("/getMainTeacher")
    public List<Map<String, Object>> getMainTeacher(@RequestBody Map<String, String> cre) {
        String mainId = cre.get("mainId");
        Integer id = Integer.parseInt(mainId);
        return mainTeacherService.getMainTeacher(id);
    }

    @PostMapping("/updateMainTeacher")
    public void updateMainTeacher(@RequestBody Map<String, String> cre) {
        String mainId = cre.get("mainId");
        String teacherId = cre.get("teacherId");
        Integer mId = Integer.parseInt(mainId);
        Integer tId = Integer.parseInt(teacherId);
        mainTeacherService.update(mId, tId);
    }

    @PostMapping("/deleteMainTeacher")
    public void deleteMainTeacher(@RequestBody Map<String, String> cre) {
        String mainId = cre.get("mainId");
        Integer id = Integer.parseInt(mainId);
        mainTeacherService.delete(id);
    }

    @PostMapping("/gettAdmin")
    public List<Map<String, Object>> getAdmin() {
        return adminTeacherService.showAllAdmin();
    }

    @PostMapping("/getTeacher")
    public Teacher getTeacher(@RequestBody Map<String, String> cre) {
        String teacherId = cre.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return teacherService.myInfoById(id);
    }

    @PostMapping("/showResult")
    @CrossOrigin(origins = "http://localhost:3000/resultExam")
    public List<Map<String, Object>> showAllResult() {
        return resultExamService.showAll();
    }

    @PostMapping("/createResult")
    @CrossOrigin(origins = "http://localhost:3000/createresult")
    public void createResult(@RequestBody Map<String, String> data) {
        String name = data.get("name");
        String birthday = data.get("birthday");
        String reg = data.get("reg");
        String gender = data.get("gender");
        String phone = data.get("phone");
        String math = data.get("math");
        String lit = data.get("lit");
        String eng = data.get("eng");
        String status = data.get("status");

        LocalDate resultDate = LocalDate.parse(birthday, DateTimeFormatter.ISO_DATE);
        Date sqlDate = java.sql.Date.valueOf(resultDate);

        resultExamService.create(name, sqlDate, reg, gender, phone, math, lit, eng, status);
    }

    @PostMapping("/getResultById")
    @CrossOrigin(origins = "http://localhost:3000/resultExam")
    public ResultExam editresult(@RequestBody Map<String, String> data) {
        String id = data.get("resultId");
        Integer reid = Integer.parseInt(id);
        return resultExamService.showResult(reid);
    }

    @PostMapping("/editResult")
    @CrossOrigin(origins = "http://localhost:3000/resultExam")
    public void editResult(@RequestBody Map<String, String> data) {
        String id = data.get("resultId");
        Integer reid = Integer.parseInt(id);
        String name = data.get("name");
        String birthday = data.get("birthday");
        String reg = data.get("reg");
        String gender = data.get("gender");
        String phone = data.get("phone");
        String math = data.get("math");
        String lit = data.get("lit");
        String eng = data.get("eng");
        String status = data.get("status");

        LocalDate resultDate = LocalDate.parse(birthday, DateTimeFormatter.ISO_DATE);
        Date sqlDate = java.sql.Date.valueOf(resultDate);

        resultExamService.edit(name, sqlDate, reg, gender, phone, math, lit, eng, status, reid);
    }

    @PostMapping("/deleteResult")
    @CrossOrigin(origins = "http://localhost:3000/resultExam")
    public void deleteResult(@RequestBody Map<String, String> delete) {
        String resultId = delete.get("ResultExamId");
        Integer reid = Integer.parseInt(resultId);
        resultExamService.delete(reid);
    }

    @PostMapping("/managestudent")
    @CrossOrigin(origins = "http://localhost:3000/students")
    public List<Map<String, Object>> findClass(@RequestBody Map<String, String> credentials) {
        String classId = credentials.get("classid");
        Integer id = Integer.parseInt(classId);
        return studentService.findByMain(id);
    }

    @PostMapping("/allstudent")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public List<Map<String, Object>> AllStudent() {
        return studentService.AllStudent();
    }

    @PostMapping("/addstudent")
    @CrossOrigin(origins = "http://localhost:3000/students")
    public void addstudent(@RequestBody Map<String, String> credentials) {
        String rollno = credentials.get("rollno");
        String studentName = credentials.get("studentName");
        String email = credentials.get("email");
        String phone = credentials.get("phone");
        String cccd = credentials.get("cccd");
        String gender = credentials.get("gender");
        String status = credentials.get("status");
        String religion = credentials.get("religion");
        String ethnicity = credentials.get("ethnicity");
        String moec = credentials.get("moec");
        String place = credentials.get("place");
        String password = credentials.get("password");
        String dadName = credentials.get("dadName");
        String momname = credentials.get("momname");
        String dadphone = credentials.get("dadphone");
        String momphone = credentials.get("momphone");
        String jobdad = credentials.get("jobdad");
        String jobmom = credentials.get("jobmom");
        String temporaryAddress = credentials.get("temporaryAddress");
        String permanentAddress = credentials.get("permanentAddress");
        String selectedProvince = credentials.get("selectedProvince");
        String selectedDistrict = credentials.get("selectedDistrict");
        String selectedWard = credentials.get("selectedWard");
        String birthdaytt = credentials.get("birthday");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(birthdaytt, formatter);
        java.util.Date birthday = java.sql.Date.valueOf(localDate);
        String classid = credentials.get("classid");
        Integer clsid = Integer.parseInt(classid);
        studentService.addStudent(rollno, studentName, email, phone, cccd, gender, status, religion, ethnicity, moec, place, password, dadName, momname, dadphone, momphone, jobdad, jobmom, temporaryAddress, permanentAddress, selectedProvince, selectedDistrict, selectedWard, birthday, clsid);
    }

    @PostMapping("/manageSubject")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public List<Map<String, Object>> getAllSubjectsGroups() {
        return subjectService.getAllSubjectsGroups();
    }

    @PostMapping("/subject")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public List<Map<String, Object>> getAllSubject() {
        return subjectService.getAllSubject();
    }

    @PostMapping("/combination")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public List<Map<String, Object>> getAllCombination() {
        return subjectService.getAllCombination();
    }

    @PostMapping("/addSubject")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public void addSubject(@RequestBody Map<String, String> credentials) {
        String subjectsName = credentials.get("subjects_Name");
        subjectService.addSubject(subjectsName);
    }

    @PostMapping("/getsubject")
    public List<Map<String, Object>> findSubject(@RequestBody Map<String, String> credentials) {
        Integer id = Integer.parseInt(credentials.get("idno"));
        return subjectService.subjectsbyID(id);
    }

    @PostMapping("/getstudent")
    public List<Map<String, Object>> findStudent(@RequestBody Map<String, String> credentials) {
        Integer id = Integer.parseInt(credentials.get("idsdn"));
        return studentService.studentID(id);
    }

    @PostMapping("/editstudent")
    @CrossOrigin(origins = "http://localhost:3000/editstudent")
    public void editStudent(@RequestBody Map<String, String> cre) {
        {
            Integer id = Integer.parseInt(cre.get("idsdn"));
            String rollno = cre.get("rollno");
            String studentName = cre.get("studentName");
            String email = cre.get("email");
            String phone = cre.get("phone");
            String cccd = cre.get("cccd");
            String gender = cre.get("gender");
            String status = cre.get("status");
            String religion = cre.get("religion");
            String ethnicity = cre.get("ethnicity");
            String place = cre.get("place");
            String password = cre.get("password");
            String dadName = cre.get("dadName");
            String momname = cre.get("momname");
            String dadphone = cre.get("dadphone");
            String momphone = cre.get("momphone");
            String jobdad = cre.get("jobdad");
            String jobmom = cre.get("jobmom");
            String temporaryAddress = cre.get("temporaryAddress");
            String permanentAddress = cre.get("permanentAddress");
            String selectedProvince = cre.get("selectedProvince");
            String selectedDistrict = cre.get("selectedDistrict");
            String selectedWard = cre.get("selectedWard");
            String birthdayh = cre.get("birthday");
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate localDate = LocalDate.parse(birthdayh, formatter);
            java.util.Date birthday = java.sql.Date.valueOf(localDate);
            studentService.editstudent(id, rollno, studentName, email, phone, cccd, gender, status, religion, ethnicity, place, password, dadName, momname, dadphone, momphone, jobdad, jobmom, temporaryAddress, permanentAddress, selectedProvince, selectedDistrict, selectedWard, birthday);
        }
    }

    @PostMapping("/edit")
    public void editSubject(@RequestBody Map<String, String> cre) {
        Integer id = Integer.parseInt(cre.get("idno"));
        String subjectsName = cre.get("subjects_Name");
        subjectService.editSubject(subjectsName, id);
    }

    @PostMapping("/getcombination")
    public List<Map<String, Object>> findCombination(@RequestBody Map<String, String> credentials) {
        Integer id = Integer.parseInt(credentials.get("idnol"));
        return subjectService.combinationID(id);
    }

    @PostMapping("/editcombination")
    public void editcombination(@RequestBody Map<String, String> cre) {
        Integer id = Integer.parseInt(cre.get("idnol"));
        String subjects = cre.get("subjects");
        String subjectCombinationCode = cre.get("subject_Combination_Code");
        String studyTopics = cre.get("studyTopics");
        subjectService.editcombination(subjects, subjectCombinationCode, studyTopics, id);
    }

    @PostMapping("/addSubjectCombination")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public void addSubjectCombination(@RequestBody Map<String, String> credentials) {
        String subjects = credentials.get("subjects");
        String subjectCombinationCode = credentials.get("subjectCombinationCode");
        String studyTopics = credentials.get("studyTopics");
        subjectService.addSubjectCombination(subjects, subjectCombinationCode, studyTopics);
    }

    @PostMapping("/count")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public int totalAllStudent() {
        return studentService.totalAllStudent();
    }

    @PostMapping("/countTeacher")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public int totalAllTeacher() {
        return teacherService.totalAllTeacher();
    }

//    @PostMapping("/sumPrice")
//    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
//    public int totalPrice() {
//        return orderDetalsService.totalPrice();
//    }
    @PostMapping("/sumroom")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public int allRoom() {
        return roomConditionService.allRoom();
    }

    @PostMapping("/deleteStudent")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public void deleteStudent(@RequestBody Map<String, String> delete) {
        String studentID = delete.get("studentID");
        Integer std = Integer.parseInt(studentID);
        System.out.println("id" + studentID);
        studentService.deleteStudent(std);
    }

    @PostMapping("/deletesubjects")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public void deleteSubject(@RequestBody Map<String, String> delete) {
        String subjectsID = delete.get("subjectsID");
        Integer sub = Integer.parseInt(subjectsID);
        subjectService.deleteSubject(sub);
    }

    @PostMapping("/deletecombination")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public void deleteCombination(@RequestBody Map<String, String> delete) {
        String subject_CombinationID = delete.get("subject_CombinationID");
        Integer subcm = Integer.parseInt(subject_CombinationID);
        subjectService.deleteCombination(subcm);
    }

    @PostMapping("/getclasscc")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    List<Map<String, Object>> showAll() {
        return classService.showAll();
    }

    @PostMapping("/allsalary")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    public List<Map<String, Object>> allsalary() {
        return educationOfTeacherService.allsalary();
    }

    @PostMapping("/studenttitle")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    List<Map<String, Object>> StudentTitle() {
        return studentService.StudentTitle();
    }

    @PostMapping("/getall")
    public List<Map<String, Object>> getAllArticles() {
        System.out.println("list" + articlesService.getAllArticles());
        return articlesService.getAllArticles();
    }

    @PostMapping("/create")
    @CrossOrigin(origins = "http://localhost:3000/add")
    public ResponseEntity<Articles> createArticle(@RequestBody Articles article) {
        Articles savedArticle = articlesService.saveArticle(article);
        return new ResponseEntity<>(savedArticle, HttpStatus.CREATED);
    }

    @PostMapping("/deleteari")
    @CrossOrigin(origins = "http://localhost:3000/articlesService")
    public void deleteArticles(@RequestBody Map<String , String> delele){
        String articlesid = delele.get("id");
        Integer doc = Integer.parseInt(articlesid);
        articlesService.deleteArticles(doc);
    }
    
     @PostMapping("/getdoc")
    @CrossOrigin(origins = "http://localhost:3000/document")
    public List<Map<String, Object>> getDocument() {
        return documentService.findAll();
    }

    @GetMapping("/{id}")
    public Document getDocumentById(@PathVariable Integer id) {
        return documentService.getDocumentById(id);
    }

    @PutMapping("/{id}")
    public Document updateDocument(@PathVariable Integer id, @RequestBody Document document) {
        return documentService.updateDocument(id, document);
    }

    @PostMapping("/deletedoc")
    @CrossOrigin(origins = "http://localhost:3000/document")
    public void deleteDocument(@RequestBody Map<String , String> delele){
        String documentId = delele.get("id");
        Integer doc = Integer.parseInt(documentId);
        documentService.deleteDocument(doc);
    }
    
    @PostMapping("/showsalarylevel")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
    List<Map<String, Object>> showNameLevelSalary() {
        return teacherService.showNameLevelSalary();
    }
    
    @PostMapping("/showStudentponit")
    @CrossOrigin(origins = "http://localhost:3000/manageSubject")
     List<Map<String,Object>> ShowStudentponit() {
        return studentService.ShowStudentponit();
    }
}
