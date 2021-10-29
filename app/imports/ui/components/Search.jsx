import React from 'react';
import { Container, Grid, Search, Button, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class SearchComponent extends React.Component {
  render() {
    const fontStyle = { fontFamily: 'Gill Sans, sans-serif' };

    return (
        <div style={fontStyle}>
          <Search
              placeholder='Start your club search...'
              icon='search icon'
          />
        </div>
    );
  }
}

export default SearchComponent;
