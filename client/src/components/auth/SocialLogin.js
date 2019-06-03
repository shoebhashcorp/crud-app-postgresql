import React from "react";
import OAuth from "./OAuth";
const providers = ["google", "github"];

const SocialLogin = props => {
  return (
    <ul className="Easily-Using">
      {providers.map(provider => (
        <OAuth provider={provider} key={provider} />
      ))}
    </ul>
  );
};

export default SocialLogin;
