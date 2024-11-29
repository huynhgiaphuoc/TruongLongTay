/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Students;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 *
 * @author USER
 */
public interface StudentService {
    Students findByPhone(String phone);

    Students login(String phone, String password);

    Students findbyId(int id);

    Students findByStudent(Integer studentId);

    List<Map<String, Object>> findByStudentId(Integer studentId);

    List<Map<String, Object>> findPointById(Integer studentId);

    List<Map<String, Object>> findAllStudentByClassId(Integer classId);

    Integer sumStudentByTeacherId(Integer teacherId);

    Map<String, Object> findTop10(int teacherId, int page, int size);

    void updateTutoring(Integer studentId, Integer tutoringClassId);
    
    List<Map<String, Object>> getAllStudents();

    List<Map<String, Object>> findByMain(Integer classid);
    
    void addStudent(String rollno, String studentName, String email, String phone, String cccd, String gender, String status, String religion, String ethnicity, String moec, String place, String password, String dadName, String momname, String dadphone, String momphone, String jobdad, String jobmom, String temporaryAddress, String permanentAddress, String selectedProvince, String selectedDistrict, String selectedWard, Date birthday , int classid);

    int totalAllStudent();
    
    List<Map<String,Object>> studentID(Integer id);
    
    void editstudent(Integer id, String rollno, String studentName, String email, String phone, String cccd, String gender, String status, String religion, String ethnicity, String place, String password, String dadName, String momname, String dadphone, String momphone, String jobdad, String jobmom, String temporaryAddress, String permanentAddress, String selectedProvince, String selectedDistrict, String selectedWard, Date birthday);
    
    void deleteStudent(int id);
    
    Map<String , Object> AllStudents();
    
    List<Map<String,Object>> StudentTitle();
    
    List<Map<String,Object>> AllStudent();
    
    List<Map<String, Object>> ShowStudentponit();
}
