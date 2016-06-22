class BoardsController < ApplicationController
  def index
    @boards = Board.all
  end

  def create
    @board = Board.create(board_params)
    if @board.save
      render json: @board
    else
      render json: {errors: @board.errors.full_messages}
    end
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    render json: {message: 'Board Deleted'}
  end

  private

    def board_params
      params.require(:board).permit(:name, :description)
    end
end
