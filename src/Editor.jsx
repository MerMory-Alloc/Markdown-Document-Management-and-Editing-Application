
export default function Editor(props){
    return (
        <div className="editor_cont">
            <div className='editor_title_container'>
                <h3 className="editor_title">Markdown</h3>
                {!props.actprev && <button type='button' className='showBtn' onClick={props.showAndHide}>
                    <i className="fa fa-eye"></i>
                </button>}
            </div>
            <textarea className="editor_text" id="editor" value={props.text} onChange={props.onChange}>
                
            </textarea>
        </div>
    )
}

