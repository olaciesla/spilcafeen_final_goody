import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  // user is a prop containing user data, ex:
  // {id: "...", image: "...", mail: "...", name: "...", phone: "...", title: "..."}
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/users/${user.id}`);
  }

  return (
    <article className="user-card" onClick={handleClick}>
      <img
        src={
          user.image || "https://placehold.co/600x400?text=Error+loading+image"
        }
        alt={user.name}
      />
      <h2>{user.name}</h2>
      <p className="players">{user.players}</p>
      <p className="time">{user.time}</p>
      <p className="genre">{user.genre}</p>
    </article>
  );
}
