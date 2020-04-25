import * as React from 'react';

type IRules = { [key: string]: any, msg: string }[] | undefined
interface IFormItem {
    name: string;
    initialvalue?: string | number;
    rules?: IRules;
    label?: string;
}
type IState = {
    data: { [key: string]: string };
    err: any | null;
    rules: { [key: string]: IRules }
};


export type IFormProps = {
    getFormItem: (props: IFormItem, comp: Element | React.ComponentType | JSX.Element) => Element;
    getFormValues?: () => object;
    resetForm?: () => void;
    onFormSubmit: () => {data: {[key: string]: string}, err: {[key: string]: string}}
};





export const FormCreator = <P extends IFormProps>(Component: React.ComponentType<P>) =>
    class Form extends React.Component<P, IState> {
        constructor(props: P) {
            super(props);
            this.state = {
                data: {},
                err: {},
                rules: {}
            }
        }

        itemValidation = (name: string, value: string, rules: IRules) => {
            if(!rules){
                return true
            }
            let isValid = true;
            let msg = ""
            const err = this.state.err;
            rules.forEach((rule: any) => {
                if (rule.required && isValid) {
                    isValid = value.toString().trim() !== ""
                    if (!isValid) {
                        msg = rule.msg;
                    }
                    err[name] = { msg, isValid }
                }

                if(rule.emaliValidate && isValid){
                    const emailRegexValidation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    isValid = emailRegexValidation.test(value)
                    if (!isValid) {
                        msg = rule.msg
                    }
                    err[name] = { msg, isValid }
                }

                if (rule.max && isValid) {
                    isValid = value.length <= rule.max
                    if (!isValid) {
                        msg = rule.msg
                    }
                    err[name] = { msg, isValid }
                }
            });
            this.setState({ err })
            return isValid
        }

        onFormSubmit = () => {
            const { data, rules } = this.state
            let err: any = null;
            let isValid = true;
            for (const item in rules) {
                const validationError = this.itemValidation(item, data[item], rules[item])
                if (isValid) {
                    isValid = validationError
                }
    
            }

            if (isValid) {
                err = null
            } else {
                err = this.state.err
            }
            return {data, err}
        }
        
        onChangeHandler(name: string = "", e: any, rules: IRules) {
            const data: any = this.state.data ? { ...this.state.data } : {}
            let value = e;
            if (e.target) {
                value = e.target.value
            }
            data[name] = value
            this.setState({ data })
            if (rules) {
                this.itemValidation(name, value, rules);
            }

        }

        getFormValues = () => {
            return this.state
        }

        resetForm = () => {
            this.setState({
                data: {},
                err: {},
                rules: {}
            })
        }

        initialValues = (name: string, newRules: any) => {
            const {rules, data} = this.state
            if(newRules){
                rules[name] = newRules
            }
            data[name] = ""
            this.setState({ rules, data})
        }

        formItem = (itemProps: IFormItem, comp: any) => {
            const newValue: string = this.state.data[itemProps.name] ? this.state.data[itemProps.name] : ""
            const initialElement = {
                name: itemProps.name,
                initialvalue: itemProps.initialvalue,
                label: itemProps.label,
                onChange: (e: any) => {
                    if (comp.props.onChange) {
                        comp.props.onChange(e)
                    }
                    this.onChangeHandler(itemProps.name, e, itemProps.rules)
                },
                value: newValue
            }

            const El = React.cloneElement(comp,  initialElement, comp.props.children);
            return <FromItemWrapper
                label={itemProps.label}
                id={comp.props.id ? comp.props.id : itemProps.name}
                name={itemProps.name}
                itemElement={El}
                initialValues={this.initialValues}
                rules={itemProps.rules}
                err={this.state.err && this.state.err[itemProps.name] ? this.state.err[itemProps.name].msg : null} />
        }

        render() {
            const { ...props } = this.props;
            return <Component {...props as P}
                getFormItem={this.formItem}
                getFormValues={this.getFormValues}
                onFormSubmit={this.onFormSubmit}
                resetForm={this.resetForm} />;
        }
    };

const FromItemWrapper = (props: any) => {
    React.useEffect(() => {
            props.initialValues(props.name, props.rules)
        
    }, [])
    return (
        <div className="itemWrapper">
            {props.itemElement}
            {props.err && <small className="validationError"> {props.err} </small>}
        </div>
    )
}