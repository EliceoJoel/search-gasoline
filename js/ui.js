class UI {
   constructor() {

      //api
      this.api = new API();

      //create the markers with layerGroup
      this.markers = new L.LayerGroup();

      // Iniciar el mapa
      this.mapa = this.inicializarMapa();

   }

   inicializarMapa() {
      // Inicializar y obtener la propiedad del mapa
      const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
      const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap< a>';
      L.tileLayer(
         'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; ' + enlaceMapa + ' Contributors',
         maxZoom: 18,
         }).addTo(map);
      return map;

   }

   showStablishments(){
      this.api.getData()
         .then(data => {
            const results = data.results;
            //show pines in the map
            this.showPines(results);
         })
         .catch(error=>{
            alert("somethig went wrong, reload the page")
         })
   }

   showPines(datas){
      //clear the markers
      this.markers.clearLayers();

      //cycle through the results
      datas.forEach(data => {
         //destructuring
         const {latitude, longitude, calle, regular, premium, razonsocial} = data;
         //create popup
         const popUpOptions = L.popup()
         .setContent(`<p><b>${razonsocial}</b></p>
                      <p><b>Calle:</b> ${calle}</p>
                      <p><b>Regular:</b>: $${regular}</p>
                      <p><b>Premium:</b> $${premium}</p>`);
         //create a marker
         const marker = new L.marker([
            parseFloat(latitude),
            parseFloat(longitude)
         ]).bindPopup(popUpOptions);     
         this.markers.addLayer(marker);
      });

      this.markers.addTo(this.mapa);
   }

   getSuggestion(search){
      this.api.getData()
      .then(datos=>{
         const results = datos.results;
         //filter with search
         this.filterResultsWithSearch(results, search);
      })
   }

   filterResultsWithSearch(results, search){
      //filter with .filter
      const filtro = results.filter(filtro => filtro.calle.indexOf(search) !== -1);

      //show only filter markers
      this.showPines(filtro);
   }
}