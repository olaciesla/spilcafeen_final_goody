import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [genreFilter, setGenreFilter] = useState(""); // state to handle genre filter
  const [playersFilter, setPlayersFilter] = useState(""); // state to handle players filter
  const [timeFilter, setTimeFilter] = useState(""); // state to handle time filter
  const [languageFilter, setLanguageFilter] = useState(""); // state to handle language filter
  const [difficultyFilter, setDifficultyFilter] = useState(""); // state to handle difficulty filter

  // users: name of the state
  // setUsers: name of the function to set the state

  useEffect(() => {
    getUsers();

    async function getUsers() {
      const data = localStorage.getItem("users"); // get data from local storage

      let usersData = [];

      if (data) {
        // if data exists in local storage
        usersData = JSON.parse(data); // parse the data from string to javascript array
      } else {
        // if data does not exist in local storage fetch the data from the API
        usersData = await fetchUsers(); // fetch the data from the API
      }

      console.log(usersData);
      setUsers(usersData); // set the users state with the data from local storage
    }
  }, []);

  async function fetchUsers() {
    const response = await fetch(
      "https://raw.githubusercontent.com/olaciesla/Spilecafe/main/spilecafe.json"
    ); // fetch the data from the API
    const data = await response.json(); // parse the data from string to javascript array
    localStorage.setItem("users", JSON.stringify(data)); // save the data to local storage
    return data; // return the data
  }

  // Search, filter and sort the users array

  const titles = [...new Set(users.map((user) => user.title))];
  const genres = [...new Set(users.map((user) => user.genre))]; // get all the unique titles from the users array

  let filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (genreFilter) {
    filteredUsers = filteredUsers.filter((user) => user.genre === genreFilter);
  }

  if (playersFilter) {
    filteredUsers = filteredUsers.filter(
      (user) => user.players === playersFilter
    );
  }

  if (timeFilter) {
    filteredUsers = filteredUsers.filter((user) => user.time === timeFilter);
  }

  if (languageFilter) {
    filteredUsers = filteredUsers.filter(
      (user) => user.language === languageFilter
    );
  }

  if (difficultyFilter) {
    filteredUsers = filteredUsers.filter(
      (user) => user.difficulty === difficultyFilter
    );
  }

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Search by Name{" "}
          <input
            placeholder="Search"
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <label>
          Filter by Genre
          <select onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="">select genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Players
          <select onChange={(e) => setPlayersFilter(e.target.value)}>
            <option value="">select players</option>
            {[...new Set(users.map((user) => user.players))].map((players) => (
              <option key={players} value={players}>
                {players}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Time
          <select onChange={(e) => setTimeFilter(e.target.value)}>
            <option value="">select time</option>
            {[...new Set(users.map((user) => user.time))].map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Language
          <select onChange={(e) => setLanguageFilter(e.target.value)}>
            <option value="">select language</option>
            {[...new Set(users.map((user) => user.language))].map(
              (language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              )
            )}
          </select>
        </label>

        <label>
          Filter by Difficulty
          <select onChange={(e) => setDifficultyFilter(e.target.value)}>
            <option value="">select difficulty</option>
            {[...new Set(users.map((user) => user.difficulty))].map(
              (difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              )
            )}
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredUsers.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </section>
    </section>
  );
}
