require 'spec_helper'

describe "solicitations/index" do
  before(:each) do
    assign(:solicitations, [
      stub_model(Solicitation,
        :solicitacao_tipos => nil,
        :user => nil,
        :observacao => "Observacao"
      ),
      stub_model(Solicitation,
        :solicitacao_tipos => nil,
        :user => nil,
        :observacao => "Observacao"
      )
    ])
  end

  it "renders a list of solicitations" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => "Observacao".to_s, :count => 2
  end
end
