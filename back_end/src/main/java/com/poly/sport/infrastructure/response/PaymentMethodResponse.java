package com.poly.sport.infrastructure.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface PaymentMethodResponse {
    @Value("#{target.indexs}")
    Integer getIndex();

    Long getId();

    Integer getMethod();

    BigDecimal getTotalMoney();

    String getNote();
    Boolean getType();
    String getTradingCode();

    LocalDateTime getCreateAt();

    String getCreateBy();
}