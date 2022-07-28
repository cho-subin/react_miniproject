import '../css/Detail.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Detail() {

  // 파라미터를 가져오기 위해 react-router-dom의 useParams 훅을 사용!
  const params = useParams();
  const navigate = useNavigate(); //App에서 동적라우팅 한거 (:localcode) 받아온거

  console.log(params)
  // 위에 주소창에 http://localhost:3000/local/1 라고쓰면
  // 콘솔에 {local: ':1'}가 뜸
  //useNavigate

  // <Local /> -> 전체 게시물
  // [게시물, 게시물, 게시물]

  // 게시물 하나를 클릭 할때 ->
  // 해당 게시물의 id를 참조해서 라우팅

  // navigate(‘/detail/id’)

  // 2.
  // /detail/:id -> <Detail />
  // useParams() -> id 불러오기

  // /api/post/{id}/detail 로 상세데이터 불러오기
  // const [detailData, setDetailData] = useState(null)
  // setDetailData(받아온값)
  // detailData.title
  // detailData.desc

  // const [idParams,setIdParams] = useState(params.id);

  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    axios.get(`http://sparta-9kyo.shop/api/post/${params.id}`).then(response => {
      console.log(response)
      setDetailData({...response.data})
      console.log('api 호출 성공', params.id)
    });
  }, [params.id]) // [] : 안에 있는 값이 바뀌면 다시 useEffect 작동
  console.log(detailData)

  // contents: "수성구를 위한 데이터"
  // createdAt: "2022-07-28 14:19:29"
  // dones: false
  // id: 25
  // joinNum: 0
  // locationName: 1
  // modifiedAt: "2022-07-28 14:19:29"
  // partyNum: 10
  // title: "수성구"
  // userName: "user3"

  return (
    <div className="Detail">
      <div className='detail_wrap'>
        <div className='detail_img'>
          <div></div>
        </div>
        <div className='detail_title'>
          <h1>{detailData.title}</h1>
        </div>
        <div className='detail_count'>
          <button>{detailData.partyNum} 명</button>
        </div>
        <div className='detail_write'>
          <p>
            {detailData.contents}
          </p>
        </div>
        <div className='back_btn'>
          <button onClick={()=>{navigate(-1)}}>다른 MODIRA 보러갈래요!</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
