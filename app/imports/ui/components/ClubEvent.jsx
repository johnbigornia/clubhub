import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { WithTracker } from 'meteor/react-meteor-data';
import { FollowedClubs } from '../../api/followedclub/FollowedClubs';

class ClubEvent extends React.Component {
  render() {
    return(
        <Feed.Event>
          <Feed.Label image='/images/uh-logo.jpg'/>
          <Feed.Content>
            <Feed.Date content='1 day ago'/>
            <Feed.Summary>
              {this.props.followedclub.notification}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

ClubEvent.propTypes = {
  followedclub: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default ClubEvent;

