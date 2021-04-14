import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const Wrapper = styled.div`
  position: fixed;
  display: table;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  max-width: 70vw;
  max-height: 95vh;
  overflow: hidden;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
`;

const Expanded = styled.img`
  ${(props) => props.zoomed && 'transform: scale(2.5)'};
  background: url(${(props) => props.src}) no-repeat 0 0 fixed;
  display: block;
  max-height: 95vh;
  cursor: ${(props) => (props.zoomed ? 'zoom-out' : 'zoom-in')};
  background-position-x: ${(props) => props.x};
  background-position-y: ${(props) => props.y};
`;

const ModalLeftArrow = styled.div`
  color: #e0e0e0;
  font-size: 1.75rem;
  z-index: 6;
  position: absolute;
  top: 44vh;
  left: .5vw;
  &:hover {
    color: #80ccc4;
    transform: scale(1.1);
  };
`;

const ModalRightArrow = styled.div`
  color: #e0e0e0;
  font-size: 1.75rem;
  z-index: 6;
  position: absolute;
  right: .5vw;
  top: 44vh;
  &:hover {
    color: #80ccc4;
    transform: scale(1.1);
  };
`;

const IconHolder = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 2vh;
  z-index: 6;
`;

const SelectedIcon = styled.div`
  background-color: #80ccc4;
  border-radius: 50%;
  width: .25rem;
  height: .25rem;
  z-index: 6;
  border-width: 0;
  border-style: none;
  margin: 0 .25vw;
  padding: 2px;
  border: 3px solid #80ccc4;
`;

const Icon = styled.div`
  border-radius: 50%;
  width: .25rem;
  height: .25rem;
  z-index: 6;
  border-width: 0;
  border-style: none;
  margin: 0 .25vw;
  padding: 2px;
  border: 3px solid #aeaeae;
  &:hover { border: 3px solid #80ccc4; };
`;

const ExpandedImage = (props) => {
  const {
    alt, clickedThumb, clickNavHandler, id, images, serial, src,
  } = props;
  const [zoom, setZoom] = useState(false);

  const imageClickHandler = (event) => {
    event.stopPropagation();
    setZoom(!zoom);
  };

  const arrowClickHandler = (event) => {
    event.stopPropagation();
    clickNavHandler(event);
  };

  const iconClickHandler = (event) => {
    event.stopPropagation();
    clickedThumb(event.target.id);
  };

  return ReactDOM.createPortal(
    <Wrapper>
      {serial !== 0 && !zoom && <ModalLeftArrow onMouseDown={arrowClickHandler}><FontAwesome id="-1" name="angle-left" size="2x" /></ModalLeftArrow> }
      <Expanded
        key={id}
        src={src}
        alt={alt}
        zoomed={zoom}
        onMouseDown={(event) => imageClickHandler(event)}
      />
      {serial !== images.length - 1 && !zoom && <ModalRightArrow onMouseDown={arrowClickHandler}><FontAwesome id="1" name="angle-right" size="2x" /></ModalRightArrow> }
      {!zoom
        && (
          <IconHolder onMouseDown={(event) => event.stopPropagation()}>
            {images.map((image, index) => {
              const uniqueID = id * index;
              if (serial === index) {
                return (
                  <SelectedIcon type="button" id={index} key={Number(uniqueID)} onMouseDown={iconClickHandler} />
                );
              }
              if (serial !== index) {
                return (
                  <Icon type="button" id={index} key={Number(uniqueID)} onMouseDown={iconClickHandler} />
                );
              }
            })}
          </IconHolder>
        )}
    </Wrapper>,
    document.getElementById('modal-root') || document.createElement('div'), // for testing purposes
  );
};

export default ExpandedImage;
