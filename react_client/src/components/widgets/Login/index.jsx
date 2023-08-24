import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState} from "react";
import { showAuthModal } from "../../../store/login";
import { useSelector, useDispatch } from "react-redux"
export function UserAuth(props){

    const visible = useSelector((state) => state.authModalVisible.value);
    const title = useSelector((state) => state.authModalVisible.title)

    useEffect(() => {}, [props.title]);

    const dispatch = useDispatch();

    function handleClose(){
        dispatch(showAuthModal());
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
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Password</Form.Label>
                    <Form.Control as="textarea" rows={1} />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
        </Modal>   
    )
}

export default UserAuth;