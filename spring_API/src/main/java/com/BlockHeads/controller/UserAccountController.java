package com.BlockHeads.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BlockHeads.dto.UserDto;
import com.BlockHeads.model.UserAccount;
import com.BlockHeads.service.UserAccountService;

@RestController
@RequestMapping("/api/user")
public class UserAccountController {
	private static final Logger LOG = LoggerFactory.getLogger(UserAccountController.class);
	
    @Autowired
    private UserAccountService userAccountService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody UserAccount user) {
    	LOG.info("Received /signin request for [{}]", user.getUsername());

    	Boolean isAuthenticated = userAccountService.authenticateAccount(user);
    	if (!isAuthenticated) {		
    		return new ResponseEntity<String>("Username/password combination is invalid.", HttpStatus.UNAUTHORIZED);
    	}
    	
        return new ResponseEntity<UserDto>(new UserDto(user.getUsername()), HttpStatus.OK);
    }
    

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserAccount user){
    	LOG.info("Received /register request for [{}]", user.getUsername());

    	// Username already taken
    	if (userAccountService.accountExists(user.getUsername())) {
            return new ResponseEntity<String>("Username already taken.", HttpStatus.CONFLICT);
    	}
    	
		// TODO: add check for email exists in DB
		// if(userAccountRepository.existsByEmail(user.getEmail())){
		// 		return new ResponseEntity<>("Email is already taken!", HttpStatus.CONFLICT);
		//  }
    	
    	UserAccount newUserAccount = userAccountService.createAccount(user);
    	
        // ... Reminder the hashing process will be SLOW!!! -> account for this in the client interactions
        return new ResponseEntity<UserDto>(new UserDto(newUserAccount.getUsername()), HttpStatus.CREATED);

    }
}
