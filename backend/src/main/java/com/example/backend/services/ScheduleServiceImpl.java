/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Schedule;
import com.example.backend.model.Class;

import com.example.backend.model.TeacherSubject;
import com.example.backend.repository.ClassRepository;
import com.example.backend.repository.ScheduleRepository;
import com.example.backend.repository.TeacherSubjectRepository;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private TeacherSubjectRepository teacherSubjectRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;

    @Override
    public List<Map<String, Object>> getAllSchedules() {
        String sql = "SELECT s.*, t.Name_Teacher, c.Class_Name "
                + "FROM Schedule s "
                + "JOIN Teacher_Subject ts ON s.Teacher_SubjectID = ts.Teacher_SubjectID "
                + "JOIN Teacher t ON ts.TeacherID = t.TeacherID "
                + "JOIN Class c ON s.ClassID = c.ClassID";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        return result;
    }

    @Override
    public List<Map<String, Object>> getScheduleByTeacherID(Integer TeacherID) {
        System.out.println("TeacherID: " + TeacherID);
        String sql = "SELECT * FROM Schedule WHERE Teacher_SubjectID = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, TeacherID);
        System.out.println("Hiển thị list: " + result);
        return result;
    }

    @Override
    public List<Map<String, Object>> getSchedulebyClassID(int classid) {
        String sql = "SELECT s.*, t.Name_Teacher "
               + "FROM Schedule s "
               + "JOIN Teacher_Subject ts ON s.Teacher_SubjectID = ts.Teacher_SubjectID "
               + "JOIN Teacher t ON ts.TeacherID = t.TeacherID "
               + "JOIN Students st ON st.ClassID = s.ClassID "
               + "WHERE st.StudentID = ?";

    List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, classid);
    return result;
    }

    @Override
    public int createSchedule(int teacherID, int classID, String session1, String session2, String session3, String session4, String session5, String session6, String session7, String session8, String session9, String session10, String selectedDay) {
        TeacherSubject teacher = teacherSubjectRepository.findByTeacherSubjectID(teacherID);
        Class classne = classRepository.findByClassID(classID);
        Schedule existingSchedule = scheduleRepository.findByClassIDAndDaysonweek(classne, selectedDay);
        if (existingSchedule != null
                && (session1.equals(existingSchedule.getSession1())
                || session2.equals(existingSchedule.getSession2())
                || session3.equals(existingSchedule.getSession3())
                || session4.equals(existingSchedule.getSession4())
                || session5.equals(existingSchedule.getSession5())
                || session6.equals(existingSchedule.getSession6())
                || session7.equals(existingSchedule.getSession7())
                || session8.equals(existingSchedule.getSession8())
                || session9.equals(existingSchedule.getSession9())
                || session10.equals(existingSchedule.getSession10()))) {

            throw new IllegalArgumentException("Schedule conflict: Class " + classID + " already has a session at the specified time and day.");
        }

        // Proceed to create a new schedule if no conflict
        Schedule schedule = new Schedule();
        schedule.setSession1(session1);
        schedule.setSession2(session2);
        schedule.setSession3(session3);
        schedule.setSession4(session4);
        schedule.setSession5(session5);
        schedule.setSession6(session6);
        schedule.setSession7(session7);
        schedule.setSession8(session8);
        schedule.setSession9(session9);
        schedule.setSession10(session10);
        schedule.setClassID(classne);
        schedule.setTeacherSubjectID(teacher);
        schedule.setDaysonweek(selectedDay);

        System.out.println("schedule: " + schedule);
        scheduleRepository.save(schedule);
        return schedule.getScheduleID();
    }

    @Override
    public int editSchedule(int scheduleID, int teacherID, int classID, String session1, String session2, String session3, String session4, String session5, String session6, String session7, String session8, String session9, String session10) {
        Schedule schedule = scheduleRepository.findByScheduleID(scheduleID);
        Integer teacherSubjectID = teacherID;
        TeacherSubject teacher = teacherSubjectRepository.findByTeacherSubjectID(teacherSubjectID);
        Class classne = classRepository.findByClassID(classID);
        schedule.setSession1(session1);
        schedule.setSession2(session2);
        schedule.setSession3(session3);
        schedule.setSession4(session4);
        schedule.setSession5(session5);
        schedule.setSession6(session6);
        schedule.setSession7(session7);
        schedule.setSession8(session8);
        schedule.setSession9(session9);
        schedule.setSession10(session10);
        schedule.setTeacherSubjectID(teacher);
        schedule.setClassID(classne);
        scheduleRepository.save(schedule);
        return schedule.getScheduleID();
    }

    @Override
    public void deleteschedule(int scheduleID) {
        String deleteEventsSql = "DELETE FROM calendar_events WHERE schedule_id = ?";
        jdbcTemplate.update(deleteEventsSql, scheduleID);
        String sql = "Delete From Schedule where ScheduleID = ?";
        jdbcTemplate.update(sql, scheduleID);
    }

    @Override
    public Schedule getScheduleByID(int scheduleID) {
        return scheduleRepository.findByScheduleID(scheduleID);
    }

    @Override
    public List<Map<String, Object>> getall() {
        String sql = "Select * from Schedule";
        return jdbcTemplate.queryForList(sql);
    }
    
    @Override
    public Integer sumSession(Integer teacherId) {
        String sql = "SELECT SUM( "
                + "CASE WHEN Session1 <> '' THEN 1 ELSE 0 END + "
                + "CASE WHEN Session2 <> '' THEN 1 ELSE 0 END + "
                + "CASE WHEN Session3 <> '' THEN 1 ELSE 0 END + "
                + "CASE WHEN Session4 <> '' THEN 1 ELSE 0 END + "
                + "CASE WHEN Session5 <> '' THEN 1 ELSE 0 END + "
                + "CASE WHEN Session6 <> '' THEN 1 ELSE 0 END + "
                + "CASE WHEN Session7 <> '' THEN 1 ELSE 0 END + "
                + "CASE WHEN Session8 <> '' THEN 1 ELSE 0 END + "
                + "CASE WHEN Session9 <> '' THEN 1 ELSE 0 END + "
                + "CASE WHEN Session10 <> '' THEN 1 ELSE 0 END "
                + ") AS total_sessions "
                + "FROM Schedule "
                + "JOIN Teacher_Subject ON Schedule.Teacher_SubjectID = Teacher_Subject.Teacher_SubjectID "
                + "JOIN Teacher ON Teacher_Subject.TeacherID = Teacher.TeacherID "
                + "WHERE Teacher.TeacherID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{teacherId}, Integer.class);
    }

 
    @Override
    public Schedule findNextSession(Integer teacherId) {
        String sql = "SELECT TOP 1 "
                + "s.Daystart, "
                + "s.Daysonweek, "
                + "c.Class_Name, "
                + "s.session1, s.session2, s.session3, s.session4, s.session5, s.session6, s.session7, s.session8, s.session9, s.session10, "
                + "CASE "
                + "WHEN ? < '07:00:00' THEN 'Session1' "
                + "WHEN ? < '07:45:00' THEN 'Session2' "
                + "WHEN ? < '08:50:00' THEN 'Session3' "
                + "WHEN ? < '09:35:00' THEN 'Session4' "
                + "WHEN ? < '10:30:00' THEN 'Session5' "
                + "WHEN ? < '12:40:00' THEN 'Session6' "
                + "WHEN ? < '13:40:00' THEN 'Session7' "
                + "WHEN ? < '14:25:00' THEN 'Session8' "
                + "WHEN ? < '15:20:00' THEN 'Session9' "
                + "WHEN ? < '16:05:00' THEN 'Session10' "
                + "END AS NextSession, "
                + "s.ClassID, "
                + "s.Teacher_SubjectID "
                + "FROM Schedule s "
                + "JOIN Class c ON s.ClassID = c.ClassID "
                + "JOIN Teacher_Subject ts ON s.Teacher_SubjectID = ts.Teacher_SubjectID "
                + "JOIN Teacher t ON ts.TeacherID = t.TeacherID "
                + "WHERE s.Daystart <= ? "
                + "AND s.Daysonweek = ? "
                + "AND ( "
                + "(? < '07:00:00' AND s.Session1 <> '') "
                + "OR (? < '07:45:00' AND s.Session2 <> '') "
                + "OR (? < '08:50:00' AND s.Session3 <> '') "
                + "OR (? < '09:35:00' AND s.Session4 <> '') "
                + "OR (? < '10:30:00' AND s.Session5 <> '') "
                + "OR (? < '12:40:00' AND s.Session6 <> '') "
                + "OR (? < '13:40:00' AND s.Session7 <> '') "
                + "OR (? < '14:25:00' AND s.Session8 <> '') "
                + "OR (? < '15:20:00' AND s.Session9 <> '') "
                + "OR (? < '16:05:00' AND s.Session10 <> '') "
                + ") "
                + "AND t.TeacherID = ? "
                + "ORDER BY "
                + "CASE "
                + "WHEN ? < '07:00:00' THEN 'Session1' "
                + "WHEN ? < '07:45:00' THEN 'Session2' "
                + "WHEN ? < '08:50:00' THEN 'Session3' "
                + "WHEN ? < '09:35:00' THEN 'Session4' "
                + "WHEN ? < '10:30:00' THEN 'Session5' "
                + "WHEN ? < '12:40:00' THEN 'Session6' "
                + "WHEN ? < '13:40:00' THEN 'Session7' "
                + "WHEN ? < '14:25:00' THEN 'Session8' "
                + "WHEN ? < '15:20:00' THEN 'Session9' "
                + "WHEN ? < '16:05:00' THEN 'Session10' "
                + "END";

        LocalDate currentDate = LocalDate.now();
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDate = sdf.format(date);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(formattedDate, formatter);
        Date dated = java.sql.Date.valueOf(localDate);

        LocalTime currentTime = LocalTime.now();
        DateTimeFormatter formattered = DateTimeFormatter.ofPattern("HH:mm:ss");
        String formattedTime = currentTime.format(formattered);

        int dayOfWeekValue = currentDate.getDayOfWeek().getValue();
        int adjustedDayOfWeekValue = (dayOfWeekValue + 1);
        String adjustedDayOfWeekValueString = String.valueOf(adjustedDayOfWeekValue);
        Object[] params = new Object[]{
            formattedTime, formattedTime, formattedTime, formattedTime,
            formattedTime, formattedTime, formattedTime, formattedTime,
            formattedTime, formattedTime,
            localDate, adjustedDayOfWeekValueString,
            formattedTime, formattedTime, formattedTime, formattedTime,
            formattedTime, formattedTime, formattedTime, formattedTime,
            formattedTime, formattedTime, teacherId,
            formattedTime, formattedTime, formattedTime, formattedTime,
            formattedTime, formattedTime, formattedTime, formattedTime,
            formattedTime, formattedTime
        };

        List<Schedule> schedules = jdbcTemplate.query(sql, params, new BeanPropertyRowMapper<>(Schedule.class));

        if (schedules.isEmpty()) {
            return null;
        } else {
            return schedules.get(0);
        }
    }
}
