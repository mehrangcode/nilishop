import React, { useState, useEffect } from 'react'

interface IProps {
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    className?: string;
    initialvalue?: string;
    onChange?: (value: string) => void;
}
const Input = (props: IProps) => {

    const [inputValue, setValue] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (props.initialvalue) {
            setValue(props.initialvalue)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (props.onChange) {
            if (inputValue || inputValue === "") {
                props.onChange(inputValue)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue])

    const onchangeHandler = (event: any) => {
        event.preventDefault();
        setValue(event.target.value)
    }
    return (
        <input
            className={props.className ? props.className : "input"}
            value={inputValue}
            onChange={onchangeHandler}
            id={props.id}
            type={props.type ? props.type : "text"}
            placeholder={props.placeholder ? props.placeholder : ""} />
    )
}

export default Input