const requestUrl = "http://ip-api.com/json";
let countryCode = 'us';

$.ajax({
  url: requestUrl,
  type: 'GET',
  success: function(json) {
    countryCode = json.countryCode.toLowerCase();
  },
  error: function(err) {
    console.log("Request failed, error= " + err);
  }
});

function _() {
    var d = "pk.eyJ1IjoiZHRoc3FkIiwiYSI6ImNqdTRqNWptcjB5cmkzeW83dWl3bjVnbzcifQ.xE0kEWMTxlfNku6e3VTJwQ",
        g = L.map("mapid", {
            scrollWheelZoom: !1
        }).setView([39.8283, -98.5795], 3);

    function u(e) {
        var t = new XMLHttpRequest;
        t.onreadystatechange = function() {
            var e, t, n, o, i, a, s, r, l, c, d, u, m;
            if (4 == this.readyState && 200 == this.status) {
                var f = JSON.parse(this.responseText);
                //console.log("data ", f.features[0].center);
                if(f.features[0]!==undefined){
					var p = f.features[0].center,
                    h = [p[1], p[0]];
					L.marker(h).addTo(g), L.circle(h, {
                    color: "green",
                    fillColor: "green",
                    fillOpacity: .5,
                    radius: 2e4
					}).addTo(g), g.flyTo(h, 9, {
						animate: !0,
						duration: 3.6
					}), document.getElementById("channels-found").style.display = "block", e = "countUp", o = 3600, i = (n = 680) - (t = 40), s = (a = t) < n ? 1 : -1, r = Math.abs(Math.floor(o / i)), l = document.getElementById(e), c = setInterval(function() {
						a += s, (l.innerHTML = a) == n && clearInterval(c)
					}, r), setTimeout(function() {
						document.getElementById("main-cta").style.display = "block"
					}, 4e3)
				}				               
            }
        //}, t.open("GET", "https://api.mapbox.com/geocoding/v5/mapbox.places/" + e + ".json?country=" + countryCode + "&types=postcode&access_token=" + d, !0), t.send()
        }, t.open("GET", "https://api.mapbox.com/geocoding/v5/mapbox.places/1020.json?country=us&types=postcode&access_token=pk.eyJ1IjoiZHRoc3FkIiwiYSI6ImNqdTRqNWptcjB5cmkzeW83dWl3bjVnbzcifQ.xE0kEWMTxlfNku6e3VTJwQ"), t.send()
    }
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: d
    }).addTo(g),
        function() {
            for (var e = document.querySelectorAll(".today"), t = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }, n = new Date, o = 0; o < e.length; o++) e[o].innerHTML = n.toLocaleDateString("en-US", t)
        }(), document.getElementById("check-stock").addEventListener("click", function(e) {
        var t = document.getElementById("zipcode").value;
        u(t)
    }, !1)
}
document.addEventListener("DOMContentLoaded", function() {
    _()
});