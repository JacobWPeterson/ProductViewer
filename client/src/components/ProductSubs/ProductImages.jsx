import React, { useState } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

import ViewerThumbnails from './ViewerThumbnails.jsx';
import ExpandedImage from './ExpandedImage.jsx';

const Wrapper = styled.div`
  position: relative;
  flex-basis: 65%;
  width: 50vw;
  height: 70vh;
  display: flex;
  flex-direction: row;
  border: 2px solid #aeaeae;
`;

const RightArrow = styled.div`
  color: #e0e0e0;
  font-size: 1.75rem;
  z-index: 1;
  position: absolute;
  top: 30vh;
  right: .25vw;
  &:hover {
    color: #80ccc4;
    transform: scale(1.1);
  };
`;

const LeftArrow = styled.div`
  color: #e0e0e0;
  font-size: 1.75rem;
  z-index: 1;
  position: absolute;
  top: 30vh;
  left: git.25vw;
  &:hover {
    color: #80ccc4;
    transform: scale(1.1);
  };
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 0;
  position: relative;
  z-index: 0;
  &:hover { cursor: crosshair; };
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  background-color: #42424275;
`;

const ProductImages = (props) => {
  const { id, images } = props;

  const [isModalOpen, setModalState] = useState(false);
  const [index, setIndex] = useState(0);
  const [range, setRange] = useState({ start: 0, end: 4 });

  const { start, end } = range;

  const indexChecker = () => {
    if (index < 5) {
      setRange({ start: 0, end: 4 });
    } else if (images.length - index <= 5) {
      setRange({ start: images.length - 5, end: images.length - 1 });
    } else if (index < start) {
      setRange({ start: index, end: index + 4 });
    } else if (index > end) {
      setRange({ start: index - 4, end: index });
    }
  };

  const clickNavHandler = (event) => {
    const direction = Number(event.target.id);
    if (index + direction >= 0
      && index + direction < images.length) {
      setIndex(index + direction);
      indexChecker();
    }
  };

  const clickedThumb = (ind) => {
    setIndex(Number(ind));
  };

  const indexUpdater = (amount) => {
    if (start + amount >= 0
      && end + amount < images.length) {
      setRange({ start: start + amount, end: end + amount });
    }
  };

  const toggleModal = () => {
    setModalState(!isModalOpen);
  };

  return (
    <Wrapper>

      {index !== 0 && <LeftArrow onClick={clickNavHandler}><FontAwesome id="-1" name="angle-left" size="2x" /></LeftArrow> }

      <ViewerThumbnails
        viewerIndex={index}
        start={start}
        end={end}
        indexUpdater={indexUpdater}
        images={images}
        clickedThumb={clickedThumb}
        id={id}
        alt=""
      />

      <Image onClick={toggleModal} src={images[index].url} key={id} alt="style photograph" />

      {isModalOpen && (
      <ModalBackground onMouseDown={toggleModal}>
        <ExpandedImage
          src={images[index].url}
          id={id}
          alt="style photograph"
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          serial={index}
          images={images}
          clickNavHandler={clickNavHandler}
          clickedThumb={clickedThumb}
        />
      </ModalBackground>
      )}

      {index !== images.length - 1 && <RightArrow onClick={clickNavHandler}><FontAwesome id="1" name="angle-right" size="2x" /></RightArrow> }

    </Wrapper>
  );
};

export default ProductImages;
