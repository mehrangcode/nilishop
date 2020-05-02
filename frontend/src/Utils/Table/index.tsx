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
        <div className="table">
            {
                React.Children.map(props.children, (child: any) => {
                    if (child) {
                        if (child.type === Column) {
                            console.log("name: ", child.props.name)
                            return <div className="column">
                                <p className="columnTitle">
                                    {child.props.title}
                                </p>
                                {props.data.map(item => {
                                    return item[child.props.dataName] ? <p className="columnData">
                                        {item[child.props.dataName]}
                                    </p> : <p className="columnData"></p>
                                })}
                            </div>
                        }
                    }
                    return null
                })
            }

        </div>
    )
}

export class Column extends React.Component<any, any>{
    // render() {
    //     return <p>{this.props.name}</p>;
    // }
}