var express = require('express');
var router = express.Router();

stops = [
        {            
            route_ID:0,
            stop_name:"R1-1",
            stop_description:"Alcaldia",
            stop_latitude:16,
            stop_longitude:18
        },
         {
            route_ID:0,
            stop_name:"R1-2",
            stop_description:"Balboa, frente a Mr. Special",
            stop_latitude:16,
            stop_longitude:18
        },
         {
            
            route_ID:0,
            stop_name:"R1-3",
            stop_description:"Balboa, frente a Garaje Toro",
            stop_latitude:16,
            stop_longitude:18
        },
         {
            
            route_ID:0,
            stop_name:"R1-4",
            stop_description:"Palacio Recreacion y Deportes, Wilkins",
            stop_latitude:16,
            stop_longitude:18
        },
         {
            
            route_ID:0,
            stop_name:"R1-5",
            stop_description:"RUM - Calle Pinos",
            stop_latitude:16,
            stop_longitude:18
        },
         {
            
            route_ID:0,
            stop_name:"R1-6",
            stop_description:"RUM Calle Las Palmeras",
            stop_latitude:16,
            stop_longitude:18
        },
         {
            
            route_ID:0,
            stop_name:"R1-7",
            stop_description:"RUM - Calle Los Caobos",
            stop_latitude:16,
            stop_longitude:18
        },
         {
            
            route_ID:0,
            stop_name:"R1-8",
            stop_description:"Calle Martinez Nadal frente a Palacio",
            stop_latitude:16,
            stop_longitude:18
        },
         {
            
            route_ID:0,
            stop_name:"R1-9",
            stop_description:"Calle Martinez Nadal frente a Parque Proceres",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:1,
            stop_name:"R2-1",
            stop_description:"Plaza Colon",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:1,
            stop_name:"R2-2",
            stop_description:"Estacionamiento Luis Munoz Rivera",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:1,
            stop_name:"R2-3",
            stop_description:"Boulevard Eudaldo Baez",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:1,
            stop_name:"R2-4",
            stop_description:"Centro Gubernamental",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:1,
            stop_name:"R2-5",
            stop_description:"Plaza del Mercado",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:1,
            stop_name:"R2-6",
            stop_description:"Calle Ramon Emeterio Betances",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:1,
            stop_name:"R2-7",
            stop_description:"Casa Betances",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:3,
            stop_name:"R3-1",
            stop_description:"Plaza Colon",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:3,
            stop_name:"R3-2",
            stop_description:"Teatro Balboa",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:3,
            stop_name:"R3-3",
            stop_description:"Hotel Howard Johnson",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:3,
            stop_name:"R3-4",
            stop_description:"Banco Popular",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:3,
            stop_name:"R3-5",
            stop_description:"Viaducto",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:3,
            stop_name:"R3-6",
            stop_description:"Correo General",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:2,
            stop_name:"RM-1",
            stop_description:"Terminal Barcelona",
            stop_latitude:18.2045916,
            stop_longitude:-67.1388889
        },
        {
            
            route_ID:2,
            stop_name:"RM-2",
            stop_description:"Franco Farmacia Familiar",
            stop_latitude:18.207551,
            stop_longitude:-67.1506421
        },
        {
            
            route_ID:2,
            stop_name:"RM-3",
            stop_description:"Res. Monte Isleno",
            stop_latitude:18.212458,
            stop_longitude:-67.1520789
        },
        {
            
            route_ID:2,
            stop_name:"RM-4",
            stop_description:"Almacen Navideno",
            stop_latitude:18.2166285,
            stop_longitude:-67.1561968
        },
        {
            
            route_ID:2,
            stop_name:"RM-5",
            stop_description:"VIllas Centroamericanas",
            stop_latitude:18.2261317,
            stop_longitude:-67.1668117
        },
        {
            
            route_ID:2,
            stop_name:"RM-6",
            stop_description:"Urb. Quinto Cent.",
            stop_latitude:18.2286499,
            stop_longitude:-67.171492
        },
        {
            
            route_ID:2,
            stop_name:"RM-7",
            stop_description:"Cancha Urb. Quinto Cent.",
            stop_latitude:18.2302043,
            stop_longitude:-67.1687648
        },
        {
            
            route_ID:2,
            stop_name:"RM-8",
            stop_description:"Carr. 64 Esq. Calle Gaviota",
            stop_latitude:18.2345735,
            stop_longitude:-67.1725421
        },
        {
            
            route_ID:2,
            stop_name:"RM-9",
            stop_description:"Carr. 64 Esq. Calle Matildo Caban",
            stop_latitude:18.2378686,
            stop_longitude:-67.1727531
        },
        {
            
            route_ID:2,
            stop_name:"RM-10",
            stop_description:"Carr. 64 Esq. Calle Caracol",
            stop_latitude:18.2403227,
            stop_longitude:-67.1728816
        },
        {
            
            route_ID:2,
            stop_name:"RM-11",
            stop_description:"Parque de Pelota El Mani",
            stop_latitude:18.2467455,
            stop_longitude:-67.1745009
        },
        {
            
            route_ID:2,
            stop_name:"RM-12",
            stop_description:"Farmacia Familiar El Mani",
            stop_latitude:18.2403862,
            stop_longitude:-67.1730601
        },
        {
            
            route_ID:2,
            stop_name:"RM-13",
            stop_description:"Carr. 64 Matildo Caban",
            stop_latitude:18.2378933,
            stop_longitude:-67.1729149
        },
        {
            
            route_ID:2,
            stop_name:"RM-14",
            stop_description:"Frente a Gonzalo's",
            stop_latitude:18.2346505,
            stop_longitude:-67.1727061
        },
        {
            
            route_ID:2,
            stop_name:"RM-15",
            stop_description:"Carr. 64",
            stop_latitude:18.228487,
            stop_longitude:-67.1716343
        },
        {
            
            route_ID:2,
            stop_name:"RM-16",
            stop_description:"John Dewey College",
            stop_latitude:18.2264609,
            stop_longitude:-67.1697234
        },
        {
            
            route_ID:2,
            stop_name:"RM-17",
            stop_description:"Ricomini",
            stop_latitude:18.2164441,
            stop_longitude:-67.1563816
        },
        {
            
            route_ID:2,
            stop_name:"RM-18",
            stop_description:"Puente Peatonal",
            stop_latitude:18.212315,
            stop_longitude:-67.152297
        },
        {
            
            route_ID:2,
            stop_name:"RM-19",
            stop_description:"Correo Playa",
            stop_latitude:18.2062645,
            stop_longitude:-67.1512766
        },
        {
            
            route_ID:2,
            stop_name:"RM-20",
            stop_description:"Viadutos",
            stop_latitude:18.2041487,
            stop_longitude:-67.1468792
        },
        {
            
            route_ID:2,
            stop_name:"RM-21",
            stop_description:"Plaza Colon",
            stop_latitude:18.201369,
            stop_longitude:-67.1395037
        },
         {
            
            route_ID:2,
            stop_name:"R102-1",
            stop_description:"Terminal Barcelona",
            stop_latitude:18.204720,
            stop_longitude:-67.1388703
        },
        {
            
            route_ID:4,
            stop_name:"R102-2",
            stop_description:"Villa Pesquera",
            stop_latitude:18.2029727,
            stop_longitude:-67.1523936
        },
        {
            
            route_ID:4,
            stop_name:"R102-3",
            stop_description:"Parque Skateboard",
            stop_latitude:18.1951212,
            stop_longitude:-67.1547863
        },
        {
            
            route_ID:4,
            stop_name:"R102-4",
            stop_description:"Ramirez de Arellano",
            stop_latitude:18.1898111,
            stop_longitude:-67.1589461
        },
        {
            
            route_ID:4,
            stop_name:"R102-5",
            stop_description:"Guanajibo Homes",
            stop_latitude:18.1762152,
            stop_longitude:-67.1731883
        },
        {
            
            route_ID:4,
            stop_name:"R102-6",
            stop_description:"San Jose",
            stop_latitude:18.1849928,
            stop_longitude:-67.1663614
        },
        {
            
            route_ID:4,
            stop_name:"R102-7",
            stop_description:"Residencial Candelaria",
            stop_latitude:18.1962703,
            stop_longitude:-67.1539123
        },
        {
            
            route_ID:4,
            stop_name:"R102-8",
            stop_description:"Conector Nenadich",
            stop_latitude:16,
            stop_longitude:18
        },
        {
            
            route_ID:4,
            stop_name:"R102-9",
            stop_description:"Benigno Contreras",
            stop_latitude:18.204513,
            stop_longitude:-67.1518575
        },
        {
            
            route_ID:5,
            stop_name:"R105-1",
            stop_description:"Terminal Barcelona",
            stop_latitude:18.2047202,
            stop_longitude:-67.1388703
        },
        {
            
            route_ID:5,
            stop_name:"R105-2",
            stop_description:"Calle San Ignacio",
            stop_latitude:18.1993608,
            stop_longitude:-67.1339641
        },
        {
            
            route_ID:5,
            stop_name:"R105-3",
            stop_description:"Villa Angelica",
            stop_latitude:18.1993396,
            stop_longitude:-67.1308804
        },
        {
            
            route_ID:5,
            stop_name:"R105-4",
            stop_description:"Calle Canteera",
            stop_latitude:18.1975908,
            stop_longitude:-67.1240135
        },
        {
            
            route_ID:5,
            stop_name:"R105-5",
            stop_description:"Panaderia Wesley",
            stop_latitude:18.1940445,
            stop_longitude:-67.114562

        },
        {
            
            route_ID:5,
            stop_name:"R105-6",
            stop_description:"Urb. Pura Brisa",
            stop_latitude:18.199061,
            stop_longitude:-67.104765
        },
        {
            
            route_ID:5,
            stop_name:"R105-7",
            stop_description:"Camino Juan Alonso",
            stop_latitude:18.1997327,
            stop_longitude:-67.1016218
        },
        {
            route_ID:5,"stop_name":"R105-8",
            stop_description:"Camino Julio Prez",
            stop_latitude:18.1960308,
            stop_longitude:-67.093459
        },        {
           
            route_ID:5,
            stop_name:"R105-9",
            stop_description:"Camino Los Lazos",
            stop_latitude:18.1890642,
            stop_longitude:-67.0821533
        },
        {
            
            route_ID:5,
            stop_name:"R105-10",
            stop_description:"Camino Los Aleluya",
            stop_latitude:18.1870395,
            stop_longitude:-67.072576
        },
        {
            
            route_ID:5,
            stop_name:"R105-11",
            stop_description:"Km 10 INT 339",
            stop_latitude:18.1879735,
            stop_longitude:-67.0654538
        },
        {
            
            route_ID:5,
            stop_name:"R105-12",
            stop_description:"Escuela",
            stop_latitude:18.1899648,
            stop_longitude:-67.0620463
        },
        {
            
            route_ID:5,
            stop_name:"R105-13",
            stop_description:"Camino Cambalache",
            stop_latitude:18.1925591,
            stop_longitude:-67.0500201
        },
        {
            
            route_ID:5,
            stop_name:"R105-14",
            stop_description:"Cancha Rolon",
            stop_latitude:18.194131,
            stop_longitude:-67.043876
        },

        {
            
            route_ID:6,
            stop_name:"R106-1",
            stop_description:"Terminal Barcelona",
            stop_latitude:18.2046798,
            stop_longitude:-67.1386929
        },
        {
            
            route_ID:6,
            stop_name:"R106-2",
            stop_description:"Terminal Balboa",
            stop_latitude:18.2016512,
            stop_longitude:-67.1348957
        },
        {
            
            route_ID:6,
            stop_name:"R106-3",
            stop_description:"Fabricas Sector La Quinta",
            stop_latitude:18.2078219,
            stop_longitude:-67.1281333
        },
        {
            
            route_ID:6,
            stop_name:"R106-4",
            stop_description:"Urb. Flor Del Valle",
            stop_latitude:18.2086811,
            stop_longitude:-67.123395
        },
        {
            
            route_ID:6,
            stop_name:"R106-5",
            stop_description:"Antillian College",
            stop_latitude:18.2087796,
            stop_longitude:-67.1180251
        },
        {
            
            route_ID:6,
            stop_name:"R106-6",
            stop_description:"Vista Monte",
            stop_latitude:18.2092272,
            stop_longitude:-67.1022486
        },
        {
            
            route_ID:6,
            stop_name:"R106-7",
            stop_description:"INT Carr. 352",
            stop_latitude:18.2107361,
            stop_longitude:-67.0909589
        },
        {
            
            route_ID:6,
            stop_name:"R106-8",
            stop_description:"INT Carr. 3956",
            stop_latitude:18.2075951,
            stop_longitude:-67.0782994
        },
        {
            
            route_ID:6,
            stop_name:"R106-9",
            stop_description:"INT 354",
            stop_latitude:18.21462,
            stop_longitude:-67.074398
        },
        {
            
            route_ID:6,
            stop_name:"R106-10",
            stop_description:"KM 10.3 Calle Luis Pruna",
            stop_latitude:18.2114675,
            stop_longitude:-67.0629479
        },
        {
            
            route_ID:6,
            stop_name:"R106-11",
            stop_description:"Naranjales Service Station",
            stop_latitude:18.2083825,
            stop_longitude:-67.0583555
        },
        {
            
            route_ID:6,
            stop_name:"R106-12",
            stop_description:"Las Carmelitas",
            stop_latitude:18.2099549,
            stop_longitude:-67.0519756
        },
        {
            
            route_ID:6,
            stop_name:"R106-13",
            stop_description:"Camino Los Soler",
            stop_latitude:18.2108835,
            stop_longitude:-67.041745
        },
        {
            
            route_ID:6,
            stop_name:"R106-14",
            stop_description:"Escuela El Consumo",
            stop_latitude:18.2088187,
            stop_longitude:-67.0322994
        },

         {
            
            route_ID:7,
            stop_name:"R108-1",
            stop_description:"Terminal Barcelona",
            stop_latitude:18.2047609,
            stop_longitude:-67.1385972
        },
        {
            
            route_ID:7,
            stop_name:"R108-2",
            stop_description:"Edificio Biologia RUM",
            stop_latitude:18.2113415,
            stop_longitude:-67.1383256
        },
        {
            
            route_ID:7,
            stop_name:"R108-3",
            stop_description:"Porton Ingenieria RUM",
            stop_latitude:18.214144,
            stop_longitude:-67.140992
        },
        {
            
            route_ID:7,
            stop_name:"R108-4",
            stop_description:"Urb. Las Hortencias",
            stop_latitude:18.2227383,
            stop_longitude:-67.140775
        },
        {
            
            route_ID:7,
            stop_name:"R108-5",
            stop_description:"Cond. El Pabellon",
            stop_latitude:18.2272401,
            stop_longitude:-67.13803
        },
        {
            
            route_ID:7,
            stop_name:"R108-6",
            stop_description:"INT Carr. 342",
            stop_latitude:18.2338899,
            stop_longitude:-67.1315828
        },
        {
            
            route_ID:7,
            stop_name:"R108-7",
            stop_description:"Urb. El Retiro",
            stop_latitude:18.2393011,
            stop_longitude:-67.1232283
        },
        {
            
            route_ID:7,
            stop_name:"R108-8",
            stop_description:"Puente Leguisamo",
            stop_latitude:18.2418341,
            stop_longitude:-67.1203475
        },
        {
            
            route_ID:7,
            stop_name:"R108-9",
            stop_description:"Sector Botoyo",
            stop_latitude:18.247482,
            stop_longitude:-67.114548
        },
        {
            
            route_ID:7,
            stop_name:"R108-10",
            stop_description:"INT Carr. 430",
            stop_latitude:18.2519499,
            stop_longitude:-67.1077494
        },
        {
            
            route_ID:7,
            stop_name:"R108-11",
            stop_description:"Camino Meliton Rivera",
            stop_latitude:18.2509472,
            stop_longitude:-67.0956888
        },
        {
            
            route_ID:7,
            stop_name:"R108-12",
            stop_description:"INT Carr. 52",
            stop_latitude:18.2425228,
            stop_longitude:-67.0842832
        },
        {
            
            route_ID:8,
            stop_name:"R348-1",
            stop_description:"Terminal Barcelona",
            stop_latitude:18.2047414,
            stop_longitude:-67.1384667
        },
        {
            
            route_ID:8,
            stop_name:"R348-2",
            stop_description:"Cuesta Las Piedras",
            stop_latitude:18.1854729,
            stop_longitude:-67.1422976
        },
        {
            
            route_ID:8,
            stop_name:"R348-3",
            stop_description:"Gallera La Candelaria",
            stop_latitude:18.184253,
            stop_longitude:-67.1348334
        },
        {
            
            route_ID:8,
            stop_name:"R348-4",
            stop_description:"Cementerio Mayaguez Memorial",
            stop_latitude:18.1785996,
            stop_longitude:-67.130795
        },
        {
            
            route_ID:8,
            stop_name:"R348-5",
            stop_description:"Calle Jose Antonio Figueroa",
            stop_latitude:18.1727473,
            stop_longitude:-67.1252002
        },
        {
            
            route_ID:8,
            stop_name:"R348-6",
            stop_description:"INT 380",
            stop_latitude:18.1676239,
            stop_longitude:-67.1195954
        },
        {
            
            route_ID:8,
            stop_name:"R348-7",
            stop_description:"Camino Luisa Rodriguez",
            stop_latitude:18.1701906,
            stop_longitude:-67.1092647
        },
        {
            
            route_ID:8,
            stop_name:"R348-8",
            stop_description:"Terraza de Mike",
            stop_latitude:18.1685496,
            stop_longitude:-67.103859
        },
        {
            
            route_ID:8,
            stop_name:"R348-9",
            stop_description:"Villas del Rosario",
            stop_latitude:18.1680947,
            stop_longitude:-67.0989067
        },
        {
            
            route_ID:8,
            stop_name:"R348-10",
            stop_description:"Cruz Monte Km 7.2",
            stop_latitude:18.1654251,
            stop_longitude:-67.0945903
        },
        {
            
            route_ID:8,
            stop_name:"R348-11",
            stop_description:"Camino Segundino Rodriguez",
            stop_latitude:18.162095,
            stop_longitude:-67.08993
        },
        {
            
            route_ID:8,
            stop_name:"R348-12",
            stop_description:"Puente Rosario",
            stop_latitude:18.1581856,
            stop_longitude:-67.0856879
        },
        {
            route_ID:8,
            stop_name:"R348-13",
            stop_description:"Plaza Colon",
            stop_latitude:18.2013257,
            stop_longitude:-67.1392801
        } 
];

router.get('/', function(req, res, next){
    res.contentType('application/json');
    var routesJSON = JSON.stringify(this.stops);
    res.json(this.stops);
});

module.exports = router;