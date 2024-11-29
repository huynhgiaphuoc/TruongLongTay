/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.model;

import java.io.Serializable;
import java.util.Date;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 *
 * @author Admin
 */
@Entity
@Table(name = "ResultExam")
@NamedQueries({
    @NamedQuery(name = "ResultExam.findAll", query = "SELECT r FROM ResultExam r"),
    @NamedQuery(name = "ResultExam.findByResultExamId", query = "SELECT r FROM ResultExam r WHERE r.resultExamId = :resultExamId"),
    @NamedQuery(name = "ResultExam.findByStudentName", query = "SELECT r FROM ResultExam r WHERE r.studentName = :studentName"),
    @NamedQuery(name = "ResultExam.findByBirthday", query = "SELECT r FROM ResultExam r WHERE r.birthday = :birthday"),
    @NamedQuery(name = "ResultExam.findByRegistration", query = "SELECT r FROM ResultExam r WHERE r.registration = :registration"),
    @NamedQuery(name = "ResultExam.findByGender", query = "SELECT r FROM ResultExam r WHERE r.gender = :gender"),
    @NamedQuery(name = "ResultExam.findByPhone", query = "SELECT r FROM ResultExam r WHERE r.phone = :phone"),
    @NamedQuery(name = "ResultExam.findByMarkMath", query = "SELECT r FROM ResultExam r WHERE r.markMath = :markMath"),
    @NamedQuery(name = "ResultExam.findByMarkLit", query = "SELECT r FROM ResultExam r WHERE r.markLit = :markLit"),
    @NamedQuery(name = "ResultExam.findByMarkEng", query = "SELECT r FROM ResultExam r WHERE r.markEng = :markEng"),
    @NamedQuery(name = "ResultExam.findByStatus", query = "SELECT r FROM ResultExam r WHERE r.status = :status")})
public class ResultExam implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ResultExamId")
    private Integer resultExamId;
    @Column(name = "StudentName")
    private String studentName;
    @Column(name = "Birthday")
    @Temporal(TemporalType.DATE)
    private Date birthday;
    @Column(name = "Registration")
    private String registration;
    @Column(name = "Gender")
    private String gender;
    @Column(name = "Phone")
    private String phone;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "MarkMath")
    private Double markMath;
    @Column(name = "MarkLit")
    private Double markLit;
    @Column(name = "MarkEng")
    private Double markEng;
    @Column(name = "Status")
    private String status;

    public ResultExam() {
    }

    public ResultExam(Integer resultExamId) {
        this.resultExamId = resultExamId;
    }

    public Integer getResultExamId() {
        return resultExamId;
    }

    public void setResultExamId(Integer resultExamId) {
        this.resultExamId = resultExamId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getRegistration() {
        return registration;
    }

    public void setRegistration(String registration) {
        this.registration = registration;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Double getMarkMath() {
        return markMath;
    }

    public void setMarkMath(Double markMath) {
        this.markMath = markMath;
    }

    public Double getMarkLit() {
        return markLit;
    }

    public void setMarkLit(Double markLit) {
        this.markLit = markLit;
    }

    public Double getMarkEng() {
        return markEng;
    }

    public void setMarkEng(Double markEng) {
        this.markEng = markEng;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (resultExamId != null ? resultExamId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ResultExam)) {
            return false;
        }
        ResultExam other = (ResultExam) object;
        if ((this.resultExamId == null && other.resultExamId != null) || (this.resultExamId != null && !this.resultExamId.equals(other.resultExamId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.ResultExam[ resultExamId=" + resultExamId + " ]";
    }
    
}
