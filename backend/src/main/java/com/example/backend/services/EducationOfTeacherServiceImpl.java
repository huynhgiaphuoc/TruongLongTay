/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.EducationOfTeacher;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class EducationOfTeacherServiceImpl implements EducationOfTeacherService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public EducationOfTeacher findByEducationId(Integer eduId) {
        String sql = "SELECT * FROM Education_Of_Teacher WHERE Education_Of_TeacherID=?";
        return jdbcTemplate.queryForObject(sql, new Object[]{eduId}, new BeanPropertyRowMapper<>(EducationOfTeacher.class));
    }

    @Override
    public List<Map<String, Object>> showAll() {
        String sql = "SELECT * FROM Education_Of_Teacher";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public void create(String spl, String unionDm, String deGree, String mainMajor, String osq, String techLevel, String eml, String seniority, String ptl, String salary, String salaryLevel, String salaryDay, String quota, String mml, String mfl, String jia, String sst, String other, String party) {
        String sql = "INSERT INTO Education_Of_Teacher"
                + "(Spl,Uniondm,Degree,Main_Major,Osq,Technology_Level,Eml,Seniority_Allowance,Ptl,Salary_Coefficient,Level_Salary,Salary_Days,Quota,Mml,Mfl,Jia,Sst,Other_Majors,Party) VALUES "
                + "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql, spl, unionDm, deGree, mainMajor, osq, techLevel, eml, seniority, ptl, salary, salaryLevel, salaryDay, quota, mml, mfl, jia, sst, other, party);
    }

    @Override
    public void update(Integer eduId, String spl, String unionDm, String deGree, String mainMajor, String osq, String techLevel, String eml, String seniority, String ptl, String salary, String salaryLevel, String salaryDay, String quota, String mml, String mfl, String jia, String sst, String other, String party) {
        String sql = "UPDATE Education_Of_Teacher SET Spl=?,Uniondm=?,Degree=?,Main_Major=?,Osq=?,Technology_Level=?,Eml=?,Seniority_Allowance=?,Ptl=?,Salary_Coefficient=?,Level_Salary=?,Salary_Days=?,Quota=?,Mml=?,Mfl=?,Jia=?,Sst=?,Other_Majors=?,Party=? WHERE Education_Of_TeacherID=?";
        jdbcTemplate.update(sql, spl, unionDm, deGree, mainMajor, osq, techLevel, eml, seniority, ptl, salary, salaryLevel, salaryDay, quota, mml, mfl, jia, sst, other, party, eduId);
    }

    @Override
    public EducationOfTeacher findByEducation(Integer eduId) {
        String sql = "SELECT * FROM Education_Of_Teacher WHERE Education_Of_TeacherID=?";
        return jdbcTemplate.queryForObject(sql, new Object[]{eduId}, new BeanPropertyRowMapper<>(EducationOfTeacher.class));
    }

    @Override
    public List<Map<String, Object>> showAllAndTeacher() {
        String sql = "SELECT * FROM Education_Of_Teacher JOIN Teacher ON Teacher.Education_Of_TeacherID = Education_Of_Teacher.Education_Of_TeacherID";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public void delete(Integer eduId) {
        String sql = "DELETE FROM Education_Of_Teacher WHERE Education_Of_TeacherID=?";
        jdbcTemplate.update(sql, eduId);
    }

    @Override
    public List<Map<String, Object>> allsalary() {
        String sql = "SELECT Level_Salary, COUNT(*) AS CountOfLevelSalary "
                + "FROM Education_Of_Teacher "
                + "WHERE Level_Salary IN (N'Bậc 1', N'Bậc 2', N'Bậc 3', N'Bậc 4', N'Bậc 5', N'Bậc 6', N'Bậc 7', N'Bậc 8', N'Bậc 9', N'Bậc 10', N'Bậc 11', N'Bậc 12') "
                + "GROUP BY Level_Salary ";
        return jdbcTemplate.queryForList(sql);
    }

}
