Rails.application.routes.draw do
  root to: "home#index"

  get "/produits", to: "produits#index"
  get "/panier", to: "panier#show"
  get "/commande", to: "commandes#new"
end
