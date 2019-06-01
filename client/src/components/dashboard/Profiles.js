import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteAddress } from "../../actions/profileActions";

class Profile extends Component {
  onDeleteClick(id) {
    this.props.deleteAddress(id);
  }

  render() {
    const profile = this.props.profile.profile.map(pro => (
      <tr key={pro.id}>
        <td>{pro.id}</td>
        <td>{pro.firstName}</td>
        <td>{pro.lastName}</td>
        <td>{pro.email}</td>
        <td>{pro.phone}</td>
        <td>{pro.address}</td>

        <td>
          {" "}
          <Link to={`/edit-profile/${pro.id}`} className="btn btn-success">
            <i className="fas fa-user-circle text-info mr-1" /> Edit 
          </Link>
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, pro.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="container">
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>id</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>phone</th>
              <th>address</th>
              <th>edit</th>
              <th>delete</th>

              <th />
            </tr>
            {profile}
          </thead>
        </table>
      </div>
    );
  }
}

Profile.propTypes = {
  // getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAddress: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteAddress }
)(Profile);
