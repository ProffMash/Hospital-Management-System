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
        botId: "d1a48b06-f29f-410f-940d-6d6e0939ab4c",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "d1a48b06-f29f-410f-940d-6d6e0939ab4c",
        webhookId: "f479a002-7a75-4ada-9a3d-1fecb53f4183",
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