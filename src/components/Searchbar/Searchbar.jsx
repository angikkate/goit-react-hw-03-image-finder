import React, { Component } from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  }

  handleSubmit = event => {
    event.preventDefault();
    
    if(this.state.query.trim() === '') {
        return toast.error('Enter text for search.');
    }    
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  }

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchButton}>
            <ImSearch size="25" />
            <label className={css.searchButtonLabel}>Search</label>
          </button>

          <input
            className={css.searchInput}
            type="text"
            autoComplete="off"
            autoFocus 
            placeholder="Search images and photos"
            name="search"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;