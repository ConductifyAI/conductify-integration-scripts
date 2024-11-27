async function init(chatModel, bubbleColor, bubbleIcon, chatWidth = '450px', chatHeight = '550px', bottom = '20px', right = '20px') {
    let id = await chatModel;

    let botIcon = bubbleIcon ? bubbleIcon : "https://cdn.jsdelivr.net/gh/ConductifyAI/conductify-integration-scripts/production/logo_conductify.png"

    // Create the main script element
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // Define the script content
    script.text = `
    // Set the configuration for the new script
    window.BreadsConfig = {
      agentUuid: '${id ? id : null}',
      token: 'conductify-account-id',
      ${botIcon ? `customIconUrl: '${botIcon}',` : ''}
      styles: {
                toggleContainer: {
                    right: '${right}',
                    bottom: '${bottom}',
                },
            }
    };

    // Dynamically load the new script
    (function () {
      var breadsScript = document.createElement('script');
      breadsScript.src = 'https://cdn.jsdelivr.net/gh/ConductifyAI/conductify-integration-scripts/production/breads-widget.js';
      breadsScript.defer = true;
      breadsScript.async = true;
      document.head.appendChild(breadsScript);
    })();
  `;

    // Inject the script into the document
    document.head.appendChild(script);

}
function ready(chatModel) {
    if ('loading' !== document.readyState) {
        chatModel();
        return;
    }
    document.addEventListener('DOMContentLoaded', chatModel);
}
!(function () {
    let chatModel = document
        .querySelector('script[data-chat-service="WorkerBot"][data-bot-id]')
        .getAttribute('data-bot-id'),
        bubbleColor =
            document
                .querySelector('script[data-chat-service="WorkerBot"][data-bubble-color]')
                ?.getAttribute('data-bubble-color') ?? 'rgb(0, 21, 92)',
        chatWidth =
            document
                .querySelector('script[data-chat-service="WorkerBot"][data-chat-width]')
                ?.getAttribute('data-chat-width') ?? '450px',
        chatHeight =
            document
                .querySelector('script[data-chat-service="WorkerBot"][data-chat-height]')
                ?.getAttribute('data-chat-height') ?? '550px';
    bottomPosition =
        document
            .querySelector('script[data-chat-service="WorkerBot"][data-bottom-position]')
            ?.getAttribute('data-bottom-position') ?? '20px';
    rightPosition =
        document
            .querySelector('script[data-chat-service="WorkerBot"][data-right-position]')
            ?.getAttribute('data-right-position') ?? '20px';
    bubbleIcon =
        document
            .querySelector('script[data-chat-service="WorkerBot"][data-bubble-icon]')
            ?.getAttribute('data-bubble-icon') ?? null;

    ready(() => init(chatModel, bubbleColor, bubbleIcon, chatWidth, chatHeight, bottomPosition, rightPosition));
})();