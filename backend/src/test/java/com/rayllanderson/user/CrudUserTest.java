package com.rayllanderson.user;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.rayllanderson.entities.User;
import com.rayllanderson.repositories.UserRepository;

@SpringBootTest
public class CrudUserTest {

    private UserRepository repository;
    
    @Test
    public void save() {
	User user = new User(1L, "rayllanderson@gmail.com", "whatever123");
	repository.save(user);
    }
}
