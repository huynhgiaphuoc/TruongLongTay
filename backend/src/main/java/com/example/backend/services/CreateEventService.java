/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import java.util.List;

/**
 *
 * @author Admin
 */
public interface CreateEventService {

    void createEvent(String eventId, Integer classId, Integer Scheduleid, Integer teacherId, Integer weekNumber);

    void editEvent(Integer classId, Integer teacherId, Integer scheduleId, Integer weekNumber, String eventId);

    void deleteEvent(String eventId);

   List<String> geteventbyeventid(String eventid);
}
