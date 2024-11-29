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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;
/**
 *
 * @author HONGGAM
 */
@Entity
@Table(name = "Document")
@NamedQueries({
    @NamedQuery(name = "Document.findAll", query = "SELECT d FROM Document d"),
    @NamedQuery(name = "Document.findByDocumentId", query = "SELECT d FROM Document d WHERE d.documentId = :documentId"),
    @NamedQuery(name = "Document.findByTitle", query = "SELECT d FROM Document d WHERE d.title = :title"),
    @NamedQuery(name = "Document.findByNumber", query = "SELECT d FROM Document d WHERE d.number = :number"),
    @NamedQuery(name = "Document.findByScope", query = "SELECT d FROM Document d WHERE d.scope = :scope"),
    @NamedQuery(name = "Document.findByStartDate", query = "SELECT d FROM Document d WHERE d.startDate = :startDate"),
    @NamedQuery(name = "Document.findByType", query = "SELECT d FROM Document d WHERE d.type = :type"),
    @NamedQuery(name = "Document.findByLink", query = "SELECT d FROM Document d WHERE d.link = :link"),
    @NamedQuery(name = "Document.findByDescrip", query = "SELECT d FROM Document d WHERE d.descrip = :descrip"),
    @NamedQuery(name = "Document.findByOrgan", query = "SELECT d FROM Document d WHERE d.organ = :organ"),
    @NamedQuery(name = "Document.findByRelease", query = "SELECT d FROM Document d WHERE d.release = :release"),
    @NamedQuery(name = "Document.findByStatus", query = "SELECT d FROM Document d WHERE d.status = :status"),
    @NamedQuery(name = "Document.findBySignature", query = "SELECT d FROM Document d WHERE d.signature = :signature")})
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "DocumentId")
    private Integer documentId;
    @Column(name = "Title")
    private String title;
    @Column(name = "Number")
    private String number;
    @Column(name = "Scope")
    private String scope;
    @Column(name = "StartDate")
    @Temporal(TemporalType.DATE)
    private Date startDate;
    @Column(name = "Type")
    private String type;
    @Column(name = "Link")
    private String link;
    @Column(name = "Descrip")
    private String descrip;
    @Column(name = "Organ")
    private String organ;
    @Column(name = "Release")
    @Temporal(TemporalType.DATE)
    private Date release;
    @Column(name = "Status")
    private String status;
    @Column(name = "Signature")
    private String signature;
    @JoinColumn(name = "teacherteachingserviceID", referencedColumnName = "teacherteachingserviceID")
    @ManyToOne
    private TeacherTeachingService teacherteachingserviceID;

    public Document() {
    }

    public Document(Integer documentId) {
        this.documentId = documentId;
    }

    public Integer getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Integer documentId) {
        this.documentId = documentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDescrip() {
        return descrip;
    }

    public void setDescrip(String descrip) {
        this.descrip = descrip;
    }

    public String getOrgan() {
        return organ;
    }

    public void setOrgan(String organ) {
        this.organ = organ;
    }

    public Date getRelease() {
        return release;
    }

    public void setRelease(Date release) {
        this.release = release;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public TeacherTeachingService getTeacherteachingserviceID() {
        return teacherteachingserviceID;
    }

    public void setTeacherteachingserviceID(TeacherTeachingService teacherteachingserviceID) {
        this.teacherteachingserviceID = teacherteachingserviceID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (documentId != null ? documentId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Document)) {
            return false;
        }
        Document other = (Document) object;
        if ((this.documentId == null && other.documentId != null) || (this.documentId != null && !this.documentId.equals(other.documentId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.Document[ documentId=" + documentId + " ]";
    }
    
}
