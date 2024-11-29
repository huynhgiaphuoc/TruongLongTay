/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.ExamTest;
import com.example.backend.model.Slide;
import java.util.List;
import java.util.Map;

public interface ExamTestService {
    List<Map<String, Object>> showAll();
    void createTest(String part, String img, String title);
    void editTest(String part, String img, String title,int testId);
    void deleteTest(int id);
    ExamTest showTest(Integer testId);
}
