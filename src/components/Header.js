import '../css/Header.css';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Header() {
    const navigate = useNavigate();
    const loginId = useSelector((state)=>(state.userReducer.username));
    // console.log(userid);

    return (
        <div className="Header">
            <div className='wrap'>
                <div className='logo'>
                    <h3 onClick={()=>navigate("/")}>MODIRA</h3>
                </div>
                <div className='login_btns'>
                    {/* onClick시 바로 함수 적용시 렌더링 되버림 */}
                    <button>{loginId? loginId:"항해99"}님</button>
                    <button >로그아웃</button>
                    {/* <button onClick={()=>navigate("/login")}>로그인</button>
                    <button onClick={()=>navigate("/signin")}>회원가입</button> */}
                </div>
            </div>
        </div>
    );
}

export default Header;
