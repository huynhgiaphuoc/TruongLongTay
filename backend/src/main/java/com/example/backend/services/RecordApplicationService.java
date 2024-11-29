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
public interface RecordApplicationService {

    Map<String, Object> showAllRecordByTeacherId(Integer teacherId, String st, String orderType, int page, int size);

    void updateStatus(Integer recordId, String status);

    List<Map<String, Object>> findAll();
}
