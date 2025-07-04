package com.poly.sport.infrastructure.response;

import com.poly.sport.entity.Address;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Address.class})
public interface AddressResponse {
    @Value("#{target.indexs}")
    Integer getIndex();
    Long getId();

    String getName();

    String getPhoneNumber();

    String getWard();

    String getDistrict();

    String getProvince();

    String getSpecificAddress();

    Boolean getDefaultAddress();

    Boolean getStatus();

}
