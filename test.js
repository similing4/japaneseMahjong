import Paixing from "./bean/Paixing.js";
import JapaneseMaj from "./JapaneseMaj.js";
import Pai from "./bean/Pai.js";
function main(config,obj){
	var m = new JapaneseMaj(config);
	var res = m.isHele(obj);
	if(res)
		console.log(res.calcYaku(m.state))
};
main({
	changFeng: 1,
	ziFeng: 1,
	dora: [new Pai("Wanzi", 1)],
	lidora: [new Pai("Wanzi", 1)],
	isLiangLiZhi: false,
	isLiZhi: false,
	isYiFa: false,
	isLingShang: false,
	isZimo: false,
	isLast: false,
	isQiangGang: false,
	isTianHe: false,
	isDiHe: false
}, Paixing.parseFromString("22334455667788m"));