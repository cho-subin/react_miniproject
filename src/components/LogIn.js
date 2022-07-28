import '../css/LogIn.css';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

function LogIn({ is_login, setIsLogin, setUsers, users }) {

  let dispatch = useDispatch();

  // axios.post("http://sparta-9kyo.shop/user/signup", {
  //     username: id_ref.current.value,
  //     password: pw_ref.current.value,
  //     password2: re_pw_ref.current.value,
  //   }).then(response => {
  //     console.log(response)
  //   }); // get에 요청할 주소만 넣어주면됨

  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const { username, password } = users; // 비구조화 할당을 통해 값 추출

  const loginId = useSelector((state) => (state.userReducer.username)); // 어떤 데이터를 가지고오고 싶은지?
  console.log(loginId);

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setUsers({
      ...users, // 기존의 inputValue 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  }

  // 1. input에 입력되는 로그인과 비밀번호 값을 ref으로 받아서 가져옴
  // 2. 그 ref값을 로그인하기 버튼 온클릭에 넣어줌

  //로그인하기 버튼 눌렀을때 보낼준비 마치기.(console.log에 아이디,비번값 찍히는지)
  const LogInState = () => {

    console.log(users)

    axios.post("http://sparta-9kyo.shop/user/login", {
      username: id_ref.current.value,
      password: pw_ref.current.value,
    }).then(response => { // 성공
      console.log(response) // 찍히면 성공상태
      document.cookie = `loginCookie=${response.data}` // 쿠키에 토큰 저장
      alert('로그인 성공!')
      dispatch({ type: 'user/LOGIN', payload: users }) // 성공후 상단에 아이디가 뜨게 설정

    }).catch(error => { // 실패
      alert('아이디 비밀번호가 맞지 않습니다')// 실패동작
    }); // get에 요청할 주소만 넣어주면됨
    
  }

  // img는 firestore에 업로드 해서 url을 백엔드에 보내준다.

  return (
    <div className="login">
      <div className='login_wrap'>
        <div className='login_title'>
          <h1>로그인</h1>
        </div>
        <hr className='login_hr' />
        <div className='login_id'>
          <h1>ID</h1>
          <input type="text" placeholder='아이디를 입력해주세요' ref={id_ref}
          name="username" onChange={onChange} value={username}/>
        </div>
        <div className='login_pw'>
          <h1>PW</h1>
          <input type="password" placeholder='비밀번호를 입력해주세요' ref={pw_ref}
          name="password" onChange={onChange} value={password}/>
        </div>
        <div className='login_btn'>
          <button onClick={LogInState}>로그인 하기</button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
