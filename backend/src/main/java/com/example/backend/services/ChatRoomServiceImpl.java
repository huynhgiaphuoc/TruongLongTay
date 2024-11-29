/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.ChatRoom;
import com.example.backend.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class ChatRoomServiceImpl implements ChatRoomService{
    @Autowired
    private ChatRoomRepository chatRoomRepository;
    
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public ChatRoom findByAdminIdAndTeacherId(Integer adminId, Integer teacherId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("adminId").is(adminId));
        query.addCriteria(Criteria.where("teacherId").is(teacherId));
        return mongoTemplate.findOne(query, ChatRoom.class);
        
    }
}
