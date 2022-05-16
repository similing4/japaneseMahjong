/*
 *	牌型解析类
 *	用于和牌向听数及和牌拆解的解析
 *	使用方法：
 *	var parser = new Parser(new Paixing(...));
 *	对象方法详见注释
 */

import Pai from "../bean/Pai.js";
import Paixing from "../bean/Paixing.js";
import HePaiPaixing from "../bean/HePaiPaixing.js";
import GuoShiWuShuangParser from "./GuoShiWuShuangParser.js";
import QiDuiZiParser from "./QiDuiZiParser.js";
import MianZiShouParser from "./MianZiShouParser.js";
import YakuCalculator from "./YakuCalculator.js";
class Parser {
	paixing; //传入的手牌
	/*
	 *	构造方法
	 *	参数：
	 *	paixing：牌型类型，应传入待判断的牌型
	 */
	constructor(paixing) {
		if (!(paixing instanceof Paixing))
			throw "paixing参数应为Paixing类型：" + paixing;
		this.paixing = paixing;
	}
	/*
	 *	计算向听数及推荐切牌
	 *	参数：
	 *  无
	 *  返回值如下：
	 *  {
	 		mianZiShou: { //面子手计算
		 		xiangTingCount: 1, //向听数，和牌与听牌均为0
		 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
		 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
		 	},
		 	qiDuiZi: { //七对子计算
		 		xiangTingCount: 1, //向听数，和牌与听牌均为0，鸣牌后该字段值为null
		 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
		 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
		 	},
		 	guoShiWuShuang: { //国士无双计算，鸣牌后该字段值为null
		 		xiangTingCount: 1, //向听数，和牌与听牌均为0
		 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
		 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
		 	},
		 	best: { //最佳
		 		xiangTingCount: 1, //向听数，和牌与听牌均为0
		 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
		 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
		 	},
			bestType: "MianZiShou" //最佳和牌类型
		}
	 *	错误：
	 *	当输入牌不合法时会throw错误，请注意catch
	 */
	calcXiangting() {
		var ret = {
			mianZiShou: null,
			qiDuiZi: null,
			guoShiWuShuang: null,
			best: null,
			bestType: "MianZiShou"
		};
		ret.mianZiShou = new MianZiShouParser(this.paixing.hand).calcXiangting();
		if (this.paixing.hand.length >= 13) {
			ret.guoShiWuShuang = new GuoShiWuShuangParser(this.paixing.hand).calcXiangting();
			ret.qiDuiZi = new QiDuiZiParser(this.paixing.hand).calcXiangting();
			var best = [{
				type: "GuoShiWuShuang",
				obj: ret.guoShiWuShuang
			}, {
				type: "QiDuiZi",
				obj: ret.qiDuiZi
			}, {
				type: "MianZiShou",
				obj: ret.mianZiShou
			}].sort((a, b) => {
				return a.obj.xiangTingCount - b.obj.xiangTingCount;
			})[0];
			ret.best = best.obj;
			ret.bestType = best.type;
		} else {
			ret.best = ret.mianZiShou;
		}
		return ret;
	}

	/*
	 *	获取YakuCalculator，当牌型不能和牌时返回false
	 *	参数：
	 *  无
	 *  返回值：
	 *  当牌型不能和牌时返回false，否则返回YakuCalculator对象用于计算役种及番符点数。
	 *	错误：
	 *	当输入牌不合法时会throw错误，请注意catch
	 */
	getYakuCalculator(state) {
		var mianZiShouParser = new MianZiShouParser(this.paixing.hand);
		var qiDuiZiParser = new QiDuiZiParser(this.paixing.hand);
		var guoShiWuShuangParser = new GuoShiWuShuangParser(this.paixing.hand);
		var mianZiShou = mianZiShouParser.calcMianzi();
		var hePaiPaixingList = [];
		if (mianZiShou) {
			try {
				mianZiShou.map((item) => {
					if (item.header.pai_real_ascii == this.paixing.hand[this.paixing.hand.length - 1]
						.pai_real_ascii) {
						//和了牌是雀头的情况
						hePaiPaixingList.push(new HePaiPaixing({
							type: "MianZiShou",
							helepai: this.paixing.hand[this.paixing.hand.length - 1],
							paiList: this.paixing.hand,
							header: item.header,
							hand: item.mianzi,
							fulu: this.paixing.fulu,
							hepaiMianziIndex: -1
						}));
					}
					item.mianzi.map((mianzi, mianziIndex) => {
						if (mianzi.getPaiList().map((pai) => {
								return pai.pai_real_ascii
							}).includes(this.paixing.hand[this.paixing.hand.length - 1]
								.pai_real_ascii))
							//和了牌是面子的情况
							hePaiPaixingList.push(new HePaiPaixing({
								type: "MianZiShou",
								helepai: this.paixing.hand[this.paixing.hand.length - 1],
								paiList: this.paixing.hand,
								header: item.header,
								hand: item.mianzi,
								fulu: this.paixing.fulu,
								hepaiMianziIndex: mianziIndex
							}));
					})
				});
			} catch (e) {}
		}
		if (this.paixing.fulu.length > 0) {
			if (hePaiPaixingList.length == 0)
				return false;
			return new YakuCalculator(hePaiPaixingList, state);
		}
		if (qiDuiZiParser.isHepai())
			try {
				hePaiPaixingList.push(new HePaiPaixing({
					type: "QiDuiZi",
					helepai: this.paixing.hand[this.paixing.hand.length - 1],
					paiList: this.paixing.hand,
					duiziList: qiDuiZiParser.getDuiZiList()
				}));
			} catch (e) {}
		if (guoShiWuShuangParser.isHepai())
			try {
				hePaiPaixingList.push(new HePaiPaixing({
					type: "GuoShiWuShuang",
					helepai: this.paixing.hand[this.paixing.hand.length - 1],
					paiList: this.paixing.hand
				}));
			} catch (e) {}
		if (hePaiPaixingList.length == 0)
			return false;
		return new YakuCalculator(hePaiPaixingList, state);
	}
}
export default Parser;
