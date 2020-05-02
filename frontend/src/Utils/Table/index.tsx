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
                                    if(child.props.render){
                                        return <p className="columnData">
                                            {child.props.render(item)}
                                        </p>
                                    }
                                    let itemStr = ""
                                    if(item[child.props.dataName]) {
                                        itemStr = item[child.props.dataName]
                                        if(itemStr.length > 40){
                                            itemStr = item[child.props.dataName].substring(0, 50) + "..."
                                        }
                                    }
                                    return <p className="columnData"> {itemStr} </p>
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