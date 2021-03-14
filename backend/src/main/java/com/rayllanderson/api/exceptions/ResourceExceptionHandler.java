package com.rayllanderson.api.exceptions;

import com.rayllanderson.model.entities.enums.GameStatus;
import com.rayllanderson.model.exceptions.UsernameExistsException;
import com.rayllanderson.model.services.exceptions.ObjectNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
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
    ResponseEntity<StandardError> handleInvalidGameStatus(HttpMessageNotReadableException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String error = "Invalid Game Status. Status avaliable = " + Arrays.asList(GameStatus.values());
        StandardError err = new StandardError(status.value(), "Bad Request", Arrays.asList(error), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(UsernameExistsException.class)
    ResponseEntity<StandardError> handleUsernameExists(UsernameExistsException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(status.value(), "Bad Request", Arrays.asList(e.getMessage()), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    private List<Map<String, String>> getValidationsErrors(ConstraintViolationException e) {
        List<Map<String, String>> errors = new ArrayList<>();
        e.getConstraintViolations().forEach(x -> {
            Map<String, String> error = new HashMap<>();
            error.put(x.getPropertyPath().toString(), x.getMessage());
            errors.add(error);
        });
        return errors;
    }
}
