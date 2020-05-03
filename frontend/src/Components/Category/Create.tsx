import React from 'react';
import { ICategoryState } from '../../actions/Category/model';
import * as CategoryActions from '../../actions/Category';
import { connect } from 'react-redux';
import { FormCreator, IFormProps } from '../../Utils/FormController';
import { IApplicationState } from '../../store/state';
import Input from '../../Utils/Input';
import Select from '../../Utils/Select/Select';
import { RouteComponentProps } from 'react-router';
import Button from '../../Utils/Buttons/Button';

type IProps = ICategoryState & typeof CategoryActions & IFormProps & RouteComponentProps<{ crudType: string }>
const CreateCategory = (props: IProps) => {

    const onOk = (event: any) => {
        event.preventDefault();
        const values = props.onFormSubmit();
        if (!values.err) {
            if (props.match.params.crudType.toLocaleLowerCase() === "create") {
                props.createCategory(values.data, props.history)
            } else if (props.match.params.crudType.toLocaleLowerCase() === "edit") {
                props.editCategory(props.itemCRUD.data.id, values.data, props.history)
            }
        }

    }
    const onCancel= () => {
        props.resetItem();
        props.history.push("/adminpanel/category")
    }
    const { getFormItem } = props
    return (
        <div>

            <h1>Create Category</h1>
            <form onSubmit={onOk}>
                <label htmlFor="title">Title</label>
                {getFormItem({
                    name: "title",
                    initialvalue: props.itemCRUD.data ? props.itemCRUD.data.title : "",
                    rules: [
                        {
                            required: true,
                            msg: "must Fill"
                        }
                    ]
                },
                    <Input id="title" placeholder="Category Title" />
                )}
                <label htmlFor="description">Description</label>
                {getFormItem({
                    name: "description",
                    initialvalue: props.itemCRUD.data ? props.itemCRUD.data.description : "",
                    rules: [
                        {
                            required: true,
                            msg: "must Fill"
                        }
                    ]
                },
                    <Input id="description" placeholder="Category Description" />
                )}
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="status">Status</label>
                        {getFormItem({
                            name: "status",
                            initialvalue: props.itemCRUD.data ? props.itemCRUD.data.status : "",
                            rules: [
                                {
                                    required: true,
                                    msg: "must Fill"
                                }
                            ]
                        },
                            <Select id="status" optionList={[
                                { id: 2, title: "Draft" },
                                { id: 1, title: "publish" }
                            ]} />
                        )}
                    </div>
                </div>
                        <Button type="submit">Submit</Button>
                        <Button type="button" onClick={onCancel}>Cancel</Button>
            </form>
        </div>
    )
}

export default connect(
    (state: IApplicationState) => state.category,
    CategoryActions,
)(FormCreator(CreateCategory))