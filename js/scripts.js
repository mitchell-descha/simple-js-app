let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'bulbasaur',
      type: ['grass', 'poison'],
      height: 1.1
    },
    {
      name: 'charmander',
      type: ['fire'],
      height: 1.2
    },
    {
      name: 'squirtle',
      type: ['water'],
      height: 1.3
    },
    {
      name: 'pikachu',
      type: ['electric'],
      height: 1.4
    },
    {
      name: 'eevee',
      type: ['normal'],
      height: 1.5
    },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
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
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

let repository = pokemonRepository;
let pokemonList = repository.getAll();

pokemonList.forEach(function (pokemon) {
  repository.addListItem(pokemon);
});