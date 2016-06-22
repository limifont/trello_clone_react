class ItemsController < ApplicationController
  before_action :find_list

  def index
    render json: @list.items
  end

  def create
    @item = @list.items.create(item_params)
    if @item.save
      render json: @item
    else
      render json: {errors: @item.errors.full_messages}
    end
  end

  def destroy
    @list.items.find(params[:id]).destroy
    render json: {message: 'Item Deleted'}
  end

  private

    def find_list
      @list = Board.find(params[:board_id]).lists.find(params[:list_id])
    end

    def item_params
      params.require(:item).permit(:name)
    end
end
