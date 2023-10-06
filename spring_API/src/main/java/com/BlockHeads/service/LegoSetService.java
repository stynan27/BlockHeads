package com.BlockHeads.service;

import com.BlockHeads.dto.LegoSetDto;
import com.BlockHeads.model.LegoSet;


public interface LegoSetService {
	LegoSet createLegoSet(LegoSet legoSet);
	LegoSetDto createCleanLegoSetDto(LegoSet legoSet);
	Boolean deleteLegoSet(Long legoSetId);
}
