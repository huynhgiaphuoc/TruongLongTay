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
@Table(name = "Tutoring_Class")
@NamedQueries({
    @NamedQuery(name = "TutoringClass.findAll", query = "SELECT t FROM TutoringClass t"),
    @NamedQuery(name = "TutoringClass.findByTutoringClassID", query = "SELECT t FROM TutoringClass t WHERE t.tutoringClassID = :tutoringClassID"),
    @NamedQuery(name = "TutoringClass.findByTutoringCode", query = "SELECT t FROM TutoringClass t WHERE t.tutoringCode = :tutoringCode"),
    @NamedQuery(name = "TutoringClass.findByClassTutoring", query = "SELECT t FROM TutoringClass t WHERE t.classTutoring = :classTutoring"),
    @NamedQuery(name = "TutoringClass.findBySic", query = "SELECT t FROM TutoringClass t WHERE t.sic = :sic"),
    @NamedQuery(name = "TutoringClass.findBySchoolYear", query = "SELECT t FROM TutoringClass t WHERE t.schoolYear = :schoolYear"),
    @NamedQuery(name = "TutoringClass.findByCon", query = "SELECT t FROM TutoringClass t WHERE t.con = :con")})
public class TutoringClass implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Tutoring_ClassID")
    private Integer tutoringClassID;
    @Column(name = "Tutoring_Code")
    private String tutoringCode;
    @Column(name = "Class_Tutoring")
    private String classTutoring;
    @Column(name = "Sic")
    private Integer sic;
    @Column(name = "school_year")
    private String schoolYear;
    @Column(name = "Con")
    private Integer con;
    @JoinColumn(name = "SubjectsID", referencedColumnName = "SubjectsID")
    @ManyToOne
    private Subjects subjectsID;
    @JoinColumn(name = "TeacherID", referencedColumnName = "TeacherID")
    @ManyToOne
    private Teacher teacherID;

    public TutoringClass() {
    }

    public TutoringClass(Integer tutoringClassID) {
        this.tutoringClassID = tutoringClassID;
    }

    public Integer getTutoringClassID() {
        return tutoringClassID;
    }

    public void setTutoringClassID(Integer tutoringClassID) {
        this.tutoringClassID = tutoringClassID;
    }

    public String getTutoringCode() {
        return tutoringCode;
    }

    public void setTutoringCode(String tutoringCode) {
        this.tutoringCode = tutoringCode;
    }

    public String getClassTutoring() {
        return classTutoring;
    }

    public void setClassTutoring(String classTutoring) {
        this.classTutoring = classTutoring;
    }

    public Integer getSic() {
        return sic;
    }

    public void setSic(Integer sic) {
        this.sic = sic;
    }

    public String getSchoolYear() {
        return schoolYear;
    }

    public void setSchoolYear(String schoolYear) {
        this.schoolYear = schoolYear;
    }

    public Integer getCon() {
        return con;
    }

    public void setCon(Integer con) {
        this.con = con;
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
        hash += (tutoringClassID != null ? tutoringClassID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TutoringClass)) {
            return false;
        }
        TutoringClass other = (TutoringClass) object;
        if ((this.tutoringClassID == null && other.tutoringClassID != null) || (this.tutoringClassID != null && !this.tutoringClassID.equals(other.tutoringClassID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.TutoringClass[ tutoringClassID=" + tutoringClassID + " ]";
    }
    
}
