import '../css/Local.css';
import { useNavigate, useParams } from 'react-router-dom';
import AddBtn from './AddBtn';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Local() {

    const [cardListApi,setCardListApi] = useState({
        list:[

        ]
    });

    const navigate = useNavigate();
    const params = useParams();

    // const my_lists = useSelector((state)=>state.write.list);
    let cardList = {
        list: [
            { id :1, title: "모각코 하실 프론트앤드 구해요", count: "6" },
            { id :2, title: "보드 타러 가실분!", count: "3" },
            { id :3, title: "저녁에 같이 저녁 드실분들 구해요", count: "4" },
            { id :4, title: "치맥 페스티벌 가실분 구해요", count: "2" },
            { id :5, title: "보드 타러 가실분", count: "4" },
        ]
    }

    useEffect(() => {
        // axios 요청하기(axios의 response)
        axios.get(`http://sparta-9kyo.shop/api/post/local/${params.localcode}`).then(response => {
        cardList.list = [...response.data]
        setCardListApi(cardList)
        console.log('api 호출 성공',params.localcode)
    });
      },[params.localcode]) // [] : 안에 있는 값이 바뀌면 다시 useEffect 작동
      console.log(cardListApi);

    return (
        <div className="Local">
            <AddBtn />
            <div className='card_list'>
                {/* 초기 값 배열에서 list까지 가야지 에러 안뜬다. */}
                {cardListApi.list.map((list, index) => {
                    return (
                        <div className="Card" key={index} onClick={() => { navigate(`/detail/${list.id}`)}}>
                            <div className='img_wrap'>
                                <div></div>
                            </div>
                            <div className='text_wrap'>
                                <h3>{list.title}</h3>
                                <button>{list.partyNum}명</button>
                            </div>
                        </div>
                    );
                 })}
            </div>
        </div>
    );
}

export default Local;
