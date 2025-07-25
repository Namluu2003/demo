package com.poly.sport.entity.base;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {
    @CreatedDate
    @Column(name = "create_at")
    private LocalDateTime createAt;
    @LastModifiedDate
    @Column(name = "update_at")
    private LocalDateTime updateAt;
    @CreatedBy
    @Column(name = "create_by")
    private String createBy;
    @LastModifiedBy
    @Column(name = "update_by")
    private String updateBy;
    @Column(name = "deleted")
    private Boolean deleted;

    @PrePersist
    public void prePersist(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        createAt = LocalDateTime.now();
        updateAt = LocalDateTime.now();
        createBy = authentication != null ? authentication.getName() : "nam";
        updateBy = authentication != null ? authentication.getName() : "nam";
        deleted = false;

    }
    @PreUpdate
    public void preUpdate(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        updateAt = LocalDateTime.now();
        updateBy = authentication != null ? authentication.getName() : "nam";
    }

}
