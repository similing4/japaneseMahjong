/*
 *  役种类：小四喜
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：面子手牌型
 *  役种条件：和牌牌型中有东、南、西、北四种牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class XiaoSiXi extends Yi {
	constructor() {
		super("XiaoSiXi","小四喜",-1,[]);
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
		if(!hePaiPaixing.isMianZiShou())
			return []; //只有面子手有小四喜
		var paiList = hePaiPaixing.getPaiList(); //拿到所有牌
		var feng = [];//记录有风牌的种数
		for(var i in paiList)
			if(paiList[i].isFengPai() && !feng.includes(paiList[i].pai_real_ascii))
				feng.push(paiList[i].pai_real_ascii);
		if(feng.length == 4)
			return [new XiaoSiXi()];
		return [];
	}
};