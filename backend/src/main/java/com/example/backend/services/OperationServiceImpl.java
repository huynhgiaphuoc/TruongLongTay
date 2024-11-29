/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
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
public class OperationServiceImpl implements OperationService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> Operationforteacher(int classid) {
        String sql = "select * from Subjects";
        List<Map<String, Object>> operationforteacher = jdbcTemplate.queryForList(sql, classid);
        return operationforteacher;
    }

    @Override
    public List<Map<String, Object>> getTeacherBySubjectName(String subjectName) {
        String sql = "SELECT t.Name_Teacher, s.Subjects_Name "
                + "FROM Teacher_Subject ts "
                + "JOIN Teacher t ON ts.TeacherID = t.TeacherID "
                + "JOIN Subjects s ON ts.SubjectsID = s.SubjectsID "
                + "WHERE s.Subjects_Name = ?";
        return jdbcTemplate.queryForList(sql, subjectName);
    }

    @Override
    public List<Map<String, Object>> getClassIDbyTeacherSubjectID1(int TeacherSubjectID) {
        String sql = "SELECT c.ClassID, c.Class_Code, c.Class_Name, c.Sic "
                + "FROM Operation o "
                + "JOIN Class c ON o.ClassID = c.ClassID "
                + "WHERE o.Teacher_SubjectID = ?";
        System.out.println("TeacherSubjectID: " + TeacherSubjectID);
        return jdbcTemplate.queryForList(sql, TeacherSubjectID);
    }

    @Override
    public List<Map<String, Object>> getClassIDbyTeacherSubjectID(int TeacherSubjectID) {
        String sql = "Select * From Operation where Teacher_SubjectID = ?";
        System.out.println("TeacherSubjectID" + TeacherSubjectID);
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, TeacherSubjectID);
        System.out.println("result teacher" + result);
        List<Integer> classIds = new ArrayList<>();
        for (Map<String, Object> operation : result) {
            if (operation.containsKey("ClassID")) {
                classIds.add((Integer) operation.get("ClassID"));
                System.out.println("classs" + classIds);
            }
        }
        if (classIds.isEmpty()) {
            return new ArrayList<>();
        }
        String inSql = String.join(",", Collections.nCopies(classIds.size(), "?"));
        String sqlClass = "SELECT * FROM Class WHERE ClassID IN (" + inSql + ")";
        List<Map<String, Object>> classes = jdbcTemplate.queryForList(sqlClass, classIds.toArray());
        System.out.println("classes" + classes);
        return classes;
    }

    @Override
    public Map<String, Object> findPointByTeacherAndClass(Integer teacherId, Integer subjectId, Integer classId, int page, int size) {
        int offset = page * size;
        String selectSql = "SELECT * FROM PointOfStudent "
                + "JOIN Students ON PointOfStudent.StudentID = Students.StudentID "
                + "JOIN Class ON Class.ClassID = Students.ClassID "
                + "JOIN Subjects ON PointOfStudent.SubjectsID = Subjects.SubjectsID "
                + "JOIN Teacher_Subject ON Subjects.SubjectsID = Teacher_Subject.SubjectsID "
                + "JOIN Teacher ON Teacher_Subject.TeacherID = Teacher.TeacherID "
                + "WHERE Teacher.TeacherID = ? "
                + "AND Subjects.SubjectsID = ? "
                + "AND Class.ClassID = ? "
                + "ORDER BY Students.StudentId "
                + "OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";

        List<Map<String, Object>> data = jdbcTemplate.queryForList(selectSql, teacherId, subjectId, classId, offset, size);

        // Truy vấn số lượng bản ghi
        String countSql = "SELECT COUNT(*) FROM PointOfStudent "
                + "JOIN Students ON PointOfStudent.StudentID = Students.StudentID "
                + "JOIN Class ON Class.ClassID = Students.ClassID "
                + "JOIN Subjects ON PointOfStudent.SubjectsID = Subjects.SubjectsID "
                + "JOIN Teacher_Subject ON Subjects.SubjectsID = Teacher_Subject.SubjectsID "
                + "JOIN Teacher ON Teacher_Subject.TeacherID = Teacher.TeacherID "
                + "WHERE Teacher.TeacherID = ? "
                + "AND Subjects.SubjectsID = ? "
                + "AND Class.ClassID = ?";

        Integer totalRecords = jdbcTemplate.queryForObject(countSql, Integer.class, teacherId, subjectId, classId);

        Map<String, Object> result = new HashMap<>();
        result.put("data", data);
        result.put("totalRecords", totalRecords);

        return result;
    }

    @Override
    public List<Map<String, Object>> findAllPointByTeacher(Integer teacherId, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        String sql = "SELECT * "
                + "FROM Operation "
                + "JOIN Teacher_Subject ON Teacher_Subject.Teacher_SubjectID = Operation.Teacher_SubjectID "
                + "JOIN Class ON Class.ClassID = Operation.ClassID "
                + "JOIN Teacher ON Teacher.TeacherID = Teacher_Subject.TeacherID "
                + "JOIN Students ON Students.ClassID = Class.ClassID "
                + "JOIN PointOfStudent ON PointOfStudent.StudentID = Students.StudentID "
                + "WHERE Teacher.TeacherID = ? LIMIT ? OFFSET ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, teacherId, pageSize, offset);
        return result;
    }

    @Override
    public List<Map<String, Object>> findClassByTeacherId(Integer teacherId) {
        String sql = "SELECT * FROM Operation JOIN Teacher_Subject ON Teacher_Subject.Teacher_SubjectID = Operation.Teacher_SubjectID JOIN Class ON Operation.ClassID = Class.ClassID WHERE Teacher_Subject.TeacherId = ?";
        return jdbcTemplate.queryForList(sql, teacherId);
    }

    @Override
    public Map<String, Object> findStudentSmallAvg(Integer teacherId, int page, int size) {
        int offset = page * size;
        String selectSql = "SELECT * FROM PointOfStudent "
                + "JOIN Students ON PointOfStudent.StudentID = Students.StudentID "
                + "JOIN Class ON Class.ClassID = Students.ClassID "
                + "JOIN Subjects ON PointOfStudent.SubjectsID = Subjects.SubjectsID "
                + "JOIN Teacher_Subject ON Subjects.SubjectsID = Teacher_Subject.SubjectsID "
                + "JOIN Teacher ON Teacher_Subject.TeacherID = Teacher.TeacherID "
                + "WHERE Teacher.TeacherID = ? "
                + "AND Students.Tutoring_ClassID IS NULL "
                + "AND PointOfStudent.Exam1 <= 4 "
                + "ORDER BY Students.StudentId "
                + "OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";

        List<Map<String, Object>> data = jdbcTemplate.queryForList(selectSql, teacherId, offset, size);
        String countSql = "SELECT COUNT(*) FROM PointOfStudent "
                + "JOIN Students ON PointOfStudent.StudentID = Students.StudentID "
                + "JOIN Class ON Class.ClassID = Students.ClassID "
                + "JOIN Subjects ON PointOfStudent.SubjectsID = Subjects.SubjectsID "
                + "JOIN Teacher_Subject ON Subjects.SubjectsID = Teacher_Subject.SubjectsID "
                + "JOIN Teacher ON Teacher_Subject.TeacherID = Teacher.TeacherID "
                + "WHERE Teacher.TeacherID = ? "
                + "AND Students.Tutoring_ClassID IS NULL "
                + "AND PointOfStudent.Exam1 <= 4 ";

        Integer totalRecords = jdbcTemplate.queryForObject(countSql, Integer.class, teacherId);
        Map<String, Object> result = new HashMap<>();
        result.put("data", data);
        result.put("totalRecords", totalRecords);

        return result;
    }

    @Override
    public Map<String, Object> findPointByTeacherAndClassAll(Integer teacherId, Integer subjectId, Integer classId) {
        String selectSql = "SELECT * FROM PointOfStudent "
                + "JOIN Students ON PointOfStudent.StudentID = Students.StudentID "
                + "JOIN Class ON Class.ClassID = Students.ClassID "
                + "JOIN Subjects ON PointOfStudent.SubjectsID = Subjects.SubjectsID "
                + "JOIN Teacher_Subject ON Subjects.SubjectsID = Teacher_Subject.SubjectsID "
                + "JOIN Teacher ON Teacher_Subject.TeacherID = Teacher.TeacherID "
                + "WHERE Teacher.TeacherID = ? "
                + "AND Subjects.SubjectsID = ? "
                + "AND Class.ClassID = ? "
                + "ORDER BY Students.StudentId";

        List<Map<String, Object>> data = jdbcTemplate.queryForList(selectSql, teacherId, subjectId, classId);

        // Truy vấn số lượng bản ghi
        String countSql = "SELECT COUNT(*) FROM PointOfStudent "
                + "JOIN Students ON PointOfStudent.StudentID = Students.StudentID "
                + "JOIN Class ON Class.ClassID = Students.ClassID "
                + "JOIN Subjects ON PointOfStudent.SubjectsID = Subjects.SubjectsID "
                + "JOIN Teacher_Subject ON Subjects.SubjectsID = Teacher_Subject.SubjectsID "
                + "JOIN Teacher ON Teacher_Subject.TeacherID = Teacher.TeacherID "
                + "WHERE Teacher.TeacherID = ? "
                + "AND Subjects.SubjectsID = ? "
                + "AND Class.ClassID = ?";

        Integer totalRecords = jdbcTemplate.queryForObject(countSql, Integer.class, teacherId, subjectId, classId);

        Map<String, Object> result = new HashMap<>();
        result.put("data", data);
        result.put("totalRecords", totalRecords);

        return result;
    }

    @Override
    public List<Map<String, Object>> getAllByClassId(Integer classId) {
        String sql = "SELECT * FROM Operation "
                + "JOIN Class ON Operation.ClassID = Class.ClassID "
                + "JOIN Teacher_Subject ON Operation.Teacher_SubjectID = Teacher_Subject.Teacher_SubjectID "
                + "JOIN Subjects ON Teacher_Subject.SubjectsID = Subjects.SubjectsID "
                + "JOIN Teacher ON Teacher_Subject.TeacherID = Teacher.TeacherID "
                + "WHERE Operation.ClassID = ?";
        return jdbcTemplate.queryForList(sql, classId);
    }

    @Override
    public List<Map<String, Object>> getAllOperation() {
        String sql = "SELECT * FROM Operation "
                + "JOIN Class ON Operation.ClassID = Class.ClassID "
                + "JOIN Teacher_Subject ON Operation.Teacher_SubjectID = Teacher_Subject.Teacher_SubjectID "
                + "JOIN Subjects ON Teacher_Subject.SubjectsID = Subjects.SubjectsID "
                + "JOIN Teacher ON Teacher_Subject.TeacherID = Teacher.TeacherID "
                + "ORDER BY Class.ClassID";
        return jdbcTemplate.queryForList(sql);
    }

}
