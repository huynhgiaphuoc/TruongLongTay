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
@Table(name = "Students")
@NamedQueries({
    @NamedQuery(name = "Students.findAll", query = "SELECT s FROM Students s"),
    @NamedQuery(name = "Students.findByStudentID", query = "SELECT s FROM Students s WHERE s.studentID = :studentID"),
    @NamedQuery(name = "Students.findByStudentName", query = "SELECT s FROM Students s WHERE s.studentName = :studentName"),
    @NamedQuery(name = "Students.findByEmail", query = "SELECT s FROM Students s WHERE s.email = :email"),
    @NamedQuery(name = "Students.findByPhone", query = "SELECT s FROM Students s WHERE s.phone = :phone"),
    @NamedQuery(name = "Students.findByRollno", query = "SELECT s FROM Students s WHERE s.rollno = :rollno"),
    @NamedQuery(name = "Students.findByBirthday", query = "SELECT s FROM Students s WHERE s.birthday = :birthday"),
    @NamedQuery(name = "Students.findByCccd", query = "SELECT s FROM Students s WHERE s.cccd = :cccd"),
    @NamedQuery(name = "Students.findByAverageofallsubjects", query = "SELECT s FROM Students s WHERE s.averageofallsubjects = :averageofallsubjects"),
    @NamedQuery(name = "Students.findByGender", query = "SELECT s FROM Students s WHERE s.gender = :gender"),
    @NamedQuery(name = "Students.findByPassword", query = "SELECT s FROM Students s WHERE s.password = :password"),
    @NamedQuery(name = "Students.findByStudentTittle", query = "SELECT s FROM Students s WHERE s.studentTittle = :studentTittle"),
    @NamedQuery(name = "Students.findByConduct", query = "SELECT s FROM Students s WHERE s.conduct = :conduct"),
    @NamedQuery(name = "Students.findByStudentStatus", query = "SELECT s FROM Students s WHERE s.studentStatus = :studentStatus"),
    @NamedQuery(name = "Students.findByReligion", query = "SELECT s FROM Students s WHERE s.religion = :religion"),
    @NamedQuery(name = "Students.findByDadName", query = "SELECT s FROM Students s WHERE s.dadName = :dadName"),
    @NamedQuery(name = "Students.findByMomName", query = "SELECT s FROM Students s WHERE s.momName = :momName"),
    @NamedQuery(name = "Students.findByJobdad", query = "SELECT s FROM Students s WHERE s.jobdad = :jobdad"),
    @NamedQuery(name = "Students.findByJobmom", query = "SELECT s FROM Students s WHERE s.jobmom = :jobmom"),
    @NamedQuery(name = "Students.findByParentPhone", query = "SELECT s FROM Students s WHERE s.parentPhone = :parentPhone"),
    @NamedQuery(name = "Students.findByParentPhone2", query = "SELECT s FROM Students s WHERE s.parentPhone2 = :parentPhone2"),
    @NamedQuery(name = "Students.findByStudentavatar", query = "SELECT s FROM Students s WHERE s.studentavatar = :studentavatar"),
    @NamedQuery(name = "Students.findByPlace", query = "SELECT s FROM Students s WHERE s.place = :place"),
    @NamedQuery(name = "Students.findByEthnicity", query = "SELECT s FROM Students s WHERE s.ethnicity = :ethnicity"),
    @NamedQuery(name = "Students.findByTemporaryAddress", query = "SELECT s FROM Students s WHERE s.temporaryAddress = :temporaryAddress"),
    @NamedQuery(name = "Students.findByPermanentAddress", query = "SELECT s FROM Students s WHERE s.permanentAddress = :permanentAddress"),
    @NamedQuery(name = "Students.findByProvince", query = "SELECT s FROM Students s WHERE s.province = :province"),
    @NamedQuery(name = "Students.findByDistrict", query = "SELECT s FROM Students s WHERE s.district = :district"),
    @NamedQuery(name = "Students.findByCommune", query = "SELECT s FROM Students s WHERE s.commune = :commune"),
    @NamedQuery(name = "Students.findByAdmissionForm", query = "SELECT s FROM Students s WHERE s.admissionForm = :admissionForm"),
    @NamedQuery(name = "Students.findByMoec", query = "SELECT s FROM Students s WHERE s.moec = :moec"),
    @NamedQuery(name = "Students.findByGroupSubject", query = "SELECT s FROM Students s WHERE s.groupSubject = :groupSubject"),
    @NamedQuery(name = "Students.findByPart", query = "SELECT s FROM Students s WHERE s.part = :part")})
public class Students implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "StudentID")
    private Integer studentID;
    @Column(name = "Student_Name")
    private String studentName;
    @Column(name = "Email")
    private String email;
    @Column(name = "Phone")
    private String phone;
    @Column(name = "Rollno")
    private String rollno;
    @Column(name = "Birthday")
    @Temporal(TemporalType.DATE)
    private Date birthday;
    @Column(name = "Cccd")
    private String cccd;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Averageofallsubjects")
    private Double averageofallsubjects;
    @Column(name = "Gender")
    private String gender;
    @Column(name = "Password")
    private String password;
    @Column(name = "Student_Tittle")
    private String studentTittle;
    @Column(name = "Conduct")
    private String conduct;
    @Column(name = "Student_Status")
    private String studentStatus;
    @Column(name = "Religion")
    private String religion;
    @Column(name = "Dad_Name")
    private String dadName;
    @Column(name = "Mom_Name")
    private String momName;
    @Column(name = "Jobdad")
    private String jobdad;
    @Column(name = "Jobmom")
    private String jobmom;
    @Column(name = "Parent_Phone")
    private String parentPhone;
    @Column(name = "Parent_Phone2")
    private String parentPhone2;
    @Column(name = "Student_avatar")
    private String studentavatar;
    @Column(name = "Place")
    private String place;
    @Column(name = "Ethnicity")
    private String ethnicity;
    @Column(name = "Temporary_Address")
    private String temporaryAddress;
    @Column(name = "Permanent_Address")
    private String permanentAddress;
    @Column(name = "Province")
    private String province;
    @Column(name = "District")
    private String district;
    @Column(name = "Commune")
    private String commune;
    @Column(name = "Admission_Form")
    private String admissionForm;
    @Column(name = "MOEC")
    private String moec;
    @Column(name = "Group_Subject")
    private String groupSubject;
    @Column(name = "Part")
    private String part;
    @JoinColumn(name = "ClassID", referencedColumnName = "ClassID")
    @ManyToOne
    private Class classID;
    @JoinColumn(name = "Tutoring_ClassID", referencedColumnName = "Tutoring_ClassID")
    @ManyToOne
    private TutoringClass tutoringClassID;

    public Students() {
    }

    public Students(Integer studentID) {
        this.studentID = studentID;
    }

    public Integer getStudentID() {
        return studentID;
    }

    public void setStudentID(Integer studentID) {
        this.studentID = studentID;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRollno() {
        return rollno;
    }

    public void setRollno(String rollno) {
        this.rollno = rollno;
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

    public Double getAverageofallsubjects() {
        return averageofallsubjects;
    }

    public void setAverageofallsubjects(Double averageofallsubjects) {
        this.averageofallsubjects = averageofallsubjects;
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

    public String getStudentTittle() {
        return studentTittle;
    }

    public void setStudentTittle(String studentTittle) {
        this.studentTittle = studentTittle;
    }

    public String getConduct() {
        return conduct;
    }

    public void setConduct(String conduct) {
        this.conduct = conduct;
    }

    public String getStudentStatus() {
        return studentStatus;
    }

    public void setStudentStatus(String studentStatus) {
        this.studentStatus = studentStatus;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getDadName() {
        return dadName;
    }

    public void setDadName(String dadName) {
        this.dadName = dadName;
    }

    public String getMomName() {
        return momName;
    }

    public void setMomName(String momName) {
        this.momName = momName;
    }

    public String getJobdad() {
        return jobdad;
    }

    public void setJobdad(String jobdad) {
        this.jobdad = jobdad;
    }

    public String getJobmom() {
        return jobmom;
    }

    public void setJobmom(String jobmom) {
        this.jobmom = jobmom;
    }

    public String getParentPhone() {
        return parentPhone;
    }

    public void setParentPhone(String parentPhone) {
        this.parentPhone = parentPhone;
    }

    public String getParentPhone2() {
        return parentPhone2;
    }

    public void setParentPhone2(String parentPhone2) {
        this.parentPhone2 = parentPhone2;
    }

    public String getStudentavatar() {
        return studentavatar;
    }

    public void setStudentavatar(String studentavatar) {
        this.studentavatar = studentavatar;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getEthnicity() {
        return ethnicity;
    }

    public void setEthnicity(String ethnicity) {
        this.ethnicity = ethnicity;
    }

    public String getTemporaryAddress() {
        return temporaryAddress;
    }

    public void setTemporaryAddress(String temporaryAddress) {
        this.temporaryAddress = temporaryAddress;
    }

    public String getPermanentAddress() {
        return permanentAddress;
    }

    public void setPermanentAddress(String permanentAddress) {
        this.permanentAddress = permanentAddress;
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

    public String getAdmissionForm() {
        return admissionForm;
    }

    public void setAdmissionForm(String admissionForm) {
        this.admissionForm = admissionForm;
    }

    public String getMoec() {
        return moec;
    }

    public void setMoec(String moec) {
        this.moec = moec;
    }

    public String getGroupSubject() {
        return groupSubject;
    }

    public void setGroupSubject(String groupSubject) {
        this.groupSubject = groupSubject;
    }

    public String getPart() {
        return part;
    }

    public void setPart(String part) {
        this.part = part;
    }

    public Class getClassID() {
        return classID;
    }

    public void setClassID(Class classID) {
        this.classID = classID;
    }

    public TutoringClass getTutoringClassID() {
        return tutoringClassID;
    }

    public void setTutoringClassID(TutoringClass tutoringClassID) {
        this.tutoringClassID = tutoringClassID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (studentID != null ? studentID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Students)) {
            return false;
        }
        Students other = (Students) object;
        if ((this.studentID == null && other.studentID != null) || (this.studentID != null && !this.studentID.equals(other.studentID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.Students[ studentID=" + studentID + " ]";
    }
    
}
