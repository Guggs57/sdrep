import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["contenu", "total"]

  connect() {
    console.log("🛒 cart_controller.js monté")

    // Afficher le panier uniquement si les cibles sont présentes (page /panier)
    if (this.hasContenuTarget && this.hasTotalTarget) {
      this.afficherPanier()
    }
  }

  ajouter(event) {
    const bouton = event.currentTarget
    const produit = {
      id: bouton.dataset.produitId,
      nom: bouton.dataset.produitNom,
      prix: parseFloat(bouton.dataset.produitPrix || 0),
      quantite: 1
    }

    if (isNaN(produit.prix)) {
      console.warn("❌ Prix invalide pour le produit :", produit)
      return
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const existant = cart.find(p => p.id === produit.id)

    if (existant) {
      existant.quantite++
    } else {
      cart.push(produit)
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    console.log("✅ Produit ajouté :", produit)

    // Afficher le panier uniquement si on est sur la page panier
    if (this.hasContenuTarget && this.hasTotalTarget) {
      this.afficherPanier()
    }
  }

  augmenter(event) {
    const id = event.currentTarget.dataset.produitId
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    const produit = cart.find(p => p.id === id)
    if (produit) produit.quantite++

    localStorage.setItem("cart", JSON.stringify(cart))
    this.afficherPanier()
  }

  diminuer(event) {
    const id = event.currentTarget.dataset.produitId
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    const produit = cart.find(p => p.id === id)
    if (produit) {
      produit.quantite--
      if (produit.quantite <= 0) {
        cart = cart.filter(p => p.id !== id)
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    this.afficherPanier()
  }

  vider() {
    localStorage.removeItem("cart")
    this.afficherPanier()
    console.log("🧹 Panier vidé")
  }

  afficherPanier() {
    if (!this.hasContenuTarget || !this.hasTotalTarget) {
      console.warn("⛔️ Les cibles Stimulus ne sont pas présentes.")
      return
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || []
    console.log("📦 Contenu du panier :", cart)

    this.contenuTarget.innerHTML = ""
    let total = 0

    cart.forEach(produit => {
      const prix = parseFloat(produit.prix || 0).toFixed(2)
      const totalLigne = (parseFloat(produit.prix || 0) * produit.quantite).toFixed(2)
      total += parseFloat(totalLigne)

      const ligne = document.createElement("tr")
      ligne.innerHTML = `
        <td>${produit.nom}</td>
        <td>${prix} €</td>
        <td>
          <button data-action="click->cart#diminuer" data-produit-id="${produit.id}">−</button>
          ${produit.quantite}
          <button data-action="click->cart#augmenter" data-produit-id="${produit.id}">+</button>
        </td>
        <td>${totalLigne} €</td>
      `
      this.contenuTarget.appendChild(ligne)
    })

    this.totalTarget.textContent = `${total.toFixed(2)} €`
  }
}
