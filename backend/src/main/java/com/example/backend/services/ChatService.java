/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.ChatRoom;
import com.example.backend.model.Message;
import java.util.Date;
import java.util.List;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Admin
 */
public interface ChatService {
    ChatRoom createRoom(Integer adminId, Integer teacherId);
    
    ResponseEntity<ChatRoom> getRoom(Integer adminId, Integer teacherId);
    
    Message saveMessage(ChatRoom chatRoomId, Message message);
    
    List<Message> getMessages(String chatRoomId);
    
    ChatRoom findByChatRoomId(String chatRoomId);
    
    List<Message> findLastContent(List<Integer> teacherIds);
    
}
