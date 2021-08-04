import React from 'react'

import './errors.css'
import errorImage from '../../images/errors/error-robotdown.png'

export const ErrorFatal: React.FC = () => (
  <div id="error-fatal" className="error-container">
    <div className="error-background" />
    <div className="errormessage">
      <div className="errortext col">
        <div className="error">Oops!</div>
        <div className="communicationslink">Something went wrong</div>
        <div className="givesomedetailof">
          If you have any ad blocking extensions,
          <br />
          try turning them off for this site.
          <br />
          <br />
          Loading should not take any longer than 2-3 minutes.
          <br />
          If you seem to be stuck, make sure hardware acceleration is on.
          <br />
<<<<<<< HEAD
          Loading should not take any longer than 2-3 minutes.<br />
          If you seem to be stuck, make sure hardware acceleration is on.<br />
          <a href="https://docs.bears.finance/decentraland/hardware-acceleration/">LEARN MORE</a>
=======
          <a href="https://docs.decentraland.org/decentraland/hardware-acceleration/">LEARN MORE</a>
>>>>>>> 7f19988295bc26bb94346a9a4f9c5a27e5ee74a4
        </div>
        <div className="cta">
          <button
            className="retry"
            onClick={() => {
              window.location.reload()
            }}
          >
            Reload
          </button>
        </div>
      </div>
      <div className="errorimage col">
        <div className="imagewrapper">
          <img alt="" className="error-image" src={errorImage} />
        </div>
      </div>
    </div>
  </div>
)
