import React from "react";
import "./TermCheckbox.css";

export interface TermCheckboxProps {
  checked: boolean;
  onChange: any;
}

export const TermCheckbox: React.FC<TermCheckboxProps> = (props) => (
  <div className="eth-login-tos">
    <input
      type="checkbox"
      id="agree-check"
      className="eth-login-tos-agree"
      checked={props.checked}
      onChange={props.onChange}
    />
    <label htmlFor="agree-check" className="eth-login-tos-label">
      I am of legal age and I have read and agree to the{" "}
      <a
        href="https://bears.finance/terms"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </a>{" "}
      and{" "}
      <a
        href="https://bears.finance/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
    </label>
  </div>
);
