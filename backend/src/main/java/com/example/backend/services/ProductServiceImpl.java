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
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Uniform> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Uniform findById(int id) {
        return productRepository.findById(id);
    }

    @Override
    public void createUniform(String name, String size, BigDecimal price, String path, String image, Integer quantity, Integer inventory) {
        Uniform uniform = new Uniform();
        uniform.setUniform(name);
        uniform.setSize(size);
        uniform.setPrice(price);
        uniform.setImagepath(path);
        uniform.setImageuniform(image);
        uniform.setQuantity(quantity);
        uniform.setInventory(inventory);
        productRepository.save(uniform);
    }

    @Override
    public void editUniform(Integer id, String name, String size, BigDecimal price, String path, String image, Integer quantity, Integer inventory) {
        Uniform uniform = productRepository.findById(id);
        uniform.setUniform(name);
        uniform.setSize(size);
        uniform.setPrice(price);
        uniform.setImagepath(path);
        uniform.setImageuniform(image);
        uniform.setQuantity(quantity);
        uniform.setInventory(inventory);
        productRepository.save(uniform);
    }

    @Override
    public void deleteUniform(Integer id) {
        String sql = "DELETE FROM Uniform WHERE UniformID = ?";
        jdbcTemplate.update(sql, id);
    }

}
