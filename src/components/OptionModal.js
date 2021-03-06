import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected option"
    closeTimeoutMS={200}
    className="modal"
    onRequestClose={props.handleClearSelectedOption}
  >
    <h3 className="modal__title">Selected option:</h3>
    {props.selectedOption && (
      <p className="modal__body">{props.selectedOption}</p>
    )}
    <button className="button" onClick={props.handleClearSelectedOption}>
      Thanks for help!
    </button>
  </Modal>
);

Modal.setAppElement(document.getElementById('app'));
export default OptionModal;
