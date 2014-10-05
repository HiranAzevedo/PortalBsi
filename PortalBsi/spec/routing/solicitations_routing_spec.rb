require "spec_helper"

describe SolicitationsController do
  describe "routing" do

    it "routes to #index" do
      get("/solicitations").should route_to("solicitations#index")
    end

    it "routes to #new" do
      get("/solicitations/new").should route_to("solicitations#new")
    end

    it "routes to #show" do
      get("/solicitations/1").should route_to("solicitations#show", :id => "1")
    end

    it "routes to #edit" do
      get("/solicitations/1/edit").should route_to("solicitations#edit", :id => "1")
    end

    it "routes to #create" do
      post("/solicitations").should route_to("solicitations#create")
    end

    it "routes to #update" do
      put("/solicitations/1").should route_to("solicitations#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/solicitations/1").should route_to("solicitations#destroy", :id => "1")
    end

  end
end
