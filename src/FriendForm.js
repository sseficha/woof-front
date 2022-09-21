import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FriendForm() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        console.log(name, email, phone)
        //send api
        fetch('https://mfek2akvue.execute-api.eu-central-1.amazonaws.com/Prod/add_friend', {
            method: 'POST',
            body: JSON.stringify({ 'user_email': 'solonsef@gmail.com', 'user_friend': 'Cocomoko', 'email': 'coco@gmail.com', 'phone': '6981818181' })
        })
            .then((response) => response.json())
            .then((data) => console.log(data));

        //if ok then update state

    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Friend Name</Form.Label>
                <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter friend's name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Enter phone number" />
            </Form.Group>
            <Button variant="primary" type='submit' onClick={handleSubmit}>
                Add friend
            </Button>
        </Form>

    );
}
export default FriendForm;
