import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Product from './Product.jsx';

const Lead = styled.div`
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  margin: 0;
  align-items: center;
  justify-content: center;
`;

const Banner = styled.div`
  position: relative;
  margin: -10px auto 0 auto;
  width: 75vw;
  height: 9vh;
  max-height: 9vh;
  background: #6d6d6d;
`;

const Logo = styled.div`
  position: absolute;
  bottom: 1vh;
  left: 1vw;
  font-family: 'Lato', sans-serif;
  color: #fff;
  font-weight: 700;
  font-size: 2rem;
  text-shadow: 1px 1px 2px #80ccc4;
`;

const Announcement = styled.div`
  display: flex;
  flex-direction: row;
  width: 50vw;
  align-items: center;
  justify-content: center;
  padding: .75vh 0;
`;

const Message = styled.div`
  font-size: .9rem;
  font-weight: 300;
  color: #424242;
  font-style: italic;
`;

const Footer = styled.div`
  font-family: 'Lato', sans-serif;
  margin: 0 0 -10px -8px;
  width: 100vw;
  height: 2vh;
  max-height: 2vh;
  background: #6d6d6d;
  display: flex;
  flex-direction: row;
  padding: .75vh;
`;

const FooterMessage = styled.div`
  font-size: .9rem;
  color: #fff;
  font-weight: 700;
  margin: 0 .5vw 0 1vw;
`;

const Creator = styled.a`
  font-size: .9rem;
  font-weight: 400;
  color: #fff;;
`;

const Link = styled.a`
  margin-left: .5vw;
  font-size: .9rem;
  font-weight: 300;
  text-decoration: underline;
  color: #424242;
`;

const App = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [productStyles, setProductStyles] = useState(null);
  const [reviewsMeta, setReviewsMeta] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    axios.get(path.slice(-6))
      .then((res) => {
        setProductDetails(res.data[0]);
        setProductStyles(res.data[1]);
        setReviewsMeta(res.data[2]);
      })
      .catch((err) => { throw err; });
  });

  return (
    <div>
      <Lead>
        <Banner>
          <Logo>Company Logo</Logo>
        </Banner>
        <Announcement>
          <Message>SAFE IN-STORE SHOPPING:</Message>
          <Link href="https://www.cdc.gov/coronavirus/2019-ncov/communication/guidance.html" target="blank">Our safety practices to help keep you healthy</Link>
        </Announcement>
      </Lead>
      {reviewsMeta
      && (
      <Product
        productDetails={productDetails}
        productStyles={productStyles}
        reviewsMeta={reviewsMeta}
      />
      )}
      <Footer>
        <FooterMessage>Created by:</FooterMessage>
        <Creator href="https://github.com/JacobWPeterson" target="blank">Jacob Peterson</Creator>
      </Footer>
    </div>
  );
};

export default App;
