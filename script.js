const showcase = document.getElementById("showcase");
async function loadData(id){
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${id}`);
    const data = await res.json();
    const phones = data.data;
    if(phones.length == 0){
        alert("Invalid Input!");
        return;
    }
    populateData(phones);
}
loadData(13);
function populateData(phoneData){
    const showcaseContainer = document.querySelector(".phoneContainer");
    showcaseContainer.innerHTML = '';
    phoneData.forEach(eachPhone => {
        const parentDiv = document.createElement("div");
        parentDiv.className = "w-[20%] h-[90%] m-2 p-2 rounded-2xl flex flex-col items-center shadow-lg hover:shadow-xl hover:cursor-pointer  mb-10";

        const imgDiv = document.createElement("div");
        imgDiv.className = "h-24 w-24 mb-14";
        
        const img = document.createElement("img");
        img.src = eachPhone.image;
        imgDiv.appendChild(img);

        parentDiv.appendChild(imgDiv);

        const name = document.createElement("h1");
        name.className = "font-xl font-semibold mb-4";
        name.id = "phone_name";
        name.textContent = eachPhone.phone_name;

        parentDiv.appendChild(name);

        const button = document.createElement("button");
        button.type = 'button';
        button.className = "m-2 p-2  rounded-full border border-solid border-gray-500";
        button.textContent = "Show Details";
        button.addEventListener('click', function() {
            modalDetail(eachPhone.slug,eachPhone.phone_name);
        });
        parentDiv.appendChild(button);

        showcaseContainer.appendChild(parentDiv);
    });
    console.log(phoneData);
}
function findPhone(){
    const searchVal = document.getElementById('inputVal').value;
    loadData(searchVal);
    
    const showcaseElement = document.getElementById('showcase');
    showcaseElement.scrollIntoView({ behavior: 'smooth' });
}
async function modalDetail(phoneSlug,phone_name){
    if (phoneSlug) {
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneSlug}`);
        const data = await res.json();
        const moreDetails = data.data;
        console.log(moreDetails);
        processGetDetails(moreDetails,phone_name);
    }
}
function processGetDetails(data,name){
    const my_modal = document.getElementById('my_modal');
    my_modal.showModal();
    const form = document.querySelector(".getDetail");
    form.innerHTML = '';
    const img = document.createElement("img");
    img.src = data.image;
    form.appendChild(img);
    const ul = document.createElement("ul");
    ul.className = "w-48 text-sm font-medium text-gray-900 bg-white dark:text-gray-600 w-[90%]";
    const brand = document.createElement("li");
    brand.className = "w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600";
    brand.textContent = "Brand: " + data.brand;

    const li = document.createElement("li");
    li.className ="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600";
    li.textContent = "Phone: "+name;
    const li2 = document.createElement("li");
    li2.className = "w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600";
    li2.textContent = "Storage: "+data.mainFeatures.storage;

    const li3 = document.createElement("li");
    li3.className = "w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600";
    li3.textContent = "Display: "+data.mainFeatures.displaySize;

    const li4 = document.createElement("li");
    li4.className = "w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600";
    li4.textContent = "Chipset: "+data.mainFeatures.chipSet;

    const releaseDate = document.createElement("li");
    releaseDate.className = "w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600";
    releaseDate.textContent = "Release Date: "+data.releaseDate;
    
    ul.appendChild(brand);
    ul.appendChild(li);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(releaseDate);
    
    form.appendChild(ul);

    const closeDiv = document.createElement("div");
    closeDiv.className = "modal-action flex justify-center";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn bg-gray-600 text-white hover:bg-gray-500 hover:shadow-lg rounded-lg m-2 p-2";
    btn.textContent = "Close";
    btn.addEventListener('click', function() {
        my_modal.close(); 
    });
    closeDiv.appendChild(btn);
    form.appendChild(closeDiv);
}