import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useSelector, useDispatch } from "react-redux";
import { Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ChangeLng from '../uielements/changelng';
import CircularProgressLoad from '../uielements/circularprogressload';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailPokemon() {
    const showDetails = useSelector(state => state.showDetails);
    const objPokemon = useSelector(state => state.objPokemon);
    const language = useSelector(state => state.language);
    const dispatch = useDispatch();
    const [characteristics, loadCharacteristics] = useState([]);
    const [character, loadCharacter ] = useState({});
    const [mainInfo, loadMainInfo ] = useState({});
    const [colorBase, loadColorBase] = useState("");
    const classes = useStyles();
    const [loadingView, showLoadingView] = useState('none');
    const { t, i18n } = useTranslation();
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
      <Dialog fullScreen open={showDetails} onClose={() => dispatch({ type: "showHideDetails"})} TransitionComponent={Transition} style={{ backgroundColor: '#F2F2F2'	}}>
          <AppBar className={classes.appBar} style={{backgroundColor: colorBase}}>
            <Toolbar>
              <IconButton edge="start" color="inheritcls" onClick={() => dispatch({ type: "showHideDetails"})} aria-label="close">
              <CloseIcon></CloseIcon>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <label className="pokemonNames">{ objPokemon.name }</label>
              </Typography>
            </Toolbar>
          </AppBar>
          <CircularProgressLoad loadingView={loadingView} ></CircularProgressLoad>
      {
			  loadingView === "none" &&

          <div id="pokemonContainer">
            <Paper elevation={3} id="screen" className="pokemon zoom" style={{display: 'flex', flexDirection: 'column', marginTop: '5%'}}>
              <div id='edit-area' style={{position:'relative', overflow:'none', display:'inline-block', width: '488px', height: 'auto', zIndex: 99}}>
                <svg width="488" height="313" viewBox="0 0 488 313" fill="none" xmlns="http://www.w3.org/2000/svg"  style={{position: 'absolute', top:0}}>
                  <rect width="488" height="313" rx="18" fill="url(#paint0_linear)"/>
                  <defs>
                  <linearGradient id="paint0_linear" x1="244" y1="0" x2="244" y2="330.331" gradientUnits="userSpaceOnUse">
                  <stop stop-color={colorBase}/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                  </linearGradient>
                  </defs>
                </svg>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', margin: 'auto', zIndex: 100 }}>
                
                <label className="pokemonNames">{ objPokemon.name }</label>
                {
                  mainInfo.stats !== undefined &&
                  <label className="pokemonNames">{ mainInfo.stats.filter(st => st.stat.name === "hp")[0].base_stat + " HP"}</label>
                }
              </div>
              <img className="imgPokemon" src={ objPokemon.imageUrl } alt={objPokemon.name} style={{zIndex: 100}}/>
              <hr style={{borderTop: '1px solid #E1DEDE', width: '90%'}}></hr>
                <label className="pokemonDetail">{ character.description }</label>
              <hr style={{borderTop: '1px solid #E1DEDE', width: '90%'}}></hr>
              {
                mainInfo.stats !== undefined &&
                <div  style={{display: 'flex', flexDirection: 'column',width: '100%', marginBottom: '30px'}}>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', margin: 'auto', zIndex: 100 }}>
                    <label className="pokemonDetail">{ t("Weight") + mainInfo.weight }</label>
                    <label className="pokemonDetail">{ "EXP: " + mainInfo.base_experience }</label>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', margin: 'auto', zIndex: 100 }}>
                    <label className="pokemonDetail">{ t("Attack") + mainInfo.stats.filter(st => st.stat.name === "attack")[0].base_stat }</label>
                    <label className="pokemonDetail">{ t("Defense") + mainInfo.stats.filter(st => st.stat.name === "defense")[0].base_stat }</label>  
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', margin: 'auto', zIndex: 100 }}>
                    <label className="pokemonDetail">{ t("Sp. Attack") + mainInfo.stats.filter(st => st.stat.name === "special-attack")[0].base_stat }</label>
                    <label className="pokemonDetail">{ t("Sp. Defense") + mainInfo.stats.filter(st => st.stat.name === "special-defense")[0].base_stat }</label>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', margin: 'auto', zIndex: 100 }}>
                    <label className="pokemonDetail">{ t("Speed") + mainInfo.stats.filter(st => st.stat.name === "speed")[0].base_stat }</label>
                    {
                        mainInfo.types !== undefined && 
                          mainInfo.types.map((obj, index) => {
                            return (
                              <label className="pokemonDetail" style={{backgroundColor: colorBase, borderRadius: '10px', width: '30%', textAlign: 'center', opacity: '0.7'}}>{ obj.type.name }</label>      
                            )
                          })
                    }
                  </div>
                  <ChangeLng></ChangeLng>
                </div>
              }
            </Paper>
          </div>
        }
      </Dialog>
    </div>
  );
}