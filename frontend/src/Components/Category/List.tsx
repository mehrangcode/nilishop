import React, { useEffect } from "react";
import { IApplicationState } from "../../store/state";
import { connect } from "react-redux";
import * as CategoryActions from "../../actions/Category";
import { Table, Column } from "../../Utils/Table";
import Button from "../../Utils/Buttons/Button";
import { RouteComponentProps } from "react-router";
import { ICategoryState } from "../../actions/Category/model";

type IProps = ICategoryState & typeof CategoryActions & RouteComponentProps;
const CategoryList = (props: IProps) => {

    useEffect(() => {
        props.getCategoryList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const renderCategoryAction = (record: any) => {
        return <React.Fragment>
            <button onClick={() => {
            props.getCategoryForEdit(record.id, props.history)
        }}>
            Update
        </button>
        <Button onClick={() => {
            props.deleteCategory(record.id)
        }}>
            Delete
        </Button>
        </React.Fragment>
    }
    const renderStatus = (record: any) => {
        switch (record.status) {
            case 0:
                return "Not set";
            case 1:
                return "Published";
            case 2:
                return "Draft";
        }
        return ""; 
    }
    return (
        <>
            <h1>Category</h1>
            <Table data={props.category.data} loading={props.itemCRUD.loading === "Delete" || props.category.loading} >
                <Column dataName="title" title="Title" />
                <Column dataName="description" title="Description" />
                <Column title="Status" render={renderStatus} />
                <Column title="action" render={renderCategoryAction}/>
            </Table>
        </>
    )
}

export default connect(
    (state: IApplicationState) => state.category,
    CategoryActions,
)(CategoryList);