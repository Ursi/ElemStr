export default class ElemStr extends Array {
	constructor(elem, str = '') {
		super();
		Object.defineProperties(this, {
			fragment: {
				value: document.createDocumentFragment(),
			},
			type: {
				value: elem,
			},
		});

		for (let char of str) this.append(char);
	}

	static get [Symbol.species]() {return Array;}

	append(char, ...classNames) {
		let elemChar = document.createElement(this.type);
		elemChar.classList.add('elem-char', ...classNames);
		elemChar.textContent = char;
		elemChar.dataset.char = char;
		this.push(elemChar);
		this.fragment.appendChild(elemChar);
		return elemChar;
	}

	class(className) {
		let classIndeces;
		for (let i = 0; i < this.length; i++) {
			if (this[i].classList.contains(className)) classIndeces.push(i);
		}

		return classIndeces;
	}

	firstClass(className) {
		for (let elem of this) {
			if (elem.classList.contains(className)) return elem;
		}
	}

	hasClass(className) {
		return this.some(elem => elem.classList.contains(className));
	}

	lastClass(className) {
		let last
		for (let elem of this) {
			if (elem.classList.contains(className)) last = elem;
		}

		return last;
	}

	sort(func = undefined) {
		if (func) {
			Array.prototype.sort.call(this, (a, b) => func(a.textContent, b.textContent));
		} else {
			Array.prototype.sort.call(this, (a, b) => {
				if (a.textContent === b.textContent) {
					return 0;
				} else {
					return a.textContent < b.textContent ? -1 : 1
				}
			});
		}

		return this;
	}

	toString(){
		let str = '';
		for (let elem of this) {
			str += elem.innerText;
		}

		return str;
	}
};
