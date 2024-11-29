/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Exam;
import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author a
 */
public interface ExamService {

    long getTotalTime(int examId);
    
    List<Map<String, Object>> getExamSubjectsID(Integer SubjectsID);
    
    void createExam(Integer subjectsID, Integer classID,String exam,Date examDate,Time startTime,Time endTime,Time totalTime);
    
    void editExam(Integer subjectsID, Integer classID,String exam,Date examDate,Time startTime,Time endTime,Time totalTime, int examId);
    
    void deleteexam(int examId);
    
    Exam showExam(Integer examId);
    
    List<Map<String, Object>> searchExam(String Exam, Integer SubjectsID );
    
    List<Map<String, Object>> examByClassID(int classId);
    
    List<Map<String, Object>> examBySubjectsID(int subjectsId);
    
    long calculateTotalTime(int examId);
    
    List<Map<String,Object>> examByClassIdAndSubjectsId(Integer classId, Integer subjectsId);
    
    List<Map<String,Object>> examByClassId(Integer classId);
    
    Exam getExamByDateAndTime(Date days, Time start);
    
    List<Map<String,Object>> getAllExam(Date days, Time start, Integer classId);
}

