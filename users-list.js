import React from 'react';

const segregateUsers = all => {
  const users = [];
  const admins = [];

  if (!all) {
    return {
      admins,
      users
    };
  }

  for (let user in all) {
    if (all[user] && all[user].admin) {
      admins.push(user);
    } else {
      users.push(user);
    }
  }

  return {
    admins,
    users
  };
}

export class UsersList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      adminUsername: '',
      username: '',
    };
  }

  addAdmin (e) {
    e && e.preventDefault();

    if (this.state.adminUsername) {
      this.add(this.state.adminUsername, {
        admin: true
      });
    }

    this.setState({
      adminUsername: ''
    });
  }

  addUser (e) {
    e && e.preventDefault();

    if (this.state.username) {
      this.add(this.state.username);
    }

    this.setState({
      username: ''
    });
  }

  add (username, value = null) {
    const users = this.props.value || {};

    users[username] = value;

    this.props.onChange(users);
  }

  render () {
    debugger;
    const {
      admins,
      users
    } = segregateUsers(this.props.value.toJSON());

    return (
      <React.Fragment>
        <h3>Users ({users.length})</h3>
          <ul>
            {users.map((user, index) => <li key={`user_${index}_${user}`}>{user}</li>)}
          </ul>
          <form onSubmit={this.addUser.bind(this)}>
            <input
              type="text"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value.trim() })}
            />
            <button>Add</button>
          </form>
        <hr />
        <h3>Admins ({admins.length})</h3>
        <ul>
          {admins.map((user, index) => <li key={`admin_${index}_${user}`}>{user}</li>)}
        </ul>
        <form onSubmit={this.addAdmin.bind(this)}>
          <input
            type="text"
            value={this.state.adminUsername}
            onChange={e => this.setState({ adminUsername: e.target.value.trim() })}
          />
          <button>Add</button>
        </form>
      </React.Fragment>
    );
  }
}
