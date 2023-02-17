import React from "react";
import styled from "styled-components";
const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  color: white;
  padding: 0 1rem;
  background-color: ${(props) =>
    props.status === "error"
      ? "red"
      : props.status === "success"
      ? "lightgreen"
      : "lightblue"};

  & .title {
    font-size: 100%;
    font-weight: 700;
  }

  & .message {
    font-size: 80%;
  }
`;

const Notification = (props) => {
  return (
    <Div status={props.status}>
      <div className="title">{props.title}</div>
      <div className="message">{props.message}</div>
    </Div>
  );
};

export default Notification;
