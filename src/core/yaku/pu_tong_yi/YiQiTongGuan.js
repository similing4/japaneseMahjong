/*
 *  役种类：一气通贯
 *	役种类型：普通役
 *  役种番数：2（鸣牌1）
 *  和牌牌型：面子手牌型
 *  役种条件：和牌牌型中存在一色的数字为123、456、789的三个顺子
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class YiQiTongGuan extends Yi {
	constructor(hePaiPaixing) {
		super("YiQiTongGuan", "一气通贯", hePaiPaixing.isMenQianQing() ? 2 : 1, []);
	}
	/*
		判断和牌牌型是否有当前役
		参数：
		hePaiPaixing：HePaiPaixing类型，和牌牌型
		state：State类型，状态对象
		返回值：
		有当前役返回该牌型具有的役的对象数组，否则返回空数组
	*/
	static getCurrentYi(hePaiPaixing, state) {
		if (!hePaiPaixing.isMianZiShou())
			return []; //面子手和牌牌型才有可能有一气通贯
		var mianziList = hePaiPaixing.getAllMianzi();
		var mianziBasePai = {}; //对花色进行数字计数
		for (var i in mianziList) {
			if (!mianziList[i].isShunzi()) //只要顺子
				continue;
			var num = mianziList[i].basePai.getPaiAscii();
			if (![1, 4, 7].includes(num))
				continue;
			if (!mianziBasePai[mianziList[i].basePai.getType()])
				mianziBasePai[mianziList[i].basePai.getType()] = [];
			if (!mianziBasePai[mianziList[i].basePai.getType()].includes(num))
				mianziBasePai[mianziList[i].basePai.getType()].push(num); //没有就往里放
		}
		var val = Object.values(mianziBasePai); //取计数数值
		for (var i in val)
			if (val[i].length == 3)
				return [new YiQiTongGuan(hePaiPaixing)];
		return [];
	}
};