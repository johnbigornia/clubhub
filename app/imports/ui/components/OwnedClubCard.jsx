import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import TextField from 'uniforms-semantic/TextField';
import {FollowedClubs} from '../../api/followedclub/FollowedClubs';


class OwnedClubCard extends React.Component {

  notify() {

  }

  sendNotification() {

  }

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.club.clubName}</Card.Header>
            <Card.Meta>{this.props.club.type}</Card.Meta>
            <Card.Meta>{this.props.club.contactName}</Card.Meta>
            <Card.Meta>{this.props.club.email}</Card.Meta>
          </Card.Content>
          {Roles.userIsInRole(Meteor.userId(), 'clubAdmin') ? (
              <Button icon='delete' floated='right' onClick={() => this.removeClub(this.props.club._id)}>
                  Send
              </Button>
          ) : ''}
        </Card>
    );
  }
}

OwnedClubCard.propTypes = {
  club: PropTypes.object.isRequired,
};

export default withRouter(OwnedClubCard);
