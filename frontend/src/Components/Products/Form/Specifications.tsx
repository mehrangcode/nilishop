import React, { useState } from "react";
import { IProductState } from "../../../actions/Products/model";
import * as ProductActions from "../../../actions/Products";
import { IFormProps } from "../../../Utils/FormController";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { RouteComponentProps } from "react-router";
import Input from "../../../Utils/Input";

type IProps = {
    onChange: (value: ISpec[]) => void;
} &
    IProductState &
    typeof ProductActions &
    IFormProps &
    RouteComponentProps<{ crudType: string }>;
interface ISpec {
    id: string;
    title: string;
    description: string;

}
const Specifications: React.FC<IProps> = (props: IProps) => {

    const [specs, modifyAttrs] = useState<ISpec[]>([])

    const addANewAttr = () => {
        const newSpec = [...specs];
        newSpec.push({
            id: "" + new Date().getTime(),
            title: "",
            description: "",
        });
        modifyAttrs(newSpec)
        props.onChange(newSpec)
    }
    const removeItem = (id: string) => {
        const newSpec: ISpec[] = specs.filter(x => x.id !== id);
        modifyAttrs(newSpec)
        props.onChange(newSpec)
    }
    const onchangeHandler = (value: string, name: string, id: string) => {

        const newSpecs: ISpec[] = JSON.parse(JSON.stringify(specs))
        const specIndex = newSpecs.findIndex(x => x.id === id)
        if (specIndex >= 0) {
            const spec: any = { ...newSpecs[specIndex] }
            spec[name] = value
            newSpecs[specIndex] = spec
            modifyAttrs(newSpecs)
            props.onChange(newSpecs)
        }
    }
    return (
        <div>
            <h3>Specifications</h3>
            {specs.map((item: ISpec) => {
                return <div className="row" key={item.id}>
                    <div className="col-5">
                        <label htmlFor="spec-title">Title</label>
                        <Input id="spec-title" name="title" value={item.title}
                            onChange={(value) => onchangeHandler(value, "title", item.id)} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="spec-description">Description</label>
                        <Input id="spec-description" name="description" value={item.description}
                            onChange={(value) => onchangeHandler(value, "description", item.id)} />
                    </div>
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

            <div>
                <button type="button" onClick={addANewAttr}>Add new Item</button>
            </div>
        </div>
    )
}

export default Specifications