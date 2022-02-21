import React from "react";
import { Link } from "react-router-dom";

export type ContactProps = {

};

class Contact extends React.Component<ContactProps> {
  //     constructor(props: any){
  //     super(props)

  // }

  render(): React.ReactNode {
    return (
      
          <div className="productMain">
            <Link to="/">
              <div className="homeLogo"></div>
              <div className="homeLogo2"></div>
            </Link>
            <div className="contactFormMain">
              
            <form className='contactFormBox' id="fs-frm" name="simple-contact-form" accept-charset="utf-8" action="https://formspree.io/f/mqkwjwja" method="post">
            <h1 className="aboutTitle">We would love to hear from you!</h1>
          <fieldset className='contactFormFields' id="fs-frm-inputs">
            <h3 className='contactTitles' >Full Name</h3>
            <input className='inputBox' type="text" name="name" id="full-name" placeholder="First and Last name" required />
            <h3 className='contactTitles'>Email Address</h3>
            <input className='inputBox' type="email" name="_replyto" id="email-address" placeholder="Your Email" required />
            <h3 className='contactTitles'>Message</h3>
            <input  className='inputBox2'  name="message" id="message" placeholder="Talk to me!" required></input>
            <input className='inputBox' type="hidden" name="_subject" id="email-subject" value="Contact Form Submission" />
          </fieldset>
          <input className="adminPageBtn" type="submit" value="Submit" />
        </form>
          </div>     
          </div>
    );
  }
}

export default Contact;
