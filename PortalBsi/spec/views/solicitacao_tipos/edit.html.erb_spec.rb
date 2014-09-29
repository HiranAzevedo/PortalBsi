require 'spec_helper'

describe "solicitacao_tipos/edit" do
  before(:each) do
    @solicitacao_tipo = assign(:solicitacao_tipo, stub_model(SolicitacaoTipo,
      :tipo => "MyString"
    ))
  end

  it "renders the edit solicitacao_tipo form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", solicitacao_tipo_path(@solicitacao_tipo), "post" do
      assert_select "input#solicitacao_tipo_tipo[name=?]", "solicitacao_tipo[tipo]"
    end
  end
end
