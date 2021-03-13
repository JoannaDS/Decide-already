import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));

    //to to samo co zapis:
    // this.setState(() => {
    //   return { options: [], };
    // });
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  handleOneDeletedOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      }),
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option,
    }));
  };

  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exist!';
    }

    this.setState((prevSate) => ({
      options: prevSate.options.concat([option]),
    }));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('optionsInStorage');
      const showOptions = JSON.parse(json);
      if (showOptions) {
        this.setState(() => ({ options: showOptions }));
      }
    } catch (e) {
      //do nothing at all
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('optionsInStorage', json);
    }
  }

  render() {
    const title = 'Can`t make a decision?';
    const subtitle = 'Let me decide for you';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleOneDeletedOption={this.handleOneDeletedOption}
            />

            <AddOption handleAddOption={this.handleAddOption} />
          </div>

          <OptionModal
            selectedOption={this.state.selectedOption}
            handleClearSelectedOption={this.handleClearSelectedOption}
          />
        </div>
      </div>
    );
  }
}

export default IndecisionApp;
