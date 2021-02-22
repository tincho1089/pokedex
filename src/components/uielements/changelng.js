import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import '../../language/i18n.js';

function ChangeLng () {
    const language = useSelector(state => state.language);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    dispatch({ type: "changeLanguage", language: language });

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        dispatch({ type: "changeLanguage", language: lng });
    }
    
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', margin: 'auto', zIndex: 100, paddingTop: '10px' }}>
            <button style={{ width: '48%', borderRadius: '10px', margin: 'auto', padding: '2px', backgroundColor: '#668CEC',opacity: '0.8'}} onClick={() => changeLanguage('es')}>
                <label className="pokemonNames" style={{fontSize: 'large', color: 'white'}}>{t('SPANISH')} </label>
            </button>
            <button style={{ width: '48%', borderRadius: '10px', margin: 'auto', padding: '2px', backgroundColor: '#668CEC',opacity: '0.8'}} onClick={() => changeLanguage('en')}>
                <label className="pokemonNames" style={{fontSize: 'large', color: 'white'}}>{t('ENGLISH')} </label>
            </button>
        </div>
    )
}

export default (ChangeLng);