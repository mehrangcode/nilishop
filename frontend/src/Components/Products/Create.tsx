import React, { useEffect, useState } from "react";
import { IApplicationState } from "../../store/state";
import { connect } from "react-redux";
import { IProductState } from "../../actions/Products/model";
import * as ProductActions from "../../actions/Products";
import { FormCreator, IFormProps } from "../../Utils/FormController";
import Button from "../../Utils/Buttons/Button";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Axios from "axios";
import { urlGeneral, urlVersion } from "../../Utils/General/GConst";
import draftToHtml from 'draftjs-to-html';
import { RouteComponentProps } from "react-router";
import Select from "../../Utils/Select/Select";
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import Input from "../../Utils/Input";

type IProps = IProductState & typeof ProductActions & IFormProps & RouteComponentProps<{crudType: string}>;
const CreateProducts = (props: IProps) => {
    const [editorContet, setContent] = useState()
    const onOk = (event: any) => {
        event.preventDefault();
        const values = props.onFormSubmit();
        if (!values.err) {
            values.data.content = draftToHtml(values.data.content)
            if(props.match.params.crudType === "create"){
                props.createProduct(values.data, props.history)
            } else if(props.match.params.crudType === "edit") {
                props.editProduct(props.itemCRUD.data.id, values.data, props.history)
            }
        }
    }
    useEffect(() => {
        if (props.itemCRUD.data) {
            setContent(
                EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(props.itemCRUD.data.content)
                    )
                )
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onContentStateChange = (contentState: any) => {
        setContent(contentState)
    };
    const onCancel = () => {
        props.resetItem();
        props.history.push("/adminPanel/products");
    }

    const uploadImageCallBack = async (file: any) => {
        var formData = new FormData();
        formData.append("image", file);
        console.log(urlGeneral + urlVersion + "/uploader", file)
        try {
            const res = await Axios.post(urlGeneral + urlVersion + "/uploader", formData)
            if (res.data) {
                return res.data
            }

        } catch (error) {
            console.log(error)
        }
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
                    rules: [{
                        required: true,
                        msg: "filed must fill"
                    }]

                },
                    <Editor

                        editorState={editorContet}
                        onEditorStateChange={onContentStateChange}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        toolbar={{
                            image: {
                                uploadEnabled: true,
                                uploadCallback: uploadImageCallBack,
                            }
                        }}
                    />)}
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
                <Button type="submit" >Create</Button>
                <Button type="button" onClick={onCancel}>Cancel</Button>
            </form>
        </div>
    )
}

export default connect(
    (state: IApplicationState) => state.product,
    ProductActions,
)(FormCreator(CreateProducts));