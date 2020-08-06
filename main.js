const maj = require('./majhong.js');
const yaojiu = [maj.MAN1,maj.MAN9,maj.PIN1,maj.PIN9,maj.SOU1,maj.SOU9,maj.TON,maj.NAN,maj.SHA,maj.PEI,maj.HAK,maj.HAT,maj.CHU];
/*
* 计算役种
* 参数：
* handMajList：手牌，长度应为2,5,8,11,14，最后一张牌应当是自摸或荣和的牌
* fuluMajList: 副露牌，格式范例：
*
[
	{
		type: "shunzi",
		maj: [maj.MAN2, maj.MAN3,maj.MAN4]
	},
	{
		type: "kezi",
		maj: [maj.MAN2]
	},
	{
		type: "gangzi",
		maj: [maj.MAN2]
	},
]
* config：JSON，配置各种条件，如立直。范例：
{
	isLiZhi: false, //是否立直
	isYiFa: false, //是否一发
	isLingShang: false, //是否领上
	ziFeng: maj.TON, //自风
	changFeng: maj.TON, //场风
	isZimo: false, //是否自摸 
	isLast: false, //是否是河底/海底
	isQiangGang: false, //是否是抢杠
}
* 返回值：
*/
function calcYaku(handMajList,fuluMajList,config){
	var hasYaku = [];
	var s = maj.calc(handMajList);
	var rongMaj = handMajList[handMajList.length-1];
	for(var i in s){
		var t = calcYakuHai(s[i],fuluMajList,config);
		console.log(t);
	}

}
/*
* 判断是否是断幺九
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合断幺九返回true，否则返回false
*/
function isDuanYao(handMajList,fuluMajList){
	for(var i in handMajList)
		if(yaojiu.indexOf(handMajList[i])!=-1)
			return false;
	for(var i in fuluMajList)
		for(var j in fuluMajList[i].maj)
			if(yaojiu.indexOf(fuluMajList[i].maj[j])!=-1)
				return false;
	return true;
}
/*
* 判断某张牌是否是役牌
* 参数：
* maj：待判断的牌
* config：配置，详见calcYaku
*/
function isYakuHai(maj,config){
	if(maj == config.ziFeng)
		return true;
	if(maj == config.changFeng)
		return true;
	if(maj == maj.HAK)
		return true;
	if(maj == maj.HAT)
		return true;
	if(maj == maj.CHU)
		return true;
}
/*
* 判断是否是平和
* 参数：
* rongMaj：荣和或者自摸的牌
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：符合平和返回true，否则返回false
*/
function isPinghe(rongMaj,mianzi,fuluMajList,config){
	if(fuluMajList.length > 0)
		return false; //门前清限定
	if(isYakuHai(mianzi.header,config))
		return false; //雀头不能是役牌
	if(mianzi.kezi.length>0)
		return false; //必须全是顺子
	var doubleTing = [];//两面听可能的牌
	for(var i in mianzi.shunzi){
		doubleTing.push(mianzi.shunzi[i]);
		doubleTing.push(mianzi.shunzi[i]+2);
	}
	if(doubleTing.indexOf(rongMaj) == -1)
		return false;//必须是顺子的两面听
	return true;
}
/*
* 判断是否是立直
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合立直返回true，否则返回false
*/
function isLiZhi(config){
	return config.isLiZhi;
}
/*
* 判断是否是一发
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合一发返回true，否则返回false
*/
function isYiFa(config){
	return config.isYiFa;
}
/*
* 判断是否是门前清自摸
* 参数：
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：符合门前清自摸返回true，否则返回false
*/
function isZimo(fuluMajList,config){
	if(fuluMajList.length > 0)
		return false; //门前清限定
	return config.isZimo;
}
/*
* 判断是否是一杯口
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：符合一杯口返回true，否则返回false
*/
function isYiBeiKou(mianzi,fuluMajList,config){
	if(fuluMajList.length > 0)
		return false; //门前清限定
	var map = mianzi.shunzi.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map()) //对顺子头计数
	ret = false;
	map.forEach(function(count,key){
		if(count>=2)
			ret = true; // 顺子重复次数大于等于2即为一杯口
	})
	return ret;
}

/*
* 获取当前和牌种包含的役牌役数组
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：没有役牌返回空数组[]，有役牌返回对应的役牌，如[maj.TON,maj.TON]为连风牌东
*/
function calcYakuHai(mianzi,fuluMajList,config){
	var ret = [];
	for(var i in mianzi.kezi){
		if(isYakuHai(mianzi.kezi[i],config))
			ret.push(mianzi.kezi[i]);//手牌役牌
		if(mianzi.kezi[i]==config.ziFeng&&mianzi.kezi[i]==config.changFeng)
			ret.push(mianzi.kezi[i]);//连风牌
	}
	for(var i in fuluMajList){
		if(fuluMajList[i].type=="kezi"||fuluMajList[i].type=="gangzi"){
			if(isYakuHai(fuluMajList[i].maj[0],config))
				ret.push(fuluMajList[i].maj[0]);//副露役牌
			if(fuluMajList[i].maj[0]==config.ziFeng&&fuluMajList[i].maj[0]==config.changFeng)
				ret.push(fuluMajList[i].maj[0]);//副露连风牌
		}
	}
	return ret;
}
/*
* 判断是否是海底捞月
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合海底捞月返回true，否则返回false
*/
function isHaidi(config){
	return config.isZimo&&config.isLast;
}
/*
* 判断是否是河底捞鱼
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合河底捞鱼返回true，否则返回false
*/
function isHedi(config){
	return (!config.isZimo)&&config.isLast;
}
/*
* 判断是否是抢杠
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合抢杠返回true，否则返回false
*/
function isHedi(config){
	return config.isQiangGang;
}
/*
* 判断是否是领上开花
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合领上开花返回true，否则返回false
*/
function isLingShang(config){
	return config.isLingShang;
}


calcYaku(
	[maj.TON, maj.TON, maj.TON, maj.MAN3, maj.MAN3, maj.MAN4, maj.MAN4, maj.MAN5, maj.MAN5, maj.MAN7, maj.MAN7, maj.MAN8, maj.MAN8, maj.MAN8],[],{
		isLiZhi: false, //是否立直
		isYiFa: false, //是否一发
		isLingShang: false, //是否领上
		ziFeng: maj.TON, //自风
		changFeng: maj.TON, //场风
		isZimo: false, //是否自摸 
		isLast: false, //是否是河底/海底
		isQiangGang: false, //是否是抢杠
	}
);






/*
一气通贯
三色同顺
混全带幺九
七对子
对对和
三色同刻
三暗刻
三杠子
双立直
混老头
小三元
纯全带幺九
混一色
二杯口
清一色

国士无双
四暗刻
大三元
小四喜
字一色
绿一色
清老头
九莲宝灯
四杠子
天和
地和

国士无双十三面
四暗刻单骑
大四喜
纯正九莲宝灯
*/
