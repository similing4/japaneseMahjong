/*
 *  役种类：大数邻
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：不限
 *  役种条件：22334455667788m和牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class DaShuLin extends Yi {
	constructor(hePaiPaixing) {
		super("DaShuLin", "大数邻", -1, []);
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
		if (paiList.join(",") == "1,1,2,2,3,3,4,4,5,5,6,6,7,7")
			return [new DaShuLin(hePaiPaixing)];
		return [];
	}
};
