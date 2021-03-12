package com.rayllanderson.model.util;

import com.rayllanderson.model.exceptions.UsernameExistsException;
import com.rayllanderson.model.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class Assert {

    public static void usernameNotExists(String username, UserRepository userRepository) throws UsernameExistsException{
        boolean usernameExists = userRepository.existsByUsername(username);
        if(usernameExists){
            throw new UsernameExistsException("Username already taken.");
        }
    }
}
