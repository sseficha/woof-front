import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function FriendForm({ username, friendsList, setFriendsList }) {
    const [formData, setFormData] = useState({
        username: username,
        friend_name: "",
        friend_email: "",
        friend_phone: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        //send api
        fetch(`${process.env.REACT_APP_BASE_URL}/add_friend`, {
            method: "POST",
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return response.text().then((text) => {
                    throw new Error(text);
                });
            })
            .then((data) => {
                setFriendsList([...friendsList, formData]);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Form validated={true}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Friend Name</Form.Label>
                <Form.Control
                    value={formData.friend_name}
                    onChange={(e) =>
                        setFormData((formData) => ({
                            ...formData,
                            ...{ friend_name: e.target.value },
                        }))
                    }
                    type="text"
                    required
                    placeholder="Enter friend's name"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    value={formData.friend_email}
                    onChange={(e) =>
                        setFormData((formData) => ({
                            ...formData,
                            ...{ friend_email: e.target.value },
                        }))
                    }
                    type="email"
                    required
                    placeholder="Enter email"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    value={formData.friend_phone}
                    onChange={(e) =>
                        setFormData((formData) => ({
                            ...formData,
                            ...{ friend_phone: e.target.value },
                        }))
                    }
                    type="tel"
                    required
                    //   pattern="[0-9]{10}"
                    placeholder="Enter phone number"
                />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Add friend
            </Button>
        </Form>
    );
}
export default FriendForm;
