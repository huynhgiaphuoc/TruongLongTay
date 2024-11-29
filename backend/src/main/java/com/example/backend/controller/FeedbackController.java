package com.example.backend.controller;

import com.example.backend.model.Feedback;
import com.example.backend.repository.FeedbackRepository;
import com.example.backend.services.FeedbackService;
import com.example.backend.services.FeedbackServiceImpl;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author HONGGAM
 */
@RestController
@RequestMapping("/students")
public class FeedbackController {

//    @Autowired
//    private FeedbackRepository feedbackRepository;
//
//    public FeedbackController(com.example.backend.services.FeedbackServiceImpl feedbackService) {
//        this.feedbackService = feedbackService;
//    }
//
//    @Autowired
//    private final FeedbackServiceImpl feedbackService;
//
//    @PostMapping("/getfeedback")
//    @CrossOrigin(origins = "http://localhost:3000/feedback")
//    public List<Map<String, Object>> getFeedbackById() {
//        return feedbackService.findAll();
//    }
//
//    @PostMapping("/create")
//    @CrossOrigin(origins = "http://localhost:3000/addfb")
//    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
//        try {
//            Feedback createdFeedback = feedbackService.createFeedback(feedback);
//            return ResponseEntity.ok(createdFeedback);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String> deleteFeedback(@PathVariable int id) {
//        feedbackService.deleteFeedback(id);
//        return ResponseEntity.noContent().build();
//    }
//
//    @PostMapping("/update")
//    @CrossOrigin(origins = "http://localhost:3000/feedback")
//    public void updateFeedbackById(@RequestBody Map<String, String> data) throws ParseException {
//        String content = data.get("content");
//        String daymake = data.get("daymake");
//        String email = data.get("email");
//        String name = data.get("nameuser");
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//        // Convert the String to LocalDate
//        LocalDate localDate = LocalDate.parse(daymake, formatter);
//
//        // Convert LocalDate to java.sql.Date (for database)
//        Date date = Date.valueOf(localDate);
//        Integer id = Integer.parseInt(data.get("id"));
//        feedbackService.updateFeedback(id, content, date, email, name);
//    }
//
//    @PostMapping("/find")
//    public Feedback find(@RequestBody Map<String, String> cre) {
//        String feedbackId = cre.get("feedbackId");
//        Integer id = Integer.parseInt(feedbackId);
//        return feedbackService.findbyfbid(id);
//    }

}
