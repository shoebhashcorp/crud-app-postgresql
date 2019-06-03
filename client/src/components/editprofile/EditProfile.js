import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

import { updateProfile, getProfileById } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //let editdata;
    if (this.props.match.params.id) {
      console.log("dataid", this.props.match.params.id);
      this.props.getProfileById(this.props.match.params.id);
    }
    //console.log("data", this.props.getProfileById(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.firstName = !isEmpty(profile.firstName) ? profile.firstName : "";
      profile.lastName = !isEmpty(profile.lastName) ? profile.lastName : "";
      profile.email = !isEmpty(profile.email) ? profile.email : "";
      profile.phone = !isEmpty(profile.phone) ? profile.phone : "";
      profile.address = !isEmpty(profile.address) ? profile.address : "";
      let editdata = profile[0];
      //console.log("string11", editdata);
      // Set component fields state
      this.setState({
        firstName: editdata.firstName,
        lastName: editdata.lastName,
        email: editdata.email,
        phone: editdata.phone,
        address: editdata.address
      });
      //console.log("ddd", this.state.firstName);
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      id: this.props.match.params.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      status: this.state.status,
      address: this.state.address
    };

    this.props.updateProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    // const profile = this.props.profile;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="firstName"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  error={errors.firstName}
                  info="what is your firstName"
                />
                <TextFieldGroup
                  placeholder="lastName"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  error={errors.lastName}
                  info="what is your lastName"
                />
                <TextFieldGroup
                  placeholder="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="what is your email"
                />
                <TextFieldGroup
                  placeholder="phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                  info="what is your mobile number"
                />
                <TextFieldGroup
                  placeholder="address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                  info="please provide address"
                />
                userid
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateProfile, getProfileById }
)(withRouter(EditProfile));
