package com.BlockHeads.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BlockHeads.dto.LegoSetDto;
import com.BlockHeads.dto.UserDto;

import com.BlockHeads.model.UserAccount;
import com.BlockHeads.service.UserAccountService;

@RestController
@CrossOrigin("http://localhost:3000") // TODO: Development fix for CORS errors -> Remove in production!!!
@RequestMapping("/api/user")
public class UserAccountController {
	private static final Logger LOG = LoggerFactory.getLogger(UserAccountController.class);
	
    @Autowired
    private UserAccountService userAccountService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> authenticateUser(@RequestBody UserAccount user) {
    	LOG.info("Received /signin request for [{}]", user.getUsername());

    	UserDto userDto = new UserDto(user.getUsername());
    	
    	String authErrorMsg = userAccountService.authenticateAccount(user);   	
    	if (authErrorMsg.length() > 0) {
    		userDto.setErrorMessage(authErrorMsg);
    		return new ResponseEntity<UserDto>(userDto, HttpStatus.UNAUTHORIZED);
    	}
    	
    	UserAccount userAccount = userAccountService.readAccountByUsername(user.getUsername());
    	Integer newUserId = (int) userAccount.getId();
    	userDto.setId(newUserId);
    	
        return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    }
    

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserAccount user){
    	LOG.info("Received /register request for [{}]", user.getUsername());
    	
    	UserDto userDto = new UserDto(user.getUsername());
    	
    	if (user.getUsername() == null) { 
    		userDto.setErrorMessage("Username cannot be null.");
    		return new ResponseEntity<UserDto>(userDto, HttpStatus.BAD_REQUEST);
    	} else if (user.getPassword() == null) {
    		userDto.setErrorMessage("Password cannot be null.");
    		return new ResponseEntity<UserDto>(userDto, HttpStatus.BAD_REQUEST);
    	}

    	// Username already taken
    	if (userAccountService.accountExists(user.getUsername().toLowerCase())) {
    		userDto.setErrorMessage("Username already taken.");
            return new ResponseEntity<UserDto>(userDto, HttpStatus.CONFLICT);
    	}
    	
        // ... Reminder the hashing process will be SLOW!!! -> account for this in the client interactions
    	UserAccount newUserAccount = userAccountService.createAccount(user);
    	Integer newUserId = (int) newUserAccount.getId();
    	userDto.setId(newUserId);
    	
        return new ResponseEntity<UserDto>(userDto, HttpStatus.CREATED);

    }
    
    @PostMapping("/{userId}/lego-set")
    public ResponseEntity<LegoSetDto> createLegoSet(@PathVariable Integer userId, @RequestBody LegoSetDto legoSet) { 
    	
    	LOG.info("Received /lego-set POST request request for userId [{}], with Lego Set [{}]", 
    			userId.toString(), legoSet.toString()
    	);
    	
    	LegoSetDto legoSetDto = new LegoSetDto(legoSet, null);
    	UserAccount userAccount = userAccountService.readAccountById(userId);
    	if (userAccount == null) {
    		legoSetDto.setErrorMessage("No user account found for id " + userId.toString() + ".");
    		return new ResponseEntity<LegoSetDto>(legoSetDto, HttpStatus.NOT_FOUND);
    	}
    	legoSet.setUserAccount(userAccount);
    	
    	// TODO: service to create new legoSet
    	
    	return new ResponseEntity<LegoSetDto>(legoSetDto, HttpStatus.CREATED);
    }
    
    
    // TODO: Get ALL Lego sets by user id
    
    // TODO: Get a Lego set by user id and set id
    
    // TODO: Update a lego set by user id
    
    // TODO: Delete a lego set by user Id
}
