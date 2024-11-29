/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import java.util.List;
import java.util.Map;
import java.util.Date;

public interface AdminTeacherService {

    List<Map<String, Object>> showAll();
    
    List<Map<String, Object>> teacherByteachingID(int teachingId);

    void createTeacher(String email, Date birthday, String nots, String nation, String off, String gender, String name, String recruiter, String health, String phone, Date recruiiment, String contract, String pass, String position, String religion, String ethnicity, String cic, String province, String district, String commune, String address, String avatar, String path, Integer teachingID,
                        String spl, String uniondm, String degree, String main, String osq, String technology, String eml, String seniority, String ptl, String salary, String level, String saladay, String quota, String mml, String mfl, String jia, String sst, String other, String party);
    
    void editTeacher(Integer adminteacherid,String email, Date birthday, String nots, String nation, String off, String gender, String name, String recruiter, String health, String phone, Date recruiiment,String contract, String pass, String position, String religion, String ethnicity, String cic, String province, String district, String commune, String address, String avatar, String path,Integer educationID, Integer teachingID,
                        Integer educationid,String spl, String uniondm, String degree, String main, String osq, String technology, String eml, String seniority, String ptl, String salary, String level,String saladay, String quota, String mml, String mfl, String jia, String sst, String other, String party);
    
    void deleteTeacher(int teacherId,int educationId);
    
    List<Map<String, Object>> searchTeacher(String Teacher);
    
    List<Map<String, Object>> showAllAdmin();
}
