class AddProfileToUser < ActiveRecord::Migration
  def change
    add_column :users, :nome, :string
    add_column :users, :apelido, :string
    add_column :users, :matricula, :string
    add_column :users, :facebook_link, :string
    add_column :users, :github_link, :string
  end
end
