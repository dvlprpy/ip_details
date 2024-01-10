/*
    receive or get client ip address from 'https://api.ipify.org?format=json';
     and show it on webpage
*/
let client_ip;
async function get_ip(){
    let response = await fetch("https://api.ipify.org?format=json");
    let data = await response.json();
    showYourIP(data);
}
get_ip();
function showYourIP(params) {
    
    let kbd = document.getElementById("kd").innerHTML = params.ip;
    document.getElementById("ip").value = kbd;
}




/*
    get information about clien ip from 'http://ip-api.com/json/2.181.86.37?fields=66846719';
*/
async function get_ip_info(){

    let i = document.getElementById("ip").value;
    let response = await fetch(`http://ip-api.com/json/${i}?fields=66846719`);
    let data = await response.json();
    showBriefInformationIP(data);
}
get_ip_info();
function showBriefInformationIP(params) {
    let tab = 
		`<tr>
            <th>IP Address</th>
            <td>${params.query} </td>
        </tr>
            <th>Country</th>
            <td>${params.country}</td>
        </tr>
        </tr>
            <th>country Code</th>
            <td>${params.countryCode}</td>
        </tr>
            <th>City</th>
            <td>${params.city}</td> 
        </tr>
            <th>Internet Service Provider</th>
            <td>${params.isp}</td>
        </tr>
            <th>Latitude</th>
            <td>${params.lat}</td>
        </tr>
            <th>Longitude</th>
            <td>${params.lon}</td>
        </tr>   
            <th>Continent</th>
            <td>${params.continent}</td>
        </tr>
            <th>Continent Code</th>
            <td>${params.continentCode}</td>	
        </tr>
            <th>mobile</th>
            <td>${params.mobile}</td>	
        </tr>
            <th>Proxy</th>
            <td>${params.proxy}</td>
        </tr>
            <th>zip Code</th>
            <td>${params.zip}</td>
        </tr>
            <th>Orgatization</th>
            <td>${params.org}</td>	
        </tr>
            <th>Offset</th>
            <td>${params.offset}</td>	
        </tr>`;
	// Setting innerHTML as tab variable
	document.getElementById("employees").innerHTML = tab;
	document.getElementById("countryCode").value = params.countryCode;
    document.getElementById("latitude").value = params.lon;
    document.getElementById("longitude").value = params.lat;
}



/*
    detecet country and set it flags in background
*/
async function flags_country() {
    let cCode = document.getElementById("countryCode").value;
    let response = await fetch("./Country Flags/country-flag.json");
    let  data = await response.json();
    for (const x of data) {
        if (x.code == cCode.toLowerCase()) {
            document.body.style.backgroundImage = `url(${x.flag})`
            document.body.style.backgroundRepeat = "no-repeat"
            document.body.style.backgroundAttachment = "fixed"
            document.body.style.backgroundSize ="100% 100%";
        }
    }
    
}
flags_country();



// show your position 
function init() {
    let la = document.getElementById("latitude").value;
    let lo = document.getElementById("longitude").value;
    map = new OpenLayers.Map("demoMap");
    var mapnik         = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(la,lo).transform( fromProjection, toProjection);
    var zoom           = 12; 

    map.addLayer(mapnik);
    map.setCenter(position, zoom );
}
init()