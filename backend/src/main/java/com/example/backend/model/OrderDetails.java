/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.model;

import java.io.Serializable;
import java.math.BigDecimal;
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
@Table(name = "Order_Details")
@NamedQueries({
    @NamedQuery(name = "OrderDetails.findAll", query = "SELECT o FROM OrderDetails o"),
    @NamedQuery(name = "OrderDetails.findByOrderDetailID", query = "SELECT o FROM OrderDetails o WHERE o.orderDetailID = :orderDetailID"),
    @NamedQuery(name = "OrderDetails.findByQuantity", query = "SELECT o FROM OrderDetails o WHERE o.quantity = :quantity"),
    @NamedQuery(name = "OrderDetails.findByUnitPrice", query = "SELECT o FROM OrderDetails o WHERE o.unitPrice = :unitPrice")})
public class OrderDetails implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "OrderDetailID")
    private Integer orderDetailID;
    @Column(name = "Quantity")
    private Integer quantity;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Unit_Price")
    private BigDecimal unitPrice;
    @JoinColumn(name = "OrderID", referencedColumnName = "OrderID")
    @ManyToOne
    private Orders orderID;
    @JoinColumn(name = "UniformID", referencedColumnName = "UniformID")
    @ManyToOne
    private Uniform uniformID;

    public OrderDetails() {
    }

    public OrderDetails(Integer orderDetailID) {
        this.orderDetailID = orderDetailID;
    }

    public Integer getOrderDetailID() {
        return orderDetailID;
    }

    public void setOrderDetailID(Integer orderDetailID) {
        this.orderDetailID = orderDetailID;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Orders getOrderID() {
        return orderID;
    }

    public void setOrderID(Orders orderID) {
        this.orderID = orderID;
    }

    public Uniform getUniformID() {
        return uniformID;
    }

    public void setUniformID(Uniform uniformID) {
        this.uniformID = uniformID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (orderDetailID != null ? orderDetailID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof OrderDetails)) {
            return false;
        }
        OrderDetails other = (OrderDetails) object;
        if ((this.orderDetailID == null && other.orderDetailID != null) || (this.orderDetailID != null && !this.orderDetailID.equals(other.orderDetailID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.backend.model.OrderDetails[ orderDetailID=" + orderDetailID + " ]";
    }
    
}
