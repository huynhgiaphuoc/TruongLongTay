/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.repository;

import com.example.backend.model.Schedule;
import com.example.backend.model.Class;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Admin
 */
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Schedule findByClassIDAndDaysonweek(Class cls, String selectedday);

    Schedule findByScheduleID(int scheduleID);
}
