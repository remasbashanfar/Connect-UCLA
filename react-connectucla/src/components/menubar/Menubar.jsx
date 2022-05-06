import "./menubar.css"

// can add icons using @material-ui/icons
export default function Menubar() {
    return (
        <div className="menubarContainer">
            <div className="menubarLeft">
                <span className="logo">ConnectUCLA</span>
            </div>
            <div className="menubarRight">
                <div className="searchbad">
                    <input placeholder="Search" className="searchInput"/>
                </div>
            </div>
            <div className="menubarRight">
                <span className="menubarLink">Home</span>
                <span className="menubarLink">Profile</span>

            </div>

        </div>
    )
}