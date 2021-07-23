

function loadcharacters(characters){
    const characterList = document.createElement("div");
    characterList.className="characters-list";
    const title = document.createElement("div")
    title.className="header";
    title.innerHTML=`
    <h2 class="titleheading">Rick & Morty Characters</h2>`;
    // characterList.append(title);
    document.body.append(title);
    characters.forEach( (characters)=>{
      const characterscontainer = document.createElement("div");
      characterscontainer.className="characters-container";
      
      characterscontainer.innerHTML = `
      <div>
      <img class="dp" src=${characters.image}></img>
      </div>
      <div>
      <h5 class="character-name">Name: ${characters.name}<h5>
      <h4 class="status">Status: ${characters.status}<h4>
      <h4 class="gender">Gender: ${characters.gender}<h4>
      </div>
      `;
      characterList.append(characterscontainer);
    });
    document.body.append(characterList);
  }
  
  //Fetching data from API URL.//
  
 async function getcharacters(){
   const data = await fetch("https://rickandmortyapi.com/api/character",{
      method:"GET"
    });
    const users = await data.json();
    // loadcharacters(users.results);


    //Buttons for Pages//
    const Pages = Math.ceil(users.results.length / 10);
  
  const pagination = document.getElementById('pagination');
  
  // creating button element as per the data//
  for (let i = 1; i <= Pages; i++) {
    const page = document.createElement("button");
    page.className = "page-button";
    page.innerText = i;


    page.onclick = function () {
         
  
      const pageUsers = users.results.filter(
        (user, index) => index >= (i - 1) * 10 && index < i * 10
      );
      document.querySelector(".characters-list").remove();
      document.querySelector(".header").remove();
      loadcharacters(pageUsers);
    };
    
    pagination.append(page);
  }

  //Displaying the First ten data alone.//

  const firstTenUsers = users.results.filter((user, index) => index < 10);
  console.log(firstTenUsers);

  console.log("No of users are ", users.results.length);

  loadcharacters(firstTenUsers);
  }
  
  getcharacters();
  
  
  
 