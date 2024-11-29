/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.model;

/**
 *
 * @author Admin
 */

public class UserStatusMessage {
    private Long userId;
    private String username;
    private boolean isOnline;

    public UserStatusMessage(Long userId, String username, boolean isOnline) {
        this.userId = userId;
        this.username = username;
        this.isOnline = isOnline;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isIsOnline() {
        return isOnline;
    }

    public void setIsOnline(boolean isOnline) {
        this.isOnline = isOnline;
    }
}

