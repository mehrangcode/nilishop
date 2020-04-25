import * as React from 'react';



interface IProps {
    open: boolean;
    onClose: () => void;
    onOk: () => void;
}

const ConfirmMessage = (props: IProps) => {
   
    return (
        <p>ConfirmMessage</p>
    )
} 


export default ConfirmMessage