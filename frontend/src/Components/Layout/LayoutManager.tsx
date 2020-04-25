import React from 'react';
import { Switch, Route, RouteComponentProps, withRouter } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import AboutPage from '../AboutPage/AboutPage';
import Home from '../Home/Home';
import { AuthActions } from '../../actions/Auth/action';
import { IAuthState } from '../../actions/Auth/model';
import { IFormProps } from "../../Utils/FormController";
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import PanelPage from '../Panel/PanelPage';
import CalendarPage from '../Calendar/CalendarPage';



type IProps = typeof AuthActions & IAuthState & IFormProps & RouteComponentProps
const LayoutManager: React.FC<IProps> = (props: IProps) => {
    const authCheck = (routh: any) => {
        return props.isAuth ? routh : <Route path="/" component={Home} />
    }
    return (
        <div className="App">
            <Navbar {...props} />
            <Switch>
                {props.isAuth ? (
                <Route path="/calendar" component={CalendarPage} />
                    ) : null}
                {props.isAuth ? (
                <Route path="/about" component={CalendarPage} />
                    ) : <Route path="/about" component={AboutPage} />}
                {/* <Route path="/About" component={AboutPage} /> */}
                <Route path="/" component={Home} />
            </Switch>
        </div>
    )
}

export default withRouter(connect(
    (state: IApplicationState) => state.auth,
    AuthActions,
)(LayoutManager));