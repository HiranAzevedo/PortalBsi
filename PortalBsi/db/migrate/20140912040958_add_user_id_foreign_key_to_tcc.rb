class AddUserIdForeignKeyToTcc < ActiveRecord::Migration
  def change
    add_reference :users, :tccs, index: true
  end
end
