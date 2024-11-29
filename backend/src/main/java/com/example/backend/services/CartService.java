/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Cart;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */
public interface CartService {
  void addProductToCart(Integer studentId, Integer uniformId, Integer quantity);

    void updateCartQuantity(Integer studentID, Integer uniformId, Integer newQuantity);

    void deleteCartItem(Integer studentID, Integer uniformID);
    List<Map<String, Object>> findById(Integer studentId);
}