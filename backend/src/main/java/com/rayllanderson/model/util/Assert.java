package com.rayllanderson.model.util;

import com.rayllanderson.model.entities.User;
import com.rayllanderson.model.exceptions.UsernameExistsException;
import com.rayllanderson.model.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class Assert {

    public static void usernameNotExists(String username, UserRepository userRepository) throws UsernameExistsException {
        boolean usernameExists = userRepository.existsByUsername(username);
        if (usernameExists) {
            throw new UsernameExistsException("Username already taken.");
        }
    }

    public static boolean sameUsername(String newUsername, String oldUsername) {
        return newUsername.equals(oldUsername);
    }

    public static <T> T notNull(T reference, String parameterName) {
        if (reference == null)
            throw new IllegalArgumentException(parameterName + " cannot be null");
        return reference;
    }

    public static void notEmpty(String reference, String parameterName) {
        if (reference.isEmpty())
            throw new IllegalArgumentException(parameterName + " cannot be null");
    }

    /**
     * Assert that not null and not empty.
     * @param reference
     * @param parameterName
     */
    public static void notBlank(String reference, String parameterName) {
        if (reference == null)
            throw new IllegalArgumentException(parameterName + " cannot be null");

        if (reference.trim().isEmpty())
            throw new IllegalArgumentException(parameterName + " cannot be null");
    }

}
