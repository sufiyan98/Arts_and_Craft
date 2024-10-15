package com.artsandcrafts.service;
import com.springbootbidyut.springbootdemo.entity.AcademyModel;
import com.springbootbidyut.springbootdemo.repository.AcademyRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl  implements AdminService{
    @Autowired
    private AcademyRepository AcademyRepository;

    @Override
    public AcademyModel AddAcademy(AcademyModel myAcademy) {
        return AcademyRepository.save(myAcademy);
    }
}
