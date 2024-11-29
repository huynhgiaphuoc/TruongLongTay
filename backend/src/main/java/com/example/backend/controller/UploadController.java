/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.controller;

import com.example.backend.services.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/upload")
public class UploadController {
    
    @Autowired
    private CloudinaryService cloudinaryService;
    
    @PostMapping("/pdf")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file){
        try {
            String url = cloudinaryService.uploadFile(file);
            System.out.println("Url: " + url);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi upload file: " + e.getMessage());
        }
    }
}
