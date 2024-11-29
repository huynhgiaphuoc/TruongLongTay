/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.ResultExam;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface ResultExamService {
    ResultExam showResult(Integer resultId);
    
    void delete(int resultId);
    
    List<Map<String, Object>> showAll();
    
    void create(String name, Date birthday, String reg, String gender, String phone, String math,String lit,String eng,String status);

    void edit(String name, Date birthday, String reg, String gender, String phone, String math,String lit,String eng,String status, int resultId);
}
