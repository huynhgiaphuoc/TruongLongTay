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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.Collection;

/**
 *
 * @author USER
 */
@Entity
@Table(name = "Subject_Combination")
public class Subject_Combination implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Subject_CombinationID")
    private Integer subjectCombinationID;
    @Column(name = "Subjects")
    private String subjects;
    @Column(name = "Subject_Combination_Code")
    private String subjectCombinationCode;
    @Column(name = "Study_Topics")
    private String studyTopics;
    @OneToMany(mappedBy = "subjectCombinationID")
    private Collection<Class> classCollection;

    public Subject_Combination() {
    }

    public Subject_Combination(Integer subjectCombinationID) {
        this.subjectCombinationID = subjectCombinationID;
    }

    public Integer getSubjectCombinationID() {
        return subjectCombinationID;
    }

    public void setSubjectCombinationID(Integer subjectCombinationID) {
        this.subjectCombinationID = subjectCombinationID;
    }

    public String getSubjects() {
        return subjects;
    }

    public void setSubjects(String subjects) {
        this.subjects = subjects;
    }

    public String getSubjectCombinationCode() {
        return subjectCombinationCode;
    }

    public void setSubjectCombinationCode(String subjectCombinationCode) {
        this.subjectCombinationCode = subjectCombinationCode;
    }

    public String getStudyTopics() {
        return studyTopics;
    }

    public void setStudyTopics(String studyTopics) {
        this.studyTopics = studyTopics;
    }

    public Collection<Class> getClassCollection() {
        return classCollection;
    }

    public void setClassCollection(Collection<Class> classCollection) {
        this.classCollection = classCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (subjectCombinationID != null ? subjectCombinationID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Subject_Combination)) {
            return false;
        }
        Subject_Combination other = (Subject_Combination) object;
        if ((this.subjectCombinationID == null && other.subjectCombinationID != null) || (this.subjectCombinationID != null && !this.subjectCombinationID.equals(other.subjectCombinationID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.SubjectCombination[ subjectCombinationID=" + subjectCombinationID + " ]";
    }

}
