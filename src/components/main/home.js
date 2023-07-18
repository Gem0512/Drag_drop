import React, { useState } from "react";
import PrimarySearchAppBar from "../header/index"
import "../css/home.css";
import Name from "../app-name/index"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import FormPage from "../../pages/FormPage"
import ViewsPage from "../../pages/ViewsPage"
// import Test from "./Test"
// import Test from "../../test/Test"
import Testt from "./Test"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDrop } from "react-dnd";
import Checkbox from '@mui/material/Checkbox';
import { OutlinedInput } from '@mui/material';


const ElementList = [
  { id: 1, type: "input", text: "Input" },
  { id: 2, type: "button", text: "Button" },
  { id: 3, type: "label", text: "Label" },
  { id: 4, type: "textarea", text: "Text area" },
  { id: 5, type: "checkbox", text: "Check box" },
  { id: 6, type: "number", text: "Number" },
  { id: 7, type: "calculated", text: "Calculated" },
  { id: 8, type: "radio", text: "Radio button" },
  { id: 9, type: "attachfile", text: "Attach file" },
  { id: 10, type: "link", text: "Link" },
  { id: 11, type: "table", text: "Table" },
  { id: 12, type: "date", text: "Date" },
  { id: 13, type: "time", text: "Time" },
  { id: 14, type: "drop", text: "Drop down" },

  // Thêm các thành phần khác nếu cần
];


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




export default function Home(
  
) {



  const [clickedOnce, setClickedOnce] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!clickedOnce ) {
      navigate('/records'); // Chuyển đến trang mới khi button được click lần đầu
      setClickedOnce(true);
      setHasNavigated(true);
    } else {
      if (hasNavigated){
        setOpenActive(true);
      }
    }
  };

  
  const [openActive, setOpenActive] = React.useState(false);
  const handleOpenActive = () => setOpenActive(true);
  const handleCloseActive = () => setOpenActive(false);




  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [currentTime, setCurrentTime] = useState('');



  // react-dnd

  const [board, setBoard] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
      accept: ["input", 
              "label",
              "checkbox",
              "textarea",
              "number",
              "calculated",
              "radio",
              "attachfile",
              "link",
              "table",
              "date",
              "time",
              "drop"
            ], // Chấp nhận các loại type mới
      drop: (item, monitor) => addElementToBoard(item, monitor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  
    // const addElementToBoard = (id) => {
    //   const elementList = ElementList.filter((element) => id === element.id);
    //   setBoard((board) => [...board, elementList[0]]);
    // };
    const addElementToBoard = (item, monitor) => {
      const elementList = ElementList.filter((element) => item.id === element.id);
      const newItem = {
        ...elementList[0],
        position: monitor.getClientOffset(),
      };
      setBoard((board) => [...board, newItem]);
      setDroppedItems((prevItems) => [...prevItems, item.id]);
    };

    const [droppedItems, setDroppedItems] = useState([]);
    
  
    const handleDrop = (id, rowIndex, colIndex) => {
      const updatedBoard = board.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            position: { rowIndex, colIndex },
          };
        }
        return element;
      });
      setBoard(updatedBoard);
      
    };

    const showToastMessage = () => {
        toast.success('Form saved !', {
            position: toast.POSITION.TOP_RIGHT
        },
        {
            toastClassName: 'my-toast',
        }
        );
    };

    const handleClick1 = () => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString());
        showToastMessage();

      };

      // CheckBox
      const [isChecked, setIsChecked] = useState(false);

      const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);

        if (event.target.checked) {
          
          const paragraphElement = event.target.parentNode.querySelector('p');
          if (paragraphElement) {
            const paragraphValue = paragraphElement.textContent;
            setInputValueView(paragraphValue);
          }
        } 
      };
    
           
  
      const [checkboxes2, setCheckboxes2] = useState([]);
      const [inputValues2, setInputValues2] = useState([]);

      const handleCheckboxChangee2 = (index) => {
          setCheckboxes2((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
          return updatedCheckboxes;
          });
      };

      const handleDeleteButton2 = (index) => {
          setCheckboxes2((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes.splice(index, 1);
          return updatedCheckboxes;
          });
          setInputValues2((prevInputValues) => {
          const updatedInputValues = [...prevInputValues];
          updatedInputValues.splice(index, 1);
          return updatedInputValues;
          });
      };

      const addButton4 = () => {
          setCheckboxes2((prevCheckboxes) => [...prevCheckboxes, { checked: false }]);
          setInputValues2((prevInputValues) => [...prevInputValues, '']);
      };

      const handleInputChange12 = (index, value) => {
          setInputValues2((prevInputValues) => {
          const updatedInputValues = [...prevInputValues];
          updatedInputValues[index] = value;
          return updatedInputValues;
          });
      };

      const renderButton32 = () => {
          return checkboxes2.map((checkbox, index) => (
          <div
              style={{
              display: 'flex',
              marginRight: '5px',
              }}
              key={index}
          >
              <Checkbox
              sx={{
                  marginTop: '-8px',
              }}
              checked={checkbox.checked}
              onChange={() => handleCheckboxChangee2(index)}
              />
              <OutlinedInput
              style={{
                  height: '30px',
                  marginBottom: '10px',
              }}
              value={inputValues2[index] || ''}
              onChange={(e) => handleInputChange12(index, e.target.value)}
              />
              <button
              style={{
                  height: '25px',
                  margin: '2px 5px 0px 5px',
                  
              }}
              
              onClick={addButton4}
              >
              +
              </button>

              <button
              style={{
                  height: '25px',
                  marginTop: '2px',
                  width: '23px',
              }}
              onClick={() => handleDeleteButton2(index)}
              >
              -
              </button>
          </div>
          ));
      };

      const renderButton2 = () => {
          return checkboxes2.map((checkbox, index) => (
          <div
              style={{
              display: 'flex',
              marginRight: '5px',
              }}
              key={index}
          >
              <Checkbox
              sx={{
                  marginRight: '-8px',
              }}
              checked={checkbox.checked}
              onChange={() => handleCheckboxChangee2(index)}
              />
              <p>{inputValues2[index] || ''}</p>
          </div>
          ));
      };

      // Checkbox_next

      const [checkboxes, setCheckboxes] = useState([]);
      const [inputValues, setInputValues] = useState([]);

      const handleCheckboxChangee = (index) => {
          setCheckboxes((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
          return updatedCheckboxes;
          });
      };

      const handleDeleteButton = (index) => {
          setCheckboxes((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes.splice(index, 1);
          return updatedCheckboxes;
          });
          setInputValues((prevInputValues) => {
          const updatedInputValues = [...prevInputValues];
          updatedInputValues.splice(index, 1);
          return updatedInputValues;
          });
      };

      const addButton3 = () => {
          setCheckboxes((prevCheckboxes) => [...prevCheckboxes, { checked: false }]);
          setInputValues((prevInputValues) => [...prevInputValues, '']);
      };

      const handleInputChange1 = (index, value) => {
          setInputValues((prevInputValues) => {
          const updatedInputValues = [...prevInputValues];
          updatedInputValues[index] = value;
          return updatedInputValues;
          });
      };

      const renderButton3 = () => {
          return checkboxes.map((checkbox, index) => (
          <div
              style={{
              display: 'flex',
              marginRight: '5px',
              }}
              key={index}
          >
              <Checkbox
              sx={{
                  marginTop: '-8px',
              }}
              checked={checkbox.checked}
              onChange={() => handleCheckboxChangee(index)}
              />
              <OutlinedInput
              style={{
                  height: '30px',
                  marginBottom: '10px',
              }}
              value={inputValues[index] || ''}
              onChange={(e) => handleInputChange1(index, e.target.value)}
              />
              <button
              style={{
                  height: '25px',
                  margin: '2px 5px 0px 5px',
                  
              }}
              
              onClick={addButton3}
              >
              +
              </button>

              <button
              style={{
                  height: '25px',
                  marginTop: '2px',
                  width: '23px',
              }}
              onClick={() => handleDeleteButton(index)}
              >
              -
              </button>
          </div>
          ));
      };

      const renderButton = () => {
          return checkboxes.map((checkbox, index) => (
          <div
              style={{
              display: 'flex',
              marginRight: '5px',
              }}
              key={index}
          >
              <Checkbox
              sx={{
                  marginRight: '-8px',
              }}
              checked={checkbox.checked}
              onChange={() => handleCheckboxChange(index)}
              />
              <p>{inputValues[index] || ''}</p>
          </div>
          ));
      };


      const [inputValueView, setInputValueView] = useState('');
    


      // Value title
      const [inputValueSave, setInputValueSave] = useState('Input');
      const [textAreaValueSave, setTextAreaValueSave] = useState('');
    
   
      // Size input
      const handleSaveInputValues = (value1, value2) => {
        localStorage.setItem('inputValue1', value1);
        localStorage.setItem('inputValue2', value2);
      };

      // Check Label
      const [checkLabel, setCheckLabel]= useState();


      // Delete item in View
      const [deleteItem,setDeleteItem]= useState("delete");
      const [deleteItemText,setDeleteItemText]= useState("delete");
      const [deleteItemLabel,setDeleteItemLabel]= useState("delete");

      // CheckBox value
      const [valueSample1, setValueSample1] = useState("sample1");
      const [sample1, setSample1] = useState(valueSample1);
    
    
      
      const [valueSample2, setValueSample2] = useState("sample2");
      const [sample2, setSample2] = useState(valueSample2);

  return (

    <div className="home-all">
      <div>
        <PrimarySearchAppBar></PrimarySearchAppBar>
      </div>
      <div>
        <Name
       
          currentTime={currentTime}
          handleClick={handleClick}
        openActive={openActive}
        handleCloseActive={handleCloseActive}
        ></Name>
      </div>

      <Box sx={{ width: '100%' }}>
      <Box >
        <Tabs
          sx={{
            // backgroundColor:"white",
            paddingLeft:"24px",          
            
          }}
         value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{
          border: "1px solid #ccc",
          padding:"10px 50px",
          backgroundColor: value === 'one' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        }}
         label="Form" {...a11yProps(0)} />
          <Tab sx={{
          border: "1px solid #ccc",
          padding:"10px 50px",
          backgroundColor: value === 'two' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        }}
        label="Views" {...a11yProps(1)} />
          <Tab sx={{
          padding:"10px 50px",
          border: "1px solid #ccc",
          backgroundColor: value === 'three' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        }}
         label="Graphs" {...a11yProps(2)} />
        
        <Tab sx={{
          padding:"10px 50px",
          border: "1px solid #ccc",
          backgroundColor: value === 'three' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        }}
         label="App Settings" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
          <FormPage
            currentTime={currentTime} 
            setCurrentTime={setCurrentTime}
            ElementList={ElementList}
            handleClick1={handleClick1}
            drop={drop}
            board={board}
            handleDrop={handleDrop}
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
            addButton3={addButton3}
            renderButton3={renderButton3}
            addButton4={addButton4}
            renderButton32={renderButton32}
            renderButton={renderButton}
            renderButton2={renderButton2}
            setInputValueView={setInputValueView}
            setInputValueSave={setInputValueSave}
            setTextAreaValueSave={setTextAreaValueSave}
            textAreaValueSave={textAreaValueSave}
            inputValueSave={inputValueSave}
            onSave={handleSaveInputValues}
            setCheckLabel={setCheckLabel}
            setDeleteItem={setDeleteItem}
            setDeleteItemText={setDeleteItemText}
            setDeleteItemLabel={setDeleteItemLabel}
            valueSample1={valueSample1}
            valueSample2={valueSample2}
            setSample1={setSample1}
            setSample2={setSample2}
            setValueSample1={setValueSample1}
            setValueSample2={setValueSample2}
          ></FormPage>
      </CustomTabPanel>
      
      <CustomTabPanel value={value} index={1}>
      <div className="home">
      
        <ViewsPage
        droppedItems={droppedItems}
        ElementList={ElementList}
        renderButton={renderButton}
        renderButton2={renderButton2}
        inputValueView={inputValueView}
        inputValueSave={inputValueSave}
        textAreaValueSave={textAreaValueSave}
        checkLabel={checkLabel}
        deleteItem={deleteItem}
        deleteItemText={deleteItemText}
        deleteItemLabel={deleteItemLabel}
        inputValues={inputValues}
        checkboxes={checkboxes}
        sample1={sample1}
        sample2={sample2}
        inputValues2={inputValues2}
        ></ViewsPage>
      </div>
      </CustomTabPanel>
      <CustomTabPanel 
      // className="home"
      style={{
        margin:"0 25px",
        backgroundColor: "white",
        boxShadow: "5px 5px 6px rgba(0, 0, 0, 0.4)",
        display:"flex",
      }}
      value={value} index={2}>
        {/* <Test></Test> */}
       <Testt></Testt>
      
      </CustomTabPanel>
      <CustomTabPanel 
      style={{
        margin:"0 25px",
        backgroundColor: "white",
        boxShadow: "5px 5px 6px rgba(0, 0, 0, 0.4)",
        display:"flex",
      }}
      value={value} 
      index={3}>
        Item Four
      </CustomTabPanel>
      </Box>
    {/* </Box> */}

      
    </div>
    
  );
}
