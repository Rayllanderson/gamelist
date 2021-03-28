package com.rayllanderson.gamelist.domain.exceptions;

public class UsernameExistsException extends RuntimeException{

    public UsernameExistsException(String msg){
        super(msg);
    }
}
