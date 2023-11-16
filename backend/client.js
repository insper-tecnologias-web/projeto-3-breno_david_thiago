const axios = require('axios');

const tickerSymbols = [
  "AAPL",
  "MSFT",
  // "AMZN",
  // "GOOGL",
  // "FB",
  // "BRK.B",
  // "JNJ",
  // "TSLA",
  // "V",
  // "PG",
  // "JPM",
  // "NVDA",
  // "UNH",
  // "BAC",
  // "MA",
  // "DIS",
  // "HD",
  // "NFLX",
  // "VZ",
  // "ADBE",
  // "T",
  // "INTC",
  // "CSCO",
  // "GS",
  // "ABT",
  // "GE",
  // "MCD",
  // "CRM",
  // "BA",
  // "XOM",
  // "PEP",
  // "IBM",
  // "CAT",
  // "MMM",
  // "CVX",
  // "CAT",
  // "KO",
  // "ORCL",
  // "WMT",
  // "PFE",
  // "CVS",
  // "PYPL",
  // "UNP",
  // "GM",
  // "BMY",
  // "COP",
  // "DD",
  // "MRK",
  // "GM",
  // "MS"
];

const specificCoin = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h'
  },
  headers: {
    'X-RapidAPI-Key': '9dc0cd25c5msh7093cea7eab33dbp1ed6d1jsne0b3a44acc73',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

const yahooFinancials = {
  method: 'GET',
  url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
  params: {
    symbol: 'AMRN',
    region: 'US'
  },
  headers: {
    'X-RapidAPI-Key': '9dc0cd25c5msh7093cea7eab33dbp1ed6d1jsne0b3a44acc73',
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  }
}
const coins = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  },
  headers: {
    'X-RapidAPI-Key': '9dc0cd25c5msh7093cea7eab33dbp1ed6d1jsne0b3a44acc73',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};


const stocks = {
  method: 'GET',
  url: 'https://bloomberg-market-and-financial-news.p.rapidapi.com/stock/get-financials',
  params: {id: 'aapl:us'},
  headers: {
    'X-RapidAPI-Key': '9dc0cd25c5msh7093cea7eab33dbp1ed6d1jsne0b3a44acc73',
    'X-RapidAPI-Host': 'bloomberg-market-and-financial-news.p.rapidapi.com'
  }
};

const statistics = {
  method: 'GET',
  url: 'https://bloomberg-market-and-financial-news.p.rapidapi.com/stock/get-statistics',
  params: {
    id: 'aapl:us',
    template: 'STOCK'
  },
  headers: {
    'X-RapidAPI-Key': '9dc0cd25c5msh7093cea7eab33dbp1ed6d1jsne0b3a44acc73',
    'X-RapidAPI-Host': 'bloomberg-market-and-financial-news.p.rapidapi.com'
  }
};



const getCrypto = async(request) => {
    try {
        const response = await axios.request(request);
        // console.log("response.data.symbol--->", response.data.symbol);
        // console.log("response.data.price.regularMarketChangePercent.fmt--->", response.data.price.regularMarketChangePercent.fmt);
        // console.log("response.data.price.regularMarketPrice.fmt--->", response.data.price.regularMarketPrice.fmt);
        // console.log("response.data.quoteType.shortName--->", response.data.quoteType.shortName);
        
        return response
    } catch (error) {
        console.error(error);
    }

}



const stocksData = [];
const stocksArray = async(options) => {
  console.log(options)
  response = await getCrypto(options);
  const stock = {
    name: response.data.quoteType.shortName,
    symbol: response.data.symbol,
    price: response.data.price.regularMarketChangePercent.fmt,
    change: response.data.regularMarketChangePercent.fmt,

  }
  stocksData.push(stock)
}



const makeOptions = async() => {
  tickerSymbols.forEach(symbol => {
    const yahoo = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
      params: {
        symbol: symbol,
        region: 'US',
      },
      headers: {
        'X-RapidAPI-Key': '9dc0cd25c5msh7093cea7eab33dbp1ed6d1jsne0b3a44acc73',
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      }
    }
    let stock = stocksArray(yahoo)
    stocksData.push(stock)
  })}

makeOptions();
console.log(stocksData);


