const getDigimon = (name) =>{
    let url = 'https://digimon-api.herokuapp.com/api/digimon/name/'+name;

    let request = new XMLHttpRequest();
    request.open('GET',url)
    request.onreadystatechange = ()=>{
        if(request.readyState == 4 && request.status == 200){
            let txtJson = request.responseText;
            let objJson = JSON.parse(txtJson);
            document.getElementById('name').value = objJson[0].name;
            document.getElementById('level').value = objJson[0].level;
            let img = document.querySelector("#digimonImg img");
            img.alt = objJson[0].name;
            img.src = objJson[0].img;
            let dataWrapper = document.querySelector("#dataWrapper");
            dataWrapper.classList.add('data-wrapper')
            let digiLink = document.querySelectorAll('.digiLink');
            digiLink[0].href = 'https://digimon.fandom.com/wiki/'+objJson[0].name;
            digiLink[1].href = 'https://digimon.fandom.com/wiki/'+objJson[0].name;
        }else if(request.readyState == 4 && request.status == 400){
            let dataWrapper = document.querySelector("#dataWrapper");
            dataWrapper.classList.add('data-wrapper')
            document.getElementById('name').value = 'Digimon não encontrado'
            document.getElementById('level').value = ':(';
        }
    }
    request.send()
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

let getSubmit = ()=>{
    let digimon = document.getElementById('diginame').value;
    if(digimon != ''){
        digimon.toLowerCase();
        getDigimon(capitalizeFirstLetter(digimon))
    }else{
        let dataWrapper = document.querySelector("#dataWrapper");
        dataWrapper.classList.add('data-wrapper')
        document.getElementById('name').value = 'Insira um digimon!'
        document.getElementById('level').value = ''
        let img = document.querySelector("#digimonImg img");
        img.src = 'img/digiPlaceHolder.png'
    }
}

