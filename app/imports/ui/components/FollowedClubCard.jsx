import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image, Label } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { FollowedClubs } from '../../api/followedclub/FollowedClubs';

class FollowedClubCard extends React.Component {
  removeClub(docID) {
    swal({
      title: 'Are you sure?',
      text: 'Once unfollowed, you can always follow again.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            FollowedClubs.remove(docID);
            swal('Club Unfollowed!', {
              icon: 'success',
            });
          } else {
            swal('Canceled');
          }
        });
  }

  render() {
    const padding = { paddingBottom: '10px', paddingLeft: '10px' };
    return (
        <Card>
          <Card.Description centered>
            <Image
                size='medium'
                src={this.props.club.image}
            />
          </Card.Description>
          <Card.Content>
            <Card.Header>{this.props.club.clubName}</Card.Header>
          </Card.Content>
          <Card.Description style={padding}>
            {this.props.club.type.includes('Academic') ? (
                <Label color='red'>Academic</Label>
            ) : ''}
            {this.props.club.type.includes('Professional') ? (
                <Label color='orange'>Professional</Label>
            ) : ''}
            {this.props.club.type.includes('Athletic') ? (
                <Label color='yellow'>Athletic</Label>
            ) : ''}
            {this.props.club.type.includes('Religious') ? (
                <Label color='olive'>Religious</Label>
            ) : ''}
            {this.props.club.type.includes('Spiritual') ? (
                <Label color='green'>Spiritual</Label>
            ) : ''}
            {this.props.club.type.includes('Political') ? (
                <Label color='teal'>Political</Label>
            ) : ''}
            {this.props.club.type.includes('Sports') ? (
                <Label color='blue'>Sports</Label>
            ) : ''}
            {this.props.club.type.includes('Leisure') ? (
                <Label color='violet'>Leisure</Label>
            ) : ''}
            {this.props.club.type.includes('Service') ? (
                <Label color='purple'>Service</Label>
            ) : ''}
            {this.props.club.type.includes('Fraternity') ? (
                <Label color='pink'>Fraternity</Label>
            ) : ''}
            {this.props.club.type.includes('Sorority') ? (
                <Label color='brown'>Sorority</Label>
            ) : ''}
            {this.props.club.type.includes('Recreational') ? (
                <Label color='grey'>Recreational</Label>
            ) : ''}
            {this.props.club.type.includes('Student Affairs') ? (
                <Label color='black'>Student Affairs</Label>
            ) : ''}
            {this.props.club.type.includes('Ethnic') ? (
                <Label color='violet'>Ethnic</Label>
            ) : ''}
            {this.props.club.type.includes('Cultural') ? (
                <Label color='purple'>Cultural</Label>
            ) : ''}
            {this.props.club.type.includes('Honorary Society') ? (
                <Label color='red'>Honorary Society</Label>
            ) : ''}
          </Card.Description>
          <Card.Description style={padding}><strong>Club President: </strong>{this.props.club.contactName}
          </Card.Description>
          <Card.Description style={padding}><strong>Email: </strong>{this.props.club.Email}</Card.Description>
          <Card.Description style={padding}><strong>Website: </strong>{this.props.club.website}</Card.Description>
          <Card.Description style={padding}><strong>Description:</strong><br/>{this.props.club.description
          }</Card.Description>
          <Button color={'red'} icon onClick={() => this.removeClub(this.props.club._id)}>
            Unfollow
          </Button>
        </Card>
    );
  }
}

FollowedClubCard.propTypes = {
  club: PropTypes.object.isRequired,
};

export default withRouter(FollowedClubCard);
