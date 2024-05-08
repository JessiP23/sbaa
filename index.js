const API_URL = 'https://jsonplaceholder.typicode.com/posts';
async function fetchData(query = '') {
  const response = await fetch(`${API_URL}?q=${query}`);
  const data = await response.json();
  return data;
}

async function postData(newPost) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  });
  const data = await response.json();
  return data;
}

function renderGallery(container, data) {
  container.innerHTML = '';
  data.forEach(item => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.body}</p>
    `;
    container.appendChild(postElement);
  });
}

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

  // Example of user manipulation with post request
  // Assuming there's a form with id="newPostForm" and input fields for title and body
  const newPostForm = document.getElementById('newPostForm');
  newPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(newPostForm);
    const newPost = {
      title: formData.get('title'),
      body: formData.get('body')
    };
    await postData(newPost);
    // After successful post, refresh the gallery
    const refreshedData = await fetchData();
    renderGallery(gallery, refreshedData);
    // Clear form fields
    newPostForm.reset();
  });
});
