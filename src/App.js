import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import { Provider } from "react-redux";
import store from './redux/store';

import Main from './components/Main';
import Header from './components/Header';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Write from './components/Write';
import Detail from './components/Detail';
import GuBtns from './components/GuBtns';
import Local from './components/Local';

function App() {

  // 유저 id state ( test 위해서 임시 기본값 줌)
  const [users, setUsers] = React.useState({
    username: '',
    password: '',
  });

  // 로그인 기본값은 로그인 안되있는 상태로 고정..  
  const [is_login, setIsLogin] = React.useState(false);

  // 로그인 상태 확인 후 로그인이 true인지 false인지 useEffect로 결정해줘야됨.(사이드 이펙트 관리)
  // const loginCheck = (user) => { // 유저를 가지고 와서 
  //   if (user) { // 만약에 유저가 있다면?
  //     setIsLogin(true); // useState의 setIsLogin값을 true로 바꿔준다.
  //     setUsers(user.username)
  //   }
  //   else { // 만약에 유저가 없다면?
  //     setIsLogin(false); // useState의 setIsLogin값을 false로 바꿔준다.
  //     setUsers(null)
  //   }
  // };

  // 로그인 상태 확인 후 로그인이 true인지 false인지 useEffect로 결정해줘야됨.(사이드 이펙트 관리)
  const loginCheck = (users) => { // 유저를 가지고 와서 
    if (axios.get("http://sparta-9kyo.shop/user/login").then(response => {
      console.log(response)
      document.cookie = `loginCookie=${response.data}`
    })) { // 만약에 user의 login 있다면?
      setIsLogin(true); // useState의 setIsLogin값을 true로 바꿔준다.
      setUsers(users.username)
    }
    else { // 만약에 유저가 없다면?
      setIsLogin(false); // useState의 setIsLogin값을 false로 바꿔준다.
      setUsers(null)
    }
  };

  // React.useEffect(() => { // useEffect는 main함수에서만 작동함
  //   loginCheck;
  // }, []);

  ///////////////////// write 정보들 ////////////////////////////

  // card 정보 배열 state
  const [boardArray, setBoardArray] = React.useState({
    writeTitle: '',
    writeIntroduce: '',
  });

  ////////// SignIn 정보들 ///////////


  // axios 강의 내용
  // const callSomething = async () => {
  //   let data = {
  //     "day": "일",
  //     "sleep_time": "10시간"
  //   }
  //   const response = await fetch("http://localhost:5001/sleep_times",{ // 이게 get 요청, fetch는 promise를 반환
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset = utf-8" //(어플리케이션) json으로 보내줄거야
  //     },
  //     body: JSON.stringify(data) //바디값에 넣어줄 값으로 data를 넣어줌.
  //   }) // fetch에 들어간 options는 객체 형식으로 만들어주면 됨
  //   console.log(response)
  // }

  // const callSomethingAxios = () => {
  //   axios({
  //     medhod: "get",
  //     url: "http://localhost:5001/sleep_times" // url을 어디서 가지고 올꺼야?
  //   }.then(response =>{
  //     console.log(response)
  //   })) // config 설정
  // }

  // React.useEffect(() => {
  //   callSomethingAxios();
  // }, []);

  // axios.get("http://localhost:5001/sleep_times").then(response => {
  //   console.log(response)
  // }); // get에 요청할 주소만 넣어주면됨

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header is_login={is_login}/>
          <GuBtns />
          <Routes>
            <Route exact path="/" element={<Main />} />
            {/* 여기가 카드 들어가는 페이지 useParams 걸기 */}
            {/* 여기에 카드 import해서 임시로 만들어놓기 */}
            {/* img 프레임에 비율 맞추기 */}
            <Route path="/local/:localcode" element={<Local />} />
            <Route path="/login" element={<LogIn is_login={is_login} setIsLogin={setIsLogin} users={users} setUsers={setUsers} />} />
            <Route path="/signin" element={<SignUp />} />
            <Route path="/write" element={<Write boardArray={boardArray} setBoardArray={setBoardArray}/>} />
            <Route path="/detail/:id" element={<Detail />} /> 
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
