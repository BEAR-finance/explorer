import React from 'react'
import { Container } from './Container'
import { Reddit } from './Icon.tsx/Reddit'
import { Github } from './Icon.tsx/Github'
import { Twitter } from './Icon.tsx/Twitter'
import { Discord } from './Icon.tsx/Discord'

import './BigFooter.css'

const year = Math.max(new Date().getFullYear(), 2020)

export const BigFooter = () => (
  <footer className="big-footer">
    <Container>
      <div>
        <div>
          <h4>NEED SUPPORT?</h4>
        </div>
        <div>
<<<<<<< HEAD
          <a
            className="big-footer-button"
            href="https://t.me/bearstalk"
            target="about:blank"
          >
            <Discord /> Join our Telegram
=======
          <a className="big-footer-button" href="https://discord.gg/k5ydeZp" target="about:blank">
            <Discord /> Join our Discord
>>>>>>> 7f19988295bc26bb94346a9a4f9c5a27e5ee74a4
          </a>
        </div>
      </div>
      <div>
        <div>
          <h4>FOLLOW US</h4>
        </div>
        <div>
<<<<<<< HEAD
          <a
            className="big-footer-icon"
            href="https://bearsfinance.medium.com/"
            target="about:blank"
          >
            <Reddit />
          </a>
          <a
            className="big-footer-icon"
            href="http://github.com/bear-finance"
            target="about:blank"
          >
            <Github />
          </a>
          <a
            className="big-footer-icon"
            href="https://twitter.com/bears_finance"
            target="about:blank"
          >
=======
          <a className="big-footer-icon" href="https://www.reddit.com/r/decentraland/" target="about:blank">
            <Reddit />
          </a>
          <a className="big-footer-icon" href="http://github.com/decentraland" target="about:blank">
            <Github />
          </a>
          <a className="big-footer-icon" href="https://twitter.com/decentraland" target="about:blank">
>>>>>>> 7f19988295bc26bb94346a9a4f9c5a27e5ee74a4
            <Twitter />
          </a>
        </div>
      </div>
    </Container>
    <Container>
      <p className="copyright">© {year} Bearland</p>
    </Container>
  </footer>
)
