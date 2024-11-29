/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.TeacherTeachingService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class TeacherSubjectsServiceImlp implements TeacherSubjectsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> getAllTeacher() {
        String sql = "Select * From Teacher_Subject";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> getteachersubjectID(List<Integer> teacherSubjectIDs) {
        String placeholders = teacherSubjectIDs.stream()
                .map(id -> "?")
                .collect(Collectors.joining(", "));

        String sql = "SELECT t.Name_Teacher FROM Teacher t "
                + "JOIN Teacher_Subject ts ON t.TeacherID = ts.TeacherID "
                + "WHERE ts.Teacher_SubjectID IN (" + placeholders + ")";

        return jdbcTemplate.queryForList(sql, teacherSubjectIDs.toArray());
    }

    @Override
    public List<Map<String, Object>> getTeacherByTeacherSubject(int teacherid) {
        System.out.println("teacherid" + teacherid);
        String sql = "Select * From Teacher_Subject where TeacherID = ?";
        System.out.println("result" + jdbcTemplate.queryForList(sql, teacherid));
        return jdbcTemplate.queryForList(sql, teacherid);
    }

    @Override
    public List<Map<String, Object>> gettAllSubjectAndTeacher() {
        String sql = "SELECT * FROM Teacher_Subject "
                + "JOIN Subjects ON Teacher_Subject.SubjectsID = Subjects.SubjectsID "
                + "JOIN Teacher ON Teacher_Subject.TeacherID = Teacher.TeacherID ";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public void delete(Integer teacherId) {
        // Xóa các bản ghi trong bảng Operation liên quan đến Teacher_Subject
        String sqlOperation = "DELETE FROM Operation WHERE Teacher_SubjectID IN (SELECT Teacher_SubjectID FROM Teacher_Subject WHERE TeacherID=?)";
        jdbcTemplate.update(sqlOperation, teacherId);

        // Xóa các bản ghi trong bảng Teacher_Subject liên quan đến Teacher
        String sqlDeleteTeacherSubject = "DELETE FROM Teacher_Subject WHERE TeacherID=?";
        jdbcTemplate.update(sqlDeleteTeacherSubject, teacherId);

        // Xóa các bản ghi trong bảng MainTeacher liên quan đến Teacher
        String sqlDeleteMainTeacher = "DELETE FROM MainTeacher WHERE TeacherID=?";
        jdbcTemplate.update(sqlDeleteMainTeacher, teacherId);

        // Cuối cùng, xóa bản ghi trong bảng Teacher
        String sqlDeleteTeacher = "DELETE FROM Teacher WHERE TeacherID=?";
        int rowsAffected = jdbcTemplate.update(sqlDeleteTeacher, teacherId);

        if (rowsAffected > 0) {
            System.out.println("Xóa thành công TeacherID: " + teacherId);
        } else {
            System.out.println("Không tìm thấy TeacherID để xóa.");
        }
    }
}
