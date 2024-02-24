const API_KEY = `ba6cff8a0208485f8e5d2cdcbf812b9a`;
let newsList = [];
const menus = document.querySelectorAll('.menu-bar button');
let url = new URL(`https://newswen.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`);

menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)));

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;


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
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);
    const data = await response.json();
    console.log("aaaa", data);
    if(response.status === 200){
      if(data.articles.length === 0){
        throw new Error("No result for this search")
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
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
  document.getElementById('news-board').innerHTML=newsHTML;
}

const errorRender=(errorMessage)=>{
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}</div>`
  document.getElementById('news-board').innerHTML=errorHTML;
}

const paginationRender=()=>{
  const totalPages = Math.ceil(totalResults/pageSize);
  const pageGroup = Math.ceil(page/groupSize);
  let lastPage = pageGroup * groupSize;
  if(lastPage > totalPages){
    lastPage = totalPages;
  }
  const firstPage = lastPage - (groupSize - 1)<=0? 1:lastPage - (groupSize - 1);
  let paginationHTML = `<li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" href="#">&lt;</a></li>`;

  for(let i = firstPage; i<=lastPage; i++){
    paginationHTML += `<li class="page-item ${i===page?"active":''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
  }
  paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">&gt;</a></li>`;
  document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage=(pageNum)=>{
  console.log("movetoPage", pageNum)
  page = pageNum;
  getNews();
}
getLatestNews();