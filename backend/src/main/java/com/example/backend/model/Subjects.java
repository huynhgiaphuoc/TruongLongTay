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
@Table(name = "Subjects")
public class Subjects implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "SubjectsID")
    private Integer subjectsID;
    @Column(name = "Subjects_Name")
    private String subjectsName;
    @OneToMany(mappedBy = "subjectsID")
    private Collection<TutoringClass> tutoringClassCollection;

    public Subjects() {
    }

    public Subjects(Integer subjectsID) {
        this.subjectsID = subjectsID;
    }

    public Integer getSubjectsID() {
        return subjectsID;
    }

    public void setSubjectsID(Integer subjectsID) {
        this.subjectsID = subjectsID;
    }

    public String getSubjectsName() {
        return subjectsName;
    }

    public void setSubjectsName(String subjectsName) {
        this.subjectsName = subjectsName;
    }

    public Collection<TutoringClass> getTutoringClassCollection() {
        return tutoringClassCollection;
    }

    public void setTutoringClassCollection(Collection<TutoringClass> tutoringClassCollection) {
        this.tutoringClassCollection = tutoringClassCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (subjectsID != null ? subjectsID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Subjects)) {
            return false;
        }
        Subjects other = (Subjects) object;
        if ((this.subjectsID == null && other.subjectsID != null) || (this.subjectsID != null && !this.subjectsID.equals(other.subjectsID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.Subjects[ subjectsID=" + subjectsID + " ]";
    }
    
}
