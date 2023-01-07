import React, { Component } from 'react';

import init from '../assets/img/SVG/init.svg';

class Footer extends Component{
    render(){
       return (
          <footer>
            <p>
            	The Coon Guard is a product of PGM Outfitters.<br />
            	© 2018 PGM Outfitters. All Rights Reserved.
            </p>
            <p>Built for you by <a href="https://theinitgroup.com" target="_BLANK" rel="noopener noreferrer"> <img src={init} alt="The INiT Group" /></a></p>
          </footer>
       );
    }
}

export default Footer;
