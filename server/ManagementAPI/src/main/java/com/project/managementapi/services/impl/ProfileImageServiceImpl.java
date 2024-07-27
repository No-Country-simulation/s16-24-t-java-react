package com.project.managementapi.services.impl;

import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.personalInfo.ProfileImage;
import com.project.managementapi.helpers.CloudinaryHelper;
import com.project.managementapi.repositories.CustomerRepository;
import com.project.managementapi.services.IProfileImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProfileImageServiceImpl implements IProfileImageService {

    private final CloudinaryHelper cloudinaryHelper;
    private final CustomerRepository customerRepository;


    public String findByCustomerID(Long id) {
        return null;
    }

    public String save(MultipartFile mpf, Long id) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(mpf.getInputStream());
        Optional<Customer> customer = customerRepository.findById(id);
        if(bufferedImage == null){
            return null;
        }
        Map result = cloudinaryHelper.uploadImage(mpf);
        ProfileImage profileImage = new ProfileImage();
        profileImage.setUrl((String) result.get("url"));
        profileImage.setCloudinaryId((String) result.get("public_id"));
        profileImage.setName(mpf.getName());
        customer.get().getPersonalInfo().setImage(profileImage);
        return profileImage.getUrl();
    }
}
