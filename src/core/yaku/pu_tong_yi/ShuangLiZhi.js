/*
 *  役种类：双立直
 *	役种类型：普通役
 *  役种番数：2
 *  和牌牌型：不限
 *  役种条件：State的isLiangLiZhi为true
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class ShuangLiZhi extends Yi {
	constructor() {
		super("ShuangLiZhi","两立直",2,[]);
	}
	/*
		判断和牌牌型是否有当前役
		参数：
		hePaiPaixing：HePaiPaixing类型，和牌牌型
		state：State类型，状态对象
		返回值：
		有当前役返回该牌型具有的役的对象数组，否则返回空数组
	*/
	static getCurrentYi(hePaiPaixing,state){
		if(state.isLiangLiZhi)
			return [new ShuangLiZhi()];
		return [];
	}
};