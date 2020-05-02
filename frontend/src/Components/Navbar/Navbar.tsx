import React from 'react';
import Modal from '../../Utils/Modal/Modal';
import { connect } from 'react-redux';
import { AuthActions } from '../../actions/Auth/action';
import { IAuthState } from '../../actions/Auth/model';
import { IApplicationState } from "../../store/state";
import { IFormProps } from "../../Utils/FormController"
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { Link, RouteComponentProps } from 'react-router-dom';
//@ts-ignore
import login from "../../Assets/Icons/login.svg";
//@ts-ignore
import logout from "../../Assets/Icons/logout.svg";

type IProps = typeof AuthActions & IAuthState & IFormProps & RouteComponentProps
const Navbar = (props: IProps) => {
    const onCancel = () => {
        props.toggleLoginModal(false)
    }

    const onLoginOk = (data: any) => {
        props.loginRequest({ email: data.email, password: data.password })
    }
    const onRegisterOk = (data: any) => {
        props.registerRequest({ email: data.email, password: data.password, fullName: data.fullName })
    }
    return (
        <div className="navbar">
            <Modal
                visiblity={props.login.open}
                onCancel={onCancel}
                title="LOGIN" >
                <div className="authPanel">
                    <div className="RegisterPanel">
                        <Register {...props} onOk={(data) => onRegisterOk(data)} />
                    </div>
                    <div className="LoginPanel">
                        <Login {...props} onOk={(data) => onLoginOk(data)} />
                    </div>
                </div>
            </Modal>
            <h1 className="logo"><Link to="/" >NILI</Link></h1>
            <ul className="navMenu">
                {props.isAuth ? (
                    <li className="navMenuItem"><Link to="/adminPanel">Dashboard</Link></li>
                ) : (
                        <li className="navMenuItem"><Link to="/">Home</Link></li>
                    )}
                <li className="navMenuItem"><Link to="/About">About Nili</Link></li>
                <li className="navMenuItem">Our Feathure</li>
                <li className="navMenuItem">Contact us</li>
            </ul>
            <div className="navAuth">
                {props.isAuth ? (
                    <img alt="icon" src={logout} className="navLogin" onClick={() => {
                        props.logOutRequest()
                        props.history.push("/")
                    }} />
                ) : (
                        <img alt="icon" src={login} className="navLogin" onClick={() => props.toggleLoginModal(true)} />
                    )}
            </div>
        </div>
    )


}

export default connect(
    (state: IApplicationState) => state.auth,
    AuthActions,
)(Navbar);