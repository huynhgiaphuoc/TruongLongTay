/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 *
 * @author Admin
 */
@Entity
@Table(name = "Exam")
@NamedQueries({
    @NamedQuery(name = "Exam.findAll", query = "SELECT e FROM Exam e"),
    @NamedQuery(name = "Exam.findByExamID", query = "SELECT e FROM Exam e WHERE e.examID = :examID"),
    @NamedQuery(name = "Exam.findByExam", query = "SELECT e FROM Exam e WHERE e.exam = :exam"),
    @NamedQuery(name = "Exam.findByExamDate", query = "SELECT e FROM Exam e WHERE e.examDate = :examDate"),
    @NamedQuery(name = "Exam.findByStartTime", query = "SELECT e FROM Exam e WHERE e.startTime = :startTime"),
    @NamedQuery(name = "Exam.findByEndTime", query = "SELECT e FROM Exam e WHERE e.endTime = :endTime"),
    @NamedQuery(name = "Exam.findByTotalTime", query = "SELECT e FROM Exam e WHERE e.totalTime = :totalTime")})
public class Exam implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ExamID")
    private Integer examID;
    @Column(name = "Exam")
    private String exam;
    @Column(name = "ExamDate")
    @Temporal(TemporalType.DATE)
    private Date examDate;
    @Column(name = "StartTime")
    @Temporal(TemporalType.TIME)
    private Date startTime;
    @Column(name = "EndTime")
    @Temporal(TemporalType.TIME)
    private Date endTime;
    @Column(name = "TotalTime")
    @Temporal(TemporalType.TIME)
    private Date totalTime;
    @OneToMany(mappedBy = "examID")
    private Collection<PointOfStudent> pointOfStudentCollection;
    @JoinColumn(name = "ClassID", referencedColumnName = "ClassID")
    @ManyToOne
    private Class classID;
    @JoinColumn(name = "SubjectsID", referencedColumnName = "SubjectsID")
    @ManyToOne
    private Subjects subjectsID;

    public Exam() {
    }

    public Exam(Integer examID) {
        this.examID = examID;
    }

    public Integer getExamID() {
        return examID;
    }

    public void setExamID(Integer examID) {
        this.examID = examID;
    }

    public String getExam() {
        return exam;
    }

    public void setExam(String exam) {
        this.exam = exam;
    }

    public Date getExamDate() {
        return examDate;
    }

    public void setExamDate(Date examDate) {
        this.examDate = examDate;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Date totalTime) {
        this.totalTime = totalTime;
    }

    public Collection<PointOfStudent> getPointOfStudentCollection() {
        return pointOfStudentCollection;
    }

    public void setPointOfStudentCollection(Collection<PointOfStudent> pointOfStudentCollection) {
        this.pointOfStudentCollection = pointOfStudentCollection;
    }

    public Class getClassID() {
        return classID;
    }

    public void setClassID(Class classID) {
        this.classID = classID;
    }

    public Subjects getSubjectsID() {
        return subjectsID;
    }

    public void setSubjectsID(Subjects subjectsID) {
        this.subjectsID = subjectsID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (examID != null ? examID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Exam)) {
            return false;
        }
        Exam other = (Exam) object;
        if ((this.examID == null && other.examID != null) || (this.examID != null && !this.examID.equals(other.examID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.Exam[ examID=" + examID + " ]";
    }
    
}
