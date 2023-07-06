import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import breaks from 'remark-breaks';
import './Preview.css';

export default function Preview(props) {

  return (
    <div className="preview_cont">
      <div className='preview_title_container'>
        <h3 className="preview_title">Preview</h3> 
        <button type='button' className='showBtn' onClick={props.showAndHide}>
          <i className="fa fa-eye-slash"></i>
        </button>
      </div>
      <div className="preview_text" id="preview">
        <ReactMarkdown children={props.text} remarkPlugins={[remarkGfm, breaks]} />
      </div>
    </div>
  );
}
