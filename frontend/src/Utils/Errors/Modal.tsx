import React from "react";
import ReactDOM from "react-dom";
export const EModalHide = () => {
    const mRoot= document.getElementById("modal-root");
    if(mRoot){
        ReactDOM.unmountComponentAtNode(mRoot)
    }
}
export const EModal = (error: any) => {
    let message: string = error;
    if(error.message){
        message = error.message
    }
    if(error.response){
        message = error.response.data.message
    }
    console.log("Modal")
    ReactDOM.render(<div className="emodalcontainer">
        <div className="EModal">
        <p>Error :{message}</p>
        <button onClick={EModalHide}>Click</button>
    </div>
    </div>, document.getElementById('modal-root'))
}