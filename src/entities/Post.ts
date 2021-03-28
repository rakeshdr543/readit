import {
    Entity as ToEntity,
    Column,
    Index,
    BeforeInsert, ManyToOne, JoinColumn, OneToMany
} from "typeorm";

import Entity from "./Entity";
import User from "./User"
import Sub from './Sub'
import { makeId, slugify } from '../util/helpers'
import Comment from "./Comment";

@ToEntity('posts')
export default class Post extends Entity{
    constructor(post:Partial<Post>) {
        super();
        Object.assign(this,post)
    }

    @Index()
    @Column()
    identifier: string;

    @Column()
    title: string;

    @Index()
    @Column()
    slug: string;

    @Column({nullable:true,type:'text'})
    body: string;

    @Column()
    subName: string;

    @ManyToOne(()=>User,(user)=>user.posts)
    @JoinColumn({name:'username',referencedColumnName:'username'})
    user:User

    @ManyToOne(()=>Sub,(sub)=>sub.posts)
    @JoinColumn({name:'subName',referencedColumnName:'name'})
    sub:Sub

    @OneToMany(()=>Comment, (comment)=>comment.post)
    comments:Comment

    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier=makeId(7)
        this.slug=slugify(this.title)
    }
}
