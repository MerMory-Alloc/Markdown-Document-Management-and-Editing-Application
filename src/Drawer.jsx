import { useState, useEffect } from 'react'

import "./Drawer.css";
import 'animate.css';

export default function Drawer(props){

    const [isEditing, setIsEditing] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        setIsEditing(props.documnets.map(() => false));
    }, [props.documnets]);
    
    function updateArrayElement(array, index, newValue) {
        return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
    }

    const handleEdit = (event , index) => {
        if(event.target.parentNode.parentNode.classList.contains("selected"))
            {
                const docName= props.documnets[index].docName;
                setIsEditing(updateArrayElement(isEditing, index, true));
                setText(docName);
            }
        
    }

    const handleInputChange = (event) => {
        setText(event.target.value);
      };

      const handleDismissChange = () => {
        setIsEditing(props.documnets.map(() => false));
      };


      const handleRenameDone = (event) => {
        if (event.keyCode === 13) { 
            props.renameDoc(event);
            setIsEditing(props.documnets.map(() => false));
        }
      }

    function removeMdExtension(text) {
        return text.replace(".md", "");
    }

    function trimString(str) {
        if (str.length > 20) {
            return str.slice(0, 20) + "...";
        }
        return str;
    }
        

    return (
        <div className="drawer_cont animate__animated animate__slideInLeft">
            <div className="drawer_title_container">
                <h3 className="drawer_title">Files</h3>
                <button type='button' className='addBtn' title='Create New Document' onClick={props.createDoc}>
                    <i className="fa fa-plus"></i><span className='btnText2'>Add New Document</span>
                </button>
            </div>
            <ul className="drawer_list">
                {props.documnets.map((doc,index) => {
                    return (
                        <li key={doc.id} 
                            onClick={() => props.selectDoc(doc.id)}
                            className={props.currentDocId === doc.id ? "selected" : ""}
                            >
                            <div className='docdoc_cont'>
                                { isEditing[index] ? 
                                    <input type="text" 
                                        value={removeMdExtension(text)} 
                                        onChange={handleInputChange} 
                                        onBlur={handleDismissChange}
                                        onKeyDown={handleRenameDone}
                                        className="docdoc_input"
                                        maxLength={50}
                                        autoFocus/> 

                                    : trimString(doc.docName)}</div>
                            <button type="button" className="renameBtn">
                                <i className="fa fa-pencil-square-o" onClick={() => handleEdit(event, index)}></i>
                            </button>
                        </li>
                    )}
                )}
            </ul>
        </div>
    )
}