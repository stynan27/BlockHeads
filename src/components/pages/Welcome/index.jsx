import { Button, Carousel, Container, Row, Col } from 'react-bootstrap';

import { AhsokaImg, ATATImg, ATTEImg, BabyYodaImg, CaptainRexImg, FalconImg, R2Img,
     RazorcrestImg, RepublicGunshipImg, SSDImage } from '../../../assets/WelcomeImages';

import './style.css';

export function WelcomePage() {

    // TODO: Will be more dynamic if we could fetch these from the backend instead...
    const imageList=[ AhsokaImg, ATATImg, ATTEImg, BabyYodaImg, CaptainRexImg, 
        FalconImg, R2Img, RazorcrestImg, RepublicGunshipImg, SSDImage ];
    return (
        <Carousel 
            data-testid="welcome-page"
            className="welcome-page h-100" 
            interval={5000} 
            controls={false} 
            pause={false} 
            fade={true}
        >
            {imageList.map((image, idx) => (
                <Carousel.Item key={idx}>
                    <Carousel.Caption className='welcome-caption lego-regular'>
                        <Container>
                            <Row>
                                <Col></Col>
                                <Col sm={6} className='caption-col'>
                                    <h2>Welcome to BlockHeads!</h2>
                                    <p data-testid={"welcome-description-" + idx}>
                                        BlockHeads was designed to be an all-in-one solution to Lego set management. 
                                        See how we can build your digital collection today...
                                    </p>
                                    <Button className='register-btn mb-2' size="md">
                                        Start Building!
                                    </Button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Container>
                    </Carousel.Caption>
                    <img
                        fluid="true"
                        className="lego-set-image"
                        src={image}
                        alt="Welcome page - Lego set images"
                    />
                </Carousel.Item>
            ))}
        </Carousel>
  );
}

export default WelcomePage();
