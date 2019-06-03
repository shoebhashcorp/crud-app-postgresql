import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status

    return (
      <div className="create-profile">
        <div className="containerc">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
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

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
