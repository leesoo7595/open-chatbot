import { initChatWidget } from './init-chat-widget'
;(function initChatWidgetEmbed() {
  function readCurrentScript() {
    if (document.currentScript) {
      return document.currentScript
    }

    const scripts = document.getElementsByTagName('script')
    return scripts.length > 0 ? scripts[scripts.length - 1] : null
  }

  const script = readCurrentScript()
  if (!script) {
    return
  }

  const botId = script.getAttribute('data-bot-id') || 'demo-bot'
  initChatWidget({
    host: script.getAttribute('data-host') || window.location.origin,
    botId,
  })
})()
