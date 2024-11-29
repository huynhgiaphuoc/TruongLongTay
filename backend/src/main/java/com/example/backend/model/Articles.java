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
@Table(name = "Articles")
@NamedQueries({
    @NamedQuery(name = "Articles.findAll", query = "SELECT a FROM Articles a"),
    @NamedQuery(name = "Articles.findByArticlesid", query = "SELECT a FROM Articles a WHERE a.articlesid = :articlesid"),
    @NamedQuery(name = "Articles.findByTitle", query = "SELECT a FROM Articles a WHERE a.title = :title"),
    @NamedQuery(name = "Articles.findByContent", query = "SELECT a FROM Articles a WHERE a.content = :content"),
    @NamedQuery(name = "Articles.findByCategory", query = "SELECT a FROM Articles a WHERE a.category = :category"),
    @NamedQuery(name = "Articles.findByCreateat", query = "SELECT a FROM Articles a WHERE a.createat = :createat"),
    @NamedQuery(name = "Articles.findByUpdateat", query = "SELECT a FROM Articles a WHERE a.updateat = :updateat"),
    @NamedQuery(name = "Articles.findByPublished", query = "SELECT a FROM Articles a WHERE a.published = :published"),
    @NamedQuery(name = "Articles.findByNamefile", query = "SELECT a FROM Articles a WHERE a.namefile = :namefile"),
    @NamedQuery(name = "Articles.findByDateUp", query = "SELECT a FROM Articles a WHERE a.dateUp = :dateUp")})
public class Articles implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Articlesid")
    private Integer articlesid;
    @Column(name = "Title")
    private String title;
    @Column(name = "Content")
    private String content;
    @Column(name = "Category")
    private String category;
    @Column(name = "Createat")
    @Temporal(TemporalType.TIME)
    private Date createat;
    @Column(name = "Updateat")
    @Temporal(TemporalType.TIME)
    private Date updateat;
    @Column(name = "Published")
    private String published;
    @Column(name = "Namefile")
    private String namefile;
    @Column(name = "date_up")
    @Temporal(TemporalType.DATE)
    private Date dateUp;
    @JoinColumn(name = "teacherteachingserviceID", referencedColumnName = "teacherteachingserviceID")
    @ManyToOne
    private TeacherTeachingService teacherteachingserviceID;

    public Articles() {
    }

    public Articles(Integer articlesid) {
        this.articlesid = articlesid;
    }

    public Integer getArticlesid() {
        return articlesid;
    }

    public void setArticlesid(Integer articlesid) {
        this.articlesid = articlesid;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getCreateat() {
        return createat;
    }

    public void setCreateat(Date createat) {
        this.createat = createat;
    }

    public Date getUpdateat() {
        return updateat;
    }

    public void setUpdateat(Date updateat) {
        this.updateat = updateat;
    }

    public String getPublished() {
        return published;
    }

    public void setPublished(String published) {
        this.published = published;
    }

    public String getNamefile() {
        return namefile;
    }

    public void setNamefile(String namefile) {
        this.namefile = namefile;
    }

    public Date getDateUp() {
        return dateUp;
    }

    public void setDateUp(Date dateUp) {
        this.dateUp = dateUp;
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
        hash += (articlesid != null ? articlesid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Articles)) {
            return false;
        }
        Articles other = (Articles) object;
        if ((this.articlesid == null && other.articlesid != null) || (this.articlesid != null && !this.articlesid.equals(other.articlesid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.Articles[ articlesid=" + articlesid + " ]";
    }

    public void setTeacherTeachingService(TeacherTeachingService teacher) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
