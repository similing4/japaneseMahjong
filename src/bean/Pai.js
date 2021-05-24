/*
 *	单张牌类
 *	用于牌的记录与获取牌的各种基本属性的类
 *	使用方法：
 *	var pai = new Pai("Tongzi",3);
 *	对象方法详见注释
 */
const PaiTypeHash = {
	Wanzi: "Wanzi",
	Tongzi: "Tongzi",
	Suozi: "Suozi",
	Feng: "Feng",
	Sanyuan: "Sanyuan"
};
const RealNameHash = [
	"一萬", "二萬", "三萬", "四萬", "五萬", "六萬", "七萬", "八萬", "九萬",
	"一筒", "二筒", "三筒", "四筒", "五筒", "六筒", "七筒", "八筒", "九筒",
	"一索", "二索", "三索", "四索", "五索", "六索", "七索", "八索", "九索",
	"东", "南", "西", "北", "白", "发", "中"
];
export default class Pai {
	pai_real_ascii; // Number类型
	isRed; //是否是赤宝牌
	/*
		牌的编码，编码数字参考：
		1-9万：0-8
		1-9筒：9-17
		1-9索：18-26
		东南西北：27-30
		白发中：31-33
	*/

	/*
		构造方法
		参数：
		type：牌的种类，"Wanzi"为万子，"Tongzi"为筒子，"Suozi"为索子，"Feng"为风牌，"Sanyuan"为三元牌
		pai_ascii：牌的数字，如果是风牌那么东1南2西3北4，如果是三元牌那么白1发2中3
		isRed：是否是赤宝牌，默认为false即非赤宝牌
		错误：
		当type或pai_ascii传入错误值时会throw对应的错误提示字符串。
	*/
	constructor(type, pai_ascii, isRed = false) {
		if (!Object.values(PaiTypeHash).includes(type))
			throw "牌种类传入不正确，应传入" + JSON.stringify(Object.values(PaiTypeHash)) + "之一";
		if (type == PaiTypeHash.Feng) { //风牌
			if (pai_ascii > 4 || pai_ascii < 1)
				throw "牌编码不正确，风牌的pai_ascii取值范围为1-4，您传入的值为" + pai_ascii; //风牌只能是东南西北
			this.pai_real_ascii = 26 + pai_ascii;
		} else if (type == PaiTypeHash.Sanyuan) { //三元牌
			if (pai_ascii > 3 || pai_ascii < 1)
				throw "牌编码不正确，三元牌的pai_ascii取值范围为1-3，您传入的值为" + pai_ascii; //三元牌只能是白发中
			this.pai_real_ascii = 30 + pai_ascii;
		} else {
			if (pai_ascii > 9 || pai_ascii < 1) //不是三元牌或风牌
				throw "牌编码不正确，数牌的pai_ascii取值范围为1-9，您传入的值为" + pai_ascii; //数牌只能是1-9
			switch (type) {
				case PaiTypeHash.Wanzi:
					this.pai_real_ascii = -1 + pai_ascii;
					break;
				case PaiTypeHash.Tongzi:
					this.pai_real_ascii = 8 + pai_ascii;
					break;
				case PaiTypeHash.Suozi:
					this.pai_real_ascii = 17 + pai_ascii;
					break;
			}
		}
		this.isRed = !!isRed;
	}
	/*
		获取牌的类型
		参数：
		无
		返回值：
		PaiTypeHash值的一种
	*/
	getType() {
		var v = this.pai_real_ascii;
		if (v < 9)
			return PaiTypeHash.Wanzi;
		if (v < 18)
			return PaiTypeHash.Tongzi;
		if (v < 27)
			return PaiTypeHash.Suozi;
		if (v < 31)
			return PaiTypeHash.Feng;
		return PaiTypeHash.Sanyuan;
	}
	/*
		判断牌是否是风牌
		参数：
		无
		返回值：
		是风牌时返回true，否则返回false
	*/
	isFengPai() {
		return PaiTypeHash.Feng == this.getType();
	}
	/*
		判断牌是否是三元牌
		参数：
		无
		返回值：
		是三元牌时返回true，否则返回false
	*/
	isSanyuanPai() {
		return PaiTypeHash.Sanyuan == this.getType();
	}
	/*
		判断牌是否是字牌
		参数：
		无
		返回值：
		是字牌时返回true，否则返回false
	*/
	isZiPai() {
		return this.isFengPai() || this.isSanyuanPai();
	}
	/*
		判断牌是否是老头牌
		参数：
		无
		返回值：
		是老头牌时返回true，否则返回false
	*/
	isLaotouPai() {
		return [0, 8, 9, 17, 18, 26].includes(this.pai_real_ascii);
	}
	/*
		判断牌是否是幺九牌
		参数：
		无
		返回值：
		是幺九牌时返回true，否则返回false
	*/
	isYaojiuPai() {
		return this.isZiPai() || this.isLaotouPai();
	}

	/*
		判断牌是否是役牌
		参数：
		state：State对象
		返回值：
		是役牌时返回true，否则返回false
	*/
	isYiPai(state) {
		if(!this.isZiPai()) //役牌是字牌
			return false;
		if(this.isSanyuanPai()) //三元牌一定是役牌
			return true;
		return state.changFeng == this.getPaiAscii() || state.ziFeng == this.getPaiAscii();
	}
	/*
		获取牌的数值
		参数：
		无
		返回值：
		数牌返回其数字，风牌返回东1南2西3北4，三元牌返回白1发2中3
	*/
	getPaiAscii() {
		var v = this.pai_real_ascii;
		if (v < 9)
			return v + 1;
		if (v < 18)
			return v - 8;
		if (v < 27)
			return v - 17;
		if (v < 31)
			return v - 26;
		return v - 30;
	}
	/*
		获取牌的名称
		参数：
		无
		返回值：
		RealNameHash的一种
	*/
	getNatureName() {
		return RealNameHash[this.pai_real_ascii];
	}
	/*
		获取该牌的宝牌价值（只计普通宝牌）
		参数：
		globalState：State对象
		返回值：
		如果不是普通宝牌则返回0，否则返回单个本牌计入的普通宝牌个数。
	*/
	getDoraCountNormal(globalState) {
		var ret = 0;
		globalState.dora.map((pai) => {
			if (pai.pai_real_ascii == this.pai_real_ascii)
				ret++;
		});
		return ret;
	}
	/*
		获取该牌的宝牌价值（只计里宝牌）
		参数：
		globalState：State对象
		返回值：
		如果不是里宝牌则返回0，否则返回单个本牌计入的里宝牌个数。
	*/
	getDoraCountLi(globalState) {
		var ret = 0;
		globalState.lidora.map((pai) => {
			if (pai.pai_real_ascii == this.pai_real_ascii)
				ret++;
		});
		return ret;
	}
	/*
		判断当前牌是否是赤dora
		参数：
		无
		返回值：
		是赤dora返回true，否则返回false
	*/
	isRedDora() {
		return this.isRed;
	}
	/*
		获取当前牌作为宝牌指示牌时的宝牌对象
		参数：
		无
		返回值：
		当前牌作为宝牌指示牌时的宝牌Pai对象
	*/
	getDoraNextPai() {
		if (this.isFengPai()) { //风牌时
			return new Pai(this.getType(), (this.getPaiAscii() + 1) > 4 ? 1 : (this.getPaiAscii() + 1));
		} else if (this.isSanyuanPai()) { //三元牌
			return new Pai(this.getType(), (this.getPaiAscii() + 1) > 3 ? 1 : (this.getPaiAscii() + 1));
		} else { //数牌
			return new Pai(this.getType(), (this.getPaiAscii() + 1) > 9 ? 1 : (this.getPaiAscii() + 1));
		}
	}
	/*
		根据real_ascii获取Pai对象的工厂方法
		参数：
		real_ascii：牌的real_ascii码
		返回值：
		Pai对象
	*/
	static fromRealAscii(v) {
		if (v > 33 || v < 0)
			throw "没有这种牌：" + v;
		var type;
		var ascii;
		if (v < 9) {
			type = PaiTypeHash.Wanzi;
			ascii = v + 1;
		} else if (v < 18) {
			type = PaiTypeHash.Tongzi;
			ascii = v - 8;
		} else if (v < 27) {
			type = PaiTypeHash.Suozi;
			ascii = v - 17;
		} else if (v < 31) {
			type = PaiTypeHash.Feng;
			ascii = v - 26;
		} else {
			type = PaiTypeHash.Sanyuan;
			ascii = v - 30;
		}
		return new Pai(type, ascii);
	}
}