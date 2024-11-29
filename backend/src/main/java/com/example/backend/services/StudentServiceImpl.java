
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Students;
import com.example.backend.repository.StudentRepository;
import java.time.Year;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */
@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

     @Override
    public Students login(String phone, String password) {
        return studentRepository.findByPhoneAndPassword(phone, password);
    }

    @Override
    public Students findbyId(int id) {
        return studentRepository.findByStudentID(id);
    }
    @Override
    public List<Map<String, Object>> findByStudentId(Integer studentId) {
        String sql = "SELECT * FROM Students INNER JOIN Class ON Students.ClassId = Class.ClassId WHERE Students.StudentId = ?";
        List<Map<String, Object>> student = jdbcTemplate.queryForList(sql, studentId);
        return student;
    }

    @Override
    public Students findByStudent(Integer studentId) {
        String sql = "SELECT * FROM Students INNER JOIN Class ON Students.ClassId = Class.ClassId WHERE Students.StudentId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{studentId}, new BeanPropertyRowMapper<>(Students.class));
    }
      @Override
    public Students findByPhone(String phone) {
        String sql = "SELECT * FROM Students Where phone = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{phone}, new BeanPropertyRowMapper<>(Students.class));
    }

 

    @Override
    public List<Map<String, Object>> findPointById(Integer studentId) {
        String sql = "SELECT * FROM Students INNER JOIN PointOfStudent ON Students.StudentId = PointOfStudent.StudentId INNER JOIN Subjects ON PointOfStudent.SubjectsID = Subjects.SubjectsID INNER JOIN Class ON Students.ClassId = Class.ClassId WHERE Students.StudentId = ?";
        List<Map<String, Object>> student = jdbcTemplate.queryForList(sql, studentId);
        return student;
    }

    @Override
    public List<Map<String, Object>> findAllStudentByClassId(Integer classId) {
        String sql = "SELECT * FROM Students,Class WHERE Class.ClassId = Students.ClassId and Class.ClassId = ?";
        return jdbcTemplate.queryForList(sql, classId);
    }

    public String getCurrentYearRange() {
        int currentYear = Year.now().getValue();
        return currentYear + "-" + (currentYear + 1);
    }

    @Override
    public Integer sumStudentByTeacherId(Integer teacherId) {
        String currentYearRange = getCurrentYearRange();

        String sql = "SELECT COUNT(DISTINCT s.StudentID) AS NumberOfStudents "
                + "FROM Students s "
                + "JOIN Class c ON s.ClassID = c.ClassID "
                + "JOIN Schedule sch ON c.ClassID = sch.ClassID "
                + "JOIN Teacher_Subject ts ON sch.Teacher_SubjectID = ts.Teacher_SubjectID "
                + "JOIN MainTeacher main ON c.ClassID = main.ClassID "
                + "WHERE ts.TeacherID = ? and main.yearteaching = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{teacherId, currentYearRange}, Integer.class);
    }

    @Override
    public Map<String, Object> findTop10(int teacherId, int page, int size) {
        String currentYearRange = getCurrentYearRange();
        int offset = page * size;
        String sql = "WITH RankedStudents AS ("
                + "SELECT "
                + "Students.*, "
                + "ROW_NUMBER() OVER (ORDER BY Students.Averageofallsubjects DESC) AS RowNum "
                + "FROM "
                + "Students "
                + "JOIN Class ON Students.ClassID = Class.ClassID "
                + "JOIN MainTeacher ON Class.ClassID = MainTeacher.ClassID "
                + "JOIN Teacher ON MainTeacher.TeacherID = Teacher.TeacherID "
                + "WHERE "
                + "MainTeacher.TeacherID = ? "
                + "AND MainTeacher.yearteaching = ? "
                + ")"
                + "SELECT * "
                + "FROM RankedStudents "
                + "ORDER BY RowNum "
                + "OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql, teacherId, currentYearRange, offset, size);

        String countSql = "WITH RankedStudents AS ( "
                + "SELECT "
                + "ROW_NUMBER() OVER (ORDER BY Students.Averageofallsubjects DESC) AS RowNum "
                + "FROM "
                + "Students "
                + "JOIN Class ON Students.ClassID = Class.ClassID "
                + "JOIN MainTeacher ON Class.ClassID = MainTeacher.ClassID "
                + "JOIN Teacher ON MainTeacher.TeacherID = Teacher.TeacherID "
                + "WHERE "
                + "MainTeacher.TeacherID = ? "
                + "AND MainTeacher.yearteaching = ? "
                + ") "
                + "SELECT COUNT(*) "
                + "FROM RankedStudents "
                + "WHERE RowNum <= 10";
        int totalRecords = jdbcTemplate.queryForObject(countSql, new Object[]{teacherId, currentYearRange}, Integer.class);

        Map<String, Object> result = new HashMap<>();
        result.put("data", data);
        result.put("totalRecords", totalRecords);
        return result;
    }

    @Override
    public void updateTutoring(Integer studentId, Integer tutoringClassId) {
        String sql = "Update Students SET Tutoring_ClassID = ? WHERE StudentID = ?";
        jdbcTemplate.update(sql, tutoringClassId, studentId);
    }
    
    @Override
    public List<Map<String, Object>> getAllStudents() {
        String sql = "Select * from Students";
        return jdbcTemplate.queryForList(sql);
    }


    @Override
    public int totalAllStudent() {
        String sql = "SELECT COUNT(*)FROM Students";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public List<Map<String, Object>> studentID(Integer id) {
        String sql = "SELECT * FROM Students where StudentID = ?";
        return jdbcTemplate.queryForList(sql, id);
    }

    @Override
    public void editstudent(Integer id, String rollno, String studentName, String email, String phone, String cccd, String gender, String status, String religion, String ethnicity, String place, String password, String dadName, String momname, String dadphone, String momphone, String jobdad, String jobmom, String temporaryAddress, String permanentAddress, String selectedProvince, String selectedDistrict, String selectedWard, Date birthday) {
        String sql = "UPDATE Students set Rollno = ? , Student_Name = ? , Email = ? , Phone = ? , Cccd = ? , gender = ? , Student_Status = ? , Religion = ? , Ethnicity = ?  , Place = ? , Password = ? , Dad_Name = ? , Mom_Name = ? , Parent_Phone = ? , Parent_Phone2 = ? ,Jobdad = ?, Jobmom = ? , Temporary_Address = ? , Permanent_Address = ? , Province = ? , District = ? , Commune = ? , birthday = ? where StudentID = ? ";
        jdbcTemplate.update(sql, rollno, studentName, email, phone, cccd, gender, status, religion, ethnicity, place, password, dadName, momname, dadphone, momphone, jobdad, jobmom, temporaryAddress, permanentAddress, selectedProvince, selectedDistrict, selectedWard, birthday, id);

    }

    @Override
    public void deleteStudent(int id) {
        String sql = "DELETE FROM Students where StudentID = ? ";
        jdbcTemplate.update(sql, id);
    }

//    @Override
//    public void addStudent(String rollno, String studentName, String email, String phone, String cccd, String gender, String status, String religion, String ethnicity, String moec, String place, String password, String dadName, String momname, String dadphone, String momphone, String jobdad, String jobmom, String temporaryAddress, String permanentAddress, String selectedProvince, String selectedDistrict, String selectedWard, Date birthday) {
//     String sql = "INSERT INTO students (Rollno, Student_Name, Email, Phone, Cccd, Gender, Student_Status, Religion, Ethnicity, MOEC, Place, Password, Dad_Name, Mom_Name, Parent_Phone, Parent_Phone2, Jobdad, Jobmom, Temporary_Address, Permanent_Address, Province, District, Commune , Birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)";
//        jdbctemplate.update(sql, rollno, studentName, email, phone, cccd, gender, status, religion, ethnicity, moec, place, password, dadName, momname, dadphone, momphone, jobdad, jobmom, temporaryAddress, permanentAddress, selectedProvince, selectedDistrict, selectedWard, birthday);
//    }
    @Override
    public void addStudent(String rollno, String studentName, String email, String phone, String cccd, String gender, String status, String religion, String ethnicity, String moec, String place, String password, String dadName, String momname, String dadphone, String momphone, String jobdad, String jobmom, String temporaryAddress, String permanentAddress, String selectedProvince, String selectedDistrict, String selectedWard, Date birthday, int classid) {
        String sql = "INSERT INTO students (Rollno, Student_Name, Email, Phone, Cccd, Gender, Student_Status, Religion, Ethnicity, MOEC, Place, Password, Dad_Name, Mom_Name, Parent_Phone, Parent_Phone2, Jobdad, Jobmom, Temporary_Address, Permanent_Address, Province, District, Commune , Birthday , ClassID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?)";
        jdbcTemplate.update(sql, rollno, studentName, email, phone, cccd, gender, status, religion, ethnicity, moec, place, password, dadName, momname, dadphone, momphone, jobdad, jobmom, temporaryAddress, permanentAddress, selectedProvince, selectedDistrict, selectedWard, birthday, classid);

    }

    @Override
    public List<Map<String, Object>> findByMain(Integer classid) {
        String sql = "SELECT * FROM Students WHERE ClassID = ?";
        return jdbcTemplate.queryForList(sql, classid);
    }

    @Override
    public Map<String, Object> AllStudents() {
        String sql = "SELECT * FROM Students";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);

        // Lấy tổng số sinh viên
        String countsql = "SELECT COUNT(*) FROM Students";
        Integer totalStudents = jdbcTemplate.queryForObject(countsql, Integer.class);

        // Thêm tổng số sinh viên vào từng mục
        Map<String, Object> rs = new HashMap<>();
        rs.put("students", data);
        rs.put("totalStudentCount", totalStudents);

        return rs;
    }

    @Override
    public List<Map<String, Object>> StudentTitle() {
        String sql = "SELECT Student_Tittle, COUNT(*) AS Total "
                + "FROM Students "
                + "WHERE Student_Tittle IN ('K', 'TB', 'G', 'Y') "
                + "GROUP BY Student_Tittle ";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Map<String, Object> map = new HashMap<>();
            map.put("Student_Tittle", rs.getString("Student_Tittle"));
            map.put("Total", rs.getInt("Total"));
            return map;
        });
    }

    @Override
    public List<Map<String, Object>> AllStudent() {
        String sql = "SELECT * FROM Students";
        return jdbcTemplate.queryForList(sql);
    }
    
    @Override
    public List<Map<String, Object>> ShowStudentponit() {
        String sql = "SELECT TOP 10  "
                + "    Rollno,  "
                + "    Student_Name,  "
                + "    Averageofallsubjects, "
                + "	Student_Tittle,  "
                + "	Gender , "
                + "    Birthday "
                + "FROM  "
                + "    Students  "
                + "ORDER BY  "
                + "    Averageofallsubjects DESC ";
        return jdbcTemplate.queryForList(sql);
    }
}
