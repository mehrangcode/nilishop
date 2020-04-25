import React from 'react'
import Button from '../Buttons/Button';

interface IProps {
    title?: string
    type?: string
    onOk?: () => void
    onCancel: () => void
    visiblity: boolean
    children?: any
    width?:string
}
interface IState {
    isActive: boolean;
}
class Modal extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            isActive: false
        }
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.visiblity === false && this.props.visiblity && !this.state.isActive) {
            setTimeout(() => {
                this.setState({ isActive: true })
            }, 200);
        }
    }

    closeHandler = () => {
        this.setState({ isActive: false })
        setTimeout(() => {
            this.props.onCancel()
        }, 200);
    }
    render() {
        let modalClassName = this.props.type ? `simpleModal ${this.props.type}` : "simpleModal";
        modalClassName = this.state.isActive ? modalClassName + ' active' : modalClassName;
        if (!this.props.visiblity) {
            return null
        }

        return (
            <div className="modalContainer">

                <div className="modalBg" onClick={() => {
                    this.closeHandler()
                }}></div>

                <div className={modalClassName} style={this.props.width ? {width: this.props.width} : {}}>
                    {this.props.title && (
                        <div className="modalHeader">
                            {this.props.title}
                        </div>
                    )}
                    <div className="modalBody">
                        {this.props.children}
                    </div>
                    <div className="modalFooter">

                        {(this.props.onOk) && (
                            <Button className="confirmBtn" onClick={() => {
                                if (this.props.onOk) {
                                    this.props.onOk()
                                }
                            }}>
                                OK
                        </Button>
                        )}
                        <Button className="cancelBtn" onClick={() => this.closeHandler()}> Close </Button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Modal