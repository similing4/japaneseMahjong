/*
 *	国士无双牌型解析类
 *	用于国士无双和牌向听数及和牌拆解的解析
 *	使用方法：
 *	var parser = new GuoShiWuShuangParser([
 		new Pai("Wanzi",1),
 		new Pai("Wanzi",9),
 		new Pai("Tongzi",1),
 		new Pai("Tongzi",9),
 		new Pai("Suozi",1),
 		new Pai("Suozi",9),
 		new Pai("Feng",1),
 		new Pai("Feng",2),
 		new Pai("Feng",3),
 		new Pai("Feng",4),
 		new Pai("Sanyuan",1),
 		new Pai("Sanyuan",2),
 		new Pai("Sanyuan",3),
 		new Pai("Sanyuan",3),
 	]);
 *	对象方法详见注释
 */

import Pai from "../bean/Pai.js";
const PaiState = {
	Discard: "DISCARD", //待出牌状态或自摸/荣和状态
	Deal: "DEAL" //待摸牌状态
};
const guoshiNums = [0, 8, 9, 17, 18, 26, 27, 28, 29, 30, 31, 32, 33];
class GuoShiWuShuangParser {
	paiList; //传入的手牌
	/*
	 *	构造方法
	 *	参数：
	 *	paiList：手牌数组，应传入Pai对象的数组
	 */
	constructor(paiList) {
		this.paiList = paiList;
	}
	/*
	 *	计算向听数
	 *	参数：
	 *  无
	 *  返回值如下：
	 *  {
	 		xiangTingCount: 1, //向听数，和牌与听牌均为0
	 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
	 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
	 	}
	 *	错误：
	 *	当输入牌不合法时会throw错误，请注意catch
	 */
	calcXiangting() {
		if (this.paiList.length < 13)
			throw "国士无双在鸣牌后不能计算向听数与牌效";
		let paiAsciiList = this.paiList.map((pai) => {
			return pai.pai_real_ascii;
		});
		let check = guoshiNums.map((t) => {
			return {
				pai: Pai.fromRealAscii(t),
				has: paiAsciiList.includes(t)
			}
		});
		let ret = {};
		ret.xiangTingCount = check.filter((t) => !t.has).length - 1;
		if (ret.xiangTingCount < 0)
			ret.xiangTingCount = 0;
		if (this.paiList.length == 13) {
			ret.paiState = PaiState.Deal
			ret.divideResult = check.filter((t) => !t.has).map((t) => t.pai);
			if (ret.divideResult.length == 0)
				ret.divideResult = check.map((t) => t.pai);
		} else {
			let wuxiaopai = paiAsciiList.filter((t) => !guoshiNums.includes(t));
			let multi = guoshiNums.filter((t) => paiAsciiList.filter((s) => s == t).length > 1);
			if (multi.length > 1)
				wuxiaopai = wuxiaopai.concat(multi);
			ret.paiState = PaiState.Discard;
			ret.divideResult = wuxiaopai.map((t) => Pai.fromRealAscii(t));
		}
		return ret;
	}
	/*
	 * 判断是否和牌
	 * 参数：
	 * 无
	 * 返回值：
	 * 和牌了返回true，否则返回false
	 */
	isHepai() {
		if (this.paiList.length < 14)
			return false;
		var xiangting = this.calcXiangting();
		return xiangting.xiangTingCount <= 0 && xiangting.divideResult.length == 0;
	}
}
export default GuoShiWuShuangParser;
