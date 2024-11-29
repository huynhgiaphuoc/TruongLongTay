/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */

@Service
public class CreateEventServiceImpl implements CreateEventService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<String> geteventbyeventid(String eventid){
          String sql = "SELECT event_id FROM calendar_events WHERE schedule_id = ?";
          return jdbcTemplate.queryForList(sql, new Object[]{eventid}, String.class);
    }
    
    @Override
    public void createEvent(String eventId, Integer classId, Integer Scheduleid, Integer teacherId, Integer weekNumber) {
        String sql = "INSERT INTO  calendar_events (event_id, class_id,schedule_id, teacher_id, week_number, create_at) "
                + "VALUES (?, ?, ?, ?, ?,?)";
        Time currentTime = new Time(new Date().getTime());
        jdbcTemplate.update(sql, eventId, classId, Scheduleid, teacherId, weekNumber, currentTime);
    }

    @Override
    public void editEvent(Integer classId, Integer teacherId, Integer scheduleId, Integer weekNumber, String eventId) {
        String sql = "UPDATE calendar_events SET  class_id = ?, teacher_id = ?, week_number = ?, create_at = ? WHERE event_id = ?";
        Time currentTime = new Time(new Date().getTime());
        jdbcTemplate.update(sql, classId, teacherId, weekNumber, currentTime,eventId);
    }

    @Override
    public void deleteEvent(String eventId) {
        String sql = "DELETE FROM calendar_events WHERE eventId = ?";
        jdbcTemplate.update(sql, eventId);
    }

}
