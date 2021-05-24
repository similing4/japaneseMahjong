/*
 *  役种类：国士无双
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：国士无双牌型
 *  役种条件：国士无双牌型和牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class GuoShiWuShuang extends Yi {
	constructor() {
		super("GuoShiWuShuang","国士无双",-1,[]);
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
		if(hePaiPaixing.isGuoShiWuShuang())
			return [new GuoShiWuShuang()];
		return [];
	}
};