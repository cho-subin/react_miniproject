import React, { useState, useRef } from 'react';
import '../css/Write.css';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

function Write({boardArray, setBoardArray}) {

  let dispatch = useDispatch();

  // gu select option에 SelectGu 배열을 순서에 맞게 각각 setSelect에 저장했다.
  const [selectGu, setSelectGu] = React.useState('');
  const [selectCount, setSelectCount] = React.useState('');

  const [previewImg, setPreviewImg] = React.useState();
  const [UploadImg, setUploadImg] = React.useState();

  console.log(selectGu);
  console.log(selectCount);

  // 못생긴 file type input을 button에 연동해주기 위한 ref
  const imageInput = React.useRef(null);
  const writeTitle_ref = React.useRef(null);
  const write_introduce_ref = React.useRef(null);

  const { writeTitle, writeIntroduce } = boardArray; // 비구조화 할당을 통해 값 추출

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setBoardArray({
      ...boardArray, // 기존의 inputValue 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
    console.log(boardArray)
  }

  // img 업로드
  const img_change = (e) => {
    console.log(e.target.files);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // 내가 올릴 img
    console.log(URL.createObjectURL(e.target.files[0]),'여기요!')
    reader.onload = () => {
      setPreviewImg(reader.result);
    };

    setUploadImg(e.target.files[0])
  }

  // 못생긴 file type 내가 만든 버튼 연동(버튼클릭시 file type input태그에 클릭이벤트를 걸어준다.)
  const click_file=()=>{
    imageInput.current.click();
  }

  const WriteClick = (e) =>{
    // input 비어있으면 경고창 띄우기
    // if( !writeTitle_ref.current.value || !imageInput.current.value || !write_introduce_ref.current.value ){
    //   alert("빈칸을 채워주세요!");
    //   return;
    // }

    // console.log(select);

    //URL.createObjectURL(e.target.files[0]
    console.log(selectGu,selectCount,UploadImg,boardArray);

    axios.post("http://sparta-9kyo.shop/api/post", {
      "title" : writeTitle_ref.current.value,
      // "imageUrl" : UploadImg,
      "contents" : write_introduce_ref.current.value,
      "partyNum" : selectCount,
      "locationName" : selectGu
    }).then(response => { // 성공
      console.log(response) // 찍히면 성공상태
      
    }).catch(error => { // 실패
      alert('작성해주세요!')// 실패동작
    }); // get에 요청할 주소만 넣어주면됨



    // const writeText = () => {
      //   axios({
      //     medhod: "get",
      //     url: "http://localhost:5001/sleep_times" // url을 어디서 가지고 올꺼야?
      //   }.then(response =>{
      //     console.log(response)
      //   })) // config 설정
      // }

    }

  return (
    <div className="Write">
      <div className='write_wrap'>
        <div className='main_title'>
          <h1>오늘의 MODIRA</h1>
        </div>
        <div className='write_title'>
          <h1>모임 제목</h1>
          <input type="text" placeholder='제목은 14자까지 작성됩니다' ref={writeTitle_ref}
          name="writeTitle" onChange={onChange} value={writeTitle}></input>
        </div>
        <div className='choice_gu'>
          <h1>모임 장소</h1>
          <select className='select_gu' onChange={e => { setSelectGu(e.target.value)}}>
            <option value='수성구'>수성구</option>
            <option value='동구'>동 구</option>
            <option value='서구'>서 구</option>
            <option value='중구'>중 구</option>
            <option value='남구'>남 구</option>
            <option value='북구'>북 구</option>
            <option value='달서구'>달서구</option>
          </select>
        </div>
        <div className='choice_count' onChange={e => { setSelectCount(e.target.value)}}>
          <h1>모임 최대인원</h1>
          <select className='select_count'>
            <option value={2}>2명</option>
            <option value={3}>3명</option>
            <option value={4}>4명</option>
            <option value={5}>5명</option>
            <option value={6}>6명</option>
            <option value={7}>7명</option>
            <option value={8}>8명</option>
          </select>
        </div>
        <div className='write_introduce'>
          <h1>모임 소개</h1>
          <textarea type="text" ref={write_introduce_ref}
          name="writeIntroduce" onChange={onChange} value={writeIntroduce}/>
        </div>
        {/* <div className='fine_img'> */}
          {/* <input type="file" placeholder='사진을 선택해주세요' className='file' onChange={img_change} ref={imageInput}/>
          <button className='button' onClick={click_file}>사진 선택</button>
          <img src={previewImg} className='preview_img'></img>
        </div> */}
        <div className='write_btn'>
          <button onClick={WriteClick}>등록하기</button>
        </div>
      </div>
    </div>
  );
}

export default Write;
