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
    return (
        <React.Fragment>
            <Navbar {...props} />
            <Switch>
                {props.isAuth ? (
                <Route path="/adminPanel" component={PanelPage} />
                    ) : null}
                {props.isAuth ? (
                <Route path="/calendar" component={CalendarPage} />
                    ) : null}
                {props.isAuth ? (
                <Route path="/about" component={CalendarPage} />
                    ) : <Route path="/about" component={AboutPage} />}
                <Route path="/" component={Home} />
            </Switch>
        </React.Fragment>
    )
}

export default withRouter(connect(
    (state: IApplicationState) => state.auth,
    AuthActions,
)(LayoutManager));