package com.psychology.exceptions;

public class PsychologistAlreadyExists extends Exception {

	private static final long serialVersionUID = -5719924055565042224L;

	public PsychologistAlreadyExists(String mes) {
		super(mes);
	}
}
