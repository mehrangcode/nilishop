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
import Attributes from "./Attributes";
import Specifications from "./Specifications";

type IProps = IProductState & typeof ProductActions & IFormProps & RouteComponentProps<{ crudType: string }>;


const ProductPanel: React.FC<IProps> = (props: IProps) => {

    const [step, showStep] = useState<number>(0);
    const [attributes, modifyAttributes] = useState([]);
    useEffect(() => {
        return () => {
            props.resetItem();
        }
    }, []);

    const attributesChangeHandler = (attrs: any) => {
        modifyAttributes(attrs)
    }
    const onOk = (event: any) => {
        event.preventDefault();
        const values = props.onFormSubmit();
        console.log("values:" , values)
        if (!values.err) {
            // values.data.content = draftToHtml(values.data.content)
            if (props.match.params.crudType.toLocaleLowerCase() === "create") {
                const val: any = values.data;
                val.attributes = attributes
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
            <div className="col-8 mr-4">

                <div className="row">
                    <div
                        className={step === 0 ? "tabHeader tabActive" : "tabHeader"}
                        onClick={() => showStep(0)}>
                        Introduction
                </div>
                    <div
                        className={step === 1 ? "tabHeader tabActive" : "tabHeader"}
                        onClick={() => showStep(1)}>
                        Gallery
                </div>
                    <div
                        className={step === 2 ? "tabHeader tabActive" : "tabHeader"}
                        onClick={() => showStep(2)}>
                        Attributes
                </div>
                    <div
                        className={step === 3 ? "tabHeader tabActive" : "tabHeader"}
                        onClick={() => showStep(3)}>
                        Specifications
                </div>
                    <div
                        className={step === 4 ? "tabHeader tabActive" : "tabHeader"}
                        onClick={() => showStep(4)}>
                        Price management
                </div>
                    <div
                        className={step === 5 ? "tabHeader tabActive" : "tabHeader"}
                        onClick={() => showStep(5)}>
                        Related products
                </div>
                    <div
                        className={step === 6 ? "tabHeader tabActive" : "tabHeader"}
                        onClick={() => showStep(6)}>
                        Preview
                </div>
                </div>
            </div>
            <form onSubmit={onOk}>
                <div className="row">
                    <div className="col-9">
                        <div className="panelItem" style={step === 0 ? { display: "block" } : { display: "none" }}>
                            <Introduction {...props} />
                        </div>
                        <div className="panelItem" style={step === 1 ? { display: "block" } : { display: "none" }}>
                            <h3>Gallery</h3>
                        </div>
                        <div className="panelItem" style={step === 2 ? { display: "block" } : { display: "none" }}>

                            <Attributes {...props} onChange={(value) => attributesChangeHandler(value)} />
                        </div>
                        <div className="panelItem" style={step === 3 ? { display: "block" } : { display: "none" }}>
                           <Specifications {...props} onChange={(value) => console.log("Change: ", value)} />
                        </div>
                        <div className="panelItem" style={step === 4 ? { display: "block" } : { display: "none" }}>
                            <h3>Price management</h3>
                        </div>
                        <div className="panelItem" style={step === 5 ? { display: "block" } : { display: "none" }}>
                            <h3>Related products</h3>
                        </div>
                        <div className="panelItem" style={step === 6 ? { display: "block" } : { display: "none" }}>
                            <h3>Preview</h3>
                        </div>
                    </div>
                    <div className="col-3">
                        <Button type="submit"> Submit </Button>
                        <Button type="button" onClick={onCancel}>Cancel</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default connect(
    (state: IApplicationState) => state.product,
    ProductActions,
)(FormCreator(ProductPanel));