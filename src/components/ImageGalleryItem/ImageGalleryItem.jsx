import css from './ImageGalleryItem.module.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => { 
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { smallImage, largeImage, tags } = this.props;

    return (
      <>
        <li className={css.galleryItem} onClick={this.toggleModal}>
          <img src={smallImage} alt={tags} data-large={largeImage}/>
        </li>

        {this.state.showModal && (
          <Modal url={largeImage} alt={tags} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;