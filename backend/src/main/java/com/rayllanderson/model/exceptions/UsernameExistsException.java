package com.rayllanderson.model.exceptions;

public class UsernameExistsException extends RuntimeException{

    public UsernameExistsException(String msg){
        super(msg);
    }
}
