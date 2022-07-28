//store는 Reducer을 뭉친 rootReducer로 만든다.

import {createStore, combineReducers} from "redux";
import userReducer from "./moduls/login.js"; // 리듀셔 가져오고

const rootReducer = combineReducers({userReducer}); //리듀서들을 묶어준다.(지금은 하나밖에 없어서 하나만)

// rootReducer랑 createStore 엮어서 store 만들어줌
const store = createStore(rootReducer);

export default store;