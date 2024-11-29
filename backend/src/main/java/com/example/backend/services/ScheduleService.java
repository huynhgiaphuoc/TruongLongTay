/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Schedule;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface ScheduleService {

    Integer sumSession(Integer teacherId);

    List<Map<String, Object>> getSchedulebyClassID(int classid);

    List<Map<String, Object>> getAllSchedules();


    List<Map<String, Object>> getScheduleByTeacherID(Integer TeacherID);

    Schedule findNextSession(Integer teacherId);

    List<Map<String, Object>> getall();

    Schedule getScheduleByID(int scheduleID);

    int createSchedule(int teacherID, int classID, String session1, String session2, String session3, String session4, String session5, String session6, String session7, String session8, String session9, String session10, String selectedDay);

    void deleteschedule(int scheduleID);

    int editSchedule(int scheduleID, int teacherID, int classID, String session1, String session2, String session3, String session4, String session5, String session6, String session7, String session8, String session9, String session10);
}
