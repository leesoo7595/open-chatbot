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
  const host = script.getAttribute('data-host') || window.location.origin
  const width = Number(script.getAttribute('data-width') || '360') || 360
  const height = Number(script.getAttribute('data-height') || '560') || 560
  const zIndex = Number(script.getAttribute('data-z-index') || '9999') || 9999
  const offsetX = Number(script.getAttribute('data-offset-x') || '24') || 24
  const offsetY = Number(script.getAttribute('data-offset-y') || '24') || 24
  const themeColor = script.getAttribute('data-theme-color') || '#111111'
  const position =
    (script.getAttribute('data-position') || 'right') === 'left'
      ? 'left'
      : 'right'
  const buttonSize = 56
  const gap = 12

  const iframeId = 'open-chatbot-widget-' + botId
  const buttonId = 'open-chatbot-widget-button-' + botId
  if (document.getElementById(iframeId) || document.getElementById(buttonId)) {
    return
  }

  const iframe = document.createElement('iframe')
  iframe.id = iframeId
  iframe.src = host.replace(/\/+$/, '') + '/embed/' + encodeURIComponent(botId)
  iframe.title = 'Chat Widget'
  iframe.style.position = 'fixed'
  iframe.style[position] = offsetX + 'px'
  iframe.style.bottom = offsetY + buttonSize + gap + 'px'
  iframe.style.width = width + 'px'
  iframe.style.height = height + 'px'
  iframe.style.border = '0'
  iframe.style.borderRadius = '0'
  iframe.style.boxShadow = 'none'
  iframe.style.background = 'transparent'
  iframe.style.display = 'none'
  iframe.style.zIndex = String(zIndex)

  const button = document.createElement('button')
  button.id = buttonId
  button.type = 'button'
  button.textContent = 'Chat'
  button.setAttribute('aria-label', 'Open chat widget')
  button.style.position = 'fixed'
  button.style[position] = offsetX + 'px'
  button.style.bottom = offsetY + 'px'
  button.style.width = buttonSize + 'px'
  button.style.height = buttonSize + 'px'
  button.style.border = '0'
  button.style.borderRadius = '9999px'
  button.style.background = themeColor
  button.style.color = '#ffffff'
  button.style.fontSize = '12px'
  button.style.fontWeight = '700'
  button.style.cursor = 'pointer'
  button.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)'
  button.style.zIndex = String(zIndex + 1)

  let isOpen = false
  button.addEventListener('click', function toggleWidget() {
    isOpen = !isOpen
    iframe.style.display = isOpen ? 'block' : 'none'
    button.textContent = isOpen ? 'Close' : 'Chat'
    button.setAttribute(
      'aria-label',
      isOpen ? 'Close chat widget' : 'Open chat widget',
    )
  })

  document.body.appendChild(iframe)
  document.body.appendChild(button)
})()
