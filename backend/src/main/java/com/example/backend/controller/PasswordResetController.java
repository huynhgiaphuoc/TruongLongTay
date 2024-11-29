package com.example.backend.controller;

import com.example.backend.model.Students;
import com.example.backend.model.Teacher;
import com.example.backend.model.TeacherTeachingService;
import com.example.backend.services.TeacherService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Map;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/forgot")
public class PasswordResetController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TeacherService teacherService;
    
    @PostMapping("/forgot-password-teacher")
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String sql = "SELECT * FROM Teacher WHERE Email=?";
        try {
            System.out.println("do");
            Teacher teacher = jdbcTemplate.queryForObject(sql, new Object[]{email}, new BeanPropertyRowMapper<>(Teacher.class));
            if (teacher == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No teacher found with this email");
            } else {
                String resetCode = generateRandomCode();
                try {
                    sendResetCodeEmail(email, resetCode, teacher.getNameTeacher());
                    System.out.println("Reset code sent to email: " + email);
                } catch (MailException e) {
                    System.out.println("Failed to send email: " + e.getMessage());
                    System.out.println("Fail");
                }
                return ResponseEntity.ok(resetCode);
            }
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No student found with email: " + email);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
@PostMapping("/forgot-password-student")
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public ResponseEntity<String> forgotPasswordStudent(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String sql = "SELECT * FROM Students WHERE Email=?";
        try {
            System.out.println("do");
                Students student = jdbcTemplate.queryForObject(sql, new Object[]{email}, new BeanPropertyRowMapper<>(Students.class));
            if (student == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No teacher found with this email");
            } else {
                String resetCode = generateRandomCode();
                try {
                    sendResetCodeEmail(email, resetCode, student.getStudentName());
                    System.out.println("Reset code sent to email: " + email);
                } catch (MailException e) {
                    System.out.println("Failed to send email: " + e.getMessage());
                    System.out.println("Fail");
                }
                return ResponseEntity.ok(resetCode);
            }
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No student found with email: " + email);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error/ occurred");
        }
    }

    @PostMapping("/forgot-password-academic")
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public ResponseEntity<String> forgotPasswordAcademic(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String sql = "SELECT * FROM Teacher_Teaching_Service WHERE Email=?";
        try {
            System.out.println("do");
            TeacherTeachingService academic = jdbcTemplate.queryForObject(sql, new Object[]{email}, new BeanPropertyRowMapper<>(TeacherTeachingService.class));
            if (academic == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No teacher found with this email");
            } else {
                String resetCode = generateRandomCode();
                try {
                    Integer id = academic.getTeacherteachingserviceID();
                    Teacher teacher = teacherService.findById(id);
                    sendResetCodeEmail(email, resetCode, teacher.getNameTeacher());
                    System.out.println("Reset code sent to email: " + email);
                } catch (MailException e) {
                    System.out.println("Failed to send email: " + e.getMessage());
                    System.out.println("Fail");
                }
                return ResponseEntity.ok(resetCode);
}
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No student found with email: " + email);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
    private String generateRandomCode() {
        int code = 100000 + new Random().nextInt(900000);
        return Integer.toString(code);
    }

    private void sendResetCodeEmail(String email, String resetCode, String name) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        // Tạo nội dung HTML cho email
        String htmlMsg = getEmailContentWithCode(resetCode, name);

        helper.setText(htmlMsg, true);
        helper.setTo(email);
        helper.setSubject("Password Reset Code");
        helper.setFrom("your-email@gmail.com");
        mailSender.send(mimeMessage);
    }

    private String getEmailContentWithCode(String resetCode, String name) {
        return "<!DOCTYPE html>" +
           "<html lang=\"en\">" +
           "<head>" +
           "<meta charset=\"UTF-8\">" +
           "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">" +
           "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
           "<title>Password Reset</title>" +
           "<style>" +
           "body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }" +
           ".email-container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}" +
           ".email-header { text-align: center; background-color: #007BFF; padding: 20px; color: #ffffff; border-top-left-radius: 10px; border-top-right-radius: 10px; }" +
           ".email-body { padding: 20px; color: #333333; line-height: 1.6;}" +
           ".reset-code { font-size: 32px; color: #007BFF; font-weight: bold; text-align: center; margin: 20px 0; }" +
           ".reset-button { display: block; width: 100%; text-align: center; margin: 30px 0; }" +
           ".reset-button a { text-decoration: none; color: #ffffff; background-color: #007BFF; padding: 10px 20px; border-radius: 5px; font-size: 18px; }" +
           ".email-footer { text-align: center; color: #777777; font-size: 14px; margin-top: 20px; }" +
           "</style>" +
           "</head>" +
           "<body>" +
           "<div class=\"email-container\">" +
           "<div class=\"email-header\">" +
           "<h1>Password Reset Request</h1>" +
           "</div>" +
           "<div class=\"email-body\">" +
           "<h2>Hello, " + name +"</h2>" +
           "<p>You recently requested to reset your password. Use the verification code below to proceed:</p>" +
           "<div class=\"reset-code\">" + resetCode + "</div>" +
           "<p>If you didn’t request a password reset, please ignore this email or contact support if you have questions.</p>" +
           "<div class=\"reset-button\">" +
           "<a href=\"http://localhost:3000/vetify-teacher\" target=\"_blank\">Reset Password</a>" +
           "</div>" +
           "<p>Thanks,<br>Your Truong Long Tay Team</p>" +
           "</div>" +
           "<div class=\"email-footer\">" +
           "<p>&copy; 2024 Your Truong Long Tay. All rights reserved.</p>" +
           "</div>" +
           "</div>" +
           "</body>" +
           "</html>";
    }
}
