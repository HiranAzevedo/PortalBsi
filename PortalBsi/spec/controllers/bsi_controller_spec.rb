require 'spec_helper'

describe BsiController do

  describe "GET 'home'" do
    it "returns http success" do
      get 'home'
      response.should be_success
    end
  end

  describe "GET 'depoimentos'" do
    it "returns http success" do
      get 'depoimentos'
      response.should be_success
    end
  end

  describe "GET 'historico'" do
    it "returns http success" do
      get 'historico'
      response.should be_success
    end
  end

  describe "GET 'localizacao'" do
    it "returns http success" do
      get 'localizacao'
      response.should be_success
    end
  end

end
