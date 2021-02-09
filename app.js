// get input data
const getInputFood = food => {
  if (food == "") {
    errorHandler();
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
      .then(res => res.json())
      .then(data => displayFood(data.meals))
  }
}
//search button
const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', () => {
  document.getElementById('foods').innerHTML = "";
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.style.display = "none";
  displayView("foodDetails", "foods");
  const inputFood = document.getElementById('food').value;
  getInputFood(inputFood);
})
// food Name field
const displayFood = foods => {
  const divInfo = document.getElementById("foods");
  if (foods != null) {
    foods.forEach(foodName => {
      const foodDiv = document.createElement("div");
      foodDiv.className = "foodDiv";
      const foodNameInfo = `
        <img onclick="displayFoodDetails('${foodName.strMeal}')"  class="w-100 image" src="${foodName.strMealThumb}" alt="">
        <h3 onclick="displayFoodDetails('${foodName.strMeal}')" class="foodName">${foodName.strMeal}</h3>
      `
      foodDiv.innerHTML = foodNameInfo;
      divInfo.appendChild(foodDiv);
    });
  } else(
    errorHandler()
  )
}
// food details
const displayFoodDetails = foodDetails => {
  document.getElementById('foodDetails').innerHTML = "";
  displayView("foods", "foodDetails");
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodDetails}`)
    .then(res => res.json())
    .then(data => renderFoodInfo(data.meals[0]))
}
// display div
const displayView = (id1, id2) => {
  const detailsArea = document.getElementById(id1);
  detailsArea.style.display = "none";
  const divDetails = document.getElementById(id2);
  divDetails.style.display = "grid";
}
// render food info
const renderFoodInfo = allDetails => {
  const arrayI = Object.values(allDetails);
  const ingredients = arrayI.splice(9, 10);
  const measure = arrayI.splice(19, 10);
  const foodInfoDiv = document.createElement("div");
  const divDetails = document.getElementById("foodDetails");
  const ul = document.createElement("ul");
  ul.id = 'ingredients';
  foodInfoDiv.className = "foodInfoDiv";
  const foodDetailsInfo = `
    <img class="w-100 image2" src="${allDetails.strMealThumb}" alt="">
    <h3 class="foodText text-center">${allDetails.strMeal}</h3>
    <h4>Ingredients</h4>
    <br>
 `
  foodInfoDiv.innerHTML = foodDetailsInfo;
  divDetails.appendChild(foodInfoDiv);
  for (let i = 0; i < 10; i++) {
    const item1 = measure[i];
    const item2 = ingredients[i];
    if(item1 != "" && item2 != ""){
      const li = document.createElement('li');
    const liText = `
    <li><i class='fas fa-check-square icon'></i> ${item1} ${item2}</li>
    `
    li.innerHTML = liText;
    ul.appendChild(li);
    }
    else{
      break;
    }
  }
  foodInfoDiv.appendChild(ul);
}
// error handling
const errorHandler = () => {
  displayView("foodDetails", "foods");
  const errorDetailsInfo = document.getElementById("errorMessage");
  errorDetailsInfo.style.display = "block";
  const errorDetails = `
  <div class="foodText">
    <h2>Nothing Available!!! </h2>
  </div>
  `
  errorDetailsInfo.innerHTML = errorDetails;
}