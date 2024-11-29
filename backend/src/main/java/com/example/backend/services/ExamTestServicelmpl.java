/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.ExamTest;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class ExamTestServicelmpl implements ExamTestService{
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> showAll() {
        String sql = "SELECT * FROM ExamTest";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public void createTest(String part, String img, String title) {
        String sql = "INSERT INTO ExamTest(examTestImage,examTestPath,Title) VALUES (?,?,?)";
        jdbcTemplate.update(sql,img,part,title);
    }

    @Override
    public void editTest(String part, String img, String title, int testId) {
        String sql = "UPDATE ExamTest SET examTestImage=?,examTestPath=?,Title=? WHERE examTestID=?";
        jdbcTemplate.update(sql,img,part,title,testId);
    }

    @Override
    public void deleteTest(int testId) {
        String sql = "DELETE FROM ExamTest WHERE examTestID=?";
        jdbcTemplate.update(sql,testId);
    }

    @Override
    public ExamTest showTest(Integer testId) {
        String sql = "SELECT * FROM ExamTest WHERE examTestID =?";
        return jdbcTemplate.queryForObject(sql, new Object[]{testId}, new BeanPropertyRowMapper<>(ExamTest.class));
    }
    
    
}
