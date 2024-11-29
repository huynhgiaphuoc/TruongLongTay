/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.MainTeacher;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface MainTeacherService {
    Map<String, Object> findByMain(Integer teacherId, String orderType, int page, int size);
    
    List<Map<String, Object>> findStudents(Integer teacherId);
    
    List<Map<String, Object>> rankStudentByTeacherId(Integer teacherId);
    
    MainTeacher findByTeacherId(Integer teacherId);
    
    List<Map<String,Object>> showAllMainTeacher();
    
    List<Map<String,Object>> showAllMainTeacher(String year);
    
    void create(String year, Integer classId, Integer teacherId);
    
    List<Map<String,Object>> getMainTeacher(Integer mainTeacherId);
    
    void update(Integer mainId, Integer teacherId);
    
    void delete(Integer mainId);
}
