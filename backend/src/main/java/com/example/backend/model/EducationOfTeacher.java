/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 *
 * @author Admin
 */
@Entity
@Table(name = "EducationOfTeacher")
@NamedQueries({
    @NamedQuery(name = "EducationOfTeacher.findAll", query = "SELECT e FROM EducationOfTeacher e"),
    @NamedQuery(name = "EducationOfTeacher.findByEducationOfTeacherID", query = "SELECT e FROM EducationOfTeacher e WHERE e.educationOfTeacherID = :educationOfTeacherID"),
    @NamedQuery(name = "EducationOfTeacher.findBySpl", query = "SELECT e FROM EducationOfTeacher e WHERE e.spl = :spl"),
    @NamedQuery(name = "EducationOfTeacher.findByUniondm", query = "SELECT e FROM EducationOfTeacher e WHERE e.union = :union"),
    @NamedQuery(name = "EducationOfTeacher.findByDegree", query = "SELECT e FROM EducationOfTeacher e WHERE e.degree = :degree"),
    @NamedQuery(name = "EducationOfTeacher.findByMainMajor", query = "SELECT e FROM EducationOfTeacher e WHERE e.mainMajor = :mainMajor"),
    @NamedQuery(name = "EducationOfTeacher.findByOsq", query = "SELECT e FROM EducationOfTeacher e WHERE e.osq = :osq"),
    @NamedQuery(name = "EducationOfTeacher.findByTechnologyLevel", query = "SELECT e FROM EducationOfTeacher e WHERE e.technologyLevel = :technologyLevel"),
    @NamedQuery(name = "EducationOfTeacher.findByEml", query = "SELECT e FROM EducationOfTeacher e WHERE e.eml = :eml"),
    @NamedQuery(name = "EducationOfTeacher.findBySeniorityAllowance", query = "SELECT e FROM EducationOfTeacher e WHERE e.seniorityAllowance = :seniorityAllowance"),
    @NamedQuery(name = "EducationOfTeacher.findByPtl", query = "SELECT e FROM EducationOfTeacher e WHERE e.ptl = :ptl"),
    @NamedQuery(name = "EducationOfTeacher.findBySalaryCoefficient", query = "SELECT e FROM EducationOfTeacher e WHERE e.salaryCoefficient = :salaryCoefficient"),
    @NamedQuery(name = "EducationOfTeacher.findByLevelSalary", query = "SELECT e FROM EducationOfTeacher e WHERE e.levelSalary = :levelSalary"),
    @NamedQuery(name = "EducationOfTeacher.findBySalaryDays", query = "SELECT e FROM EducationOfTeacher e WHERE e.salaryDays = :salaryDays"),
    @NamedQuery(name = "EducationOfTeacher.findByQuota", query = "SELECT e FROM EducationOfTeacher e WHERE e.quota = :quota"),
    @NamedQuery(name = "EducationOfTeacher.findByMml", query = "SELECT e FROM EducationOfTeacher e WHERE e.mml = :mml"),
    @NamedQuery(name = "EducationOfTeacher.findByMfl", query = "SELECT e FROM EducationOfTeacher e WHERE e.mfl = :mfl"),
    @NamedQuery(name = "EducationOfTeacher.findByJia", query = "SELECT e FROM EducationOfTeacher e WHERE e.jia = :jia"),
    @NamedQuery(name = "EducationOfTeacher.findBySst", query = "SELECT e FROM EducationOfTeacher e WHERE e.sst = :sst"),
    @NamedQuery(name = "EducationOfTeacher.findByOtherMajors", query = "SELECT e FROM EducationOfTeacher e WHERE e.otherMajors = :otherMajors"),
    @NamedQuery(name = "EducationOfTeacher.findByParty", query = "SELECT e FROM EducationOfTeacher e WHERE e.party = :party")})
public class EducationOfTeacher implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "EducationOfTeacherID")
    private Integer educationOfTeacherID;
    @Column(name = "Spl")
    private String spl;
    @Column(name = "Uniondm")
    private String union;
    @Column(name = "Degree")
    private String degree;
    @Column(name = "MainMajor")
    private String mainMajor;
    @Column(name = "Osq")
    private String osq;
    @Column(name = "TechnologyLevel")
    private String technologyLevel;
    @Column(name = "Eml")
    private String eml;
    @Column(name = "SeniorityAllowance")
    private String seniorityAllowance;
    @Column(name = "Ptl")
    private String ptl;
    @Column(name = "SalaryCoefficient")
    private String salaryCoefficient;
    @Column(name = "LevelSalary")
    private String levelSalary;
    @Column(name = "SalaryDays")
    private String salaryDays;
    @Column(name = "Quota")
    private String quota;
    @Column(name = "Mml")
    private String mml;
    @Column(name = "Mfl")
    private String mfl;
    @Column(name = "Jia")
    private String jia;
    @Column(name = "Sst")
    private String sst;
    @Column(name = "OtherMajors")
    private String otherMajors;
    @Column(name = "Party")
    private String party;
    @OneToMany(mappedBy = "educationOfTeacherID")
    private Collection<Teacher> teacherCollection;

    public EducationOfTeacher() {
    }

    public EducationOfTeacher(Integer educationOfTeacherID) {
        this.educationOfTeacherID = educationOfTeacherID;
    }

    public Integer getEducationOfTeacherID() {
        return educationOfTeacherID;
    }

    public void setEducationOfTeacherID(Integer educationOfTeacherID) {
        this.educationOfTeacherID = educationOfTeacherID;
    }

    public String getSpl() {
        return spl;
    }

    public void setSpl(String spl) {
        this.spl = spl;
    }

    public String getUnion() {
        return union;
    }

    public void setUnion(String union) {
        this.union = union;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getMainMajor() {
        return mainMajor;
    }

    public void setMainMajor(String mainMajor) {
        this.mainMajor = mainMajor;
    }

    public String getOsq() {
        return osq;
    }

    public void setOsq(String osq) {
        this.osq = osq;
    }

    public String getTechnologyLevel() {
        return technologyLevel;
    }

    public void setTechnologyLevel(String technologyLevel) {
        this.technologyLevel = technologyLevel;
    }

    public String getEml() {
        return eml;
    }

    public void setEml(String eml) {
        this.eml = eml;
    }

    public String getSeniorityAllowance() {
        return seniorityAllowance;
    }

    public void setSeniorityAllowance(String seniorityAllowance) {
        this.seniorityAllowance = seniorityAllowance;
    }

    public String getPtl() {
        return ptl;
    }

    public void setPtl(String ptl) {
        this.ptl = ptl;
    }

    public String getSalaryCoefficient() {
        return salaryCoefficient;
    }

    public void setSalaryCoefficient(String salaryCoefficient) {
        this.salaryCoefficient = salaryCoefficient;
    }

    public String getLevelSalary() {
        return levelSalary;
    }

    public void setLevelSalary(String levelSalary) {
        this.levelSalary = levelSalary;
    }

    public String getSalaryDays() {
        return salaryDays;
    }

    public void setSalaryDays(String salaryDays) {
        this.salaryDays = salaryDays;
    }

    public String getQuota() {
        return quota;
    }

    public void setQuota(String quota) {
        this.quota = quota;
    }

    public String getMml() {
        return mml;
    }

    public void setMml(String mml) {
        this.mml = mml;
    }

    public String getMfl() {
        return mfl;
    }

    public void setMfl(String mfl) {
        this.mfl = mfl;
    }

    public String getJia() {
        return jia;
    }

    public void setJia(String jia) {
        this.jia = jia;
    }

    public String getSst() {
        return sst;
    }

    public void setSst(String sst) {
        this.sst = sst;
    }

    public String getOtherMajors() {
        return otherMajors;
    }

    public void setOtherMajors(String otherMajors) {
        this.otherMajors = otherMajors;
    }

    public String getParty() {
        return party;
    }

    public void setParty(String party) {
        this.party = party;
    }

    public Collection<Teacher> getTeacherCollection() {
        return teacherCollection;
    }

    public void setTeacherCollection(Collection<Teacher> teacherCollection) {
        this.teacherCollection = teacherCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (educationOfTeacherID != null ? educationOfTeacherID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof EducationOfTeacher)) {
            return false;
        }
        EducationOfTeacher other = (EducationOfTeacher) object;
        if ((this.educationOfTeacherID == null && other.educationOfTeacherID != null) || (this.educationOfTeacherID != null && !this.educationOfTeacherID.equals(other.educationOfTeacherID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.EducationOfTeacher[ educationOfTeacherID=" + educationOfTeacherID + " ]";
    }
    
}
