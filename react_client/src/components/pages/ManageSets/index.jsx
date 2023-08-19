import { Button, Container, Row, Col } from 'react-bootstrap';

import './style.css';

export function ManageSetsPage() {

    return (
        <Container 
            data-testid="manage-sets-page"
            className="h-100" 
        >
            <Row>
                <Col sm={6} className=''>
                    <h1>Manage Lego Sets</h1>
                    <p>
                       Table will go here... 
                    </p>
                    <Button className='mb-2' size="md">
                        Add set
                    </Button>
                </Col>
            </Row>
        </Container>
  );
}

export default ManageSetsPage();
