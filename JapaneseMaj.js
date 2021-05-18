import state from "./bean/State.js";
import Pai from "./bean/Pai.js";

class JapaneseMaj {
	constructor(config) {
		state.changFeng = config.changFeng; // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
		state.ziFeng = config.ziFeng; // Number类型，自风，东1南2西3北4
		state.dora = config.dora; //Array[Pai]类型，宝牌数组，注意这里是宝牌数组不是宝牌指示牌数组
		state.lidora = config.lidora; //Array[Pai]类型，里宝牌数组，注意这里是里宝牌数组不是里宝牌指示牌数组
		state.isLiZhi = config.isLiZhi; //是否立直
		state.isYiFa = config.isYiFa; //是否一发
		state.isLingShang = config.isLingShang; //是否领上
		state.isZimo = config.isZimo; //是否自摸 
		state.isLast = config.isLast; //是否是河底/海底
		state.isQiangGang = config.isQiangGang; //是否是抢杠
		state.isTianHe = config.isTianHe; //是否是天和
		state.isDiHe = config.isDiHe; //是否是地和
	}
	calc(obj){
		var pai = new Pai("Feng", 4);
		console.log(pai.getDoraNextPai().getNatureName());
	}
}
function main(config,obj){
	var m = new JapaneseMaj(config);
	return m.calc(obj);
};
main({
	changFeng: 1,
	ziFeng: 1,
	dora: [new Pai("Wanzi", 1)],
	lidora: [new Pai("Wanzi", 1)],
	isLiZhi: false,
	isYiFa: false,
	isLingShang: false,
	isZimo: false,
	isLast: false,
	isQiangGang: false,
	isTianHe: false,
	isDiHe: false
},[
	new Pai("Wanzi",1),
	new Pai("Wanzi",1),
	new Pai("Wanzi",1),
	new Pai("Wanzi",1),
	new Pai("Wanzi",2),
	new Pai("Wanzi",3),
	new Pai("Wanzi",4),
	new Pai("Wanzi",5),
	new Pai("Wanzi",6),
	new Pai("Wanzi",7),
	new Pai("Wanzi",8),
	new Pai("Wanzi",9),
	new Pai("Wanzi",9),
	new Pai("Wanzi",9),
]);