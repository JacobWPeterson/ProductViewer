import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const Thumbs = styled.div`
  z-index: 1;
  position: absolute;
  left: 1vw;
  top: .75vh;
  width: 6vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;
  margin: 0;
`;

const ImageContainer = styled.div`
  margin: .85vh 0;
  height: 65px;
  width: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewerImageContainer = styled.div`
  margin: .85vh 0;
  height: 65px;
  width: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Highlight = styled.div`
  z-index: 2;
  position: absolute;
  margin-top: -4px;
  height: 3px;
  color: #80ccc4;
  background: #80ccc4;
  width: 65px;
  border-radius: 15px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #aeaeae;
  &:hover {transform: scale(1.05);};
`;

const UpArrow = styled.div`
  color: #e0e0e0;
  font-size: 1rem;
  z-index: 1;
  top: 1vh;
  position: relative;
  &:hover {
    color: #80ccc4;
    transform: scale(1.1);
  };
`;

const NoArrow = styled.div`
  visibility: hidden;
  font-size: 1rem;
  z-index: 1;
  top: 1vh;
  position: relative;
`;

const DownArrow = styled.div`
  color: #e0e0e0;
  font-size: 1rem;
  z-index: 1;
  bottom: 1vh;
  position: relative;
  &:hover {
    color: #80ccc4;
    transform: scale(1.1);
  };
`;

const ViewerThumbnails = (props) => {
  const {
    clickedThumb, end, id, images, indexUpdater, start, viewerIndex,
  } = props;
  const [style, setStyle] = useState(null);

  const clickHandler = (event) => {
    setStyle(event.target.id);
  };

  useEffect(() => {
    clickedThumb(style);
  }, [style]);

  const clickThumbNavHandler = (event) => {
    indexUpdater(Number(event.target.id));
  };

  if (images) {
    return (
      <Thumbs>
        {start !== 0
          && <UpArrow onClick={clickThumbNavHandler}><FontAwesome id="-1" name="angle-up" size="2x" /></UpArrow> }
        {start === 0
          && <NoArrow><FontAwesome id="-1" name="angle-up" size="2x" /></NoArrow> }

        {images.map((image, index) => {
          if (viewerIndex === Number(index)
            && Number(index) >= start
            && Number(index) <= end) {
            return (
              <div key={image.url}>
                <ViewerImageContainer>
                  <Image
                    onClick={clickHandler}
                    src={image.thumbnail_url}
                    alt={id}
                    id={index}
                  />
                </ViewerImageContainer>
                <Highlight />
              </div>
            );
          }

          if (viewerIndex !== Number(index)
            && Number(index) >= start
            && Number(index) <= end) {
            return (
              <ImageContainer key={image.url}>
                <Image
                  onClick={clickHandler}
                  src={image.thumbnail_url}
                  alt={id}
                  id={index}
                />
              </ImageContainer>
            );
          }
        })}

        {end !== images.length - 1
          && <DownArrow onClick={clickThumbNavHandler}><FontAwesome id="1" name="angle-down" size="2x" /></DownArrow> }
      </Thumbs>
    );
  }
};

export default ViewerThumbnails;
