import React from "react";
import Amplify from "aws-amplify";
import {AmplifyChatbot} from "@aws-amplify/ui-react";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

const ChatBot = () => (
  <AmplifyChatbot
    botName="BsBot_staging"
    botTitle="BsBot"
    welcomeMessage="Hello, how can I help you?"
  />
);

export default ChatBot;