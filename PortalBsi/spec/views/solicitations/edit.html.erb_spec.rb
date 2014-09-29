require 'spec_helper'

describe "solicitations/edit" do
  before(:each) do
    @solicitation = assign(:solicitation, stub_model(Solicitation,
      :solicitacao_tipos => nil,
      :user => nil,
      :observacao => "MyString"
    ))
  end

  it "renders the edit solicitation form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", solicitation_path(@solicitation), "post" do
      assert_select "input#solicitation_solicitacao_tipos[name=?]", "solicitation[solicitacao_tipos]"
      assert_select "input#solicitation_user[name=?]", "solicitation[user]"
      assert_select "input#solicitation_observacao[name=?]", "solicitation[observacao]"
    end
  end
end
