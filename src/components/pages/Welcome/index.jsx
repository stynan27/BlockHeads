import { Carousel } from 'react-bootstrap';

import './style.css';

export function WelcomePage() {
    // Special NodeJS feature to import/get a list of images from specified relative directory
    const welcomeImages = require.context('../../../assets/WelcomeImages', false);
    // list conversion of imported images
    const imageList = welcomeImages.keys().map(welcomeImages);

    return (
        <Carousel className="WelcomePage h-100">
            {imageList.map((image, idx) => (
                <Carousel.Item key={idx}>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                    <img
                        fluid
                        className="LegoSetImage"
                        src={image}
                        alt="Welcome page - Lego set images"
                    />
                </Carousel.Item>
            ))}
        </Carousel>
  );
}

export default WelcomePage();
