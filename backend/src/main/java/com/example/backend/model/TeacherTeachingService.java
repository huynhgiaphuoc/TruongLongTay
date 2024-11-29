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
@Table(name = "Teacher_Teaching_Service")
@NamedQueries({
    @NamedQuery(name = "TeacherTeachingService.findAll", query = "SELECT t FROM TeacherTeachingService t"),
    @NamedQuery(name = "TeacherTeachingService.findByTeacherteachingserviceID", query = "SELECT t FROM TeacherTeachingService t WHERE t.teacherteachingserviceID = :teacherteachingserviceID"),
    @NamedQuery(name = "TeacherTeachingService.findByNameteacher", query = "SELECT t FROM TeacherTeachingService t WHERE t.nameteacher = :nameteacher"),
    @NamedQuery(name = "TeacherTeachingService.findByPhone", query = "SELECT t FROM TeacherTeachingService t WHERE t.phone = :phone"),
    @NamedQuery(name = "TeacherTeachingService.findByUsername", query = "SELECT t FROM TeacherTeachingService t WHERE t.username = :username"),
    @NamedQuery(name = "TeacherTeachingService.findByEmail", query = "SELECT t FROM TeacherTeachingService t WHERE t.email = :email"),
    @NamedQuery(name = "TeacherTeachingService.findByAddress", query = "SELECT t FROM TeacherTeachingService t WHERE t.address = :address"),
    @NamedQuery(name = "TeacherTeachingService.findByProvince", query = "SELECT t FROM TeacherTeachingService t WHERE t.province = :province"),
    @NamedQuery(name = "TeacherTeachingService.findByDistrict", query = "SELECT t FROM TeacherTeachingService t WHERE t.district = :district"),
    @NamedQuery(name = "TeacherTeachingService.findByCommune", query = "SELECT t FROM TeacherTeachingService t WHERE t.commune = :commune"),
    @NamedQuery(name = "TeacherTeachingService.findByBirthday", query = "SELECT t FROM TeacherTeachingService t WHERE t.birthday = :birthday"),
    @NamedQuery(name = "TeacherTeachingService.findByCccd", query = "SELECT t FROM TeacherTeachingService t WHERE t.cccd = :cccd"),
    @NamedQuery(name = "TeacherTeachingService.findByGender", query = "SELECT t FROM TeacherTeachingService t WHERE t.gender = :gender"),
    @NamedQuery(name = "TeacherTeachingService.findByPassword", query = "SELECT t FROM TeacherTeachingService t WHERE t.password = :password"),
    @NamedQuery(name = "TeacherTeachingService.findByNation", query = "SELECT t FROM TeacherTeachingService t WHERE t.nation = :nation"),
    @NamedQuery(name = "TeacherTeachingService.findByPart", query = "SELECT t FROM TeacherTeachingService t WHERE t.part = :part")})
public class TeacherTeachingService implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "teacherteachingserviceID")
    private Integer teacherteachingserviceID;
    @Column(name = "Nameteacher")
    private String nameteacher;
    @Column(name = "Phone")
    private String phone;
    @Column(name = "Username")
    private String username;
    @Column(name = "Email")
    private String email;
    @Column(name = "Address")
    private String address;
    @Column(name = "Province")
    private String province;
    @Column(name = "District")
    private String district;
    @Column(name = "Commune")
    private String commune;
    @Column(name = "Birthday")
    @Temporal(TemporalType.DATE)
    private Date birthday;
    @Column(name = "Cccd")
    private String cccd;
    @Column(name = "Gender")
    private String gender;
    @Column(name = "Password")
    private String password;
    @Column(name = "Nation")
    private String nation;
    @Column(name = "Part")
    private String part;

    public TeacherTeachingService() {
    }

    public TeacherTeachingService(Integer teacherteachingserviceID) {
        this.teacherteachingserviceID = teacherteachingserviceID;
    }

    public Integer getTeacherteachingserviceID() {
        return teacherteachingserviceID;
    }

    public void setTeacherteachingserviceID(Integer teacherteachingserviceID) {
        this.teacherteachingserviceID = teacherteachingserviceID;
    }

    public String getNameteacher() {
        return nameteacher;
    }

    public void setNameteacher(String nameteacher) {
        this.nameteacher = nameteacher;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getCccd() {
        return cccd;
    }

    public void setCccd(String cccd) {
        this.cccd = cccd;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (teacherteachingserviceID != null ? teacherteachingserviceID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TeacherTeachingService)) {
            return false;
        }
        TeacherTeachingService other = (TeacherTeachingService) object;
        if ((this.teacherteachingserviceID == null && other.teacherteachingserviceID != null) || (this.teacherteachingserviceID != null && !this.teacherteachingserviceID.equals(other.teacherteachingserviceID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.TeacherTeachingService[ teacherteachingserviceID=" + teacherteachingserviceID + " ]";
    }

    public String getPart() {
        return part;
    }

    public void setPart(String part) {
        this.part = part;
    }
    
}
