/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.ChatRoom;

/**
 *
 * @author Admin
 */
public interface ChatRoomService {
    ChatRoom findByAdminIdAndTeacherId(Integer adminId, Integer teacherId);
}
