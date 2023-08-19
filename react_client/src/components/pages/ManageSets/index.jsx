import { Button, Container, Row, Col } from 'react-bootstrap';
import { LegoSetTable } from '../../widgets/LegoSetTable';

import './style.css';

export function ManageSetsPage() {

    return (
        <Container
            fluid 
            data-testid="manage-sets-page"
            className="manage-sets-page vh-100 justify-content-center" 
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
                    <Button className='mb-2' size="md">
                        Add set
                    </Button>
                </Col>
            </Row>
        </Container>
  );
}

export default ManageSetsPage();
