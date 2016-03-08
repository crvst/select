import React from 'react';
import ReactDOM from 'react-dom';

class ModalItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // Pass a selected value to a parent component
  handleClick() {
    this.props.onItemClick(this.props.value);
  }

  render() {
    return (
      <li
        className={`modal__item${this.props.disabled ? ' modal__item_disabled' : ''}`}
        key={this.props.id}
      >
        <button
          className={`modal__trigger${this.props.disabled ? ' modal__trigger_disabled' : ''}`}
          disabled={!!this.props.disabled}
          tabIndex="0"
          onClick={this.handleClick}
          type="button"
        >{this.props.value}</button>
      </li>
    );
  }
}

ModalItem.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  disabled: React.PropTypes.bool,
  onItemClick: React.PropTypes.func
};


export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleArrowKeys.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleArrowKeys.bind(this));
  }

  // Get an array of the elements can be focused i.e. `triggers`
  getFocusableItems() {
    const menuNode = ReactDOM.findDOMNode(this);
    const focusableNodes = menuNode.querySelectorAll('[tabIndex]:not([disabled])');

    return Array.prototype.slice.call(focusableNodes);
  }

  // Get the current active element index
  getActiveItems() {
    const items = this.getFocusableItems();
    const activeItem = document.activeElement;
    const activeItemIndex = items.indexOf(activeItem);

    return {items, activeItemIndex};
  }

  // Set focus at the selected item
  setFocus(direction) {
    const {items, activeItemIndex} = this.getActiveItems();
    const forceFocus = function (delta) {
      const shift = delta || 0;
      const targetIndex = activeItemIndex + shift;

      if (targetIndex >= items.length) {
        // If a last item has reached, jump to the first one
        items[0].focus();
      } else if (targetIndex < 0) {
        // If a first item has reached, jump to the last one
        items[items.length - 1].focus();
      } else {
        // Otherwise handle interactions as usual
        items[targetIndex].focus();
      }
    };

    switch (direction) {
      case 'prev':
      case 'previous':
      case -1:
        forceFocus(-1);
        break;
      case 'next':
      case 1:
        forceFocus(1);
        break;
      default:
        break;
    }
  }

  // Handle up and down arrows navigation from a keyboard
  handleArrowKeys(e) {
    switch (e.which) {
      case 38: // `Up` key
        this.setFocus('previous');
        break;
      case 40: // `Down` key
        this.setFocus('next');
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <ul className="modal">
        {this.props.data.map(item =>
          <ModalItem
            key={item.id}
            value={item.value}
            disabled={item.disabled}
            onItemClick={this.props.onItemClick}
          />
        )}
      </ul>
    );
  }
}

Modal.propTypes = {
  data: React.PropTypes.array,
  onItemClick: React.PropTypes.func
};
