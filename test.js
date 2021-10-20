//测试用例
import JapaneseMaj from "./src/JapaneseMaj.js";
var maj = new JapaneseMaj({
	changFeng: 2, // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
	ziFeng: 2, // Number类型，自风，东1南2西3北4
	isZimo: true,
	dora: [],
	beidora: 0
});
var paixing = JapaneseMaj.getPaixingFromString("11221m 123m 345m 456m");
var res = maj.getYakuCalculator(paixing);
if(res)
	console.log(res.calcYaku(maj.state));
//console.log(maj.calcXiangting(paixing));