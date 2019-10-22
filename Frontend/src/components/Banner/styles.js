import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 50px;
  align-self: stretch;
  border-radius: 10px;
  label {
    width: 100%;
    max-height: 26vw;
    cursor: pointer;
    overflow: hidden;
    display: block;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    &:hover {
      opacity: 0.7;
    }
    .icon-add {
      justify-content: center;
      z-index: 3;
      padding: 50px 0px;
      display: flex;
      align-items: center;
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
