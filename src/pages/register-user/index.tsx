import { useState } from "react";

const RegisterUser = () => {
  const [userId1C, setUserId1C] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const postUser = async () => {
    const userToPost = {
      id1C: userId1C,
      userName: userName,
      email: userEmail,
      password: "string",
    };

    const response = await fetch(
      `https://localhost:7164/Authentication/Registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToPost),
      }
    );

    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      <input
        style={{ color: "black" }}
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        placeholder="User name"
      />
      <input
        style={{ color: "black" }}
        onChange={(e) => setUserEmail(e.target.value)}
        type="text"
        placeholder="Email"
      />
      <input
        style={{ color: "black" }}
        onChange={(e) => setUserId1C(e.target.value)}
        type="text"
        placeholder="Id 1C"
      />
      <button onClick={postUser}>Register user</button>
    </div>
  );
};

export default RegisterUser;
