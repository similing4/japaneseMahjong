/*
 *  役种类：十二落抬
 *	役种类型：普通役（古役）
 *  役种番数：1
 *  和牌牌型：不限
 *  役种条件：四副露和牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class ShiErLuoTai extends Yi {
	constructor(hePaiPaixing) {
		super("ShiErLuoTai", "十二落抬", 1, []);
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
		if (hePaiPaixing.fulu.length == 4)
			return [new ShiErLuoTai(hePaiPaixing)];
		return [];
	}
};