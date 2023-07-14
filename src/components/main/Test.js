import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checkboxes, setCheckboxes] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  const handleCheckboxChange = (index) => {
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

  const handleInputChange = (index, value) => {
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
          onChange={() => handleCheckboxChange(index)}
        />
        <OutlinedInput
          style={{
            height: '30px',
            marginBottom: '10px',
          }}
          value={inputValues[index] || ''}
          onChange={(e) => handleInputChange(index, e.target.value)}
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

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>

      <div
        style={{
          display: 'flex',
        }}
      >
        {renderButton()}
      </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div>
              {open && (
                <div className="modal">
                  <div className="modal-content">
                  <Checkbox
                    sx={{
                        marginTop: '-8px',
                    }}/>
                    <OutlinedInput
                    style={{
                        height: '30px',
                        marginBottom: '10px',
                    }}
                   
                    />
                    <button 
                    style={{
                        height: '25px',
                        marginTop: '2px',
                        marginLeft:"5px"
                    }}
                    onClick={addButton3}>+</button>
                    <button 
                     style={{
                        height: '25px',
                        margin: '2px 5px 0px 5px',
                        width: '23px',
                    }}
                    >-</button>
                  </div>
                </div>
              )}
            </div>
            <div
              style={{
                // display:"flex",
              }}
            >
              {renderButton3()}
            </div>
            <div>
              <button
              onClick={handleClose}>Save</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
