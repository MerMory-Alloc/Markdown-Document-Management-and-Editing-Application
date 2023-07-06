import './MyModal.css';

export default function MyModal(props){
    return (
        <div className="modal_cont">   
            <h2>Confirmation</h2>
            <p>Are you sure you want to delete this document?</p>
            <div className='btn_cont'>
                <button className="dismissBtn dbn" onClick={props.dismiss}>Dismiss</button>
                <button className="dltBtn dbn" onClick={props.delete}>Delete</button>
            </div>
            
        </div>
    )
}