import React, { useState } from 'react';
import styled from 'styled-components';

import ProductImages from './ProductSubs/ProductImages.jsx';
import ProductOverview from './ProductSubs/ProductOverview.jsx';
import Description from './ProductSubs/Description.jsx';
import FeaturesList from './ProductSubs/FeaturesList.jsx';

const Wrapper = styled.div`
  width: 75vw;
  font-family: 'Lato', sans-serif;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const TopWrapper = styled.div`
  width: 75vw;
  height: auto;
  min-height: 70vh;
  max-height: 74vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 5px;
  margin-bottom: 4vh;
`;

const BottomWrapper = styled.div`
  margin: auto;
  width: 65vw;
  display: flex;
  flex-direction: row;
  padding-top: 5px;
  margin-bottom: 5vh;
`;

const Product = (props) => {
  const { productDetails, productStyles, reviewsMeta } = props;

  const [currentStyle, setCurrentStyle] = useState(productStyles.results[0].style_id);
  const [item, setItem] = useState({
    stylePhotos: productStyles.results[0].photos,
    skus: productStyles.results[0].skus,
    price: productStyles.results[0].original_price,
    sale: productStyles.results[0].sale_price,
  });

  const {
    stylePhotos, skus, price, sale,
  } = item;

  const styleFinder = (style) => {
    productStyles.results.forEach((image) => {
      if (image.style_id === Number(style)) {
        setItem({
          stylePhotos: image.photos,
          skus: image.skus,
          price: image.original_price,
          sale: image.sale_price,
        });
      }
    });
  };

  const getStyleID = (style) => {
    setCurrentStyle(style);
    styleFinder(style);
  };

  return (
    <Wrapper>

      <TopWrapper>
        <ProductImages
          images={stylePhotos}
          id={currentStyle}
        />
        <ProductOverview
          details={productDetails}
          styles={productStyles}
          skus={skus}
          getStyleID={getStyleID}
          price={price}
          sale={sale}
          reviewsMeta={reviewsMeta}
        />
      </TopWrapper>

      <BottomWrapper>
        <Description info={productDetails} />
        <FeaturesList
          id={productDetails.id}
          features={productDetails.features}
        />
      </BottomWrapper>

    </Wrapper>
  );
};

export default Product;
