
$(document).ready(()=>{
    const input = $("#SuperHero");
    const  buscar = $("#buscar");

    const superHeroName = $("#SuperHero-name");
    const superHeroOcupations = $("#SuperHero-ocupation");
    const superHeroAppearance = $("#SuperHero-appearance");
    const superHeroHeight = $("#SuperHero-height");
    const superHeroAlliance = $("#SuperHero-alliance");
    const superHeroWeight = $("#SuperHero-weight");
    const superHeroImagenResultado = $("#super-img-resultado");
    const superHeroGrafico = $("#super-grafico");


    buscar.click(()=>{
        const inputSuperHero = input.val();

        $
            .ajax(`https://www.superheroapi.com/api.php/4905856019427443/${inputSuperHero}`)
            .done((dato)=>{
               superHeroImagenResultado.attr("src", dato.image.url);
               superHeroName.html(`Nombre: ${dato.name}`);
               superHeroOcupations.html(` Ocupación: ${dato.work.occupation}`);
               superHeroAppearance.html(` Apariencia: Género: ${dato.appearance['gender']} - Color de ojos: ${dato.appearance['eye-color']} - Raza: ${dato.appearance['race']}`);
               superHeroHeight.html(`Altura: ${dato.appearance.height[1]}`);
               superHeroAlliance.html(`Alianza : ${dato.connections["group-affiliation"]}`);
               superHeroWeight.html(`Peso: ${dato.appearance.weight[1]}`);

               console.log(dato)

               const datoPoints = Object.entries(dato.powerstats).map((stats)=>{
                   return {y:stats[1], label:stats[0]}
               })
               
               const options = {
                title: {
                    text: (` Estadísticas de poder para ${dato.name}`)
                },
    
                animationEnabled: true,
                data: [{
                    type: "pie",
                    startAngle: 40,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: datoPoints 
                }]
            };
               superHeroGrafico.CanvasJSChart(options);

            });
            
    });  
});