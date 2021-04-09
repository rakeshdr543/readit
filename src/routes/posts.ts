import {Request,Response,Router} from "express";
import Sub from "../entities/Sub";
import Post from "../entities/Post";
import auth from "./auth";
import Comment from "../entities/Comment";
import user from '../middleware/user'

const createPost = async (req: Request, res: Response) => {
    const { title, body, sub } = req.body

    if (title.trim() === '') {
        return res.status(400).json({ title: 'Title must not be empty' })
    }
console.log('hey',res)
    try {
        // find sub
        const subRecord = await Sub.findOneOrFail({ name: sub })

        const post = new Post({ title, body, user:res.locals.user, sub: subRecord })
        await post.save()
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const getPosts = async (_:Request,res:Response)=>{

    try {
        const posts = await Post.find({order:{createAt:'DESC'}})
        return res.json(posts)

    }catch (err) {
        console.log(err)
        return res.status(500).json({error:'Something went wrong'})
    }
}

const getPost = async (req:Request,res:Response)=>{
    const {identifier,slug} =req.params
    
    try {
        const post = await Post.findOneOrFail({identifier,slug},{relations:['sub']})
        return res.json(post)

    }catch (err) {
        return res.status(404).json({error:'Post not found'})
    }
}

const commentOnPost = async (req: Request, res: Response) => {
    const {identifier,slug} =req.params

    const body = req.body.body

    try {
        const post = await Post.findOneOrFail({ identifier, slug })

        const comment = new Comment({
            body,
            user: res.locals.user,
            post,
        })

        await comment.save()

        return res.json(comment)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: 'Post not found' })
    }
}

const router= Router()

router.post('/',user,auth,createPost)
router.get('/',getPosts)
router.get('/:identifier/:slug',getPost)
router.post('/:identifier/:slug/comments',user,auth,commentOnPost)

export default router