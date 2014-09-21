class AddUserIdForeignKeyToTcc < ActiveRecord::Migration
  def change
    add_reference :tccs, :users, index: true
  end
end
