package com.rayllanderson.gamelist.domain.exceptions;

public class EmailExistsException extends RuntimeException {

    public EmailExistsException(String msg) {
        super(msg);
    }
}
