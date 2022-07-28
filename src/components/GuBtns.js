import '../css/GuBtns.css';
import {useNavigate} from 'react-router-dom';

function GuBtns() {
  const navigate = useNavigate();
  return (
    <div className="GuBtns">
      <div className='wrap1'>
        <button onClick={()=>{navigate("/local/1")}}>수성구</button>
        <button onClick={()=>{navigate("/local/2")}}>동 구</button>
        <button onClick={()=>{navigate("/local/3")}}>북 구</button>
        <button onClick={()=>{navigate("/local/4")}}>중 구</button>
        <button onClick={()=>{navigate("/local/5")}}>서 구</button>
        <button onClick={()=>{navigate("/local/6")}}>달서구</button>
        <button onClick={()=>{navigate("/local/7")}}>남구</button>
      </div>
    </div>
  );
}

export default GuBtns;
