import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';
const registerUser = asyncHandler(async (req,res) => {
    
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {userName , password , email, fullName} = req.body

        if(
            [userName, password, fullName,email]
            .some((field) =>{
                field?.trim() === ''
            })
        ){
            throw new ApiError(400 , 'All fields are required')
        }

        const existedUser = User.findOne({
            $or:[{ userName },{ email }]
        })

        if(existedUser){
            throw new ApiError(409 , 'User email or username already exists')
        }

        const avatarLocalPath = req.files?.avatar[0]?.path
        const coverImageLocalPath = req.files?.coverImage[0]?.path

        if(!avatarLocalPath){
            throw new ApiError(400 , 'Avatar is required')
        }
       const avatar = await uploadOnCloudinary(avatarLocalPath)
       const coverImage = await uploadOnCloudinary(coverImageLocalPath)

       if(!avatar){
        throw new ApiError(400 , 'Avatar is required')
       }

      const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url ||"",
        email,
        password,
        userName : userName.toLowerCase()

       })

       const createdUser = User.findById(user._id).select(
        '-password -refreshToken'
       )

       if(!createdUser){
        throw new ApiError(500 , 'Something went wrong during user creation')
       }

       return res.status(201).json(
        new ApiResponse(200 , createdUser , "user created successfully")
       )
})

export default registerUser