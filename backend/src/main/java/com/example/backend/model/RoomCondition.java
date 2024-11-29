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
@Table(name = "RoomCondition")
@NamedQueries({
    @NamedQuery(name = "RoomCondition.findAll", query = "SELECT r FROM RoomCondition r"),
    @NamedQuery(name = "RoomCondition.findByRoomConditionID", query = "SELECT r FROM RoomCondition r WHERE r.roomConditionID = :roomConditionID"),
    @NamedQuery(name = "RoomCondition.findByDateRoom", query = "SELECT r FROM RoomCondition r WHERE r.dateRoom = :dateRoom"),
    @NamedQuery(name = "RoomCondition.findBySession1", query = "SELECT r FROM RoomCondition r WHERE r.session1 = :session1"),
    @NamedQuery(name = "RoomCondition.findBySession2", query = "SELECT r FROM RoomCondition r WHERE r.session2 = :session2"),
    @NamedQuery(name = "RoomCondition.findBySession3", query = "SELECT r FROM RoomCondition r WHERE r.session3 = :session3"),
    @NamedQuery(name = "RoomCondition.findBySession4", query = "SELECT r FROM RoomCondition r WHERE r.session4 = :session4"),
    @NamedQuery(name = "RoomCondition.findBySession5", query = "SELECT r FROM RoomCondition r WHERE r.session5 = :session5"),
    @NamedQuery(name = "RoomCondition.findBySession6", query = "SELECT r FROM RoomCondition r WHERE r.session6 = :session6"),
    @NamedQuery(name = "RoomCondition.findBySession7", query = "SELECT r FROM RoomCondition r WHERE r.session7 = :session7"),
    @NamedQuery(name = "RoomCondition.findBySession8", query = "SELECT r FROM RoomCondition r WHERE r.session8 = :session8"),
    @NamedQuery(name = "RoomCondition.findBySession9", query = "SELECT r FROM RoomCondition r WHERE r.session9 = :session9"),
    @NamedQuery(name = "RoomCondition.findBySession10", query = "SELECT r FROM RoomCondition r WHERE r.session10 = :session10"),
    @NamedQuery(name = "RoomCondition.findByDaysonweek", query = "SELECT r FROM RoomCondition r WHERE r.daysonweek = :daysonweek"),
    @NamedQuery(name = "RoomCondition.findByNote", query = "SELECT r FROM RoomCondition r WHERE r.note = :note")})
public class RoomCondition implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "RoomConditionID")
    private Integer roomConditionID;
    @Column(name = "DateRoom")
    @Temporal(TemporalType.DATE)
    private Date dateRoom;
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
    @Column(name = "Daysonweek")
    private String daysonweek;
    @Column(name = "Note")
    private String note;
    @JoinColumn(name = "RoomID", referencedColumnName = "RoomID")
    @ManyToOne
    private Room roomID;
    @JoinColumn(name = "TeacherID", referencedColumnName = "TeacherID")
    @ManyToOne
    private Teacher teacherID;

    public RoomCondition() {
    }

    public RoomCondition(Integer roomConditionID) {
        this.roomConditionID = roomConditionID;
    }

    public Integer getRoomConditionID() {
        return roomConditionID;
    }

    public void setRoomConditionID(Integer roomConditionID) {
        this.roomConditionID = roomConditionID;
    }

    public Date getDateRoom() {
        return dateRoom;
    }

    public void setDateRoom(Date dateRoom) {
        this.dateRoom = dateRoom;
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

    public String getDaysonweek() {
        return daysonweek;
    }

    public void setDaysonweek(String daysonweek) {
        this.daysonweek = daysonweek;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Room getRoomID() {
        return roomID;
    }

    public void setRoomID(Room roomID) {
        this.roomID = roomID;
    }

    public Teacher getTeacherID() {
        return teacherID;
    }

    public void setTeacherID(Teacher teacherID) {
        this.teacherID = teacherID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (roomConditionID != null ? roomConditionID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof RoomCondition)) {
            return false;
        }
        RoomCondition other = (RoomCondition) object;
        if ((this.roomConditionID == null && other.roomConditionID != null) || (this.roomConditionID != null && !this.roomConditionID.equals(other.roomConditionID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.RoomCondition[ roomConditionID=" + roomConditionID + " ]";
    }
    
}
