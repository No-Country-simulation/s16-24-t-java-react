package com.project.managementapi.services.impl;

import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.personalInfo.PersonalInfo;
import com.project.managementapi.entities.personalInfo.ProfileImage;
import com.project.managementapi.helpers.CloudinaryHelper;
import com.project.managementapi.repositories.CustomerRepository;
import com.project.managementapi.repositories.PersonalInfoRepository;
import com.project.managementapi.repositories.ProfileImageRepository;
import com.project.managementapi.services.IProfileImageService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Profile;
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
    private final PersonalInfoRepository personalInfoRepository;
    private final ProfileImageRepository profileImageRepository;



    @Override
    public String save(MultipartFile mpf, Long id) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(mpf.getInputStream());
        Optional<Customer> customerDB = customerRepository.findById(id);
        if(bufferedImage == null){
            return null;
        }
        ProfileImage profileImage = new ProfileImage();

        Map result = cloudinaryHelper.uploadImage(mpf);
        profileImage.setUrl((String) result.get("url"));
        profileImage.setCloudinaryId((String) result.get("public_id"));
        profileImage.setName(mpf.getName());
        PersonalInfo personalInfoDB = customerDB.get().getPersonalInfo();
        personalInfoDB.setImage(ProfileImage.builder()
                .url(profileImage.getUrl())
                .cloudinaryId(profileImage.getCloudinaryId())
                .name(profileImage.getName())
                .build()
        );

        personalInfoRepository.save(personalInfoDB);
        return profileImage.getUrl();
    }

    @Override
    public String getProfileImageByCustomerID(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if(customer.isEmpty()){
            return null;
        }
        return customer.get().getPersonalInfo().getImage().getUrl();
    }
}
