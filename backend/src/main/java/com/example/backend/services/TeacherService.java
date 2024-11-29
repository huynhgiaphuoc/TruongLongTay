/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Teacher;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 *
 * @author Admin
 */
public interface TeacherService {

    Teacher login(String office, String password);

    Teacher findById(Integer teacherId);

    List<Integer> findTeacherId();

    void updatePassword(String email, String password);

    Teacher myInfoById(Integer teacherId);

    List<Map<String, Object>> myInforByTeacherId(Integer teacherId);

    List<Map<String, Object>> showAllTeacher();

    List<Map<String, Object>> showAdmin(Integer adminId);

    List<Map<String, Object>> showAdminByName(String name);

    Teacher findbyteacheridObject(int teacherid);

    Teacher findbynameteacherObject(String teacherid);
    
    List<Map<String,Object>> showAllTeacherAndEdu();
    
    List<Map<String,Object>> findByTeacherId(Integer teacherId);
    
    void create(Integer eduId, String name, String pass, String email, Date birthday, Integer nots, String nation, String off, String gender, String recruiter, String health, String phone, String recruitment, String contract, String position, String religion, String ethnicity, String cic, String province, String district, String commune, String address, String path);
    
    void edit(Integer teacherId, Integer eduId, String name, String pass, String email, Date birthday, Integer nots, String nation, String off, String gender, String recruiter, String health, String phone, String recruitment, String contract, String position, String religion, String ethnicity, String cic, String province, String district, String commune, String address, String path);

    void delete(Integer teacherId);
    
    List<Map<String, Object>> getTeachersWithoutClass(String year);
    
    List<Map<String, Object>> getClassWithoutTeacher(String year);
    
    int totalAllTeacher();
    
    List<Map<String, Object>> showNameLevelSalary();
}
