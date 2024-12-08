export {}

export const translationMainMenuId = "translateSelection"
export const sendOriginalTextMessageAction = "sendOriginalText"

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: translationMainMenuId,
    title: "Translate '%s'",
    contexts: ["selection"]
  })
})

// Listen for clicks on the context menu
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === translationMainMenuId && info.selectionText) {
    const selectedText = info.selectionText

    if (tab?.id) {
      await chrome.action.openPopup()
    }

    await chrome.runtime.sendMessage({
      action: sendOriginalTextMessageAction,
      originalText: selectedText
    })
  }
})
