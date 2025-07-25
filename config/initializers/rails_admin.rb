RailsAdmin.config do |config|
  # ⚠️ Important : utilise importmap, pas sprockets
  config.asset_source = :importmap

  # 🔐 Authentification via HTTP Basic (simple, sans Devise)
  config.authenticate_with do
    authenticate_or_request_with_http_basic('Admin') do |username, password|
      # Remplace par tes identifiants admin
      username == ENV["ADMIN_USER"] && password == ENV["ADMIN_PASSWORD"]
    end
  end

  # (facultatif) pour récupérer l'utilisateur courant si besoin
  # config.current_user_method(&:current_user)

  config.actions do
    dashboard
    index
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app
  end
end
