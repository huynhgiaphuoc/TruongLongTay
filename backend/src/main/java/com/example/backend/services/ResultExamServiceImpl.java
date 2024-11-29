/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.ResultExam;
import java.util.Date;
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
public class ResultExamServiceImpl implements ResultExamService{
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public List<Map<String, Object>> showAll(){
        String sql = "SELECT * FROM ResultExam";
        return jdbcTemplate.queryForList(sql);
    }
    
    @Override
    public void create(String name, Date birthday, String reg, String gender, String phone, String math,String lit,String eng,String status){
        String sql = "INSERT INTO ResultExam(StudentName,Birthday,Registration,Gender,Phone,MarkMath,MarkLit,MarkEng,Status)VALUES(?,?,?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql,name,birthday,reg,gender,phone,math,lit,eng,status);
    }
    
    @Override
    public void edit(String name, Date birthday, String reg, String gender, String phone, String math,String lit,String eng,String status, int resultId){
        String sql = "UPDATE ResultExam SET StudentName=?,Birthday=?,Registration=?,Gender=?,Phone=?,MarkMath=?,MarkLit=?,MarkEng=?,Status=? WHERE ResultExamId=?";
        jdbcTemplate.update(sql,name,birthday,reg,gender,phone,math,lit,eng,status,resultId);
    }
    
    @Override
    public void delete(int resultId){
        String sql = "DELETE FROM ResultExam WHERE ResultExamId=?";
        jdbcTemplate.update(sql,resultId);
    }
    
    @Override
    public ResultExam showResult(Integer resultId){
        String sql = "SELECT * FROM ResultExam WHERE ResultExamId=?";
       return jdbcTemplate.queryForObject(sql, new Object[]{resultId}, new BeanPropertyRowMapper<>(ResultExam.class));
     
    }
}
