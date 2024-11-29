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
@Table(name = "Slide")
@NamedQueries({
    @NamedQuery(name = "Slide.findAll", query = "SELECT s FROM Slide s"),
    @NamedQuery(name = "Slide.findBySlideID", query = "SELECT s FROM Slide s WHERE s.slideID = :slideID"),
    @NamedQuery(name = "Slide.findBySlideImage", query = "SELECT s FROM Slide s WHERE s.slideImage = :slideImage"),
    @NamedQuery(name = "Slide.findBySlidePath", query = "SELECT s FROM Slide s WHERE s.slidePath = :slidePath"),
    @NamedQuery(name = "Slide.findByTitle", query = "SELECT s FROM Slide s WHERE s.title = :title"),
    @NamedQuery(name = "Slide.findByDescript", query = "SELECT s FROM Slide s WHERE s.descript = :descript")})
public class Slide implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "SlideID")
    private Integer slideID;
    @Column(name = "slideImage")
    private String slideImage;
    @Column(name = "SlidePath")
    private String slidePath;
    @Column(name = "Title")
    private String title;
    @Column(name = "Descript")
    private String descript;

    public Slide() {
    }

    public Slide(Integer slideID) {
        this.slideID = slideID;
    }

    public Integer getSlideID() {
        return slideID;
    }

    public void setSlideID(Integer slideID) {
        this.slideID = slideID;
    }

    public String getSlideImage() {
        return slideImage;
    }

    public void setSlideImage(String slideImage) {
        this.slideImage = slideImage;
    }

    public String getSlidePath() {
        return slidePath;
    }

    public void setSlidePath(String slidePath) {
        this.slidePath = slidePath;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescript() {
        return descript;
    }

    public void setDescript(String descript) {
        this.descript = descript;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (slideID != null ? slideID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Slide)) {
            return false;
        }
        Slide other = (Slide) object;
        if ((this.slideID == null && other.slideID != null) || (this.slideID != null && !this.slideID.equals(other.slideID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.Slide[ slideID=" + slideID + " ]";
    }
    
}
