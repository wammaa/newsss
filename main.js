const API_KEY = `ba6cff8a0208485f8e5d2cdcbf812b9a`;
let newsList = [];
const menus = document.querySelectorAll('.menu-bar button');

menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)));

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const getLatestNews = async() =>{
  const url = new URL(`https://newswen.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("rrrr", newsList);
}

const getNewsByCategory=async(event)=>{
  const category = event.target.textContent.toLowerCase();
  const url = new URL(`https://newswen.netlify.app//top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
}

const getNewByKeyword=async()=>{
  const keyword = document.getElementById('search-input').value;
  const url = new URL(`https://newswen.netlify.app//top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
  const response = await fetch(url);
  const data = await response.json();
  console.log("Aaaa", data)
  newsList = data.articles;
  render()
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