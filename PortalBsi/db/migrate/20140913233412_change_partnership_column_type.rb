class ChangePartnershipColumnType < ActiveRecord::Migration
  def self.up
  	change_table :oportunidades do |t|
  	  t.change :has_partnership, :boolean	
  	end	
  end

  def self.down
  	change_table :oportunidades do |t|
  	  t.change :has_partnership, :string	
    end
  end
end

