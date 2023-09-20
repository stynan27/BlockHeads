package com.BlockHeads.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BlockHeads.model.LegoSet;

public interface LegoSetRepository extends JpaRepository<LegoSet, Long> {
//    Optional<UserAccount> findByEmail(String email);
//    Optional<UserAccount> findByUsernameOrEmail(String username, String email);
//    Optional<UserAccount> findByUsername(String username);
//    Boolean existsByUsername(String username);
//    Boolean existsByEmail(String email);
}
