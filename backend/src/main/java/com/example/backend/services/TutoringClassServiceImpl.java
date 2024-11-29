/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.TutoringClass;
import java.time.Year;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class TutoringClassServiceImpl implements TutoringClassService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String getCurrentYearRange() {
        int currentYear = Year.now().getValue();
        return currentYear + "-" + (currentYear + 1);
    }

    @Override
    public Map<String, Object> showTutoringByTeacherId(Integer teacherId, Integer page, Integer size) {
        int offset = page * size;
        String currentYearRange = getCurrentYearRange();
        String sql = "SELECT * FROM Tutoring_Class WHERE TeacherID = ? and school_year = ? ORDER BY Tutoring_ClassID OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql, teacherId, currentYearRange, offset, size);

        String countSql = "SELECT COUNT(*) FROM Tutoring_Class WHERE TeacherID = ? and school_year = ?";
        Integer totalRecords = jdbcTemplate.queryForObject(countSql, Integer.class, teacherId, currentYearRange);
        Map<String, Object> result = new HashMap<>();
        result.put("data", data);
        result.put("totalRecords", totalRecords);
        return result;
    }

    @Override
    public void createTutoring(String code, String name, Integer sic, Integer con, Integer suber, Integer teacher) {
        String currentYear = getCurrentYearRange();
        String sql = "INSERT INTO Tutoring_Class(Tutoring_Code,Class_Tutoring,Sic,school_year,SubjectsID,TeacherID,Con) VALUES (?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql, code, name, sic, currentYear, suber, teacher, con);
    }

    @Override
    public List<Map<String, Object>> findTutoring(String code) {
        String sql = "SELECT * FROM Tutoring_Class WHERE Tutoring_Code = ?";
        return jdbcTemplate.queryForList(sql, code);
    }

    @Override
    public void deleteTutoring(Integer tutoringId) {
        String sql = "DELETE FROM Tutoring_Class WHERE Tutoring_ClassID = ?";
        jdbcTemplate.update(sql, tutoringId);
    }

    @Override
    public List<Map<String, Object>> findByTutoringId(Integer tutoringId) {
        System.out.println("ben service implement ham finbyid" + tutoringId);
        String sql = "SELECT * FROM Tutoring_Class WHERE Tutoring_ClassID = ?";
        return jdbcTemplate.queryForList(sql, tutoringId);
    }

    @Override
    public void updateSic(Integer tutoringId,Integer con) {
        String sql = "UPDATE Tutoring_Class set Con = Con - ? WHERE Tutoring_ClassID = ?";
        jdbcTemplate.update(sql,con, tutoringId);
    }

    @Override
    public List<Map<String, Object>> showAllByTutoringClassId(Integer tutoringId) {
        String sql = "SELECT * "
                + "FROM Tutoring_Class "
                + "JOIN Students ON Students.Tutoring_ClassID = Tutoring_Class.Tutoring_ClassID "
                + "JOIN Class ON Class.ClassID = Students.ClassID "
                + "WHERE Tutoring_Class.Tutoring_ClassID = ?";
        return jdbcTemplate.queryForList(sql, tutoringId);
    }

    @Override
    public Map<String, Object> tutoringData(Integer tutoringId, int page, int size) {
        int offset = page * size;

        // Truy vấn SQL để lấy dữ liệu phân trang và tổng số bản ghi
        String sql = "SELECT * FROM Tutoring_Class "
                + "JOIN Students ON Students.Tutoring_ClassID = Tutoring_Class.Tutoring_ClassID "
                + "JOIN Class ON Class.ClassID = Students.ClassID "
                + "WHERE Tutoring_Class.Tutoring_ClassID = ? "
                + "ORDER BY Students.StudentId "
                + "OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";

        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql, tutoringId, offset,size);

        // Truy vấn SQL để lấy tổng số bản ghi
        String countSql = "SELECT COUNT(*) FROM Tutoring_Class "
                + "JOIN Students ON Students.Tutoring_ClassID = Tutoring_Class.Tutoring_ClassID "
                + "JOIN Class ON Class.ClassID = Students.ClassID "
                + "WHERE Tutoring_Class.Tutoring_ClassID = ? ";

        int totalRecords = jdbcTemplate.queryForObject(countSql, Integer.class,tutoringId);

        Map<String, Object> result = new HashMap<>();
        result.put("data", data);
        result.put("totalRecords", totalRecords);

        return result;
    }

    @Override
    public int findSic(Integer tutoringId) {
        String sql = "SELECT Con FROM Tutoring_Class WHERE Tutoring_ClassID = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class,tutoringId);
    }

    @Override
    public TutoringClass findCon(Integer tutoringId) {
        String sql = "SELECT * FROM Tutoring_Class WHERE Tutoring_ClassID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{tutoringId}, new BeanPropertyRowMapper<>(TutoringClass.class));
    }

    @Override
    public void updateConAfterDelStu(Integer tutoringId) {
        String sql = "UPDATE Tutoring_Class set Con=Con + 1 WHERE Tutoring_ClassID=?";
        jdbcTemplate.update(sql,tutoringId);
    }

}
