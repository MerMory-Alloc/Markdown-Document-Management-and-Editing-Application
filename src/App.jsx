import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import Editor from './Editor'
import Preview from './Preview'
import Nav from './Nav';
import Drawer from './Drawer';
import MyModal from './MyModal';

function App() {
  const DEFAULTTEXT = `
###### This is just a template hold "CTRL" and "A" keys then press "DEL" to empty the page

# Heading 1

## Heading 2

### Heading 3

This is a paragraph of text. **This text is bold** and _this text is italicized_. You can also combine **_bold and italic_** text.

Here's a list of items:
- Item 1
- Item 2
- Item 3

You can also create numbered lists:
1. First item
2. Second item
3. Third item

You can add [links](https://www.example.com) to your markdown.

![Image](https://picsum.photos/200)

> This is a blockquote. You can use it to highlight important information or quotes.

Here's some \`inline code\` and a code block:

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
\`\`\``;

const [documnets, setDocumnets] = useState([{id:uuid(),
   docName:"welcome.md", 
   text:DEFAULTTEXT}]);


const [currentDoc, setCurrentDoc] = useState(documnets[0]);

const [activate_preview, setPreiviewState] = useState(false);

const [isMenuOpen, setIsMenuOpen] = useState(false);

const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {

    Modal.setAppElement('#root');
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    save();
  },[currentDoc])

  useEffect(() => {
    const allDocs= localStorage.getItem("Docs");
    if(allDocs){
      setDocumnets(JSON.parse(allDocs));
      setCurrentDoc(JSON.parse(allDocs)[0]);
    }
    else {
      setCurrentDoc(documnets[0]);
    }
  },[])

const container_grid_style_default = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr"
}

const container_grid_style_mobile = {
  display: "grid",
  gridTemplateColumns: "1fr"
}

const notify = () => {
  toast.success('Saved successfully!', {
    id: 'saved',
    style: {
      fontFamily: 'Roboto , sans-serif'
    },
    iconTheme: {
      primary: '#d46a47',
      secondary: '#fdfefe',
    }
  });
}

function searchDoc(array, object) {
  return array.filter((element) => element.id === object.id);
}

function save() {
  const doc = searchDoc(documnets, currentDoc);
    if(doc){
      const index = documnets.indexOf(doc[0]);
      setDocumnets(prev => [
        ...prev.slice(0, index),
        currentDoc,
        ...prev.slice(index + 1)
      ])
    }
}

function isEqual(obj, defaultTmpDoc) {
  // Check if the object has the same properties
  if (obj.id === defaultTmpDoc.id &&
      obj.docName === defaultTmpDoc.docName &&
      obj.text === defaultTmpDoc.text) {
    return true;
  }

  return false;
}


function dlt() {
      
      const index = documnets.indexOf(currentDoc);
      
      if(documnets.length > 1){

        //update in documents state for the visuals
        setDocumnets(prev => [
          ...prev.slice(0, index),
          ...prev.slice(index + 1)
        ]);

        //update in localStorage 
        localStorage.setItem("Docs", JSON.stringify([
          ...documnets.slice(0, index),
          ...documnets.slice(index + 1)
        ]));

        //update in currentDoc
        if(documnets[index - 1]){
          setCurrentDoc(documnets[index - 1]);
        }
        else if(documnets[index + 1]){
          setCurrentDoc(documnets[index + 1]);
        }
      }
      else {
        const defaultTmpDoc= {id:uuid(),
          docName:"welcome.md", 
          text:DEFAULTTEXT}; // just in case where will be no documnets
        if(isEqual(currentDoc, defaultTmpDoc)){
          setDocumnets([defaultTmpDoc]);
          setCurrentDoc(defaultTmpDoc);
          localStorage.setItem("Docs", JSON.stringify([defaultTmpDoc]));
        }
      }
      toggleModal();
      toast.success('Deleted successfully!', {
        id: 'deleted',
        style: {
          fontFamily: 'Roboto , sans-serif'
        },
        iconTheme: {
          primary: '#d46a47',
          secondary: '#fdfefe',
        }
      });
}

function toggleModal() {
  setModalIsOpen(!modalIsOpen);
}


function showAndHide() {
  setPreiviewState((prev) => !prev )
}
 
  function getText(event) {
    setCurrentDoc(prv => ({...prv, text:event.target.value}))
  }

  const handleMenuToggle = (event) => {
    const id = event.target.id
    if(id === "drawer_menu" || id === "burger" || id === "clo" || id === "op"){
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const handleSave = () => {
    localStorage.setItem("Docs", JSON.stringify(documnets));
    notify();
  }

  const handleCreate = () => {
    setDocumnets(prev => [
      ...prev,
      {
        id:uuid(),
        docName:"newDoc.md", 
        text:DEFAULTTEXT
      }
    ])
  }

  const handleSelect = (id) => {
    setCurrentDoc(documnets.find(doc => doc.id === id));
  }


  const handleDelete = () => {
    if(!modalIsOpen)
      toggleModal();
  }

  const handleRename = (event) => {
      
      const index =  documnets.indexOf(currentDoc);
      const doc= {...currentDoc, docName:addMdExtension(event.target.value)};

      //update in documents state for the visuals
      setDocumnets(prev => [
        ...prev.slice(0, index),
        doc,
        ...prev.slice(index + 1)
      ]);

      //update in localStorage 
      localStorage.setItem("Docs", JSON.stringify([
        ...documnets.slice(0, index),
        doc,
        ...documnets.slice(index + 1)
      ]));

      //update in currentDoc
      setCurrentDoc(doc);
  }

  function addMdExtension(text) {
    return text + ".md";
  }


  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel="delete Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <MyModal dismiss={toggleModal} delete={dlt}  />
      </Modal>
      <Toaster />
      {isMenuOpen && (
        <div className="drawer_menu" id="drawer_menu" onClick={handleMenuToggle}>
          <Drawer documnets={documnets} 
                  currentDocId={currentDoc.id}
                  createDoc={handleCreate} 
                  selectDoc={handleSelect}
                  renameDoc={handleRename}/>
        </div>
      )}
      <Nav 
      isMenuOpen={isMenuOpen} 
      toggle={handleMenuToggle} 
      save={handleSave} 
      delete={handleDelete} 
      docName={currentDoc.docName}/>

      <div className='container' 
      style={activate_preview && viewportWidth > 1000 ? container_grid_style_default : container_grid_style_mobile}>

        {
          viewportWidth < 1000 && !activate_preview &&
           <Editor 
           onChange={getText} 
           text={currentDoc.text} 
           actprev={activate_preview} 
           showAndHide={showAndHide}/>

          || viewportWidth > 1000 && 
            <Editor 
              onChange={getText} 
              text={currentDoc.text} 
              actprev={activate_preview} 
              showAndHide={showAndHide}/>
        }   

        {activate_preview && <Preview text={currentDoc.text} showAndHide={showAndHide}/>}
      </div>
    </div>
  )
}

export default App
