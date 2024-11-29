/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class NotificationsServiceImpl implements NotificationsService{

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public List<Map<String, Object>> findMessage() {
        String sql = "SELECT * FROM Notifications";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public void create(String content, java.util.Date createdDate, Time createdTime) {
        String sql = "INSERT INTO Notifications(Content,Createddate,Createdtime) VALUES (?,?,?)";
        jdbcTemplate.update(sql, content, createdDate, createdTime);
    }
    
}
