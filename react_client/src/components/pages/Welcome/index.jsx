import { Button, Carousel, Container, Row, Col } from 'react-bootstrap';

import { AhsokaImg, ATATImg, ATTEImg, BabyYodaImg, CaptainRexImg, FalconImg, R2Img,
     RazorcrestImg, RepublicGunshipImg, SSDImage } from '../../../assets/WelcomeImages';

import { useDispatch, useSelector } from 'react-redux';
import { showAuthModal } from '../../../store/login';

import './style.css';

export function WelcomePage() {

    const authModalVisible = useSelector((state) => state.authModalVisible.value);
    const dispatch = useDispatch();

    // TODO: Will be more dynamic if we could fetch these from the backend instead...
    const imageList=[ AhsokaImg, ATATImg, ATTEImg, BabyYodaImg, CaptainRexImg, 
        FalconImg, R2Img, RazorcrestImg, RepublicGunshipImg, SSDImage ];
    
    return (
        <div>
        <Carousel 
            data-testid="welcome-page"
            className="welcome-page h-100" 
            interval={5000} 
            controls={false} 
            pause={false} 
            fade={true}

        >
            {imageList.map((image, id) => (
                <Carousel.Item key={id}>
                    <Carousel.Caption className='welcome-caption lego-regular'>
                        <Container>
                            <Row>
                                <Col></Col>
                                <Col sm={6} className='caption-col'>
                                    <h1>Welcome to BlockHeads!</h1>
                                    <p className="caption-text" data-testid={"welcome-description-" + id}>
                                        BlockHeads was designed to be an all-in-one solution to Lego set management. 
                                        See how we can build your digital collection today...
                                    </p>
                                    <Button className='register-btn mb-2' size="md" onClick = {() => {dispatch(showAuthModal("Register"))}}>
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
        </div>
  );
}

