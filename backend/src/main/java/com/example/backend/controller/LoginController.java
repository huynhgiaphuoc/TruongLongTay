/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.controller;

import com.example.backend.jwt.JwtTokenProvider;
import com.example.backend.model.Students;
import com.example.backend.model.Teacher;
import com.example.backend.model.TeacherTeachingService;
import com.example.backend.model.UserStatusMessage;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.services.StudentService;
import com.example.backend.services.TeacherService;
import com.example.backend.services.TeacherTeachingServiceService;
import com.example.backend.services.UserStatusService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author USER
 */
@RestController
@RequestMapping("/account")
public class LoginController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private StudentService studentService;

    @Autowired
    private UserStatusService userStatusService;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private TeacherTeachingServiceService teacherteachingServiceService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/logout")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        System.out.println("bearerToken" + bearerToken);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            if (tokenProvider.validateToken(token)) {
                String userId = tokenProvider.getUsernameFromJWT(token);
                System.out.println("useid" + userId);
                Teacher teacher = teacherService.findbynameteacherObject(userId);
                if (teacher != null) {
                    teacher.setAvatar("False");
                    messagingTemplate.convertAndSend("/topic/user-status", teacher);

                    SecurityContextHolder.clearContext();
                    return ResponseEntity.ok("Logout successful, user set to offline");
                }

            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token or user not found");
    }

    @PostMapping("/logoutstudent")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> logoutforstudent(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        System.out.println("bearerToken" + bearerToken);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            if (tokenProvider.validateToken(token)) {
                String userId = tokenProvider.getUsernameFromJWT(token);
                System.out.println("useid" + userId);
                Students student = studentService.findByPhone(userId);
                if (student != null) {
                    messagingTemplate.convertAndSend("/topic/user-status", student);
                    SecurityContextHolder.clearContext();
                    return ResponseEntity.ok("Logout successful, user set to offline");
                }
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token or user not found");
    }
      @PostMapping("/logoutadmin")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> logoutforadmin(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        System.out.println("bearerToken" + bearerToken);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            if (tokenProvider.validateToken(token)) {
                String userId = tokenProvider.getUsernameFromJWT(token);
                System.out.println("useid" + userId);
               TeacherTeachingService academic = teacherteachingServiceService.findbyphone(userId);
                if (academic != null) {
                    messagingTemplate.convertAndSend("/topic/user-status", academic);
                    SecurityContextHolder.clearContext();
                    return ResponseEntity.ok("Logout successful, user set to offline");
                }
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token or user not found");
    }

//    @PostMapping("/login")
//    @CrossOrigin(origins = "http://localhost:3000")
//    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
//        String username = credentials.get("studentCode");
//        String password = credentials.get("password");
//        System.out.println("username" + username);
//        System.out.println("username" + password);
//
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(username, password)
//        );
//        System.out.println("authentication" + authentication);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
//        String token = tokenProvider.generateToken(authentication);
//        System.out.println("token" + token);
//        String role = authentication.getAuthorities().iterator().next().getAuthority();
//        int status = switch (role) {
//            case "ROLESTUDENT" ->
//                1;
//            case "ROLETEACHER" ->
//                2;
//            case "ROLEADMIN" ->
//                3;
//            case "ROLEACCOUNTANCY" ->
//                4;
//            default ->
//                5;
//        };
//        Map<String, Object> response = new HashMap<>();
//        response.put("status", status);
//        System.out.println("status" + status);
//        System.out.println("userId" + userDetails.getId());
//        response.put("token", token);
//        response.put("userId", userDetails.getId());
//        return response;
//    }
    @PostMapping("/loginstudent")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> loginStudent(@RequestBody Map<String, String> studentdata) {
        String username = studentdata.get("username");
        String password = studentdata.get("password");
        System.out.println("Attempting login for: " + username);
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            System.out.println("authentication.getPrincipal()" + authentication.getPrincipal());

            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String token = tokenProvider.generateToken(authentication);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userDetails", userDetails);

            Long userId = (long) userDetails.getId();
            String usern = userDetails.getUsername();
            userStatusService.setUserOnline(userId, usern);
            String nameteacher = userDetails.getName();
            UserStatusMessage statusMessage = new UserStatusMessage(userId, nameteacher, true);
            System.out.println("statusMessage" + statusMessage);
            messagingTemplate.convertAndSend("/topic/user-status", statusMessage);

            String role = authentication.getAuthorities().iterator().next().getAuthority();
            System.out.println("User role: " + role);
            if (role.equals("ROLESTUDENT")) {
                response.put("status", role);
                response.put("userId", userDetails.getId());
                response.put("token", token);
                System.out.println("User ID: " + userDetails.getId());
                return ResponseEntity.ok(response);
            } else if (role.equals("ROLEADMIN") || role.equals("ROLETEACHER") || role.equals("ROLEACCOUNTANCY")) {
                response.put("status", "notrolestudent");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("failbyusernameandpassword");
            }
        } catch (BadCredentialsException e) {
            System.out.println("Invalid credentials for user: " + username);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            System.out.println("Authentication error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Authentication error");
        }
    }

    @PostMapping("/loginteacher")
    public ResponseEntity<?> loginTeacher(@RequestBody Map<String, String> studentdata) {
        String username = studentdata.get("studentCode");
        String password = studentdata.get("password");
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String token = tokenProvider.generateToken(authentication);
            System.out.println("userDetails" + userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userDetails", userDetails);

            int userId = userDetails.getId();
            Teacher teacher = teacherService.findbyteacheridObject(userId);
            teacher.setAvatar("True");
            messagingTemplate.convertAndSend("/topic/user-status", teacher);

            String role = authentication.getAuthorities().iterator().next().getAuthority();
            System.out.println("role" + role);
            if (role.equals("ROLETEACHER")) {
                response.put("status", role);
                response.put("teachername", userDetails.getName());
                response.put("userId", userDetails.getId());
                System.out.println("userId" + userDetails.getId());
                return ResponseEntity.ok(response);
            } else if (role.equals("ROLEACCOUNTANCY")) {
                response.put("status", role);
                response.put("userId", userDetails.getId());
                response.put("teachername", userDetails.getName());
                System.out.println("userId" + userDetails.getId());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.ofNullable("not have any teacher");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/loginacademic")
    public ResponseEntity<?> loginAcademic(@RequestBody Map<String, String> studentdata) {
        String username = studentdata.get("studentCode");
        String password = studentdata.get("password");
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String token = tokenProvider.generateToken(authentication);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userDetails", userDetails);
            String role = authentication.getAuthorities().iterator().next().getAuthority();

            Long userId = (long) userDetails.getId();
            String usern = userDetails.getUsername();
            userStatusService.setUserOnline(userId, usern);
            String nameteacher = userDetails.getName();
            UserStatusMessage statusMessage = new UserStatusMessage(userId, nameteacher, true);
            System.out.println("statusMessage" + statusMessage);
            messagingTemplate.convertAndSend("/topic/user-status", statusMessage);

            int userIds = userDetails.getId();
            TeacherTeachingService teacher = teacherteachingServiceService.findbyteacheridObject(userIds);
            teacher.setUsername("True");
            messagingTemplate.convertAndSend("/topic/user-status", teacher);

            System.out.println("role" + role);
            if (role.equals("ROLEADMIN")) {
                response.put("status", role);
                response.put("userId", userDetails.getId());
                response.put("teachername", userDetails.getName());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.ofNullable("not have any Admin");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

}
