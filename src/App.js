import React, {useState, useEffect} from 'react';
import './App.scss';


function Character({character, chooseCharacter}){
  return(
    <button onClick={() => chooseCharacter(character.id)} className="character">
      <img src={character.image} alt={`${character.name}'s profile pic`}/>
      <h3>{character.name}</h3>
    </button>
  )
}

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  useEffect(() => {
    fetchCharacters();
  }, [])

  function fetchCharacters() {
    fetch('https://rickandmortyapi.com/api/character/')
    .then(resp => resp.json())
    .then(data => {setCharacters(data.results)})
  }

  function chooseCharacter(id){
    const character = characters.find(c => c.id === id);
    setSelectedCharacter(character)
  }

  return (
    <div className="App">
      <h1>Rick and Morty Characters</h1>

      {/* Show Selected Character */}
      {selectedCharacter && (
        <div className="selectedCharacter">
          <h3>You've Selected:</h3>
          <Character character={selectedCharacter}/>
        </div>
      )}

      {/* list character shere */}
      <div className="character-container">
        {characters.map((character, index) => (
          <Character key={index} character={character} chooseCharacter={chooseCharacter}/>
        ))}
      </div>
    </div>
  );
}

export default App;
