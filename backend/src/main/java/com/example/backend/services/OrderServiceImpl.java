/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Cart;
import com.example.backend.model.OrderDetails;
import com.example.backend.model.Orders;
import com.example.backend.model.Students;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.OrderdetailsRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.StudentRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author Admin
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderdetailsRepository orderdetailsRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT"
                + "    o.OrderID,o.Order_Date,o.Total_Amount,o.Status,\n"
                + "    s.Student_Name AS StudentName,\n"
                + "    c.Class_Name \n"
                + "FROM Orders o\n"
                + "JOIN Students s ON o.StudentID = s.StudentID\n"
                + "JOIN Class c ON s.ClassID = c.ClassID;";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public BigDecimal orderRevenue() {
        String sql = "SELECT SUM(Total_Amount) FROM Orders WHERE CAST(Order_Date AS DATE) = CAST(GETDATE() AS DATE)";
        BigDecimal revenue = jdbcTemplate.queryForObject(sql, BigDecimal.class);
        return revenue != null ? revenue : BigDecimal.ZERO;
    }

    public BigDecimal getYesterdayRevenue() {
        String sql = "SELECT SUM(Total_Amount) FROM Orders WHERE CAST(Order_Date AS DATE) = CAST(DATEADD(DAY, -1, GETDATE()) AS DATE)";
        BigDecimal revenue = jdbcTemplate.queryForObject(sql, BigDecimal.class);
        return revenue != null ? revenue : BigDecimal.ZERO;
    }

    @Override
    public int countOrders() {
        String sql = "SELECT COUNT(*) FROM Orders";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public int countOrdersToday() {
        String sql = "SELECT COUNT(*) FROM Orders WHERE CAST(Order_Date AS DATE) = CAST(GETDATE() AS DATE)";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public int countOrdersYesterday() {
        String sql = "SELECT COUNT(*) FROM Orders WHERE CAST(Order_Date AS DATE) = CAST(DATEADD(DAY, -1, GETDATE()) AS DATE)";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public BigDecimal calculateOrderGrowth() {
        int todayCount = countOrdersToday();
        int yesterdayCount = countOrdersYesterday();

        if (yesterdayCount == 0) {
            return BigDecimal.valueOf(100);
        }

        BigDecimal growth = BigDecimal.valueOf((double) (todayCount - yesterdayCount) / yesterdayCount * 100);
        return growth;
    }

    @Override
    public BigDecimal getRevenueGrowth() {
        BigDecimal todayRevenue = orderRevenue();
        BigDecimal yesterdayRevenue = getYesterdayRevenue();

        if (yesterdayRevenue.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.valueOf(100);
        }

        BigDecimal growth = (todayRevenue.subtract(yesterdayRevenue))
                .divide(yesterdayRevenue, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));
        return growth;
    }

    @Override
    public List<Map<String, Object>> findOrderByID(Integer orderid) {
        String sql = "Select * from Orders where OrderID = ?";
        return jdbcTemplate.queryForList(sql, orderid);
    }

    @Transactional
    @Override
    public void createOrder(Integer studentId, BigDecimal totalAmount) {
        Students student = studentRepository.findByStudentID(studentId);
        if (student == null) {
            System.out.println("cook");
        } else {
            Orders newOrder = new Orders();
            newOrder.setOrderDate(new Date());
            newOrder.setTotalAmount(totalAmount);
            newOrder.setStatus("chưa xác nhận");
            newOrder.setStudentID(student);
            orderRepository.save(newOrder);

            List<Cart> cartItems = cartRepository.findByStudentID(student);
            for (Cart cartItem : cartItems) {
                OrderDetails orderDetails = new OrderDetails();
                orderDetails.setOrderID(newOrder);
                orderDetails.setUniformID(cartItem.getUniformID());
                orderDetails.setQuantity(cartItem.getQuantity());
                orderDetails.setUnitPrice(cartItem.getUniformID().getPrice());
                orderdetailsRepository.save(orderDetails);
            }
            cartRepository.deleteByStudentID(student);
        }

    }

    public ResponseEntity<?> handlePayment() {
        try {
            String partnerCode = "MOMOBKUN20180529";
            String accessKey = "klm05TvNBzhg7h7j";
            String secretKey = "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa";
            String orderInfo = "Thanh toán qua ATM";
            String amount = "10000";
            String orderId = partnerCode + System.currentTimeMillis();
            String requestId = orderId;
            String redirectUrl = "http://localhost:3000/cart";
            String ipnUrl = "http://localhost:3000/cart";
            String extraData = "{}";
            String requestType = "payWithATM";

            String rawSignature = "accessKey=" + accessKey
                    + "&amount=" + amount
                    + "&extraData=" + extraData
                    + "&ipnUrl=" + ipnUrl
                    + "&orderId=" + orderId
                    + "&orderInfo=" + orderInfo
                    + "&partnerCode=" + partnerCode
                    + "&redirectUrl=" + redirectUrl
                    + "&requestId=" + requestId
                    + "&requestType=" + requestType;
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(secretKey.getBytes(), "HmacSHA256");
            sha256_HMAC.init(secret_key);
            String signature = bytesToHex(sha256_HMAC.doFinal(rawSignature.getBytes()));
            System.out.println("partnerCode: " + partnerCode);
            System.out.println("accessKey: " + accessKey);
            System.out.println("secretKey: " + secretKey);
            System.out.println("orderInfo: " + orderInfo);
            System.out.println("amount: " + amount);
            System.out.println("orderId: " + orderId);
            System.out.println("requestId: " + requestId);
            System.out.println("redirectUrl: " + redirectUrl);
            System.out.println("ipnUrl: " + ipnUrl);
            System.out.println("extraData: " + extraData);
            System.out.println("requestType: " + requestType);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("partnerCode", partnerCode);
            requestBody.put("partnerName", "Test");
            requestBody.put("storeId", "MomoTestStore");
            requestBody.put("requestId", requestId);
            requestBody.put("amount", amount);
            requestBody.put("orderId", orderId);
            requestBody.put("orderInfo", orderInfo);
            requestBody.put("redirectUrl", redirectUrl);
            requestBody.put("ipnUrl", ipnUrl);
            requestBody.put("lang", "vi");
            requestBody.put("extraData", extraData);
            requestBody.put("requestType", requestType);
            requestBody.put("signature", signature);

            RestTemplate restTemplate = new RestTemplate();
            String momoApiUrl = "https://test-payment.momo.vn/v2/gateway/api/create";
            ResponseEntity<Map> response = restTemplate.postForEntity(momoApiUrl, requestBody, Map.class);

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("chinh con a nay gay loi " + e.toString());
        }
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    @Override
    public void updateOrders(Integer orderid, String status) {
        Orders order = orderRepository.findByOrderID(orderid);
        if (order != null) {
            order.setStatus(status);
            orderRepository.save(order);
        } else {
            System.out.println("không tìm thấy đơn hàng nào");
        }
    }

    @Override
    public Orders findByOrderID(Integer orderid) {
        Orders order = orderRepository.findByOrderID(orderid);
        return order;
    }

    @Override
    public List<Map<String, Object>> getRevenue() {
        String sql = "SELECT YEAR(Order_Date) AS Year, SUM(Total_Amount) AS TotalAmount "
                + "FROM Orders "
                + "WHERE [Status] = N'chờ xác nhận' "
                + "GROUP BY YEAR(Order_Date) "
                + "ORDER BY Year";
        System.out.println("ORDER BY Year" + jdbcTemplate.queryForList(sql));
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> getOrderCount() {
        String sql = "SELECT YEAR(Order_Date) AS Year, MONTH(Order_Date) AS Month, COUNT(*) AS TotalOrders FROM Orders WHERE [Status] = N'chờ xác nhận' GROUP BY YEAR(Order_Date), MONTH(Order_Date) ORDER BY Year, Month";
        return jdbcTemplate.queryForList(sql);
    }
}
