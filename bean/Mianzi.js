/*
 *	面子类（包含顺子、刻子、杠子等）
 *	用于牌的记录与获取牌面子的各种基本属性的类
 *	使用方法：
 *	var mianzi = new Mianzi("Shunzi",false,new Pai("Tongzi",7));
 *	对象方法详见注释
 */
import Pai from "./Pai.js"
const MianziTypeHash = {
	Shunzi: "Shunzi",
	Kezi: "Kezi",
	Gangzi: "Gangzi"
};
export default class Mianzi {
	basePai; // 基础牌，当面子为刻子或杠子的时候，该牌表示刻子或杠子对应的牌。当面子为顺子的时候，该牌表示顺子的第一张牌。
	isFulu; // Boolean类型，意为该面子是否破坏门前清。
	type; // String类型，为MianziTypeHash值的其中之一，标识该面子是的类型。
	/*
		构造方法
		参数：
		type：面子的种类，"Shunzi"为顺子，"Kezi"为刻子，"Gangzi"为杠子
		isFulu：该面子是否破坏门前清。暗杠此处应传false，除暗杠外其余进入副露区的面子此处应传true。
		pai：牌对象，当面子为刻子或杠子的时候，该牌表示刻子或杠子对应的牌，当面子为顺子的时候，该牌表示顺子的第一张牌。
		错误：
		当type或pai传入错误值时会throw对应的错误提示字符串。
	*/
	constructor(type, isFulu, pai) {
		if(!(pai instanceof Pai))
			throw "第三个参数应为Pai类型的参数：" + pai;
		if (!Object.values(MianziTypeHash).includes(type))
			throw "面子种类传入不正确，应传入" + JSON.stringify(Object.values(MianziTypeHash)) + "之一";
		this.type = type;
		this.isFulu = !!isFulu;
		if(type == MianziTypeHash.Shunzi){
			if(pai.isZiPai())
				throw "顺子不能传入字牌，您传入的牌为" + pai.getNatureName();
			if(pai.getPaiAscii() > 7)
				throw "顺子不能传入大于7的数牌，您传入的牌为：" + pai.getNatureName();
		}
		this.basePai = pai;
	}
	/*
		判断该面子是否是刻子
		参数：
		无
		返回值：
		是刻子时返回true，否则返回false
	*/
	isKezi(){
		return this.type == MianziTypeHash.Kezi || this.type == MianziTypeHash.Gangzi;
	}
	/*
		判断该面子是否是杠子
		参数：
		无
		返回值：
		是杠子时返回true，否则返回false
	*/
	isGangzi(){
		return this.type == MianziTypeHash.Kezi || this.type == MianziTypeHash.Gangzi;
	}
	/*
		判断该面子是否是顺子
		参数：
		无
		返回值：
		是顺子时返回true，否则返回false
	*/
	isShunzi(){
		return this.type == MianziTypeHash.Shunzi;
	}
	/*
		判断该面子是否是暗刻
		参数：
		无
		返回值：
		是暗刻时返回true，否则返回false
	*/
	isAnke(){
		if(this.type == MianziTypeHash.Shunzi)
			return false;
		return !this.isFulu;
	}
}