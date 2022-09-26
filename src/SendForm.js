import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function SendForm({ friendsList }) {
    const [selectedFriend, setSelectedFriend] = useState({});
    const [message, setMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        let payload = selectedFriend;
        payload.timestamp = Date.now();
        payload.message = message;
        console.log(payload);
        //send api
        fetch(`${process.env.REACT_APP_BASE_URL}/publish_message`, {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    //show alert that it was sent
                    return response.json();
                }
                return response.text().then((text) => {
                    throw new Error(text);
                });
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Select friend</Form.Label>
                <Form.Select
                    value={selectedFriend.friend_name}
                    onChange={(e) => {
                        setSelectedFriend(
                            friendsList.find(
                                (friend) => friend.friend_name == e.target.value
                            )
                        );
                    }}
                >
                    <option>Select Friend</option>
                    {friendsList.map((item, index) => (
                        <option key={index}>{item.friend_name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Send Message
            </Button>
        </Form>
    );
}

export default SendForm;
