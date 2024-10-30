const articles = document.querySelectorAll("article");

if (articles) {
  articles.forEach((a) => {
			const text = a.textContent;
			const wordMatchRegExp = /[^\s]+/g;
			const words = text.matchAll(wordMatchRegExp);
			const wordCount = [...words].length;

			if (wordCount > 100) {
				chrome.runtime.sendMessage({ type: 'article', text: text, url: window.location.href })			
			}
		}
	)
}