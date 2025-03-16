const cards = document.getElementById("cards")
const articles = document.getElementById("articles")

// DOM操作（一覧と詳細の表示・非表示を切り替え）
const updateTheDOM = (article) => {
	cards.hidden = !cards.hidden
	article.hidden = !article.hidden
}

// 一覧のカード（.cardボタン）をクリックして詳細を開く
cards.addEventListener("click", async (e) => {
	const card = e.target.closest(".card")
	if (!card) return

	// 開く詳細を取得
	const article = document.getElementById(card.dataset.id)

	// View Transition APIに未対応なブラウザ用の処理
	if (!document.startViewTransition) {
		updateTheDOM(article)
		return
	}

	// クリックしたカードの画像に遷移名を指定
	const cardImage = card.querySelector("img")
	cardImage.style.viewTransitionName = "photo"

	// ビュー遷移を実行
	const transition = document.startViewTransition(() => {
		updateTheDOM(article)
	})

	// 遷移が完了したらカードの画像から遷移名を削除
	await transition.finished
	cardImage.style.viewTransitionName = ""
})

// 詳細の戻る（.backボタン）をクリックして一覧に戻る
articles.addEventListener("click", async (e) => {
	const backButton = e.target.closest(".back")
	if (!backButton) return

	// 閉じる詳細を取得
	const article = e.target.closest("article")

	// 閉じる詳細と対になるカードの画像に遷移名を指定
	const photoId = article.getAttribute("id")
	const cardImage = document.querySelector(`[data-id="${photoId}"] img`)
	cardImage.style.viewTransitionName = "photo"

	// View Transition APIに未対応なブラウザ用の処理
	if (!document.startViewTransition) {
		updateTheDOM(article)
		return
	}

	// ビュー遷移を実行
	const transition = document.startViewTransition(() => {
		updateTheDOM(article)
	})

	// 遷移が完了したらカードの画像から遷移名を削除
	await transition.finished
	cardImage.style.viewTransitionName = ""
})
