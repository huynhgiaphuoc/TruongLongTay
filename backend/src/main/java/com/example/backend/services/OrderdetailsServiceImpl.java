package com.example.backend.services;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
/**
 *
 * @author Admin
 */
@Service
public class OrderdetailsServiceImpl implements OrderdetailsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> findOrderdetailsbyOrderID(int id) {
        String sql = "SELECT od.OrderDetailID, od.Quantity, od.Unit_Price, "
                + "u.Uniform, u.Image_Path, u.Price, u.Size, u.Image_Uniform "
                + "FROM Order_Details od "
                + "JOIN Uniform u ON od.UniformID = u.UniformID "
                + "WHERE od.OrderID = ?";
        return jdbcTemplate.queryForList(sql, id);
    }

    @Override
    public int sumAllQuantities() {
        String sql = "SELECT SUM(Quantity) FROM Order_Details";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public BigDecimal sumTotalQuantityForDay(Date day) {
        String sql = "SELECT COALESCE(SUM(o.Quantity), 0) FROM Order_Details o "
                + "JOIN Orders ord ON o.OrderID = ord.OrderID "
                + "WHERE CAST(ord.Order_Date AS DATE) = CAST(? AS DATE)";
        return jdbcTemplate.queryForObject(sql, new Object[]{day}, BigDecimal.class);
    }

    @Override
    public BigDecimal calculatePercentChange() {
        Date today = new Date();
        BigDecimal totalToday = sumTotalQuantityForDay(today);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(today);
        calendar.add(Calendar.DATE, -1);
        Date yesterday = calendar.getTime();
        BigDecimal totalYesterday = sumTotalQuantityForDay(yesterday);
        if (totalYesterday.compareTo(BigDecimal.ZERO) == 0) {
            return totalToday.compareTo(BigDecimal.ZERO) > 0 ? BigDecimal.valueOf(100) : BigDecimal.ZERO;
        }
        BigDecimal difference = totalToday.subtract(totalYesterday);
        BigDecimal percentChange = difference.divide(totalYesterday, 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
        return percentChange;
    }
    @Override
public int totalPrice() {
    String sql = "SELECT SUM(Unit_Price) FROM Order_Details";
    Integer total = jdbcTemplate.queryForObject(sql, Integer.class);
    return (total != null) ? total : 0; // Trả về 0 nếu không có giá trị
}
}
