package com.zuitt.demo.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;
    private Integer itemId;
    private Date createdAt;
    private Date updatedAt;

    public Rental(Integer userId, Integer itemId) {
        this.userId = userId;
        this.itemId = itemId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
