import { Container, Row, Col, Button, Image} from 'react-bootstrap';
import{Github} from 'react-bootstrap-icons';
import headerLogo from '../../../assets/shadow.png';

import './style.css';

export function HeaderComponent() {
    return (
        <Container
            fluid 
            className="HeaderComponent blockHeads-primary" 
        >
            <Row
                className = 'headerRow h-100 py-2'
            >
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
                            style={{width: 150, verticalAlign: "top", paddingTop: 0}}
                            alt="BlockHeads Logo"
                        />  
                    </Button>
                    <Button 
                        variant="light"
                        className='blockheadsImageButton rounded-circle px-0 py-0'
                        size = "xs"
                        style = {{color: 'black'}}
                    >
                        <Github size = {30}/>
                    </Button>
                </Col>
                <Col sm={3} className='navButtonArrayCol'>
                    <Button className='lego-regular navButton'>
                        Manage Sets
                    </Button>
                    <Button className='lego-regular navButton'>
                        About Us
                    </Button>
                </Col>
                <Col /> 
            </Row> 
        </Container>
    );
}

export default HeaderComponent();
