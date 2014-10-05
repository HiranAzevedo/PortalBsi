require 'spec_helper'

describe "solicitations/new" do
  before(:each) do
    assign(:solicitation, stub_model(Solicitation,
      :solicitacao_tipos => nil,
      :user => nil,
      :observacao => "MyString"
    ).as_new_record)
  end

  it "renders new solicitation form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", solicitations_path, "post" do
      assert_select "input#solicitation_solicitacao_tipos[name=?]", "solicitation[solicitacao_tipos]"
      assert_select "input#solicitation_user[name=?]", "solicitation[user]"
      assert_select "input#solicitation_observacao[name=?]", "solicitation[observacao]"
    end
  end
end
