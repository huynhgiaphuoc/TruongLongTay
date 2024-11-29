/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface OperationService {

    Map<String, Object> findPointByTeacherAndClass(Integer teacherId, Integer subjectId, Integer classId, int page, int pageSize);

    List<Map<String, Object>> findAllPointByTeacher(Integer teacherId, int page, int pageSize);

    List<Map<String, Object>> findClassByTeacherId(Integer teacherId);

    Map<String, Object> findStudentSmallAvg(Integer teacherId, int page, int pageSize);

    Map<String, Object> findPointByTeacherAndClassAll(Integer teacherId, Integer subjectId, Integer classId);

    List<Map<String, Object>> getClassIDbyTeacherSubjectID(int TeacherSubjectID);

    List<Map<String, Object>> getClassIDbyTeacherSubjectID1(int TeacherSubjectID);

    List<Map<String,Object>> getAllByClassId(Integer classId);
    
    List<Map<String, Object>> getAllOperation();
    List<Map<String, Object>> getTeacherBySubjectName(String subjectName);
    List<Map<String, Object>> Operationforteacher(int classid);
    
}
