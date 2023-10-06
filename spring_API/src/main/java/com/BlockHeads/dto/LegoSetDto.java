package com.BlockHeads.dto;

import com.BlockHeads.model.LegoSet;

public class LegoSetDto extends LegoSet {
	
	private String errorMessage;
	

	public LegoSetDto() {
		super();
	}


	public LegoSetDto(String errorMessage) {
		super();
		this.errorMessage = errorMessage;
	}
	
	public LegoSetDto(LegoSet legoSet, String errorMessage) {

		super(legoSet.getId(), legoSet.getUserAccount(), legoSet.getName(), 
				legoSet.getIdentifyingNumber(), legoSet.getDescription(), 
				legoSet.getNumberOfPieces(), legoSet.getPrice(), legoSet.getInstructions());
		
		
		this.errorMessage = errorMessage;
	}


	public String getErrorMessage() {
		return errorMessage;
	}


	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}


	@Override
	public String toString() {
		return "LegoSetDto [errorMessage=" + errorMessage + ", getUserAccount()=" + getUserAccount() + ", getName()="
				+ getName() + ", getIdentifyingNumber()=" + getIdentifyingNumber() + ", getDescription()="
				+ getDescription() + ", getNumberOfPieces()=" + getNumberOfPieces() + ", getPrice()=" + getPrice()
				+ ", getInstructions()=" + getInstructions() + ", toString()=" + super.toString() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + "]";
	}
	
	
}
