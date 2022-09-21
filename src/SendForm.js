import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


function SendForm(props) {
    const [selectedName, setSelectedName] = useState()
    const [message, setMessage] = useState("")

    function handleSubmit(e) {
        console.log(selectedName, message)
        //send api
        
        //if ok show alert that it was sent
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Select friend</Form.Label>
                <Form.Select value={selectedName} onChange={(e) => setSelectedName(e.target.value)}>
                    <option>Select Friend</option>
                    {props.friends.map((item, index) => <option key={index}>{item.name}</option>)}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control type="text" placeholder="Enter message" value={message} onChange={(e) => setMessage(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Send Message
            </Button>
        </Form>

    );
}

export default SendForm;
