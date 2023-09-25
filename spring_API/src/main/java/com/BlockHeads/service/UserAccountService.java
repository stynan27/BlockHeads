package com.BlockHeads.service;

import com.BlockHeads.model.LegoSet;
import com.BlockHeads.model.UserAccount;


public interface UserAccountService {
	UserAccount createAccount(UserAccount user);
	UserAccount readAccountByUsername(String username);
	UserAccount readAccountById(Integer id);
	UserAccount updateAccountLegoSet(UserAccount user, Integer legoSetId, LegoSet updatedLegoSet);
	Boolean accountExists(String username);
	String authenticateAccount(UserAccount user);
    // TODO: Update & Delete User Accounts?
}
