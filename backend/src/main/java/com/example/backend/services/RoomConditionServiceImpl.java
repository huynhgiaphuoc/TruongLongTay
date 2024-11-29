/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.RoomCondition;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
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
public class RoomConditionServiceImpl implements RoomConditionService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> findRoomNullByDate(Date date) {
        String sql = "SELCT * FROM RoomCondition WHERE DateRoom = ?";
        return jdbcTemplate.queryForList(sql, date);
    }

    @Override
    public List<Map<String, Object>> findRoomConditionById(Integer roomId) {
        LocalDate today = LocalDate.now();

        // Tính toán ngày đầu tuần (thứ Hai) và cuối tuần (Chủ Nhật)
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY));

        String sql = "SELECT * "
                + "FROM RoomCondition,Teacher "
                + "WHERE Teacher.TeacherID = RoomCondition.TeacherID AND RoomCondition.RoomID = ? "
                + "  AND RoomCondition.DateRoom BETWEEN ? AND ?";

        return jdbcTemplate.queryForList(sql, roomId, startOfWeek, endOfWeek);
    }

    @Override
    public void createRoomCondition(Date date, String session1, String session2, String session3, String session4, String session5, String session6, String session7, String session8, String session9, String session10, String day, Integer roomId, Integer teacherId, String note) {
        String sql = "INSERT INTO RoomCondition(DateRoom,Session1,Session2,Session3,Session4,Session5,Session6,Session7,Session8,Session9,Session10,Daysonweek,RoomID,TeacherID,Note) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql, date, session1, session2, session3, session4, session5, session6, session7, session8, session9, session10, day, roomId, teacherId, note);
    }

    @Override
    public void deleteRoomCondition(Integer roomConditionId) {
        String sqlCheckStatus = "SELECT COUNT(*) FROM RoomCondition "
                + "WHERE roomConditionId = ? AND ("
                + "session1 = N'Chờ phê duyệt' OR "
                + "session2 = N'Chờ phê duyệt' OR "
                + "session3 = N'Chờ phê duyệt' OR "
                + "session4 = N'Chờ phê duyệt' OR "
                + "session5 = N'Chờ phê duyệt' OR "
                + "session6 = N'Chờ phê duyệt' OR "
                + "session7 = N'Chờ phê duyệt' OR "
                + "session8 = N'Chờ phê duyệt' OR "
                + "session9 = N'Chờ phê duyệt' OR "
                + "session10 = N'Chờ phê duyệt')";

        Integer count = jdbcTemplate.queryForObject(sqlCheckStatus, new Object[]{roomConditionId}, Integer.class);

        if (count != null && count > 0) {
            String sqlDelete = "DELETE FROM RoomCondition WHERE RoomConditionID = ?";
            jdbcTemplate.update(sqlDelete, roomConditionId);
            System.out.println("Room condition has been deleted.");
        } else {
            throw new IllegalStateException("Dữ liệu chưa đươc cập nhật!");
        }
    }

    @Override
    public RoomCondition findRoomConditionByConditionId(Integer roomConditionId) {
        String sql = "SELECT * FROM RoomCondition WHERE RoomConditionID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{roomConditionId}, new BeanPropertyRowMapper<>(RoomCondition.class));
    }

    @Override
    public void updateRoomCondition(Integer roomConditionId, String note) {
        String sqlCheckStatus = "SELECT COUNT(*) FROM RoomCondition "
                + "WHERE roomConditionId = ? AND ("
                + "session1 = N'Chờ phê duyệt' OR "
                + "session2 = N'Chờ phê duyệt' OR "
                + "session3 = N'Chờ phê duyệt' OR "
                + "session4 = N'Chờ phê duyệt' OR "
                + "session5 = N'Chờ phê duyệt' OR "
                + "session6 = N'Chờ phê duyệt' OR "
                + "session7 = N'Chờ phê duyệt' OR "
                + "session8 = N'Chờ phê duyệt' OR "
                + "session9 = N'Chờ phê duyệt' OR "
                + "session10 = N'Chờ phê duyệt')";

        Integer count = jdbcTemplate.queryForObject(sqlCheckStatus, new Object[]{roomConditionId}, Integer.class);

        if (count != null && count > 0) {
            String sqlDelete = "UPDATE RoomCondition SET Note=? WHERE RoomConditionID = ?";
            jdbcTemplate.update(sqlDelete, note,roomConditionId);
            System.out.println("Room condition has been updated.");
        } else {
            throw new IllegalStateException("Dữ liệu chưa đươc cập nhật!");
        }
    }

    @Override
    public int countRoomBorrowed(Integer teacherId) {
        String sql = "SELECT COUNT(*) FROM RoomCondition "
                + "WHERE TeacherID = ? AND("
                + "session1 = N'Đã phê duyệt' OR "
                + "session2 = N'Đã phê duyệt' OR "
                + "session3 = N'Đã phê duyệt' OR "
                + "session4 = N'Đã phê duyệt' OR "
                + "session5 = N'Đã phê duyệt' OR "
                + "session6 = N'Đã phê duyệt' OR "
                + "session7 = N'Đã phê duyệt' OR "
                + "session8 = N'Đã phê duyệt' OR "
                + "session9 = N'Đã phê duyệt' OR "
                + "session10 = N'Đã phê duyệt')";
        return jdbcTemplate.queryForObject(sql, Integer.class, teacherId);
    }
    @Override
    public int allRoom() {
        String sql = "	SELECT "
                + "    SUM(CASE WHEN Session1 = N'Chờ phê duyệt' THEN 1 ELSE 0 END) +"
                + "    SUM(CASE WHEN Session2 = N'Chờ phê duyệt' THEN 1 ELSE 0 END) +"
                + "    SUM(CASE WHEN Session3 = N'Chờ phê duyệt' THEN 1 ELSE 0 END) +"
                + "    SUM(CASE WHEN Session4 = N'Chờ phê duyệt' THEN 1 ELSE 0 END) +"
                + "    SUM(CASE WHEN Session5 = N'Chờ phê duyệt' THEN 1 ELSE 0 END) +"
                + "    SUM(CASE WHEN Session6 = N'Chờ phê duyệt' THEN 1 ELSE 0 END) +"
                + "    SUM(CASE WHEN Session7 = N'Chờ phê duyệt' THEN 1 ELSE 0 END) +"
                + "    SUM(CASE WHEN Session8 = N'Chờ phê duyệt' THEN 1 ELSE 0 END) +"
                + "    SUM(CASE WHEN Session9 = N'Chờ phê duyệt' THEN 1 ELSE 0 END) +"
                + "    SUM(CASE WHEN Session10 = N'Chờ phê duyệt' THEN 1 ELSE 0 END) AS TotalPendingApproval "
                + "FROM RoomCondition";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
}
