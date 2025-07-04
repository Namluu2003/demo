package com.poly.sport.infrastructure.converter;

import com.poly.sport.entity.Account;
import com.poly.sport.infrastructure.request.AccountRequest;
import com.poly.sport.repository.AccountRepository;
import com.poly.sport.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountConvert {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
    public Account convertRequestToEntity(AccountRequest request){
        return Account.builder()
                .username(request.getUsername())
                .name(request.getName())
                .gender(request.getGender())
                .email(request.getEmail())
                .cccd(request.getCccd())
                .phoneNumber(request.getPhoneNumber())
                .birthday(request.getBirthday())
                .build();
    }
    public Account convertRequestToEntity(Long id,AccountRequest request){
        Account account = accountRepository.findById(id).get();
        account.setPassword(request.getPassword() == null ? account.getPassword() : request.getPassword());
        account.setBirthday(request.getBirthday());
        account.setEmail(request.getEmail());
        account.setName(request.getName());
        account.setCccd(request.getCccd());
        account.setUsername(request.getUsername());
        account.setPhoneNumber(request.getPhoneNumber());
        account.setGender(request.getGender());
        return account;
    }
}

