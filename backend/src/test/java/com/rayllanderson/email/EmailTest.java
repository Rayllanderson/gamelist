package com.rayllanderson.email;

import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.mail.MessagingException;

@SpringBootTest
public class EmailTest {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void sendEmail() throws MessagingException {
//        emailService.sendEmail();
    }

    @Test
    void generatePassword(){
        String temp = Long.toHexString(Double.doubleToLongBits(Math.random()));
        System.out.println(temp);
    }
}
