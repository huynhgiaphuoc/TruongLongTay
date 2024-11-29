/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.controller;

import com.example.backend.model.ChatRoom;
import com.example.backend.model.EducationOfTeacher;
import com.example.backend.model.Message;
import com.example.backend.model.Notifications;
import com.example.backend.repository.ChatMessageRepository;
import com.example.backend.repository.MessageRepository;
import com.example.backend.services.ChatRoomService;
import com.example.backend.services.ChatService;
import com.example.backend.services.ChatServiceImpl;
import com.example.backend.services.EducationOfTeacherService;
import com.example.backend.services.MessageService;
import java.sql.Time;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/chat")
public class ChatController {
    
    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRoomService chatRoomService;
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private MessageService messageService;
    
    @Autowired
    private EducationOfTeacherService educationOfTeacherService;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Notifications sendNotification(@Payload Notifications notification) {
        notification.setCreateddate(Date.valueOf(LocalDate.now()));
        notification.setCreatedtime(Time.valueOf(LocalTime.now()));
        System.out.println("Sending notification: " + notification.getContent());
        return notification;
    }

    @PostMapping("/createRoomsChat")
    public ChatRoom createRoom(@RequestBody ChatRoom room) {
        System.out.println("Admin: " + room.getAdminId());
        System.out.println("Teacher: " + room.getTeacherId());
        return chatService.createRoom(room.getAdminId(), room.getTeacherId());
    }

    @PostMapping("/getRoomsChat")
    public ChatRoom getRoom(@RequestBody Map<String,String> cre) {
        String adminId = cre.get("adminId");
        Integer id = Integer.parseInt(adminId);
        String teacherId = cre.get("teacherId");
        Integer teaid = Integer.parseInt(teacherId);
        ChatRoom chatRoom = chatRoomService.findByAdminIdAndTeacherId(id, teaid);
        if (chatRoom != null) {
            return chatRoom;
        }else{
            return null;
        }
    }

    @MessageMapping("/sendMessage/")
    @SendTo("/chatAdminTeacher/messages/")
    public Message sendMessage(@RequestBody Message message) {
        return chatService.saveMessage(message.getChatRoom(), message);
    }

    @PostMapping("/getMessageChat")
    public List<Message> getMessages(@RequestBody Map<String,String> cre) {
        String chatRoomId = cre.get("roomId");
        return messageRepository.findByChatRoom_Id(chatRoomId);
    }
    
    @PostMapping("/getChatRoomByChatRoomId")
    public ChatRoom getChatRoomByChatRoomId(@RequestBody Map<String,String> cre){
        String chatRoomId = cre.get("chatRoomId");
        return chatService.findByChatRoomId(chatRoomId);
    }
    
    @PostMapping("/lastSentDate")
    public List<Message> getLastSentDate(@RequestBody List<Integer> teacherIds){
        return chatService.findLastContent(teacherIds);
    }
    
    @PostMapping("/updateIsSeen")
    public ResponseEntity<?> updateIsSeen(@RequestBody Map<String,String> cre){
        String id = cre.get("id");
        Message message = messageService.findById(id);
        if(message != null){
            message.setIsSeen(true);
            messageRepository.save(message);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/getEduById")
    public EducationOfTeacher getInfoByEduId(@RequestBody Map<String,String> cre){
        String eduId = cre.get("educationId");
        Integer id = Integer.parseInt(eduId);
        return educationOfTeacherService.findByEducationId(id);
    }
    
    @PostMapping("/getImagesFromRoom")
    public List<Message> getImages(@RequestBody Map<String,String> cre){
        String chatRoomId = cre.get("chatRoomId");
        String orderType = cre.get("type");
        return messageService.getImages(chatRoomId, orderType);
    }
    
    @PostMapping("/getDocumentFromRoom")
    public List<Message> getDocument(@RequestBody Map<String,String> cre){
        String chatRoomId = cre.get("chatRoomId");
        String orderType = cre.get("type");
        return messageService.getDocument(chatRoomId, orderType);
    }
    
    @PostMapping("/getMessageSearch")
    public List<Message> getMessageSearch(@RequestBody Map<String,String> cre){
        String chatRoomId = cre.get("chatRoomId");
        String content = cre.get("content");
        return messageService.getMessageSearch(chatRoomId, content);
    }
}
