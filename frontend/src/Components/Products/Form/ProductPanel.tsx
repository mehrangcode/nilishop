import React, { useEffect, useState } from "react";
import { IApplicationState } from "../../../store/state";
import { connect } from "react-redux";
import { IProductState } from "../../../actions/Products/model";
import * as ProductActions from "../../../actions/Products";
import { FormCreator, IFormProps } from "../../../Utils/FormController";
import Button from "../../../Utils/Buttons/Button";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { RouteComponentProps } from "react-router";
import Introduction from "./Introduction";

type IProps = IProductState & typeof ProductActions & IFormProps & RouteComponentProps<{ crudType: string }>;


const ProductPanel: React.FC<IProps> = (props: IProps) => {

    const [step, showStep] = useState<number>(0);
    useEffect(() => {
        return () => {
            props.resetItem();
        }
    }, []);

    const onOk = (event: any) => {
        event.preventDefault();
        const values = props.onFormSubmit();
        if (!values.err) {
            // values.data.content = draftToHtml(values.data.content)
            if (props.match.params.crudType.toLocaleLowerCase() === "create") {
                props.createProduct(values.data, props.history)
            } else if (props.match.params.crudType.toLocaleLowerCase() === "edit") {
                props.editProduct(props.itemCRUD.data.id, values.data, props.history)
            }
        }
    }

    const onCancel = () => {
        props.resetItem();
        props.history.push("/adminPanel/products");
    }
    return (
        <div className="productPanel">
            <h1>Product Panel</h1>
            <div className="row">
                <div className="tabHeader"onClick={() => showStep(0)}>Introduction</div>
                <div className="tabHeader"onClick={() => showStep(1)}>Gallery</div>
                <div className="tabHeader"onClick={() => showStep(2)}>Attribiutes</div>
                <div className="tabHeader"onClick={() => showStep(3)}>Specifications</div>
                <div className="tabHeader"onClick={() => showStep(4)}>Price management</div>
                <div className="tabHeader"onClick={() => showStep(5)}>Related products</div>
                <div className="tabHeader"onClick={() => showStep(6)}>Preview</div>
            </div>
            <form onSubmit={onOk}>
                <Introduction {...props} />

                <Button type="submit"> Submit </Button>
                <Button type="button" onClick={onCancel}>Cancel</Button>
            </form>
        </div>
    )
}

export default connect(
    (state: IApplicationState) => state.product,
    ProductActions,
)(FormCreator(ProductPanel));