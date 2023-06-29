let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    )
      pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonListContainer = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonListContainer.appendChild(listItem);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (details) {
      console.log(details);
    });
  }

  function LoadList() {
    return fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return Promise.all(
          data.results.map(function (pokemon) {
            let newPokemon = {
              name: pokemon.name,
              detailsUrl: pokemon.url
            };
            add(newPokemon);
          })
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.height = details.height;
        pokemon.imgUrl = details.sprites.front_default;
        return details; 
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    LoadList: LoadList,
    loadDetails: loadDetails
  };
})();

let repository = pokemonRepository;

repository.LoadList().then(function () {
  let pokemonList = repository.getAll();
  pokemonList.forEach(function (pokemon) {
    repository.addListItem(pokemon);
  });
});