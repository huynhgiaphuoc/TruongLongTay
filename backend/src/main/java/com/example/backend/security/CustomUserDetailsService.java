package com.example.backend.security;

import com.example.backend.model.Students;
import com.example.backend.model.Teacher;
import com.example.backend.model.TeacherTeachingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.backend.repository.TeacherTeachingServiceRepository;
import com.example.backend.repository.TeacherRepository;
import com.example.backend.repository.StudentRepository;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private TeacherTeachingServiceRepository adminRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TeacherTeachingService admin = adminRepository.findByPhone(username);
        if (admin != null) {
            return new CustomUserDetails(admin.getTeacherteachingserviceID(), admin.getPhone(), admin.getPassword(), List.of(new SimpleGrantedAuthority("ROLEADMIN")),admin.getNameteacher());
        }
        Teacher teacher = teacherRepository.findByOfficer(username);
        if (teacher != null) {
            String position = teacher.getPosition();
            System.out.println("position" + position);
            if (position.trim().equals("Giáo viên")) {
                return new CustomUserDetails(teacher.getTeacherID(), teacher.getOfficer(), teacher.getPassword(), List.of(new SimpleGrantedAuthority("ROLETEACHER")),teacher.getNameTeacher());

            } else {
                return new CustomUserDetails(teacher.getTeacherID(), teacher.getOfficer(), teacher.getPassword(), List.of(new SimpleGrantedAuthority("ROLEACCOUNTANCY")),teacher.getNameTeacher());
            }
        }
        System.out.println("username" + username);
        Students student = studentRepository.findByPhone(username);
        if (student != null) {
            System.out.println("lalala" + student);
            return new CustomUserDetails(student.getStudentID(), student.getPhone(), student.getPassword(), List.of(new SimpleGrantedAuthority("ROLESTUDENT")),student.getStudentName());
        }
        throw new UsernameNotFoundException("User not found");
    }
}
