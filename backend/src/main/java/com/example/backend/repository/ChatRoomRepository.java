/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.repository;

import com.example.backend.model.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Admin
 */
public interface ChatRoomRepository extends MongoRepository<ChatRoom, String>{
    ChatRoom findByAdminIdAndTeacherId(Integer adminId, Integer teacherId);

    ChatRoom save(ChatRoom room);

    ChatRoom findById(Long chatRoomId);
    
    
}
