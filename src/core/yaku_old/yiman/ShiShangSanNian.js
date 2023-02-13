/*
 *  役种类：石上三年
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：不限
 *  役种条件：两立直海底捞月和牌或两立直河底捞鱼和牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class ShiShangSanNian extends Yi {
	constructor() {
		super("ShiShangSanNian", "石上三年", -1, []);
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
		if (state.isLast && state.isLiangLiZhi)
			return [new ShiShangSanNian()];
		return [];
	}
};
