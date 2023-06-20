import { Container, Row, Col } from 'react-bootstrap';

//import './style.css';

export function HeaderComponent() {
    return (
        <Container
            fluid 
            className="HeaderComponent blockHeads-primary" 
            style={{height: 50}}
        >
            <Row>
                <Col>
                    <h1>TODO: Header goes here!</h1>
                </Col>          
            </Row>

        </Container>
    );
}

export default HeaderComponent();
