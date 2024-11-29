/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Orders;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface OrderService {

    List<Map<String, Object>> findAll();

    void updateOrders(Integer orderid, String status);

    Orders findByOrderID(Integer orderid);

    void createOrder(Integer studentId, BigDecimal totalAmount);

    List<Map<String, Object>> findOrderByID(Integer orderid);

    List<Map<String, Object>> getRevenue();

    BigDecimal orderRevenue();

    BigDecimal getRevenueGrowth();

    int countOrders();

    int countOrdersToday();

    int countOrdersYesterday();

    BigDecimal calculateOrderGrowth();

    List<Map<String, Object>> getOrderCount();
}
