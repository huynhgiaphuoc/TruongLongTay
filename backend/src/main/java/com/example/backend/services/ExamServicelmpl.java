package com.example.backend.services;

import com.example.backend.model.Exam;
import java.sql.Time;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.time.LocalTime;
import java.util.Date;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

@Service
public class ExamServicelmpl implements ExamService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> getExamSubjectsID(Integer SubjectsID) {
        System.out.print("SubjectsID: " + SubjectsID);
        String sql = "SELECT * from Exam JOIN Class on Exam.ClassID = Class.ClassID JOIN Subjects on Subjects.SubjectsID = Exam.SubjectsID Where Exam.ClassID = ?";
        return jdbcTemplate.queryForList(sql, SubjectsID);
    }

    @Override
    public List<Map<String, Object>> examByClassID(int classId) {
        System.out.print("SubjectsID: " + classId);
        String sql = "SELECT * from Exam JOIN Class on Exam.ClassID = Class.ClassID JOIN Subjects on Subjects.SubjectsID = Exam.SubjectsID Where Exam.ClassID = ?";
        return jdbcTemplate.queryForList(sql, classId);
    }

    @Override
    public List<Map<String, Object>> examBySubjectsID(int subjectsId) {
        System.out.println("SubjectID:" + subjectsId);
        String sql = "SELECT Subjects.SubjectsID,Subjects.Subjects_Name FROM Exam "
                + "JOIN Subjects ON Exam.SubjectsID = Subjects.SubjectsID "
                + "JOIN Class ON Exam.ClassID = Class.ClassID "
                + "WHERE Exam.ClassID = ? "
                + "GROUP BY Subjects.SubjectsID,Subjects.Subjects_Name";
        return jdbcTemplate.queryForList(sql, subjectsId);
    }

    @Override
    public List<Map<String, Object>> searchExam(String Exam, Integer SubjectsID) {
        String sql = "SELECT * FROM Exam WHERE Exam LIKE  ?";
        String sql1 = "SELECT * FROM Exam JOIN Subjects ON Exam.ExamID = Subjects.ExamID WHERE Subjects_Name LIKE ? ";
        return jdbcTemplate.queryForList(sql, "%" + Exam + "%");
    }

    @Override
    public void deleteexam(int examId) {
        String sql = "DELETE FROM Exam WHERE ExamID=?";
        jdbcTemplate.update(sql, examId);
    }

    @Override
    public void createExam(Integer subjectsID, Integer classID, String exam, Date examDate, Time startTime, Time endTime, Time totalTime) {
        String sql = "INSERT INTO Exam(Exam,ExamDate,StartTime,EndTime,TotalTime,ClassID,SubjectsID) VALUES(?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql, exam, examDate, startTime, endTime, totalTime, classID, subjectsID);
    }

    @Override
    public void editExam(Integer subjectsID, Integer classID, String exam, Date examDate, Time startTime, Time endTime, Time totalTime, int examId) {
        String sql = "UPDATE Exam SET Exam=?,ExamDate=?,StartTime=?,EndTime=?,TotalTime=?,ClassID=?,SubjectsID=? WHERE examId=?";
        jdbcTemplate.update(sql, exam, examDate, startTime, endTime, totalTime, classID, subjectsID, examId);
    }

    @Override
    public long calculateTotalTime(int examId) {

        String sql = "SELECT StartTime, EndTime FROM Exam WHERE ExamID = ?";

        return jdbcTemplate.queryForObject(sql, new Object[]{examId}, (rs, rowNum) -> {
            Time startTime = rs.getTime("StartTime");
            Time endTime = rs.getTime("EndTime");
            LocalTime start = startTime.toLocalTime();
            LocalTime end = endTime.toLocalTime();
            Duration duration = Duration.between(start, end);
            return duration.toMinutes();
        });
    }

    @Override
    public long getTotalTime(int examId) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public List<Map<String, Object>> examByClassIdAndSubjectsId(Integer classId, Integer subjectsId) {
        String sql = "SELECT * FROM Exam "
                + "JOIN Subjects ON Exam.SubjectsID = Subjects.SubjectsID "
                + "JOIN Class ON Exam.ClassID = Class.ClassID "
                + "WHERE Exam.ClassID = ? AND Exam.SubjectsID = ?";
        return jdbcTemplate.queryForList(sql, classId, subjectsId);
    }

    @Override
    public Exam showExam(Integer examId) {
        String sql = "SELECT * FROM Exam WHERE ExamID=?";
        return jdbcTemplate.queryForObject(sql, new Object[]{examId}, new BeanPropertyRowMapper<>(Exam.class));
    }

    @Override
    public List<Map<String, Object>> examByClassId(Integer classId) {
        String sql = "SELECT Subjects.SubjectsID,Subjects.Subjects_Name FROM Exam "
                + "JOIN Subjects ON Exam.SubjectsID = Subjects.SubjectsID "
                + "JOIN Class ON Exam.ClassID = Class.ClassID "
                + "WHERE Exam.ClassID = ? "
                + "GROUP BY Subjects.SubjectsID,Subjects.Subjects_Name";
        return jdbcTemplate.queryForList(sql, classId);
    }

    @Override
    public Exam getExamByDateAndTime(Date days, Time start) {
        String sql = "SELECT * FROM Exam WHERE ExamDate = ? AND StartTime = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{days,start}, new BeanPropertyRowMapper<>(Exam.class));
    }

    @Override
    public List<Map<String, Object>> getAllExam(Date days, Time start, Integer classId) {
        String sql = "SELECT * FROM Exam WHERE ExamDate=? AND StartTime=? AND ClassId=?";
        return jdbcTemplate.queryForList(sql,days,start,classId);
    }
}
