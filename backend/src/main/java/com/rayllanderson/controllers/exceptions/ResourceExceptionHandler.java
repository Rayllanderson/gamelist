package com.rayllanderson.controllers.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.rayllanderson.services.exceptions.ObjectNotFoundException;


@ControllerAdvice //responsavel por tratar possíveis erros nas requisições
public class ResourceExceptionHandler {

    @ExceptionHandler(ObjectNotFoundException.class) //identificando pra quando ocorrer essa exceção, fazer o tratamento abaixo
    public ResponseEntity<StandardError> obectNotFound(ObjectNotFoundException e, HttpServletRequest request){
	HttpStatus status = HttpStatus.NOT_FOUND;
	StandardError err = new StandardError(Instant.now(), status.value(), "Not Found", e.getMessage(), request.getRequestURI());
	return ResponseEntity.status(status).body(err);
    }
    
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<StandardError> nameValidation(HttpServletRequest request){
	HttpStatus status = HttpStatus.BAD_REQUEST;
	StandardError err = new StandardError(Instant.now(), status.value(), "Bad Request", "Um ou mais campos estão vazios" , request.getRequestURI());
	return ResponseEntity.status(status).body(err);
    }
}
