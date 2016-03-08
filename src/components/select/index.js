import React from 'react';
import Modal from '../modal';

export default class Select extends React.Component {
  constructor(props) {
    super(props);

    // :-(
    this.setSelectedValue = this.setSelectedValue.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);

    this.state = {
      isOpened: false,
      selectedValue: null
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick.bind(this), false);
    document.addEventListener('keydown', this.handleEscKey.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick.bind(this), false);
    document.removeEventListener('keydown', this.handleEscKey.bind(this));
  }

  setSelectedValue(value) {
    this.setState({value});
    this.close();
  }

  // Close the menu by clicking outside it
  handleDocumentClick(e) {
    const {selectRoot} = this.refs;

    if (!selectRoot.contains(e.target)) {
      this.close();
    }
  }

  // Close the menu by pressing `Esc` key
  handleEscKey(e) {
    e.which === 27 && this.close();
  }

  // Just toggle `boolean` state of component: true (opened) or false (closed)
  toggleVisibility() {
    this.setState({
      isOpened: !this.state.isOpened
    });
  }

  // Optional method to open select
  open() {
    this.setState({
      isOpened: true
    });
  }

  // Close select
  close() {
    this.setState({
      isOpened: false
    });
  }

  render() {
    return (
      <div
        className={
        `select${this.state.isOpened ? ' select_opened' : ''}`
        }
        ref="selectRoot"
      >
        <button
          className="select__trigger"
          onClick={this.toggleVisibility}
          type="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span
            className="select__trigger-inner"
          >
            {this.state.value
              ? this.state.value
              : this.props.data[0].value}
          </span>
          <object
            className="select__icon select__icon_arrow_down"
            data={require('./arrow-down.svg')}
            type="image/svg+xml"
          >
            <img
              src={require('./arrow-down.svg')}
              alt="&darr;"
            />
          </object>
        </button>
        <Modal
          data={this.props.data}
          onItemClick={this.setSelectedValue}
        />
      </div>
    );
  }
}

Select.propTypes = {
  data: React.PropTypes.array
};
