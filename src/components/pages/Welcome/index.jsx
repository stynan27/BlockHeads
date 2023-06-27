import { Button, Carousel, Container, Row, Col } from 'react-bootstrap';

import './style.css';

export function WelcomePage() {
    // Special NodeJS feature to import/get a list of images from specified relative directory
    const welcomeImages = require.context('../../../assets/WelcomeImages', false);
    // list conversion of imported images
    const imageList = welcomeImages.keys().map(welcomeImages);

    return (
        <Carousel className="welcome-page h-100" interval={5000} controls={false} pause={false} fade={true}>
            {imageList.map((image, idx) => (
                <Carousel.Item key={idx}>
                    <Carousel.Caption className='welcome-caption lego-regular'>
                        <Container>
                            <Row>
                                <Col></Col>
                                <Col sm={6} className='caption-col'>
                                    <h2>Welcome to BlockHeads!</h2>
                                    <p>
                                        BlockHeads was designed to be an all-in-one solution to Lego set managment. 
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
                        fluid
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
