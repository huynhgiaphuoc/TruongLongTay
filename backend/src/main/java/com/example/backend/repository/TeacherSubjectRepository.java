/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.repository;

import com.example.backend.model.TeacherSubject;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Admin
 */
public interface TeacherSubjectRepository  extends JpaRepository<TeacherSubject, Long>{
    TeacherSubject findByTeacherSubjectID(Integer teacherSubjectID);
}
