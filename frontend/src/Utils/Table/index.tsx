import React from 'react';

interface IProps {
    data: any[];
    children: any;
}
export const Table = (props: IProps) => {

    if (!props.data) {
        return null
    }
    return (
        <table>
            <tr>
                    {React.Children.map(props.children, (child: any) => {
                        if (child) {
                            if (child.type === Column) {
                                console.log("name: ", child.props.name)
                                return (
                                    <th>
                                        {child.props.title}
                                    </th>)
                            }
                        }
                    })}</tr>
            {props.data.map(item => {
                return <tr>
                    {React.Children.map(props.children, (child: any) => {
                        if (child) {
                            if (child.type === Column) {
                                if(child.props.render){
                                    return <td> {child.props.render(item)} </td> 
                                }
                                if (item[child.props.dataName]) {
                                    let str = item[child.props.dataName];
                                    if(item[child.props.dataName].length > 60) {
                                        str = item[child.props.dataName].substring(0, 60)+"..."
                                    }
                                    return <td> {str} </td>
                                }
                                return <td></td>
                            }
                        }
                    })}
                </tr>
            })}
        </table>
    )
}

export class Column extends React.Component<any, any>{}