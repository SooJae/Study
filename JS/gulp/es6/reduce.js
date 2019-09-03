const words = ["Beachball","Rodeo","Angel","Aardvark","Uniform","Joker"
,"Clover", "Bali","Choco","November","Bali"];
const logWords = words.reduce((a, w) => w.length>6?a+" "+w : a,"").trim();

console.log(logWords);