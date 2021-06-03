/*
 *  役种类：纯正九莲宝灯
 *	役种类型：两倍役满
 *  役种番数：26
 *  和牌牌型：面子手牌型
 *  役种条件：九莲宝灯和牌条件下，除去和了牌的牌型为1112345678999。
 *  冲突役种：九莲宝灯
 */
import Yi from "../../../bean/Yi.js";
import Pai from "../../../bean/Pai.js";
import JiuLianBaoDeng from "../yi_man/JiuLianBaoDeng.js";
export default class ChunZhengJiuLianBaoDeng extends Yi {
	constructor() {
		super("ChunZhengJiuLianBaoDeng","纯正九莲宝灯",-2,[
			JiuLianBaoDeng //纯正九莲宝灯不计九莲宝灯
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
	static getCurrentYi(hePaiPaixing,state){
		var testHelePai = JiuLianBaoDeng.hasJiuLianBaoDeng(hePaiPaixing);
		if(!testHelePai)
			return [];
		if(state.isTianHe)
			return [new ChunZhengJiuLianBaoDeng()];
		if(testHelePai.pai_real_ascii == hePaiPaixing.helepai.pai_real_ascii)
			return [new ChunZhengJiuLianBaoDeng()];
		return [];
	}
};