package com.poly.sport.infrastructure.request;

import com.poly.sport.infrastructure.common.PageableRequest;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoAoRequest extends PageableRequest {
    private Long id;
    @NotEmpty(message = "Cổ áo không được để trống")
    private String name;
    private Boolean status;

}
