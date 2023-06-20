import { Container, Row, Col } from 'react-bootstrap';

import './style.css';

export function WelcomePage() {
  return (
    <Container fluid className="WelcomePage h-100">
        <Row>
            <Col>
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <h1 className='lego-regular'>BlockHeads App - LEGO style</h1>
                <p className='lego-regular'>
                LEGO<span className='test-with-@'>@</span>.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                Learn React
                </a>
            </Col>
        </Row>
    </Container>
  );
}

export default WelcomePage();
