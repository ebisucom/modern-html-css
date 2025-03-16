// カスタム要素のためのクラスを定義
class BuiltInAttention extends HTMLParagraphElement {
	constructor() {
		super()
		// HTMLを追加する
		this.innerHTML = `
			<span>※予告なく変更される場合があります</span>
		`
	}
}

// カスタム要素を p 要素の拡張として登録する
customElements.define("built-in-attention", BuiltInAttention, { extends: "p" })
