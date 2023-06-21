import { Container, Row, Col } from 'react-bootstrap';

import './style.css';

export function ErrorPage() {
    return (
        <Container fluid className="ErrorPage blockHeads-primary vh-100 d-flex align-items-center justify-content-center">
            <Row>
                <Col>
                    <h1>We are working really hard!</h1>
                    <div>
                        Apologies for the 404. Please contact the BlockHeads team for further support.
                    </div>
                </Col>          
            </Row>

        </Container>
    );
}

export default ErrorPage();
