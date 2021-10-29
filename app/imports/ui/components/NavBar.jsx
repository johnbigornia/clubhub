import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
/** (Universal) Clubs tab needs to be routed */

/** (User) Interests tab needs to be routed */
/** (Admin) Admin page needs to be routed */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '0px' };
    return (
        <Menu style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header as='h2' inverted>
              <div className={'tomorrow-font'}>Clubs Of Manoa</div>
            </Header>
          </Menu.Item>
          <Menu.Item position="right" as={NavLink} activeClassName="" exact to="/searchpage">
            <Icon size={'small'} className={'users'}/>
            <div className={'tomorrow-font'}>Clubs</div>
          </Menu.Item>

          {this.props.currentUser ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/profile" key='profile'>
                <Icon size={'small'} className={'list'}/>
                <div className={'tomorrow-font'}>Profile</div>
              </Menu.Item>
          ) : ''}

          {Roles.userIsInRole(Meteor.userId(), 'clubAdmin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/request" key='clubAdmin'>
                <Icon className={'file'}/> Request Club
              </Menu.Item>
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'clubAdmin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/manageClubAdmin" key='clubAdmin'>
                <Icon className={'archive'}/> Manage Clubs
              </Menu.Item>
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'superAdmin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/manageSuperAdmin" key='superAdmin'>
                <Icon className={'archive'}/> Manage Clubs
              </Menu.Item>
          ) : ''}

          <Menu.Item>
            {this.props.currentUser === '' ? (
                <Dropdown text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item text={`Hello ${this.props.currentUser}`}/>
                    <br/>
                    {Roles.userIsInRole(Meteor.userId(), 'superAdmin') ? (
                        <Dropdown.Item as={NavLink} activeClassName="active" exact to="/addclub" key='superAdmin'>
                          Add Club
                        </Dropdown.Item>
                    ) : ''}
                    {this.props.currentUser === '' ? (
                        <Dropdown.Menu>
                          <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                        </Dropdown.Menu>
                    ) : ''}
                    <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
          <Menu.Item>
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
