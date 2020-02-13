import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useFetch from "use-http";
import dynamic from "next/dynamic";
import { useList, useEffectOnce, useKey } from "react-use";
import { useForm } from "react-hook-form";
import { useStoreState } from "-/src/utils/EasyPeasy";
import formatMessages from "-/src/utils/formatMessages";
import { AdventureContext } from "-/src/components/MasteringAdventure";
import isServer from "-/src/utils/isServer";
import example from "./example";
import messagesToElement from "-/src/utils/messagesToElement";
import {
  Container,
  Title,
  Window,
  MyMessage,
  OtherPeopleMessage,
  MessageOwner,
  UserInput,
  Send,
  ChatInput,
  ChatForm,
  ButtonWrapper
} from "./styles";
import { getMessages, sendMessage } from "-/src/services";
import useAwait from "-/src/utils/hooks/useAwait";

const Chat = () => {
  const { adventure } = React.useContext(AdventureContext);
  const methods = useForm();
  const windowRef = React.useRef<HTMLDivElement>(null);
  const user = useStoreState(state => state.user);
  const [isLoading, fetch, { toggle }] = useAwait(getMessages(adventure.id));
  const [messages, setMessages] = React.useState<any>([]);
  const [text, setText] = useState("");
  const handleTextChange = e => {
    setText(e.target.value);
  };
  const scrollWindowToBottom = (smooth = true) => {
    if (windowRef.current) {
      const element = windowRef.current;
      const size = element.scrollHeight;
      element.scroll({ top: size, behavior: smooth ? "smooth" : "auto" });
    }
  };
  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch();
        setMessages(response.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  const handleSend = async data => {
    const { message } = data;
    await sendMessage(adventure.id)({ message });
    methods.setValue("message", "");
  };
  // useKey("Enter", handleSend, undefined, [text]);
  React.useEffect(() => {
    scrollWindowToBottom(false);
  }, [messages]);
  const router = useRouter();
  useEffect(() => {
    if (isServer()) return;
    // eslint-disable-next-line global-require
    const Ws = require("@adonisjs/websocket-client");
    const ws = Ws(process.env.WEB_SOCKET_URL);
    ws.connect();
    const chat = ws.subscribe(`social:${adventure.id}`);
    ws.on("open", () => {
      chat.on("new:message", data => {
        setMessages(state => [...state, data]);
      });
    });
  }, [setMessages]);
  const format = React.useMemo(() => formatMessages(user), [user]);
  const messagesElement = React.useMemo(
    () =>
      messagesToElement(format, messages, {
        OtherPeopleMessage,
        MessageOwner,
        MyMessage
      }),
    [messages, format]
  );

  return (
    <Container>
      <Title>Chat</Title>
      <Window ref={windowRef}>{messagesElement}</Window>
      <UserInput>
        <ChatForm methods={methods} onSubmit={handleSend}>
          <ChatInput
            style={{
              marginBottom: 0
            }}
            placeholder="Type your message here"
            prettyName=""
            isFull
            noError
            name="message"
          />
          <ButtonWrapper type="submit">
            <Send />
          </ButtonWrapper>
        </ChatForm>
      </UserInput>
    </Container>
  );
};

export default Chat;
