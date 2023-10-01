import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState} from "react";
import { showAuthModal } from "../../../store/login";
import { useSelector, useDispatch } from "react-redux"
import { registerUser, loginUser } from "../../../api/userAuth";

export function UserAuth(props){

    const visible = useSelector((state) => state.authModalVisible.value);
    const title = useSelector((state) => state.authModalVisible.title)


    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, seterror] = useState("");
    const [success, setsuccess] = useState("");

    useEffect(() => {}, [props.title]);

    const dispatch = useDispatch();

    function handleClose(){
        setsuccess("");
        seterror("");
        dispatch(showAuthModal());
    } 

    async function handleLogin() {
        await loginUser(username, password)  
            .then(function (response) {
                // handle success
                console.log(response);
                seterror("");
                setsuccess("Login Successful");
                // TODO: handleClose()
            })
            .catch(function (error) {
                // handle error (show error banner)
                console.log("Error code: " + error["response"]["status"]);
                console.log(error["response"]);
                seterror(error["response"]["data"]["errorMessage"]);
                setsuccess("");
            })
    }

    async function handleRegister() {
        
        await registerUser(username, password)  
            .then(function (response) {
                // handle success
                console.log(response);
                seterror("");
                setsuccess("Register Successful");
                // TODO: handleClose()
            })
            .catch(function (error) {
                // handle error (show error banner)
                console.log("Error code: " + error["response"]["status"]);
                console.log(error["response"]);
                seterror(error["response"]["data"]["errorMessage"]);
                setsuccess("");
            })
    }

    function handleFormSubmit() {
        title === 'Login' ? handleLogin() : handleRegister();
    }
    
    function handleSuccess() {
        let x = success === "" ? (<div></div>): (<Alert className = 'my-10'key="success" variant="success">{success}</Alert>);
        return x;
    }

    function handleError() {
        let x = error === "" ? (<div></div>):(<Alert className = 'my-10'key="danger" variant="danger">{error}</Alert>);
        return x;
    }
    return (
        
        <Modal show = {visible} onHide = {handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                onChange={e => setUsername(e.target.value)}
                            />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        rows={1} 
                        onChange={e => setPassword(e.target.value)}
                    />
                    </Form.Group>

                    {handleError()}
                    {handleSuccess()}

                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleFormSubmit}>
                    { title }
                </Button>
                </Modal.Footer>
        </Modal>   
    )
}

export default UserAuth;