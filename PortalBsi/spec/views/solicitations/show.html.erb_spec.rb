require 'spec_helper'

describe "solicitations/show" do
  before(:each) do
    @solicitation = assign(:solicitation, stub_model(Solicitation,
      :solicitacao_tipos => nil,
      :user => nil,
      :observacao => "Observacao"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(//)
    rendered.should match(//)
    rendered.should match(/Observacao/)
  end
end
