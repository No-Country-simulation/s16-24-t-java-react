package com.project.managementapi.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface IProfileImageService {
    String save(MultipartFile mpf, Long id) throws IOException;
}
