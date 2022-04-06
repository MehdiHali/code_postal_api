
const https = require('https');
const { default: axios } = require('axios');
const cheerio = require('cheerio');

// At request level
const agent = new https.Agent({  
    rejectUnauthorized: false
});

async function laodToCheerio(url){
    const {data} = await axios.get('https://www.codepostal.ma/code_domicile.aspx', { httpsAgent: agent });
    // console.log(data);
    const $ = cheerio.load(data);
    console.log($('a#DgVilles_Id_ville_4').attr("href"));
}

laodToCheerio("https://www.codepostal.ma/code_domicile.aspx");