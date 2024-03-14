const axios = require('axios')
const cheerio = require('cheerio')
const jogos = require('./jogos.json')
const fs = require('fs')
const url = `https://pt.wikipedia.org/wiki/Jogo_do_Ano`


async function getGoty(url){
  const tabelas = []
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const elementos = $('.wikitable tbody');
  for(let i = 0; i < elementos.length; i++){
    const dados = $('.wikitable tbody').eq(i).text();
    const titulo = $('.mw-headline').eq(i+1).text()
    const lista = dados.split('\n').filter((palavra) => palavra.trim() !== '');
    lista.splice(0, 0, titulo)
    tabelas.push(lista)
    console.log(tabelas)
  }
  return tabelas
  }


async function tratamento(){
  const listas = await getGoty(url)
  const jogos = []

  for (const lista of listas) {
    for (let i = 1; i < lista.length; i += 4) {
      const obj = {
        premiacao: lista[0],
        ano: lista[i],
        jogo: lista[i + 1],
        genero: lista[i + 2],
        produtora: lista[i + 3],
      };
      jogos.push(obj)
    }
  }
  console.table(jogos)
}
  // const newobj = JSON.stringify(jogos, null, 1)
  // fs.writeFileSync('./jogos.json', newobj, 'utf-8')



tratamento()
