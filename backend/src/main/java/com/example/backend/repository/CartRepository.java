/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.repository;

import com.example.backend.model.Cart;
import com.example.backend.model.Students;
import com.example.backend.model.Uniform;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author USER
 */
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByStudentID(Students studentID);

    Cart findByStudentIDAndUniformID(Students studentID, Uniform uniformID);

    void deleteByStudentIDAndUniformID(Students studentID, Uniform uniformID);
    void deleteByStudentID(Students studentID);
}
