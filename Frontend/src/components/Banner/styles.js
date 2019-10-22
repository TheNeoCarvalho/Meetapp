import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 50px;
  align-self: stretch;
  border-radius: 10px;
  label {
    display: block;
    overflow: hidden;
    width: 100%;
    max-height: 26vw;
    margin-bottom: 10px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.05);
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    .icon-add {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 50px 0px;
      z-index: 3;
    }
    img {
      width: 100%;
      border-radius: 10px;
    }
    input {
      display: none;
    }
  }
`;
