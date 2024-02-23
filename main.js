const API_KEY = `ba6cff8a0208485f8e5d2cdcbf812b9a`;
let newsList = [];
const menus = document.querySelectorAll('.menu-bar button');
let url = new URL(`https://newswen.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`);

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

const getNews=async()=>{
  try{
    const response = await fetch(url);
    const data = await response.json();
    if(response.status === 200){
      if(data.articles.length === 0){
        throw new Error("No result for this search")
      }
      newsList = data.articles;
      render();
    }else{
      throw new Error(data.message)
    }
    
  }catch(error){
    errorRender(error.message)
  }
  
}

const getLatestNews = async() =>{
  url = new URL(`https://newswen.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`);
  getNews();
}

const getNewsByCategory=async(event)=>{
  const category = event.target.textContent.toLowerCase();
  url = new URL(`https://newswen.netlify.app//top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
  getNews();
}

const getNewByKeyword=async()=>{
  const keyword = document.getElementById('search-input').value;
  url = new URL(`https://newswen.netlify.app//top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
  getNews();
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

const errorRender=(errorMessage)=>{
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}</div>`
  document.getElementById('news-board').innerHTML=errorHTML;
}
getLatestNews();