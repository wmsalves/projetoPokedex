const pokemonNome = document.querySelector('.nome-pokemon');
const pokemonNumero = document.querySelector('.numero-pokemon');
const pokemonImagem = document.querySelector('.img-pokemon');

const form = document.querySelector('.form');
const input = document.querySelector('.input_busca');
const botaoAnterior = document.querySelector('.anterior');
const botaoEnviar = document.querySelector('.enviar');
const botaoProximo = document.querySelector('.proximo');


let buscaPokemon = 1;

const procurarPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderizarPokemon = async (pokemon) => {

  pokemonNome.innerHTML = 'Procurando...';
  pokemonNumero.innerHTML = '';

  const data = await procurarPokemon(pokemon);

  if (data) {
    pokemonImagem.style.display = 'block';
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    buscaPokemon = data.id;
  } else {
    pokemonImagem.style.display = 'none';
    pokemonNome.innerHTML = 'Não encontrado';
    pokemonNumero.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderizarPokemon(input.value.toLowerCase());
});

botaoAnterior.addEventListener('click', () => {
  if (buscaPokemon > 1) {
    buscaPokemon -= 1;
    renderizarPokemon(buscaPokemon);
  }
});

botaoEnviar.addEventListener('click', () => {
  renderizarPokemon(input.value.toLowerCase());
});

botaoProximo.addEventListener('click', () => {
  buscaPokemon += 1;
  renderizarPokemon(buscaPokemon);
});

renderizarPokemon(buscaPokemon);
