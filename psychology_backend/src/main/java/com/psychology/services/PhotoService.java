package com.psychology.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.psychology.entities.Photo;


public interface PhotoService {
	Photo uploadFile(MultipartFile file) throws IOException;
}
