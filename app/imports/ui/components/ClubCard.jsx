import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image, Label } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { FollowedClubs } from '../../api/followedclub/FollowedClubs';
import { Clubs } from '../../api/club/Clubs';

class ClubCard extends React.Component {

  removeClub(docID) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, information can not be recovered!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            Clubs.remove(docID);
            swal('Club deleted!', {
              icon: 'success',
            });
          } else {
            swal('Canceled');
          }
        });
  }

  isFollowed() {
    if (FollowedClubs.findOne({ clubid: this.props.club._id })) {
      return true;
    }
    return false;
  }

  follow() {
    const clubName = this.props.club.ClubName;
    const type = this.props.club.Type;
    const contactName = this.props.club.ContactName;
    const email = this.props.club.Email;
    const website = this.props.club.Website;
    const description = this.props.club.Description;
    const rioemail = this.props.club.RIOEmail;
    const clubid = this.props.club._id;
    const owner = Meteor.user().username;
    FollowedClubs.insert({ clubName, type, contactName, email, description, website, rioemail, clubid, owner, },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Now following ' + clubName + '!', 'success');
            this.forceUpdate();
          }
        });
  }

  unfollow() {
    const clubName = this.props.club.ClubName;
    swal({
      text: 'You will no longer be following ' + clubName + '.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            FollowedClubs.remove(FollowedClubs.findOne({ clubid: this.props.club._id })._id);
            this.forceUpdate();
            swal('You are no longer following ' + clubName + '.', {
              icon: 'success',
            });
          } else {
            swal('You are still following ' + clubName + '.');
          }
        });
  }

  render() {
    const padding = { paddingBottom: '10px', paddingLeft: '10px' };
    return (
        <Card>
          <Card.Description textAlign={'right'}>
            {Roles.userIsInRole(Meteor.userId(), 'superAdmin') ? (
                <Button
                    icon='delete'
                    floated='right'
                    onClick={() => this.removeClub(this.props.club._id)}
                />
            ) : ''}
          </Card.Description>
          <Card.Description centered>
            <Image
                size='medium'
                src={this.props.club.Image}
            />
          </Card.Description>
          <Card.Content>
            <Card.Header>{this.props.club.ClubName}</Card.Header>
          </Card.Content>
          <Card.Description style={padding}>
            {this.props.club.Type.includes('Academic') ? (
                <Label color='red'>Academic</Label>
            ) : ''}
            {this.props.club.Type.includes('Professional') ? (
                <Label color='orange'>Professional</Label>
            ) : ''}
            {this.props.club.Type.includes('Athletic') ? (
                <Label color='yellow'>Athletic</Label>
            ) : ''}
            {this.props.club.Type.includes('Religious') ? (
                <Label color='olive'>Religious</Label>
            ) : ''}
            {this.props.club.Type.includes('Spiritual') ? (
                <Label color='green'>Spiritual</Label>
            ) : ''}
            {this.props.club.Type.includes('Political') ? (
                <Label color='teal'>Political</Label>
            ) : ''}
            {this.props.club.Type.includes('Sports') ? (
                <Label color='blue'>Sports</Label>
            ) : ''}
            {this.props.club.Type.includes('Leisure') ? (
                <Label color='violet'>Leisure</Label>
            ) : ''}
            {this.props.club.Type.includes('Service') ? (
                <Label color='purple'>Service</Label>
            ) : ''}
            {this.props.club.Type.includes('Fraternity') ? (
                <Label color='pink'>Fraternity</Label>
            ) : ''}
            {this.props.club.Type.includes('Sorority') ? (
                <Label color='brown'>Sorority</Label>
            ) : ''}
            {this.props.club.Type.includes('Recreational') ? (
                <Label color='grey'>Recreational</Label>
            ) : ''}
            {this.props.club.Type.includes('Student Affairs') ? (
                <Label color='black'>Student Affairs</Label>
            ) : ''}
            {this.props.club.Type.includes('Ethnic') ? (
                <Label color='violet'>Ethnic</Label>
            ) : ''}
            {this.props.club.Type.includes('Cultural') ? (
                <Label color='purple'>Cultural</Label>
            ) : ''}
            {this.props.club.Type.includes('Honorary Society') ? (
                <Label color='red'>Honorary Society</Label>
            ) : ''}
          </Card.Description>
          <Card.Description style={padding}><strong>Club President: </strong>{this.props.club.ContactName}</Card.Description>
          <Card.Description style={padding}><strong>Email: </strong>{this.props.club.Email}</Card.Description>
          <Card.Description style={padding}><strong>Website: </strong>{this.props.club.Website}</Card.Description>
          <Card.Description style={padding}><strong>Description:</strong><br/>{this.props.club.Description}</Card.Description>
          <Card.Description>
            {Roles.userIsInRole(Meteor.userId(), 'superAdmin') ? (
                <Link floated='right' exact to={`/editcard/${this.props.club._id}`}>
                  Edit
                </Link>
            ) : ''}
            {(Meteor.user().username === this.props.club.email) ? (
                <Link floated='right' exact to={`/editcard/${this.props.club._id}`}>
                  Edit
                </Link>
            ) : ''}
          </Card.Description>
          {Meteor.user() && !this.isFollowed() ? (
              <Button color='green' icon onClick={() => this.follow()}>
                Follow
              </Button>
          ) : ''}
          {Meteor.user() && this.isFollowed() ? (
              <Button color='red' icon onClick={() => this.unfollow()}>
                Unfollow
              </Button>
          ) : ''}
        </Card>
    );
  }
}

ClubCard.propTypes = {
  club: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  followedclub: PropTypes.object,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('FollowedClubs');
  return {
    followedclubs: FollowedClubs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ClubCard);
