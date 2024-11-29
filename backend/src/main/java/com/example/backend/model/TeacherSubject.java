/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.model;

import java.io.Serializable;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;

/**
 *
 * @author Admin
 */
@Entity
@Table(name = "Teacher_Subject")
@NamedQueries({
    @NamedQuery(name = "TeacherSubject.findAll", query = "SELECT t FROM TeacherSubject t"),
    @NamedQuery(name = "TeacherSubject.findByTeacherSubjectID", query = "SELECT t FROM TeacherSubject t WHERE t.teacherSubjectID = :teacherSubjectID")})
public class TeacherSubject implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Teacher_SubjectID")
    private Integer teacherSubjectID;
    @JoinColumn(name = "SubjectsID", referencedColumnName = "SubjectsID")
    @ManyToOne
    private Subjects subjectsID;
    @JoinColumn(name = "TeacherID", referencedColumnName = "TeacherID")
    @ManyToOne
    private Teacher teacherID;

    public TeacherSubject() {
    }

    public TeacherSubject(Integer teacherSubjectID) {
        this.teacherSubjectID = teacherSubjectID;
    }

    public Integer getTeacherSubjectID() {
        return teacherSubjectID;
    }

    public void setTeacherSubjectID(Integer teacherSubjectID) {
        this.teacherSubjectID = teacherSubjectID;
    }

    public Subjects getSubjectsID() {
        return subjectsID;
    }

    public void setSubjectsID(Subjects subjectsID) {
        this.subjectsID = subjectsID;
    }

    public Teacher getTeacherID() {
        return teacherID;
    }

    public void setTeacherID(Teacher teacherID) {
        this.teacherID = teacherID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (teacherSubjectID != null ? teacherSubjectID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TeacherSubject)) {
            return false;
        }
        TeacherSubject other = (TeacherSubject) object;
        if ((this.teacherSubjectID == null && other.teacherSubjectID != null) || (this.teacherSubjectID != null && !this.teacherSubjectID.equals(other.teacherSubjectID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.TeacherSubject[ teacherSubjectID=" + teacherSubjectID + " ]";
    }
    
}
