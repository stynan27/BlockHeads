package com.BlockHeads;

import static org.junit.Assert.assertEquals;

import java.net.URI;
import java.net.URISyntaxException;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

import com.BlockHeads.model.UserAccount;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class BlockHeadsApplicationTests {

//    private static String userAccountBaseUrl;
//    private static URI userAccountRegisterUri;
//    private static URI userAccountLoginUri;

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port;

    // TODO: Fix - the following needs to be static to use @BeforeAll, 
    // however that prevents us from using port here as well...
    @BeforeAll
    public static void setup() {
//		try {
//			userAccountBaseUrl = "http://localhost:" + port + "/api/user";
//	        userAccountRegisterUri = new URI(userAccountBaseUrl + "/register");
//	        userAccountLoginUri = new URI(userAccountBaseUrl + "/login");
//		} catch (URISyntaxException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
    }
    
	@Test
	void contextLoads() {
	}
	
    @Test
    public void testCreateUserReturnsCreated() {
    	// TODO: Local test workaround for the URI (should be defined in @BeforeAll method)
    	String userAccountBaseUrl = "http://localhost:" + port + "/api/user";
    	URI userAccountRegisterUri = null;
		try {
			userAccountRegisterUri = new URI(userAccountBaseUrl + "/register");
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	// Arrange
		// TODO: Since these tests re-use our local database, 
		// will need to perform cleanup steps to ensure the test user/sets are removed!!!
        UserAccount testUserAccount = new UserAccount();
        testUserAccount.setId(1);
        testUserAccount.setUsername("stynan");
        testUserAccount.setPassword("password123");
        
        // Execute
        HttpStatus createStatus = (HttpStatus) restTemplate.postForEntity(userAccountRegisterUri, testUserAccount, UserAccount.class).getStatusCode();

        // Assert
        assertEquals(HttpStatus.CREATED, createStatus);
    }

}
