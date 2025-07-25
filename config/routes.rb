Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root to: "home#index"

  resources :produits, only: [:index, :show]

  resource :panier, only: [:show]      # singleton, car un seul panier par utilisateur
  resources :commandes, only: [:new]   # future extension possible (create, show, etc.)
end
