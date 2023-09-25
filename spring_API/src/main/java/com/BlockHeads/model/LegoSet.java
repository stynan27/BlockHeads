package com.BlockHeads.model;

import java.sql.Blob;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
public class LegoSet {

	@Id
	@GeneratedValue
	private Integer id;
	
    @NotBlank(message = "Name must not be blank")
    private String name;
    
    private Integer identifyingNumber;
    private String description;
    private Integer numberOfPieces;
    
    @NotNull
    @PositiveOrZero
    private Float price;
    
    @Lob
    private Blob instructions;
    
    // I blieve this might also fix circular imports
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "user_account_id", nullable=false)
    private UserAccount userAccount;

	public LegoSet() {
		super();
	}

	public LegoSet(Integer id, UserAccount userAccount, String name, Integer identifyingNumber, String description,
			Integer numberOfPieces, Float price, Blob instructions) {
		super();
		this.id = id;
		this.userAccount = userAccount;
		this.name = name;
		this.identifyingNumber = identifyingNumber;
		this.description = description;
		this.numberOfPieces = numberOfPieces;
		this.price = price;
		this.instructions = instructions;
	}
	
	public Integer getId() {
		return id;
	}

	public UserAccount getUserAccount() {
		return userAccount;
	}

	public String getName() {
		return name;
	}

	public Integer getIdentifyingNumber() {
		return identifyingNumber;
	}

	public String getDescription() {
		return description;
	}

	public Integer getNumberOfPieces() {
		return numberOfPieces;
	}

	public Float getPrice() {
		return price;
	}

	public Blob getInstructions() {
		return instructions;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public void setUserAccount(UserAccount userAccount) {
		this.userAccount = userAccount;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setIdentifyingNumber(Integer identifyingNumber) {
		this.identifyingNumber = identifyingNumber;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setNumberOfPieces(Integer numberOfPieces) {
		this.numberOfPieces = numberOfPieces;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public void setInstructions(Blob instructions) {
		this.instructions = instructions;
	}

	@Override
	public String toString() {
		return "LegoSet [id=" + id + ", userAccount=" + userAccount + ", name=" + name + ", identifyingNumber="
				+ identifyingNumber + ", description=" + description + ", numberOfPieces=" + numberOfPieces + ", price="
				+ price + ", instructions=" + instructions + "]";
	}
    
    
}
