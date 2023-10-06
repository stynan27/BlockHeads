package com.BlockHeads.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class UserAccount {
	
    @Id
    @GeneratedValue
    private Integer id;
    
    private String username;
    private String email;
    private String password;
    
    @OneToMany(
    		mappedBy = "userAccount",
            cascade = CascadeType.ALL, // Necess. for updating this list on user updates?
            orphanRemoval = true
    )
    private List<LegoSet> LegoSets;
    
    
	public UserAccount() {
		super();
	}
	
	public UserAccount(Integer id, String username, String email, String password) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
	}
    
	public long getId() {
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<LegoSet> getLegoSets() {
		return LegoSets;
	}

	public void setLegoSets(List<LegoSet> legoSets) {
		LegoSets = legoSets;
	}
}
