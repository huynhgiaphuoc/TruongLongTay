/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Feedback;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 *
 * @author HONGGAM //
 */
public interface FeedbackService {

    void createFeedback(Integer feedback, String Content, LocalDate Daymake, String Email, String Nameuser);

    List<Feedback> findById(Integer FeedbackID);

    void updateFeedback(Integer feedback, String Content, Date Daymake, String Email, String Nameuser);

    void deleteFeedback(Integer feedbackID);

    List<Map<String, Object>> findAll();

    public Feedback savefeedback(Feedback feedback);

    Feedback createFeedback(Feedback feedback);

    Feedback updateFeedback(int id, Feedback feedback);

    Feedback findbyfbid(Integer id);

}
