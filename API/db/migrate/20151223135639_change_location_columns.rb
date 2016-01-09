class ChangeLocationColumns < ActiveRecord::Migration
  def up
    change_column :locations, :longitude, :string
    change_column :locations, :latitude, :string
    add_column :locations, :city, :string
  end

  def down
    change_column :locations, :longitude, :integer
    change_column :locations, :latitude, :integer
    remove_column :locations, :city
  end
end
