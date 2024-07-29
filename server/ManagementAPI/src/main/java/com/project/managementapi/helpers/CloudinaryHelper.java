package com.project.managementapi.helpers;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class CloudinaryHelper {
    Cloudinary cloudinary;

    @Value("${cloudinary.name}")
    private String cloudinaryName;

    @Value("${cloudinary.api.key}")
    private String cloudinaryApiKey;

    @Value("${cloudinary.api.secret}")
    private String cloudinaryApiSecret;


    @PostConstruct
    public void init() {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudinaryName,
                "api_key", cloudinaryApiKey,
                "api_secret", cloudinaryApiSecret,
                "secure", true
        ));
    }

    public Map uploadImage(MultipartFile mpf) throws IOException {
        File file = transform(mpf);
        Map result = cloudinary.uploader().upload(file, ObjectUtils.asMap("folder", "sportify/"));
        file.delete();
        return result;
    }

    public Map delete(String id) throws IOException{
        Map result = cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
        return result;
    }

    private File transform(MultipartFile mpf) throws IOException {
        File file = new File(mpf.getOriginalFilename());
        FileOutputStream fileOutputStream = new FileOutputStream(file);
        fileOutputStream.write(mpf.getBytes());
        fileOutputStream.close();
        return file;
    }

}
