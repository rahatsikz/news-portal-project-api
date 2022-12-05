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
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

loadCategory();
