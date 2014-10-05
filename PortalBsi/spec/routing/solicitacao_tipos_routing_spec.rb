require "spec_helper"

describe SolicitacaoTiposController do
  describe "routing" do

    it "routes to #index" do
      get("/solicitacao_tipos").should route_to("solicitacao_tipos#index")
    end

    it "routes to #new" do
      get("/solicitacao_tipos/new").should route_to("solicitacao_tipos#new")
    end

    it "routes to #show" do
      get("/solicitacao_tipos/1").should route_to("solicitacao_tipos#show", :id => "1")
    end

    it "routes to #edit" do
      get("/solicitacao_tipos/1/edit").should route_to("solicitacao_tipos#edit", :id => "1")
    end

    it "routes to #create" do
      post("/solicitacao_tipos").should route_to("solicitacao_tipos#create")
    end

    it "routes to #update" do
      put("/solicitacao_tipos/1").should route_to("solicitacao_tipos#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/solicitacao_tipos/1").should route_to("solicitacao_tipos#destroy", :id => "1")
    end

  end
end
