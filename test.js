//测试用例
import JapaneseMaj from "./src/JapaneseMaj.js";
var maj = new JapaneseMaj({
	changFeng: 2, // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
	ziFeng: 2, // Number类型，自风，东1南2西3北4
	dora: []
});
var paixing = JapaneseMaj.getPaixingFromString("11m678s22z1m 11111p 66666z");
var res = maj.getYakuCalculator(paixing);
if(res)
	console.log(res.calcYaku(maj.state));
console.log(maj.calcXiangting(paixing));