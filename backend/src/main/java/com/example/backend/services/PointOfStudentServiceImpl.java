/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.PointOfStudent;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Admin
 */
@Service
public class PointOfStudentServiceImpl implements PointOfStudentService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> showPointByStudentId(Integer studentId) {
        String sql = "SELECT * FROM PointOfStudent JOIN Students ON PointOfStudent.StudentID = Students.StudentID JOIN Subjects ON PointOfStudent.SubjectsID = Subjects.SubjectsID WHERE Students.StudentID = ?";
        List<Map<String, Object>> point = jdbcTemplate.queryForList(sql, studentId);
        return point;
    }

    @Override
    public List<Map<String, Object>> allPointById(Integer studentId) {
        String sql = "SELECT MouthTestpoint1,MouthTestpoint2,Test151point,Test152point,Test153point,Test154point,TestLessonpoint,TestLesson2point,TestLesson3point,TestLesson4point,Exam1,Exam2,Goalaverage,Goalaverage2,Allin FROM PointOfStudent WHERE StudentID = ?";
        List<Map<String, Object>> point = jdbcTemplate.queryForList(sql, studentId);
        return point;
    }

    @Override
    public void createPoint(Integer studenter, Integer suber, BigDecimal mount, BigDecimal mount2, BigDecimal test1, BigDecimal test2, BigDecimal test3, BigDecimal test4, BigDecimal testLes1, BigDecimal testLes2, BigDecimal testLes3, BigDecimal testLes4, BigDecimal ex, BigDecimal ex2, BigDecimal goa1, BigDecimal goa2, BigDecimal allin) {
        String sql = "INSERT INTO PointOfStudent(MouthTestpoint1,MouthTestpoint2,Test151point,Test152point,Test153point,Test154point,TestLessonpoint,TestLesson2point,TestLesson3point,TestLesson4point,Exam1,Exam2, Goalaverage,Goalaverage2,Allin,StudentID,SubjectsID) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql, mount, mount2, test1, test2, test3, test4, testLes1, testLes2, testLes3, testLes4, ex, ex2, goa1, goa2, allin, studenter, suber);
    }

    @Override
    public PointOfStudent findByPointId(Integer pointId) {
        String sql = "SELECT * FROM PointOfStudent WHERE PointOfStudentID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{pointId}, new BeanPropertyRowMapper<>(PointOfStudent.class));
    }

    @Override
    public void updatePoint(BigDecimal mount, BigDecimal mount2, BigDecimal test1, BigDecimal test2, BigDecimal test3, BigDecimal test4, BigDecimal testLes1, BigDecimal testLes2, BigDecimal testLes3, BigDecimal testLes4, BigDecimal ex, BigDecimal ex2, BigDecimal goa1, BigDecimal goa2, BigDecimal allin, Integer suber, Integer studenter, Integer point) {
        String sql = "UPDATE PointOfStudent set MouthTestpoint1=?,MouthTestpoint2=?,Test151point=?,Test152point=?,Test153point=?,Test154point=?,TestLessonpoint=?,TestLesson2point=?,TestLesson3point=?,TestLesson4point=?,Exam1=?,Exam2=?,Goalaverage=?,Goalaverage2=?,Allin=?,SubjectsID=?,StudentID=? WHERE PointOfStudentID = ?";
        jdbcTemplate.update(sql,mount,mount2,test1,test2,test3,test4,testLes1,testLes2,testLes3,testLes4,ex,ex2,goa1,goa2,allin,suber,studenter,point);
    }

    @Override
    public void deletePoint(Integer pointId) {
        String sql = "DELETE FROM PointOfStudent WHERE PointOfStudentID = ?";
        jdbcTemplate.update(sql, pointId);
    }

    @Override
    public List<PointOfStudent> findByStudentAndSubjectId(Integer studentId, Integer subjectId) {
        String sql = "SELECT * FROM PointOfStudent WHERE StudentID = ? AND SubjectsID = ?";
        return jdbcTemplate.query(sql, new Object[]{studentId, subjectId}, new BeanPropertyRowMapper<>(PointOfStudent.class));
    }
}
