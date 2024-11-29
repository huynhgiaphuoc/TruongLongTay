/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.controller;

import com.example.backend.model.Uniform;
import com.example.backend.repository.ProductRepository;
import com.example.backend.services.ProductService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author USER
 */
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public List<Uniform> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,
            @RequestParam("path") String path) {
        try {
            String absolutePath = "D:/frontend/public/assets/images/resources/";
            File directory = new File(absolutePath);
            if (!directory.exists()) {
                directory.mkdirs(); // Tạo thư mục nếu chưa tồn tại
            }
            String filePath = absolutePath + file.getOriginalFilename();
            System.out.println("Saving file to: " + filePath);
            File dest = new File(filePath);
            file.transferTo(dest);
            return ResponseEntity.ok(filePath);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    @PostMapping("productbyid")
    public Uniform getProductchosen(@RequestBody Map<String, String> Data) {
        Integer id = Integer.parseInt(Data.get("id"));
        return productService.findById(id);

    }

    @PostMapping("/add")
    public void createUniform(@RequestBody Map<String, String> Data) {
        String name = Data.get("name");
        String size = Data.get("size");
        BigDecimal price = new BigDecimal(Data.get("price"));
        String path = Data.get("path");
        String image = Data.get("image");
        String quantitys = Data.get("quantity");
        String inventorys = Data.get("inventory");
        Integer quantity = Integer.parseInt(quantitys);
        Integer inventory = Integer.parseInt(inventorys);

        System.out.println("name" + name);
        System.out.println("name" + name);
        System.out.println("size" + size);
        System.out.println("price" + price);
        System.out.println("path" + path);
        System.out.println("image" + image);
        productService.createUniform(name, size, price, path, image, quantity, inventory);
    }

    @PostMapping("/edit")
    public void editUniform(@RequestBody Map<String, String> data) {
        Integer id = Integer.parseInt(data.get("id"));
        System.out.println("diloz" + id);
        String name = data.get("name");
        String size = data.get("size");
        BigDecimal price = new BigDecimal(data.get("price"));
        Integer quantity = Integer.parseInt(data.get("quantity"));
        Integer inventory = Integer.parseInt(data.get("inventory"));
        String path = data.get("path");
        String image = data.get("image");
        productService.editUniform(id, name, size, price, path, image, quantity, inventory);
    }

    @PostMapping("/delete")
    public void deleteUniform(@RequestBody Map<String, String> Data) {
        String idno = Data.get("id");
        Integer id = Integer.parseInt(idno);
        productService.deleteUniform(id);
    }

}
