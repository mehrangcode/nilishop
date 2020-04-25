import React from "react"

interface IProps { height?: string}
export const BlankBox = (props: IProps) => {

    if (props.height){
        return <div className="blankBox" style={{height: props.height}}></div>
    }
    return <div className="blankBox"> </div>
}