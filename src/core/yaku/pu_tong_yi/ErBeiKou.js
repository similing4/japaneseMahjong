/*
 *  役种类：二盃口
 *	役种类型：普通役
 *  役种番数：3
 *  和牌牌型：面子手牌型
 *  役种条件：门前清状态下，和牌牌型中所有面子都是顺子，且四组顺子其中两组是相同的，另外两组也是相同的
 *  冲突役种：一盃口
 */
import Yi from "../../../bean/Yi.js";
import YiBeiKou from "./YiBeiKou.js";
export default class ErBeiKou extends Yi {
	constructor() {
		super("ErBeiKou","二盃口",3,[
			YiBeiKou
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
		if(!hePaiPaixing.isMenQianQing())
			return []; //只有门前清有二盃口
		if(!hePaiPaixing.isMianZiShou())
			return []; //只有面子手有二盃口
		var mianziList = hePaiPaixing.getAllMianzi(); //拿到所有面子
		var mianziBasePai = {};
		for(var i in mianziList){ //所有面子都是顺子，对顺子进行计数
			if(!mianziList[i].isShunzi())
				return [];
			if(!mianziBasePai[mianziList[i].basePai.pai_real_ascii])
				mianziBasePai[mianziList[i].basePai.pai_real_ascii] = 0;
			mianziBasePai[mianziList[i].basePai.pai_real_ascii] ++;
		}
		var val = Object.values(mianziBasePai); //取计数数值，为2组顺子且每组有两个，或1组顺子每组有4个
		if(val.length > 2)
			return [];
		if(val.length == 1)
			return [new ErBeiKou()];
		for(var i in val)
			if(val[i] != 2)
				return [];
		return [new ErBeiKou()];
	}
};