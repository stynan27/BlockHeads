package com.BlockHeads.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BlockHeads.controller.UserAccountController;
import com.BlockHeads.model.LegoSet;
import com.BlockHeads.repository.LegoSetRepository;
import com.BlockHeads.service.LegoSetService;

@Service
public class LegoSetServiceImpl implements LegoSetService { 
	
	private static final Logger LOG = LoggerFactory.getLogger(UserAccountController.class);
	
	@Autowired
	private LegoSetRepository legoSetRepository;
	
    public LegoSetServiceImpl(LegoSetRepository legoSetRepository) {
        this.legoSetRepository = legoSetRepository;
    }

	@Override
	public LegoSet createLegoSet(LegoSet legoSet) {
		LOG.info("LegoSetService createLegoSet() for legoSet: [{}])", legoSet.toString());
		
        legoSetRepository.save(legoSet);
		
		return legoSet;
	}
}
