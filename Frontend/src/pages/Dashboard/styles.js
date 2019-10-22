import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  padding: 50px 40px;
  margin: 0 auto;
  color: #fff;
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f94d6a;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
      height: 44px;
      margin: 5px 0 0;
      padding: 0 20px;
      transition: background 0.2s;
      svg {
        margin-right: 10px;
      }
      &:hover {
        background: ${darken(0.03, '#F94D6A')};
      }
    }
    strong {
      color: #fff;
      font-size: 24px;
    }
  }
  footer {
    display: flex;
    align-self: center;
    align-items: center;
    margin-top: 30px;
    button {
      background: none;
      border: 0;
    }
    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const MeetappCard = styled.div`
  & + div {
    margin-top: 10px;
  }
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  padding: 15px 30px;
  border-radius: 5px;
  a {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    color: #fff;
    strong {
      font-size: 18px;
    }
    strong,
    span {
      width: 70%;
    }
    time {
      text-transform: uppercase;
      font-size: 12px;
    }
  }
`;
export const NoMeetapps = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  padding-bottom: 20px;
  span {
    font-size: 18px;
    font-stretch: bold;
    margin-top: 15px;
  }
`;
