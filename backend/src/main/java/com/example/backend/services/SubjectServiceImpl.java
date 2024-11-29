/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Subjects;
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
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Subjects findBySubjectId(Integer subjectsId) {
        String sql = "SELECT * FROM Subjects WHERE SubjectsID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{subjectsId}, new BeanPropertyRowMapper<>(Subjects.class));
    }

    @Override
    public List<Map<String, Object>> getsubjectname(int teacherSubjectID) {
        String sql = "SELECT s.Subjects_Name "
                + "FROM Subjects s "
                + "JOIN Teacher_Subject t ON s.SubjectsID = t.SubjectsID "
                + "WHERE t.Teacher_SubjectID = ?";
        System.out.println("TeacherSubjectID: " + teacherSubjectID);
        return jdbcTemplate.queryForList(sql, teacherSubjectID);
    }

    @Override
    public List<Map<String, Object>> showAll() {
        String sql = "SELECT * FROM Subjects";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> showNameSubjects(Integer id) {
        String sql = "SELECT * FROM Subjects WHERE SubjectsID=?";
        return jdbcTemplate.queryForList(sql, id);
    }

    @Override
    public List<Map<String, Object>> findSubjectByClassId(Integer subjectsId) {
        String sql = "SELECT Subjects.SubjectsID,Subjects.Subjects_Name FROM Subjects JOIN Exam ON Exam.SubjectsId = Subjects.SubjectsId JOIN Class On Exam.ClassId = Class.ClassId WHERE Class.ClassId = ? GROUP BY Subjects.Subjects_Name,Subjects.SubjectsID";
        return jdbcTemplate.queryForList(sql, subjectsId);
    }

    @Override
    public List<Map<String, Object>> getAllSubjectsGroups() {
        String sql = "SELECT \n"
                + "   \n"
                + " *\n"
                + "FROM \n"
                + "    SubjectsGroup sg\n"
                + "JOIN \n"
                + "    Subjects s ON sg.SubjectsId = s.SubjectsId\n"
                + "JOIN \n"
                + "    Subject_Combination sc ON sg.Subject_CombinationID = sc.Subject_CombinationID;";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public void addSubject(String subjectsName) {
        String sql = "INSERT INTO subjects(Subjects_Name) VALUES (?)";
        jdbcTemplate.update(sql, subjectsName);
    }

    @Override
    public void addSubjectCombination(String subjects, String subjectCombinationCode, String studyTopics) {
         String sql = "INSERT INTO Subject_Combination (Subjects , Subject_Combination_Code , Study_Topics) VALUES (? ,? ,?) ";
        jdbcTemplate.update(sql, subjects, subjectCombinationCode, studyTopics);
    }

    @Override
    public List<Map<String, Object>> getAllSubject() {
        String sql = " SELECT * FROM Subjects";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> subjectsbyID(Integer id) {
        String sql = " SELECT * FROM Subjects where SubjectsID = ?";
        return jdbcTemplate.queryForList(sql, id);
    }

    @Override
    public void editSubject(String name, Integer id) {
        String sql = "Update Subjects set Subjects_Name=? where SubjectsID = ?";
         jdbcTemplate.update(sql, name, id);
    }

    @Override
    public List<Map<String, Object>> getAllCombination() {
        String sql = "SELECT * FROM Subject_Combination";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> combinationID(Integer id) {
         String sql = " SELECT * FROM Subject_Combination where Subject_CombinationID = ?";
         return jdbcTemplate.queryForList(sql, id);
    }

    @Override
    public void editcombination(String subjects, String subject_Combination_Code, String study_Topics, Integer id) {
        String sql = "UPDATE Subject_Combination  set Subjects=? , Subject_Combination_Code = ? , Study_Topics = ? where Subject_CombinationID = ?";
        jdbcTemplate.update(sql,subjects,subject_Combination_Code,study_Topics,id);
    }

    @Override
    public void deleteSubject(int id) {
        String sql = "DELETE FROM Subjects where SubjectsID = ?";
        jdbcTemplate.update(sql,id);
    }

    @Override
    public void deleteCombination(int id) {
        String sql = "DELETE FROM Subject_Combination where Subject_CombinationID = ?";
        jdbcTemplate.update(sql,id);
    }

}
