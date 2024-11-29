package com.example.backend.services;

import com.example.backend.model.TeacherTeachingService;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 *
 * @author Admin
 */
public interface TeacherTeachingServiceService {
    TeacherTeachingService findbyphone(String phone);
    TeacherTeachingService login(String phone, String password);
    
    List<Map<String,Object>> showAllAdmin();
    
    TeacherTeachingService findById(Integer adminId);
    
    List<Map<String, Object>> showAll();
    
    List<Map<String, Object>> showNameTeaching(Integer id);

    TeacherTeachingServiceService myInfoById(Integer teacherId);
    
    TeacherTeachingService findbyteacheridObject(int teacherid);
    
     List<TeacherTeachingService> getAllTeachers();
}
