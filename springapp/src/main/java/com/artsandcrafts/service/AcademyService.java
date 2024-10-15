package com.artsandcrafts.service;

import java.util.List;

import com.artsandcrafts.model.Academy;

public interface AcademyService {

	public Academy addAcademy(Academy academy);

	public List<Academy> findByAcademyName(String academyName);

	public Academy findByAcademyId(int academyId);

	public List<Academy> viewAcademy();

	public String deleteAcademy(int id);

	public Academy editAcademy(int academyId, Academy academy);

}
