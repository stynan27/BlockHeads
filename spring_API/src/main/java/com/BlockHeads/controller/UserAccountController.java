package com.BlockHeads.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.BlockHeads.dto.LegoSetDto;
import com.BlockHeads.dto.UserDto;

import com.BlockHeads.model.UserAccount;
import com.BlockHeads.model.LegoSet;
import com.BlockHeads.service.LegoSetService;
import com.BlockHeads.service.UserAccountService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("http://localhost:3000") // TODO: Development fix for CORS errors -> Remove in production!!!
@RequestMapping("/api/user")
public class UserAccountController {
	private static final Logger LOG = LoggerFactory.getLogger(UserAccountController.class);
	
    @Autowired
    private UserAccountService userAccountService;
    
    @Autowired
    private LegoSetService legoSetService;

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
    public ResponseEntity<LegoSetDto> createLegoSet(@PathVariable Integer userId, @Valid @RequestBody LegoSet legoSet) { 

    	LOG.info("Received /lego-set POST request for userId [{}], with Lego Set [{}]", 
    			userId.toString(), legoSet.toString()
    	);
    	
    	LegoSetDto legoSetDto = new LegoSetDto(legoSet, null); 
    	
    	UserAccount userAccount = userAccountService.readAccountById(userId);
    	if (userAccount == null) {
    		legoSetDto.setErrorMessage("No user account found for userId " + userId.toString() + ".");
    		return new ResponseEntity<LegoSetDto>(legoSetDto, HttpStatus.NOT_FOUND);
    	}
    	
    	LOG.info("Retrieved UserAccount with Id [{}]", 
    			userAccount.getId()
    	);
    	
    	legoSet.setUserAccount(userAccount);
    	
    	LegoSet createdLegoSet = legoSetService.createLegoSet(legoSet);
    	legoSetDto.setId(createdLegoSet.getId());
    	
    	return new ResponseEntity<LegoSetDto>(legoSetDto, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/{userId}/lego-sets")
    public ResponseEntity<List<LegoSetDto>> getAllLegoSets(@PathVariable Integer userId) { 
    	
    	LOG.info("Received /lego-sets GET request for userId [{}]", 
    			userId.toString()
    	);
    	
		ArrayList<LegoSetDto> legoSetDtoList = new ArrayList<LegoSetDto>();
    	
    	UserAccount userAccount = userAccountService.readAccountById(userId);
    	if (userAccount == null) {
    		String errorMessage = "No user account found for userId " + userId.toString() + ".";
    		// For now we just explain if erorMessage field is present,
    		// ignore LegoSet content
    		legoSetDtoList.add(new LegoSetDto(errorMessage));
    		return new ResponseEntity<List<LegoSetDto>>(legoSetDtoList, HttpStatus.NOT_FOUND);
    	}
	
    	
    	LOG.info("UserAccount [{}] found", 
    			userAccount.toString()
    	);
    	
    	ArrayList<LegoSet> userAccountLegoSets = new ArrayList<>(userAccount.getLegoSets());
    	if (userAccountLegoSets == null || userAccountLegoSets.isEmpty()) {
    		String errorMessage = "No LegoSets found.";
    		legoSetDtoList.add(new LegoSetDto(errorMessage));
    		return new ResponseEntity<List<LegoSetDto>>(legoSetDtoList, HttpStatus.NOT_FOUND);
    	}
    	
    	LOG.info("Populating ArrayList<LegoSetsDto> from userAccountLegoSets");
    	for (LegoSet legoSet : userAccountLegoSets) { 		
    		legoSetDtoList.add(legoSetService.createCleanLegoSetDto(legoSet));
    	}
    	
    	return new ResponseEntity<List<LegoSetDto>>(legoSetDtoList, HttpStatus.OK);
    }
    
    
    @GetMapping("/{userId}/lego-set/{legoSetId}")
    public ResponseEntity<LegoSetDto> getLegoSet(@PathVariable Integer userId,
    		@PathVariable Integer legoSetId) { 
    	
    	LOG.info("Received /lego-sets GET request for userId [{}] and legoSetId [{}]", 
    			userId.toString(),
    			legoSetId.toString()
    	);
    	
		LegoSetDto legoSetDto = new LegoSetDto();
    	
    	UserAccount userAccount = userAccountService.readAccountById(userId);
    	if (userAccount == null) {
    		String errorMessage = "No user account found for userId " + userId.toString() + ".";
    		// For now we just explain if erorMessage field is present,
    		// ignore LegoSet content
    		legoSetDto.setErrorMessage(errorMessage);
    		return new ResponseEntity<LegoSetDto>(legoSetDto, HttpStatus.NOT_FOUND);
    	}
	
    	
    	LOG.info("UserAccount [{}] found", 
    			userAccount.toString()
    	);
    	
    	ArrayList<LegoSet> userAccountLegoSets = (ArrayList<LegoSet>) new ArrayList<>(userAccount.getLegoSets())
    			.stream()
    			.filter(legoSet -> legoSet.getId() == legoSetId)
    			.collect(Collectors.toList());
    	if (userAccountLegoSets == null || userAccountLegoSets.isEmpty()) {
    		String errorMessage = "No LegoSet found for legoSetId " + legoSetId.toString() + ".";
    		legoSetDto.setErrorMessage(errorMessage);
    		return new ResponseEntity<LegoSetDto>(legoSetDto, HttpStatus.NOT_FOUND);
    	}
    	// get first LegoSet that matches passed Id for this user
    	legoSetDto = legoSetService.createCleanLegoSetDto(userAccountLegoSets.get(0));
    	
    	return new ResponseEntity<LegoSetDto>(legoSetDto, HttpStatus.OK);
    }
    
    // TODO: Update a lego set by user id
    
    // TODO: Delete a lego set by user Id
    
    // Handle Data Validation Errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(
    		  MethodArgumentNotValidException ex) {
    		    Map<String, String> errors = new HashMap<>();
    		    ex.getBindingResult().getAllErrors().forEach((error) -> {
    		        String fieldName = ((FieldError) error).getField();
    		        String errorMessage = error.getDefaultMessage();
    		        errors.put(fieldName, errorMessage);
    		    });
    		    return errors;
    		}
    
}
