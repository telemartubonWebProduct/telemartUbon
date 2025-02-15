declare module 'react-messenger-customer-chat' {
  import { ComponentType } from 'react';

  interface MessengerCustomerChatProps {
    pageId?: string;
    appId?: string;
    htmlRef?: string;
    minimized?: boolean;
    themeColor?: string;
    loggedInGreeting?: string;
    loggedOutGreeting?: string;
    greetingDialogDisplay?: 'show' | 'hide';
    greetingDialogDelay?: number;
    autoLogAppEvents?: boolean;
    xfbml?: boolean;
    version?: string;
    language?: string;
    debug?: boolean;
  }

  const MessengerCustomerChat: ComponentType<MessengerCustomerChatProps>;

  export default MessengerCustomerChat;
}
