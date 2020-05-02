import React from 'react';

interface IProps {
    data?: string;
    children?: any;
}
export const Column = (props: IProps) => {

    if(!props.data){
        return null
    }
    return (
        <div className="column">
            {props.children ? (
                props.children
            ) : (
                <p>
                    {props.data}
                </p>
            )}
        </div>
    )
}