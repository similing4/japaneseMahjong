const maj = require('./majhong.js');
const yaojiu = [maj.MAN1, maj.MAN9, maj.PIN1, maj.PIN9, maj.SOU1, maj.SOU9, maj.TON, maj.NAN, maj.SHA, maj.PEI, maj.HAK,
	maj.HAT, maj.CHU
];
const ziMaj = [maj.TON, maj.NAN, maj.SHA, maj.PEI, maj.HAK, maj.HAT, maj.CHU];
const laotouMaj = [maj.MAN1, maj.MAN9, maj.PIN1, maj.PIN9, maj.SOU1, maj.SOU9];
const sanYuanMaj = [maj.HAK, maj.HAT, maj.CHU];
const siXiMaj = [maj.TON, maj.NAN, maj.SHA, maj.PEI];
const greenMaj = [maj.SOU2, maj.SOU3, maj.SOU4, maj.SOU6, maj.SOU8, maj.HAT];
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
	{
		type: "angang",
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
	isTianHe: false, //是否是天和
	isDiHe: false, //是否是地和
	dora: [MAN1], //宝牌指示牌
	liDora: [MAN1], //里宝牌指示牌
	redDora: 0 //赤宝牌个数
}
* 返回值：
* 当牌型为和牌牌型且有役时返回：{
	fan: 5, //番数
	fu: 20, //符数
	point: 8000, //点数
	yakuList:[
		{
			yaku: "断幺九",
			fan: 1
		}
	]
}
* 当牌型为和牌但无役时返回“无役”字符串
* 当牌型不是和牌牌型时返回false
*/
function calcYaku(handMajList, fuluMajList, config) {
	var mianzi = maj.calc(handMajList);
	var ret = {
		fan: 0,
		fu: 0,
		yakuList: [],
		fuList: []
	};
	var isYakuManVar = false;
	if (isQiDuiZi(handMajList, fuluMajList) && (!mianzi || mianzi.length == 0 || (mianzi[0].shunzi.length == 0 && mianzi[0]
			.kezi.length == 0))) { //七对子和牌牌型
		ret.fu = 25; //七对子25符
		ret.fuList.push("七对子固定25符");
		if (isTianHe(config)) {
			ret.fan = 13;
			ret.yakuList.push({
				yaku: "天和",
				fan: 13
			});
		} else if (isDiHe(config)) {
			ret.fan = 13;
			ret.yakuList.push({
				yaku: "地和",
				fan: 13
			});
		} else {
			ret.yakuList.push({
				yaku: "七对子",
				fan: 2
			});
			ret.fan += 2;
			if (isLiZhi(config)) {
				if (isDoubleLiZhi(config)) {
					ret.yakuList.push({
						yaku: "两立直",
						fan: 2
					});
					ret.fan += 2;
				} else {
					ret.yakuList.push({
						yaku: "立直",
						fan: 1
					});
					ret.fan += 1;
				}
			}
			if (isYiFa(config)) {
				ret.yakuList.push({
					yaku: "一发",
					fan: 1
				});
				ret.fan += 1;
			}
			if (isZimo(fuluMajList, config)) {
				ret.yakuList.push({
					yaku: "门前清自摸",
					fan: 1
				});
				ret.fan += 1;
			}
			if (isLingShang(config)) {
				ret.yakuList.push({
					yaku: "岭上开花",
					fan: 1
				});
				ret.fan += 1;
			}
			if (isHaidi(config)) {
				ret.yakuList.push({
					yaku: "海底捞月",
					fan: 1
				});
				ret.fan += 1;
			}
			if (isHedi(config)) {
				ret.yakuList.push({
					yaku: "河底捞鱼",
					fan: 1
				});
				ret.fan += 1;
			}
			if (isDuanYao(handMajList, fuluMajList)) {
				ret.yakuList.push({
					yaku: "断幺九",
					fan: 1
				});
				ret.fan += 1;
			}
			if (isQingYiSe(handMajList, fuluMajList)) {
				ret.yakuList.push({
					yaku: "清一色",
					fan: 6
				});
				ret.fan += 6;
			} else if (isHunYiSe(handMajList, fuluMajList)) {
				ret.yakuList.push({
					yaku: "混一色",
					fan: 3
				});
				ret.fan += 3;
			}
			if (isHunLaoTou(handMajList, mianzi, fuluMajList)) {
				ret.yakuList.push({
					yaku: "混老头",
					fan: 2
				});
				ret.fan += 2;
			}
		}
	} else if (mianzi) { //面子手和牌牌型
		var retList = [];
		for (var i in mianzi)
			retList.push(calcMianzi(mianzi[i], handMajList, fuluMajList, config));
		retList.sort(function(a, b) {
			if (b.fan == a.fan)
				return b.fu - a.fu;
			return b.fan - a.fan;
		});
		ret = retList[0];
		ret.fuList = [];
		isYakuManVar = ret.isYakuMan;
	} else if (isGuoShi(handMajList, fuluMajList)) { //国士无双和牌牌型
		isYakuManVar = true;
		ret.fu = 25; //国士无双25符
		ret.fuList.push("国士无双固定25符");
		if (isGuoShiShiSanMian(handMajList, fuluMajList)) {
			ret.fan = 26;
			ret.yakuList.push({
				yaku: "国士无双十三面",
				fan: 26
			});
		} else {
			ret.fan = 13;
			ret.yakuList.push({
				yaku: "国士无双",
				fan: 13
			});
		}
		if (isTianHe(config)) {
			ret.yakuList.push({
				yaku: "天和",
				fan: 13
			});
			ret.fan += 13;
		}
		if (isDiHe(config)) {
			ret.yakuList.push({
				yaku: "地和",
				fan: 13
			});
			ret.fan += 13;
		}
	}
	if(mianzi === false && ret.fan == 0)
		return false;
	if (ret.fan == 0)
		return "无役";
	var majAllList = [];
	majAllList = majAllList.concat(handMajList);
	for (var i in fuluMajList) {
		switch (fuluMajList[i].type) {
			case "shunzi":
				majAllList = majAllList.concat(fuluMajList[i].maj);
				break;
			case "kezi":
				majAllList = majAllList.concat(fuluMajList[i].maj);
				majAllList = majAllList.concat(fuluMajList[i].maj);
				majAllList = majAllList.concat(fuluMajList[i].maj);
				break;
			case "gangzi":
			case "angang":
				majAllList = majAllList.concat(fuluMajList[i].maj);
				majAllList = majAllList.concat(fuluMajList[i].maj);
				majAllList = majAllList.concat(fuluMajList[i].maj);
				majAllList = majAllList.concat(fuluMajList[i].maj);
				break;
		}
	}
	var doraCount = 0;
	if (!isYakuManVar) {
		for (var i in config.dora) {
			var dora = getDoraFromDoraShow(config.dora[i]);console.log(majAllList);
			for (var j in majAllList){
				if (majAllList[j] == dora)
					doraCount++;
			}
		}
		if (doraCount > 0) {
			ret.yakuList.push({
				yaku: "宝牌",
				fan: doraCount
			});
			ret.fan += doraCount;
		}
		doraCount = 0;
		for (var i in config.liDora) {
			var dora = getDoraFromDoraShow(config.liDora[i]);
			for (var j in majAllList)
				if (majAllList[j] == dora)
					doraCount++;
		}
		if (doraCount > 0) {
			ret.yakuList.push({
				yaku: "里宝牌",
				fan: doraCount
			});
			ret.fan += doraCount;
		}

		if (config.redDora > 0) {
			ret.yakuList.push({
				yaku: "赤宝牌",
				fan: config.redDora
			});
			ret.fan += config.redDora;
		}
		
		if (config.peiDora > 0) {
			ret.yakuList.push({
				yaku: "拔北宝牌",
				fan: config.peiDora
			});
			ret.fan += config.peiDora;
		}
	}
	if (ret.fu == 0) { //计算符数
		var fu = 20; //底符
		ret.fuList.push("底符20符");
		for (var i in ret.mianzi.kezi) {
			fu += 8; //暗刻8符
			ret.fuList.push("暗刻8符{{" + ret.mianzi.kezi[i] + "}}");
		}
		for (var i in fuluMajList) {
			if (fuluMajList[i].type == "kezi") {
				ret.fuList.push("明刻4符{{" + fuluMajList[i].maj[0] + "}}");
				fu += 4; //明刻4符
			} else if (fuluMajList[i].type == "gangzi") {
				ret.fuList.push("明杠16符{{" + fuluMajList[i].maj[0] + "}}");
				fu += 16; //明杠16符
			} else if (fuluMajList[i].type == "angang") {
				ret.fuList.push("暗杠32符{{" + fuluMajList[i].maj[0] + "}}");
				fu += 32; //暗杠32符
			}
		}
		var header = ret.mianzi.header; //雀头役牌2符
		if (header == config.ziFeng) {
			ret.fuList.push("雀头役牌2符{{" + header + "}}");
			fu += 2;
		}
		if (header == config.changFeng) {
			ret.fuList.push("雀头役牌2符{{" + header + "}}");
			fu += 2;
		}
		if (header == maj.HAK) {
			ret.fuList.push("雀头役牌2符{{" + header + "}}");
			fu += 2;
		}
		if (header == maj.HAT) {
			ret.fuList.push("雀头役牌2符{{" + header + "}}");
			fu += 2;
		}
		if (header == maj.CHU) {
			ret.fuList.push("雀头役牌2符{{" + header + "}}");
			fu += 2;
		}

		var rongMaj = handMajList[handMajList.length - 1];
		if (rongMaj == ret.mianzi.header){
			ret.fuList.push("单骑和牌2符{{" + rongMaj + "}}");
			fu += 2; //单骑
		}else {
			var isBK = false; //是边张或坎张
			for (var i in ret.mianzi.shunzi) { //遍历手牌所有顺子
				if (ret.mianzi.shunzi[i] + 1 == rongMaj && yaojiu.indexOf(rongMaj) == -1) //不是幺九，上一张牌是顺子的第一张，是坎张
					isBK = true;
				if ([maj.MAN1, maj.PIN1, maj.SOU1].indexOf(ret.mianzi.shunzi[i]) != -1 && ret.mianzi.shunzi[i] + 2 == rongMaj) //顺子为123，上两张牌是顺子的第一张，是边张
					isBK = true;
				if ([maj.PIN7, maj.MAN7, maj.SOU7].indexOf(ret.mianzi.shunzi[i]) != -1 && ret.mianzi.shunzi[i] == rongMaj) //顺子为789，和牌是顺子的第一张，是边张
					isBK = true;
			}
			if (isBK){
				ret.fuList.push("边张/坎张和牌2符{{" + rongMaj + "}}");
				fu += 2; //边张或坎张2符
			}
		}

		if (!config.isZimo && isMenQianQing(fuluMajList)){
			ret.fuList.push("门前清荣和10符{{" + rongMaj + "}}");
			fu += 10; //门前清荣和10符
		}
		if (config.isZimo){
			ret.fuList.push("门前清自摸2符{{" + rongMaj + "}}");
			fu += 2; //门前清自摸2符
		}
		ret.fu = Math.ceil(fu / 10) * 10;
	}
	ret.point = calcPoint(ret.fan, ret.fu, config.ziFeng == maj.TON);
	return ret;
}
/*
* 计算指定牌型的面子手役种
* 参数：
* mianzi：指定的牌型，也就是maj.calc的结果的单一项
* handMajList：详见calcYaku方法
* fuluMajList: 详见calcYaku方法
* config：详见calcYaku方法
* 返回值：{
	fan: 5, //番数
	fu: 20, //符数
	yakuList:[
		{
			yaku: "断幺九",
			fan: 1
		}
	],
	mianzi: {
		header: 1,
		kezi: [],
		shunzi: [ 2, 2, 5, 5 ]
	},
	isYakuMan: false
}
*/
function calcMianzi(mianzi, handMajList, fuluMajList, config) {
	var menQianQing = isMenQianQing(fuluMajList);
	var rongMaj = handMajList[handMajList.length - 1];
	var isYakuMan = false; //是否役满
	var ret = {
		fan: 0,
		fu: 0,
		yakuList: [],
		mianzi: mianzi,
		isYakuMan: false
	};
	if (isSiAnKe(rongMaj, mianzi, fuluMajList, config)) {
		isYakuMan = true;
		if (isTianHe(config) || isSiAnKeDanQi(rongMaj, mianzi, fuluMajList, config)) { //天和四暗刻计四暗刻单骑
			ret.yakuList.push({
				yaku: "四暗刻单骑",
				fan: 26
			});
			ret.fan += 26;
		} else {
			ret.yakuList.push({
				yaku: "四暗刻",
				fan: 13
			});
			ret.fan += 13;
		}
	}
	if (isDaSanYuan(mianzi, fuluMajList)) {
		isYakuMan = true;
		ret.yakuList.push({
			yaku: "大三元",
			fan: 13
		});
		ret.fan += 13;
	}
	if (isXiaoSiXi(mianzi, fuluMajList)) {
		isYakuMan = true;
		ret.yakuList.push({
			yaku: "小四喜",
			fan: 13
		});
		ret.fan += 13;
	}
	if (isDaSiXi(mianzi, fuluMajList)) {
		isYakuMan = true;
		ret.yakuList.push({
			yaku: "大四喜",
			fan: 26
		});
		ret.fan += 26;
	}
	if (isZiYiSe(handMajList, fuluMajList)) {
		isYakuMan = true;
		ret.yakuList.push({
			yaku: "字一色",
			fan: 13
		});
		ret.fan += 13;
	}
	if (isLvYiSe(handMajList, fuluMajList)) {
		isYakuMan = true;
		ret.yakuList.push({
			yaku: "绿一色",
			fan: 13
		});
		ret.fan += 13;
	}
	if (isQingLaoTou(mianzi, fuluMajList)) {
		isYakuMan = true;
		ret.yakuList.push({
			yaku: "清老头",
			fan: 13
		});
		ret.fan += 13;
	}
	if (isJiuLianBaoDeng(handMajList, fuluMajList)) {
		isYakuMan = true;
		if (isTianHe(config) || isChunZhengJiuLianBaoDeng(handMajList, fuluMajList)) { //天和九莲宝灯计纯正九莲宝灯
			ret.yakuList.push({
				yaku: "纯正九莲宝灯",
				fan: 26
			});
			ret.fan += 26;
		} else {
			ret.yakuList.push({
				yaku: "九莲宝灯",
				fan: 13
			});
			ret.fan += 13;
		}
	}
	if (isSiGangzi(mianzi, fuluMajList)) {
		isYakuMan = true;
		ret.yakuList.push({
			yaku: "四杠子",
			fan: 13
		});
		ret.fan += 13;
	}
	if (isTianHe(config)) {
		ret.yakuList.push({
			yaku: "天和",
			fan: 13
		});
		ret.fan += 13;
	}
	if (isDiHe(config)) {
		ret.yakuList.push({
			yaku: "地和",
			fan: 13
		});
		ret.fan += 13;
	}
	ret.isYakuMan = isYakuMan;
	if (isYakuMan)
		return ret;


	if (isLiZhi(config)) {
		if (isDoubleLiZhi(config)) {
			ret.yakuList.push({
				yaku: "两立直",
				fan: 2
			});
			ret.fan += 2;
		} else {
			ret.yakuList.push({
				yaku: "立直",
				fan: 1
			});
			ret.fan += 1;
		}
		if (isYiFa(config)) {
			ret.yakuList.push({
				yaku: "一发",
				fan: 1
			});
			ret.fan += 1;
		}
	}
	if (isZimo(fuluMajList, config)) {
		ret.yakuList.push({
			yaku: "门前清自摸",
			fan: 1
		});
		ret.fan += 1;
	}
	if (isPinghe(rongMaj, mianzi, fuluMajList, config)) {
		ret.fu = 30;
		if (config.isZimo)
			ret.fu = 20;
		ret.yakuList.push({
			yaku: "平和",
			fan: 1
		});
		ret.fan += 1;
	}
	if (isDuanYao(handMajList, fuluMajList)) {
		ret.yakuList.push({
			yaku: "断幺九",
			fan: 1
		});
		ret.fan += 1;
	}
	var yakuhaiList = calcYakuHai(mianzi, fuluMajList, config);
	for (var i in yakuhaiList) {
		if (yakuhaiList[i] == config.ziFeng) {
			ret.yakuList.push({
				yaku: "门风牌-" + getFengName(yakuhaiList[i]),
				fan: 1
			});
			ret.fan += 1;
		}
		if (yakuhaiList[i] == config.changFeng) {
			ret.yakuList.push({
				yaku: "场风牌-" + getFengName(yakuhaiList[i]),
				fan: 1
			});
			ret.fan += 1;
		}
		if (sanYuanMaj.indexOf(yakuhaiList[i]) != -1) {
			ret.yakuList.push({
				yaku: getFengName(yakuhaiList[i]), //三元牌
				fan: 1
			});
			ret.fan += 1;
		}
	}
	if (isHaidi(config)) {
		ret.yakuList.push({
			yaku: "海底捞月",
			fan: 1
		});
		ret.fan += 1;
	}
	if (isHedi(config)) {
		ret.yakuList.push({
			yaku: "河底捞鱼",
			fan: 1
		});
		ret.fan += 1;
	}
	if (isQiangGang(config)) {
		ret.yakuList.push({
			yaku: "抢杠",
			fan: 1
		});
		ret.fan += 1;
	}
	if (isLingShang(config)) {
		ret.yakuList.push({
			yaku: "岭上开花",
			fan: 1
		});
		ret.fan += 1;
	}
	if (isDuiDuiHe(mianzi, fuluMajList)) {
		ret.yakuList.push({
			yaku: "对对和",
			fan: 2
		});
		ret.fan += 2;
	}
	if (isSanSeTongKe(mianzi, fuluMajList)) {
		ret.yakuList.push({
			yaku: "三色同刻",
			fan: 2
		});
		ret.fan += 2;
	}
	if (isSanAnKe(rongMaj, mianzi, fuluMajList, config)) {
		ret.yakuList.push({
			yaku: "三暗刻",
			fan: 2
		});
		ret.fan += 2;
	}
	if (isSanGangzi(mianzi, fuluMajList)) {
		ret.yakuList.push({
			yaku: "三杠子",
			fan: 2
		});
		ret.fan += 2;
	}
	if (isHunLaoTou(handMajList, mianzi, fuluMajList)) {
		ret.yakuList.push({
			yaku: "混老头",
			fan: 2
		});
		ret.fan += 2;
	}else if (isHunQuanDaiYaoJiu(mianzi, fuluMajList)) {
		ret.yakuList.push({
			yaku: "混全带幺九",
			fan: (menQianQing ? 2 : 1)
		});
		ret.fan += (menQianQing ? 2 : 1);
	}
	if (isXiaoSanYuan(mianzi, fuluMajList)) {
		ret.yakuList.push({
			yaku: "小三元",
			fan: 2
		});
		ret.fan += 2;
	}
	if (isYiBeiKou(mianzi, fuluMajList, config)) {
		if (!isErBeiKou(mianzi, fuluMajList)) {
			ret.yakuList.push({
				yaku: "一杯口",
				fan: 1
			});
			ret.fan += 1;
		} else {
			ret.yakuList.push({
				yaku: "二杯口",
				fan: 3
			});
			ret.fan += 3;
		}
	}
	if (isYiQi(mianzi, fuluMajList)) {
		ret.yakuList.push({
			yaku: "一气通贯",
			fan: (menQianQing ? 2 : 1)
		});
		ret.fan += (menQianQing ? 2 : 1);
	}
	if (isSanSeTongShun(mianzi, fuluMajList)) {
		ret.yakuList.push({
			yaku: "三色同顺",
			fan: (menQianQing ? 2 : 1)
		});
		ret.fan += (menQianQing ? 2 : 1);
	}
	if (isChunQuanDaiYaoJiu(mianzi, fuluMajList)) {
		ret.yakuList.push({
			yaku: "纯全带幺九",
			fan: (menQianQing ? 3 : 2)
		});
		ret.fan += (menQianQing ? 3 : 2);
	}
	if (isQingYiSe(handMajList, fuluMajList)) {
		ret.yakuList.push({
			yaku: "清一色",
			fan: (menQianQing ? 6 : 5)
		});
		ret.fan += (menQianQing ? 6 : 5);
	} else if (isHunYiSe(handMajList, fuluMajList)) {
		ret.yakuList.push({
			yaku: "混一色",
			fan: (menQianQing ? 3 : 2)
		});
		ret.fan += (menQianQing ? 3 : 2);
	}
	return ret;
}

/*
 * 获取宝牌指示牌对应的宝牌
 * 参数：
 * maj：宝牌指示牌
 * 返回值：宝牌
 */
function getDoraFromDoraShow(cmaj) {
	if (yaojiu.indexOf(cmaj) == -1) //宝牌不是幺九牌
		return cmaj + 1; //返回下一张牌
	if ([maj.MAN1, maj.PIN1, maj.SOU1].indexOf(cmaj) != -1) //数牌1
		return cmaj + 1; //返回下一张牌
	if ([maj.MAN9, maj.PIN9, maj.SOU9].indexOf(cmaj) != -1) //数牌9
		return cmaj - 8;
	switch (cmaj) {
		case maj.TON:
			return maj.NAN;
		case maj.NAN:
			return maj.SHA;
		case maj.SHA:
			return maj.PEI;
		case maj.PEI:
			return maj.TON;
		case maj.HAK:
			return maj.HAT;
		case maj.HAT:
			return maj.CHU;
		case maj.CHU:
			return maj.HAK;
	}
	return false;
}

/*
 * 获取字牌的中文名
 * 参数：
 * maj：字牌编号
 * 返回值：字牌中文名
 */
function getFengName(majc) {
	switch (majc) {
		case maj.TON:
			return "东";
		case maj.NAN:
			return "南";
		case maj.SHA:
			return "西";
		case maj.PEI:
			return "北";
		case maj.CHU:
			return "中";
		case maj.HAT:
			return "发";
		case maj.HAK:
			return "白";
	}
	return "";
}
/*
 * 判断是否门前清
 * 参数：
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：门前清返回true，否则返回false
 */
function isMenQianQing(fuluMajList) {
	for (var i in fuluMajList)
		if (fuluMajList[i].type != "angang")
			return false;
	return true;
}
/*
 * 判断某张牌是否是役牌
 * 参数：
 * maj：待判断的牌
 * config：配置，详见calcYaku
 */
function isYakuHai(cmaj, config) {
	if (cmaj == config.ziFeng)
		return true;
	if (cmaj == config.changFeng)
		return true;
	if (cmaj == maj.HAK)
		return true;
	if (cmaj == maj.HAT)
		return true;
	if (cmaj == maj.CHU)
		return true;
	return false;
}
/*
 * 判断是否是断幺九
 * 参数：
 * handMajList：手牌，详见calcYaku
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合断幺九返回true，否则返回false
 */
function isDuanYao(handMajList, fuluMajList) {
	for (var i in handMajList)
		if (yaojiu.indexOf(handMajList[i]) != -1)
			return false;
	for (var i in fuluMajList)
		for (var j in fuluMajList[i].maj)
			if (yaojiu.indexOf(fuluMajList[i].maj[j]) != -1)
				return false;
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
function isPinghe(rongMaj, mianzi, fuluMajList, config) {
	if (fuluMajList.length > 0)
		return false; //门前清限定，暗杠不是顺子不考虑
	if (isYakuHai(mianzi.header, config))
		return false; //雀头不能是役牌
	if (mianzi.kezi.length > 0)
		return false; //必须全是顺子
	var doubleTing = []; //两面听可能的牌
	for (var i in mianzi.shunzi) {
		if(yaojiu.indexOf(mianzi.shunzi[i] + 2) == -1) //幺九牌结束的不算i，即尾边张
			doubleTing.push(mianzi.shunzi[i]);
		if(yaojiu.indexOf(mianzi.shunzi[i]) == -1) //幺九牌开始的不算i+2，即起边张
			doubleTing.push(mianzi.shunzi[i] + 2);
	}
	if (doubleTing.indexOf(rongMaj) == -1)
		return false; //必须是顺子的两面听
	return true;
}
/*
 * 判断是否是立直
 * 参数：
 * config: 配置，详见calcYaku
 * 返回值：符合立直返回true，否则返回false
 */
function isLiZhi(config) {
	return config.isLiZhi;
}
/*
 * 判断是否是一发
 * 参数：
 * config: 配置，详见calcYaku
 * 返回值：符合一发返回true，否则返回false
 */
function isYiFa(config) {
	return config.isYiFa;
}
/*
 * 判断是否是门前清自摸
 * 参数：
 * fuluMajList: 副露牌，详见calcYaku
 * config: 配置，详见calcYaku
 * 返回值：符合门前清自摸返回true，否则返回false
 */
function isZimo(fuluMajList, config) {
	if (!isMenQianQing(fuluMajList))
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
function isYiBeiKou(mianzi, fuluMajList, config) {
	if (!isMenQianQing(fuluMajList))
		return false; //门前清限定
	var map = mianzi.shunzi.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map()) //对顺子头计数
	ret = false;
	map.forEach(function(count, key) {
		if (count >= 2)
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
 * 返回值：没有役牌返回空数组[]，有役牌返回对应的役牌，如[maj.TON]为连风牌东
 */
function calcYakuHai(mianzi, fuluMajList, config) {
	var ret = [];
	for (var i in mianzi.kezi) {
		if (isYakuHai(mianzi.kezi[i], config))
			ret.push(mianzi.kezi[i]); //手牌役牌
	}
	for (var i in fuluMajList) {
		if (fuluMajList[i].type != "shunzi") {
			if (isYakuHai(fuluMajList[i].maj[0], config))
				ret.push(fuluMajList[i].maj[0]); //副露役牌
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
function isHaidi(config) {
	return config.isZimo && config.isLast;
}
/*
 * 判断是否是河底捞鱼
 * 参数：
 * config: 配置，详见calcYaku
 * 返回值：符合河底捞鱼返回true，否则返回false
 */
function isHedi(config) {
	return (!config.isZimo) && config.isLast;
}
/*
 * 判断是否是抢杠
 * 参数：
 * config: 配置，详见calcYaku
 * 返回值：符合抢杠返回true，否则返回false
 */
function isQiangGang(config) {
	return config.isQiangGang;
}
/*
 * 判断是否是领上开花
 * 参数：
 * config: 配置，详见calcYaku
 * 返回值：符合领上开花返回true，否则返回false
 */
function isLingShang(config) {
	return config.isLingShang;
}
/*
 * 获取当前和牌是否是一气通贯
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合一气通贯返回true，否则返回false
 */
function isYiQi(mianzi, fuluMajList) {
	var shunziList = [];
	shunziList = shunziList.concat(mianzi.shunzi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type == "shunzi") {
			shunziList = shunziList.concat(fuluMajList[i].maj);
		}
	}
	if (shunziList.indexOf(maj.MAN1) != -1 && shunziList.indexOf(maj.MAN4) != -1 && shunziList.indexOf(maj.MAN7) != -1)
		return true;
	if (shunziList.indexOf(maj.PIN1) != -1 && shunziList.indexOf(maj.PIN4) != -1 && shunziList.indexOf(maj.PIN7) != -1)
		return true;
	if (shunziList.indexOf(maj.SOU1) != -1 && shunziList.indexOf(maj.SOU4) != -1 && shunziList.indexOf(maj.SOU7) != -1)
		return true;
	return false;
}
/*
 * 获取当前和牌是否是三色同顺
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合三色同顺返回true，否则返回false
 */
function isSanSeTongShun(mianzi, fuluMajList) {
	var shunziList = [];
	shunziList = shunziList.concat(mianzi.shunzi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type == "shunzi") {
			shunziList = shunziList.concat(fuluMajList[i].maj);
		}
	}
	var mans = []; //万子
	var pins = []; //饼子
	var sous = []; //索子
	for (var i in shunziList) {
		if (shunziList[i] >= maj.MAN1 && shunziList[i] <= maj.MAN9)
			mans.push(shunziList[i] - maj.MAN1);
		if (shunziList[i] >= maj.PIN1 && shunziList[i] <= maj.PIN9)
			pins.push(shunziList[i] - maj.PIN1);
		if (shunziList[i] >= maj.SOU1 && shunziList[i] <= maj.SOU9)
			sous.push(shunziList[i] - maj.SOU1);
	}
	var res = mans.filter(function(val) {
		return pins.indexOf(val) > -1
	}).filter(function(val) {
		return sous.indexOf(val) > -1
	}); //取三个数组交集
	return res.length > 0; //交集大于0为三色同顺
}
/*
 * 获取当前和牌是否是三色同刻
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合三色同刻返回true，否则返回false
 */
function isSanSeTongKe(mianzi, fuluMajList) {
	var keziList = [];
	keziList = keziList.concat(mianzi.kezi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type != "shunzi") {
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	var mans = []; //万子
	var pins = []; //饼子
	var sous = []; //索子
	for (var i in keziList) {
		if (keziList[i] >= maj.MAN1 && keziList[i] <= maj.MAN9)
			mans.push(keziList[i] - maj.MAN1);
		if (keziList[i] >= maj.PIN1 && keziList[i] <= maj.PIN9)
			pins.push(keziList[i] - maj.PIN1);
		if (keziList[i] >= maj.SOU1 && keziList[i] <= maj.SOU9)
			sous.push(keziList[i] - maj.SOU1);
	}
	var res = mans.filter(function(val) {
		return pins.indexOf(val) > -1
	}).filter(function(val) {
		return sous.indexOf(val) > -1
	}); //取三个数组交集
	return res.length > 0; //交集大于0为三色同刻
}

/*
 * 获取当前和牌是否是混全带幺九
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合混全带幺九返回true，否则返回false
 */
function isHunQuanDaiYaoJiu(mianzi, fuluMajList) {
	if(isChunQuanDaiYaoJiu(mianzi, fuluMajList))
		return false;
	if (yaojiu.indexOf(mianzi.header) == -1)
		return false; //雀头必须是字牌
	var shunziList = []; //取所有顺子
	shunziList = shunziList.concat(mianzi.shunzi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type == "shunzi") {
			shunziList = shunziList.concat(fuluMajList[i].maj);
		}
	}
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type != "shunzi") {
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	for (var i in keziList)
		if (yaojiu.indexOf(keziList[i]) == -1)
			return false; //刻子必须是字牌
	var laoTouShunZi = [maj.MAN1, maj.MAN7, maj.SOU1, maj.SOU7, maj.PIN1, maj.PIN7];
	for (var i in shunziList)
		if (laoTouShunZi.indexOf(shunziList[i]) == -1)
			return false; //顺子必须包含字牌
	return true;
}
/*
 * 获取当前和牌是否是纯全带幺九(计此役时不计混全带幺九)
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合纯全带幺九返回true，否则返回false
 */
function isChunQuanDaiYaoJiu(mianzi, fuluMajList) {
	if (laotouMaj.indexOf(mianzi.header) == -1)
		return false; //雀头必须是老头牌
	var shunziList = []; //取所有顺子
	shunziList = shunziList.concat(mianzi.shunzi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type == "shunzi") {
			shunziList = shunziList.concat(fuluMajList[i].maj);
		}
	}
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type != "shunzi") {
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	for (var i in keziList)
		if (laotouMaj.indexOf(keziList[i]) == -1)
			return false; //刻子必须是老头牌
	var laoTouShunZi = [maj.MAN1, maj.MAN7, maj.SOU1, maj.SOU7, maj.PIN1, maj.PIN7];
	for (var i in shunziList)
		if (laoTouShunZi.indexOf(shunziList[i]) == -1)
			return false; //顺子必须包含老头牌
	return true;
}
/*
 * 获取当前和牌是否是混老头(计此役时不计纯全带幺九、混全带幺九)
 * 参数：
 * handMajList：手牌，详见calcYaku
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合纯全带幺九返回true，否则返回false
 */
function isHunLaoTou(handMajList, mianzi, fuluMajList) {
	if (isQiDuiZi(handMajList, fuluMajList)) {
		for (var i in handMajList)
			if (yaojiu.indexOf(handMajList[i]) == -1)
				return false; //不是幺九牌
		return true;
	} else {
		if (!isDuiDuiHe(mianzi, fuluMajList))
			return false; //混老头一定对对和
		return isHunQuanDaiYaoJiu(mianzi, fuluMajList); // 对对和 + 混全带幺九 = 混老头
	}
}
/*
 * 获取当前和牌是否是对对和
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合对对和返回true，否则返回false
 */
function isDuiDuiHe(mianzi, fuluMajList) {
	if (mianzi.shunzi.length > 0)
		return false; //面子里不能有顺子
	for (var i in fuluMajList)
		if (fuluMajList[i].type == "shunzi")
			return false; //鸣牌不能有顺子
	return true;
}
/*
 * 获取当前和牌是否是两立直
 * 参数：
 * config: 配置，详见calcYaku
 * 返回值：符合两立直返回true，否则返回false
 */
function isDoubleLiZhi(config) {
	return config.isDoubleLiZhi;
}
/*
 * 获取当前和牌是否是三暗刻
 * 参数：
 * rongMaj：荣和或者自摸的牌
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * config: 配置，详见calcYaku
 * 返回值：符合三暗刻返回true，否则返回false
 */
function isSanAnKe(rongMaj, mianzi, fuluMajList, config) {
	var keziList = []; //取所有符合条件的刻子
	keziList = keziList.concat(mianzi.kezi);
	for (var i in fuluMajList)
		if (fuluMajList[i].type == "angang")
			keziList = keziList.concat(fuluMajList[i].maj); //暗杠也是暗刻
	if (!config.isZimo) { //非自摸要考虑是不是暗刻
		var t = false; //荣和的牌是不是顺子的一部分
		for(var i in mianzi.shunzi){
			if([mianzi.shunzi[i],mianzi.shunzi[i]+1,mianzi.shunzi[i]+2].indexOf(rongMaj) != -1)
				t = true;
		}
		if (keziList.indexOf(rongMaj) != -1 && !t)
			keziList.pop(); //不是自摸且荣和的不是手牌顺子的一部分则去掉这个暗刻
	}
	return keziList.length == 3;
}
/*
 * 获取当前和牌是否是三杠子
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合三杠子返回true，否则返回false
 */
function isSanGangzi(mianzi, fuluMajList) {
	var gangziList = []; //取所有杠子
	for (var i in fuluMajList)
		if (fuluMajList[i].type == "angang" || fuluMajList[i].type == "gangzi")
			gangziList = gangziList.concat(fuluMajList[i].maj); //暗杠也是暗刻
	return gangziList.length == 3;
}
/*
 * 获取当前和牌是否是小三元
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合小三元返回true，否则返回false
 */
function isXiaoSanYuan(mianzi, fuluMajList) {
	if (sanYuanMaj.indexOf(mianzi.header) == -1)
		return false; //雀头必须是三元牌
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type != "shunzi") {
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	var sanyuanList = [];
	for (var i in keziList)
		if (sanYuanMaj.indexOf(keziList[i]) != -1)
			sanyuanList.push(keziList[i]);
	return sanyuanList.length == 2;
}
/*
 * 获取当前和牌是否是混一色
 * 参数：
 * handMajList：手牌，详见calcYaku
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合混一色返回true，否则返回false
 */
function isHunYiSe(handMajList, fuluMajList) {
	var hands = [];
	hands = hands.concat(handMajList); //所有牌
	for (var i in fuluMajList)
		hands = hands.concat(fuluMajList[i].maj);
	var max = 0;
	var min = 100; //清除字牌后取最大与最小值
	for (var i in hands)
		if (ziMaj.indexOf(hands[i]) == -1) {
			max = (hands[i] > max ? hands[i] : max);
			min = (hands[i] < min ? hands[i] : min);
		}
	if (min >= maj.MAN1 && max <= maj.MAN9)
		return true;
	if (min >= maj.PIN1 && max <= maj.PIN9)
		return true;
	if (min >= maj.SOU1 && max <= maj.SOU9)
		return true;
	return false;
}
/*
 * 获取当前和牌是否是清一色
 * 参数：
 * handMajList：手牌，详见calcYaku
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合清一色返回true，否则返回false
 */
function isQingYiSe(handMajList, fuluMajList) {
	var hands = [];
	hands = hands.concat(handMajList); //所有牌
	for (var i in fuluMajList)
		hands = hands.concat(fuluMajList[i].maj);
	var max = 0;
	var min = 100; //清除字牌后取最大与最小值
	for (var i in hands)
		if (ziMaj.indexOf(hands[i]) == -1) {
			max = (hands[i] > max ? hands[i] : max);
			min = (hands[i] < min ? hands[i] : min);
		} else
			return false; //有字牌不是清一色
	if (min >= maj.MAN1 && max <= maj.MAN9)
		return true;
	if (min >= maj.PIN1 && max <= maj.PIN9)
		return true;
	if (min >= maj.SOU1 && max <= maj.SOU9)
		return true;
	return false;
}
/*
 * 判断是否是二杯口
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合二杯口返回true，否则返回false
 */
function isErBeiKou(mianzi, fuluMajList) {
	if (!mianzi)
		return false;
	if (!isMenQianQing(fuluMajList))
		return false; //门前清限定
	var map = mianzi.shunzi.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map()) //对顺子头计数
	ret = 0;
	map.forEach(function(count, key) {
		if (count == 2)
			ret++; // 顺子重复次数等于记一个一杯口
		if (count == 4)
			ret += 2; //四个相同的顺子记作两个一杯口
	})
	return ret >= 2; //杯口数大于等于2即二杯口
}



//下列役满可以复合，且会清除所有非役满役。

/*
 * 获取当前和牌是否是四暗刻
 * 参数：
 * rongMaj：荣和或者自摸的牌
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * config: 配置，详见calcYaku
 * 返回值：符合四暗刻返回true，否则返回false
 */
function isSiAnKe(rongMaj, mianzi, fuluMajList, config) {
	var keziList = []; //取所有符合条件的刻子
	keziList = keziList.concat(mianzi.kezi);
	for (var i in fuluMajList)
		if (fuluMajList[i].type == "angang")
			keziList = keziList.concat(fuluMajList[i].maj); //暗杠也是暗刻
	if (!config.isZimo) { //非自摸要考虑是不是暗刻
		if (keziList.indexOf(rongMaj) != -1)
			keziList.pop(); //不是自摸的去掉这个暗刻
	}
	return keziList.length == 4;
}
/*
 * 获取当前和牌是否是四暗刻单骑
 * 参数：
 * rongMaj：荣和或者自摸的牌
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * config: 配置，详见calcYaku
 * 返回值：符合四暗刻单骑返回true，否则返回false
 */
function isSiAnKeDanQi(rongMaj, mianzi, fuluMajList, config) {
	return rongMaj == mianzi.header && isSiAnKe(rongMaj, mianzi, fuluMajList, config); //和牌是雀头就行了
}

/*
 * 获取当前和牌是否是大三元
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合大三元返回true，否则返回false
 */
function isDaSanYuan(mianzi, fuluMajList) {
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type != "shunzi") {
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	var sanyuanList = [];
	for (var i in keziList)
		if (sanYuanMaj.indexOf(keziList[i]) != -1) //三元牌的刻子
			sanyuanList.push(keziList[i]);
	return sanyuanList.length == 3; //三元牌的刻子为3个
}
/*
 * 获取当前和牌是否是小四喜
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合大三元返回true，否则返回false
 */
function isXiaoSiXi(mianzi, fuluMajList) {
	if (siXiMaj.indexOf(mianzi.header) == -1)
		return false; //雀头必须是四喜牌
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type != "shunzi") {
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	var siXiList = [];
	for (var i in keziList)
		if (siXiMaj.indexOf(keziList[i]) != -1) //四喜牌的刻子
			siXiList.push(keziList[i]);
	return siXiList.length == 3; //四喜牌的刻子为3个
}
/*
 * 获取当前和牌是否是大四喜
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合大三元返回true，否则返回false
 */
function isDaSiXi(mianzi, fuluMajList) {
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for (var i in fuluMajList) {
		if (fuluMajList[i].type != "shunzi") {
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	var siXiList = [];
	for (var i in keziList)
		if (siXiMaj.indexOf(keziList[i]) != -1) //四喜牌的刻子
			siXiList.push(keziList[i]);
	return siXiList.length == 4; //四喜牌的刻子为3个
}

/*
 * 获取当前和牌是否是字一色
 * 参数：
 * handMajList：手牌，详见calcYaku
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合字一色返回true，否则返回false
 */
function isZiYiSe(handMajList, fuluMajList) {
	var hands = [];
	hands = hands.concat(handMajList); //所有牌
	for (var i in fuluMajList)
		hands = hands.concat(fuluMajList[i].maj);
	for (var i in hands)
		if (ziMaj.indexOf(hands[i]) == -1)
			return false; //数牌不是字一色
	return true;
}
/*
 * 获取当前和牌是否是绿一色
 * 参数：
 * handMajList：手牌，详见calcYaku
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合绿一色返回true，否则返回false
 */
function isLvYiSe(handMajList, fuluMajList) {
	var hands = [];
	hands = hands.concat(handMajList); //所有牌
	for (var i in fuluMajList)
		hands = hands.concat(fuluMajList[i].maj);
	for (var i in hands)
		if (greenMaj.indexOf(hands[i]) == -1)
			return false; //不是绿牌
	return true;
}

/*
 * 获取当前和牌是否是清老头
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合清老头返回true，否则返回false
 */
function isQingLaoTou(mianzi, fuluMajList) {
	if (!isDuiDuiHe(mianzi, fuluMajList))
		return false; //混老头一定对对和
	return isChunQuanDaiYaoJiu(mianzi, fuluMajList); // 对对和 + 纯全带幺九 = 清老头
}
/*
 * 获取当前和牌是否是九莲宝灯
 * 参数：
 * handMajList：手牌，详见calcYaku
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合九莲宝灯返回true，否则返回false
 */
function isJiuLianBaoDeng(handMajList, fuluMajList) {
	if (fuluMajList.length > 0)
		return false; //门前清限定，不允许有暗杠
	var jiuLian = [
		[maj.MAN1, maj.MAN1, maj.MAN1, maj.MAN2, maj.MAN3, maj.MAN4, maj.MAN5, maj.MAN6, maj.MAN7, maj.MAN8, maj.MAN9, maj.MAN9,
			maj.MAN9
		],
		[maj.PIN1, maj.PIN1, maj.PIN1, maj.PIN2, maj.PIN3, maj.PIN4, maj.PIN5, maj.PIN6, maj.PIN7, maj.PIN8, maj.PIN9, maj.PIN9,
			maj.PIN9
		],
		[maj.SOU1, maj.SOU1, maj.SOU1, maj.SOU2, maj.SOU3, maj.SOU4, maj.SOU5, maj.SOU6, maj.SOU7, maj.SOU8, maj.SOU9, maj.SOU9,
			maj.SOU9
		]
	];
	var canWin = []; //列出所有可能
	for (var t in jiuLian)
		for (var i = 0; i < 9; i++) {
			var arr = jiuLian[t].slice();
			arr.push(jiuLian[t][0] + i);
			arr.sort()
			canWin.push(arr.join("-"));
		}
	return canWin.indexOf(handMajList.slice().sort().join("-")) != -1
}
/*
 * 获取当前和牌是否是纯正九莲宝灯
 * 参数：
 * handMajList：手牌，详见calcYaku
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合纯正九莲宝灯返回true，否则返回false
 */
function isChunZhengJiuLianBaoDeng(handMajList, fuluMajList) {
	if (fuluMajList.length > 0)
		return false; //门前清限定，不允许有暗杠
	var jiuLian = [
		[maj.MAN1, maj.MAN1, maj.MAN1, maj.MAN2, maj.MAN3, maj.MAN4, maj.MAN5, maj.MAN6, maj.MAN7, maj.MAN8, maj.MAN9, maj.MAN9,
			maj.MAN9
		].sort().join("-"),
		[maj.PIN1, maj.PIN1, maj.PIN1, maj.PIN2, maj.PIN3, maj.PIN4, maj.PIN5, maj.PIN6, maj.PIN7, maj.PIN8, maj.PIN9, maj.PIN9,
			maj.PIN9
		].sort().join("-"),
		[maj.SOU1, maj.SOU1, maj.SOU1, maj.SOU2, maj.SOU3, maj.SOU4, maj.SOU5, maj.SOU6, maj.SOU7, maj.SOU8, maj.SOU9, maj.SOU9,
			maj.SOU9
		].sort().join("-")
	];
	var hand = handMajList.slice();
	hand.pop();
	return jiuLian.indexOf(hand.sort().join("-")) != -1
}

/*
 * 获取当前和牌是否是四杠子
 * 参数：
 * mianzi：面子，maj.calc的单个牌型返回值
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合四杠子返回true，否则返回false
 */
function isSiGangzi(mianzi, fuluMajList) {
	var gangziList = []; //取所有杠子
	for (var i in fuluMajList)
		if (fuluMajList[i].type == "angang" || fuluMajList[i].type == "gangzi")
			gangziList = gangziList.concat(fuluMajList[i].maj); //暗杠也是暗刻
	return gangziList.length == 4;
}
/*
 * 判断是否是天和
 * 参数：
 * config: 配置，详见calcYaku
 * 返回值：符合天和返回true，否则返回false
 */
function isTianHe(config) {
	return config.isTianHe;
}
/*
 * 判断是否是地和
 * 参数：
 * config: 配置，详见calcYaku
 * 返回值：符合地和返回true，否则返回false
 */
function isDiHe(config) {
	return config.isDiHe;
}
/*
 * 判断是否是国士无双
 * 参数：
 * handMajList：手牌，详见calcYaku
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合国士无双返回true，否则返回false
 */
function isGuoShi(handMajList, fuluMajList) {
	if (fuluMajList.length > 0)
		return false; //国士不可能副露
	var canWin = []; //列出所有可能
	for (var i in yaojiu) {
		var arr = yaojiu.slice();
		arr.push(yaojiu[i]);
		arr.sort()
		canWin.push(arr.join("-"));
	}
	return canWin.indexOf(handMajList.slice().sort().join("-")) != -1;
}
/*
 * 判断是否是国士无双十三面
 * 参数：
 * handMajList：手牌，详见calcYaku
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合国士无双十三面返回true，否则返回false
 */
function isGuoShiShiSanMian(handMajList, fuluMajList) {
	if (fuluMajList.length > 0)
		return false; //国士不可能副露
	var m = yaojiu.slice().sort().join("-");
	var hand = handMajList.slice();
	hand.pop();
	return hand.slice().sort().join("-") == m;
}
/*
 * 判断是否是七对子
 * 参数：
 * handMajList：手牌，详见calcYaku
 * fuluMajList: 副露牌，详见calcYaku
 * 返回值：符合七对子返回true，否则返回false
 */
function isQiDuiZi(handMajList, fuluMajList) {
	if (fuluMajList.length > 0)
		return false; //七对子不可能副露
	var map = handMajList.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map()) //对手牌计数
	ret = true;
	map.forEach(function(count, key) {
		if (count != 2)
			ret = false; // 手牌出现次数不等于2即非七对子
	})
	return ret;
}
/*
 * 获取番数符数对应的点数
 * 参数：
 * fan：番数
 * fu：符数
 * isZhuang：是否是庄家
 * 返回值：和牌点数
 */
function calcPoint(fan, fu, isZhuang) {
	var fp = (isZhuang ? 6 : 4);
	if (fan < 5) {
		var a = Math.ceil(fu * Math.pow(2, fan + 2) / 100) * 100;
		if (a >= 2000)
			return 2000 * fp;
		return a * fp;
	}
	switch (parseInt(fan)) {
		case 5:
			return 2000 * fp;
		case 6:
		case 7:
			return 3000 * fp;
		case 8:
		case 9:
		case 10:
			return 4000 * fp;
		case 11:
		case 12:
			return 6000 * fp;
		default:
			return 8000 * fp;
	}
	//var table = [];for(var fan=1;fan<5;fan++){table[fan-1]=[];for(var fu=20;fu<=110;fu+=10)table[fan-1].push(calcPoint(fan,fu,true));}
}

module.exports = {
	calcYaku: calcYaku,
	xiangting: maj.xiangting,
	MAN: maj.MAN,
	MAN1: maj.MAN1,
	MAN2: maj.MAN2,
	MAN3: maj.MAN3,
	MAN4: maj.MAN4,
	MAN5: maj.MAN5,
	MAN6: maj.MAN6,
	MAN7: maj.MAN7,
	MAN8: maj.MAN8,
	MAN9: maj.MAN9,
	PIN: maj.PIN,
	PIN1: maj.PIN1,
	PIN2: maj.PIN2,
	PIN3: maj.PIN3,
	PIN4: maj.PIN4,
	PIN5: maj.PIN5,
	PIN6: maj.PIN6,
	PIN7: maj.PIN7,
	PIN8: maj.PIN8,
	PIN9: maj.PIN9,
	SOU: maj.SOU,
	SOU1: maj.SOU1,
	SOU2: maj.SOU2,
	SOU3: maj.SOU3,
	SOU4: maj.SOU4,
	SOU5: maj.SOU5,
	SOU6: maj.SOU6,
	SOU7: maj.SOU7,
	SOU8: maj.SOU8,
	SOU9: maj.SOU9,
	TON: maj.TON,
	NAN: maj.NAN,
	SHA: maj.SHA,
	PEI: maj.PEI,
	HAK: maj.HAK,
	HAT: maj.HAT,
	CHU: maj.CHU
};
/*
var res = calcYaku(
	[maj.MAN1,maj.MAN2,maj.MAN3,maj.PIN1,maj.PIN1,maj.PIN2,maj.PIN3,maj.PIN2,maj.PIN3,maj.SOU1,maj.SOU2,maj.SOU3,maj.SOU4,maj.SOU4],[],{
		isDoubleLiZhi: false, //是否两立直 123m112233p12344s
		isLiZhi: false, //是否立直
		isYiFa: false, //是否一发
		isLingShang: false, //是否领上
		ziFeng: maj.NAN, //自风
		changFeng: maj.TON, //场风
		isZimo: false, //是否自摸 
		isLast: false, //是否是河底/海底
		isQiangGang: false, //是否是抢杠
		isTianHe: false, //是否是天和
		isDiHe: false, //是否是地和
		dora: [maj.MAN1], //宝牌指示牌
		liDora: [maj.MAN4], //里宝牌指示牌
		redDora: 0 //赤宝牌个数
	}
);
console.log(res);*/
