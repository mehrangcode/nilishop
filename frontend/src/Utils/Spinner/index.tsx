import React from 'react'


interface IProps {
    msg?: string;
    loading: boolean;
}

const Spinner = (props: IProps) => {
    if(!props.loading){
        return null
    }

    return <div className="spinner">
        <p>
            {props.msg ? props.msg : "Loading Data . . ."}
        </p>
    </div>
}

export default Spinner;