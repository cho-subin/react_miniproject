import '../css/SignUp.css';
import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {

  const [inputValue, setInputValue] = useState({
    username: '',
    password: '',
    password2: ''
  });

  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const re_pw_ref = React.useRef(null);

  const { username, password, password2 } = inputValue; // 비구조화 할당을 통해 값 추출

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputValue({
      ...inputValue, // 기존의 inputValue 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  }
  console.log(inputValue);


  // const callSingUpAxios = () => {
  //   axios({
  //     medhod: "get",
  //     url: "http://sparta-9kyo.shop/api/post" // url을 어디서 가지고 올꺼야?
  //   }.then(response => {
  //     console.log(response)
  //   })) // config 설정
  // }



  const onClick = () => {
    console.log(inputValue);
    // 아이디 & 비밀번호 유효성 검사
    // 이 로직은 상태가 아닌 값 자체를 나타내는 로직이기 때문에 변수로 나타낸다.

    // 정규식에서 특수문자가 있으면 true 되야되는데 앞에 !있어서 false로 나옴!
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    const isValid = !regExp.test(inputValue.username);
    // const isValid = inputValue.username.includes('a-Z') && inputValue.username.includes('0-9');
    // 비밀번호 특수문자 검사를 위한 정규식표현.
    const specialLetter = inputValue.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    // 특수문자 1자 이상, 전체 8자 이상일것.
    const isValidPassword = inputValue.password.length >= 8 && specialLetter >= 1;
    // 비밀번호 check
    const Passwordright = inputValue.password.length === inputValue.password2.length;

    console.log(isValid);
    console.log(isValidPassword);
    console.log(Passwordright);

    // 형식에 맞지않으면 경고창
    if(isValid === true && isValidPassword === true && Passwordright===false){
      alert('비밀번호 check 해주세요!')
    }
    else if(isValid === true && isValidPassword === true && Passwordright===true){
      alert('새로운 modira 회원님 환영합니다!')
    }
    else if(isValid === false ){
      alert('아이디 형식이 맞지 않습니다!')
    }
    else if(isValidPassword === false){
      alert('비밀번호 형식이 맞지 않습니다!')
    }

    axios.post("http://sparta-9kyo.shop/user/signup", {
      username: id_ref.current.value,
      password: pw_ref.current.value,
      password2: re_pw_ref.current.value,
    }).then(response => {
      console.log(response)
    }); // get에 요청할 주소만 넣어주면됨

  }

  // 체크박스 검사(초기상태는 체크 안되어있으니 false)
  // const [checkBoxActive, setCheckboxActive] = useState(false);
  // const isCheckBoxClicked = () => {
  //   setCheckboxActive(!checkBoxActive); // checkBoxActive의 앞에 !(not)로 인해 클릭이 될 때 마다 상태가 false -> true 다시 false -> true 이런식으로 바뀜
  // };

  return (
    <div className="SignUp">
      <div className='sign_wrap'>
        <div className='sign_title'>
          <h1>회원가입</h1>
        </div>
        <hr className='sign_hr' />
        <div className='sign_wrap_bottom'>
          <div className='signup_id'>
            <h1>ID</h1>
            <input type="text" placeholder=' 아이디를 입력해주세요 ' ref={id_ref}
              name="userid" onChange={onChange} value={username} />
          </div>
          <div className='re_signup_id'>
            <h1></h1>
            <button>ID 중복확인</button>
          </div>
          {/* <div className='signup_name'>
          <h1>닉네임</h1>
          <input type="text" placeholder=' 닉네임을 입력해주세요' ref={name_ref}/>
        </div> */}
          <div className='signup_pw'>
            <h1>PW</h1>
            <input type="password" placeholder=' 특수문자 1자 이상, 전체 8자 이상' ref={pw_ref}
              name="password" onChange={onChange} value={password} />
          </div>
          <div className='signup_re_pw'>
            <h1>PW<br />확인</h1>
            <input type="password" placeholder=' 비밀번호를 다시 입력해주세요' ref={re_pw_ref}
              name="passwordCheck" onChange={onChange} value={password2} />
          </div>
          <div className='signup_btn'>
            <button onClick={onClick}>회원가입 하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
