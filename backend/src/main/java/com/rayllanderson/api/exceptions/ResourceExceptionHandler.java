package com.rayllanderson.api.exceptions;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import com.rayllanderson.model.entities.enums.GameStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.handler.ResponseStatusExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.*;


@ControllerAdvice //responsável por tratar possíveis erros nas requisições
public class ResourceExceptionHandler {

    @ExceptionHandler(ObjectNotFoundException.class) //identificando pra quando ocorrer essa exceção, fazer o tratamento abaixo
    public ResponseEntity<StandardError> objectNotFound(ObjectNotFoundException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        StandardError err = new StandardError(status.value(), "Not Found", Arrays.asList(e.getMessage()), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<StandardError> handleBeanValidation(ConstraintViolationException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(status.value(), "Bad Request", getValidationsErrors(e), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<StandardError> handleIllegalArument(IllegalArgumentException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(status.value(), "Bad Request", Arrays.asList(e.getMessage()), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    ResponseEntity<StandardError> handleInvalidGameStatus(HttpMessageNotReadableException e, HttpServletRequest request){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String error = "Invalid Game Status. Status avaliable = " + Arrays.asList(GameStatus.values());
        StandardError err = new StandardError(status.value(), "Bad Request", Arrays.asList(error), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    private List<String> getValidationsErrors(ConstraintViolationException e) {
        StringBuilder msg = new StringBuilder();
        List<String> erros = new ArrayList<>();
        e.getConstraintViolations().forEach(System.out::println);
        e.getConstraintViolations().forEach(x -> {
            String errorMessage = x.getPropertyPath().toString() + " = " + x.getMessage();
            erros.add(errorMessage);
        });
        return erros;
    }
}
