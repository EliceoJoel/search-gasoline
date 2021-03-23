const ui = new UI();

document.addEventListener("DOMContentLoaded", ()=>{
   ui.showStablishments();
});

//enable search establishments
const searcher = document.getElementById('search');
searcher.addEventListener('input', ()=>{
   if(searcher.value.length > 5){
      ui.getSuggestion(searcher.value);
   }else{
      ui.showStablishments();
   }
})