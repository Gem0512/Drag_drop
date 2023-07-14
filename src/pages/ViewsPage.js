import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import "../components/css/ViewPage.css";
const columns = [
    { field: 'name', headerName: 'Name', width: 500 },
    { field: 'edit', 
      headerName: '', 
      width: "120" ,
      renderCell: (params) => (
        <div>
          <CreateIcon style={{ marginRight: 8, marginBottom: -5, color:"#0099CC"}} />
          <span style={{
            color:"#0099CC"
          }}>Edit</span>
        </div>
      ),
    },
    { field: 'duplicate', 
      headerName: '', 
      width: "120" ,
      renderCell: (params) => (
        <div>
          <ContentCopyIcon style={{ marginRight: 8, marginBottom: -5, color:"#0099CC"}} />
          <span style={{
            color:"#0099CC"
          }}>Duplicate</span>
        </div>
      ),
    },
    { field: 'delete', 
      headerName: '', 
      width: "120",
      renderCell: (params) => (
        <div>
          <HighlightOffIcon style={{ marginRight: 8, marginBottom: -5, color:"red"}} />
          <span style={{
            color:"red"
          }}>Delete</span>
        </div>
      ),
     },
  ];
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    padding:"20px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function ViewsPage({
  inputValueView,
  droppedItems,
  ElementList,
  renderButton,
  renderButton2,
  inputValueSave,
  textAreaValueSave,
  input11,
  input2,
  setError,
  setInput3,
  error,
  checkLabel,
  deleteItem,
  deleteItemText,
  deleteItemLabel,
  inputValues,
  checkboxes,
  valueSample1,
  valueSample2,
  sample1,
  sample2,
  inputValues2

}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getTypeById = (id) => {
    const element = ElementList.find((item) => item.id === id);
    return element ? element.type : "";
  };
  // Data
  const [input1, setInput1] = useState('');
  const [textarea, setTextarea]= useState('');


  const handleChangeInput1 = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setInput1(value)
   
    handleInput3Change(event);
  }
  const handleChangeTextarea=(event)=>{
    event.preventDefault();
    const value = event.target.value;
    setTextarea(value)
  }

  const [rows, setRows] = useState([
    // { id: 1, name: 'Snow' },
    // { id: 2, name: 'Lannister' },
  ]);

  const [sizeText, setSizeText]= useState('');

  const [checkBox1, setCheckBox1]=useState(inputValues||"sample1");
  
  
  const handleClick = (event) => {
    const test= checkboxes?.checked;
    const newRow = {
      id: rows.length +1,
      email: email,
      name: input1,
      text: textarea,
      label: label,
      valueSample1:sample1,
      value: checkBox1,
      valueSample2:sample2,
      value2:inputValues2
    };

   
  
    const updatedRows = [...rows, newRow];
    // localStorage.setItem('input1', newRow.name);
    // localStorage.setItem('textarea', newRow.text);
    event.preventDefault();
   
    
      // localStorage.removeItem('input1');
      if(inputValue1.length >=1 && inputValue2.length >=1){
        if ( checkValue.length >= parseInt(inputValue1) && checkValue.length <=parseInt(inputValue2)  ){
          console.log("thành công!");
          localStorage.setItem('rows', JSON.stringify(updatedRows));
          setRows(updatedRows);
          handleClose();
        }
        else{
          alert("Số kí tự của "+ inputValueSave+" phải từ "+ inputValue1+ " đến "+inputValue2);
        }
      }
      else{
        console.log("thành công!");
          localStorage.setItem('rows', JSON.stringify(updatedRows));
          setRows(updatedRows);
          handleClose();
      }
    
    // console.log(localStorage.getItem('change1'));
    console.log(inputValue1, inputValue2);
    console.log(sample1, sample2);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('rows')) || [];
    setRows(storedData);
  }, []);


  const [label, setLabel]= useState("");
  useEffect(() => {
    
    const labelValue = localStorage.getItem('label');
    const input1Value = localStorage.getItem('input1');
    const TextareaValue = localStorage.getItem('textarea');

    if (input1Value) {
      setInput1(input1Value);
    }
    if (TextareaValue && TextareaValue !=='null') {
      setTextarea(TextareaValue);
    }
    if (labelValue && checkLabel) {
      setLabel(labelValue);
    }
  }, []);





  const handleDeleteRow = (id) => {
   
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
  
    // Xóa object tương ứng trong local storage
    const storedData = JSON.parse(localStorage.getItem('rows')) || [];
    const updatedData = storedData.filter(data => data.id !== id);
    localStorage.setItem('rows', JSON.stringify(updatedData));
  };


  // Duplication object
  const handleDuplicateRow = (id) => {
  
    const row = rows.find(row => row.id === id);
    if (row) {
    const newRow = {
      id: rows.length +1,
      email: row.email,
      name:  row.input1,
      text:  row.textarea,
      label:  row.label,
      value:  row.inputValueView,
    };
  
    const updatedRows = [...rows, newRow];
   
    localStorage.setItem('rows', JSON.stringify(updatedRows));
    setRows(updatedRows);
    }
    console.log( row.id, row.email, row.input1, row.label,row.textarea);
  
  };



  // show user
  
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);


  // Size Input
  // const handleInput3Change = (event) => {
  //   const value = event.target.value;
  //   if (value.length >= parseInt(inputValue1) && value.length <=parseInt(inputValue2)  ) {
      
  //     setError('');
  //   } else {
     
  //     alert("loi");
  //   }
  //   setSizeText(value);
  // };

  const [checkValue, setCheckValue]= useState('');

  const handleInput3Change = (event) => {
    setCheckValue(event.target.value);
  }



  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  useEffect(() => {
    const storedValue1 = localStorage.getItem('inputValue1');
    const storedValue2 = localStorage.getItem('inputValue2');

    if (storedValue1) {
      setInputValue1(storedValue1);
    }

    if (storedValue2) {
      setInputValue2(storedValue2);
    }
  }, []);


  return (

    <div style={{ height: "auto", width: '100%',
    paddingBottom:"20px" }}>
      <div
      style={{
        display:"flex",
        justifyContent:'flex-end',
        padding:"10px",
        
      }}>
      <Button
       onClick={handleOpen}>
        <AddCircleIcon></AddCircleIcon>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
          <h2
          style={{
            marginBottom:"20px"
          }}>Form submit</h2>
          <hr></hr>
          <div
          style={{
                    margin:"20px 10px ",
                  }}
          >
                    <label
                    style={{
                    fontWeight:"bold",
                    marginLeft:"-10px",
                    display:"block"
                  }}>User</label>
                    <input 
                    style={{
                      width:"300px",
                      padding: "10px"
                    }}value={email} disable></input>
                  </div>
          {droppedItems.map((id) => (
            <div>
                  
                {id===1 && deleteItem &&(
                  <div
                   style={{
                    margin:"10px",
                  }}>
                    <label name="input"
                    style={{
                    fontWeight:"bold",
                    marginLeft:"-10px",
                    display:"block"
                }}>{inputValueSave}</label>
                    <input
                    value={input1}
                    onChange={handleChangeInput1}
                    style={{
                      padding: "10px"
                    }}
                     for="input"></input>
                     {/* <p>Số kí tự{}</p> */}
                  </div>
                )}
                {id===2 &&(
                  <div
                   style={{
                    margin:"10px 0 20px 10px",
                  }}>
                    <button>Save</button>
                  </div>
                )}
                {id===3 && deleteItemText &&(
                  <div
                   style={{
                    margin:"10px 0 20px 10px",
                  }}>
                  <label
                  style={{
                    fontWeight:"bold",
                    marginLeft:"-10px"
                  }}>Label</label>
                    <p>{label}</p>
                  </div>
                )}
                {id===4 && deleteItemText &&(
                  <div
                  style={{
                    margin:"10px 0 20px 10px",

                  }}>
                    <label 
                     style={{
                    fontWeight:"bold",
                    marginLeft:"-10px",
                    display:"block"
                  }}
                  name="textarea">{textAreaValueSave ||"Text area"}</label>
                    <textarea 
                    style={{
                      width:"300px",
                      padding:"10px 0 0 5px"
                    }}
                    value={textarea}
                    onChange={handleChangeTextarea}
                    for="textarea"></textarea>
                  </div>
                )}
                {id===5 &&(
                  <div
                   style={{
                    margin:"10px 0 20px 10px",
                  }}>
                    <label  style={{
                    fontWeight:"bold",
                    marginLeft:"-10px",
                    display:"block"
                  }}
                  name="checkbox">CheckBox</label>
                    <FormGroup
                    >
                     <div
                     style={{
                      display:"flex"
                     }}>
                     <FormControlLabel control={<Checkbox  />} label={sample1} />
                      <div
                      style={{
                        margin:"0 20 0 5"
                      }}>
                      {renderButton()}
                      </div>
                      <FormControlLabel  control={<Checkbox />} label={sample2} />
                     
                      <div
                       style={{
                        margin:"0 15 0 10"
                      }}>
                         {renderButton2()}
                      </div>
                     </div>
                    </FormGroup>
                   
                  </div>
                )}
            </div>
         
        ))}
        <div
        style={{
          display:"flex",
          justifyContent:"flex-end"
        }}>
          <Button
          sx={{
            backgroundColor:"orange",
            padding:"10px 20px",
          }}
          onClick={handleClick}
          >Submit</Button>
        </div>
          </div>
        </Box>
      </Modal>
    </div>
      {/* <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />  */}
     
      <table
      style={{
        padding:"0 30px",
        width:"100%",
       
      }}>
        
        <tbody>
          {rows.map((row) => (
            <tr 
              key={row.id}
              style={{
                padding:"10px",
                border:"1px solid #ccc",
                // width:"1000px",
                display:"flex",
            
              }}
            >
            
            
             <div
             style={{
              width:"80%"
             }}>
             {Object.values(row).map((value, index) => (
                <td 
                style={{
                padding:"5px 20px",
               
              }}
                key={index}>{value}</td>
                
              ))}
            
             </div>
             <div
             style={{
              display:"flex",
              justifyContent:'flex-end',
              width:"20%",
              paddingTop:"5px"
             }}>
             <div
             className="actionHover"
             onClick={handleOpen}
             style={{
              paddingRight:"20px",
            
             }}>
              
                <CreateIcon style={{ marginRight: 8, marginBottom: -5, color:"#0099CC"}} />
                <span style={{
                  color:"#0099CC"
                }}>Edit</span>
              
              </div>
              
              <div
                className="actionHover"
              onClick={() => handleDuplicateRow(row.id)}
               style={{
              paddingRight:"20px"
              
             }}>
                <ContentCopyIcon style={{ marginRight: 8, marginBottom: -5, color:"#0099CC"}} />
                <span style={{
                  color:"#0099CC"
                }}>Duplicate</span>
              </div>
              
              <div
                className="actionHover"
               style={{
              paddingRight:"20px"
             }}
             onClick={() => handleDeleteRow(row.id)}>
              
                <HighlightOffIcon style={{ marginRight: 8, marginBottom: -5, color:"red"}} />
                <span style={{
                  color:"red"
                }}>Delete</span>
              </div>
              
             </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}
