/*
 *  役种类：杠振
 *	役种类型：普通役
 *  役种番数：1
 *  和牌牌型：不限
 *  役种条件：State的isGangZhen为true（荣和别家杠后弃牌）
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class GangZhen extends Yi {
	constructor() {
		super("GangZhen","杠振",1,[]);
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
		if(state.isGangZhen)
			return [new GangZhen()];
		return [];
	}
};