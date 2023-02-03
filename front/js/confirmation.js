//This const is to find a query string who contain '?'
//Which is followed by URL parameter In this case the "orderId" parameter
let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search);

console.log(search_params.get('commande'))

if (search_params.has('commande')) {
    var commande = search_params.get('commande');
    elementById('orderId').textContent = commande
}
