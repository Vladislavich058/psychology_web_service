package com.psychology.exceptions;

public class NotFoundException extends Exception {

	private static final long serialVersionUID = 1178517646583154906L;

	public NotFoundException(String mes) {
		super(mes);
	}
}
