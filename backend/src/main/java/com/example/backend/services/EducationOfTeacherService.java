/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.EducationOfTeacher;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface EducationOfTeacherService {
    EducationOfTeacher findByEducationId(Integer eduId);
    
    List<Map<String,Object>> showAll();
    
    List<Map<String,Object>> showAllAndTeacher();
    
    void create(String spl, String unionDm, String deGree, String mainMajor, String osq, String techLevel, String eml, String seniority, String ptl, String salary, String salaryLevel, String salaryDay, String quota, String mml, String mfl, String jia, String sst, String other, String party);
    
    void update(Integer eduId,String spl, String unionDm, String deGree, String mainMajor, String osq, String techLevel, String eml, String seniority, String ptl, String salary, String salaryLevel, String salaryDay, String quota, String mml, String mfl, String jia, String sst, String other, String party);
    
    EducationOfTeacher findByEducation(Integer eduId);
    
    void delete(Integer eduId);
    
      List<Map<String, Object>> allsalary();
}
