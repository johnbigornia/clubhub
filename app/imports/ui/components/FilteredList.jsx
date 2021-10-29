import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import ClubCard from './ClubCard';
import { Clubs } from '../../api/club/Clubs';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FilteredList extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const padding = { paddingTop: '20px', paddingBottom: '3020px' };
    return (
        <Container style={padding}>
          <Card.Group itemsPerRow={4}>
            {this.props.clubListResult.map((club, index) => <ClubCard key={index} club={club}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
FilteredList.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  clubListResult: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Clubs');
  return {
    clubs: Clubs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(FilteredList);
