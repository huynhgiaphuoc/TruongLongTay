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
@Table(name = "PointOfStudent")
@NamedQueries({
    @NamedQuery(name = "PointOfStudent.findAll", query = "SELECT p FROM PointOfStudent p"),
    @NamedQuery(name = "PointOfStudent.findByPointOfStudentID", query = "SELECT p FROM PointOfStudent p WHERE p.pointOfStudentID = :pointOfStudentID"),
    @NamedQuery(name = "PointOfStudent.findByMouthTestpoint1", query = "SELECT p FROM PointOfStudent p WHERE p.mouthTestpoint1 = :mouthTestpoint1"),
    @NamedQuery(name = "PointOfStudent.findByMouthTestpoint2", query = "SELECT p FROM PointOfStudent p WHERE p.mouthTestpoint2 = :mouthTestpoint2"),
    @NamedQuery(name = "PointOfStudent.findByTest151point", query = "SELECT p FROM PointOfStudent p WHERE p.test151point = :test151point"),
    @NamedQuery(name = "PointOfStudent.findByTest152point", query = "SELECT p FROM PointOfStudent p WHERE p.test152point = :test152point"),
    @NamedQuery(name = "PointOfStudent.findByTest153point", query = "SELECT p FROM PointOfStudent p WHERE p.test153point = :test153point"),
    @NamedQuery(name = "PointOfStudent.findByTest154point", query = "SELECT p FROM PointOfStudent p WHERE p.test154point = :test154point"),
    @NamedQuery(name = "PointOfStudent.findByTestLessonpoint", query = "SELECT p FROM PointOfStudent p WHERE p.testLessonpoint = :testLessonpoint"),
    @NamedQuery(name = "PointOfStudent.findByTestLesson2point", query = "SELECT p FROM PointOfStudent p WHERE p.testLesson2point = :testLesson2point"),
    @NamedQuery(name = "PointOfStudent.findByTestLesson3point", query = "SELECT p FROM PointOfStudent p WHERE p.testLesson3point = :testLesson3point"),
    @NamedQuery(name = "PointOfStudent.findByTestLesson4point", query = "SELECT p FROM PointOfStudent p WHERE p.testLesson4point = :testLesson4point"),
    @NamedQuery(name = "PointOfStudent.findByExam1", query = "SELECT p FROM PointOfStudent p WHERE p.exam1 = :exam1"),
    @NamedQuery(name = "PointOfStudent.findByExam2", query = "SELECT p FROM PointOfStudent p WHERE p.exam2 = :exam2"),
    @NamedQuery(name = "PointOfStudent.findByGoalaverage", query = "SELECT p FROM PointOfStudent p WHERE p.goalaverage = :goalaverage"),
    @NamedQuery(name = "PointOfStudent.findByGoalaverage2", query = "SELECT p FROM PointOfStudent p WHERE p.goalaverage2 = :goalaverage2"),
    @NamedQuery(name = "PointOfStudent.findByAllin", query = "SELECT p FROM PointOfStudent p WHERE p.allin = :allin")})
public class PointOfStudent implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "PointOfStudentID")
    private Integer pointOfStudentID;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "MouthTestpoint1")
    private Double mouthTestpoint1;
    @Column(name = "MouthTestpoint2")
    private Double mouthTestpoint2;
    @Column(name = "Test151point")
    private Double test151point;
    @Column(name = "Test152point")
    private Double test152point;
    @Column(name = "Test153point")
    private Double test153point;
    @Column(name = "Test154point")
    private Double test154point;
    @Column(name = "TestLessonpoint")
    private Double testLessonpoint;
    @Column(name = "TestLesson2point")
    private Double testLesson2point;
    @Column(name = "TestLesson3point")
    private Double testLesson3point;
    @Column(name = "TestLesson4point")
    private Double testLesson4point;
    @Column(name = "Exam1")
    private Double exam1;
    @Column(name = "Exam2")
    private Double exam2;
    @Column(name = "Goalaverage")
    private Double goalaverage;
    @Column(name = "Goalaverage2")
    private Double goalaverage2;
    @Column(name = "Allin")
    private Double allin;
    @JoinColumn(name = "ExamID", referencedColumnName = "ExamID")
    @ManyToOne
    private Exam examID;
    @JoinColumn(name = "StudentID", referencedColumnName = "StudentID")
    @ManyToOne
    private Students studentID;
    @JoinColumn(name = "SubjectsID", referencedColumnName = "SubjectsID")
    @ManyToOne
    private Subjects subjectsID;

    public PointOfStudent() {
    }

    public PointOfStudent(Integer pointOfStudentID) {
        this.pointOfStudentID = pointOfStudentID;
    }

    public Integer getPointOfStudentID() {
        return pointOfStudentID;
    }

    public void setPointOfStudentID(Integer pointOfStudentID) {
        this.pointOfStudentID = pointOfStudentID;
    }

    public Double getMouthTestpoint1() {
        return mouthTestpoint1;
    }

    public void setMouthTestpoint1(Double mouthTestpoint1) {
        this.mouthTestpoint1 = mouthTestpoint1;
    }

    public Double getMouthTestpoint2() {
        return mouthTestpoint2;
    }

    public void setMouthTestpoint2(Double mouthTestpoint2) {
        this.mouthTestpoint2 = mouthTestpoint2;
    }

    public Double getTest151point() {
        return test151point;
    }

    public void setTest151point(Double test151point) {
        this.test151point = test151point;
    }

    public Double getTest152point() {
        return test152point;
    }

    public void setTest152point(Double test152point) {
        this.test152point = test152point;
    }

    public Double getTest153point() {
        return test153point;
    }

    public void setTest153point(Double test153point) {
        this.test153point = test153point;
    }

    public Double getTest154point() {
        return test154point;
    }

    public void setTest154point(Double test154point) {
        this.test154point = test154point;
    }

    public Double getTestLessonpoint() {
        return testLessonpoint;
    }

    public void setTestLessonpoint(Double testLessonpoint) {
        this.testLessonpoint = testLessonpoint;
    }

    public Double getTestLesson2point() {
        return testLesson2point;
    }

    public void setTestLesson2point(Double testLesson2point) {
        this.testLesson2point = testLesson2point;
    }

    public Double getTestLesson3point() {
        return testLesson3point;
    }

    public void setTestLesson3point(Double testLesson3point) {
        this.testLesson3point = testLesson3point;
    }

    public Double getTestLesson4point() {
        return testLesson4point;
    }

    public void setTestLesson4point(Double testLesson4point) {
        this.testLesson4point = testLesson4point;
    }

    public Double getExam1() {
        return exam1;
    }

    public void setExam1(Double exam1) {
        this.exam1 = exam1;
    }

    public Double getExam2() {
        return exam2;
    }

    public void setExam2(Double exam2) {
        this.exam2 = exam2;
    }

    public Double getGoalaverage() {
        return goalaverage;
    }

    public void setGoalaverage(Double goalaverage) {
        this.goalaverage = goalaverage;
    }

    public Double getGoalaverage2() {
        return goalaverage2;
    }

    public void setGoalaverage2(Double goalaverage2) {
        this.goalaverage2 = goalaverage2;
    }

    public Double getAllin() {
        return allin;
    }

    public void setAllin(Double allin) {
        this.allin = allin;
    }

    public Exam getExamID() {
        return examID;
    }

    public void setExamID(Exam examID) {
        this.examID = examID;
    }

    public Students getStudentID() {
        return studentID;
    }

    public void setStudentID(Students studentID) {
        this.studentID = studentID;
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
        hash += (pointOfStudentID != null ? pointOfStudentID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PointOfStudent)) {
            return false;
        }
        PointOfStudent other = (PointOfStudent) object;
        if ((this.pointOfStudentID == null && other.pointOfStudentID != null) || (this.pointOfStudentID != null && !this.pointOfStudentID.equals(other.pointOfStudentID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.PointOfStudent[ pointOfStudentID=" + pointOfStudentID + " ]";
    }
    
}
