import React from "react";
import { Link } from "react-router-dom";

export type AboutProps = {

};

class About extends React.Component<AboutProps> {
  //     constructor(props: any){
  //     super(props)

  // }

  render(): React.ReactNode {
    return (
      <>
          <div className="productMain">
            <Link to="/">
              <div className="homeLogo"></div>
              <div className="homeLogo2"></div>
            </Link>
            <div className="aboutBox">
              <div className='aboutMain'>
              <h1 className="aboutTitle">A little about Graffi</h1>
              <p className='aboutDescription'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, itaque iusto aut corrupti dolores repellat atque veritatis ipsa quidem harum quibusdam ducimus molestiae ipsum est commodi modi temporibus mollitia voluptates nisi repellendus omnis dignissimos deleniti doloremque quo! Debitis voluptatibus necessitatibus sit laborum sed ipsam accusamus, labore fuga tempore molestias quis. Vitae, incidunt dolor! Et voluptas expedita fugit minima ex dignissimos soluta consectetur voluptatem, facilis doloremque maxime nesciunt eos, omnis sit deserunt optio nobis, beatae voluptatum. Mollitia, delectus molestias maiores natus voluptates odit unde eaque doloremque, inventore provident nam recusandae saepe explicabo laudantium in. Ea obcaecati, eum et nulla ipsum, fugit, sunt doloribus perferendis veritatis voluptates unde illum nihil natus. Illum, laudantium nulla, sint ut sapiente blanditiis neque enim aut a esse quos assumenda qui ab, maxime rerum asperiores officiis? Impedit dicta illum eos in culpa neque saepe, consequatur eum autem tempore fuga nulla veniam vero! Libero molestiae quis exercitationem doloribus?</p>
              </div>
            </div>
          </div>
      </>
    );
  }
}

export default About;
