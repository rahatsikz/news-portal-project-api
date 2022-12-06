const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("mt-2");
    newDiv.classList.add("mouse-cursor");
    newDiv.innerHTML = `
    <span onclick = "loadNews( '${category.category_id}' )" > ${category.category_name} </span>
    `;
    categoryContainer.appendChild(newDiv);
  });
};

const loadNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id} `)
    .then((res) => res.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error));
  toggleSpinner(true);
};

const displayNews = (data) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  toggleSpinner(false);

  const itemFound = document.getElementById("item-found");
  itemFound.innerHTML = `
  <p class="p-3"> ${data.length} items found for this category </p>
  `;

  data.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col");
    newsDiv.innerHTML = `
    <div class="card p-3 rounded-3">
    <div class="row g-0">
      <div class="col-lg-4">
        <img src=" ${
          news.image_url
        } " class="img-fluid rounded-start" alt="main image" />
      </div>
      <div class="col-lg-8 ps-3">
        <div class="card-body">
          <h5 class="card-title fw-bold"> ${news.title} </h5>
          <p class="card-text text-secondary">
            ${news.details.slice(0, 300)}...
          </p>

          <div class="row align-items-center text-center">
            <div class="col-md-4 d-flex align-items-center mt-3 mt-md-0">
             <div class = "row  align-items-center justify-content-center justify-content-lg-start">
              <div class = "col-4">  
                <img src=" ${
                  news.author.img
                } " class = "img-fluid rounded-pill"  alt="author image"> 
              </div>
            
              <div class = "col-6 text-lg-start">
                <span> ${
                  news.author.name ? news.author.name : "No Author Found"
                } </span>
                <br>
                <small class = "text-secondary" > ${
                  news.author.published_date
                    ? news.author.published_date
                    : "No Date Found"
                } </small>
              </div>
             </div>

            </div>
          <div class="col-md-2 text-secondary mt-3 mt-md-0">
            <i class="fa-regular fa-eye pe-2"></i>
            <span> ${
              news.total_view ? news.total_view : "No views Found"
            } </span>
          </div>
          <div class="col-md-3 text-secondary mt-3 mt-md-0">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star-half-stroke"></i>
          </div>
          <div class = "col-md-3 arrow-color mt-3 mt-md-0">
            <i onclick = "loadDetails( '${
              news._id
            }' )" class="fa-solid fa-arrow-right-long mouse-cursor" data-bs-toggle="modal"
            data-bs-target="#modalpop"></i>
          </div>
        </div>

        </div>
      </div>
    </div>
  </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
};

const toggleSpinner = (isLoading) => {
  const loaderContainer = document.getElementById("loader");
  if (isLoading) {
    loaderContainer.classList.remove("d-none");
  } else {
    loaderContainer.classList.add("d-none");
  }
};

const loadDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data[0]))
    .catch((error) => console.log(error));
};

const displayDetails = (detail) => {
  const titleContainer = document.getElementById("modal-title");
  titleContainer.innerHTML = `Author: ${detail.author.name}`;
  const modalBodyContainer = document.getElementById("modal-body");
  modalBodyContainer.innerHTML = `${detail.details.slice(0, 200)}`;
};

loadCategory();
loadNews("08");
