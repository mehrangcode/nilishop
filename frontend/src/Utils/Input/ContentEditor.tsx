import React, { useState, useEffect } from 'react';
import Button from "../../Utils/Buttons/Button";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Axios from "axios";
import { urlGeneral, urlVersion } from "../../Utils/General/GConst";
import draftToHtml from 'draftjs-to-html';
import { RouteComponentProps } from "react-router";
import Select from "../../Utils/Select/Select";
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import Input from "../../Utils/Input";

interface IProps {
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    className?: string;
    initialvalue?: string;
    onChange?: (value: string) => void;
}
const ContentEditor = (props: IProps) => {

    const [inputValue, setValue] = useState<string | undefined>(undefined)
    useEffect(() => {
        console.log("props.initialvalue: ", props.initialvalue)
        if (props.initialvalue) {
            setValue(
                EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(props.initialvalue)
                    )
                )
            )
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onContentStateChange = (contentState: any) => {
        setValue(contentState)
        if(props.onChange){
            props.onChange(contentState)
        }
    };

    useEffect(() => {
        if (props.onChange) {
            if (inputValue || inputValue === "") {
                console.log("props.onChange", inputValue)
                props.onChange(inputValue)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue])

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

    return (
        <Editor

            editorState={inputValue}
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
        />
        // <input 
        //     value={inputValue}
        //     onChange={onchangeHandler}
        //     id={props.id} 
        //     type={props.type ? props.type : "text"} 
        //     placeholder={props.placeholder ? props.placeholder : ""} />
    )
}

export default ContentEditor