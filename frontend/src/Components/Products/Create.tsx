import React from "react";
import { IApplicationState } from "../../store/state";
import { connect } from "react-redux";
import { IProductState } from "../../actions/Products/model";
import * as ProductActions from "../../actions/Products";
import { FormCreator, IFormProps } from "../../Utils/FormController";
import Button from "../../Utils/Buttons/Button";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { RouteComponentProps } from "react-router";
import Select from "../../Utils/Select/Select";
import Input from "../../Utils/Input";
import ContentEditor from "../../Utils/Input/ContentEditor";

type IProps = IProductState & typeof ProductActions & IFormProps & RouteComponentProps<{crudType: string}>;
const CreateProducts = (props: IProps) => {
    const onOk = (event: any) => {
        event.preventDefault();
        const values = props.onFormSubmit();
        if (!values.err) {
            // values.data.content = draftToHtml(values.data.content)
            if(props.match.params.crudType.toLocaleLowerCase() === "create"){
                props.createProduct(values.data, props.history)
            } else if(props.match.params.crudType.toLocaleLowerCase() === "edit") {
                props.editProduct(props.itemCRUD.data.id, values.data, props.history)
            }
        }
    }
    const onCancel = () => {
        props.resetItem();
        props.history.push("/adminPanel/products");
    }
    const { getFormItem } = props
    return (
        <div>
            <h1>Create a new Product</h1>
            <form onSubmit={onOk}>

                <label htmlFor="title"> Title</label>
                {getFormItem({
                    name: "title",
                    initialvalue: props.itemCRUD.data ? props.itemCRUD.data.title : "",
                    rules: [{
                        required: true,
                        msg: "filed must fill"
                    }]

                },
                    <Input id="title" type="text" placeholder="Product Title" />
                )}
                <label htmlFor="lead"> Lead</label>
                {getFormItem({
                    name: "lead",
                    initialvalue: props.itemCRUD.data ? props.itemCRUD.data.lead : "",
                    rules: [{
                        required: true,
                        msg: "filed must fill"
                    },
                    {
                        max: 120,
                        msg: "lead must be between 20 to 120"
                    },
                    {
                        min: 20,
                        msg: "lead must be between 20 to 120"
                    }]

                },
                    <Input id="lead" type="text" placeholder="Product lead" />
                )}
                <label htmlFor="lead"> Content</label>
                {getFormItem({
                    name: "content",
                    initialvalue: props.itemCRUD.data ? props.itemCRUD.data.content : "",
                    rules: [{
                        required: true,
                        msg: "filed must fill"
                    }]

                }, <ContentEditor /> )}
                <label htmlFor="price">Price</label>
                {getFormItem({
                    name: "price",
                    initialvalue: props.itemCRUD.data ? props.itemCRUD.data.price : "",
                    rules: [
                        {
                            required: true,
                            msg: "price must be fill"
                        }
                    ]
                },
                    <Input id="price" name="price" type="text" />
                )}
                <label htmlFor="category_id">category</label>
                {getFormItem({
                    name: "category_id",
                    initialvalue: props.itemCRUD.data ? props.itemCRUD.data.category_id : "",
                    rules: [
                        {
                            required: true,
                            msg: "category must be fill"
                        }
                    ]
                },
                    <Select url="/categorydropDown" position="bottom" />
                )}
                <Button type="submit" >{
                props.match.params.crudType.toLocaleLowerCase() === "create" ?
            "Create" : "Update"    
            }</Button>
                <Button type="button" onClick={onCancel}>Cancel</Button>
            </form>
        </div>
    )
}

export default connect(
    (state: IApplicationState) => state.product,
    ProductActions,
)(FormCreator(CreateProducts));