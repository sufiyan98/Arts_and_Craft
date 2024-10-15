package com.artsandcrafts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.artsandcrafts.model.Academy;
import com.artsandcrafts.service.AcademyService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AcademyController {
	@Autowired
	AcademyService academyService;
	
	@PostMapping("/addAcademy")
	public Academy addAcademy(@RequestBody Academy academy) {
	    return academyService.addAcademy(academy);
	}
	
	@GetMapping("/viewAcademy")
	public List<Academy> viewAcademy() {
		return academyService.viewAcademy();
	}
	
	@GetMapping("/findByAcademy/{academyName}")
    public List<Academy> findByAcademyName(@PathVariable String academyName)
    {
        return academyService.findByAcademyName(academyName);
    }
	
	@GetMapping("/findAcademy/{academyId}")
    public Academy findByAcademyId(@PathVariable int academyId)
    {
        return academyService.findByAcademyId(academyId);
    }
	
	@PutMapping("/editAcademy/{academyId}")
	private Academy editAcademy(@PathVariable int academyId ,@RequestBody Academy academy) {  
		return academyService.editAcademy(academyId, academy);
	 }
	
	@DeleteMapping("/deleteAcademy/{id}")
    public String deleteAcademy(@PathVariable int id)
    {
        return academyService.deleteAcademy(id);
    }
	
}
