package com.project.managementapi.controllers;

import com.project.managementapi.dtos.responses.ErrorResponse;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.services.impl.ProfileImageServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/profile-image")
@Tag(name = "Profile Image")
public class ProfileImageController {

    private final ProfileImageServiceImpl profileImageService;
    private final String url = "/api/v1/profile-image/";


    @Operation(summary = "Upload profile image", description = "Upload a profile image providing customer_id")
    @PostMapping("/upload/{id}")
//    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public ResponseEntity<?> upload(@PathVariable Long id, @RequestParam("image") MultipartFile mpf) throws IOException {
        String result = profileImageService.save(mpf, id);
        System.out.println(result);
        return result == null ?
                ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ErrorResponse
                                .builder()
                                .message("Invalid file type")
                                .dateTime(LocalDateTime.now())
                                .statusCode("400")
                                .url(url.concat("upload/"))
                                .build()
                        )
                : ResponseEntity.ok(SuccessResponse
                .builder()
                .statusCode("200")
                .url("http://localhost:8080/api/v1/profile-image/upload/" + id)
                .message("Image uploaded successfully")
                .object(result)
                .build()
        );
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> searchProfileImage(@PathVariable Long id) {
        String result = profileImageService.getProfileImageByCustomerID(id);
        return result == null ?
                ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ErrorResponse
                                .builder()
                                .message("Image not found")
                                .dateTime(LocalDateTime.now())
                                .statusCode("404")
                                .url(url.concat("search/"))
                                .build()
                        )
                : ResponseEntity.ok(SuccessResponse
                .builder()
                .statusCode("200")
                .url("http://localhost:8080/api/v1/profile-image/search/" + id)
                .message("Image find successfully")
                .object(result)
                .build()
        );
    }
}
