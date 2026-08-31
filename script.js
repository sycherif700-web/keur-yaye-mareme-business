/* =====================================================
   KEUR YAYE MAREME BUSINESS
   GESTION DU PANIER
===================================================== */


/* PANIER */

let panier = [];


/* =====================================================
   AJOUTER AU PANIER
===================================================== */

function ajouterAuPanier(nom, prix, image) {

    const produitExistant = panier.find(
        produit => produit.nom === nom
    );


    if (produitExistant) {

        produitExistant.quantite++;

    } else {

        panier.push({
            nom: nom,
            prix: prix,
            image: image,
            quantite: 1
        });

    }


    mettreAJourPanier();


    alert(
        nom + " a été ajouté au panier."
    );
}


/* =====================================================
   METTRE A JOUR LE PANIER
===================================================== */

function mettreAJourPanier() {

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    let nombreProduits = 0;

    let total = 0;


    /* Calcul */

    panier.forEach(produit => {

        nombreProduits += produit.quantite;

        total +=
            produit.prix *
            produit.quantite;

    });


    /* Nombre */

    cartCount.textContent =
        nombreProduits;


    /* Nettoyer */

    cartItems.innerHTML = "";


    /* Panier vide */

    if (panier.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Votre panier est vide.
            </p>
        `;

    }


    /* Afficher les produits */

    panier.forEach((produit, index) => {

        const item =
            document.createElement("div");


        item.className =
            "cart-item";


        item.innerHTML = `

            <img
                src="${produit.image}"
                alt="${produit.nom}"
            >

            <div class="cart-item-info">

                <h4>
                    ${produit.nom}
                </h4>

                <p>
                    ${produit.prix.toLocaleString("fr-FR")}
                    FCFA × ${produit.quantite}
                </p>

            </div>

            <button
                class="remove-button"
                onclick="supprimerProduit(${index})"
            >
                Supprimer
            </button>

        `;


        cartItems.appendChild(item);

    });


    /* Total */

    cartTotal.textContent =
        total.toLocaleString("fr-FR")
        + " FCFA";
}


/* =====================================================
   SUPPRIMER UN PRODUIT
===================================================== */

function supprimerProduit(index) {

    panier.splice(index, 1);

    mettreAJourPanier();

}


/* =====================================================
   OUVRIR LE PANIER
===================================================== */

function ouvrirPanier() {

    const modal =
        document.getElementById("cart-modal");


    modal.style.display = "flex";


    mettreAJourPanier();

}


/* =====================================================
   FERMER LE PANIER
===================================================== */

function fermerPanier() {

    const modal =
        document.getElementById("cart-modal");


    modal.style.display = "none";

}


/* =====================================================
   CLIQUER A L'EXTERIEUR DU PANIER
===================================================== */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("cart-modal");


        if (event.target === modal) {

            fermerPanier();

        }

    }
);


/* =====================================================
   COMMANDER SUR WHATSAPP
===================================================== */

function commanderWhatsApp() {

    if (panier.length === 0) {

        alert(
            "Votre panier est vide."
        );

        return;

    }


    let message =
        "Bonjour KEUR YAYE MAREME BUSINESS 👋\n\n";


    message +=
        "Je souhaite passer la commande suivante :\n\n";


    let total = 0;


    panier.forEach(produit => {

        const sousTotal =
            produit.prix *
            produit.quantite;


        total += sousTotal;


        message +=
            "• " +
            produit.nom +
            "\n";


        message +=
            "  Quantité : " +
            produit.quantite +
            "\n";


        message +=
            "  Prix : " +
            sousTotal.toLocaleString("fr-FR") +
            " FCFA\n\n";

    });


    message +=
        "💰 Total : " +
        total.toLocaleString("fr-FR") +
        " FCFA\n\n";


    message +=
        "Merci.";


    /* NUMERO WHATSAPP */

    const numero =
        "221776497199";


    /* LIEN WHATSAPP */

    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   INITIALISATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mettreAJourPanier();

    }
);
