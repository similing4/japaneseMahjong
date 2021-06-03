/*
 *  役种类：国士无双十三面
 *	役种类型：两倍役满
 *  役种番数：26
 *  和牌牌型：国士无双牌型
 *  役种条件：国士无双牌型和牌，且和了牌是对子
 *  冲突役种：国士无双
 */
import Yi from "../../../bean/Yi.js";
import GuoShiWuShuang from "../yi_man/GuoShiWuShuang.js";
export default class GuoShiWuShuangShiSanMian extends Yi {
	constructor() {
		super("GuoShiWuShuangShiSanMian","国士无双十三面",-2,[
			GuoShiWuShuang
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
		if(hePaiPaixing.isGuoShiWuShuang()){
			if(state.isTianHe)
				return [new GuoShiWuShuangShiSanMian()];
			if(hePaiPaixing.paiList.filter((pai)=>{
				return pai.pai_real_ascii == hePaiPaixing.helepai.pai_real_ascii
			}).length == 2)
				return [new GuoShiWuShuangShiSanMian()];
			return []
		}
		return [];
	}
};