package com.BlockHeads.service.impl;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.BlockHeads.controller.UserAccountController;
import com.BlockHeads.model.LegoSet;
import com.BlockHeads.model.UserAccount;
import com.BlockHeads.repository.UserAccountRepository;
import com.BlockHeads.service.UserAccountService;

import jakarta.validation.constraints.AssertFalse.List;

@Service
public class UserAccountServiceImpl implements UserAccountService { 
	
	private static final Logger LOG = LoggerFactory.getLogger(UserAccountController.class);
	
	private UserAccountRepository userAccountRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
    @Autowired
    private PasswordEncoder passwordEncoder;
	
    public UserAccountServiceImpl(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

	@Override
	public UserAccount createAccount(UserAccount user) {
		LOG.info("UserAccountService createAccount() for user: [{}])", user.getUsername());

        // create user object
        UserAccount userAccount = new UserAccount();
        //user.setName(registerDto.getName());
        userAccount.setUsername(user.getUsername().toLowerCase());
        //user.setEmail(registerDto.getEmail());
        
        // passwordEncoder.encode() uses BCrypt to hash + salt our passwords
        // this makes stored passwords more difficult to crack
        userAccount.setPassword(passwordEncoder.encode(user.getPassword()));

        userAccountRepository.save(userAccount);
		
		return userAccount;
	}

	// TODO: Function returns null? -> Requires testing.
	@Override
	public UserAccount readAccountByUsername(String username) {
		return userAccountRepository.findByUsername(username).get();
	}
	
	@Override
	public UserAccount readAccountById(Integer id) {
		LOG.info("readAccountById(Integer id) [{}]", id.toString());
		Optional<UserAccount> userOptional = userAccountRepository.findById(id.longValue());
		if (!userOptional.isPresent()) {
			return null;
		}
		return userOptional.get();
	}
	
	@Override
	public LegoSet readUserLegoSetById(UserAccount userAccount, Integer legoSetId) {
		LOG.info("readUserLegoSetById(Integer legoSetId) [{}]", legoSetId.toString());
		
    	ArrayList<LegoSet> userAccountLegoSets = (ArrayList<LegoSet>) new ArrayList<LegoSet>(userAccount.getLegoSets())
    			.stream()
    			.filter(legoSet -> legoSet.getId() == legoSetId)
    			.collect(Collectors.toList());

    	if (userAccountLegoSets == null || userAccountLegoSets.isEmpty()) {
    		return null;
    	}
    	return userAccountLegoSets.get(0);
	}
	
	@Override
	public UserAccount updateAccountLegoSet(UserAccount user, Integer legoSetId, LegoSet updatedLegoSet) {
		LOG.info("updateAccountById(Integer id) [{}]", user.getId());
		
		// Force consistency (requires Id field not null)
		updatedLegoSet.setUserAccount(user);
		
		ArrayList<LegoSet> backupLegoSets = (ArrayList<LegoSet>) new ArrayList<LegoSet>(user.getLegoSets())
			.stream()
			.map(formerLegoSet -> 
				formerLegoSet.getId() == legoSetId ? updatedLegoSet : formerLegoSet)
			.collect(Collectors.toList());
		
		// Remove previous records by reference
		user.getLegoSets().clear();
		// Add all previous records with modifications
		user.getLegoSets().addAll(backupLegoSets);
		
		return userAccountRepository.save(user);
	}
	
	@Override
	public Boolean accountExists(String username) {
		return userAccountRepository.existsByUsername(username);
	}

	@Override
	public String authenticateAccount(UserAccount user) {
    	Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
    	LOG.info("Authentication obj [{}]", authentication);
    	try {
    		// Previously this line would break as the Auth requests
    		// should be delegated to an AuthenticationProvider.
    		// However, none were configured in the SecurityConfig.
    		authentication = authenticationManager.authenticate(authentication);
    	} catch (BadCredentialsException bc) {
    		String errorMessageString = "Bad Credentials Exception: " + bc.getMessage();
    		LOG.info(errorMessageString);
    		return errorMessageString;
    	}
    	LOG.info("Authentication obj [{}]", authentication);
    	
    	// Update record of who is currently authenticated by the application/API in the Singleton SecurityContextHolder
    	SecurityContextHolder.getContext().setAuthentication(authentication);
    	
    	return "";
	}
	
    
}
