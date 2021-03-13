package com.rayllanderson.api.util;

import com.rayllanderson.model.repositories.UserRepository;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;

public class UserUtil {

    public static Long getUserId(UserDetails user, UserRepository userRepository) {
        return userRepository.getIdByUsername(user.getUsername()).orElseThrow(() -> new ObjectNotFoundException("user " +
                "not found"));
    }
}
