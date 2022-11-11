import {tokenReducer} from"./tokens/tokensReducer";
import{legacy_createStore as creatStore} from 'redux'
const store = creatStore(tokenReducer)

export default store