export default function rootReducer(state = { objPokemon: {id: 1, name: '', imageUrl: ''}, offsetPage: 1, offset: 0, showDetails: false, language: "es" }, action) {
    switch (action.type) {
      case 'selectPokemon':
        return Object.assign({}, state, { objPokemon: action.objPokemon})
      case 'showHideDetails':
        return Object.assign({}, state, { showDetails: !state.showDetails})
      case 'changeOffsetPage':
        return Object.assign({}, state, { offsetPage: action.offsetPage, offset: (action.offsetPage * 5) - 5})
      case 'changeLanguage':
        return Object.assign({}, state, { language: action.language})
      default:
        return state
      break;
    }
  }