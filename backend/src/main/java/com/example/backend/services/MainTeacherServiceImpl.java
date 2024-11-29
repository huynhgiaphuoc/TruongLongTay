package com.example.backend.services;

import com.example.backend.model.MainTeacher;
import com.example.backend.model.Teacher;
import com.example.backend.repository.MainTeacherRepository;
import jakarta.persistence.Query;
import java.time.Year;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class MainTeacherServiceImpl implements MainTeacherService {

    @Autowired
    private MainTeacherRepository mainTeacherRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public String getCurrentYearRange() {
        int currentYear = Year.now().getValue();
        return currentYear + "-" + (currentYear + 1);
    }

    @Override
    public Map<String, Object> findByMain(Integer teacherId, String orderType, int page, int size) {
        String currentyear = getCurrentYearRange();
        int offset = page * size;
        String orderBy = (orderType == null || orderType.isEmpty()) ? "ASC" : orderType;
        String sql = "SELECT "
                + "s.StudentID, s.Student_Name, c.Class_Name, t.Name_Teacher, s.Rollno, s.Gender, s.Birthday, "
                + "s.Cccd, s.Phone, s.Dad_Name, s.Mom_Name, s.Permanent_Address, s.Province, s.District, s.Commune, "
                + "s.Student_Avatar, s.Part, "
                + "(SELECT COUNT(*) "
                + " FROM MainTeacher mt "
                + " JOIN Class c ON mt.ClassID = c.ClassID "
                + " JOIN Students s ON c.ClassID = s.ClassID "
                + " JOIN Teacher t ON mt.TeacherID = t.TeacherID "
                + " WHERE t.TeacherID = ? and mt.yearteaching = ?) AS totalStudentCount "
                + "FROM MainTeacher mt "
                + "JOIN Class c ON mt.ClassID = c.ClassID "
                + "JOIN Students s ON c.ClassID = s.ClassID "
                + "JOIN Teacher t ON mt.TeacherID = t.TeacherID "
                + "WHERE mt.TeacherID = ? AND mt.yearteaching = ? "
                + "ORDER BY s.StudentID " + orderBy
                + " OFFSET ? ROWS "
                + "FETCH NEXT ? ROWS ONLY";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, teacherId, currentyear, teacherId, currentyear, offset, size);

        int totalStudentCount = 0;
        if (!result.isEmpty()) {
            totalStudentCount = (Integer) result.get(0).get("totalStudentCount");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("students", result);
        response.put("totalStudentCount", totalStudentCount);

        return response;
    }

    public List<Map<String, Object>> findStudents(Integer teacherId) {
        String currentyear = getCurrentYearRange();
        String sql = "SELECT s.StudentID, s.Student_Name, c.Class_Name, t.Name_Teacher, s.Rollno, s.Gender, s.Birthday,"
                + "s.Cccd, s.Phone, s.Dad_Name, s.Mom_Name, s.Permanent_Address, s.Province, s.District, s.Commune,"
                + "s.Student_Avatar, s.Part "
                + "FROM MainTeacher mt "
                + "JOIN Class c ON mt.ClassID = c.ClassID "
                + "JOIN Students s ON c.ClassID = s.ClassID "
                + "JOIN Teacher t ON mt.TeacherID = t.TeacherID "
                + "WHERE t.TeacherID = ? AND mt.yearteaching = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, teacherId, currentyear);
        return result;
    }

    @Override
    public List<Map<String, Object>> rankStudentByTeacherId(Integer teacherId) {
        String sql = "WITH StudentAverage AS ( "
                + "SELECT  "
                + "s.StudentID, "
                + "s.Student_Name, "
                + "AVG(m.Allin) AS Averageofallsubjects, "
                + "MAX(CASE WHEN m.SubjectsID IN (1, 2) THEN m.Allin ELSE NULL END) AS MaxScoreMainSubjects, "
                + "MIN(CASE WHEN m.SubjectsID IN (1, 2) THEN m.Allin ELSE NULL END) AS MinScoreMainSubjects, "
                + "MIN(CASE WHEN m.SubjectsID IN (3,4,5,6,7,8,9,10,11,12,13,14) THEN m.Allin ELSE NULL END) AS MinScoreAllSubjects "
                + "FROM  "
                + "students s "
                + "JOIN  "
                + "PointOfStudent m ON s.StudentID = m.StudentID "
                + "WHERE  "
                + "s.ClassID = ? "
                + "GROUP BY  "
                + "s.StudentID, s.Student_Name "
                + "), "
                + "StudentClassification AS ( "
                + "SELECT  "
                + "StudentID, "
                + "Student_Name, "
                + "CASE "
                + "WHEN Averageofallsubjects >= 8 "
                + "AND MinScoreMainSubjects >= 6.5 OR MaxScoreMainSubjects >= 8 "
                + "AND MinScoreAllSubjects >= 6.5 THEN 'Giỏi' "
                + "WHEN Averageofallsubjects >= 6.5 "
                + "AND MinScoreMainSubjects >= 5 AND MaxScoreMainSubjects >= 6.5 "
                + "AND MinScoreAllSubjects >= 5 THEN 'Khá' "
                + "WHEN Averageofallsubjects >= 5 "
                + "AND MinScoreMainSubjects >= 3.5 AND MaxScoreMainSubjects >= 5 "
                + "AND MinScoreAllSubjects >= 3.5 THEN 'Trung Bình' "
                + "WHEN Averageofallsubjects >= 2 AND MaxScoreMainSubjects >= 3.5 "
                + "AND MinScoreAllSubjects >= 2 THEN 'Yếu' "
                + "ELSE 'Kém' "
                + "END AS Classification "
                + "FROM  "
                + "StudentAverage "
                + ") "
                + "SELECT  "
                + "Classification, "
                + "COUNT(*) AS Count "
                + "FROM  "
                + "StudentClassification "
                + "GROUP BY  "
                + "Classification";
        return jdbcTemplate.queryForList(sql, teacherId);
    }

    @Override
    public MainTeacher findByTeacherId(Integer teacherId) {
        String currentYearRange = getCurrentYearRange();
        String sql = "SELECT * FROM MainTeacher INNER JOIN Class ON MainTeacher.ClassId = Class.ClassId WHERE MainTeacher.TeacherId = ? and MainTeacher.yearteaching = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{teacherId, currentYearRange}, new BeanPropertyRowMapper<>(MainTeacher.class));
    }

    @Override
    public List<Map<String, Object>> showAllMainTeacher() {
        String sql = "SELECT * FROM MainTeacher "
                + "JOIN Teacher ON MainTeacher.TeacherID = Teacher.TeacherID "
                + "JOIN Class ON MainTeacher.ClassID = Class.ClassID ";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> showAllMainTeacher(String year) {
        String sql = "SELECT * FROM MainTeacher "
                + "JOIN Teacher ON MainTeacher.TeacherID = Teacher.TeacherID "
                + "JOIN Class ON MainTeacher.ClassID = Class.ClassID "
                + "WHERE yearteaching=?";
        return jdbcTemplate.queryForList(sql, year);
    }

    @Override
    public void create(String year, Integer classId, Integer teacherId) {
        String sql = "INSERT INTO MainTeacher(yearteaching,TeacherID,ClassID) VALUES(?,?,?)";
        jdbcTemplate.update(sql,year,teacherId,classId);
    }

    @Override
    public List<Map<String, Object>> getMainTeacher(Integer mainTeacherId) {
        String sql = "SELECT * FROM MainTeacher WHERE MainTeacherID=?";
        return jdbcTemplate.queryForList(sql, mainTeacherId);
    }

    @Override
    public void update(Integer mainId, Integer teacherId) {
        String sql = "UPDATE MainTeacher SET TeacherID=? WHERE MainTeacherID=?";
        jdbcTemplate.update(sql,teacherId,mainId);
    }

    @Override
    public void delete(Integer mainId) {
        String sql = "DELETE MainTeacher WHERE MainTeacherId=?";
        jdbcTemplate.update(sql,mainId);
    }

}
