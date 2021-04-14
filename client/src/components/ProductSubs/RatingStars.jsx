import React from 'react';
import styled from 'styled-components';

const StarsContainer = styled.div`
  unicode-bidi: bidi-override;
  color: #e0e0e0;
  font-size: 1rem;
  height: 1rem;
  line-height: 1rem;
  position: relative;
  padding: 0;
  text-shadow: 0px 1px 0 #a2a2a2;
  object-fit: contain;

  &.top {
    width: ${({ rating }) => (rating / 5) * 100}%;
    color: #80ccc4;
    padding: 0;
    position: absolute;
    z-index: 1;
    display: block;
    top: 0;
    left: 0;
    overflow: hidden;
    object-fit: contain;
  }

  &.bottom {
    padding: 0;
    color: #e0e0e0;
    display: block;
    z-index: 0;
    object-fit: contain;
  }

`;

const RatingStars = ({ rating }) => (
  <StarsContainer>
    <StarsContainer className="top" rating={rating || 0}>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </StarsContainer>
    <StarsContainer className="bottom">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </StarsContainer>
  </StarsContainer>
);

export default RatingStars;
