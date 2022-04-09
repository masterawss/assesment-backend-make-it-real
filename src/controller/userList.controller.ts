import { Response } from "express";
import Fav, { IFav } from "../model/fav.model";
import UserList from "../model/userList.model";
import { Types } from 'mongoose';

class UserListController {
  getAll = async (request: any, response: Response) => {
    const userList = await UserList.find({
      user: request.user.id
    })
    
    if(!userList)
      return response.status(400).json({error: 'No se encontró la lista'})

    response.json(userList)
  }
  getOne = async (request: any, response: Response) => {
    const userList = await UserList.findById(request.params.id)
      .populate('favs')
    if(!userList)
      return response.status(400).json({error: 'No se encontró la lista'})
    response.json({userList})
  }
  store = async (request: any, response: Response) => {

    try {
      const favsId: Array<Types.ObjectId> = await Promise.all(
        request.body.items.map(async(item: IFav) => {
          let fav = await Fav.create(item)
          return fav._id
        })
      )
      
      const userList = await UserList.create({
        user: request.user.id,
        name: request.body.name,
        favs: favsId
      })
      
      return response.status(200).json(userList)
    } catch (error) {
      return response.status(500).json({error: 'No se pudo registrar, ocurrió un error'})
      
    }
  }
  update = async (request: any, response: Response) => {
    try {
      await UserList
        .findById(request.params.id)
        .update({name: request.params.name})
        
        return response.status(200).json({message: 'Se editó con éxito'})
    } catch (error) {
      return response.status(500).json({error: 'No se pudo actualizar el registro'})
      
    }
  }
  delete = async (request: any, response: Response) => {
    try {
      await UserList.deleteOne({id: request.params.id})
      return response.status(200).json({message: 'Se eliminó con éxito'})
    } catch (error) {
      return response.status(500).json({error: 'No se pudo eliminar'})
    }
  }
}

export default UserListController;