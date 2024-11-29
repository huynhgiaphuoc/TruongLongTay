/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.controller;

import com.example.backend.model.Cart;
import com.example.backend.model.Feedback;
import com.example.backend.repository.FeedbackRepository;
import com.example.backend.services.CartService;
import com.example.backend.services.FeedbackService;
import com.example.backend.services.FeedbackServiceImpl;
import com.example.backend.services.RecordApplicationService;
import com.example.backend.services.RecordApplicationServiceImpl;
import com.example.backend.services.ScheduleService;
import com.example.backend.services.StudentService;
import java.sql.Date;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/student")
public class StudentController {
     @Autowired
    private CartService cartService;

    @Autowired
    private StudentService studentservice;
    
    @Autowired
    private ScheduleService scheduleService;
    
    @Autowired
    private RecordApplicationService recordApplicationService;
    
    
    @Autowired
    private FeedbackService feedbackService;

    
    @PostMapping("/schedule/scheduleforstudent")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Map<String, Object>> getscheduleofclass(@RequestBody Map<String, String> cartData) {
        String classofstudent = cartData.get("userid");
        System.out.println("classid" + classofstudent);
        Integer classid = Integer.parseInt(classofstudent);
        return scheduleService.getSchedulebyClassID(classid);
    }

    @PostMapping("/cart/add")
    @CrossOrigin(origins = "http://localhost:3000/resources_mdp")
    public String addToCart(@RequestBody Map<String, String> cartData) {
        String userIdStr = cartData.get("userID");
        String uniformIdStr = cartData.get("productid");
        String quantityStr = cartData.get("quantity");
        System.out.println("roi m co add ko thi bao1" + userIdStr + uniformIdStr + quantityStr);
        if (userIdStr == null || uniformIdStr == null || quantityStr == null) {
            System.out.println("roi m co add ko thi bao");
            return "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin!";
        }
        try {
            Integer studentId = Integer.parseInt(userIdStr);
            Integer uniformId = Integer.parseInt(uniformIdStr);
            Integer quantity = Integer.parseInt(quantityStr);
            System.out.println("roi m co add ko thi bao2");
            cartService.addProductToCart(studentId, uniformId, quantity);
            return "Thêm vào giỏ hàng thành công!";
        } catch (NumberFormatException e) {
            System.out.println("roi m co add ko thi bao3");
            return "Đã xảy ra lỗi khi chuyển đổi dữ liệu. Vui lòng nhập số hợp lệ!";
        }
    }

    @PostMapping("/cart/getcart")
    @CrossOrigin(origins = "http://localhost:3000/cart")
    public List<Map<String, Object>> getCartByStudent(@RequestBody Map<String, String> cartData) {
        String userIdStr = cartData.get("userID");
        System.out.println("userID" + userIdStr);
        Integer studentId = Integer.parseInt(userIdStr);
        System.out.println("??" + cartService.findById(studentId));
        return cartService.findById(studentId);
    }

    @PostMapping("/getstudent")
    @CrossOrigin(origins = "http://localhost:3000/cart")
    public List<Map<String, Object>> getStudents(@RequestBody Map<String, String> cartData) {
        String userIdStr = cartData.get("userID");
        System.out.println("userID" + userIdStr);
        Integer studentId = Integer.parseInt(userIdStr);
        return studentservice.findByStudentId(studentId);
    }

    @PostMapping("/cart/update")
    @CrossOrigin(origins = "http://localhost:3000/cart")
    public String updateCartQuantity(@RequestBody Map<String, String> cartData) {
        String userIdStr = cartData.get("userID");
        String uniformIdStr = cartData.get("productid");
        String quantityStr = cartData.get("quantity");
        try {
            Integer studentId = Integer.parseInt(userIdStr);
            Integer uniformId = Integer.parseInt(uniformIdStr);
            Integer newQuantity = Integer.parseInt(quantityStr);
            cartService.updateCartQuantity(studentId, uniformId, newQuantity);
            return "Cập nhật số lượng thành công!";
        } catch (NumberFormatException e) {
            return "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin!";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    @PostMapping("/cart/delete")
    @CrossOrigin(origins = "http://localhost:3000/cart")
    public String deleteCart(@RequestBody Map<String, String> cartData) {
        String userIdStr = cartData.get("userID");
        String uniformIdStr = cartData.get("productid");
        try {
            Integer studentId = Integer.parseInt(userIdStr);
            Integer uniformId = Integer.parseInt(uniformIdStr);
            cartService.deleteCartItem(studentId, uniformId);
            return "xoa roi do nhe!";
        } catch (NumberFormatException e) {
            return "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin!";
        }
    }
    
    @PostMapping("/getrecor")
    @CrossOrigin(origins = "http://localhost:3000/recordapplication")
    public List<Map<String, Object>> getRecordApplication() {
        return recordApplicationService.findAll();
    }
   

    @PostMapping("/getfeedback")
    @CrossOrigin(origins = "http://localhost:3000/feedback")
    public List<Map<String, Object>> getFeedbackById() {
        return feedbackService.findAll();
    }

    @PostMapping("/create")
    @CrossOrigin(origins = "http://localhost:3000/addfb")
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        try {
            Feedback createdFeedback = feedbackService.createFeedback(feedback);
            return ResponseEntity.ok(createdFeedback);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable int id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/update")
    @CrossOrigin(origins = "http://localhost:3000/feedback")
    public void updateFeedbackById(@RequestBody Map<String, String> data) throws ParseException {
        String content = data.get("content");
        String daymake = data.get("daymake");
        String email = data.get("email");
        String name = data.get("nameuser");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(daymake, formatter);
        Date date = Date.valueOf(localDate);
        Integer id = Integer.parseInt(data.get("id"));
        feedbackService.updateFeedback(id, content, date, email, name);
    }

    @PostMapping("/find")
    public Feedback find(@RequestBody Map<String, String> cre) {
        String feedbackId = cre.get("feedbackId");
        Integer id = Integer.parseInt(feedbackId);
        return feedbackService.findbyfbid(id);
    }

}
