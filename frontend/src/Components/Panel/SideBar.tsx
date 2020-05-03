import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const [showMenu, toggleMenu] = useState<boolean>(false)
    let sidebarClassName = "Sidebar"
    if(showMenu) {
        sidebarClassName = "Sidebar sidebarActive"
    }
    return (
        <React.Fragment>
            <div className="SidebarFab" onClick={() => toggleMenu(!showMenu)}>
                +
            </div>
            <div className={sidebarClassName}>
                <div className="sidebarBlock">
                    <h3 className="sidebarBlockTitle">Products</h3>
                    <div className="sidebarBlockItems">
                        <Link className="sidebarItem" to="/adminPanel/products">Products list</Link>
                        <Link className="sidebarItem" to="/adminPanel/products/Create">Create Product</Link>
                    </div>
                </div>
                <div className="sidebarBlock">
                    <h3 className="sidebarBlockTitle">Categories</h3>
                    <div className="sidebarBlockItems">
                        <Link className="sidebarItem" to="/adminPanel/category">Categories list</Link>
                        <Link className="sidebarItem" to="/adminPanel/category/create">Create Category</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}