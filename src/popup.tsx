import { useState } from "react"

import "./style.css"

function IndexPopup() {
  const [selectedText, setSelectedText] = useState("")

  const showSelectedText = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    let result
    console.log(tab)
    try {
      ;[{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => getSelection().toString()
      })
      console.log(result)
    } catch (e) {
      console.error(e)
      return // ignoring an unsupported page like chrome://extensions
    }
    document.body.append("Selection: " + result)
  }

  return (
    <div>
      <button
        onClick={() => showSelectedText()}
        type="button"
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Count:
      </button>
      <span className="inline-flex items-center justify-center w-8 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
        {selectedText}
      </span>
    </div>
  )
}

export default IndexPopup
