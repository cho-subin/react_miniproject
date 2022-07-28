// write->card.js

// Actions (액션 타입 정해주는 곳 / 별 의미는 없고 이름은 내가 정해주면 되는거였음...)

const WRITE = 'write/WRITE';

//초기값
const initialState = {
    list: [{
        writeTitle: '',
        writeIntroduce: '',
    }]
}

// Action Creators(액션 생성 함수 만들어주는 곳)

export function userWrite(write) { // 액션 생성 함수는 액션 객체를 리턴해줘야 됨 / ()안에는 추가할 값
    return { type: WRITE, write: write }; // 딕셔너리 형(앞에는 액션타입 뒤에는 무엇을 추가해!라는 내용)
}
// { type: 'user/LOGIN', user: user };
// Reducer

export default function writeReducer(state = initialState, action = {}) { // 파라미터 = {} : 기본값을 주는것 (파라미터에 값이 안들어온다면 빈 딕셔너리 일거라는것을 알려주는것, 오류막기 )
    switch (action.type) { //switch case : ~~할때 ~~해!
        case "write/WRITE":  // case안에서 return해주는 어떤 값이 새로운 state값이 됨!
            console.log(action)
            const keepWrite_data = [action.payload];
            console.log(keepWrite_data);
            return { list: keepWrite_data };
        default:
            return state;
    }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget() {
//     return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
// }