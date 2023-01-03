fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((datas) => {
        for (var data of datas) {
            // a
            const aElement = document.createElement("a");

            // article
            const articleElement = document.createElement("article");

            // img
            const imgElement = document.createElement("img");
            imgElement.src=data.imageUrl
            imgElement.alt=data.altTxt

            // h3
            const h3Element = document.createElement("h3");
            h3Element.className="productName"
            h3Element.innerHTML=data.name


            // p
            const pElement = document.createElement("p");
            pElement.className="productDescription"
            pElement.innerHTML=data.description


            articleElement.appendChild(imgElement);
            articleElement.appendChild(h3Element)
            articleElement.appendChild(pElement)

            aElement.href = "./product.html?id="+ data._id;
            aElement.appendChild(articleElement)

            document.getElementById("items")
            .appendChild(aElement);
        }
    }
    );