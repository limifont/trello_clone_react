Rails.application.routes.draw do
  root 'boards#index'

  resources :boards do
    resources :lists do 
      resources :items
    end
  end
end