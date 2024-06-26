


//Filter section
let adventureList = [];
let adventures = document.getElementsByClassName("adventure");
for(let i = 0; i < adventures.length; i++){
    let adventureName = adventures[i].innerHTML;
    adventureList.push(adventureName);
}

let searchBar = document.getElementById("search-bar");
searchBar.addEventListener('keyup', function(){
    let text = searchBar.value;
    for(let i = 0; i < adventures.length; i++){
        if(adventureList[i].indexOf(text) < 0){
            adventures[i].style.display = 'None';
        }else {
            adventures[i].style.display = 'Block';
        }
    }
    
});

//Form section
let checkbox = document.getElementById('petCheckbox');
let selectionDiv = document.getElementById('petSelection');

checkbox.addEventListener('change', function(event){
    if(checkbox.checked == true){
        selectionDiv.style.display = 'Block';
    } else {
        selectionDiv.style.display = 'None';
    }
});

let saveForm = document.getElementById('saveForm');
saveForm.addEventListener('submit', function(event){
    event.preventDefault();
    let nameText = saveForm.elements[0].value;
    let addressText = saveForm.elements[1].value;
    let ageText = saveForm.elements[2].value;
    let doesHavePets = saveForm.elements[3].checked;
    let petText = 'No pets';
    if(nameText == ''){
        alert('Please enter a name');
        return;
    }
    if(addressText == ''){
        alert('Please enter an address');
        return;
    }
    if(ageText == ''){
        alert('Please enter an age');
        return;
    }
    if(doesHavePets){
        petText = saveForm.elements[4].value;
    }
    if(petText == 'Dog') {
        alert('Sorry, our dog capacity is full :(');
        return
    }
    alert('Booking saved! Info:\n' + nameText + '\n' + addressText + '\n' + ageText + '\n' + petText)

});