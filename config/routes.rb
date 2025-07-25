Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root to: "home#index"

  get "/produits", to: "produits#index"
  get "/panier", to: "panier#show"
  get "/commande", to: "commandes#new"
end
