import React, { Component } from 'react';

import Rellax from 'react-rellax';

import Header from './components/header';
import Footer from './components/footer';
import Checkout from './components/checkout.js';

import './assets/sass/style.css';

import blueprint from './assets/img/SVG/blueprint.svg';
import blueprintMobile from './assets/img/SVG/mobile-blueprint.svg';
import render from './assets/img/SVG/render.svg';
import tools from './assets/img/SVG/tools.svg';
import toolsMobile from './assets/img/SVG/mobile-tools.svg';
import product from './assets/img/package.png';
import raccoon from './assets/img/raccoon-cta.png';
import installVideo from './assets/video/coonguard_install.mp4';
import poster from './assets/video/poster.jpg';

class Homepage extends Component{
  render(){
    return (
      <div id="splash">
        <Header />
          <section id="corn">
            <Rellax as="article" className="front rellax" data-rellax-speed="-6"></Rellax>
            <Rellax as="article" className="mid rellax" data-rellax-speed="-3"></Rellax>
            <Rellax as="article" className="back rellax" data-rellax-speed="-1"></Rellax>
          </section>
          <section id="blueprint">
            <div className="wrap">
              <h1>The most universal, easy to install, raccoon guard for any pre-existing 55 gallon drum 12 or 6 volt box deer feeder.</h1>
              <video controls poster={poster}>
                <source src={installVideo} type="video/mp4" />
              </video>
              <h2>What is included?</h2>
              <img src={blueprint} alt="Design Blueprint" className="noMobile" />
              <img src={blueprintMobile} alt="Design Blueprint" className="mobile" />
              <article id="tools">
                <h2>What is Required?</h2>
                <img src={tools} alt="Required Tools" className="noMobile"/>
                <img src={toolsMobile} alt="Required Tools" className="mobile" />
              </article>
            </div>
          </section>
          <section id="instructions">
            <img className="render" src={render} alt="Design Render" />
            <article>
              <h2>Installation</h2>
              <ol>
                <li>
                  Replace existing funnel with supplied funnel to achieve the tightest gap between the Guard plate and barrel. Recommended, but not required.
                </li>
                <li>
                  Place the (2) guard plate halves on a flat surface forming a Full Circle.
                </li>
                <li>
                  Place one Duel screw Cuff, on top of the aligned plates, on the (2) predrilled holes, located on the outer edge of the plates. Fasten the cuff down with (2) short self-tapping screws. (this will allow the plates to swivel open and closed.)
                </li>
                <li>
                  Now, with the guard in the open position, place the guard around existing feeder mounting arms and close the guard. (Make sure the feeder arms are inside the guard slots.)
                </li>
                <li>
                  Attach the 6 remaining small self-tapping screws with duel screw cuffs into the pre-drilled holes making the 2 metal sheets one piece.
                </li>
                <li>
                  Use cressent wrench to bend slotted arms 90deg up toward the 55 gallon barrel.
                </li>
                <li>
                  Secure Guard arms to barrel, using the Long self-tapping screws. Do not tighten screws to allow movement up and down for final setting.
                </li>
                <li>
                  Adjust the guard to achieve a minimum 3/8 inch gap from the top of the guard to the bottom of the spinner plate.
                </li>
                <li>
                  Tighten the Guard Arms to the barrel using proper torque & say goodbye to your little friends.
                </li>
              </ol>
            </article>
          </section>
          <section id="CTA">
            <img className="package" src={product} alt="Coon Guard Package" />
            <img id="raccoon" src={raccoon} alt="" />
            <Checkout />
          </section>
        <Footer />
      </div>
    );
  }
}

export default Homepage;