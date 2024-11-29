/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Students;
import com.example.backend.model.Teacher;
import com.example.backend.repository.TeacherRepository;
import java.util.Date;
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
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Teacher login(String office, String password) {
        return teacherRepository.findByOfficerAndPassword(office, password);
    }

    @Override
    public Teacher findById(Integer teacherId) {
        System.out.println("diiloz"+teacherId);
        String sql = "Select * from Teacher where TeacherID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{teacherId}, new BeanPropertyRowMapper<>(Teacher.class));
    }

    @Override
    public List<Integer> findTeacherId() {
        String sql = "SELECT TeacherID FROM Teacher";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getInt("teacherID"));
    }

    @Override
    public void updatePassword(String email, String password) {
        String sql = "UPDATE Teacher SET Password=? WHERE Email=?";
        jdbcTemplate.update(sql, password, email);
    }

    @Override
    public Teacher myInfoById(Integer teacherId) {
        String sql = "SELECT * FROM Teacher WHERE teacherID=?";
        return jdbcTemplate.queryForObject(sql, new Object[]{teacherId}, new BeanPropertyRowMapper<>(Teacher.class));
    }

    @Override
    public List<Map<String, Object>> myInforByTeacherId(Integer teacherId) {
        String sql = "SELECT * FROM Teacher JOIN Education_Of_Teacher ON Teacher.Education_Of_TeacherID = Education_Of_Teacher.Education_Of_TeacherID WHERE Teacher.TeacherID=?";
        return jdbcTemplate.queryForList(sql, teacherId);
    }

    @Override
    public List<Map<String, Object>> showAllTeacher() {
        String sql = "SELECT * FROM Teacher";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> showAdmin(Integer adminId) {
        String sql = "SELECT * FROM Teacher JOIN Teacher_Teaching_Service ON Teacher.teacherteachingserviceID = Teacher_Teaching_Service.teacherteachingserviceID WHERE Teacher_Teaching_Service.teacherteachingserviceID=?";
        return jdbcTemplate.queryForList(sql, adminId);
    }

    @Override
    public List<Map<String, Object>> showAdminByName(String name) {
        String sql = "SELECT * FROM Teacher WHERE Name_Teacher LIKE ? ";
        return jdbcTemplate.queryForList(sql, "%" + name + "%");
    }

    @Override
    public Teacher findbyteacheridObject(int teacherid) {
        String sql = "Select * From Teacher where TeacherID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{teacherid}, new BeanPropertyRowMapper<>(Teacher.class));
    }

    @Override
    public Teacher findbynameteacherObject(String teacherid) {
        String sql = "Select * From Teacher where Officer = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{teacherid}, new BeanPropertyRowMapper<>(Teacher.class));
    }

    @Override
    public List<Map<String, Object>> showAllTeacherAndEdu() {
        String sql = "SELECT * FROM Teacher JOIN Education_Of_Teacher ON Teacher.Education_Of_TeacherID = Education_Of_Teacher.Education_Of_TeacherID";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> findByTeacherId(Integer teacherId) {
        String sql = "SELECT * FROM Teacher JOIN Education_Of_Teacher ON Teacher.Education_Of_TeacherID = Education_Of_Teacher.Education_Of_TeacherID WHERE Teacher.TeacherID =?";
        return jdbcTemplate.queryForList(sql, teacherId);
    }

    @Override
    public void edit(Integer teacherId, Integer eduId, String name, String pass, String email, Date birthday, Integer nots, String nation, String off, String gender, String recruiter, String health, String phone, String recruitment, String contract, String position, String religion, String ethnicity, String cic, String province, String district, String commune, String address, String path) {
        String sql = "UPDATE Teacher SET "
                + "Name_Teacher=?,Password=?,Email=?,Birthday=?,Nots=?,Nation=?,Officer=?,Gender=?,Recruiter=?,Health_Insurance=?,Phone=?,Recruitment_Day=?,Contract_Form=?,Position=?,Religion=?,Ethnicity=?,Cic=?,Province=?,District=?,Commune=?,Address=?,Path_Avt=?,Education_Of_TeacherID=?"
                + "WHERE TeacherID=?";
        jdbcTemplate.update(sql, name, pass, email, birthday, nots, nation, off, gender, recruiter, health, phone, recruitment, contract, position, religion, ethnicity, cic, province, district, commune, address, path, eduId, teacherId);
    }

    @Override
    public void create(Integer eduId, String name, String pass, String email, Date birthday, Integer nots, String nation, String off, String gender, String recruiter, String health, String phone, String recruitment, String contract, String position, String religion, String ethnicity, String cic, String province, String district, String commune, String address, String path) {
        String sql = "INSERT INTO Teacher"
                + "(Name_Teacher,Password,Email,Birthday,Nots,Nation,Officer,Gender,Recruiter,Health_Insurance,Phone,Recruitment_Day,Contract_Form,Position,Religion,Ethnicity,Cic,Province,District,Commune,Address,Path_Avt,Education_Of_TeacherID) VALUES "
                + "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql, name, pass, email, birthday, nots, nation, off, gender, recruiter, health, phone, recruitment, contract, position, religion, ethnicity, cic, province, district, commune, address, path, eduId);
    }

    @Override
    public void delete(Integer teacherId) {
        String sql = "DELETE FROM Teacher WHERE TeacherID=?";
        jdbcTemplate.update(sql, teacherId);
    }

    @Override
    public List<Map<String, Object>> getTeachersWithoutClass(String year) {
        String sql = "SELECT * FROM Teacher "
                + "LEFT JOIN MainTeacher ON Teacher.TeacherID = MainTeacher.MainTeacherID "
                + "AND MainTeacher.yearteaching=? "
                + "WHERE MainTeacher.MainTeacherID IS NULL";
        return jdbcTemplate.queryForList(sql, year);
    }

    @Override
    public List<Map<String, Object>> getClassWithoutTeacher(String year) {
        String sql = "SELECT * FROM Class "
                + "LEFT JOIN MainTeacher ON Class.ClassID = MainTeacher.ClassID "
                + "AND MainTeacher.yearteaching=? "
                + "WHERE MainTeacher.MainTeacherID IS NULL";
        return jdbcTemplate.queryForList(sql, year);
    }

    @Override
    public int totalAllTeacher() {
        String sql = "SELECT COUNT(*)FROM Teacher";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
    
    @Override
    public List<Map<String, Object>> showNameLevelSalary() {
        String sql = "SELECT TOP 10 "
                + "    T.Name_Teacher, "
                + "    E.Level_Salary "
                + "FROM  "
                + "    Teacher T "
                + "INNER JOIN  "
                + "    Education_Of_Teacher E ON T.Education_Of_TeacherID = E.Education_Of_TeacherID "
                + "ORDER BY "
                + "    E.Level_Salary DESC ";
        return jdbcTemplate.queryForList(sql);
    }
}
