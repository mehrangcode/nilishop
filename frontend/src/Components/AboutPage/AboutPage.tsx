import React from 'react'
import { RouteComponentProps } from 'react-router'

type IProps = RouteComponentProps 
const AboutPage: React.FC<IProps> = (props: IProps) => {

    return (
        <div>
            <h1 onClick={() => props.history.push("/")}> Home </h1>
            <p> AboutPage </p>
        </div>
    )
}

export default AboutPage