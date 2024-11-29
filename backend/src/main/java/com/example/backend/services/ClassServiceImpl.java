/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class ClassServiceImpl implements ClassService{

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public List<Map<String, Object>> dataRankChart(Integer classId) {
        String sql = "SELECT * FROM Class WHERE classID = ?";
        return jdbcTemplate.queryForList(sql, classId);
    }
    @Override
    public List<Map<String, Object>> getClassIDbyClassID(Integer classID) {
        String sql = "Select * From Class where ClassID = ?";
        System.out.println("classid" + classID);
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, classID);
        System.out.println("result from class" + result);
        return result;
    }

    @Override
    public List<Map<String, Object>> findClassByClassId(Integer classId) {
        String sql = "SELECT * FROM Class WHERE ClassID = ?";
        return jdbcTemplate.queryForList(sql, classId);
    }
    
    @Override
    public List<Map<String, Object>> showAll() {
        String sql = "SELECT * FROM Class";
        return jdbcTemplate.queryForList(sql);
    }
    
    @Override
    public List<Map<String, Object>> showNameClass(Integer id){
        String sql = "SELECT * FROM Class WHERE ClassID=?";
        return jdbcTemplate.queryForList(sql,id);
    }

}
