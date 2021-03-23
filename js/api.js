class API {

   async getData(){
      const total = 1000;
      const data = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);
      const responseJSON = await data.json();
      return responseJSON;
   }
}