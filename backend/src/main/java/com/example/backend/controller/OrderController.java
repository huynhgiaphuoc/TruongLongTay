/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.controller;

import com.example.backend.model.Orders;
import com.example.backend.model.Uniform;
import com.example.backend.services.OrderService;
import com.example.backend.services.OrderdetailsService;
import java.math.BigDecimal;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author USER
 */
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderdetailsService orderdetailsService;

    @GetMapping("/getall")
    public List<Map<String, Object>> getAllOrder() {
        return orderService.findAll();
    }

    @PostMapping("/getorder")
    public List<Map<String, Object>> getOrderbyID(@RequestBody Map<String, String> ord) {
        Integer orderid = Integer.parseInt(ord.get("orderid"));
        return orderService.findOrderByID(orderid);

    }

    @PostMapping("/gerenuevue")
    public BigDecimal getreneuvue() {
        System.out.println("orderRevenue"+orderService.orderRevenue());
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
   @PostMapping("/countallorder")
    public int getcountorder() {
        return orderService.countOrders();
    }
    @PostMapping("/productcompare")
    public BigDecimal productcompare() {
        return orderdetailsService.calculatePercentChange();
    }
    @PostMapping("/getordercountchart")
    public List<Map<String, Object>> getordercountchart() {
        System.out.println("order nò "+orderService.getOrderCount());
        return orderService.getOrderCount();
    }
    @PostMapping("/getorderdetails")
    public List<Map<String, Object>> getorderdetails(@RequestBody Map<String, String> ord) {
        Integer orderid = Integer.parseInt(ord.get("orderid"));
        return orderdetailsService.findOrderdetailsbyOrderID(orderid);
    }

    @PostMapping("/update")
    public String updateOrder(@RequestBody Map<String, String> orders) {
        try {
            Integer orderid = Integer.parseInt(orders.get("orderid"));
            String status = orders.get("status");
            Orders order = orderService.findByOrderID(orderid);
            if (order != null) {
                orderService.updateOrders(orderid, status);
                return "Order updated successfully!";
            } else {
                return "Order not found!";
            }
        } catch (NumberFormatException e) {
            return "Invalid order ID format!";
        } catch (Exception e) {
            return "An error occurred while updating the order!";
        }
    }
    
}
