//测试用例：计算22334455667788万的役种和番、符数。
import JapaneseMaj from "./src/JapaneseMaj.js";
var maj = new JapaneseMaj({
	dora: [JapaneseMaj.getPai("Wanzi",1)]
});
var paixing = JapaneseMaj.getPaixingFromString("22334455667788m");
var res = maj.getYakuCalculator(paixing);
if(res)
	console.log(res.calcYaku(maj.state));
console.log(maj.calcXiangting(paixing));