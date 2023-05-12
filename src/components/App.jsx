import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';
import api from '../services/api';
import { ThreeDots } from 'react-loader-spinner';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    total: 0,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
      this.fetchImages(query, page);
    }
  };

  fetchImages = async (query, page) => {
    try {
      const imagesArray = await api.fetchImages(query, page);

      if (imagesArray.totalHits === 0) {
        return toast.info(`Nothing was found for ${query}`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...imagesArray.hits],
        total: imagesArray.totalHits,
      }));
    } catch (error) {
      return toast.error('Server temporarily unavailable. Try again later');
    } finally {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
    }
  };

  onFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  clickLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { images, isLoading, total } = this.state;
    const totalPage = total / images.length;
    const showButton = totalPage > 1 && total !== images.length;

    return (
      <div className="app">
        <Searchbar onSubmit={this.onFormSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images}/>
        )}

        {isLoading && <ThreeDots
          height="80" 
          width="80" 
          radius="9"
          color="#4fa94d" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: 'center' }}
        />}
        
        {showButton && !isLoading && <Button onLoadMore={this.clickLoadMore} />}
        
        <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default App;