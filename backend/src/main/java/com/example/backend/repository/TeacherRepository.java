/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.repository;

import com.example.backend.model.Students;
import com.example.backend.model.Teacher;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Admin
 */
public interface TeacherRepository extends JpaRepository<Teacher, Long>{
      Teacher findByOfficerAndPassword(String officer, String password);
    Teacher findByTeacherID(Integer teacherId);
        Teacher findByOfficer(String officer);
}
