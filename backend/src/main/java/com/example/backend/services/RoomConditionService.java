/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.RoomCondition;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface RoomConditionService {
    List<Map<String, Object>> findRoomNullByDate(Date date);
    
    List<Map<String, Object>> findRoomConditionById(Integer roomId);
    
    void createRoomCondition(Date date,String session1,String session2,String session3,String session4,String session5,String session6,String session7,String session8,String session9,String session10,String day,Integer roomId, Integer teacherId, String note);
    
    void deleteRoomCondition(Integer roomConditionId);
    
    RoomCondition findRoomConditionByConditionId(Integer roomConditionId);
    
    void updateRoomCondition(Integer roomConditionId, String note);
    
    int countRoomBorrowed(Integer teacherId);
    
    int allRoom();
}
