/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.controller;

import com.example.backend.services.OrderService;
import com.example.backend.services.OrderdetailsService;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/accountancy")
public class AccountancyController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderdetailsService orderdetailsService;
    @PostMapping("/revenue")
    @CrossOrigin(origins = "http://localhost:3000/accountancy")
    public List<Map<String, Object>> showRevenue() {
        System.out.println("order " + orderService.getRevenue());
        return orderService.getRevenue();
    }

    @PostMapping("/countallorder")
    public int getcountorder() {
        return orderService.countOrders();
    }

    @PostMapping("/getordercountchart")
    public List<Map<String, Object>> getordercountchart() {
        System.out.println("order nò " + orderService.getOrderCount());
        return orderService.getOrderCount();
    }

    @PostMapping("/gerenuevue")
    public BigDecimal getreneuvue() {
        System.out.println("orderRevenue" + orderService.orderRevenue());
        return orderService.orderRevenue();
    }

    @PostMapping("/getreucompare")
    public BigDecimal reneuveucompare() {
        return orderService.getRevenueGrowth();
    }

    @PostMapping("/getordertoday")
    public int getordertoday() {
        return orderService.countOrdersToday();
    }

    @PostMapping("/getordercompare")
    public BigDecimal ordercomapre() {
        return orderService.calculateOrderGrowth();
    }

    @PostMapping("/getproductsaled")
    public int getproductsaled() {
        return orderdetailsService.sumAllQuantities();
    }

 
    @PostMapping("/productcompare")
    public BigDecimal productcompare() {
        return orderdetailsService.calculatePercentChange();
    }


    @PostMapping("/getorderdetails")
    public List<Map<String, Object>> getorderdetails(@RequestBody Map<String, String> ord) {
        Integer orderid = Integer.parseInt(ord.get("orderid"));
        return orderdetailsService.findOrderdetailsbyOrderID(orderid);
    }

}
