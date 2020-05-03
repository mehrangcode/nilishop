import React, { useEffect } from "react";
import { IApplicationState } from "../../store/state";
import { connect } from "react-redux";
import { IProductState } from "../../actions/Products/model";
import * as ProductActions from "../../actions/Products";
import { Table, Column } from "../../Utils/Table";
import Button from "../../Utils/Buttons/Button";
import { RouteComponentProps } from "react-router";

type IProps = IProductState & typeof ProductActions & RouteComponentProps;
const ProductsList = (props: IProps) => {

    useEffect(() => {
        props.getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const goToUpdateProduct = (record: any) => {
        return <div>
            <button onClick={() => {
            props.getProductForEdit(record.id, props.history)
        }}>
            Update
        </button>
        <Button onClick={() => {
            props.deleteProducts(record.id)
        }}>
            Delete
        </Button>
        </div>
    }
    // const renderContent = (record: any) => {
        
    //    return <div dangerouslySetInnerHTML={{ __html: record.content }} />
    // }
    return (
        <>
            <h1>Products</h1>
            <Table data={props.products.data} loading={props.itemCRUD.loading === "Delete" || props.products.loading} >
                <Column dataName="title" title="Title" />
                <Column dataName="lead" title="Lead" />
                {/* <Column title="Content" render ={renderContent}/> */}
                <Column dataName="content" title="Content"/>
                <Column dataName="price" title="Price" />
                <Column title="action" render={goToUpdateProduct}/>
            </Table>
        </>
    )
}

export default connect(
    (state: IApplicationState) => state.product,
    ProductActions,
)(ProductsList);