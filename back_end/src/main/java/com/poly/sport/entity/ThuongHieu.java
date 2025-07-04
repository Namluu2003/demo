package com.poly.sport.entity;

import com.poly.sport.entity.base.PrimaryEnity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "thuong_hieu")
public class ThuongHieu extends PrimaryEnity {

    @Nationalized
    @Column(name = "name")
    @NotNull(message = "Tên không được để trống!")
    private String name;

}
