package com.rayllanderson.gamelist.domain.utils;

import com.rayllanderson.gamelist.domain.dtos.user.UserDTO;
import com.rayllanderson.gamelist.domain.dtos.user.UserDetailsDTO;
import com.rayllanderson.gamelist.domain.exceptions.EmailExistsException;
import com.rayllanderson.gamelist.domain.exceptions.UsernameExistsException;
import com.rayllanderson.gamelist.domain.repositories.UserRepository;

public class Assert {

    public static void usernameNotExists(String username, UserRepository userRepository) throws UsernameExistsException {
        boolean usernameExists = userRepository.existsByUsername(username);
        if (usernameExists) {
            throw new UsernameExistsException("Username já está em uso. Tente outro.");
        }
    }

    public static boolean sameField(String newField, String oldField) {
        if (newField == null || oldField == null) return false;
        return newField.equals(oldField);
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

    public static void validPassword(UserDTO user) throws IllegalArgumentException, UsernameExistsException {
        if (user.getPassword().length() < 3){
            throw new IllegalArgumentException("Senha precisa ter no mínimo 3 caracters.");
        }
    }

    public static void validUser(UserDetailsDTO user) throws IllegalArgumentException, UsernameExistsException {
        Assert.notBlank(user.getEmail(), "email");
        Assert.notBlank(user.getName(), "name");
        Assert.notBlank(user.getUsername(), "username");
    }

    public static void thatEmailNotExists(String email, UserRepository repository) {
        if (email == null) return;
        if (email.isEmpty() || email.trim().isEmpty()) return;
        boolean emailExists = repository.existsByEmail(email);
        if(emailExists){
            throw new EmailExistsException("Email já cadastrado. Tente outro.");
        }
    }
}
