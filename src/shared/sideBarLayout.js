import React from "react";

const SideBarLayout = ({ children }) => {
    const arr = React.Children.toArray(children);
    const sidebar = arr[0];
    const content = arr.slice(1);

    return (
        <div className="SideBarLayout">
            <aside className="sidebar">{sidebar}</aside>
            <main className="MainContent">{content}</main>
        </div>
    );
};

export default SideBarLayout;