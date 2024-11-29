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
public interface ChatMessageRepository extends MongoRepository<Message, String>{

    public List<Message> findBySenderId(Integer id);

    public List<Message> findByReceiverIdsContains(String senderId);

    public List<Message> findMessagesBySenderIdAndReceiverIdsContains(Integer id,Integer ids);
    
}
