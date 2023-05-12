import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({id, webformatURL, largeImageURL, tags}) => {
        return (
          <ImageGalleryItem
            key={id}
            smallImage={webformatURL}
            largeImage={largeImageURL}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      smallImage: PropTypes.string,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;