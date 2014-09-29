require 'spec_helper'

describe "solicitacao_tipos/index" do
  before(:each) do
    assign(:solicitacao_tipos, [
      stub_model(SolicitacaoTipo,
        :tipo => "Tipo"
      ),
      stub_model(SolicitacaoTipo,
        :tipo => "Tipo"
      )
    ])
  end

  it "renders a list of solicitacao_tipos" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Tipo".to_s, :count => 2
  end
end
