/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Message;
import java.util.List;

/**
 *
 * @author Admin
 */
public interface MessageService {
    Message findById(String id);
    
    List<Message> getImages(String chatRoomId, String orderType);
    
    List<Message> getDocument(String chatRoomId, String orderType);
    
    List<Message> getMessageSearch(String chatRoomId, String content);
}
