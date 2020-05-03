import React from 'react';
import Spinner from '../Spinner';

interface IProps {
    loading?: boolean;
    data: any[];
    children: any;
}
export const Table = (props: IProps) => {

    if (!props.data) {
        return null
    }
    return (
         
            
        <table>
            <Spinner loading={props.loading ? props.loading : false} />
            <thead>
                <tr>
                    {React.Children.map(props.children, (child: any, index: number) => {
                        if (child) {
                            if (child.type === Column) {
                                return (
                                    <th key={"key" + index}>
                                        {child.props.title}
                                    </th>)
                            }
                        }
                    })}</tr>
            </thead>
            <tbody>
            {props.data.map(item => {
                return <tr key={"item"+item.id}>
                    {React.Children.map(props.children, (child: any) => {
                        if (child) {
                            if (child.type === Column) {
                                if (child.props.render) {
                                    return <td> {child.props.render(item)} </td>
                                }
                                if(child.props.dataName){
                                    let prop:string = child.props.dataName;
                                    // let strArray: string[] = [];
                                    let itemProp = "";
                                    if(prop.includes(".")){
                                       const strArray = prop.split(".")
                                       if( itemProp = item[strArray[0]]){
                                           itemProp = item[strArray[0]][strArray[1]]
                                       }
                                    } else {
                                        itemProp = item[prop]
                                    }
                                    if (itemProp) {
                                        let str = itemProp;
                                        if (itemProp.length > 60) {
                                            str = itemProp.substring(0, 60) + "..."
                                        }
                                        return <td> {str} </td>
                                    }
                            }
                                return <td></td>
                            }
                        }
                    })}
                </tr>
            })}
            </tbody>
        </table>
    
    )
}

export class Column extends React.Component<any, any>{ }