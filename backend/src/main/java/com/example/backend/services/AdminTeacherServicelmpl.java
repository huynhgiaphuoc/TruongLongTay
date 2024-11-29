/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

@Service
public class AdminTeacherServicelmpl implements AdminTeacherService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> showAll() {
        String sql = "SELECT * FROM Teacher JOIN Education_Of_Teacher ON Teacher.Education_Of_TeacherID = Education_Of_Teacher.Education_Of_TeacherID";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> teacherByteachingID(int teachingId) {
        String sql = "SELECT * from Teacher JOIN Teacher_Teaching_Service on Teacher.teacherteachingserviceID = Teacher_Teaching_Service.teacherteachingserviceID  Where Teacher.teacherteachingserviceID = ?";
        return jdbcTemplate.queryForList(sql, teachingId);
    }

    @Override
    public void createTeacher(String email, Date birthday, String nots, String nation, String off, String gender, String name, String recruiter, String health, String phone, Date recruiiment,
            String contract, String pass, String position, String religion, String ethnicity, String cic, String province, String district, String commune, String address, String avatar, String path, Integer teachingID,
            String spl, String uniondm, String degree, String main, String osq, String technology, String eml, String seniority, String ptl, String salary, String level,
            String saladay, String quota, String mml, String mfl, String jia, String sst, String other, String party) {
        // Create the SQL query for inserting into Education_Of_Teacher
        String sqledu = "INSERT INTO Education_Of_Teacher (Spl, Uniondm, Degree, Main_Major, Osq, Technology_Level, Eml, Seniority_Allowance, Ptl, Salary_Coefficient, Level_Salary, "
                + "Salary_Days, Quota, Mml, Mfl, Jia, Sst, Other_Majors, Party) "
                + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        // Create the SQL query for inserting into Teacher
        String sql = "INSERT INTO Teacher (Email, Birthday, Nots, Nation, Officer, Gender, Name_Teacher, Recruiter, Health_Insurance, Phone, Recruitment_Day, "
                + "Contract_Form, Password, Position, Religion, Ethnicity, Cic, Province, District, Commune, Address, Avatar, Path_Avt, teacherteachingserviceID, Education_Of_TeacherID) "
                + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        // Use GeneratedKeyHolder to retrieve the ID after insertion into Education_Of_Teacher
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sqledu, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, spl);
            ps.setString(2, uniondm);
            ps.setString(3, degree);
            ps.setString(4, main);
            ps.setString(5, osq);
            ps.setString(6, technology);
            ps.setString(7, eml);
            ps.setString(8, seniority);
            ps.setString(9, ptl);
            ps.setString(10, salary);
            ps.setString(11, level);
            ps.setString(12, saladay);
            ps.setString(13, quota);
            ps.setString(14, mml);
            ps.setString(15, mfl);
            ps.setString(16, jia);
            ps.setString(17, sst);
            ps.setString(18, other);
            ps.setString(19, party);
            return ps;
        }, keyHolder);

        // Get the generated ID for Education_Of_Teacher
        Integer educationID = keyHolder.getKey().intValue();

        // Insert into Teacher, using the generated educationID
        jdbcTemplate.update(sql, email, birthday, nots, nation, off, gender, name, recruiter, health, phone, recruiiment, contract, pass, position, religion, ethnicity, cic, province, district, commune, address, avatar, path, teachingID, educationID);
    }

    @Override
    public void editTeacher(Integer adminteacherid, String email, Date birthday, String nots, String nation, String off, String gender, String name, String recruiter, String health, String phone, Date recruiiment,
            String contract, String pass, String position, String religion, String ethnicity, String cic, String province, String district, String commune, String address, String avatar, String path, Integer teachingID, Integer educationID,
            Integer educationid, String spl, String uniondm, String degree, String main, String osq, String technology, String eml, String seniority, String ptl, String salary, String level,
            String saladay, String quota, String mml, String mfl, String jia, String sst, String other, String party) {

        String sqledu = "UPDATE Education_Of_Teacher SET  Uniondm=?, Degree=?, Main_Major=?, Osq=?, Technology_Level=?, Eml=?, Seniority_Allowance=?, Ptl=?, Salary_Coefficient=?, Level_Salary=?, "
                + "Salary_Days=?, Quota=?, Mml=?, Mfl=?, Jia=?, Sst=?, Other_Majors=?, Party=? WHERE Education_Of_TeacherID=?";

        jdbcTemplate.update(sqledu, spl, uniondm, degree, main, osq, technology, eml, seniority, ptl, salary, level, saladay, quota, mml, mfl, jia, sst, other, party, educationid);

        String sql = "UPDATE Teacher SET Email=?, Birthday=?, Nots=?, Nation=?, Officer=?, Gender=?, Name_Teacher=?, Recruiter=?, Health_Insurance=?, Phone=?, Recruitment_Day=?, "
                + "Contract_Form=?, Password=?, Position=?, Religion=?, Ethnicity=?, Cic=?, Province=?, District=?, Commune=?, Address=?, Path_Avt=?, teacherteachingserviceID=?, Education_Of_TeacherID=?  WHERE  TeacherID=?";

        jdbcTemplate.update(sql, email, birthday, nots, nation, off, gender, name, recruiter, health, phone, recruiiment, contract, pass, position, religion, ethnicity, cic, province, district, commune, address, avatar, path, teachingID, educationID, adminteacherid);
    }

    @Override
    public List<Map<String, Object>> searchTeacher(String Teacher) {
        String sql = "SELECT * FROM Teacher WHERE Teacher LIKE  ?";
        return jdbcTemplate.queryForList(sql, "%" + Teacher + "%");
    }

    @Override
    public void deleteTeacher(int teacherId, int educationId) {
        String sqledu = "DELETE FROM Education_Of_Teacher WHERE Education_Of_TeacherID=?";
        jdbcTemplate.update(sqledu, educationId);
        String sql = "DELETE FROM Teacher WHERE TeacherID=?";
        jdbcTemplate.update(sql, teacherId);
    }

    @Override
    public List<Map<String, Object>> showAllAdmin() {
        String sql = "SELECT * FROM Teacher_Teaching_Service";
        return jdbcTemplate.queryForList(sql);
    }
}
