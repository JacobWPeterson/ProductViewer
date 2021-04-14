import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const DDWrapper = styled.div`
  position: relative;
  width: 65%;
  font-size: 0;
  user-select: none;
`;

const DDHeader = styled.button`
  font-size: 1rem;
  position: relative;
  height: 7vh;
  width: 100%;
  padding: 0 1.25vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: #424242;
  border: 1px solid #424242;
  cursor: default;
  cursor: pointer;
  &:focus {
    outline: none;
    z-index: 1;
    border-top: 1px solid #e0e0e0;
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #aeaeae;
    box-shadow: 0 3px 6px #a0a0a0, 0 3px 6px #a0a0a0;
  };
`;

const DDHeaderTitle = styled.div`
  font-weight: 600;
`;

const DDList = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  max-height: 25vh;
  overflow-y: scroll;
  overflow-x: hidden;
  font-weight: 400;
  box-shadow: 0 3px 6px #a0a0a0, 0 3px 6px #a0a0a0;
`;

const DDListItem = styled.button`
  display: inline-block;
  overflow: hidden;
  width: 100%;
  padding: 8px 10px;
  font-weight: 400;
  color: #424242;
  font-size: 1rem;
  cursor: default;
  cursor: pointer;
  border-width: 0;
  border-style: none;
  border-color: clear;
  background-color: white;
  border: 1px solid clear;
  border-bottom: 1px solid #aeaeae;
  &:hover {
    border-bottom: 2px solid #424242;
    border-top: 1px solid #aeaeae;
    transform: scale(1.1);
  };
`;

const SizeDropdown = (props) => {
  const {
    list, resetThenSet, title,
  } = props;
  const [isListOpen, setListStatus] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(title);

  const close = () => {
    setListStatus(false);
  };

  useEffect(() => {
    if (isListOpen) {
      window.addEventListener('click', close);
      return () => window.removeEventListener('click', close);
    }
  });

  const toggleList = () => {
    setListStatus(!isListOpen);
  };

  const selectItem = (item) => {
    setHeaderTitle(item.size);
    setListStatus(false);
    resetThenSet(item.quantity, item.size);
  };

  return (
    <DDWrapper>

      <DDHeader onClick={toggleList}>
        <DDHeaderTitle>{headerTitle}</DDHeaderTitle>
        {isListOpen
          ? <FontAwesome name="angle-up" size="2x" />
          : <FontAwesome name="angle-down" size="2x" />}
      </DDHeader>

      {isListOpen && (
      <DDList role="list">
        {list.map((item) => (
          item.quantity > 0 && (
          <DDListItem type="button" key={item.size} onClick={() => selectItem(item)}>
            {item.size}
          </DDListItem>
          )
        ))}
      </DDList>
      )}

    </DDWrapper>
  );
};

export default SizeDropdown;
