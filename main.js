const API_KEY = `ba6cff8a0208485f8e5d2cdcbf812b9a`;
let newsList = [];

const getLatestNews = async() =>{
  const url = new URL(`https://newswen.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("rrrr", newsList);
}

const render=()=>{
  const newsHTML = newsList.map(news=>`<div class="row news">
  <div class="col-lg-4">
    <img class="new-img-size" src="${news.urlToImage}">
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>
      ${news.description}
    </p>
    <div>
      ${news.source.name}*${news.publishedAt}
    </div>
  </div>
</div>`).join('');
  console.log("news", newsHTML)
  document.getElementById('news-board').innerHTML=newsHTML;
}

getLatestNews();