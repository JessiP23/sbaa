const API_URL = 'https://jsonplaceholder.typicode.com/posts';
//random data
//asynchronous function with parameter query
async function fetchData(query = '') {
    //GET request to API endpoint
  const response = await fetch(`${API_URL}?q=${query}`);
  //JSON format of http response
  const data = await response.json();
  //return json format from the api
  return data;
}

//asynchronous function called contentData with parameter newPost
async function contentData(newPost) {
    //http post request to the api endpoint
  const response = await fetch(API_URL, {
    method: 'POST',
    //the request contains json data
    headers: {
      'Content-Type': 'application/json'
    },
    //convert contentData parameter into a JSON string 
    body: JSON.stringify(newPost)
  });
  //conver to json format the response of te http
  const data = await response.json();
  //return json format
  return data;
}

//div created, then inside teh div are added the title and body, divs are styled to differentiate from other divs

//render posts from api_url with body and title
function renderGallery(container, data) {
    //clean the content of container
  container.innerHTML = '';
  //iterate over each item in data array
  data.forEach(item => {
    //single post
    const postElement = document.createElement('div');
    //each list contains a class called post
    postElement.classList.add('post');
    //the post contains the title and the body of the post
    postElement.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.body}</p>
    `;
    //the post is added to the container element
    container.appendChild(postElement);
  });
}


//event listener 
document.addEventListener('DOMContentLoaded', async () => {
  const gallery = document.getElementById('gallery');
  
  // Fetch initial data and render gallery
  const data = await fetchData();
  renderGallery(gallery, data);

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', async () => {
    const query = searchInput.value;
    const searchData = await fetchData(query);
    renderGallery(gallery, searchData);
  });

  const newPostForm = document.getElementById('newPostForm');
  newPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(newPostForm);
    const newPost = {
      title: formData.get('title'),
      body: formData.get('body')
    };
    await contentData(newPost);
    // After successful post, refresh the gallery
    const refreshedData = await fetchData();
    renderGallery(gallery, refreshedData);
    // Clear form fields
    newPostForm.reset();
  });
});
