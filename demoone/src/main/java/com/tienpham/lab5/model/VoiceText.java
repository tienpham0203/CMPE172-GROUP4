package com.tienpham.lab5.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "VOICE_TEXT_TBL")
public class VoiceText {

	@Id
	@GeneratedValue(strategy =   GenerationType.IDENTITY)
	private Long id;
	
	
	private String urlS3;

	public VoiceText(Long id, String urlS3) {
		super();
		this.id = id;		
		this.urlS3 = urlS3;
	}
	
	public VoiceText() {
		
	}


	public String getUrlS3() {
		return urlS3;
	}

	public void setUrlS3(String urlS3) {
		this.urlS3 = urlS3;
	}

	
	
}
