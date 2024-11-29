/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Slide;
import java.util.List;
import java.util.Map;

/**
 *
 * @author a
 */
public interface SlideService {
    List<Map<String, Object>> showAll();
    void createSlide(String part, String img, String description, String title);
    void editSlide(String part, String img, String description, String title,int slideId);
    void deleteSlide(int id);
    Slide showSlide(Integer slideId);
}
