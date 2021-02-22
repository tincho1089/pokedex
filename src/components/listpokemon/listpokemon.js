import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Paper } from '@material-ui/core';
import '../../styles/pokedex2.css';
import PaginationOutlined from '../uielements/paginationoutlined';
import CircularProgressLoad from '../uielements/circularprogressload';

function ListPokemon() {
	const [pokemonList, loadPokemonList] 	= useState([]);
	const [loadingView, showLoadingView ] 	= useState('block');
	const offset 							= useSelector(state => state.offset);
	const dispatch 							= useDispatch();
		  
	//==============================================================
	useEffect(() => {
    showLoadingView('block');
		fetch('https://pokeapi.co/api/v2/pokemon/?offset=' + offset + '&limit=5', {
			method: 'GET',
			headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if(res.status != 200){ throw res }
			return res.json();
		})
		.then(data => {
			loadPokemonList(data.results);
			showLoadingView('none');
		})
		.catch(err => {
			console.log(err);
			showLoadingView('none');
		})
	}, [offset])
	//==============================================================
	const selectPokemon = (obj) => {
		dispatch({ type: "selectPokemon", objPokemon: obj });
		dispatch({ type: "showHideDetails"});
	}
	//==============================================================

	return (
    <div>
      <CircularProgressLoad loadingView={loadingView} ></CircularProgressLoad>
      {
        loadingView === 'none' &&
        <div>
          <div id="pokemonContainer">
            {
              pokemonList.map ((n, idx) => {
                var urlarr = n.url.split('/');
                var pokemonImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + urlarr[6] + ".png";
                var obj = {id: urlarr[6], name: n.name, imageUrl: pokemonImage }
                return (
                  <Paper elevation={3} id="screen" key={idx} className="pokemon zoom">
                    <img className="imgPokemon" src={ pokemonImage } alt={n.name} onClick={() => selectPokemon(obj)} />
                    <label className="pokemonNames">{n.name}</label>
                  </Paper>
                )
              })
            }
          </div>
          <div style={{width: '100%'}}>
            <div style={{width: '20%', margin: 'auto', padding: '50px'}}>
              <PaginationOutlined></PaginationOutlined>
            </div>
          </div>
        </div>
      }
    </div>
	);
}

export default ListPokemon;
