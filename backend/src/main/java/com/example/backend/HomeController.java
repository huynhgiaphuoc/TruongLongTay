package com.example.backend;


import com.example.backend.repository.ProductRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @Autowired
    private JdbcTemplate jdbcTemplate;
 

    @RequestMapping("/hello")
    public String hello() {
        return "hello";
    }
  

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public int login(@RequestBody Map<String, String> request) {
        String studentCode = request.get("studentCode");
        String password = request.get("password");
        String sql = "SELECT * FROM Students WHERE rollNo = ? AND password = ?";
        String sql1 = "SELECT * FROM PublicOfficials WHERE codeOfficials = ? AND password = ?";
        String sql2 = "SELECT * FROM Admin WHERE username = ? AND password = ?";

        try {
            Map<String, Object> student = jdbcTemplate.queryForMap(sql, studentCode, password);
            if (student != null) {
                System.out.println("student ne");
                return 1;
            }
        } catch (EmptyResultDataAccessException e) {
        }

        try {
            Map<String, Object> teacher = jdbcTemplate.queryForMap(sql1, studentCode, password);
            if (teacher != null) {
                System.out.println("teacher ne");
                return 2;
            }
        } catch (EmptyResultDataAccessException e) {
        }

        try {
            Map<String, Object> admin = jdbcTemplate.queryForMap(sql2, studentCode, password);
            if (admin != null) {
                System.out.println("admin ne");
                return 3;
            }
        } catch (EmptyResultDataAccessException e) {
        }

        return 4; // No student or teacher found
    }
}
