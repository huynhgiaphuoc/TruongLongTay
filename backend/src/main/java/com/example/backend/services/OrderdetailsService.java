/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */

public interface OrderdetailsService {

    List<Map<String, Object>> findOrderdetailsbyOrderID(int id);

    int sumAllQuantities();

    BigDecimal sumTotalQuantityForDay(Date day);

    BigDecimal calculatePercentChange();
    
        int totalPrice();
}