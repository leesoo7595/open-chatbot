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
  var buttonSize = 56;
  var offset = 24;
  var gap = 12;

  var iframeId = "open-chatbot-widget-" + botId;
  var buttonId = "open-chatbot-widget-button-" + botId;
  if (document.getElementById(iframeId) || document.getElementById(buttonId)) {
    return;
  }

  var iframe = document.createElement("iframe");
  iframe.id = iframeId;
  iframe.src =
    host.replace(/\/+$/, "") + "/embed/" + encodeURIComponent(botId);
  iframe.title = "Chat Widget";
  iframe.style.position = "fixed";
  iframe.style.right = offset + "px";
  iframe.style.bottom = offset + buttonSize + gap + "px";
  iframe.style.width = width + "px";
  iframe.style.height = height + "px";
  iframe.style.border = "0";
  iframe.style.borderRadius = "0";
  iframe.style.boxShadow = "none";
  iframe.style.background = "transparent";
  iframe.style.display = "none";
  iframe.style.zIndex = zIndex;

  var button = document.createElement("button");
  button.id = buttonId;
  button.type = "button";
  button.textContent = "Chat";
  button.setAttribute("aria-label", "Open chat widget");
  button.style.position = "fixed";
  button.style.right = offset + "px";
  button.style.bottom = offset + "px";
  button.style.width = buttonSize + "px";
  button.style.height = buttonSize + "px";
  button.style.border = "0";
  button.style.borderRadius = "9999px";
  button.style.background = "#111111";
  button.style.color = "#ffffff";
  button.style.fontSize = "12px";
  button.style.fontWeight = "700";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
  button.style.zIndex = String(Number(zIndex) + 1);

  var isOpen = false;
  button.addEventListener("click", function toggleWidget() {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? "block" : "none";
    button.textContent = isOpen ? "Close" : "Chat";
    button.setAttribute(
      "aria-label",
      isOpen ? "Close chat widget" : "Open chat widget"
    );
  });

  document.body.appendChild(iframe);
  document.body.appendChild(button);
})();
