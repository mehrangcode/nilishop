import React from 'react';
import { FormCreator, IFormProps } from "../../Utils/FormController";

type IProps = IFormProps & {
    onOk: (data: any ) => void;
}

const Login: React.FC<IProps> = (props: IProps) => {

    const submitHandler = (e: any) => {
        e.preventDefault();
        const values = props.onFormSubmit();
        if(!values.err){
            props.onOk(values.data)
        }
    }
    
    const { getFormItem } = props
    return(
        <form onSubmit={submitHandler}>
            <label htmlFor="email">E-Mail</label>
            {getFormItem({
                name: "email",
                rules:[{
                    required: true,
                    msg: "filed must fill"
                }, 
            {
                emaliValidate: true,
                msg: "Email is not valid"
            }]
                
            },
            <input id="email" type="email" placeholder="E-mail" />
            )}
            
            <label htmlFor="password">Password</label>
            {getFormItem({
                name: "password",
                rules:[{
                    required: true,
                    msg: "filed must fill"
                }]
                
            },
            <input id="password" type="password" placeholder="Password" />
            )}
            <button type="submit">Login</button>
        </form>
    )
}

export default FormCreator(Login)