const API_KEY = `ba6cff8a0208485f8e5d2cdcbf812b9a`;
let news = [];

const getLatestNews = async() =>{
  const url = new URL(`https://newswen.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`);
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("rrrr", news);
}

getLatestNews();