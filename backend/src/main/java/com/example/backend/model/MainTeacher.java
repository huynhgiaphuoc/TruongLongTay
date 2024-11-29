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
@Table(name = "MainTeacher")
@NamedQueries({
    @NamedQuery(name = "MainTeacher.findAll", query = "SELECT m FROM MainTeacher m"),
    @NamedQuery(name = "MainTeacher.findByMainTeacherID", query = "SELECT m FROM MainTeacher m WHERE m.mainTeacherID = :mainTeacherID"),
    @NamedQuery(name = "MainTeacher.findByYearteaching", query = "SELECT m FROM MainTeacher m WHERE m.yearteaching = :yearteaching")})
public class MainTeacher implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "MainTeacherID")
    private Integer mainTeacherID;
    @Column(name = "yearteaching")
    private String yearteaching;
    @JoinColumn(name = "ClassID", referencedColumnName = "ClassID")
    @ManyToOne
    private Class classID;
    @JoinColumn(name = "TeacherID", referencedColumnName = "TeacherID")
    @ManyToOne
    private Teacher teacherID;

    public MainTeacher() {
    }

    public MainTeacher(Integer mainTeacherID) {
        this.mainTeacherID = mainTeacherID;
    }

    public Integer getMainTeacherID() {
        return mainTeacherID;
    }

    public void setMainTeacherID(Integer mainTeacherID) {
        this.mainTeacherID = mainTeacherID;
    }

    public String getYearteaching() {
        return yearteaching;
    }

    public void setYearteaching(String yearteaching) {
        this.yearteaching = yearteaching;
    }

    public Class getClassID() {
        return classID;
    }

    public void setClassID(Class classID) {
        this.classID = classID;
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
        hash += (mainTeacherID != null ? mainTeacherID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MainTeacher)) {
            return false;
        }
        MainTeacher other = (MainTeacher) object;
        if ((this.mainTeacherID == null && other.mainTeacherID != null) || (this.mainTeacherID != null && !this.mainTeacherID.equals(other.mainTeacherID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.MainTeacher[ mainTeacherID=" + mainTeacherID + " ]";
    }
    
}
