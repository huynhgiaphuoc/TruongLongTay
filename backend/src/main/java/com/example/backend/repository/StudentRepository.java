/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.repository;


import com.example.backend.model.Students;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author USER
 */

public interface StudentRepository extends JpaRepository<Students, Long>{
     Students findByPhoneAndPassword(String phone, String password);
    Students findByStudentID(Integer studentID);
        Students findByPhone(String phone);
}
