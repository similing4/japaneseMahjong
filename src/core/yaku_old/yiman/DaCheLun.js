/*
 *  役种类：大车轮
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：不限
 *  役种条件：22334455667788p和牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class DaCheLun extends Yi {
	constructor(hePaiPaixing) {
		super("DaCheLun", "大车轮", -1, []);
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
		if (paiList.join(",") == "10,10,11,11,12,12,13,13,14,14,15,15,16,16")
			return [new DaCheLun(hePaiPaixing)];
		return [];
	}
};
