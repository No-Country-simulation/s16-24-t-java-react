package com.project.managementapi.exceptions;

import com.project.managementapi.dtos.responses.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionManager {

    /*==========================================   RESOURCE ALREADY EXISTS  ==========================================*/
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handlerResourceAlreadyExistException(ResourceAlreadyExistsException ex, WebRequest webRequest){
        ErrorResponse response = ErrorResponse
                .builder()
                .dateTime(LocalDateTime.now())
                .message(ex.getMessage())
                .url(webRequest.getDescription(false).replace("uri=", ""))
                .build();
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    /*==========================================   ILLEGAL ARGUMENT EXCEPTION  ==========================================*/
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest webRequest) {
        ErrorResponse response = ErrorResponse.builder()
                .dateTime(LocalDateTime.now())
                .statusCode("400")
                .message(ex.getMessage())
                .url(webRequest.getDescription(false).replace("uri=", ""))
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /*==========================================   RESOURCE NOT FOUND  ==========================================*/
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handlerResourceNotFoundException(ResourceNotFoundException ex, WebRequest webRequest){
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .dateTime(LocalDateTime.now())
                .message(ex.getMessage())
                .statusCode("404")
                .url(webRequest.getDescription(false).replace("uri=", ""))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    /*==========================================   BAD REQUEST  ==========================================*/
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handlerBadRequestException(BadRequestException ex, WebRequest webRequest){
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .statusCode("400")
                .dateTime(LocalDateTime.now())
                .message(ex.getMessage())
                .statusCode("400")
                .url(webRequest.getDescription(false).replace("uri=", ""))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    /*==========================================   EXPIRED JWT  ==========================================*/
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorResponse> handlerExpiredJwtException(ExpiredJwtException ex, WebRequest webRequest){
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .dateTime(LocalDateTime.now())
                .message(ex.getMessage())
                .url(webRequest.getDescription(false).replace("uri=", ""))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }


    /*==========================================   AUTHENTICATION EXCEPTION  ==========================================*/
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handlerAuthenticationException(AuthenticationException ex, WebRequest webRequest) {
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .dateTime(LocalDateTime.now())
                .message("Invalid credentials.")
                .url(webRequest.getDescription(false).replace("uri=", ""))
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<ErrorResponse> handlerAuthorizationDeniedException(AuthorizationDeniedException ex, WebRequest webRequest){
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .dateTime(LocalDateTime.now())
                .message(ex.getMessage())
                .url(webRequest.getDescription(false).replace("uri=", ""))
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }


    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handlerIllegalStateException(IllegalStateException ex, WebRequest webRequest){
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .dateTime(LocalDateTime.now())
                .message(ex.getMessage())
                .url(webRequest.getDescription(false).replace("uri=", ""))
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
}
