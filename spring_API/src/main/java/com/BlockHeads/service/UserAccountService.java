package com.BlockHeads.service;

import com.BlockHeads.model.UserAccount;


public interface UserAccountService {
	UserAccount createAccount(UserAccount user);
	UserAccount readAccountByUsername(String username);
	Boolean accountExists(String username);
	Boolean authenticateAccount(UserAccount user);
    // TODO: Update & Delete User Accounts?
}
