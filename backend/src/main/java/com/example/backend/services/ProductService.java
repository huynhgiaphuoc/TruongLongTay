/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Uniform;
import com.example.backend.repository.ProductRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */
public interface ProductService {

    List<Uniform> getAllProducts();

    Uniform findById(int id);

    void editUniform(Integer id, String name, String size, BigDecimal price, String path, String image, Integer quantity, Integer inventory);

    void createUniform(String name, String size, BigDecimal price, String path, String image, Integer quantity, Integer inventory);
  
    void deleteUniform(Integer id);
}
