import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    // const { username, email, password } = req.body
    // recuperamos la info que nos envian desde el body
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password

    // validaciones email, password
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.json({ mensaje: 'Correo electrónico no válido' });
    }

    // Validacion password
    // const passswordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{4,12}$/;
    // if (!passswordRegex.test(password)) {
    //   return res.json({ mensaje: 'Password no válido' });
    // }

    // trato la informacion
    const encryptedPassword = bcrypt.hashSync(password, 10)

    // Guardamos la info en la bd
    const newUser = await User.create({
      username: username,
      email: email,
      password: encryptedPassword
    }).save()

    // devolvemos una respuesta
    return res.json({
      success: true,
      message: "User created succesfully",
      token: newUser
    })
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: "user cant be created",
        error: error
      }
    )
  }
}

const login = async (req: Request, res: Response) => {
  try {
    //recupero info del body
    const email = req.body.email
    const password = req.body.password

    // consulto en bd un usuario por email
    const user = await User.findOneBy(
      {
        email: email
      }
    )

    if (!user) {
      return res.status(400).json(
        {
          success: true,
          message: 'User or password incorrect',
        }
      )
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json(
        {
          success: true,
          message: 'User or password incorrect',
        }
      )
    }

    //generar token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email
      },
      "secreto",
      {
        expiresIn: "3h",
      }
    );

    return res.json(
      {
        success: true,
        message: "User logged succesfully",
        token: token
      }
    )
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: "users cant be logged",
        error: error
      }
    )
  }
}


const profile = async (req: any, res: Response) => {
  try {
    const user = await User.findOneBy(
      {
        id: req.token.id
      }
    )

    return res.json(
      {
        success: true,
        message: "profile user retrieved",
        data: user
      }
    )
  } catch (error) {
    return res.json(
      {
        success: false,
        message: "user profile cant be retrieved",
        error: error
      }
    )
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.json(
      {
        success: true,
        message: "users retrieved",
        data: users
      }
    )

  } catch (error) {
    return res.json(
      {
        success: false,
        message: "users cant be retrieved",
        error: error
      }
    )
  }
}

export { register, login, profile, getAllUsers }