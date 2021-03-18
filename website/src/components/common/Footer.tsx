import React from "react";
import "./Footer.css";
import discord from "../../images/footer/Discord.png";
import reddit from "../../images/footer/Reddit.png";
import github from "../../images/footer/Git.png";
import twitter from "../../images/footer/Twitter.png";

export const Footer: React.FC = () => (
  <footer className="footer-bar">
    <div className="footer-bar-content">
      <a href="https://t.me/bearstalk" target="about:blank">
        <img alt="" src={discord} />
      </a>
      <a href="https://bearsfinance.medium.com/" target="about:blank">
        <img alt="" src={reddit} />
      </a>
      <a href="http://github.com/bear-finance" target="about:blank">
        <img alt="" src={github} />
      </a>
      <a href="https://twitter.com/bears_finance" target="about:blank">
        <img alt="" src={twitter} />
      </a>
      <span className="footer-text">© 2021 Bearland</span>
    </div>
  </footer>
);
