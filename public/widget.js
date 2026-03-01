(function initChatWidgetEmbed() {
  function readCurrentScript() {
    if (document.currentScript) {
      return document.currentScript;
    }

    var scripts = document.getElementsByTagName("script");
    return scripts.length > 0 ? scripts[scripts.length - 1] : null;
  }

  var script = readCurrentScript();
  if (!script) {
    return;
  }

  var botId = script.getAttribute("data-bot-id") || "demo-bot";
  var host = script.getAttribute("data-host") || window.location.origin;
  var width = script.getAttribute("data-width") || "360";
  var height = script.getAttribute("data-height") || "560";
  var zIndex = script.getAttribute("data-z-index") || "9999";

  var iframeId = "open-chatbot-widget-" + botId;
  if (document.getElementById(iframeId)) {
    return;
  }

  var iframe = document.createElement("iframe");
  iframe.id = iframeId;
  iframe.src =
    host.replace(/\/+$/, "") + "/embed/" + encodeURIComponent(botId);
  iframe.title = "Chat Widget";
  iframe.style.position = "fixed";
  iframe.style.right = "24px";
  iframe.style.bottom = "24px";
  iframe.style.width = width + "px";
  iframe.style.height = height + "px";
  iframe.style.border = "0";
  iframe.style.borderRadius = "16px";
  iframe.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
  iframe.style.background = "transparent";
  iframe.style.zIndex = zIndex;

  document.body.appendChild(iframe);
})();
