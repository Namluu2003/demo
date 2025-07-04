package com.poly.sport.infrastructure.request;

import com.poly.sport.infrastructure.common.PageableRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SanPhamRequest extends PageableRequest {
    private String code;
    private Long id;
    @NotEmpty(message = "Tên không được để trống.")
    private String name;
    @NotNull(message = "Thương hiệu không được để trống.")
    private Long thuongHieu;
    @NotNull(message = "Danh mục không được để trống.")
    private Long chatLieu;
    @NotNull(message = "Vui lòng chọn loại đế!")
    private Long coAo;
    @NotNull(message = "Vui lòng chọn loại đế!")
    private Long tayAo;
    @NotNull(message = "Vui lòng chọn loại đế!")
    private Long xuatXu;
    @NotNull(message = "Vui lòng chọn hình ảnh!")

    private List<String> listImages;
    private String description;
    private Boolean status;
}