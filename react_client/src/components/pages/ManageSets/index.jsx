import { Button, Container, Row, Col } from 'react-bootstrap';
import { LegoSetTable } from '../../widgets/LegoSetTable';

import './style.css';

export function ManageSetsPage() {

    return (
        <Container
            fluid 
            data-testid="manage-sets-page"
            className="manage-sets-page justify-content-center" 
        >
            <Row>
                <Col>
                    <h1 className='manage-sets-title lego-regular my-4'>Manage Lego Sets</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <LegoSetTable />
                </Col>
            </Row>
            <Row>
                <Col>  
                    <Button className='lego-regular mt-2 mb-4' size="md">
                        Add set
                    </Button>
                </Col>
            </Row>
        </Container>
  );
}
