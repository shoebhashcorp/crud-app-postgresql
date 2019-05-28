import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { getCurrentProfile } from "../../actions/profileActions";
// import { deleteExperience } from "../../actions/profileActions";
import { getProfileById } from "../../actions/profileActions";

class Profile extends Component {
 

  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
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
          <button
            onClick={this.onDeleteClick.bind(this, pro._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div class="container">
        <h4 className="mb-4">Education Credentials</h4>
        <table class="table table-dark">
          <thead>
            <tr>
              <th>id</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>phone</th>
              <th>address</th>
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
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
