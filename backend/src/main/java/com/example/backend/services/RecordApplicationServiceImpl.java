/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class RecordApplicationServiceImpl implements RecordApplicationService{
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public Map<String, Object> showAllRecordByTeacherId(Integer teacherId, String st, String orderType, int page, int size) {
        int offset = page * size;
        String orderBy = (orderType == null || orderType.isEmpty()) ? "ASC" : orderType;
        String selectSql = "SELECT * FROM RecordApplication "
                + "JOIN Students ON RecordApplication.StudentID = Students.StudentID "
                + "JOIN Class ON Students.ClassID = Class.ClassID "
                + "WHERE RecordApplication.TeacherID=? AND RecordApplication.St=? "
                + "ORDER BY RecordApplication.DateMakeApplication " + orderBy
                + " OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(selectSql, teacherId, st, offset, size);
        String countSql = "SELECT COUNT(*) FROM RecordApplication JOIN Students ON RecordApplication.StudentID = Students.StudentID JOIN Class ON Students.ClassID = Class.ClassID WHERE RecordApplication.TeacherID=? AND RecordApplication.St=?";
        Integer totalRecords = jdbcTemplate.queryForObject(countSql,Integer.class, teacherId, st);
        
        Map<String, Object> result = new HashMap<>();
        result.put("data", data);
        result.put("totalRecords", totalRecords);

        return result;
    }

    @Override
    public void updateStatus(Integer recordId, String status) {
        String sql = "UPDATE RecordApplication SET St=? WHERE RecordApplicationID=?";
        jdbcTemplate.update(sql,status,recordId);
    }
    
    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT * FROM RecordApplication";
        return jdbcTemplate.queryForList(sql);
    }
    
}
