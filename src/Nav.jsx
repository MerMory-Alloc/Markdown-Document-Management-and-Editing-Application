import "./Nav.css";

export default function Nav(props){

    function trimString(str) {
        if (str.length > 20) {
            return str.slice(0, 20) + "...";
        }
        return str;
    }

    return (
        <nav>
            <div className="left_side">
                <div className="burger_container" id="burger" onClick={props.toggle}>
                    {props.isMenuOpen ? (
                        <i className="fa fa-times" id="op"></i>
                    ) : (
                         <i className="fa fa-bars" id="clo"></i>
                        )}
                </div>

                <div className="logo">Markdown</div>

                <div className="docName_container">
                    <i className="fa fa-file-o"></i>
                    <div className="docName_smal_container">
                        <p className="docName_title">Documnet Name</p>
                        <p className="docName">{trimString(props.docName)}</p>
                    </div>
                </div>
            </div>
            <div className="right_side">
                <button type="button" className="deleteBtn" >
                    <i className="fa fa-trash-o" onClick={props.delete}></i>
                </button>
                <button type="button" className="saveBtn" onClick={props.save}>
                    <i className="fa fa-floppy-o"></i>
                    <span className="btnText">Save Changes</span>
                </button>
            </div>
        </nav>
    )
}