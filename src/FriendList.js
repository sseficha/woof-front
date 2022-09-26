function FriendList(props) {
    return (
        <ul>
            {props.friendsList.map((item, index) => (
                <li key={index}>
                    {item.friend_name +
                        " " +
                        item.friend_email +
                        " " +
                        item.friend_phone}
                </li>
            ))}
        </ul>
    );
}

export default FriendList;
