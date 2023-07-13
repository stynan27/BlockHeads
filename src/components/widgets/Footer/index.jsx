import { Container, Row, Col, Button } from 'react-bootstrap';
import { Linkedin } from 'react-bootstrap-icons';
import './style.css';

export function FooterComponent() {
    return (
        <Container
            fluid
            className="FooterComponent blockHeads-primary"
            style={{height: 225}}
        >
            <Row
                className='text-center'>
                <Col className='lego-black' style = {{marginTop: '10px'}}>
                    <p className='my-0'>Contact Us!</p>
                </Col> 
                         
            </Row>

            

            <Row
                className = 'text-center flex-nowrap justify-content-center'>

                <Col className='lego-regular col-3 contactInfoCol'>
                    <p className='my-0'>Joseph Angelo</p>
                    <p className='my-0'>Software Engineer</p>
                    <p className='my-0'>(903)-283-1468</p>
                    <p className='my-0'>jtangelo98<span className='emailSpan'>@</span>gmail.com</p>
                    
                    <Button 
                        className='linkedinButton rounded-0 py-0'
                        variant = 'secondary'>

                        <Linkedin className='mb-2' size = {20} style = {{color: 'black'}}/>

                    </Button>
                </Col> 
                <Col className='lego-regular col-3 contactInfoCol'>
                    <p className='my-0'> Seamus Tynan </p>
                    <p className='my-0'> Software Engineer </p>
                    <p className='my-0'> (716) - 870 - 9127 </p>
                    <p className='my-0'> seamustynan16<span className='emailSpan'>@</span>gmail.com </p>
                    
                    <Button 
                        className='linkedinButton rounded-0 py-0'
                        variant = 'secondary'>

                        <Linkedin className='mb-2' size = {20} style = {{color: 'black'}}/>

                    </Button>
                </Col>  

            </Row>
            <hr className='horizontalRule'/>

            <Row className=''>
                <p className='copyright'>Copyright &copy; 2023 BlockHeads USA Inc. All rights reserved.</p>
            </Row>
            
        </Container>
    );
}

export default FooterComponent();
