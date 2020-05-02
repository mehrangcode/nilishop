import React, { useEffect } from "react";
import { IApplicationState } from "../../store/state";
import { connect } from "react-redux";
import { IProductState } from "../../actions/Products/model";
import * as ProductActions from "../../actions/Products";
import { Table, Column } from "../../Utils/Table";

type IProps = IProductState & typeof ProductActions;
const ProductsList = (props: IProps) => {

    useEffect(() => {
        props.getProducts()
    }, [])
    const goToUpdateProduct = (record: any) => {
        return <button onClick={() => {
            console.log(record.title)
        }}>
            Update
        </button>
    }
    return (
        <>
            <h1>Products</h1>
            <Table data={props.products.data} >
                <Column dataName="title" title="Title" />
                <Column dataName="lead" title="Lead" />
                <Column dataName="content" title="Content" />
                <Column dataName="price" title="Price" />
                <Column title="action" render={goToUpdateProduct}/>
                <p>dd</p>
            </Table>
        </>
    )
}

export default connect(
    (state: IApplicationState) => state.product,
    ProductActions,
)(ProductsList);