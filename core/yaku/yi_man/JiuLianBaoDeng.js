/*
 *  役种类：九莲宝灯
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：面子手牌型
 *  役种条件：门前清状态下，和牌牌型中包含1112345678999的一色牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
import Pai from "../../../bean/Pai.js";
const jiuLianBaoDengPaiList = [1,1,1,2,3,4,5,6,7,8,9,9,9];
export default class JiuLianBaoDeng extends Yi {
	constructor() {
		super("JiuLianBaoDeng","九莲宝灯",-1,[]);
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
		if(JiuLianBaoDeng.hasJiuLianBaoDeng(hePaiPaixing))
			return [new JiuLianBaoDeng()];
		return [];
	}
	/*
		判断牌是否有九莲宝灯格式
		参数：
		hePaiPaixing：HePaiPaixing类型，和牌牌型
		返回值：
		有返回九莲宝灯牌型外的牌，可用于判断是否是纯正九莲宝灯，否则返回false。
	*/
	static hasJiuLianBaoDeng(hePaiPaixing){
		if(!hePaiPaixing.isMianZiShou())
			return false; //只有面子手有九莲宝灯
		if(hePaiPaixing.fulu.length > 0)
			return false; //不能开杠！不能有任何副露！
		var paiType = hePaiPaixing.paiList[0].getType();
		if(paiType == "Feng" || paiType == "Sanyuan")
			return false; //排除字一色情况
		if(hePaiPaixing.paiList.filter((pai)=>{ return pai.getType() == paiType; }).length != hePaiPaixing.paiList.length)
			return false; //排除非清一色的情况
		var allPaiAscii = []; //获取全部的牌的数字
		hePaiPaixing.paiList.map((pai)=>{
			allPaiAscii.push(pai.getPaiAscii());
		});
		for(var i in jiuLianBaoDengPaiList){
			var index = allPaiAscii.indexOf(jiuLianBaoDengPaiList[i]);
			if(index == -1)
				return false; //不符合九莲宝灯要求
			allPaiAscii.splice(index,1);
		}
		return new Pai(paiType,allPaiAscii[0]);
	}
};