import { Container, Row, Col } from 'react-bootstrap';

//import './style.css';

export function FooterComponent() {
    return (
        <Container
            fluid
            className="FooterComponent blockHeads-primary"
            style={{height: 80}}
        >
            <Row>
                <Col className='FooterBody'>
                    <h1>TODO: Footer goes here!</h1>
                </Col>          
            </Row>

        </Container>
    );
}

export default FooterComponent();
