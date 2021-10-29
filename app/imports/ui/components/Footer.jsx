import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            {this.props.currentUser ? (
                <Header className={'tomorrow-font'} as={NavLink} activeClassName="" exact to="/">
                  Feedback Forums
                </Header>
            ) : ''}
            <hr/>
            Clubs of Manoa Project <br/>
            ICS314Bois <br/>
            University of Hawaii<br/>
            Honolulu, HI 96822 <br/>
            <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
          </div>
        </footer>
    );
  }
}

Footer.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const FooterContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Footer);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(FooterContainer);
