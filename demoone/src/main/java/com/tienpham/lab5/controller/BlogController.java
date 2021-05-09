package com.tienpham.lab5.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tienpham.lab5.model.VoiceText;
import com.tienpham.lab5.repository.VoiceTextRepo;

@RestController
public class BlogController {
	@Autowired
	private VoiceTextRepo voiceRepo;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/api/blog/{id}")
	public String getBlogMessage(@PathVariable String id) {
		return "Return URL From New Update";
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/api/blog/save")
	public String saveToDB(@RequestParam String url) {
		System.out.println(url);
	
		// save to database
		
		// RDS
		this.voiceRepo.save(new VoiceText(null, url));
		return "saved with name " + url; 
	}
}

