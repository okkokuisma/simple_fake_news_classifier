let sus_tabs = []

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'article') {
        // response = await fetch('http://localhost:3000', {
        //     method: 'POST',
        //     body: JSON.stringify({ text: "example" })
        // })
        chrome.action.setIcon({ path: "/icons/exclamation-mark.png" })
        sus_tabs.push(message.url)
    }
})

chrome.tabs.onActivated.addListener(async () => {
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions);
    if (sus_tabs.includes(tab.url)) {
        chrome.action.setIcon({ path: "/icons/exclamation-mark.png" })
    } else {
        chrome.action.setIcon({ path: "/icons/banned.png" })
    }
})