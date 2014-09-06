class AddUserIdToTcc < ActiveRecord::Migration
  def change
    add_column :tccs, :user_id, :integer
    add_index :tccs, [:user_id]
  end
end
