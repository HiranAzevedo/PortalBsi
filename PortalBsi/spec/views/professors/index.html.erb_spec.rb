require 'spec_helper'

describe "professors/index" do
  before(:each) do
    assign(:professors, [
      stub_model(Professor,
        :nome => "Nome",
        :email => "Email",
        :lattes => "Lattes"
      ),
      stub_model(Professor,
        :nome => "Nome",
        :email => "Email",
        :lattes => "Lattes"
      )
    ])
  end

  it "renders a list of professors" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Nome".to_s, :count => 2
    assert_select "tr>td", :text => "Email".to_s, :count => 2
    assert_select "tr>td", :text => "Lattes".to_s, :count => 2
  end
end
