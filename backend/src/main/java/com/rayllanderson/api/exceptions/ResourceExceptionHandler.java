package com.rayllanderson.api.exceptions;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;

import java.util.HashMap;
import java.util.Map;


@ControllerAdvice //responsável por tratar possíveis erros nas requisições
public class ResourceExceptionHandler {

    @ExceptionHandler(ObjectNotFoundException.class) //identificando pra quando ocorrer essa exceção, fazer o tratamento abaixo
    public ResponseEntity<StandardError> objectNotFound(ObjectNotFoundException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        StandardError err = new StandardError(status.value(), "Not Found", e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<StandardError> handleBeanValidation(ConstraintViolationException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(status.value(), "Bad Request", getErrorMessages(e), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<StandardError> handleIllegalArument(IllegalArgumentException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(status.value(), "Bad Request", e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    private String getErrorMessages(ConstraintViolationException e) {
        StringBuilder msg = new StringBuilder();
        Map<String, String> erros = new HashMap<>();
        e.getConstraintViolations().forEach(System.out::println);
        e.getConstraintViolations().forEach(x -> {
            String fieldName = x.getPropertyPath().toString();
            String errorMessage = x.getMessage();
            erros.put(fieldName, errorMessage);
        });
        erros.entrySet().forEach(x -> msg.append(x + " "));
        return msg.toString();
    }
}
