export function initChatWidget(
  options: {
    host?: string
    botId?: string
  } = {},
) {
  if (typeof document === 'undefined') {
    return null
  }

  const host = (options.host || window.location.origin).replace(/\/+$/, '')
  const botId = options.botId || 'demo-bot'
  const UI = {
    width: 360,
    height: 560,
    zIndex: 9999,
    offsetX: 24,
    offsetY: 24,
    themeColor: '#111111',
    buttonSize: 56,
    gap: 12,
  } as const

  const iframeId = 'open-chatbot-widget-' + botId
  const buttonId = 'open-chatbot-widget-button-' + botId
  if (document.getElementById(iframeId) || document.getElementById(buttonId)) {
    return null
  }

  const iframe = document.createElement('iframe')
  iframe.id = iframeId
  iframe.src = host + '/embed/' + encodeURIComponent(botId)
  iframe.title = 'Chat Widget'
  iframe.style.cssText = [
    'position:fixed',
    `right:${UI.offsetX}px`,
    `bottom:${UI.offsetY + UI.buttonSize + UI.gap}px`,
    `width:${UI.width}px`,
    `height:${UI.height}px`,
    'border:0',
    'border-radius:0',
    'box-shadow:none',
    'background:transparent',
    'display:none',
    `z-index:${UI.zIndex}`,
  ].join(';')

  const button = document.createElement('button')
  button.id = buttonId
  button.type = 'button'
  button.textContent = 'Chat'
  button.setAttribute('aria-label', 'Open chat widget')
  button.style.cssText = [
    'position:fixed',
    `right:${UI.offsetX}px`,
    `bottom:${UI.offsetY}px`,
    `width:${UI.buttonSize}px`,
    `height:${UI.buttonSize}px`,
    'border:0',
    'border-radius:9999px',
    `background:${UI.themeColor}`,
    'color:#ffffff',
    'font-size:12px',
    'font-weight:700',
    'cursor:pointer',
    'box-shadow:0 10px 30px rgba(0, 0, 0, 0.2)',
    `z-index:${UI.zIndex + 1}`,
  ].join(';')

  let isOpen = false

  function open() {
    isOpen = true
    iframe.style.display = 'block'
    button.textContent = 'Close'
    button.setAttribute('aria-label', 'Close chat widget')
  }

  function close() {
    isOpen = false
    iframe.style.display = 'none'
    button.textContent = 'Chat'
    button.setAttribute('aria-label', 'Open chat widget')
  }

  function toggle() {
    if (isOpen) {
      close()
      return
    }

    open()
  }

  function destroy() {
    button.removeEventListener('click', toggle)
    iframe.remove()
    button.remove()
  }

  button.addEventListener('click', toggle)
  document.body.appendChild(iframe)
  document.body.appendChild(button)

  return {
    open,
    close,
    toggle,
    destroy,
  }
}
