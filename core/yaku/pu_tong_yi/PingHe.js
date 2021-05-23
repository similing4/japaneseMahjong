/*
 *  役种类：平和
 *  役种类型：普通役
 *  役种番数：1
 *  和牌牌型：面子手牌型
 *  役种条件：门前清状态下，和牌牌型中所有面子都是顺子，雀头不是役牌，听牌方式不能加符
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class PingHe extends Yi {
	constructor() {
		super("PingHe","平和",1,[]);
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
		if(!hePaiPaixing.isMenQianQing())
			return []; //只有门前清有平和
		if(!hePaiPaixing.isMianZiShou())
			return []; //只有面子手有平和
		if(hePaiPaixing.header.isYiPai(state))
			return []; //平和雀头不能是役牌
		var mianziList = hePaiPaixing.getAllMianzi(); //拿到所有面子
		for(var i in mianziList) //所有面子都是顺子
			if(!mianziList[i].isShunzi())
				return [];
		if(hePaiPaixing.hepaiMianziIndex == -1)
			return []; //平和不能雀头单骑
		var paiList = hePaiPaixing.hand[hePaiPaixing.hepaiMianziIndex].getPaiList();
		if(paiList[1].pai_real_ascii == hePaiPaixing.helepai.pai_real_ascii)
			return []; //听牌是坎张
		if(paiList[0].getPaiAscii() == 1 && hePaiPaixing.helepai.getPaiAscii() == 3)
			return []; //听牌是边张
		if(paiList[2].getPaiAscii() == 9 && hePaiPaixing.helepai.getPaiAscii() == 7)
			return []; //听牌是边张
		return [new PingHe()];
	}
};