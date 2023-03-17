/*
 *  役种类：大七星
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：不限
 *  役种条件：字一色七对子和牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class DaQiXing extends Yi {
	constructor(hePaiPaixing) {
		super("DaQiXing", "大七星", -1, []);
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
		var paiList = hePaiPaixing.getPaiList().map((t) => t.pai_real_ascii).sort();
		if (paiList.join(",") == "27,27,28,28,29,29,30,30,31,31,32,32,33,33")
			return [new DaQiXing(hePaiPaixing)];
		return [];
	}
};
