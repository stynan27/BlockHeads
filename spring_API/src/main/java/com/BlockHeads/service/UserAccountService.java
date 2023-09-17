package com.BlockHeads.service;

import com.BlockHeads.model.UserAccount;


public interface UserAccountService {
	UserAccount createAccount(UserAccount user);
	UserAccount readAccountByUsername(String username);
	UserAccount readAccountById(Integer id);
	Boolean accountExists(String username);
	String authenticateAccount(UserAccount user);
    // TODO: Update & Delete User Accounts?
}
