package com.rayllanderson.model.exceptions;

public class EmailExistsException extends RuntimeException {

    public EmailExistsException(String msg) {
        super(msg);
    }
}
