require 'spec_helper'

describe "solicitacao_tipos/new" do
  before(:each) do
    assign(:solicitacao_tipo, stub_model(SolicitacaoTipo,
      :tipo => "MyString"
    ).as_new_record)
  end

  it "renders new solicitacao_tipo form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", solicitacao_tipos_path, "post" do
      assert_select "input#solicitacao_tipo_tipo[name=?]", "solicitacao_tipo[tipo]"
    end
  end
end
