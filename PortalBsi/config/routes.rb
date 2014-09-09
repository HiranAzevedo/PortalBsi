Rails.application.routes.draw do
  devise_for :users
  root 'bsi#home'
  match '/depoimentos', to: 'bsi#depoimentos', via: 'get'
  match '/historico', to: 'bsi#historico', via: 'get'
  match '/localizacao', to: 'bsi#localizacao', via: 'get'
  match '/secretaria', to: 'bsi#secretaria', via: 'get'
  match '/disciplinas', to: 'bsi#disciplinas', via: 'get'
  match '/disciplinas/eletivas', to: 'bsi#eletivas', via: 'get'
  match '/alunos', to: 'alunos#index', via: 'get'
  match '/tccs/:id/publicar', to: 'tccs#publicar', via: 'get'
  match '/tccs/:id/salva_publicado', to: 'tccs#salva_publicado', via: 'patch'
  match '/tccs/home', to: 'tccs#home', via: 'get'
  match '/tccs/tipos', to: 'tccs#tipos', via: 'get'
  match '/tccs/processo', to: 'tccs#processo', via: 'get'
  match '/tccs/publicacoes', to: 'tccs#publicacoes', via: 'get'
  match '/tccs/projetos', to: 'tccs#projetos', via: 'get'
  match '/tccs/modelo', to: 'tccs#modelo', via: 'get'
  match '/tccs/agenda', to: 'tccs#agenda', via: 'get'
  match '/noticias', to: 'bsi#noticias', via: 'get'
  match '/professores', to: 'bsi#professores', via: 'get'
  match '/oportunidades', to: 'bsi#oportunidades', via: 'get'
  match '/institucional', to: 'bsi#institucional', via: 'get'
  match '/institucional/eia', to: 'bsi#eia', via: 'get'
  match '/institucional/ccet', to: 'bsi#ccet', via: 'get'
  match '/institucional/unirio', to: 'bsi#unirio', via: 'get'
  resources :tccs
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#home'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
