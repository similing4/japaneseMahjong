/*
 *  役种类：九筒捞鱼
 *	役种类型：普通役
 *  役种番数：5
 *  和牌牌型：不限
 *  役种条件：河底捞鱼且和牌为9筒
 *  冲突役种：河底捞鱼
 */
import Yi from "../../../bean/Yi.js";
import HeDiLaoYu from "../../yaku/pu_tong_yi/HeDiLaoYu.js";
export default class JiuTongLaoYu extends Yi {
	constructor() {
		super("JiuTongLaoYu", "九筒捞鱼", 5, [
			HeDiLaoYu
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
		if (state.isLast && !state.isZimo && hePaiPaixing.helepai.pai_real_ascii == 17)
			return [new JiuTongLaoYu()];
		return [];
	}
};
