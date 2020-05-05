import React, { useState } from "react";
import { IProductState } from "../../../actions/Products/model";
import * as ProductActions from "../../../actions/Products";
import { IFormProps } from "../../../Utils/FormController";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { RouteComponentProps } from "react-router";
import Input from "../../../Utils/Input";
import NumberInput from "../../../Utils/Input/NumberInput";
import Select from "../../../Utils/Select/Select";

type IProps = {
    onChange: (value: IAttr[]) => void;
 } & 
    IProductState & 
    typeof ProductActions & 
    IFormProps & 
    RouteComponentProps<{ crudType: string }>;
interface IAttr {
    id: string;
    title: string;
    description: string;
    amount: number;
    price: number;
    attrType: string;
    moreDetails: boolean;

}
const Attributes: React.FC<IProps> = (props: IProps) => {

    const [attrs, modifyAttrs] = useState<IAttr[]>([])
    const [attrType, setAttrType] = useState<string>("")

    const addANewAttr = () => {
        const newAttr = [...attrs];
        newAttr.unshift({
            id: "" + new Date().getTime(),
            title: "",
            description: "",
            amount: 0,
            price: 0,
            moreDetails: false,
            attrType
        });
        modifyAttrs(newAttr)
        props.onChange(newAttr)
    }
    const removeItem = (id: string) => {
        const newAttr: IAttr[] = attrs.filter(x => x.id !== id);
        modifyAttrs(newAttr)
        props.onChange(newAttr)
    }
    const onchangeHandler = (value: string | boolean, name: string, id: string) => {

        const newAttrs: IAttr[] = JSON.parse(JSON.stringify(attrs))
        const attrIndex = newAttrs.findIndex(x => x.id === id)
        if(attrIndex >= 0){
           const attr: any = {...newAttrs[attrIndex]}
           attr[name] = value
        //    if(name === "moreDetails" && value === false) {
        //       attr.description = "";
        //       attr.price = 0; 
        //       attr.amount = 0; 
        //    }
           newAttrs[attrIndex] = attr
           modifyAttrs(newAttrs)
           props.onChange(newAttrs)
        }

        if(name === "attrType") {
            setAttrType((value as string))
        }
    }
    return (
        <div>
            <h3>Attributes</h3>
            <div>
                <button type="button" onClick={addANewAttr}>Add new Attribiute</button>
            </div>
            {attrs.map((item: IAttr, i: number) => {
                return <div className="row" key={item.id}>
                    <div className="col-3">
                        <label htmlFor="attr-type">Attribiute Type</label>
                        <Select url="/attrTypedropDown" initialvalue={item.attrType}  
                        onChange={(value: string) => onchangeHandler(value, "attrType", item.id )} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="attr-title">Title</label>
                        <Select url={`/attrType/${item.attrType}/attrs`} initialvalue={item.title}  
                        onChange={(value: string) => onchangeHandler(value, "title", item.id )} />
                    </div>

                    {item.moreDetails ? (
                        <React.Fragment>
                            <div className="col-3">
                        <label htmlFor="attr-amount">Amount</label>
                         <NumberInput id="attr-amount" name="amount" value={""+item.amount} 
                        onChange={(value) => onchangeHandler(value, "amount", item.id )} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="attr-price">price balance</label>
                        <NumberInput id="attr-price" name="price" value={""+item.price} 
                        onChange={(value) => onchangeHandler(value, "price", item.id )} />
                    </div>
                    <div className="col-9">
                        <label htmlFor="attr-description">Description</label>
                        <Input id="attr-description" name="description" value={item.description} 
                        onChange={(value) => onchangeHandler(value, "description", item.id )} />
                    </div>
                    <div className="col-1">
                        <label htmlFor=""> &nbsp; </label>
                        <button 
                        type="button"
                        onClick={() => onchangeHandler(false, "moreDetails", item.id)}>
                        Hide
                        </button>
                        </div>
                        </React.Fragment>
                    ) : (
                        <div className="col-2">
                        <label htmlFor=""> &nbsp; </label>
                        <button 
                        type="button"
                        onClick={() => onchangeHandler(true, "moreDetails", item.id)}>
                        More Details
                        </button>
                        </div>
                    )}
                    <div className="col-1">
                        
                        <button 
                        className="removeButton"
                        type="button" 
                        onClick={() => removeItem(item.id)}>
                        X
                        </button>
                    </div>
                    <div className="col">
                        <hr />
                    </div>

                </div>
            })}
        </div>
    )
}

export default Attributes