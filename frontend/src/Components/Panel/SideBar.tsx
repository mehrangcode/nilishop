import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {

    return (
        <div className="Sidebar">
            <div className="sidebarBlock">
                <h3 className="sidebarBlockTitle">Products</h3>
                <div className="sidebarBlockItems">
                    <Link className="sidebarItem" to="/productCreate">Create Product</Link>
                </div>
            </div>
        </div>
    )
}