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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "RecordApplication")
@NamedQueries({
    @NamedQuery(name = "RecordApplication.findAll", query = "SELECT r FROM RecordApplication r"),
    @NamedQuery(name = "RecordApplication.findByRecordApplicationID", query = "SELECT r FROM RecordApplication r WHERE r.recordApplicationID = :recordApplicationID"),
    @NamedQuery(name = "RecordApplication.findByTitle", query = "SELECT r FROM RecordApplication r WHERE r.title = :title"),
    @NamedQuery(name = "RecordApplication.findByContent", query = "SELECT r FROM RecordApplication r WHERE r.content = :content"),
    @NamedQuery(name = "RecordApplication.findByDateMakeApplication", query = "SELECT r FROM RecordApplication r WHERE r.dateMakeApplication = :dateMakeApplication"),
    @NamedQuery(name = "RecordApplication.findBySt", query = "SELECT r FROM RecordApplication r WHERE r.st = :st")})
public class RecordApplication implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "RecordApplicationID")
    private Integer recordApplicationID;
    @Column(name = "Title")
    private String title;
    @Column(name = "Content")
    private String content;
    @Column(name = "DateMakeApplication")
    @Temporal(TemporalType.DATE)
    private Date dateMakeApplication;
    @Column(name = "St")
    private String st;
    @JoinColumn(name = "StudentID", referencedColumnName = "StudentID")
    @ManyToOne
    private Students studentID;
    @JoinColumn(name = "TeacherID", referencedColumnName = "TeacherID")
    @ManyToOne
    private Teacher teacherID;

    public RecordApplication() {
    }

    public RecordApplication(Integer recordApplicationID) {
        this.recordApplicationID = recordApplicationID;
    }

    public Integer getRecordApplicationID() {
        return recordApplicationID;
    }

    public void setRecordApplicationID(Integer recordApplicationID) {
        this.recordApplicationID = recordApplicationID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDateMakeApplication() {
        return dateMakeApplication;
    }

    public void setDateMakeApplication(Date dateMakeApplication) {
        this.dateMakeApplication = dateMakeApplication;
    }

    public String getSt() {
        return st;
    }

    public void setSt(String st) {
        this.st = st;
    }

    public Students getStudentID() {
        return studentID;
    }

    public void setStudentID(Students studentID) {
        this.studentID = studentID;
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
        hash += (recordApplicationID != null ? recordApplicationID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof RecordApplication)) {
            return false;
        }
        RecordApplication other = (RecordApplication) object;
        if ((this.recordApplicationID == null && other.recordApplicationID != null) || (this.recordApplicationID != null && !this.recordApplicationID.equals(other.recordApplicationID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.RecordApplication[ recordApplicationID=" + recordApplicationID + " ]";
    }
    
}
