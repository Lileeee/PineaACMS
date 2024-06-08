// mock拦截器接收参数类型
export interface MockParams {
    url: string;
    type: string;
    body: string;
}

// mock拦截器返回数据类型
export interface MockResult {
    code: number;
    msg: string;
    data: any;
}

// antdvue table 数据类型
export interface arti_ant_table {
    key: number;
    title: string;
    authorid: number;
    tags: string[];
}

// user类型
export interface User {
    sudo?: string; // 管理员标识
    id: number;
    username: string;
    password: string;
}

// article类型
export interface Article {
    id: number;
    authorId: number;
    title: string;
    description: string;
    content: string;
    status: number; // 文章状态 0未审核 1通过 2打回
    hot: boolean;
    visible: boolean;
    comments: number;
    likes: number;
    marks: number;
}

// comments类型
export interface Comment {
    id: number;
    userId: number;
    comment: string;
}

// user article发布关联表
export interface User_Arti {
    id: number;
    authorId: number;
    articleIds: number[];
}

//user article点赞关联表
export interface Arti_Like {
    id: number;
    userId: number;
    articleIds: number[];
}

//user article收藏关联表
export interface Arti_Mark {
    id: number;
    userId: number;
    articleIds: number[];
}

//article comment评论关联表
export interface Arti_Com {
    id: number;
    articleId: number;
    commentIds: number[];
}
