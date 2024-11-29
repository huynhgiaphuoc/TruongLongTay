/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.ChatRoom;
import com.example.backend.model.Message;
import com.example.backend.repository.ChatRoomRepository;
import com.example.backend.repository.MessageRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatRoomService chatRoomService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public ChatRoom createRoom(Integer adminId, Integer teacherId) {
        ChatRoom room = new ChatRoom();
        room.setLastSentDate(new Date());
        room.setAdminId(adminId);
        room.setTeacherId(teacherId);
        room.setCreatedAt(new Date());
        room.setRoomId(null);
        return chatRoomRepository.save(room);
    }

    @Override
    public ResponseEntity<ChatRoom> getRoom(Integer adminId, Integer teacherId) {
        ChatRoom chatRoom = chatRoomService.findByAdminIdAndTeacherId(adminId, teacherId);
        if (chatRoom != null) {
            return ResponseEntity.ok(chatRoom);
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public Message saveMessage(ChatRoom chatRoomId, Message message) {
        message.setSentDate(new Date());
        message.setChatRoom(message.getChatRoom());
        return messageRepository.save(message);
    }

    @Override
    public List<Message> getMessages(String chatRoomId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("chatRoom._id").is(chatRoomId));
        return (List<Message>) mongoTemplate.findOne(query, Message.class);
    }

    @Override
    public ChatRoom findByChatRoomId(String chatRoomId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(chatRoomId));
        return mongoTemplate.findOne(query, ChatRoom.class);
    }

    @Override
    public List<Message> findLastContent(List<Integer> teacherIds) {
        Set<String> uniqueMessageIds = new HashSet<>();
        List<Message> messages = new ArrayList<>();

        for (Integer teacherId : teacherIds) {
            Query query = new Query();

            query.addCriteria(new Criteria().orOperator(
                    Criteria.where("senderId").is(teacherId),
                    Criteria.where("receiverIds").is(teacherId)
            ));

            query.with(Sort.by(Sort.Direction.DESC, "lastSentDate"));

            query.limit(1);

            Message latestMessage = mongoTemplate.findOne(query, Message.class);
            if (latestMessage != null) {

                if (uniqueMessageIds.add(latestMessage.getId())) {
                    messages.add(latestMessage);
                }
            }
        }
        return messages;
    }

}
