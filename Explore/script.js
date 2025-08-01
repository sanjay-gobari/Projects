
const API = "oD4Uj9hQpq4ZfVpG4TrIKk7XGmSWN8vqb1Sdoi6d7GTLv9sJ7OV8MYDP"
// const base_URL ="https://api.pexels.com/v1/curated?per_page=40"
const base_URL = "https://google"
const sampleData = {
  photos: [
    { src: { medium: "https://images.pexels.com/photos/29663700/pexels-photo-29663700/free-photo-of-butterfly-on-pink-zinnia-in-sunlit-garden.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/29827505/pexels-photo-29827505/free-photo-of-aerial-landscape-view-in-the-philippines.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/29795392/pexels-photo-29795392/free-photo-of-artistic-coffee-and-fruit-arrangement-photography.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/29615941/pexels-photo-29615941/free-photo-of-silhouettes-walking-along-a-historic-wall-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/16621446/pexels-photo-16621446/free-photo-of-sand-close-up.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/27947497/pexels-photo-27947497/free-photo-of-morocco-sahara-desert.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/27127850/pexels-photo-27127850/free-photo-of-trees-in-a-valley-among-mountains.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/29985415/pexels-photo-29985415/free-photo-of-silhouetted-woman-walking-in-darkened-urban-tunnel.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/29476570/pexels-photo-29476570/free-photo-of-vibrant-birdhouses-in-swedish-birch-forest.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/29987655/pexels-photo-29987655/free-photo-of-pigeons-in-foggy-urban-landscape.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/17830900/pexels-photo-17830900/free-photo-of-grizzly-bear-on-snow.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" } },
    { src: { medium: "https://images.pexels.com/photos/29978380/pexels-photo-29978380/free-photo-of-foggy-day-at-brooklyn-bridge-with-umbrella-holders.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" } },
  ]
}
const imageBox = document.getElementById("image-box")
insertPhoto(null)
// loadData();
async function loadData() {
  const headers = {
    Authorization: API,
  };
  try {
    const response = (await fetch(base_URL, { headers }));
    if (response.ok) {
      console.log(response)
      const data = await response.json();
      console.log(data)
      insertPhoto(data)
    }
  }
  catch (err) {
    console.log(err)
  }
}

function addElm(imgPath = "") {
  const elm = document.createElement("div")
  elm.classList.add("image")

  const img = document.createElement("img")
  img.src = imgPath;

  elm.appendChild(img)
  imageBox.appendChild(elm)
}



function insertPhoto(data) {
  if (!data) { data = sampleData }
  const elms = data.photos.map((elm, i) => {
    return (
      addElm(elm.src.medium)
    )
  });
}



function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    insertPhoto("")
  }
}

window.addEventListener('scroll', handleScroll);