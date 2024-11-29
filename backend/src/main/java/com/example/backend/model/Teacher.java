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
@Table(name = "Teacher")
@NamedQueries({
    @NamedQuery(name = "Teacher.findAll", query = "SELECT t FROM Teacher t"),
    @NamedQuery(name = "Teacher.findByTeacherID", query = "SELECT t FROM Teacher t WHERE t.teacherID = :teacherId"),
    @NamedQuery(name = "Teacher.findByEmail", query = "SELECT t FROM Teacher t WHERE t.email = :email"),
    @NamedQuery(name = "Teacher.findByBirthday", query = "SELECT t FROM Teacher t WHERE t.birthday = :birthday"),
    @NamedQuery(name = "Teacher.findByNots", query = "SELECT t FROM Teacher t WHERE t.nots = :nots"),
    @NamedQuery(name = "Teacher.findByNation", query = "SELECT t FROM Teacher t WHERE t.nation = :nation"),
    @NamedQuery(name = "Teacher.findByOfficer", query = "SELECT t FROM Teacher t WHERE t.officer = :officer"),
    @NamedQuery(name = "Teacher.findByGender", query = "SELECT t FROM Teacher t WHERE t.gender = :gender"),
    @NamedQuery(name = "Teacher.findByNameTeacher", query = "SELECT t FROM Teacher t WHERE t.nameTeacher = :nameTeacher"),
    @NamedQuery(name = "Teacher.findByRecruiter", query = "SELECT t FROM Teacher t WHERE t.recruiter = :recruiter"),
    @NamedQuery(name = "Teacher.findByHealthInsurance", query = "SELECT t FROM Teacher t WHERE t.healthInsurance = :healthInsurance"),
    @NamedQuery(name = "Teacher.findByPhone", query = "SELECT t FROM Teacher t WHERE t.phone = :phone"),
    @NamedQuery(name = "Teacher.findByRecruitmentDay", query = "SELECT t FROM Teacher t WHERE t.recruitmentDay = :recruitmentDay"),
    @NamedQuery(name = "Teacher.findByContractForm", query = "SELECT t FROM Teacher t WHERE t.contractForm = :contractForm"),
    @NamedQuery(name = "Teacher.findByPassword", query = "SELECT t FROM Teacher t WHERE t.password = :password"),
    @NamedQuery(name = "Teacher.findByPosition", query = "SELECT t FROM Teacher t WHERE t.position = :position"),
    @NamedQuery(name = "Teacher.findByReligion", query = "SELECT t FROM Teacher t WHERE t.religion = :religion"),
    @NamedQuery(name = "Teacher.findByEthnicity", query = "SELECT t FROM Teacher t WHERE t.ethnicity = :ethnicity"),
    @NamedQuery(name = "Teacher.findByCic", query = "SELECT t FROM Teacher t WHERE t.cic = :cic"),
    @NamedQuery(name = "Teacher.findByProvince", query = "SELECT t FROM Teacher t WHERE t.province = :province"),
    @NamedQuery(name = "Teacher.findByDistrict", query = "SELECT t FROM Teacher t WHERE t.district = :district"),
    @NamedQuery(name = "Teacher.findByCommune", query = "SELECT t FROM Teacher t WHERE t.commune = :commune"),
    @NamedQuery(name = "Teacher.findByAvatar", query = "SELECT t FROM Teacher t WHERE t.avatar = :avatar"),
    @NamedQuery(name = "Teacher.findByAvatar1", query = "SELECT t FROM Teacher t WHERE t.avatar1 = :avatar1"),
    @NamedQuery(name = "Teacher.findByAvatar2", query = "SELECT t FROM Teacher t WHERE t.avatar2 = :avatar2"),
    @NamedQuery(name = "Teacher.findByPathAvt", query = "SELECT t FROM Teacher t WHERE t.pathAvt = :pathAvt")})
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "TeacherID")
    private Integer teacherID;
    @Column(name = "Email")
    private String email;
    @Column(name = "Birthday")
    private String birthday;
    @Column(name = "Nots")
    private Integer nots;
    @Column(name = "Nation")
    private String nation;
    @Column(name = "Officer")
    private String officer;
    @Column(name = "Gender")
    private String gender;
    @Column(name = "Name_Teacher")
    private String nameTeacher;
    @Column(name = "Recruiter")
    private String recruiter;
    @Column(name = "Health_Insurance")
    private String healthInsurance;
    @Column(name = "Phone")
    private String phone;
    @Column(name = "Recruitment_Day")
    private String recruitmentDay;
    @Column(name = "Contract_Form")
    private String contractForm;
    @Column(name = "Password")
    private String password;
    @Column(name = "Position")
    private String position;
    @Column(name = "Religion")
    private String religion;
    @Column(name = "Ethnicity")
    private String ethnicity;
    @Column(name = "Cic")
    private String cic;
    @Column(name = "Province")
    private String province;
    @Column(name = "District")
    private String district;
    @Column(name = "Commune")
    private String commune;
    @Column(name = "Avatar")
    private String avatar;
    @Column(name = "Avatar1")
    private String avatar1;
    @Column(name = "Avatar2")
    private String avatar2;
    @Column(name = "PathAvt")
    private String pathAvt;
    @JoinColumn(name = "EducationOfTeacherID", referencedColumnName = "EducationOfTeacherID")
    @ManyToOne
    private EducationOfTeacher educationOfTeacherID;
    @JoinColumn(name = "teacherteachingserviceID", referencedColumnName = "teacherteachingserviceID")
    @ManyToOne
    private TeacherTeachingService teacherteachingserviceID;

    public Teacher() {
    }

    public Teacher(Integer teacherID) {
        this.teacherID = teacherID;
    }

    public Integer getTeacherID() {
        return teacherID;
    }

    public void setTeacherID(Integer teacherID) {
        this.teacherID = teacherID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public Integer getNots() {
        return nots;
    }

    public void setNots(Integer nots) {
        this.nots = nots;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getOfficer() {
        return officer;
    }

    public void setOfficer(String officer) {
        this.officer = officer;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getNameTeacher() {
        return nameTeacher;
    }

    public void setNameTeacher(String nameTeacher) {
        this.nameTeacher = nameTeacher;
    }

    public String getRecruiter() {
        return recruiter;
    }

    public void setRecruiter(String recruiter) {
        this.recruiter = recruiter;
    }

    public String getHealthInsurance() {
        return healthInsurance;
    }

    public void setHealthInsurance(String healthInsurance) {
        this.healthInsurance = healthInsurance;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRecruitmentDay() {
        return recruitmentDay;
    }

    public void setRecruitmentDay(String recruitmentDay) {
        this.recruitmentDay = recruitmentDay;
    }

    public String getContractForm() {
        return contractForm;
    }

    public void setContractForm(String contractForm) {
        this.contractForm = contractForm;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getEthnicity() {
        return ethnicity;
    }

    public void setEthnicity(String ethnicity) {
        this.ethnicity = ethnicity;
    }

    public String getCic() {
        return cic;
    }

    public void setCic(String cic) {
        this.cic = cic;
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

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAvatar1() {
        return avatar1;
    }

    public void setAvatar1(String avatar1) {
        this.avatar1 = avatar1;
    }

    public String getAvatar2() {
        return avatar2;
    }

    public void setAvatar2(String avatar2) {
        this.avatar2 = avatar2;
    }

    public String getPathAvt() {
        return pathAvt;
    }

    public void setPathAvt(String pathAvt) {
        this.pathAvt = pathAvt;
    }

    public EducationOfTeacher getEducationOfTeacherID() {
        return educationOfTeacherID;
    }

    public void setEducationOfTeacherID(EducationOfTeacher educationOfTeacherID) {
        this.educationOfTeacherID = educationOfTeacherID;
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
        hash += (teacherID != null ? teacherID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Teacher)) {
            return false;
        }
        Teacher other = (Teacher) object;
        if ((this.teacherID == null && other.teacherID != null) || (this.teacherID != null && !this.teacherID.equals(other.teacherID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.Teacher[ teacherID=" + teacherID + " ]";
    }
    
}
