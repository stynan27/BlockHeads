package com.BlockHeads.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BlockHeads.dto.LoginDto;
import com.BlockHeads.dto.RegisterDto;
import com.BlockHeads.model.UserAccount;
import com.BlockHeads.repository.UserAccountRepository;

@RestController
@RequestMapping("/api/user")
public class UserAccountController {
	private static final Logger LOG = LoggerFactory.getLogger(UserAccountController.class);
	
	@Autowired
	private AuthenticationManager authenticationManager;
	 
	 
    @Autowired
    private UserAccountRepository userAccountRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/signin")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDto loginDto) {
    	// TODO: Migrate this code to SERVICE!!!
    	LOG.info("Received /signin request for [{}, {}]", loginDto.getUsername(), loginDto.getPassword());
//        Authentication authentication = authenticationManager.authenticate((org.springframework.security.core.Authentication) new UsernamePasswordAuthenticationToken(
//                loginDto.getUsername(), loginDto.getPassword()));
    	Authentication authentication = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
    	LOG.info("Authentication obj [{}]", authentication);
    	try {
    		// Previously this line would break as the Auth requests
    		// should be delegated to an AuthenticationProvider.
    		// However, none were configured in the SecurityConfig.
    		authentication = authenticationManager.authenticate(authentication);
    	} catch (BadCredentialsException bc) {
    		String errorMessageString = "Bad Credentials Exception: " + bc.getMessage();
    		LOG.info(errorMessageString);
    		return new ResponseEntity<>(errorMessageString, HttpStatus.UNAUTHORIZED);
    	}
    	LOG.info("Authentication obj [{}]", authentication);
    	
    	// Update record of who is currently authenticated by the application/API in the Singleton SecurityContextHolder
    	SecurityContextHolder.getContext().setAuthentication(authentication);
    	
    	// TODO: Return UserAccount entity to client
        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    }
    

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDto registerDto){

        // add check for username exists in a DB
        if(userAccountRepository.existsByUsername(registerDto.getUsername())){
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }

		// // add check for email exists in DB
		// if(userAccountRepository.existsByEmail(registerDto.getEmail())){
		// 		return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
		//  }

        // create user object
        UserAccount userAccount = new UserAccount();
        //user.setName(registerDto.getName());
        userAccount.setUsername(registerDto.getUsername());
        //user.setEmail(registerDto.getEmail());
        
        // passwordEncoder.encode() uses BCrypt to hash + salt our passwords
        // this makes stored passwords more difficult to crack
        userAccount.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        userAccountRepository.save(userAccount);

        // TODO: Return UserAccount entity to client
        // ... Reminder the hashing process will be SLOW!!! -> account for this in the client interactions
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);

    }
}
