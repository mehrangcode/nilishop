import * as React from 'react';

interface Iprops {
    type?: "button" | "submit" | "reset" | undefined;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    children: any;
    onClick?: () => void;
}
const Button = (props: Iprops) => {
    let type: any = "button"
    const isDisabled = props.disabled || props.loading
    let btnClass =  `btn ${props.className ? props.className : ""}`
    if(props.type){
        type = props.type
    }
    return (
        <button 
            type={type} 
            className={btnClass} 
            onClick ={() => {
                if(props.onClick){
                    props.onClick();
                }
            }}
            disabled={isDisabled}> 
                {props.children} {props.loading && " Loading"}
        </button>
    )
}

export default Button