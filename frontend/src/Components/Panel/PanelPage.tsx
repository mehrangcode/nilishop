import React from 'react'
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import * as PanelActions from '../../actions/Panel/index';
import { IPanelState } from '../../actions/Panel/model';
import { IFormProps } from "../../Utils/FormController";
import { Sidebar } from './SideBar';
import { Switch, Route } from 'react-router-dom';
import { IAuthState } from '../../actions/Auth/model';
import ProductsList from '../Products/List';
import CreateProducts from '../Products/Create';
type IProps = {
    panel: IPanelState,
    auth: IAuthState
} & typeof PanelActions & IFormProps
const PanelPage: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="container">
           <div className="content">
           <Switch>
                <Route path="/adminPanel/products/:crudType" component={CreateProducts} />
                <Route path="/adminPanel/products" component={ProductsList} />
                <Route path="/adminPanel" render = {() => <p>Dashboard</p>} />
            </Switch>
           </div>
           <Sidebar />
        </div>
    )
}
export default PanelPage;
