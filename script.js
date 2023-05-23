const searchBox=document.querySelector(".searchBox")
const searchBtn=document.querySelector(".searchBtn")
const recipeContainer=document.querySelector(".recipe-container")
const recipeDetailsContent= document.querySelector(".recipe-details-content")
const recipeCloseBtn= document.querySelector(".recipe-close-btn")
const recipeDetails= document.querySelector('.recipe-details')

const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>"
    try {
        
    
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const res=await data.json();

    recipeContainer.innerHTML=""
    res.meals.forEach(meal => {
        const recipeDiv= document.createElement('div')
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span>Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
       
        `
        const button=document.createElement('button')
        button.innerHTML="View Recipe"
        recipeDiv.appendChild(button)
        //adding eventlistener to recipe button
         button.addEventListener('click',()=>{
            openrecipepopup(meal);
         })
        recipeContainer.appendChild(recipeDiv)
    });
    //console.log(res.meals[0])
}
        catch (error) {
            recipeContainer.innerHTML=`<h2 class="errormsg">Error in Fetching Recipes !!</h2>`
            searchBox.value=""
        }
}

const fetchIngredients=(meal)=>{
console.log(meal)
let ingredientsList=""
for(let i=1;i<=20;i++){
    const ingredient=meal[`strIngredient${i}`]
    if(ingredient)
    {
        const measure= meal[`strMeasure${i}`]
        ingredientsList +=`<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
    
}
return ingredientsList;
}
const openrecipepopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>    
    <h3>Ingredients</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}
        
    </ul>
    <div class="recipeinstructions">
    <h3>Instructions:</h3>
    <p >${meal.strInstructions}</p>
        </div>
    `
    
    recipeDetails.style.display="block";
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none"
})

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`
        <h2>Type the Meal in search Box.</h2>`;
        return ;
    }
    fetchRecipes(searchInput);
    
})