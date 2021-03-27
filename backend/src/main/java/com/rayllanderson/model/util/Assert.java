package com.rayllanderson.model.util;

import com.rayllanderson.model.dtos.user.UserDTO;
import com.rayllanderson.model.dtos.user.UserDetailsDTO;
import com.rayllanderson.model.exceptions.EmailExistsException;
import com.rayllanderson.model.exceptions.UsernameExistsException;
import com.rayllanderson.model.repositories.UserRepository;

public class Assert {

    public static void usernameNotExists(String username, UserRepository userRepository) throws UsernameExistsException {
        boolean usernameExists = userRepository.existsByUsername(username);
        if (usernameExists) {
            throw new UsernameExistsException("Username já está em uso. Tente outro.");
        }
    }

    public static void emailNotExists(String email, UserRepository userRepository){
        boolean emailExists = userRepository.existsByEmail(email);
        if(emailExists){
            throw new EmailExistsException("Email já cadastrado. Tente outro.");
        }
    }

    public static boolean sameField(String newField, String oldField) {
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

}
