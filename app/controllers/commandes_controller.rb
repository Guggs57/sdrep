class CommandesController < ApplicationController
  def new
    unless panier_present?
      redirect_to produits_path, alert: "Votre panier est vide. Ajoutez des articles avant de passer commande."
    end
  end

  private

  def panier_present?
    session[:panier].present? && session[:panier].any?
  end
end
