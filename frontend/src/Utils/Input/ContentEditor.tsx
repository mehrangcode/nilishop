import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Axios from "axios";
import { urlGeneral, urlVersion } from "../../Utils/General/GConst";
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

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
        if (props.initialvalue) {
            setValue(
                EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(props.initialvalue)
                    )
                )
            )
            if(props.onChange){
                props.onChange(props.initialvalue)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onContentStateChange = (contentState: any) => {
        setValue(contentState)
    };
    

    const uploadImageCallBack = async (file: any) => {
        var formData = new FormData();
        formData.append("image", file);
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
            onChange={(value:any )=> {
                if(props.onChange){
                    props.onChange(draftToHtml(value))
                }
            }}
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
    )
}

export default ContentEditor