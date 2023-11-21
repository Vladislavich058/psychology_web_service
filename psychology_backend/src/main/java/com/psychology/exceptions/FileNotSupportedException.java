package com.psychology.exceptions;

public class FileNotSupportedException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public FileNotSupportedException(String message) {
		super(message);
	}
}
