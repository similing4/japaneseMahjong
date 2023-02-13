/*
 *  役种类：大竹林
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：不限
 *  役种条件：22334455667788s和牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class DaZhuLin extends Yi {
	constructor(hePaiPaixing) {
		super("DaZhuLin", "大竹林", -1, []);
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
		if (paiList.join(",") == "19,19,20,20,21,21,22,22,23,23,24,24,25,25")
			return [new DaZhuLin(hePaiPaixing)];
		return [];
	}
};
