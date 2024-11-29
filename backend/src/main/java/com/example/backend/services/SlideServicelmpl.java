/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Slide;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author a
 */
@Service
public class SlideServicelmpl implements SlideService{

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public List<Map<String, Object>> showAll() {
        String sql = "SELECT * FROM Slide";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public void createSlide(String part, String img, String description, String title) {
        String sql = "INSERT INTO Slide(slideImage,SlidePath,Title,Descript) VALUES (?,?,?,?)";
        jdbcTemplate.update(sql,img,part,title,description);
    }
    @Override
    public void editSlide(String part, String img, String description, String title,int slideId) {
        String sql = "UPDATE Slide SET slideImage=?,SlidePath=?,Title=?,Descript=? WHERE slideId=?";
        jdbcTemplate.update(sql,img,part,title,description,slideId);
    }

    @Override
    public void deleteSlide(int slideId) {
        String sql = "DELETE FROM Slide WHERE slideID=?";
        jdbcTemplate.update(sql,slideId);
    }

    @Override
    public Slide showSlide(Integer slideId) {
        String sql = "SELECT * FROM Slide WHERE slideID =?";
        return jdbcTemplate.queryForObject(sql, new Object[]{slideId}, new BeanPropertyRowMapper<>(Slide.class));
    }

    
    
    

}
