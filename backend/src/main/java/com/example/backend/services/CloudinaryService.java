/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.cloudinary.Cloudinary;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Admin
 */
@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dlj9sdjb6");
        config.put("api_key", "229883567796557");
        config.put("api_secret", "aYxoynnzhrssdRMYa-2d_taBlVU");
        cloudinary = new Cloudinary(config);
    }

    public String uploadFile(MultipartFile file) throws IOException {
        Map<String, Object> params = new HashMap<>();
        params.put("resource_type", "auto");
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),params);
        return uploadResult.get("url").toString();
    }
}
