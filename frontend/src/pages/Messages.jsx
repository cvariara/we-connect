const Messages = ({ user }) => {
  console.log(user);
  return (
    <div>
      <h1>Messages List</h1>
      <h2>{user.username}</h2>
    </div>
  )
}

export default Messages;