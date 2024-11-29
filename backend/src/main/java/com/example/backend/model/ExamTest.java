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
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;

/**
 *
 * @author Admin
 */
@Entity
@Table(name = "ExamTest")
@NamedQueries({
    @NamedQuery(name = "ExamTest.findAll", query = "SELECT e FROM ExamTest e"),
    @NamedQuery(name = "ExamTest.findByExamTestID", query = "SELECT e FROM ExamTest e WHERE e.examTestID = :examTestID"),
    @NamedQuery(name = "ExamTest.findByExamTestImage", query = "SELECT e FROM ExamTest e WHERE e.examTestImage = :examTestImage"),
    @NamedQuery(name = "ExamTest.findByExamTestPath", query = "SELECT e FROM ExamTest e WHERE e.examTestPath = :examTestPath"),
    @NamedQuery(name = "ExamTest.findByTitle", query = "SELECT e FROM ExamTest e WHERE e.title = :title")})
public class ExamTest implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "examTestID")
    private Integer examTestID;
    @Column(name = "examTestImage")
    private String examTestImage;
    @Column(name = "examTestPath")
    private String examTestPath;
    @Column(name = "Title")
    private String title;

    public ExamTest() {
    }

    public ExamTest(Integer examTestID) {
        this.examTestID = examTestID;
    }

    public Integer getExamTestID() {
        return examTestID;
    }

    public void setExamTestID(Integer examTestID) {
        this.examTestID = examTestID;
    }

    public String getExamTestImage() {
        return examTestImage;
    }

    public void setExamTestImage(String examTestImage) {
        this.examTestImage = examTestImage;
    }

    public String getExamTestPath() {
        return examTestPath;
    }

    public void setExamTestPath(String examTestPath) {
        this.examTestPath = examTestPath;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (examTestID != null ? examTestID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ExamTest)) {
            return false;
        }
        ExamTest other = (ExamTest) object;
        if ((this.examTestID == null && other.examTestID != null) || (this.examTestID != null && !this.examTestID.equals(other.examTestID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.ExamTest[ examTestID=" + examTestID + " ]";
    }
    
}
