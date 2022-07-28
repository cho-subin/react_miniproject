import React from 'react';
import '../css/AddBtn.css';
// font-awesome 사용방법
// 장점 : 폰트 속성 적용하듯 css로 손쉽게 색, 크기를 변경할 수 있으며 절대로 깨지지 않는다.
// https://jae04099.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90-font-awesome-%EC%95%84%EC%9D%B4%EC%BD%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function AddBtn(props) {
    const navigate = useNavigate();

    return (
        <div className="Add_Btn" onClick={()=>{navigate("/write")}}>
            <div className='add_icon'>
                <FontAwesomeIcon icon={faPenToSquare} className="checkpen" />
            </div>
            
        </div>
    );
}

export default AddBtn;
