/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.controller;

import com.example.backend.model.Message;
import com.example.backend.model.EducationOfTeacher;
import com.example.backend.model.MainTeacher;
import com.example.backend.model.Notifications;
import com.example.backend.model.PointOfStudent;
import com.example.backend.model.RoomCondition;
import com.example.backend.model.Students;
import com.example.backend.model.Subjects;
import com.example.backend.model.Teacher;
import com.example.backend.model.Schedule;
import com.example.backend.model.TutoringClass;
import com.example.backend.repository.ChatMessageRepository;
import com.example.backend.services.ClassService;
import com.example.backend.services.EducationOfTeacherService;
import com.example.backend.services.MainTeacherService;
import com.example.backend.services.NotificationsService;
import com.example.backend.services.OperationService;
import com.example.backend.services.PointOfStudentService;
import com.example.backend.services.RecordApplicationService;
import com.example.backend.services.RoomConditionService;
import com.example.backend.services.RoomService;
import com.example.backend.services.ScheduleService;
import com.example.backend.services.StudentService;
import com.example.backend.services.SubjectService;
import com.example.backend.services.TeacherService;
import com.example.backend.services.TeacherSubjectsService;
import com.example.backend.services.TeacherTeachingServiceService;
import com.example.backend.services.TutoringClassService;
import com.example.backend.services.TwilioServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.Time;
import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Row;
import static org.apache.poi.ss.usermodel.TableStyleType.headerRow;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Comparator;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private MainTeacherService mainTeacherService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private PointOfStudentService pointOfStudentService;

    @Autowired
    private OperationService operationService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private ClassService classService;

    @Autowired
    private TutoringClassService tutoringClassService;

    @Autowired
    private TeacherSubjectsService teacherSubjectsService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomConditionService roomConditionService;

    @Autowired
    private TwilioServiceImpl twilioService;

    @Autowired
    private NotificationsService notificationsService;

    @Autowired
    private EducationOfTeacherService educationOfTeacherService;

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private TeacherTeachingServiceService teacherTeachingServiceService;

    @Autowired
    private RecordApplicationService recordApplicationService;

    @PostMapping("/dashboard")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public Teacher findByTeacherId(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        Teacher teacher = teacherService.myInfoById(id);
        return teacher;
    }

    @PostMapping("/class")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public Map<String, Object> findClass(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        String page = credentials.get("page");
        String size = credentials.get("size");
        Integer paged = Integer.parseInt(page);
        Integer sized = Integer.parseInt(size);
        Integer teacher = Integer.parseInt(teacherId);
        String orderType = credentials.get("orderType");
        Map<String, Object> res = mainTeacherService.findByMain(teacher, orderType, paged, sized);
        return res;
    }

    @PostMapping("/class/student-information")
    @CrossOrigin(origins = "http://localhost:3000/class")
    public ResponseEntity<Students> findInformation(@RequestBody Map<String, String> credentials) {
        String studentId = credentials.get("studentId");
        Integer id = Integer.parseInt(studentId);
        Students student = studentService.findByStudent(id);
        return ResponseEntity.ok(student);
    }

    @PostMapping("/class/student-info")
    @CrossOrigin(origins = "http://localhost:3000/teachers/class/student-information/studentId")
    public List<Map<String, Object>> showStudentInfo(@RequestBody Map<String, String> credentials) {
        String studentId = credentials.get("studentId");
        Integer id = Integer.parseInt(studentId);
        List<Map<String, Object>> student = studentService.findByStudentId(id);
        return student;
    }

    @PostMapping("/class/infomation")
    @CrossOrigin(origins = "http://localhost:3000/teachers/class/learning-result/studentId")
    public List<Map<String, Object>> showStudents(@RequestBody Map<String, String> credentials) {
        String studentId = credentials.get("studentId");
        Integer id = Integer.parseInt(studentId);
        List<Map<String, Object>> student = studentService.findByStudentId(id);
        return student;
    }

    @PostMapping("/class/export")
    @CrossOrigin(origins = "http://localhost:3000/class")
    public void exportData(HttpServletResponse response, @RequestBody Map<String, String> credentials) throws IOException {
        String teacherId = credentials.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        List<Map<String, Object>> students = mainTeacherService.findStudents(id);
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Students");

        // Create header row
        XSSFRow headerRow = sheet.createRow(0);
        String[] headers = {"StudentID", "Student_Name", "Class_Name", "Rollno", "Gender", "Birthday", "Cccd", "Phone", "Dad_Name", "Mom_Name", "Permanent_Address", "Student_Avatar", "Part"};
        for (int i = 0; i < headers.length; i++) {
            headerRow.createCell(i).setCellValue(headers[i]);
        }

        // Populate data
        int rowNum = 1;
        for (Map<String, Object> student : students) {
            XSSFRow row = sheet.createRow(rowNum++);
            for (int i = 0; i < headers.length; i++) {
                Object value = student.get(headers[i]);
                row.createCell(i).setCellValue(value != null ? value.toString() : "Null"); // hoặc một giá trị mặc định khác
            }
        }

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=students.xlsx");
        workbook.write(response.getOutputStream());
        workbook.close();
    }

    @PostMapping("/class/word")
    @CrossOrigin(origins = "http://localhost:3000/teachers/class/student-information/studentId")
    public void exportWord(HttpServletResponse response, @RequestBody Map<String, String> credentials) throws IOException {
        String studentId = credentials.get("studentId");
        Integer id = Integer.parseInt(studentId);
        List<Map<String, Object>> students = studentService.findByStudentId(id);

        if (students.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        Map<String, Object> student = students.get(0);
        XWPFDocument document = new XWPFDocument();

        XWPFParagraph titleParagraph = document.createParagraph();
        titleParagraph.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun titleRun = titleParagraph.createRun();
        titleRun.setText("THÔNG TIN HỌC SINH");
        titleRun.setBold(true);
        titleRun.setFontSize(16);
        titleRun.addBreak();

        addStudentInfo(document, "Họ và tên:", student.get("Student_Name"));
        addStudentInfo(document, "Lớp:", student.get("ClassName"));
        addStudentInfo(document, "Ngày sinh:", student.get("Birthday"));
        addStudentInfo(document, "Căn cước công dân:", student.get("Cccd"));
        addStudentInfo(document, "Số điện thoại:", student.get("Phone"));
        addStudentInfo(document, "Giới tính:", student.get("Gender"));
        addStudentInfo(document, "Dân tộc:", student.get("Ethnicity"));
        addStudentInfo(document, "Địa chỉ thường trú:", student.get("Permanent_Address"));
        addStudentInfo(document, "Email:", student.get("Email"));
        addStudentInfo(document, "Tên bố:", student.get("Dad_Name"));
        addStudentInfo(document, "Nghề nghiệp của bố:", student.get("Jobdad"));
        addStudentInfo(document, "Tên mẹ:", student.get("Mom_Name"));
        addStudentInfo(document, "Nghề nghiệp của mẹ:", student.get("Jobmom"));
        addStudentInfo(document, "Số điện thoại phụ huynh:", student.get("Parent_Phone"));
        addStudentInfo(document, "Số điện thoại phụ huynh 2:", student.get("Parent_Phone2"));
        addStudentInfo(document, "Mã học sinh:", student.get("RollNo"));
        addStudentInfo(document, "Điểm trung bình tất cả các môn:", student.get("Averageofallsubjects"));

        String fileName = URLEncoder.encode(
                removeDiacritics(student.get("Student_Name").toString()).replaceAll("\\s+", ""),
                StandardCharsets.UTF_8
        ) + ".docx";

        response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);

        document.write(response.getOutputStream());
    }

    public static String removeDiacritics(String input) {
        return Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("[\\p{InCombiningDiacriticalMarks}]", "")
                .replaceAll("\\s+", "");
    }

    private void addStudentInfo(XWPFDocument document, String label, Object value) {
        XWPFParagraph paragraph = document.createParagraph();
        XWPFRun runLabel = paragraph.createRun();
        runLabel.setBold(true);
        runLabel.setText(label);

        XWPFRun runValue = paragraph.createRun();
        runValue.setText(" " + (value != null ? value.toString() : "Không có thông tin"));
        runValue.addBreak();
    }

    @PostMapping("/class/learning-result")
    @CrossOrigin(origins = "http://localhost:3000/teachers/class/learning-result/studentId")
    public List<Map<String, Object>> findPointById(@RequestBody Map<String, String> credentials) {
        String studentId = credentials.get("studentId");
        Integer id = Integer.parseInt(studentId);
        List<Map<String, Object>> studentOfPoint = studentService.findPointById(id);
        return studentOfPoint;
    }

    @PostMapping("/class/result")
    @CrossOrigin(origins = "http://localhost:3000/teachers/class/learning-result/studentId")
    public List<Map<String, Object>> showPoint(@RequestBody Map<String, String> credentials) {
        String studentId = credentials.get("studentId");
        Integer id = Integer.parseInt(studentId);
        List<Map<String, Object>> result = pointOfStudentService.showPointByStudentId(id);
        return result;
    }

    @PostMapping("/class/exportPointData")
    @CrossOrigin(origins = "http://localhost:3000/teachers/class/learning-result/studentId")
    public void exportPointData(HttpServletResponse response, @RequestBody Map<String, String> credentials) throws IOException {
        String studentId = credentials.get("studentId");
        Integer id = Integer.parseInt(studentId);
        List<Map<String, Object>> student = pointOfStudentService.showPointByStudentId(id);
        XSSFWorkbook workbook = new XSSFWorkbook();
        String sheetName = student.get(0).get("Student_Name").toString();

        sheetName = sheetName.length() > 31 ? sheetName.substring(0, 31) : sheetName;
        sheetName = sheetName.replaceAll("[\\\\/?*\\[\\]]", "");
        XSSFSheet sheet = workbook.createSheet(sheetName);
        XSSFRow headerRow = sheet.createRow(0);

        List<Map<String, Object>> results = pointOfStudentService.allPointById(id);

        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("Miệng lần 1", "MouthTestpoint1");
        headerMap.put("Miệng lần 2", "MouthTestpoint2");
        headerMap.put("15 phút lần 1", "Test151point");
        headerMap.put("15 phút lần 2", "Test152point");
        headerMap.put("15 phút lần 3", "Test153point");
        headerMap.put("15 phút lần 4", "Test154point");
        headerMap.put("1 tiết lần 1", "TestLessonpoint");
        headerMap.put("1 tiết lần 2", "TestLesson2point");
        headerMap.put("1 tiết lần 3", "TestLesson3point");
        headerMap.put("1 tiết lần 4", "TestLesson4point");
        headerMap.put("Thi", "Exam1");
        headerMap.put("Thi", "Exam2");
        headerMap.put("Trung bình học kì 1", "Goalaverage");
        headerMap.put("Trung bình học kì 2", "Goalaverage2");
        headerMap.put("Cả năm", "Allin");

        String[] headers = {"Miệng lần 1", "Miệng lần 2", "15 phút lần 1", "15 phút lần 2", "15 phút lần 3", "15 phút lần 4", "1 tiết lần 1", "1 tiết lần 2", "1 tiết lần 3", "1 tiết lần 4", "Thi", "Thi", "Trung bình học kì 1", "Trung bình học kì 2", "Cả năm"};
        for (int i = 0; i < headers.length; i++) {
            headerRow.createCell(i).setCellValue(headers[i]);
        }

        int rowNum = 1;
        for (Map<String, Object> rs : results) {
            XSSFRow row = sheet.createRow(rowNum++);
            for (int i = 0; i < headers.length; i++) {
                String key = headerMap.get(headers[i]);
                Object value = rs.get(key);
                row.createCell(i).setCellValue(value != null ? value.toString() : "Null");
            }
        }

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=students.xlsx");
        workbook.write(response.getOutputStream());
        workbook.close();
    }

    @PostMapping("/point")
    @CrossOrigin(origins = "http://localhost:3000/point")
    public List<Map<String, Object>> showClassByTeacherId(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        System.out.println("teacherId" + teacherId);
        Integer teacher = Integer.parseInt(teacherId);
        List<Map<String, Object>> result = operationService.findClassByTeacherId(teacher);
        return result;
    }

    @PostMapping("/point/classes")
    @CrossOrigin(origins = "http://localhost:3000/point")
    public Map<String, Object> showPointByClass(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        String classId = credentials.get("classId");
        String subjectId = credentials.get("subId");
        String page = credentials.get("page");
        String size = credentials.get("size");
        Integer teacher = Integer.parseInt(teacherId);
        Integer classer = Integer.parseInt(classId);
        Integer subjecter = Integer.parseInt(subjectId);
        Integer pager = Integer.parseInt(page);
        Integer sizer = Integer.parseInt(size);
        Map<String, Object> result = operationService.findPointByTeacherAndClass(teacher, subjecter, classer, pager, sizer);
        return result;
    }

    @PostMapping("/point/classesfindall")
    @CrossOrigin(origins = "http://localhost:3000/point")
    public Map<String, Object> showPointByClassAll(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        String classId = credentials.get("classId");
        String subjectId = credentials.get("subId");
        Integer teacher = Integer.parseInt(teacherId);
        Integer classer = Integer.parseInt(classId);
        Integer subjecter = Integer.parseInt(subjectId);
        Map<String, Object> result = operationService.findPointByTeacherAndClassAll(teacher, subjecter, classer);
        return result;
    }

    @PostMapping("/point/find")
    @CrossOrigin(origins = "http://localhost:3000/point")
    public List<Map<String, Object>> showAllStudent(@RequestBody Map<String, String> credentials) {
        String classId = credentials.get("classId");
        Integer id = Integer.parseInt(classId);
        List<Map<String, Object>> result = studentService.findAllStudentByClassId(id);
        return result;
    }

    @PostMapping("/point/create")
    @CrossOrigin(origins = "http://localhost:3000/createpoint")
    public ResponseEntity<?> createPoint(@RequestBody Map<String, String> data) {
        String studentId = data.get("studentId");
        String subId = data.get("subId");

        BigDecimal allin = new BigDecimal(0);

        Integer studenter = Integer.parseInt(studentId);
        Integer suber = Integer.parseInt(subId);

        String mountTestpoint = data.get("mouthTestpoint1");
        String mountTestpoint2 = data.get("mouthTestpoint2");
        String test15_1point = data.get("test15_1point");
        String test15_2point = data.get("test15_2point");
        String test15_3point = data.get("test15_3point");
        String test15_4point = data.get("test15_4point");
        String testLessonpoint = data.get("testLessonpoint");
        String testLesson2point = data.get("testLesson2point");
        String testLesson3point = data.get("testLesson3point");
        String testLesson4point = data.get("testLesson4point");
        String exam = data.get("exam1");
        String exam2 = data.get("exam2");

        BigDecimal mount = new BigDecimal(mountTestpoint != null && !mountTestpoint.isEmpty() ? mountTestpoint : "0");
        BigDecimal mount2 = new BigDecimal(mountTestpoint2 != null && !mountTestpoint2.isEmpty() ? mountTestpoint2 : "0");
        BigDecimal test1 = new BigDecimal(test15_1point != null && !test15_1point.isEmpty() ? test15_1point : "0");
        BigDecimal test2 = new BigDecimal(test15_2point != null && !test15_2point.isEmpty() ? test15_2point : "0");
        BigDecimal test3 = new BigDecimal(test15_3point != null && !test15_3point.isEmpty() ? test15_3point : "0");
        BigDecimal test4 = new BigDecimal(test15_4point != null && !test15_4point.isEmpty() ? test15_4point : "0");
        BigDecimal testLes1 = new BigDecimal(testLessonpoint != null && !testLessonpoint.isEmpty() ? testLessonpoint : "0");
        BigDecimal testLes2 = new BigDecimal(testLesson2point != null && !testLesson2point.isEmpty() ? testLesson2point : "0");
        BigDecimal testLes3 = new BigDecimal(testLesson3point != null && !testLesson3point.isEmpty() ? testLesson3point : "0");
        BigDecimal testLes4 = new BigDecimal(testLesson4point != null && !testLesson4point.isEmpty() ? testLesson4point : "0");
        BigDecimal ex = new BigDecimal(exam != null && !exam.isEmpty() ? exam : "0");
        BigDecimal ex2 = new BigDecimal(exam2 != null && !exam2.isEmpty() ? exam2 : "0");

        BigDecimal goa1 = mount.add(test1)
                .add(test2)
                .add(testLes1.multiply(BigDecimal.valueOf(2)))
                .add(testLes2.multiply(BigDecimal.valueOf(2)))
                .add(ex.multiply(BigDecimal.valueOf(3)))
                .divide(BigDecimal.valueOf(10), 2, RoundingMode.HALF_UP)
                .setScale(1, RoundingMode.HALF_UP);

        BigDecimal goa2 = mount2.add(test3)
                .add(test4)
                .add(testLes3.multiply(BigDecimal.valueOf(2)))
                .add(testLes4.multiply(BigDecimal.valueOf(2)))
                .add(ex2.multiply(BigDecimal.valueOf(3)))
                .divide(BigDecimal.valueOf(10), 2, RoundingMode.HALF_UP)
                .setScale(1, RoundingMode.HALF_UP);

        if (goa1.compareTo(BigDecimal.ZERO) != 0 || goa2.compareTo(BigDecimal.ZERO) != 0) {
            BigDecimal term1 = goa1.multiply(BigDecimal.ONE);
            BigDecimal term2 = goa2.multiply(new BigDecimal("2"));
            BigDecimal sum = term1.add(term2);
            allin = sum.divide(new BigDecimal("3"), 2, RoundingMode.HALF_UP)
                    .setScale(1, RoundingMode.HALF_UP);
        } else {
            allin = BigDecimal.ZERO;
        }

        List<PointOfStudent> st = pointOfStudentService.findByStudentAndSubjectId(studenter, suber);
        if (st.isEmpty()) {
            System.out.println("Allin: " + allin);
            pointOfStudentService.createPoint(studenter, suber, mount, mount2, test1, test2, test3, test4, testLes1, testLes2, testLes3, testLes4, ex, ex2, goa1, goa2, allin);
            return ResponseEntity.ok(200);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Học sinh này đã có điểm cho môn học này!");
        }
    }

    @PostMapping("/point/edit")
    @CrossOrigin(origins = "http://localhost:3000/teachers/point/edit-point/pointId")
    public void editPoint(@RequestBody Map<String, String> data) {
        String pointId = data.get("pointId");
        String studentId = data.get("studentId");
        String subId = data.get("subId");

        BigDecimal allin = new BigDecimal(0);

        Integer pointer = Integer.parseInt(pointId);
        Integer studenter = Integer.parseInt(studentId);
        Integer suber = Integer.parseInt(subId);

        String mountTestpoint = data.get("m1");
        String mountTestpoint2 = data.get("m2");
        String test15_1point = data.get("t15p1");
        String test15_2point = data.get("t15p2");
        String test15_3point = data.get("t15p3");
        String test15_4point = data.get("t15p4");
        String testLessonpoint = data.get("tl1");
        String testLesson2point = data.get("tl2");
        String testLesson3point = data.get("tl3");
        String testLesson4point = data.get("tl4");
        String exam = data.get("exam1");
        String exam2 = data.get("exam2");

        BigDecimal mount = new BigDecimal(mountTestpoint != null && !mountTestpoint.isEmpty() ? mountTestpoint : "0");
        BigDecimal mount2 = new BigDecimal(mountTestpoint2 != null && !mountTestpoint2.isEmpty() ? mountTestpoint2 : "0");
        BigDecimal test1 = new BigDecimal(test15_1point != null && !test15_1point.isEmpty() ? test15_1point : "0");
        BigDecimal test2 = new BigDecimal(test15_2point != null && !test15_2point.isEmpty() ? test15_2point : "0");
        BigDecimal test3 = new BigDecimal(test15_3point != null && !test15_3point.isEmpty() ? test15_3point : "0");
        BigDecimal test4 = new BigDecimal(test15_4point != null && !test15_4point.isEmpty() ? test15_4point : "0");
        BigDecimal testLes1 = new BigDecimal(testLessonpoint != null && !testLessonpoint.isEmpty() ? testLessonpoint : "0");
        BigDecimal testLes2 = new BigDecimal(testLesson2point != null && !testLesson2point.isEmpty() ? testLesson2point : "0");
        BigDecimal testLes3 = new BigDecimal(testLesson3point != null && !testLesson3point.isEmpty() ? testLesson3point : "0");
        BigDecimal testLes4 = new BigDecimal(testLesson4point != null && !testLesson4point.isEmpty() ? testLesson4point : "0");
        BigDecimal ex = new BigDecimal(exam != null && !exam.isEmpty() ? exam : "0");
        BigDecimal ex2 = new BigDecimal(exam2 != null && !exam2.isEmpty() ? exam2 : "0");

        BigDecimal goa1 = mount.add(test1)
                .add(test2)
                .add(testLes1.multiply(BigDecimal.valueOf(2)))
                .add(testLes2.multiply(BigDecimal.valueOf(2)))
                .add(ex.multiply(BigDecimal.valueOf(3)))
                .divide(BigDecimal.valueOf(10), RoundingMode.HALF_UP);

        BigDecimal goa2 = mount2.add(test3)
                .add(test4)
                .add(testLes3.multiply(BigDecimal.valueOf(2)))
                .add(testLes4.multiply(BigDecimal.valueOf(2)))
                .add(ex2.multiply(BigDecimal.valueOf(3)))
                .divide(BigDecimal.valueOf(10), RoundingMode.HALF_UP);

        if (goa1.compareTo(BigDecimal.ZERO) != 0 || goa2.compareTo(BigDecimal.ZERO) != 0) {
            BigDecimal term1 = goa1.multiply(BigDecimal.ONE);
            BigDecimal term2 = goa2.multiply(new BigDecimal("2"));
            BigDecimal sum = term1.add(term2);
            allin = sum.divide(new BigDecimal("3"), 2, RoundingMode.HALF_UP);
        } else {
            allin = BigDecimal.ZERO;
        }
        pointOfStudentService.updatePoint(mount, mount2, test1, test2, test3, test4, testLes1, testLes2, testLes3, testLes4, ex, ex2, goa1, goa2, allin, suber, studenter, pointer);
    }

    @PostMapping("/point/editpoint")
    @CrossOrigin(origins = "http://localhost:3000/teachers/point/edit-point/pointId")
    public PointOfStudent showPointByPointId(@RequestBody Map<String, String> credentials) {
        String pointId = credentials.get("pointId");
        Integer id = Integer.parseInt(pointId);
        return pointOfStudentService.findByPointId(id);
    }

    @PostMapping("/point/findstudent")
    @CrossOrigin(origins = "http://localhost:3000/teachers/point/edit-point/pointId")
    public Students showStudentByStudentId(@RequestBody Map<String, String> credentials) {
        String studentId = credentials.get("studentId");
        Integer id = Integer.parseInt(studentId);
        return studentService.findByStudent(id);
    }

    @PostMapping("/point/findsubject")
    @CrossOrigin(origins = "http://localhost:3000/teachers/point/edit-point/pointId")
    public Subjects showSubjectByStudentId(@RequestBody Map<String, String> credentials) {
        String subjectsid = credentials.get("subjectsId");
        Integer id = Integer.parseInt(subjectsid);
        return subjectService.findBySubjectId(id);
    }

    @PostMapping("/point/delete")
    @CrossOrigin(origins = "http://localhost:3000/point")
    public void deletePoint(@RequestBody Map<String, String> credentials) {
        String pointId = credentials.get("pointId");
        Integer id = Integer.parseInt(pointId);
        pointOfStudentService.deletePoint(id);
    }

    @PostMapping("/totalsession")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public Integer sumSession(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return scheduleService.sumSession(id);
    }

    @PostMapping("/totalstudent")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public Integer sumStudent(@RequestBody Map<String, String> credentails) {
        String teacherId = credentails.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return studentService.sumStudentByTeacherId(id);
    }

    @PostMapping("/totalroom")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public Integer sumRoomBorrowed(@RequestBody Map<String, String> credentails) {
        String teacherId = credentails.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return roomConditionService.countRoomBorrowed(id);
    }

    @PostMapping("/rankChart")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public List<Map<String, Object>> dataRankChart(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return mainTeacherService.rankStudentByTeacherId(id);
    }

    @PostMapping("/namerankChart")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public MainTeacher nameRankChart(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return mainTeacherService.findByTeacherId(id);
    }

    @PostMapping("/getClassRankChart")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public List<Map<String, Object>> getClassRankChart(@RequestBody Map<String, String> credentials) {
        String classId = credentials.get("classId");
        Integer id = Integer.parseInt(classId);
        return classService.dataRankChart(id);
    }

    @PostMapping("/studentTop10")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public Map<String, Object> showTop10Student(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        String page = credentials.get("page");
        String size = credentials.get("size");
        Integer id = Integer.parseInt(teacherId);
        Integer pager = Integer.parseInt(page);
        Integer sizer = Integer.parseInt(size);
        return studentService.findTop10(id, pager, sizer);
    }

    @PostMapping("/tutoring")
    @CrossOrigin(origins = "http://localhost:3000/tutoring")
    public Map<String, Object> showTutoringTeacher(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        String page = credentials.get("page");
        String size = credentials.get("size");
        Integer id = Integer.parseInt(teacherId);
        Integer pager = Integer.parseInt(page);
        Integer sizer = Integer.parseInt(size);
        return tutoringClassService.showTutoringByTeacherId(id, pager, sizer);
    }

    @PostMapping("/classtutoring")
    @CrossOrigin(origins = "http://localhost:3000/createtutoring")
    public List<Map<String, Object>> showClassByTeacherIdTutoring(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        System.out.println("teacherId" + teacherId);
        Integer teacher = Integer.parseInt(teacherId);
        List<Map<String, Object>> result = operationService.findClassByTeacherId(teacher);
        return result;
    }

    @PostMapping("/classtutoring/find")
    @CrossOrigin(origins = "http://localhost:3000/createtutoring")
    public List<Map<String, Object>> showAllStudentTutoring(@RequestBody Map<String, String> credentials) {
        String classId = credentials.get("classId");
        Integer id = Integer.parseInt(classId);
        List<Map<String, Object>> result = studentService.findAllStudentByClassId(id);
        return result;
    }

    @PostMapping("/tutoring/create")
    @CrossOrigin(origins = "http://localhost:3000/createtutoring")
    public ResponseEntity<?> createTutoring(@RequestBody Map<String, String> data) {
        String teacherId = data.get("teacherId");
        String subId = data.get("subId");
        String code = data.get("code");
        String name = data.get("name");
        String sic = data.get("sic");
        Integer teacher = Integer.parseInt(teacherId);
        Integer suber = Integer.parseInt(subId);
        Integer s = Integer.parseInt(sic);
        Integer con = s;
        List<Map<String, Object>> tc = tutoringClassService.findTutoring(code);
        System.out.println("TC: " + tc);
        if (tc.size() == 0) {
            tutoringClassService.createTutoring(code, name, s, con, suber, teacher);
            return ResponseEntity.ok(200);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Mã lớp học này đã tồn tại!");
        }
    }

    @PostMapping("/tutoring/delete")
    @CrossOrigin(origins = "http://localhost:3000/tutoring")
    public ResponseEntity<String> deleteTutoring(@RequestBody Map<String, String> credentials) {
        String tutoringId = credentials.get("tutoringId");
        Integer id = Integer.parseInt(tutoringId);
        try {
            tutoringClassService.deleteTutoring(id);
            return ResponseEntity.ok("Tutoring record deleted successfully.");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cannot delete tutoring record because it is referenced by another record.");
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the tutoring record.");
        }
    }

    @PostMapping("/tutoring/editview")
    @CrossOrigin(origins = "http://localhost:3000/teachers/tutoring/edit-tutoring/tutoringId")
    public Map<String, Object> showStudentChoose(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        String page = credentials.get("page");
        String size = credentials.get("size");
        Integer teacher = Integer.parseInt(teacherId);
        Integer pager = Integer.parseInt(page);
        Integer sizer = Integer.parseInt(size);
        Map<String, Object> result = operationService.findStudentSmallAvg(teacher, pager, sizer);
        return result;
    }

    @PostMapping("/tutoring/edit")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> editTutoring(@RequestBody Map<String, String> credentials) {
        String tutoringIdObj = credentials.get("tutoringIdInt");

        String selectedPoint = credentials.get("selectedPoints");
        Integer select = Integer.parseInt(selectedPoint);

        Integer tutoring = Integer.parseInt(tutoringIdObj);

        // Lấy selectedPoint duy nhất
        System.out.println("Selected Point: " + selectedPoint);

        // Kiểm tra logic và thực hiện cập nhật
        Integer tu = tutoringClassService.findSic(tutoring);
        if (tu == 0) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Lớp đã đầy, không thể cập nhật.");
        } else {
            tutoringClassService.updateSic(tutoring, 1);
            studentService.updateTutoring(select, tutoring);
            return ResponseEntity.ok("Tutoring Class edit successfully!");
        }
    }

    @PostMapping("/tutoring/getData")
    @CrossOrigin(origins = "http://localhost:3000/teachers/tutoring/edit-tutoring/tutoringId")
    public Map<String, Object> tutoringData(@RequestBody Map<String, String> credentials) {
        String tutoringId = credentials.get("tutoringId");
        String page = credentials.get("page");
        String size = credentials.get("size");

        Integer id = Integer.parseInt(tutoringId);
        Integer pager = Integer.parseInt(page);
        Integer sizer = Integer.parseInt(size);
        return tutoringClassService.tutoringData(id, pager, sizer);
    }

    @PostMapping("/tutoring/deleteStudent")
    @CrossOrigin(origins = "http://localhost:3000/teachers/tutoring/edit-tutoring/tutoringId")
    public ResponseEntity<String> deleteStudentInTutoring(@RequestBody Map<String, String> credentials) {
        String tutoringIdObj = credentials.get("tutoringIdInt");
        

        String selectedPoint = credentials.get("deleteStudent");

        Integer tutoring = Integer.parseInt(tutoringIdObj);
        
        Integer select = Integer.parseInt(selectedPoint);

        // Lấy selectedPoint duy nhất
        System.out.println("Selected Point: " + selectedPoint);

        // Kiểm tra logic và thực hiện cập nhật
        Integer tu = tutoringClassService.findSic(tutoring);
        if (tu == 0) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Lớp đã đầy, không thể cập nhật.");
        } else {
            tutoringClassService.updateConAfterDelStu(tutoring);
            studentService.updateTutoring (select, null);
            return ResponseEntity.ok("Tutoring Class edit successfully!");
        }
    }

    @PostMapping("/tutoring/findTutoring")
    @CrossOrigin(origins = "http://localhost:3000/tutoring")
    public List<Map<String, Object>> showTutoringById(@RequestBody Map<String, String> credentials) {
        String tutoringId = credentials.get("tutoringId");
        Integer id = Integer.parseInt(tutoringId);
        return tutoringClassService.showAllByTutoringClassId(id);
    }

    @PostMapping("/schedule/getall")
    @CrossOrigin(origins = "http://localhost:3000/workschedule")
    public List<Map<String, Object>> getTeacherByTeacherSubject(@RequestBody Map<String, String> Data) {
        String id = Data.get("teacherID");
        int teacherID = Integer.parseInt(id);
        return teacherSubjectsService.getTeacherByTeacherSubject(teacherID);
    }

    @PostMapping("/schedule/schedule")
    @CrossOrigin(origins = "http://localhost:3000/workschedule")
    public List<Map<String, Object>> scheduleByTeacherID(@RequestBody Map<String, String> Data) {
        String id = Data.get("userID");
        int teacherid = Integer.parseInt(id);
        return scheduleService.getScheduleByTeacherID(teacherid);
    }

    @PostMapping("/schedule/getclass")
    @CrossOrigin(origins = "http://localhost:3000/workschedule")
    public List<Map<String, Object>> getclassbyid(@RequestBody Map<String, String> Data) {
        String id = Data.get("ClassID");
        Integer classid = Integer.parseInt(id);
        return classService.getClassIDbyClassID(classid);
    }

    @PostMapping("/room/findroom")
    @CrossOrigin(origins = "http://localhost:3000/room")
    public List<Map<String, Object>> showAllRooom() {
        return roomService.findRoomAll();
    }

    @PostMapping("/room/roombyId")
    @CrossOrigin(origins = "http://localhost:3000/room")
    public List<Map<String, Object>> findRoomConditionById(@RequestBody Map<String, String> credentials) {
        String roomId = credentials.get("roomId");
        Integer id = Integer.parseInt(roomId);
        return roomConditionService.findRoomConditionById(id);
    }

    @PostMapping("/room/create")
    @CrossOrigin(origins = "http://localhost:3000/room")
    public ResponseEntity<String> createRoom(@RequestBody Map<String, String> credentials) throws ParseException {
        String roomId = credentials.get("roomId");
        String teacherId = credentials.get("teacherId");
        String chooseDate = credentials.get("chooseDate");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate localDate = LocalDate.parse(chooseDate, formatter);

        Date dated = java.sql.Date.valueOf(localDate);
        Integer room = Integer.parseInt(roomId);
        Integer teacher = Integer.parseInt(teacherId);

        String session1 = credentials.get("session1");
        String session2 = credentials.get("session2");
        String session3 = credentials.get("session3");
        String session4 = credentials.get("session4");
        String session5 = credentials.get("session5");
        String session6 = credentials.get("session6");
        String session7 = credentials.get("session7");
        String session8 = credentials.get("session8");
        String session9 = credentials.get("session9");
        String session10 = credentials.get("session10");

        String day = credentials.get("day");
        String note = credentials.get("note");
        roomConditionService.createRoomCondition(dated, session1, session2, session3, session4, session5, session6, session7, session8, session9, session10, day, room, teacher, note);

        return ResponseEntity.ok("Room created successfully!");
    }

    @PostMapping("/room/delete")
    @CrossOrigin(origins = "http://localhost:3000/room")
    public ResponseEntity<String> deleteRoom(@RequestBody Map<String, String> credentials) {
        try {
            String roomId = credentials.get("roomConditionId");
            Integer id = Integer.parseInt(roomId);
            roomConditionService.deleteRoomCondition(id);
            return ResponseEntity.ok("Room deleted successfully!");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/room/findByRoomConditionId")
    @CrossOrigin(origins = "http://localhost:3000/room")
    public RoomCondition findByRoomConditionId(@RequestBody Map<String, String> credentials) {
        String roomConditionId = credentials.get("roomConditionId");
        Integer id = Integer.parseInt(roomConditionId);
        return roomConditionService.findRoomConditionByConditionId(id);
    }

    @PostMapping("/room/edit")
    @CrossOrigin(origins = "http://localhost:3000/room")
    public ResponseEntity<String> editRoom(@RequestBody Map<String, String> credentials) {
        try {
            String roomConditionId = credentials.get("roomConditionId");
            String note = credentials.get("note");
            Integer id = Integer.parseInt(roomConditionId);
            roomConditionService.updateRoomCondition(id, note);
            return ResponseEntity.ok("Room deleted successfully!");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/nextschedule")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public Schedule findNextSession(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        Schedule sc = scheduleService.findNextSession(id);
        if (sc == null) {
            System.out.println("ABC");
            return null;
        } else {
            return sc;
        }
    }

    @PostMapping("/nextschedule/getclass")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public List<Map<String, Object>> findNextSessionClass(@RequestBody Map<String, String> credentials) {
        String classId = credentials.get("classId");
        Integer id = Integer.parseInt(classId);
        return classService.findClassByClassId(id);
    }

    @PostMapping("/send")
    public String sendSms(@RequestParam Map<String, String> credentials) {
        String to = credentials.get("to");
        String message = credentials.get("message");
        twilioService.sendSms(to, message);
        return "SMS sent successfully!";
    }

    @PostMapping("/getMessage")
    public List<Map<String, Object>> findMessage() {
        return notificationsService.findMessage();
    }

    @PostMapping("/addChat")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public void addNotification(@RequestBody Map<String, String> cre) throws ParseException {
        String content = cre.get("content");
        String sendDate = cre.get("sendDate");
        String sendTime = cre.get("sendTime");

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");

            java.util.Date utilDate = dateFormat.parse(sendDate);
            java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

            java.util.Date utilTime = timeFormat.parse(sendTime);
            Time sqlTime = new Time(utilTime.getTime());

            notificationsService.create(content, utilDate, sqlTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/forgotpassword")
    @CrossOrigin(origins = "http://localhost:3000/change-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> cre) {
        String email = cre.get("email");
        String pass = cre.get("password");
        teacherService.updatePassword(email, pass);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/account/information")
    @CrossOrigin(origins = "http://localhost:3000/infomation")
    public List<Map<String, Object>> myInformation(@RequestBody Map<String, String> cre) {
        String teacherId = cre.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return teacherService.myInforByTeacherId(id);
    }

    @PostMapping("/getChatAdminTeacher")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public List<Message> getAllMessage() {
        return chatMessageRepository.findAll();
    }

    @PostMapping("/getAllAdmin")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public List<Map<String, Object>> showAllAdmin() {
        return teacherTeachingServiceService.showAllAdmin();
    }

    @PostMapping("/getInforSenderChat")
    @CrossOrigin(origins = "http://localhost:3000/teachers")
    public Teacher showInforSenderChat(@RequestBody Map<String, String> cre) {
        String teacherId = cre.get("teacherId");
        Integer id = Integer.parseInt(teacherId);
        return teacherService.myInfoById(id);
    }

    @PostMapping("/getRecordByTeacher")
    @CrossOrigin(origins = "http://localhost:3000/approve")
    public Map<String, Object> showAllRecordByTeacherId(@RequestBody Map<String, String> credentials) {
        String teacherId = credentials.get("teacherId");
        String page = credentials.get("page");
        String size = credentials.get("size");
        String status = credentials.get("status");
        String orderType = credentials.get("orderType");
        Integer teacher = Integer.parseInt(teacherId);
        Integer pager = Integer.parseInt(page);
        Integer sizer = Integer.parseInt(size);
        Map<String, Object> result = recordApplicationService.showAllRecordByTeacherId(teacher, status, orderType, pager, sizer);
        return result;
    }

    @PostMapping("/recordApplication/update")
    @CrossOrigin(origins = "http://localhost:3000/approve")
    public ResponseEntity<String> updateRecordApplication(@RequestBody Map<String, String> cre) {
        String recordId = cre.get("recordId");
        String status = cre.get("status");
        Integer id = Integer.parseInt(recordId);
        recordApplicationService.updateStatus(id, status);
        return ResponseEntity.ok("Success");
    }

}
