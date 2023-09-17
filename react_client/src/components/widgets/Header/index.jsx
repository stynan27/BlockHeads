import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import{ Github } from 'react-bootstrap-icons';
import headerLogo from '../../../assets/shadow.png';
import { showAuthModal } from '../../../store/login';
import { useDispatch } from 'react-redux';

import './style.css';

export function HeaderComponent() {

    const dispatch = useDispatch();

    const handleLoginOpen = () => {
        dispatch(showAuthModal('Login'));
    }

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
                    <Link to="/">
                        <Button 
                            className='blockheadsImageButton px-0 py-0 border-0'
                        >
                            <Image 
                                className='mx-0 my-0'
                                src={headerLogo}
                                style={{width: 300, verticalAlign: "top", paddingTop: 0}}
                                alt="BlockHeads Logo"
                            />  
                        </Button>
                    </Link>
                    <Button 
                        variant="light"
                        className='blockheadsImageButton rounded-circle px-0 py-0'
                        style = {{color: 'black'}}
                        onClick={() => { window.open('https://github.com/stynan27/BlockHeads' , '_blank');} }
                    >
                        <Github size = {50}/>
                    </Button>
                </Col>
                <Col sm={3} className='navButtonArrayCol'>
                    <Link to="/manage-sets">
                        <Button className='lego-regular navButton'>
                            Manage Sets
                        </Button>
                    </Link>
                    <Button className='lego-regular navButton'>
                        About Us
                    </Button>
                </Col>
                <Col>
                    <Button 
                        variant = 'dark'
                        className ='lego-regular loginButton'
                        onClick={handleLoginOpen}
                        > 
                        Login
                    </Button>
                </Col>
            </Row> 
        </Container>
    );
}

export default HeaderComponent;
