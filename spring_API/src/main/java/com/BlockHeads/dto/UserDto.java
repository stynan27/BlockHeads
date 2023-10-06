package com.BlockHeads.dto;

public class UserDto {
	
	private Integer id;

	private String username;
	
	private String errorMessage;
	
    public UserDto(String username) {
		super();
		this.username = username;
	}
    
	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
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
