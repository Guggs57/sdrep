class ProduitsController < ApplicationController
  def index
    @produits = Product.all
  end

  def show 
    @produit = Product.find_by(id: params[:id])
    unless @produit
      redirect_to produits_path, alert: "Produit introuvable"
    end
  end
end
