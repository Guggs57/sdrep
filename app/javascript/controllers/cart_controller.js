import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["contenu", "total"]

  connect() {
    console.log("🛒 cart_controller.js monté")
    this.afficherPanier()
  }

  ajouter(event) {
    const bouton = event.currentTarget
    const produit = {
      id: bouton.dataset.produitId,
      nom: bouton.dataset.produitNom,
      prix: parseFloat(bouton.dataset.produitPrix),
      quantite: 1
    }

    const panier = JSON.parse(localStorage.getItem("panier")) || []
    const existant = panier.find(p => p.id === produit.id)

    if (existant) {
      existant.quantite++
    } else {
      panier.push(produit)
    }

    localStorage.setItem("panier", JSON.stringify(panier))
    this.afficherPanier()
    console.log("✅ Produit ajouté :", produit)
  }

  augmenter(event) {
    const id = event.currentTarget.dataset.produitId
    const panier = JSON.parse(localStorage.getItem("panier")) || []

    const produit = panier.find(p => p.id === id)
    if (produit) produit.quantite++

    localStorage.setItem("panier", JSON.stringify(panier))
    this.afficherPanier()
  }

  diminuer(event) {
    const id = event.currentTarget.dataset.produitId
    let panier = JSON.parse(localStorage.getItem("panier")) || []

    const produit = panier.find(p => p.id === id)
    if (produit) {
      produit.quantite--
      if (produit.quantite <= 0) {
        panier = panier.filter(p => p.id !== id)
      }
    }

    localStorage.setItem("panier", JSON.stringify(panier))
    this.afficherPanier()
  }

  vider() {
    localStorage.removeItem("panier")
    this.afficherPanier()
    console.log("🧹 Panier vidé")
  }

  afficherPanier() {
    // Si pas sur la page avec les targets (ex: index), on ne fait rien
    if (!this.hasContenuTarget || !this.hasTotalTarget) return

    const panier = JSON.parse(localStorage.getItem("panier")) || []
    this.contenuTarget.innerHTML = ""
    let total = 0

    panier.forEach(produit => {
      const ligne = document.createElement("tr")
      const prix = produit.prix.toFixed(2)
      const totalLigne = (produit.prix * produit.quantite).toFixed(2)
      total += parseFloat(totalLigne)

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
