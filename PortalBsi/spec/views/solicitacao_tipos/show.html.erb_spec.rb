require 'spec_helper'

describe "solicitacao_tipos/show" do
  before(:each) do
    @solicitacao_tipo = assign(:solicitacao_tipo, stub_model(SolicitacaoTipo,
      :tipo => "Tipo"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Tipo/)
  end
end
