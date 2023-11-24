package com.psychology.exceptions;

public class NoAvailableOffice extends Exception {

	private static final long serialVersionUID = 1178517646583154906L;

	public NoAvailableOffice(String mes) {
		super(mes);
	}
}
