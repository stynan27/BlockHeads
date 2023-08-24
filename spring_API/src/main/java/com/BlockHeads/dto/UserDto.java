package com.BlockHeads.dto;

public class UserDto {

	private String username;
	
	private String errorMessage;
	
    public UserDto(String username) {
		super();
		this.username = username;
	}
    
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
