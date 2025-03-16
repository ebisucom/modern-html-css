// 遷移元（古いドキュメント）での処理
window.addEventListener("pageswap", async (e) => {
	if (!e.viewTransition) return

	// 遷移元・遷移先のファイル名を取得
	const oldPage = e.activation.from.url.replace(".html", "").split("/").pop()
	const newPage = e.activation.entry.url.replace(".html", "").split("/").pop()

	// Navigation APIに未対応なブラウザ用の設定
	if (!window.navigation) {
		sessionStorage.setItem("oldPage", oldPage)
		sessionStorage.setItem("newPage", newPage)
	}

	// 遷移元が一覧ページの場合
	if (oldPage === "cards") {
		// 遷移先の詳細と対になるカードの画像に遷移名を指定
		const cardImage = document.querySelector(`#${newPage} img`)
		cardImage.style.viewTransitionName = "photo"

		// 遷移後にBFCacheのカードの画像から遷移名を削除
		await e.viewTransition.finished
		cardImage.style.viewTransitionName = ""
	}
})

// 遷移先（新しいドキュメント）での処理
window.addEventListener("pagereveal", async (e) => {
	if (!e.viewTransition) return

	// 遷移元・遷移先のファイル名を取得
	let oldPage, newPage
	if (window.navigation) {
		// Navigation APIに対応したブラウザの場合
		oldPage = navigation.activation.from.url.replace(".html", "").split("/").pop()
		newPage = navigation.activation.entry.url.replace(".html", "").split("/").pop()
	} else {
		// Navigation APIに未対応なブラウザの場合
		oldPage = sessionStorage.getItem("oldPage")
		newPage = sessionStorage.getItem("newPage")
	}

	// 遷移先が一覧ページの場合
	if (newPage === "cards") {
		// 遷移元の詳細と対になるカードの画像に遷移名を指定
		const cardImage = document.querySelector(`#${oldPage} img`)
		cardImage.style.viewTransitionName = "photo"

		// 遷移の準備ができたらカードの画像から遷移名を削除
		await e.viewTransition.ready
		cardImage.style.viewTransitionName = ""
	}
})
