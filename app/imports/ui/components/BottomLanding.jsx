import React from 'react';
import { Grid, Header, Icon, Container } from 'semantic-ui-react';

/** Create a clickable link for About Us and Feedback */
class Bottom extends React.Component {
  render() {
    return (
        <div className='footer'>
          <Container centered>
            <Grid columns='four'>
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <Header as='h3' inverted>
                  <Icon name='users inverted' size='small'/>
                  <Header.Content>About Us</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' textAlign='right' inverted>
                  <Icon name='pencil alternate inverted' size='small'/>
                  <Header.Content>Feedback</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

export default Bottom;
