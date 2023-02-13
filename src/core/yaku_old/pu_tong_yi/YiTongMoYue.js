/*
 *  役种类：一筒摸月
 *	役种类型：普通役
 *  役种番数：5
 *  和牌牌型：不限
 *  役种条件：海底捞月且和牌为1筒
 *  冲突役种：海底捞月
 */
import Yi from "../../../bean/Yi.js";
import HaiDiLaoYue from "../../yaku/pu_tong_yi/HaiDiLaoYue.js";
export default class YiTongMoYue extends Yi {
	constructor() {
		super("YiTongMoYue", "一筒摸月", 5, [
			HaiDiLaoYue
		]);
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
		if (state.isLast && state.isZimo && hePaiPaixing.helepai.pai_real_ascii == 9)
			return [new YiTongMoYue()];
		return [];
	}
};
