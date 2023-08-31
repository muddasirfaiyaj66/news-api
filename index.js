const handleCategory = async() =>{
    
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    const trimedData = data.data.news_category.slice(0,3);
    trimedData.forEach((category)=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>

        `;
        tabContainer.appendChild(div);
    })
    // console.log(data.data.news_category);

};

const handleLoadNews = async(categoryId) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    data.data.forEach((news) =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
        <figure><img src="${news.image_url}" alt="News Banner " /></figure>
        <div class="card-body">
        <button class="my-2 py-2 px-3 mx-auto  rounded-full border-none bg-pink-500 text-white font-medium ">
        ${news?.rating?.badge}
        </button>
          <h2 class="card-title">${news?.title}</h2>
          <p>${news?.details?.slice(0,200)}....</p>
          <p class="font-bold">Total View: ${news.total_view ? news.total_view : "no views"}</p>
          <div class="flex justify-between items-center p-2">
          <div ><img class="rounded-full w-20" src="${news.author.img}"/>
            <div>
                <h3 class="pl-2 text-xl my-2">${news?.author?.name}</h3>
                  <small>${news?.author?.published_date}</small>
                
                  </div>
          </div>
          <div class="card-actions justify-end">
            <button onclick="handleModal('${news._id}')" class="btn btn-primary">Details</button>
          </div>
          </div>
          
          
          </div>
          
        </div>
      
        
        `;
        cardContainer.appendChild(div);

    });
    
};

const handleModal = async (newsId) =>{
    
    const response =await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data =await response.json();
    const news = data.data[0];
    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    div.innerHTML =
    `
    <dialog id="my_modal_1" class="modal">
    <form method="dialog" class="modal-box">
    <div class="card bg-base-100 shadow-xl">
    <figure><img src="${news.image_url}" alt="News Banner" /></figure>
    <div class="card-body">
    <button class="my-2 py-2 px-3 mx-auto  rounded-full border-none bg-pink-500 text-white font-medium ">
    ${news?.rating?.badge}
    </button>
      <h2 class="card-title">${news?.title}</h2>
      <p>${news?.details}</p>
      <p class="font-bold">Total View: ${news.total_view ? news.total_view : "no views"}</p>
      <div class="flex justify-between items-center p-2">
      <div ><img class="rounded-full w-20" src="${news.author.img}"/>
        <div>
            <h3 class="pl-2 text-xl my-2">${news?.author?.name}</h3>
              <small>${news?.author?.published_date}</small>
            
              </div>
      </div>
      
      </div>
      
      
      </div>
      
   
  
    <div class="modal-action">
        <button class="btn">Close</button>
      </div>
    </div>
    </form>
  </dialog>
`;

    
    
    modalContainer.appendChild(div);

    const modal = document.getElementById("my_modal_1");
    modal.showModal();

};




handleCategory();
handleLoadNews('01');