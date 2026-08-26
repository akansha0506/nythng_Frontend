"use client";

import React from "react";
import { css } from "@emotion/react";

const sharedStyles = css`
  position: relative;
  max-width: 255px;
  margin-bottom: 15px;
  padding: 10px 20px;
  line-height: 24px;
  word-wrap: break-word;
  border-radius: 25px;
  color: white;

  &:before,
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 20px;
    left: -16px;
  }

  &:before {
    width: 20px;
    background-color: #58adaf;
    border-bottom-right-radius: 25px;
    left: -10px;
  }

  &:after {
    width: 16px;
    background-color: #fff;
    border-bottom-right-radius: 15px;
    right: -26px;
  }
`;

const ChatBubble = ({ text, className = "" }) => {
  return (
    <div
      css={sharedStyles}
      className={`flex items-center justify-center text-nowrap ${className}`}
    >
      {text}
    </div>
  );
};

export default ChatBubble;