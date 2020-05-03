import React from 'react';
import { Sidebar } from './SideBar';
import { Switch, Route } from 'react-router-dom';
import ProductsList from '../Products/List';
import CreateProducts from '../Products/Create';
import CategoryList from '../Category/List';
import CreateCategory from '../Category/Create';
// type IProps = {
//     panel: IPanelState,
//     auth: IAuthState
// } & typeof PanelActions & IFormProps
const PanelPage: React.FC = () => {
    return (
        <div className="container">
           <div className="content">
           <Switch>
                <Route path="/adminPanel/products/:crudType" component={CreateProducts} />
                <Route path="/adminPanel/products" component={ProductsList} />
                <Route path="/adminPanel/category/:crudType" component={CreateCategory} />
                <Route path="/adminPanel/category" component={CategoryList} />
                <Route path="/adminPanel" render = {() => <p>Dashboard</p>} />
            </Switch>
           </div>
           <Sidebar />
        </div>
    )
}
export default PanelPage;
