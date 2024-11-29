package com.example.backend.services;

import com.example.backend.model.Teacher;
import com.example.backend.model.TeacherTeachingService;
import com.example.backend.repository.TeacherTeachingServiceRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class TeacherTeachingServiceServiceImpl implements TeacherTeachingServiceService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private TeacherTeachingServiceRepository teacherRepository;

   @Override
    public TeacherTeachingService login(String phone, String password) {
        return teacherRepository.findByPhoneAndPassword(phone, password);
    }

    @Override
    public List<Map<String, Object>> showAllAdmin() {
        String sql = "SELECT * FROM Teacher_Teaching_Service";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public TeacherTeachingService findById(Integer adminId) {
        String sql = "SELECT * FROM Teacher_Teaching_Service WHERE teacherteachingserviceID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{adminId}, new BeanPropertyRowMapper<>(TeacherTeachingService.class));
    }
      @Override
    public TeacherTeachingService findbyphone(String phone) {
        String sql = "SELECT * FROM Teacher_Teaching_Service WHERE Phone = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{phone}, new BeanPropertyRowMapper<>(TeacherTeachingService.class));
    }
    
    @Override
    public List<Map<String, Object>> showAll() {
        String sql = "SELECT * FROM Teacher_Teaching_Service";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> showNameTeaching(Integer id) {
        String sql = "SELECT * FROM Teacher_Teaching_Service  WHERE teacherteachingserviceID=?";
        return jdbcTemplate.queryForList(sql,id);
    }
    
    @Override
    public TeacherTeachingServiceService myInfoById(Integer teacherId) {
        String sql = "SELECT * FROM Teacher_Teaching_Service WHERE teacherteachingserviceID=?";
        return jdbcTemplate.queryForObject(sql, new Object[]{teacherId}, new BeanPropertyRowMapper<>(TeacherTeachingServiceService.class));
    }
    
    @Override
    public TeacherTeachingService findbyteacheridObject(int teacherid) {
        String sql = "Select * From Teacher_Teaching_Service where teacherteachingserviceID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{teacherid}, new BeanPropertyRowMapper<>(TeacherTeachingService.class));
    }

    @Override
    public List<TeacherTeachingService> getAllTeachers() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
