/*
 *  役种类：燕返
 *	役种类型：普通役
 *  役种番数：1
 *  和牌牌型：不限
 *  役种条件：State的isYanFan为true（荣和别家的立直宣言牌）
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class YanFan extends Yi {
	constructor() {
		super("YanFan","燕返",1,[]);
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
		if(state.isYanFan)
			return [new YanFan()];
		return [];
	}
};