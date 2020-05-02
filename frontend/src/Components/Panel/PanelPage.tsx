import React from 'react'
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import * as PanelActions from '../../actions/Panel/index';
import { IPanelState } from '../../actions/Panel/model';
import { IFormProps } from "../../Utils/FormController";
import { Sidebar } from './SideBar';
type IProps = IPanelState & typeof PanelActions & IFormProps
const PanelPage: React.FC<IProps> = (props: IProps) => {
    React.useEffect(() => {
        props.getPanelData()
    }, [])
    const { data } = props.panelData;
    return (
        <div className="container">
           <div className="content"></div>
           <Sidebar />
        </div>
    )
}
export default connect(
    (state: IApplicationState) => state.panel,
    PanelActions,
)(PanelPage);