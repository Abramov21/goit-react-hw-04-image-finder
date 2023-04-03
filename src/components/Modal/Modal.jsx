import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    onCloseModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    // console.log(e);
    // console.log(1111111111);
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { onCloseModal, children } = this.props;
    return (
      <div className={s.Overlay} onClick={onCloseModal}>
        <div className={s.Modal}>{children}</div>
      </div>
    );
  }
}
