class CreateOportunidades < ActiveRecord::Migration
  def change
    create_table :oportunidades do |t|
      t.string :company_name
      t.string :title
      t.string :description
      t.date :expiration_date
      t.boolean :is_approved
      t.string :has_partnership

      t.timestamps
    end
  end
end
