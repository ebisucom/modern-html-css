// カスタム要素のためのクラスを定義
class CustomAttention extends HTMLElement {
	constructor() {
		super()
		// HTMLを追加する
		this.innerHTML = `
			<p>※予告なく変更される場合があります</p>
		`
	}
}

// カスタム要素を登録する
customElements.define("custom-attention", CustomAttention)
