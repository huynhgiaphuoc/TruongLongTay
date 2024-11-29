/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Cart;
import com.example.backend.model.Students;
import com.example.backend.model.Uniform;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.StudentRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author USER
 */
@Service
public class CartServiceImpl implements CartService {
@Autowired
    private CartRepository cartRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ProductRepository productRepository;
   @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void addProductToCart(Integer studentId, Integer uniformId, Integer quantity) {
        Students student = studentRepository.findByStudentID(studentId);
        Uniform uniform = productRepository.findById(uniformId);

        if (student != null && uniform != null) {
            Cart cartItem = cartRepository.findByStudentIDAndUniformID(student, uniform);
            if (cartItem != null) {
                cartItem.setQuantity(cartItem.getQuantity() + 1);
                cartRepository.save(cartItem);
            } else {
                Cart cartItem1 = new Cart();
                cartItem1.setStudentID(student);
                cartItem1.setUniformID(uniform);
                cartItem1.setQuantity(1);
                cartRepository.save(cartItem1);
            }

        } else {
            System.out.println("dell kim ra thi htoi");

        }
    }

    @Override
    public List<Map<String, Object>> findById(Integer studentId) {
        String sql = "Select * From Cart where StudentID = ?";
        return jdbcTemplate.queryForList(sql,studentId);
               
    }

    @Override
    public void updateCartQuantity(Integer studentID, Integer uniformId, Integer newQuantity) {
        Students student = studentRepository.findByStudentID(studentID);
        Uniform uniform = productRepository.findById(uniformId);
        System.out.println("dume m qua toi day ch" + student + uniform);

        if (student != null && uniform != null) {
            Cart cartItem = cartRepository.findByStudentIDAndUniformID(student, uniform);
            if (cartItem != null) {
                cartItem.setQuantity(newQuantity);
                cartRepository.save(cartItem);
            } else {
                System.out.println("Không tìm thấy sản phẩm trong giỏ hàng.");
            }
        } else {
            System.out.println("Student or Uniform not found.");
        }
    }

    @Override
    @Transactional
    public void deleteCartItem(Integer studentID, Integer uniformID) {
        Students student = studentRepository.findByStudentID(studentID);
        Uniform uniform = productRepository.findById(uniformID);
        System.out.println("dume m qua toi day ch" + student + uniform);
        cartRepository.deleteByStudentIDAndUniformID(student, uniform);
    }
}