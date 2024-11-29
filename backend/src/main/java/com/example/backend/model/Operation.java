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
@Table(name = "Operation")
@NamedQueries({
    @NamedQuery(name = "Operation.findAll", query = "SELECT o FROM Operation o"),
    @NamedQuery(name = "Operation.findByOperationID", query = "SELECT o FROM Operation o WHERE o.operationID = :operationID")})
public class Operation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "OperationID")
    private Integer operationID;
    @JoinColumn(name = "ClassID", referencedColumnName = "ClassID")
    @ManyToOne
    private Class classID;
    @JoinColumn(name = "Teacher_SubjectID", referencedColumnName = "Teacher_SubjectID")
    @ManyToOne
    private TeacherSubject teacherSubjectID;

    public Operation() {
    }

    public Operation(Integer operationID) {
        this.operationID = operationID;
    }

    public Integer getOperationID() {
        return operationID;
    }

    public void setOperationID(Integer operationID) {
        this.operationID = operationID;
    }

    public Class getClassID() {
        return classID;
    }

    public void setClassID(Class classID) {
        this.classID = classID;
    }

    public TeacherSubject getTeacherSubjectID() {
        return teacherSubjectID;
    }

    public void setTeacherSubjectID(TeacherSubject teacherSubjectID) {
        this.teacherSubjectID = teacherSubjectID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (operationID != null ? operationID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Operation)) {
            return false;
        }
        Operation other = (Operation) object;
        if ((this.operationID == null && other.operationID != null) || (this.operationID != null && !this.operationID.equals(other.operationID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.Operation[ operationID=" + operationID + " ]";
    }
    
}
