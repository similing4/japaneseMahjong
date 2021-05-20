/*
 *	七对子牌型解析类
 *	用于七对子和牌向听数及和牌拆解的解析
 *	使用方法：
 *	var parser = new QiDuiZiParser([
 		new Pai("Wanzi",1),
 		new Pai("Wanzi",1),
 		new Pai("Tongzi",1),
 		new Pai("Tongzi",1),
 		new Pai("Suozi",1),
 		new Pai("Suozi",1),
 		new Pai("Feng",1),
 		new Pai("Feng",1),
 		new Pai("Feng",4),
 		new Pai("Feng",4),
 		new Pai("Sanyuan",2),
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
class QiDuiZiParser {
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
			throw "七对子在鸣牌后不能计算向听数与牌效";
		var hand = [
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0
		];
		var rest = [
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4
		];
		this.paiList.map((pai) => {
			hand[pai.pai_real_ascii]++;
			rest[pai.pai_real_ascii]--;
			if (rest[pai.pai_real_ascii] < 0)
				throw "输入的牌数不正确";
		});
		var ret = {};
		var danZhangPai = []; //单张牌
		var sanZhangYiShang = []; //三张以上的牌
		var youxiaopai = [];
		var wuxiaopai = [];
		var xiangting = hand.reduce((sum, count, pai_real_ascii) => {
			if (pai_real_ascii == 1 && hand[0] >= 2) { //每有一个对子向听数就减1
				sum = 1;
				if (count > 2)
					sanZhangYiShang.push(Pai.fromRealAscii(pai_real_ascii));
				if (count == 1)
					danZhangPai.push(Pai.fromRealAscii(pai_real_ascii));
			}
			if (count >= 2) {
				sum++;
			}
			if (count > 2)
				sanZhangYiShang.push(Pai.fromRealAscii(pai_real_ascii));
			if (count == 1)
				danZhangPai.push(Pai.fromRealAscii(pai_real_ascii));
			return sum;
		});
		ret.xiangTingCount = (xiangting == 7 ? 0 : (6 - xiangting));
		if (danZhangPai.length == 0 && sanZhangYiShang > 0) //没有单张牌但是有三张以上的，手牌不存在的牌都是有效牌
			youxiaopai = hand.map((count, pai_real_ascii) => {
				return count == 0 ? Pai.fromRealAscii(pai_real_ascii) : -1;
			}).filter((item) => {
				return item != -1;
			});
		if (sanZhangYiShang.length > danZhangPai.length) { //三张以上的数量超过了单张牌的数量，此时向听数加三张以上牌的数量-1
			ret.xiangTingCount - 1 + hand.reduce((sum, count, index) => {
				if (index == 1)
					return Math.max(sum - 2, 0);
				return sum + Math.max(count - 2, 0);
			});
			youxiaopai = danZhangPai;
			wuxiaopai = sanZhangYiShang;
		} else {
			youxiaopai = danZhangPai;
			wuxiaopai = sanZhangYiShang.concat(danZhangPai);
		}
		if (this.paiList.length == 13) {
			ret.paiState = PaiState.Deal
			ret.divideResult = youxiaopai;
		} else {
			ret.paiState = PaiState.Discard;
			ret.divideResult = wuxiaopai;
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
		if (this.paiList.length < 13)
			return false;

	}
}
export default QiDuiZiParser;