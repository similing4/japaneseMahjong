/*
 *  役种类：小三元
 *	役种类型：普通役
 *  役种番数：2
 *  和牌牌型：面子手牌型
 *  役种条件：和牌牌型中有中、发、白三种牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class XiaoSanYuan extends Yi {
	constructor() {
		super("XiaoSanYuan","小三元",2,[]);
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
			return []; //只有面子手有小三元
		var paiList = hePaiPaixing.getPaiList(); //拿到所有牌
		var sanyuan = [];//记录有三元牌的种数
		for(var i in paiList)
			if(paiList[i].isSanyuanPai() && !sanyuan.includes(paiList[i].pai_real_ascii))
				sanyuan.push(paiList[i].pai_real_ascii);
		if(sanyuan.length == 3)
			return [new XiaoSanYuan()];
		return [];
	}
};