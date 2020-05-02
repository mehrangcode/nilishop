import React, { useEffect, useState } from "react";
import { IApplicationState } from "../../store/state";
import { connect } from "react-redux";
import { IProductState } from "../../actions/Products/model";
import * as ProductActions from "../../actions/Products";
import { FormCreator, IFormProps } from "../../Utils/FormController";
import Button from "../../Utils/Buttons/Button";
import { Editor } from 'react-draft-wysiwyg';
import {EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Axios from "axios";
import { urlGeneral, urlVersion } from "../../Utils/General/GConst";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

type IProps = IProductState & typeof ProductActions & IFormProps;
const CreateProducts = (props: IProps) => {
    const onOk = (event: any) => {
        event.preventDefault();
        const values = props.onFormSubmit();
        if (!values.err) {
            values.data.content = draftToHtml(values.data.content)
            props.createProduct(values.data)
        }
    }

    const uploadImageCallBack= async (file: any ) =>{
        var formData = new FormData();
        formData.append("image", file);
        console.log(urlGeneral+ urlVersion + "/uploader", file)
        try {
            const res = await Axios.post(urlGeneral+ urlVersion + "/uploader", formData)
            if(res.data){
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
                    rules: [{
                        required: true,
                        msg: "filed must fill"
                    }]

                },
                    <input id="title" type="text" placeholder="Product Title" />
                )}
                <label htmlFor="lead"> Lead</label>
                {getFormItem({
                    name: "lead",
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
                    <input id="lead" type="text" placeholder="Product lead" />
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
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    toolbar = {{
                        image: {uploadEnabled: true, 
                            uploadCallback: uploadImageCallBack, }
                    }}
                />)}
                <label htmlFor="price">Price</label>
                {getFormItem({
                    name: "price",
                    rules: [
                        {
                            required: true,
                            msg: "price must be fill"
                        }
                    ]},
                    <input id="price" name="price" type="text" />
                    )}
                <label htmlFor="category_id">category</label>
                {getFormItem({
                    name: "category_id",
                    rules: [
                        {
                            required: true,
                            msg: "category must be fill"
                        }
                    ]},
                    <input id="category_id" name="category_id" type="text" />
                    )}
                <Button type="submit" >Create</Button>
            </form>
        </div>
    )
}

export default connect(
    (state: IApplicationState) => state.product,
    ProductActions,
)(FormCreator(CreateProducts));