let sus_tabs = []

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'article') {
        try {
            response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: message.url, text: message.text })
            })
            const { url, score } = await response.json()

            if (score > 0.5) {
                chrome.action.setIcon({ path: "/icons/exclamation-mark.png" })
                sus_tabs.push(url)
            }
        } catch (error) {
            console.log(error)
        }
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