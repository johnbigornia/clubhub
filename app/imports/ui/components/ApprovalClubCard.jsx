import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Card, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import { Clubs } from '../../api/club/Clubs';
import { OwnedClubs } from '../../api/ownedclub/OwnedClubs';
import { Requests } from '../../api/request/Requests';

class ApprovalClubCard extends React.Component {

  approve() {
    const clubName = this.props.request.clubName;
    const type = this.props.request.type;
    const contactName = this.props.request.contactName;
    const email = this.props.request.email;
    const website = this.props.request.website;
    const image = this.props.request.image;
    const description = this.props.description;
    const rioemail = this.props.request.rioemail;
    const owner = this.props.request.owner;
    swal({
      text: 'The club will become officially recognized.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willAdd) => {
          if (willAdd) {
            Requests.remove(this.props.request._id);
            OwnedClubs.insert({clubName, type, contactName, email, website, image, description, rioemail, owner});
            Clubs.insert({ClubName: clubName, Type: type, ContactName: contactName,
              Email: email, Website: website, Image: image, Description: description, RIOEmail: rioemail});
            swal('The club is now official!', {
              icon: 'success',
            });
          } else {
            swal('You cancelled your approval.');
          }
        });
  }

  decline() {
    const clubName = this.props.request.clubName;
    swal({
      text: clubName + ' will be deleted from requests.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            Requests.remove(this.props.request._id);
            swal(clubName + ' has been declined.', {
              icon: 'success',
            });
          } else {
            swal(clubName + ' is still pending.');
          }
        });
  }

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.request.clubName}</Card.Header>
            <Card.Meta>{this.props.request.type}</Card.Meta>
          </Card.Content>
          <Card.Content>{this.props.request.contactName}</Card.Content>
          <Card.Content>{this.props.request.email}</Card.Content>
          <Card.Content>{this.props.request.website}</Card.Content>
          <Card.Content>{this.props.request.description}</Card.Content>
          <Card.Content>{this.props.request.rioemail}</Card.Content>
            {Roles.userIsInRole(Meteor.userId(), 'clubAdmin') ? (
                <Button color={'grey'} >
                  Pending
                </Button>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'superAdmin') ? (
                <Button color='green'onClick={() => this.approve()}>
                  Accept
                </Button>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'superAdmin') ? (
                <Button color='red' onClick={() => this.decline()}>
                  Decline
                </Button>
            ) : ''}
        </Card>
    );
  }
}

ApprovalClubCard.propTypes = {
  request: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Clubs');
  const subscription2 = Meteor.subscribe('OwnedClubsClubAdmin');
  const subscription3 = Meteor.subscribe('OwnedClubsSuperAdmin');
  const subscription4 = Meteor.subscribe('RequestsSuperAdmin');
  return {
    ready: subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready(),
  };
})(ApprovalClubCard);
