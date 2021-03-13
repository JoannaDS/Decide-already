import React from 'react';
const Option = (props) => {
  return (
    <div className="option">
      <p className="option__text">
        {props.count}. {props.eText}
      </p>
      <button
        className="button button--link"
        onClick={(e) => {
          props.handleOneDeletedOption(props.eText);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default Option;
