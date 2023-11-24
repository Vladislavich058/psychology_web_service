package com.psychology.exceptions;

public class IncorrectDateTime extends Exception {

	private static final long serialVersionUID = 1178517646583154906L;

	public IncorrectDateTime(String mes) {
		super(mes);
	}
}
