import React, { Component } from "react";

class AboutUs extends Component {
  render() {
    return (
      <React.Fragment>
        <div classname = "container-about"> 
          <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
            <h1>About Us</h1>
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '5vh'}}> 
            <p>
              At BS Marketplace we believe in the power of community. We strive to be a platform that encourage the safe exchange of goods and services among 
              individuals with various interests.
            </p>
          </div>

          <div className="row g-3">
            <div className="col-sm-4">
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '28vh'}}>
                <img src="../../images/aboutus/SecondHand.png" 
                     width = "150"/>
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>    
                <h5>A second hand market for goods</h5>
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
                <p>
                  One man's trash is another man's treasure. The availability of a 2nd Hand market for goods ensures the reduction of
                  waste materials being disposed, thereby alleviating land pollution as a result of waste disposal.
                </p>
              </div>
            </div>

            <div className="col-sm-4">
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '28vh'}}>
                <img src="../../images/aboutus/ServiceExchange.png" 
                     width = "150"/>
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
                <h5>Services and knowledge exchange</h5>
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
                <p>
                  Besides goods being sold and exchanged, services can also be provided by our users to each other.
                  With no added starting cost to the sellers, our platform serves as an easy way to get your business rolling!
                </p>
              </div>
            </div>

            <div className="col-sm-4">
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '28vh'}}>
                <img src="../../images/aboutus/Secure.png" 
                     width = "150"/>
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
                <h5>Safe and available platform</h5>
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
                <p>
                  Our team consistently provided 24/7 support to users 365 days a year to ensure you get the best service.
                  Your private information is kept secured by us, so you can rest easy.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div classname = "container-team">
          <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
            <h1>Our Team</h1>
          </div>
          <div className="row g-3">
            <div className="col-sm-4">

            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default AboutUs;