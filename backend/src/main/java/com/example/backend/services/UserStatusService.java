/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.UserStatusMessage;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */

@Service
public class UserStatusService {

    private Map<Long, UserStatusMessage> userStatusMap = new HashMap<>();

    public void setUserOnline(Long userId, String username) {
        userStatusMap.put(userId, new UserStatusMessage(userId, username, true));
    }

    public void setUserOffline(Long userId) {
        UserStatusMessage userStatus = userStatusMap.get(userId);
        if (userStatus != null) {
            userStatus.setIsOnline(false);
        }
    }

    public boolean isUserOnline(Long userId) {
        UserStatusMessage userStatus = userStatusMap.get(userId);
        return userStatus != null && userStatus.isIsOnline();
    }

    public UserStatusMessage getUserStatus(Long userId) {
        return userStatusMap.get(userId);
    }
}
