/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.repository;

import com.example.backend.model.TeacherTeachingService;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Admin
 */
public interface TeacherTeachingServiceRepository extends JpaRepository<TeacherTeachingService, Long> {

    TeacherTeachingService findByPhoneAndPassword(String phone, String password);

    TeacherTeachingService findByPhone(String phone);
    
    
}
