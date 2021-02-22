import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import CircularProgressLoad from '../uielements/circularprogressload';
import DialogCus from './dialogcus';
import PaperPokemon from './paperpokemon';


export default function DetailPokemon() {
    const objPokemon = useSelector(state => state.objPokemon);
    const language = useSelector(state => state.language);
    const [characteristics, loadCharacteristics] = useState([]);
    const [character, loadCharacter ] = useState({});
    const [mainInfo, loadMainInfo ] = useState({});
    const [colorBase, loadColorBase] = useState("");
    const [loadingView, showLoadingView] = useState('none');
    //==============================================================
    useEffect(() => {
      showLoadingView('block');
      fetch('https://pokeapi.co/api/v2/characteristic/' + objPokemon.id, {
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
        loadCharacteristics(data.descriptions);
        loadCharacter(data.descriptions.filter((ob => ob.language.name === language))[0])
      })
      .catch(err => {
        console.log(err);
        showLoadingView('none');
      })
    }, [objPokemon.id])
     //==============================================================
     useEffect(() => {
      showLoadingView('block');
      fetch('https://pokeapi.co/api/v2/pokemon/' + objPokemon.id, {
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
        loadMainInfo(data);
      })
      .catch(err => {
        console.log(err);
        showLoadingView('none');
      })
    }, [objPokemon.id])
    //==============================================================
    useEffect(() => {
      if(mainInfo.species !== undefined){
        showLoadingView('block');
        fetch(mainInfo.species.url, {
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
          loadColorBase(data.color.name);
          showLoadingView('none');
        })
        .catch(err => {
          console.log(err);
          showLoadingView('none');
        })
      }
  }, [mainInfo])
  
  //==============================================================
  useEffect(() => {
    if(characteristics.length !== 0){
      loadCharacter(characteristics.filter((ob => ob.language.name === language))[0]);
    }
  }, [language])
	//==============================================================

  return (
    <div>
      <DialogCus colorBase={colorBase}>
        <CircularProgressLoad loadingView={loadingView} ></CircularProgressLoad>
        {
			    loadingView === "none" &&
          <PaperPokemon colorBase={colorBase} mainInfo={mainInfo} characteristics={characteristics} character={character} loadCharacter={loadCharacter}></PaperPokemon>
        }
      </DialogCus>
    </div>
  );
}