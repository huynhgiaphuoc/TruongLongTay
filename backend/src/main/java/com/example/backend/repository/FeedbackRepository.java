/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.repository;

import com.example.backend.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author HONGGAM
 */
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    public Feedback findByFeedbackID(Integer feedbackID);

    @Override
    void deleteById(Integer feedbackID);

    public void save(Integer feedback);
    
    
}
