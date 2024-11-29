/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Subjects;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface SubjectService {

    Subjects findBySubjectId(Integer subjectsId);

    List<Map<String, Object>> showAll();

    List<Map<String, Object>> showNameSubjects(Integer id);

    List<Map<String, Object>> findSubjectByClassId(Integer subjectsId);

    List<Map<String, Object>> getsubjectname(int teacherSubjectID);
    
    List<Map<String, Object>> getAllSubjectsGroups();

    void addSubject(String subjectsName);

    void addSubjectCombination(String subjects, String subjectCombinationCode, String studyTopics);

    List<Map<String, Object>> getAllSubject();

    List<Map<String, Object>> subjectsbyID(Integer id);

    void editSubject(String name, Integer id);
    
    List<Map<String, Object>> getAllCombination();
    
    List<Map<String, Object>> combinationID(Integer id);
    
    void editcombination(String subjects ,String subject_Combination_Code , String study_Topics , Integer id);
    
    void deleteSubject(int id);
    
    void deleteCombination(int id);
}
