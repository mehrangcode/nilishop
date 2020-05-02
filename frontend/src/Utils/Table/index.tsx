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
        <table className="tables">
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
                                if (item[child.props.dataName]) {
                                    return <td>
                                        {item[child.props.dataName]}
                                    </td>
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

// {React.Children.map(props.children, (child: any) => {
//     if (child) {
//         if (child.type === Column) {
//             console.log("name: ", child.props.name)
//             return <tr>
//                 {props.data.map(item => {
//                 return <td>
//                     {item[child.props.dataName] ? item[child.props.dataName] : ""}
//                 </td>
//             })}
//             </tr>
//         }
//     }
// })}

/* <div className="column">
                                <p className="columnTitle">
                                    {child.props.title}
                                </p>
                                {props.data.map(item => {
                                    return item[child.props.dataName] ? <p className="columnData">
                                        {item[child.props.dataName]}
                                    </p> : <p className="columnData"></p>
                                })}
                            </div> */
export class Column extends React.Component<any, any>{
    // render() {
    //     return <p>{this.props.name}</p>;
    // }
}