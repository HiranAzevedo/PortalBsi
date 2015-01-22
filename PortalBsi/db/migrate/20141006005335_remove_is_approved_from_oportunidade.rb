class RemoveIsApprovedFromOportunidade < ActiveRecord::Migration
  def change
    remove_column :oportunidades, :is_approved, :boolean
  end
end
