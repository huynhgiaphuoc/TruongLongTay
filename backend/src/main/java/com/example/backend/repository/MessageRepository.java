/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.repository;

import com.example.backend.model.Message;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Admin
 */
public interface MessageRepository extends MongoRepository<Message, String>{
    List<Message> findByChatRoomId(String chatRoomId);
    
    List<Message> findByChatRoom_Id(String chatRoomId);
}
