import { useEffect } from 'react';

const BotpressChat: React.FC = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;

    // Define the bot initialization function
    script.onload = () => {
      (window as any).botpressWebChat.init({
        composerPlaceholder: "Chat with Medinik Virtual Assistant",
        botConversationDescription: "Ask any Question",
        botId: import.meta.env.VITE_BOT_ID, 
        hostUrl: import.meta.env.VITE_HOST_URL, 
        messagingUrl: import.meta.env.VITE_MESSAGING_URL, 
        clientId: import.meta.env.VITE_CLIENT_ID, 
        webhookId: import.meta.env.VITE_WEBHOOK_ID, 
        lazySocket: true,
        themeName: "prism",
        botName: "Vehicle Rental Assistant Bot",
        avatarUrl: "https://i.pinimg.com/564x/3c/99/0c/3c990c67c30df3fdc95d1ed1371d21be.jpg",
        frontendVersion: "v1",
        useSessionStorage: true,
        enableConversationDeletion: true,
        theme: "prism",
        themeColor: "#2563eb",
        allowedOrigins: []
      });
    };

    // Append the script element to the document body
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="botpress-webchat" />;
};

export default BotpressChat;
