const input = document.querySelector('form input');
const form = document.querySelector('form');
const btn = document.querySelector('form button');
const container = document.querySelector('.container');
const main = document.querySelector('main');
const heading = document.createElement('h2');
const section =document.querySelector('section');
const randombtn = document.querySelector('.flex>button');

const updateDish = data =>{
    
    if(data.meals === null){
        heading.textContent = `sorry! no result found try Again`;
        main.prepend(heading);
        container.innerHTML = ``;
    } else {
        heading.textContent = `Search result of ${form.input.value.trim()}:`;
        main.prepend(heading);
        container.innerHTML = ``;
        data.meals.forEach( dish =>{
            container.innerHTML += `<span id="${dish.idMeal}">
                <img src="${dish.strMealThumb}">
                <p><span>${dish.strMeal}</span></p>
                </span>`;
        });
    }
};

const search = async dish =>{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`);
    const data = await response.json();   
    return data;
};

const addMealToDOM = data =>{
    section.setAttribute('class','nothide');
    section.innerHTML =  `<h2>${data.strMeal}<span>(${data.strArea})</span></h2>
                            <img src="${data.strMealThumb}">
                            <h3>INGREDIENTS</h3>`;
    for(i=1;i<=20;i++){    
        if(data[`strMeasure${i}`].trim()){  
            let quan = data[`strMeasure${i}`];
            let item = data[`strIngredient${i}`];
            section.innerHTML += `<li>${item}-${quan}</li>`;
        } else {
            break;
        }
    }
    section.innerHTML += `<h3>RECIPIES</h3><p>${data.strInstructions}</p>`;
};

const updateSection = async id =>{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json(); 
    addMealToDOM(data.meals[0]);
};

btn.addEventListener('click', e => {
    e.preventDefault();
    const dish = form.input.value.trim();
  //  search(dish).then(data => console.log(data));
    section.innerHTML = ``;
    search(dish).then(data => updateDish(data));
});

container.addEventListener('click', e=>{
    const id = e.target.parentElement.id;
    updateSection(id);
});

const getRandom = async () =>{   
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json(); 
    container.innerHTML = ``; heading.textContent = ``;
    addMealToDOM(data.meals[0]);  
};

randombtn.addEventListener('click', e =>{
    getRandom();
});