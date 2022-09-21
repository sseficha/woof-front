function FriendList(props) {
    return (
        <ul>
            {props.friends.map((item, index) => <li key={index}>{item.name + item.email + item.phone}</li>)}
        </ul>

    );
}

export default FriendList;
