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
            <thead>
                <tr>
                    {React.Children.map(props.children, (child: any, index: number) => {
                        if (child) {
                            if (child.type === Column) {
                                console.log("name: ", child.props.name)
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
                                if (item[child.props.dataName]) {
                                    let str = item[child.props.dataName];
                                    if (item[child.props.dataName].length > 60) {
                                        str = item[child.props.dataName].substring(0, 60) + "..."
                                    }
                                    return <td> {str} </td>
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