/*
 *  役种类：一色三同顺
 *	役种类型：普通役
 *  役种番数：3
 *  和牌牌型：面子手牌型
 *  役种条件：包含三个完全相同的顺子
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class YiSeSanTongShun extends Yi {
	constructor() {
		super("YiSeSanTongShun", "一色三同顺", 3, []);
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
			return []; //面子手和牌牌型才有可能一色三同顺
		var shunziPaiList = [];
		var all = hePaiPaixing.getAllMianzi();
		for (var i in all)
			if (all[i].isShunzi())
				shunziPaiList.push(all[i].basePai.pai_real_ascii);
		for (var i in shunziPaiList)
			if (shunziPaiList.filter((t) => t == shunziPaiList[i]).length >= 3)
				return [new YiSeSanTongShun()];
		return [];
	}
};
