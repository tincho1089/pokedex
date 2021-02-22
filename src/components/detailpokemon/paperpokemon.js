import React, { useEffect } from 'react';
import { useSelector} from "react-redux";
import { Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ChangeLng from '../uielements/changelng';


export default function PaperPokemon(props) {
    const objPokemon = useSelector(state => state.objPokemon);
    const language = useSelector(state => state.language);
    const { t, i18n } = useTranslation();

  //==============================================================
  useEffect(() => {
    if(props.characteristics.length !== 0){
        props.loadCharacter(props.characteristics.filter((ob => ob.language.name === language))[0]);
    }
  }, [language])
    //==============================================================

  return (
          <div id="pokemonContainer">
            <Paper elevation={3} id="screen" className="pokemon zoom" style={{display: 'flex', flexDirection: 'column', marginTop: '5%'}}>
              <div id='edit-area' className="divSvg">
                <svg width="488" height="313" viewBox="0 0 488 313" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', top:0}}>
                  <rect width="488" height="313" rx="18" fill="url(#paint0_linear)"/>
                  <defs>
                  <linearGradient id="paint0_linear" x1="244" y1="0" x2="244" y2="330.331" gradientUnits="userSpaceOnUse">
                  <stop stop-color={props.colorBase}/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                  </linearGradient>
                  </defs>
                </svg>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', margin: 'auto', zIndex: 100 }}>
                
                <label className="pokemonNames">{ objPokemon.name }</label>
                {
                  props.mainInfo.stats !== undefined &&
                  <label className="pokemonNames">{ props.mainInfo.stats.filter(st => st.stat.name === "hp")[0].base_stat + " HP"}</label>
                }
              </div>
              <img className="imgPokemon" src={ objPokemon.imageUrl } alt={objPokemon.name} style={{zIndex: 100}}/>
              <hr></hr>
                <label className="pokemonDetail">{ props.character.description }</label>
              <hr></hr>
              {
                props.mainInfo.stats !== undefined &&
                <div  style={{display: 'flex', flexDirection: 'column',width: '100%', marginBottom: '30px'}}>
                  <div className="rowStat">
                    <label className="pokemonDetail">{ t("Weight") + props.mainInfo.weight }</label>
                    <label className="pokemonDetail">{ "EXP: " + props.mainInfo.base_experience }</label>
                  </div>
                  <div className="rowStat">
                    <label className="pokemonDetail">{ t("Attack") + props.mainInfo.stats.filter(st => st.stat.name === "attack")[0].base_stat }</label>
                    <label className="pokemonDetail">{ t("Defense") + props.mainInfo.stats.filter(st => st.stat.name === "defense")[0].base_stat }</label>  
                  </div>
                  <div className="rowStat">
                    <label className="pokemonDetail">{ t("Sp. Attack") + props.mainInfo.stats.filter(st => st.stat.name === "special-attack")[0].base_stat }</label>
                    <label className="pokemonDetail">{ t("Sp. Defense") + props.mainInfo.stats.filter(st => st.stat.name === "special-defense")[0].base_stat }</label>
                  </div>
                  <div className="rowStat">
                    <label className="pokemonDetail">{ t("Speed") + props.mainInfo.stats.filter(st => st.stat.name === "speed")[0].base_stat }</label>
                    {
                        props.mainInfo.types !== undefined && 
                          props.mainInfo.types.map((obj, index) => {
                            return (
                              <label className="pokemonDetail boxType" style={{backgroundColor: props.colorBase}}>{ obj.type.name }</label>      
                            )
                          })
                    }
                  </div>
                  <ChangeLng></ChangeLng>
                </div>
              }
            </Paper>
          </div>
  );
}