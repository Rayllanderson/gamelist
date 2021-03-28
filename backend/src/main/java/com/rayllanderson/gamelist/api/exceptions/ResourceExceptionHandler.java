package com.rayllanderson.gamelist.api.exceptions;

import com.rayllanderson.gamelist.domain.entities.enums.GameStatus;
import com.rayllanderson.gamelist.domain.exceptions.EmailExistsException;
import com.rayllanderson.gamelist.domain.exceptions.UsernameExistsException;
import com.rayllanderson.gamelist.domain.services.exceptions.ObjectNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


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
        String gameStatuses = Arrays.asList(GameStatus.values()).toString();
        String error = e.getMessage().contains("GameStatus") ? "Status do jogo é inválido. Status disponíveis = " + gameStatuses :
                "Formato de Json inválido";
        StandardError err = new StandardError(status.value(), "Bad Request", Arrays.asList(error), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler({EmailExistsException.class, UsernameExistsException.class})
    ResponseEntity<StandardError> handleUsernameExists(RuntimeException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(status.value(), "Bad Request", Arrays.asList(e.getMessage()), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    private List<String> getValidationsErrors(ConstraintViolationException e) {
        List<String> errors = new ArrayList<>();
        e.getConstraintViolations().forEach(x -> {
            errors.add(x.getPropertyPath().toString() + ": " + x.getMessage());
        });
        return errors;
    }
}
