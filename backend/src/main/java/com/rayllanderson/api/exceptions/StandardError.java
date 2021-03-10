package com.rayllanderson.api.exceptions;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Data
public class StandardError implements Serializable{

    private static final long serialVersionUID = 1L;
    
    private Instant timestamp;
    private Integer status; 
    private String error;
    private Object message;
    private String path;

    public StandardError() {}

    public StandardError(Instant timestamp, Integer status, String error, Object message, String path) {
	this.timestamp = timestamp;
	this.status = status;
	this.error = error;
	this.message = message;
	this.path = path;
    }

    public StandardError(Integer status, String error, Object message, String path) {
        this.timestamp = Instant.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }
}
