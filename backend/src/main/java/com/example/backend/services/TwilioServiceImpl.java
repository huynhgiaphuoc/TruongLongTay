/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class TwilioServiceImpl{
    private final String accountSid;
    private final String authToken;
    private final String phoneNumber;

    @Autowired
    public TwilioServiceImpl(@Value("${twillo.account.sid}") String accountSid,
                             @Value("${twillo.auth.token}") String authToken,
                             @Value("${twillo.phone.number}") String phoneNumber) {
        this.accountSid = accountSid;
        this.authToken = authToken;
        this.phoneNumber = phoneNumber;
        
        Twilio.init(accountSid, authToken);
    }
    
    public void sendSms(String toPhoneNumber, String messageContent) {
        Message message = Message.creator(
                new PhoneNumber(toPhoneNumber),   // Số điện thoại người nhận
                new PhoneNumber("+12078439813"), // Số điện thoại Twilio
                messageContent)                   // Nội dung tin nhắn
            .create();

        System.out.println("SMS sent successfully: " + message.getSid());
    }

    public String getAccountSid() {
        return accountSid;
    }

    public String getAuthToken() {
        return authToken;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}
