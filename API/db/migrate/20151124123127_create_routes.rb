class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|
      t.string :name
      t.string :duration
      t.string :type

      t.timestamps
    end
  end
end
