package com.rayllanderson.api.exceptions;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;


@ControllerAdvice //responsável por tratar possíveis erros nas requisições
public class ResourceExceptionHandler {

    @ExceptionHandler(ObjectNotFoundException.class) //identificando pra quando ocorrer essa exceção, fazer o tratamento abaixo
    public ResponseEntity<StandardError> objectNotFound(ObjectNotFoundException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        StandardError err = new StandardError(status.value(), "Not Found", e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<StandardError> nameValidation(HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(status.value(), "Bad Request", "Invalid json",
                request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }
}
