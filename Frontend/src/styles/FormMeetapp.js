import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  max-width: 900px;
  padding: 50px 0;
  margin: 0 auto;
  .loading {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    input,
    textarea {
      background: rgba(0, 0, 0, 0.1);
      height: 44px;
      border: 0;
      border-radius: 4px;
      padding: 10px 15px;
      color: #fff;
      margin: 0 0 10px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    textarea {
      font-size: 16px;
      height: 150px;
      line-height: 21px;
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    > button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: flex-end;
      margin: 5px 0 0;
      padding: 0 20px;
      transition: background 0.2s;
      background: #f94d6a;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
      height: 44px;
      svg {
        margin-right: 10px;
      }
      &:hover {
        background: ${darken(0.03, '#F94D6A')};
      }
    }
    a {
      align-self: flex-end;
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    .react-datepicker-wrapper > div {
      display: inline;
      > input {
        width: 100%;
      }
    }
  }
`;
