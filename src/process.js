// let i = 0;
// while(document.getElementById("DgQuartier_Codepostal_Id_quartier_"+i)){
//     console.log(
//         document.getElementById("DgQuartier_Codepostal_Id_quartier_"+i).innerHTML 
//         + " : " + 
//         document.getElementById("DgQuartier_Codepostal_id_codepostal_"+i).innerHTML
//     );
//     i++;
// }


const cheerio = require('cheerio');
var fs = require('fs');
var textF = fs.readFileSync('output.txt');
var markup = textF.toString();

async function process(markup){
    let $ = await cheerio.load(markup);
    console.log($("#DgQuartier_Codepostal_id_codepostal_17").text());
}
process(markup);