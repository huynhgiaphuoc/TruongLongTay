/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Message;
import com.example.backend.repository.MessageRepository;
import java.util.List;
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
public class MessageServiceImpl implements MessageService{
    
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Message findById(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(id));

        return mongoTemplate.findOne(query, Message.class);
    }
    
    @Override
    public List<Message> getImages(String chatRoomId, String orderType) {
        Query query = new Query();
        query.addCriteria(Criteria.where("chatRoom._id").is(chatRoomId));
        query.addCriteria(Criteria.where("type").is(orderType));
        return mongoTemplate.find(query, Message.class);
    }

    @Override
    public List<Message> getDocument(String chatRoomId, String orderType) {
        Query query = new Query();
        query.addCriteria(Criteria.where("chatRoom._id").is(chatRoomId));
        query.addCriteria(Criteria.where("type").is(orderType));
        return mongoTemplate.find(query, Message.class);
    }

    @Override
    public List<Message> getMessageSearch(String chatRoomId, String content) {
        Query query = new Query();
        query.addCriteria(Criteria.where("chatRoom._id").is(chatRoomId));
        query.addCriteria(Criteria.where("content").regex(content, "i"));
        return mongoTemplate.find(query, Message.class);
    }
}
