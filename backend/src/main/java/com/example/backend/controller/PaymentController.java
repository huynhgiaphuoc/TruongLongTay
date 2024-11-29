/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.controller;

/**
 *
 * @author Admin
 */
import com.example.backend.Config;
import com.example.backend.services.CartService;
import com.example.backend.services.OrderService;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TimeZone;
import org.aspectj.apache.bcel.classfile.annotation.NameValuePair;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author USER
 */
@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private CartService cartService;

    @PostMapping("/momo")
    public ResponseEntity<?> handlePayment(@RequestBody Map<String, String> data) {
        System.out.println("userid" + data.get("userID"));
        System.out.println("totalAmount" + data.get("totalAmount"));

        try {
            String student = data.get("userID");
            int studentId = Integer.parseInt(student);
            String getf = data.get("totalAmount");
            BigDecimal totalAmount = new BigDecimal(getf);
            System.out.println("total" + totalAmount);
            String partnerCode = "MOMOBKUN20180529";
            String accessKey = "klm05TvNBzhg7h7j";
            String secretKey = "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa";
            String orderInfo = "Thanh toán qua ATM";
            String orderId = partnerCode + System.currentTimeMillis();
            String requestId = orderId;
            String redirectUrl = "http://localhost:3000/cart";
            String ipnUrl = "http://localhost:3000/cart";
            String extraData = "{}";
            String requestType = "payWithATM";

            // Tạo chữ ký
            String rawSignature = "accessKey=" + accessKey
                    + "&amount=" + totalAmount
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

            // Tạo request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("partnerCode", partnerCode);
            requestBody.put("partnerName", "Test");
            requestBody.put("storeId", "MomoTestStore");
            requestBody.put("requestId", requestId);
            requestBody.put("amount", totalAmount);
            requestBody.put("orderId", orderId);
            requestBody.put("orderInfo", orderInfo);
            requestBody.put("redirectUrl", redirectUrl);
            requestBody.put("ipnUrl", ipnUrl);
            requestBody.put("lang", "vi");
            requestBody.put("extraData", extraData);
            requestBody.put("requestType", requestType);
            requestBody.put("signature", signature);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // Tạo HttpEntity với headers và body
            RestTemplate restTemplate = new RestTemplate();
            String momoApiUrl = "https://test-payment.momo.vn/v2/gateway/api/create";
            ResponseEntity<Map> response = restTemplate.postForEntity(momoApiUrl, entity, Map.class);
            System.out.println("response: " + response);

            System.out.println("response" + response);

            if (response != null && response.getStatusCode().is2xxSuccessful()) {
                Map<String, Object> responseBody = response.getBody();
                System.out.println("responseBody" + responseBody);
                if (responseBody != null && "0".equals(responseBody.get("resultCode").toString())) {
                    orderService.createOrder(studentId, totalAmount);
                    return ResponseEntity.ok(responseBody);
                } else {
                    return ResponseEntity.status(400).body("Thanh toán thất bại: " + responseBody.get("message"));
                }
            } else {
                return ResponseEntity.status(500).body("Lỗi khi kết nối với MoMo.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Đã xảy ra lỗi: " + e.toString());
        }
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
//    @PostMapping("/zalopay")
//    public ResponseEntity<?> handlePaymentz() {
//        try {
//            String appId = "2553";
//            String appUser = "user123";
//            String appTransId = new SimpleDateFormat("yyMMdd").format(new Date()) + "_" + System.currentTimeMillis();
//
//            String amount = "10000";
//            String embedData = "{}";
//            String item = "[]";
//            String appTime = String.valueOf(System.currentTimeMillis()); // Thêm giá trị cho appTime
//            String bankCode = "zalopayapp";
//            String description = "Payment for order " + appTransId;
//
//            // Tạo chuỗi data để ký HMAC
//            String data = appId + "|" + appTransId + "|" + appUser + "|" + amount + "|" + appTime + "|" + embedData + "|" + item;
//
//            String secretKey = "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL";
//            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
//            SecretKeySpec secret_key = new SecretKeySpec(secretKey.getBytes(), "HmacSHA256");
//            sha256_HMAC.init(secret_key);
//            String mac = bytesToHexz(sha256_HMAC.doFinal(data.getBytes()));
//
//            Map<String, Object> requestBody = new HashMap<>();
//            requestBody.put("app_id", appId);
//            requestBody.put("app_user", appUser);
//            requestBody.put("app_trans_id", appTransId);
//            requestBody.put("amount", amount);
//            requestBody.put("app_time", appTime); // Thêm appTime vào requestBody
//            requestBody.put("embed_data", embedData);
//            requestBody.put("item", item);
//            requestBody.put("bank_code", bankCode);
//            requestBody.put("description", description);
//            requestBody.put("mac", mac);
//
//            System.out.println("appId: " + appId + ", appUser: " + appUser + ", appTransId: " + appTransId
//                    + ", amount: " + amount + ", appTime: " + appTime + ", embedData: " + embedData
//                    + ", item: " + item + ", bankCode: " + bankCode + ", mac: " + mac);
//
//            RestTemplate restTemplate = new RestTemplate();
//            String zaloPayApiUrl = "https://openapi.zalopay.vn/v2/create";
//            ResponseEntity<Map> response = restTemplate.postForEntity(zaloPayApiUrl, requestBody, Map.class);
//            System.out.println("Response from ZaloPay: " + response.getBody());
//            return ResponseEntity.ok(response.getBody());
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Error occurred: " + e.toString());
//        }
//    }
//
//    private static String bytesToHexz(byte[] bytes) {
//        StringBuilder result = new StringBuilder();
//        for (byte b : bytes) {
//            result.append(String.format("%02x", b));
//        }
//        return result.toString();
//    }

    @PostMapping("/vnpay")
    public String getPay(@RequestBody Map<String, String> data) throws UnsupportedEncodingException {
        String student = data.get("userID");
        int studentId = Integer.parseInt(student);
        String getf = data.get("totalAmount");
        BigDecimal totalAmount = new BigDecimal(getf);

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = 10000 * 100;
        String bankCode = "NCB";

        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";

        String vnp_TmnCode = Config.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", Config.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;
        System.out.println("fdffg" + paymentUrl);
        Map<String, String> response = new HashMap<>();
        if (response != null) {
            orderService.createOrder(studentId, totalAmount);
            response.put("paymentUrl", paymentUrl);
            return paymentUrl;
        } else {
            System.out.println("400 cl");
            return null;
        }

    }
}
