class AddTccIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tcc_id, :integer
    add_index :users, [:tcc_id]
  end
end
