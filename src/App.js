import React from 'react';
import './App.css';
import './styles/pokedex2.css';
import DetailPokemon from './components/detailpokemon/detailpokemon';
import ListPokemon from './components/listpokemon/listpokemon';

function App() {	  
	return (
	<div id="mainContent" style={{ backgroundColor: '#F2F2F2'	}}>
		<img id="imglogo" src={ require('./img/pokedex/pokemon.png').default } alt="Pokemon" />
		<ListPokemon></ListPokemon>
		<DetailPokemon></DetailPokemon>
	</div>
	);
}

export default App;
