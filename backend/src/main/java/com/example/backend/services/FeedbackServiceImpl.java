/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Feedback;
import com.example.backend.repository.FeedbackRepository;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author HONGGAM
 */
@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Feedback> findById(Integer FeedbackID) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT * FROM Feedback";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public Feedback findbyfbid(Integer id) {
        String sql = "SELECT * FROM Feedback WHERE FeedbackID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Feedback.class));
    }

    @Override
    public Feedback savefeedback(Feedback feedback) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public void updateFeedback(Integer feedback, String content, Date daymake, String email, String nameuser) {
        String sql = "UPDATE Feedback SET Content=?,Daymake=?,Email=?,Nameuser=? WHERE FeedbackID=?";
        jdbcTemplate.update(sql,content,daymake,email,nameuser,feedback);
    }

    @Override
    public void createFeedback(Integer feedback, String Content, LocalDate Daymake, String Email, String Nameuser) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void deleteFeedback(Integer feedbackID) {
        feedbackRepository.deleteById(feedbackID);
    }

    @Override
    public Feedback updateFeedback(int id, Feedback feedback) {
        Optional<Feedback> optionalFeedback = feedbackRepository.findById(id);

        if (optionalFeedback.isPresent()) {

            Feedback existingFeedback = optionalFeedback.get();

            existingFeedback.setContent(feedback.getContent());

            existingFeedback.setDaymake(feedback.getDaymake());

            existingFeedback.setEmail(feedback.getEmail());

            existingFeedback.setNameuser(feedback.getNameuser());

            return feedbackRepository.save(existingFeedback);

        }

        return null;
    }

}
