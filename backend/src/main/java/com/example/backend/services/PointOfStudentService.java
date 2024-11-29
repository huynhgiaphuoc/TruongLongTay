/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.PointOfStudent;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface PointOfStudentService {
    List<Map<String, Object>> showPointByStudentId(Integer studentId);
    
    List<Map<String, Object>> allPointById(Integer studentId);
    
    void createPoint(Integer studenter, Integer suber, BigDecimal mount, BigDecimal mount2, BigDecimal test1, BigDecimal test2, BigDecimal test3, BigDecimal test4, BigDecimal testLes1, BigDecimal testLes2, BigDecimal testLes3, BigDecimal testLes4, BigDecimal ex, BigDecimal ex2, BigDecimal goa1, BigDecimal goa2, BigDecimal allin);
    
    PointOfStudent findByPointId(Integer pointId);
    
    void updatePoint(BigDecimal mount, BigDecimal mount2, BigDecimal test1, BigDecimal test2, BigDecimal test3, BigDecimal test4, BigDecimal testLes1, BigDecimal testLes2, BigDecimal testLes3, BigDecimal testLes4, BigDecimal ex, BigDecimal ex2, BigDecimal goa1, BigDecimal goa2, BigDecimal allin, Integer suber, Integer studenter, Integer point);
    
    void deletePoint(Integer pointId);
    
    List<PointOfStudent> findByStudentAndSubjectId(Integer studentId, Integer subjectId);
}
