package com.rayllanderson.gamelist.api.util;

import com.rayllanderson.gamelist.domain.repositories.UserRepository;
import com.rayllanderson.gamelist.domain.services.exceptions.ObjectNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;

public class UserUtil {

    public static Long getUserId(UserDetails user, UserRepository userRepository) {
        return userRepository.getIdByUsername(user.getUsername()).orElseThrow(() -> new ObjectNotFoundException("user " +
                "not found"));
    }
}
