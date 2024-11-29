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
public interface ClassService {
    List<Map<String, Object>> dataRankChart(Integer classId);
    
    List<Map<String, Object>> getClassIDbyClassID(Integer classID);
    
    List<Map<String, Object>> findClassByClassId(Integer classId);
    
    List<Map<String, Object>> showAll();
    
    List<Map<String, Object>> showNameClass(Integer id);
    
}
