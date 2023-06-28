import { Container, Row, Col, Button, Image} from 'react-bootstrap';
import{Github} from 'react-bootstrap-icons';
import headerLogo from '../../../assets/shadow.png';

import './style.css';

export function HeaderComponent() {
    return (
        <Container
            fluid 
            className="HeaderComponent blockHeads-primary" 
            style={{height: 70}}
        >
            <Row>
                <Col
                    sm={3} 
                    className='headerLogoCol'
                >
                    <Button 
                        className='blockheadsImageButton px-0 py-0 border-0'
                    >
                        <Image 
                            className='mx-0 my-0'
                            src={headerLogo}
                            style={{width: 250, verticalAlign: "top", paddingTop: 0}}
                            alt="BlockHeads Logo"
                        />  
                    </Button>
                    <Button 
                        variant="light"
                        className='blockheadsImageButton rounded-circle px-0 py-0'
                        size = "sm"
                        style = {{color: 'black'}}
                    >
                        <Github size = {50}/>
                    </Button>
                </Col>
                <Col sm={1} />
                <Col sm={3} >
                    <Button className='lego-regular'>
                        Manage Sets
                    </Button>
                </Col>
                <Col sm={5} />
            </Row> 
        </Container>
    );
}

export default HeaderComponent();
