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
@Table(name = "Schedule")
@NamedQueries({
    @NamedQuery(name = "Schedule.findAll", query = "SELECT s FROM Schedule s"),
    @NamedQuery(name = "Schedule.findByScheduleID", query = "SELECT s FROM Schedule s WHERE s.scheduleID = :scheduleID"),
    @NamedQuery(name = "Schedule.findByDaystart", query = "SELECT s FROM Schedule s WHERE s.daystart = :daystart"),
    @NamedQuery(name = "Schedule.findByDaysonweek", query = "SELECT s FROM Schedule s WHERE s.daysonweek = :daysonweek"),
    @NamedQuery(name = "Schedule.findBySession1", query = "SELECT s FROM Schedule s WHERE s.session1 = :session1"),
    @NamedQuery(name = "Schedule.findBySession2", query = "SELECT s FROM Schedule s WHERE s.session2 = :session2"),
    @NamedQuery(name = "Schedule.findBySession3", query = "SELECT s FROM Schedule s WHERE s.session3 = :session3"),
    @NamedQuery(name = "Schedule.findBySession4", query = "SELECT s FROM Schedule s WHERE s.session4 = :session4"),
    @NamedQuery(name = "Schedule.findBySession5", query = "SELECT s FROM Schedule s WHERE s.session5 = :session5"),
    @NamedQuery(name = "Schedule.findBySession6", query = "SELECT s FROM Schedule s WHERE s.session6 = :session6"),
    @NamedQuery(name = "Schedule.findBySession7", query = "SELECT s FROM Schedule s WHERE s.session7 = :session7"),
    @NamedQuery(name = "Schedule.findBySession8", query = "SELECT s FROM Schedule s WHERE s.session8 = :session8"),
    @NamedQuery(name = "Schedule.findBySession9", query = "SELECT s FROM Schedule s WHERE s.session9 = :session9"),
    @NamedQuery(name = "Schedule.findBySession10", query = "SELECT s FROM Schedule s WHERE s.session10 = :session10")})
public class Schedule implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ScheduleID")
    private Integer scheduleID;
    @Column(name = "Daystart")
    @Temporal(TemporalType.DATE)
    private Date daystart;
    @Column(name = "Daysonweek")
    private String daysonweek;
    @Column(name = "Session1")
    private String session1;
    @Column(name = "Session2")
    private String session2;
    @Column(name = "Session3")
    private String session3;
    @Column(name = "Session4")
    private String session4;
    @Column(name = "Session5")
    private String session5;
    @Column(name = "Session6")
    private String session6;
    @Column(name = "Session7")
    private String session7;
    @Column(name = "Session8")
    private String session8;
    @Column(name = "Session9")
    private String session9;
    @Column(name = "Session10")
    private String session10;
    @JoinColumn(name = "ClassID", referencedColumnName = "ClassID")
    @ManyToOne
    private Class classID;
    @JoinColumn(name = "Teacher_SubjectID", referencedColumnName = "Teacher_SubjectID")
    @ManyToOne
    private TeacherSubject teacherSubjectID;

    public Schedule() {
    }

    public Schedule(Integer scheduleID) {
        this.scheduleID = scheduleID;
    }

    public Integer getScheduleID() {
        return scheduleID;
    }

    public void setScheduleID(Integer scheduleID) {
        this.scheduleID = scheduleID;
    }

    public Date getDaystart() {
        return daystart;
    }

    public void setDaystart(Date daystart) {
        this.daystart = daystart;
    }

    public String getDaysonweek() {
        return daysonweek;
    }

    public void setDaysonweek(String daysonweek) {
        this.daysonweek = daysonweek;
    }

    public String getSession1() {
        return session1;
    }

    public void setSession1(String session1) {
        this.session1 = session1;
    }

    public String getSession2() {
        return session2;
    }

    public void setSession2(String session2) {
        this.session2 = session2;
    }

    public String getSession3() {
        return session3;
    }

    public void setSession3(String session3) {
        this.session3 = session3;
    }

    public String getSession4() {
        return session4;
    }

    public void setSession4(String session4) {
        this.session4 = session4;
    }

    public String getSession5() {
        return session5;
    }

    public void setSession5(String session5) {
        this.session5 = session5;
    }

    public String getSession6() {
        return session6;
    }

    public void setSession6(String session6) {
        this.session6 = session6;
    }

    public String getSession7() {
        return session7;
    }

    public void setSession7(String session7) {
        this.session7 = session7;
    }

    public String getSession8() {
        return session8;
    }

    public void setSession8(String session8) {
        this.session8 = session8;
    }

    public String getSession9() {
        return session9;
    }

    public void setSession9(String session9) {
        this.session9 = session9;
    }

    public String getSession10() {
        return session10;
    }

    public void setSession10(String session10) {
        this.session10 = session10;
    }

    public Class getClassID() {
        return classID;
    }

    public void setClassID(Class classID) {
        this.classID = classID;
    }

    public TeacherSubject getTeacherSubjectID() {
        return teacherSubjectID;
    }

    public void setTeacherSubjectID(TeacherSubject teacherSubjectID) {
        this.teacherSubjectID = teacherSubjectID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (scheduleID != null ? scheduleID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Schedule)) {
            return false;
        }
        Schedule other = (Schedule) object;
        if ((this.scheduleID == null && other.scheduleID != null) || (this.scheduleID != null && !this.scheduleID.equals(other.scheduleID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.Schedule[ scheduleID=" + scheduleID + " ]";
    }
    
}
