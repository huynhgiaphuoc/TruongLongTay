/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.Collection;

/**
 *
 * @author USER
 */
@Entity
@Table(name = "Class")
public class Class implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ClassID")
    private Integer classID;
    @Column(name = "Class_Code")
    private String classCode;
    @Column(name = "Class_Name")
    private String className;
    @Column(name = "Sic")
    private Integer Sic;
    @OneToMany(mappedBy = "classID")
    private Collection<Students> studentsCollection;
    @JoinColumn(name = "Subject_CombinationID", referencedColumnName = "Subject_CombinationID")
    @ManyToOne
    private Subject_Combination subjectCombinationID;

    public Class() {
    }

    public Class(Integer classID) {
        this.classID = classID;
    }

    public Integer getClassID() {
        return classID;
    }

    public void setClassID(Integer classID) {
        this.classID = classID;
    }

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

 

    public Collection<Students> getStudentsCollection() {
        return studentsCollection;
    }

    public void setStudentsCollection(Collection<Students> studentsCollection) {
        this.studentsCollection = studentsCollection;
    }

    public Subject_Combination getSubjectCombinationID() {
        return subjectCombinationID;
    }

    public void setSubjectCombinationID(Subject_Combination subjectCombinationID) {
        this.subjectCombinationID = subjectCombinationID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (classID != null ? classID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Class)) {
            return false;
        }
        Class other = (Class) object;
        if ((this.classID == null && other.classID != null) || (this.classID != null && !this.classID.equals(other.classID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.Class[ classID=" + classID + " ]";
    }

    public Integer getSic() {
        return Sic;
    }

    public void setSic(Integer Sic) {
        this.Sic = Sic;
    }

}
