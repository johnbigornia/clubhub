import React from 'react';
import { Card, Header, Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ApprovalClubCard from '../components/ApprovalClubCard';
import { Clubs } from '../../api/club/Clubs';
import { Requests } from '../../api/request/Requests';

class ManageClubAdmin extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Loading</Loader>;
  }

  renderPage() {
    const padding = { paddingTop: '10px' };
    return (
        <div className={'general-background'}>
          <Container style={padding}>
            <Header as='h1' inverted>Requests</Header>
            <hr/>
            <Card.Group>
              {this.props.requests.map((request, index) => <ApprovalClubCard key={index} request={request}/>)}
            </Card.Group>
            <Header inverted>Approved Clubs</Header>
            <Card.Group>
              {/**{this.props.clubs.map((club, index) => <ApprovalClubCard key={index} request={club}/>)}**/}
            </Card.Group>
          </Container>
        </div>
    );
  }
}
/** Require an array of Stuff documents in the props. */
ManageClubAdmin.propTypes = {
  clubs: PropTypes.array.isRequired,
  requests : PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Clubs');
  const subscription2 = Meteor.subscribe('RequestsSuperAdmin');
  return {
    clubs: Clubs.find({}).fetch(),
    requests: Requests.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ManageClubAdmin);