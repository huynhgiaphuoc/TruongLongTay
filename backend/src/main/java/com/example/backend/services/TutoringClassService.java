/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.TutoringClass;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface TutoringClassService {
    Map<String, Object> showTutoringByTeacherId(Integer teacherId, Integer page, Integer size);
    
    List<Map<String, Object>> findTutoring(String code);
    
    void createTutoring(String code, String name, Integer sic, Integer con, Integer suber, Integer teacher);
    
    void deleteTutoring(Integer tutoringId);
    
    List<Map<String, Object>> findByTutoringId(Integer tutoringId);
    
    void updateSic(Integer tutoringId,Integer con);
    
    List<Map<String, Object>> showAllByTutoringClassId(Integer tutoringId);
    
    Map<String, Object> tutoringData(Integer tutoringId, int page, int size);
    
    int findSic(Integer tutoringId);
    
    TutoringClass findCon(Integer tutoringId);
    
    void updateConAfterDelStu(Integer tutoringId);
}
