import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Message, Checkbox } from "semantic-ui-react";
import { validateEmail } from "./helpers";
import { userAuth } from "./helpers/auth";
import AuthMessage from "./AuthMessage";

const initialState = {
  email: "",
  fullName: "",
  password: "",
  confirmPassword: "",
  isAgreed: false,
  passwordsMatch: null,
  isRealEmail: null,
  isProcessing: false,
  successStatus: null,
  errorStatus: null,
  activeUser: null,
  errorMsg: null,
};

class SignUpForm extends Component {
  state = initialState;

  comparePasswords = () => {
    const { password, confirmPassword, passwordsMatch } = this.state;
    const isOneEmpty = !password || !confirmPassword;
    if (isOneEmpty && passwordsMatch === null) return;
    isOneEmpty || password.length !== confirmPassword.length
      ? this.setState({ passwordsMatch: null })
      : this.setState({ passwordsMatch: password === confirmPassword });
  };

  handleChange = (e, { name, checked, value }) => {
    const newVal = name === "isAgreed" ? checked : value;
    const isRealEmail = name === "email" ? validateEmail(value) : this.state.isRealEmail;
    this.setState({ [name]: newVal, isRealEmail }, this.comparePasswords);
  };

  handleSignUp = async () => {
    try {
      const { fullName, password, email } = this.state;
      const resp = await userAuth("signup", {
        method: "post",
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });
      const user = await resp.json();
      if (!resp.ok) {
        throw user.errors[Object.keys(user.errors)[0]].message;
      }
      localStorage.setItem("user", JSON.stringify(user));
      this.setState(
        {
          ...initialState,
          successStatus: true,
          activeUser: user.fullName,
        },
        () => this.props.handleUser(user)
      );
    } catch (err) {
      this.setState({
        ...initialState,
        errorStatus: true,
        errorMsg: err,
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isProcessing: true }, this.handleSignUp);
  };

  render() {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      passwordsMatch,
      isAgreed,
      successStatus,
      errorStatus,
      isProcessing,
      activeUser,
      errorMsg,
      isRealEmail,
    } = this.state;
    // input label values
    const [pwIcon, pwColor] =
      passwordsMatch && password.length > 7 ? ["lock", "green"] : ["lock open", "red"];
    const [fnIcon, fnColor] = fullName ? ["check", "green"] : ["asterisk", "red"];
    const [emIcon, emColor] = isRealEmail ? ["check", "green"] : ["asterisk", "red"];
    return (
      <Form
        loading={isProcessing}
        className="auth-form"
        success={successStatus}
        error={errorStatus}
        warning={passwordsMatch !== null && !passwordsMatch}
        onSubmit={this.handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              label={{ icon: fnIcon, color: fnColor }}
              labelPosition="right corner"
              placeholder="Full Name"
              name="fullName"
              value={fullName}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              label={{ icon: emIcon, color: emColor }}
              labelPosition="right corner"
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              label={{ icon: pwIcon, color: pwColor }}
              labelPosition="right corner"
              type="password"
              placeholder="Password (min. 8 characters)"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              label={{ icon: pwIcon, color: pwColor }}
              labelPosition="right corner"
              type="password"
              placeholder="Confirm Password (min. 8 characters)"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Message
          warning
          hidden={passwordsMatch || passwordsMatch === null}
          header="Passwords do not match"
        />
        <Form.Field inline required>
          <Checkbox
            name="isAgreed"
            checked={isAgreed}
            onClick={this.handleChange}
            label={
              <label>
                I Agree to the <Link to="/listingpolicy">Listing Policies</Link>
              </label>
            }
          />
        </Form.Field>
        <Form.Button
          color="purple"
          size="big"
          type="submit"
          content={isProcessing ? "Processing" : "Submit"}
          disabled={
            !isRealEmail ||
            !fullName ||
            !passwordsMatch ||
            password.length < 8 ||
            !isAgreed
          }
        />
        <AuthMessage
          successStatus={successStatus}
          successMsg={`Thanks for joining, ${activeUser}!`}
          errorStatus={errorStatus}
          errorMsg={errorMsg}
        />
      </Form>
    );
  }
}

export default SignUpForm;