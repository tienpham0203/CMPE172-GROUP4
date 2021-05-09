package com.tienpham.lab5.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tienpham.lab5.model.VoiceText;

@Repository
public interface VoiceTextRepo extends JpaRepository<VoiceText, Long>{

}
