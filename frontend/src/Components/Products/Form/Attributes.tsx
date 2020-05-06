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
    attr_name_id: string;
    attr_type_id: string;
    description: string;
    stock: number;
    price_scale: number;
    moreDetails: boolean;

}
const Attributes: React.FC<IProps> = (props: IProps) => {

    const [attrs, modifyAttrs] = useState<IAttr[]>([])
    const [attr_type_id, setAttrType] = useState<string>("")

    const addANewAttr = () => {
        const newAttr = [...attrs];
        newAttr.unshift({
            id: "" + new Date().getTime(),
            attr_name_id: "",
            description: "",
            stock: 0,
            price_scale: 0,
            moreDetails: false,
            attr_type_id
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

        if(name === "attr_type_id") {
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
                return <div className="row attributeItem" key={item.id}>
                    <div className="col-3">
                        <label htmlFor="attr_type_id">Attribiute Type</label>
                        <Select url="/attrTypedropDown" initialvalue={item.attr_type_id}  
                        onChange={(value: string) => onchangeHandler(value, "attr_type_id", item.id )} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="attr-name_id">Title</label>
                        <Select url={`/attrType/${item.attr_type_id}/attrs`} initialvalue={item.attr_name_id}  
                        onChange={(value: string) => onchangeHandler(value, "attr_name_id", item.id )} />
                    </div>

                    {item.moreDetails ? (
                        <React.Fragment>
                            <div className="col-3">
                        <label htmlFor="stock">Amount</label>
                         <NumberInput id="stock" name="stock" value={""+item.stock} 
                        onChange={(value) => onchangeHandler(value, "stock", item.id )} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="price_scale">price balance</label>
                        <NumberInput id="price_scale" name="price_scale" value={""+item.price_scale} 
                        onChange={(value) => onchangeHandler(value, "price_scale", item.id )} />
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
                        <button 
                        className="removeButton"
                        type="button" 
                        onClick={() => removeItem(item.id)}>
                        X
                        </button>
                </div>
            })}
        </div>
    )
}

export default Attributes